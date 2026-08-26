import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from './entities/content.entity';
import { ContentRepository } from './content.repository';
import { LearningUnit } from '../learning-unit/entities/learning-unit.entity';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { AuthorizationService } from '../common/authorization/authorization.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ContentService {
  constructor(
    private readonly contentRepo: ContentRepository,
    @InjectRepository(LearningUnit)
    private readonly learningUnitRepository: Repository<LearningUnit>,
    private readonly authorizationService: AuthorizationService,
  ) {}

  /**
   * Crear un bloque de contenido. Solo el docente dueño de la clase de la
   * unidad de aprendizaje destino (o admin).
   */
  async create(dto: CreateContentDto, user: User): Promise<Content> {
    await this.authorizationService.assertTeacherOwnsClass(
      user,
      await this.resolveClassIdFromUnitId(dto.learningUnitId),
    );

    const content = this.contentRepo.create({
      ...dto,
      order: dto.order ?? 0,
      isVisible: dto.isVisible ?? true,
    });
    return this.contentRepo.save(content);
  }

  /** Listar bloques visibles de una unidad (para estudiantes) */
  async findByUnit(learningUnitId: number): Promise<Content[]> {
    return this.contentRepo.findByUnit(learningUnitId);
  }

  /** Listar TODOS los bloques de una unidad, incluyendo ocultos (para docentes) */
  async findByUnitAll(learningUnitId: number): Promise<Content[]> {
    return this.contentRepo.findByUnitAll(learningUnitId);
  }

  async findOne(id: number): Promise<Content> {
    const content = await this.contentRepo.findOne({ where: { id } });
    if (!content) {
      throw new NotFoundException(`Bloque de contenido con ID ${id} no encontrado`);
    }
    return content;
  }

  /** Solo el docente dueño de la clase del bloque (o admin). */
  async update(id: number, dto: UpdateContentDto, user: User): Promise<Content> {
    const content = await this.findOne(id);
    await this.authorizationService.assertTeacherOwnsClass(
      user,
      await this.resolveClassIdFromUnitId(content.learningUnitId),
    );
    Object.assign(content, dto);
    return this.contentRepo.save(content);
  }

  /** Solo el docente dueño de la clase del bloque (o admin). */
  async toggleVisibility(id: number, user: User): Promise<Content> {
    const content = await this.findOne(id);
    await this.authorizationService.assertTeacherOwnsClass(
      user,
      await this.resolveClassIdFromUnitId(content.learningUnitId),
    );
    content.isVisible = !content.isVisible;
    return this.contentRepo.save(content);
  }

  /** Solo el docente dueño de la clase del bloque (o admin). */
  async remove(id: number, user: User): Promise<void> {
    const content = await this.findOne(id);
    await this.authorizationService.assertTeacherOwnsClass(
      user,
      await this.resolveClassIdFromUnitId(content.learningUnitId),
    );
    await this.contentRepo.remove(content);
  }

  /**
   * Reordenar bloques recibiendo array de { id, order }. Verifica que TODOS
   * los bloques referenciados pertenezcan a clases del docente — reordenar
   * es una mutación igual que las demás, y sin esta verificación un docente
   * podría colar el id de un bloque ajeno en el array.
   */
  async reorder(items: { id: number; order: number }[], user: User): Promise<void> {
    for (const { id } of items) {
      const content = await this.findOne(id);
      await this.authorizationService.assertTeacherOwnsClass(
        user,
        await this.resolveClassIdFromUnitId(content.learningUnitId),
      );
    }

    await Promise.all(
      items.map(({ id, order }) =>
        this.contentRepo.update(id, { order }),
      ),
    );
  }

  /**
   * Content -> LearningUnit -> Topic -> Section -> classId. Falla cerrado
   * (mismo patrón que `ActivitiesService.resolveClassId`) si la unidad no
   * tiene topic asignado o la cadena está rota.
   */
  private async resolveClassIdFromUnitId(learningUnitId: number): Promise<number> {
    const unit = await this.learningUnitRepository.findOne({
      where: { id: learningUnitId },
      relations: ['topic', 'topic.section'],
    });
    const classId = unit?.topic?.section?.classId;
    if (!classId) {
      throw new NotFoundException(
        `No se pudo resolver la clase de la unidad de aprendizaje ${learningUnitId} (sin topic/sección asociado).`,
      );
    }
    return classId;
  }
}
