import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ActivitiesRepository } from './activities.repository';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Activity } from './entities/activity.entity';
import { PublicationStatus } from '../common/enums/status.enum';
import { AuthorizationService } from '../common/authorization/authorization.service';
import { User, UserRole } from '../user/entities/user.entity';

@Injectable()
export class ActivitiesService {
  constructor(
    private readonly activitiesRepo: ActivitiesRepository,
    private readonly authorizationService: AuthorizationService,
  ) {}

  async create(createActivityDto: CreateActivityDto, userId: number): Promise<Activity> {
    const activity = this.activitiesRepo.create({
      ...createActivityDto,
      createdBy: userId,
      status: PublicationStatus.DRAFT,
    });
    return this.activitiesRepo.save(activity);
  }

  async findAll(paginationQuery: PaginationQueryDto, learningUnitId?: number) {
    const { skip, limit, search } = paginationQuery;
    const [items, total] = await this.activitiesRepo.findWithPagination(skip || 0, limit || 10, search, learningUnitId);
    return {
      data: items,
      meta: {
        totalItems: total,
        itemsPerPage: limit || 10,
        currentPage: paginationQuery.page || 1,
      },
    };
  }

  /**
   * Carga cruda de la actividad, con la cadena completa hasta la clase
   * (learningUnit -> topic -> section) necesaria para resolver propiedad
   * docente y matrícula. Uso interno: no aplica ninguna autorización.
   */
  async findOne(id: number): Promise<Activity> {
    const activity = await this.activitiesRepo.findOne({
      where: { id },
      relations: [
        'activityType',
        'creator',
        'learningUnit',
        'learningUnit.topic',
        'learningUnit.topic.section',
      ],
    });

    if (!activity) {
      throw new NotFoundException(`Actividad con id ${id} no encontrada`);
    }
    return activity;
  }

  /**
   * GET /activities/:id para un usuario autenticado concreto (P0-04).
   * Un estudiante solo puede ver actividades publicadas de una clase en la
   * que está matriculado; un draft nunca es visible para un estudiante,
   * pertenezca o no a su clase.
   */
  async findOneForRequester(id: number, user: User): Promise<Activity> {
    const activity = await this.findOne(id);

    if (user.role === UserRole.ESTUDIANTE) {
      const classId = this.resolveClassId(activity);
      await this.authorizationService.assertEnrolledInClass(user, classId);

      if (activity.status !== PublicationStatus.PUBLISHED) {
        // Se responde como "no encontrada", no como "prohibida": un draft
        // no existe todavía desde la perspectiva del estudiante.
        throw new NotFoundException(`Actividad con id ${id} no encontrada`);
      }
    }

    return activity;
  }

  async update(id: number, updateActivityDto: UpdateActivityDto, user: User): Promise<Activity> {
    const activity = await this.findOne(id);
    await this.authorizationService.assertTeacherOwnsClass(user, this.resolveClassId(activity));

    if (activity.status === PublicationStatus.ARCHIVED) {
        throw new BadRequestException('No se puede modificar una actividad archivada.');
    }

    this.activitiesRepo.merge(activity, updateActivityDto);
    return this.activitiesRepo.save(activity);
  }

  async changeStatus(id: number, status: PublicationStatus, user: User): Promise<Activity> {
    const activity = await this.findOne(id);
    await this.authorizationService.assertTeacherOwnsClass(user, this.resolveClassId(activity));

    let publishedAt = activity.publishedAt;
    if (status === PublicationStatus.PUBLISHED && !activity.publishedAt) {
      publishedAt = new Date();
    }

    await this.activitiesRepo.updateStatus(id, status, publishedAt);
    return this.findOne(id);
  }

  async remove(id: number, user: User): Promise<void> {
    const activity = await this.findOne(id);
    await this.authorizationService.assertTeacherOwnsClass(user, this.resolveClassId(activity));
    await this.activitiesRepo.softRemove(activity);
  }

  /**
   * Camina learningUnit -> topic -> section para obtener el classId real.
   * Falla cerrado: si el encadenamiento está roto (p.ej. una learningUnit
   * legacy sin topic), no se puede autorizar y se reporta como no encontrada
   * en vez de dejar pasar la mutación sin verificación.
   */
  private resolveClassId(activity: Activity): number {
    const classId = activity.learningUnit?.topic?.section?.classId;
    if (!classId) {
      throw new NotFoundException(
        'No se pudo resolver la clase de esta actividad (unidad de aprendizaje sin tema/sección asociado).',
      );
    }
    return classId;
  }
}
