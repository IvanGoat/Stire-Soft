import { Injectable, BadRequestException } from '@nestjs/common';
import { ActivityQuestionsRepository } from './activity-questions.repository';
import { ActivityQuestion } from './entities/activity-question.entity';
import { QuestionType } from '../common/enums/question-type.enum';

import { IsInt, IsEnum, IsString, IsNumber, IsOptional, IsObject } from 'class-validator';

export class CreateActivityQuestionDto {
  @IsInt()
  activityId: number;

  @IsEnum(QuestionType)
  type: QuestionType;

  @IsString()
  question: string;

  @IsNumber()
  @IsOptional()
  points?: number;

  @IsNumber()
  @IsOptional()
  order?: number;

  @IsObject()
  config: Record<string, any>;
}

@Injectable()
export class ActivityQuestionsService {
  constructor(private readonly questionsRepo: ActivityQuestionsRepository) {}

  async create(dto: CreateActivityQuestionDto): Promise<ActivityQuestion> {
    this.validateConfig(dto.type, dto.config);

    const question = this.questionsRepo.create({
      activityId: dto.activityId,
      type: dto.type,
      question: dto.question,
      points: dto.points ?? 50,
      order: dto.order ?? 0,
      config: dto.config,
    });
    return this.questionsRepo.save(question);
  }

  async findByActivity(activityId: number): Promise<ActivityQuestion[]> {
    return this.questionsRepo.findByActivityId(activityId);
  }

  /**
   * Validacion de producto: una pregunta CODING sin ningun testCase publico
   * deja al estudiante programando a ciegas, sin saber que formato de
   * entrada/salida se espera (ver P0-03: los ocultos se filtran antes de
   * servirse al estudiante).
   */
  private validateConfig(type: QuestionType, config: Record<string, any>): void {
    if (type !== QuestionType.CODING) return;

    const testCases = Array.isArray(config?.testCases) ? config.testCases : [];
    const hasPublicCase = testCases.some((tc: any) => tc?.isPublic === true);

    if (!hasPublicCase) {
      throw new BadRequestException(
        'Una pregunta de tipo coding debe incluir al menos un testCase con isPublic:true, ' +
          'para que el estudiante sepa qué formato de entrada/salida se espera.',
      );
    }
  }
}
