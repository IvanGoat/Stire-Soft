import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LearningUnit } from './entities/learning-unit.entity';
import { Topic } from '../topic/entities/topic.entity';
import { Section } from '../section/entities/section.entity';
import { CreateLearningUnitDto } from './dto/create-learning-unit.dto';
import { UpdateLearningUnitDto } from './dto/update-learning-unit.dto';
import { AuthorizationService } from '../common/authorization/authorization.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class LearningUnitService {
  constructor(
    @InjectRepository(LearningUnit)
    private readonly learningUnitRepository: Repository<LearningUnit>,
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
    private readonly authorizationService: AuthorizationService,
  ) {}

  /**
   * Crear una nueva unidad de aprendizaje. Si se declara `topicId`, solo el
   * docente dueño de la clase de ese topic (o admin) puede crearla ahí.
   * `topicId` es opcional (compatibilidad con unidades legacy sin topic) —
   * sin topic no hay clase que verificar, así que cualquier docente/admin
   * puede crear la unidad huérfana (mismo comportamiento de antes; queda
   * fuera del alcance de esta ola cambiar esa nulabilidad).
   */
  async create(createDto: CreateLearningUnitDto, user: User): Promise<LearningUnit> {
    if (createDto.topicId != null) {
      await this.authorizationService.assertTeacherOwnsClass(
        user,
        await this.resolveClassIdFromTopicId(createDto.topicId),
      );
    }

    const unit = this.learningUnitRepository.create(createDto);
    return await this.learningUnitRepository.save(unit);
  }

  /**
   * Obtener todas las unidades de aprendizaje activas
   */
  async findAll(): Promise<LearningUnit[]> {
    return await this.learningUnitRepository.find({
      where: { isActive: true },
      order: { order: 'ASC' },
    });
  }

  /**
   * Obtener todas las unidades (incluyendo inactivas, para admin/docente)
   */
  async findAllIncludingInactive(): Promise<LearningUnit[]> {
    return await this.learningUnitRepository.find({
      order: { order: 'ASC' },
    });
  }

  /**
   * Obtener todas las unidades de una clase
   */
  async findByClass(classId: number): Promise<LearningUnit[]> {
    return await this.learningUnitRepository
      .createQueryBuilder('unit')
      .innerJoin('unit.topic', 'topic')
      .where('topic.classId = :classId', { classId })
      .orderBy('unit.order', 'ASC')
      .getMany();
  }

  /**
   * Obtener una unidad por ID
   */
  async findOne(id: number): Promise<LearningUnit> {
    const unit = await this.learningUnitRepository.findOne({ where: { id } });

    if (!unit) {
      throw new NotFoundException(`Unidad de aprendizaje con ID ${id} no encontrada`);
    }

    return unit;
  }

  /**
   * Actualizar una unidad de aprendizaje. Solo el docente dueño de la clase
   * de su topic (o admin). Falla cerrado si la unidad no tiene topic
   * asignado: no hay clase que verificar, así que no se puede autorizar
   * a un docente sobre ella (un admin sí puede, siempre).
   */
  async update(id: number, updateDto: UpdateLearningUnitDto, user: User): Promise<LearningUnit> {
    const unit = await this.findOne(id);
    await this.authorizationService.assertTeacherOwnsClass(user, await this.resolveClassId(unit));
    Object.assign(unit, updateDto);
    return await this.learningUnitRepository.save(unit);
  }

  /**
   * Eliminar una unidad de aprendizaje. Solo el docente dueño de la clase
   * de su topic (o admin) — la ruta ya exige @Roles('admin') además, esto
   * es defensa en profundidad si esa restricción de rol cambia.
   */
  async remove(id: number, user: User): Promise<void> {
    const unit = await this.findOne(id);
    await this.authorizationService.assertTeacherOwnsClass(user, await this.resolveClassId(unit));
    await this.learningUnitRepository.remove(unit);
  }

  /**
   * LearningUnit -> Topic -> Section -> classId. Falla cerrado (igual que
   * `ActivitiesService.resolveClassId`) si la unidad no tiene `topicId` o si
   * la cadena está rota: no se puede autorizar sin saber a qué clase
   * pertenece, y una unidad huérfana no debe quedar editable por cualquier
   * docente solo porque nadie puede probar que NO es suya.
   */
  private async resolveClassId(unit: LearningUnit): Promise<number> {
    if (unit.topicId == null) {
      throw new NotFoundException(
        'Esta unidad de aprendizaje no tiene un topic asignado; no se puede resolver su clase para autorizar la operación.',
      );
    }
    return this.resolveClassIdFromTopicId(unit.topicId);
  }

  private async resolveClassIdFromTopicId(topicId: number): Promise<number> {
    const topic = await this.topicRepository.findOne({ where: { id: topicId } });
    if (!topic) {
      throw new NotFoundException(`Topic con ID ${topicId} no encontrado`);
    }
    const section = await this.sectionRepository.findOne({ where: { id: topic.sectionId } });
    if (!section) {
      throw new NotFoundException(`Sección con ID ${topic.sectionId} no encontrada`);
    }
    return section.classId;
  }
}
