import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { ActivityQuestionsService } from './activity-questions.service';
import { QuestionType } from '../common/enums/question-type.enum';
import { UserRole } from '../user/entities/user.entity';

// Regresión del punto 6 del Bloque 4: una pregunta CODING sin ningún
// testCase público deja al estudiante programando a ciegas.
//
// OLA 2 P2: create() ahora también verifica ownership (AuthorizationService)
// resolviendo Activity -> LearningUnit -> Topic -> Section -> classId, así
// que el mock de `activitiesRepository` debe devolver esa cadena completa
// para los casos que sí deben llegar a guardar.
describe('ActivityQuestionsService.create', () => {
  let service: ActivityQuestionsService;
  const teacher = { id: 9, role: UserRole.DOCENTE } as any;

  const mockRepo = {
    create: jest.fn((dto) => dto),
    save: jest.fn((q) => Promise.resolve(q)),
  };
  const mockActivitiesRepository = {
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      learningUnit: { topic: { section: { classId: 42 } } },
    }),
  };
  const mockAuthorizationService = {
    assertTeacherOwnsClass: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockActivitiesRepository.findOne.mockResolvedValue({
      id: 1,
      learningUnit: { topic: { section: { classId: 42 } } },
    });
    mockAuthorizationService.assertTeacherOwnsClass.mockResolvedValue(undefined);
    const mockContentRenderingService = { sanitizeRichText: jest.fn((s: string) => s) };
    service = new ActivityQuestionsService(
      mockRepo as any,
      mockActivitiesRepository as any,
      mockAuthorizationService as any,
      mockContentRenderingService as any,
    );
  });

  describe('validación de testCases públicos', () => {
    it('CODING sin ningún testCase isPublic:true → 400', async () => {
      const dto = {
        activityId: 1,
        type: QuestionType.CODING,
        question: 'Suma dos números',
        config: { language: 'javascript', testCases: [{ label: 'oculto', isPublic: false }] },
      } as any;

      await expect(service.create(dto, teacher)).rejects.toThrow(BadRequestException);
      expect(mockRepo.save).not.toHaveBeenCalled();
    });

    it('CODING con testCases vacío → 400', async () => {
      const dto = {
        activityId: 1,
        type: QuestionType.CODING,
        question: 'Suma dos números',
        config: { language: 'javascript', testCases: [] },
      } as any;

      await expect(service.create(dto, teacher)).rejects.toThrow(BadRequestException);
    });

    it('CODING con al menos un testCase isPublic:true → se crea', async () => {
      const dto = {
        activityId: 1,
        type: QuestionType.CODING,
        question: 'Suma dos números',
        config: {
          language: 'javascript',
          testCases: [
            { label: 'público', isPublic: true, expected: '3' },
            { label: 'oculto', isPublic: false, expected: '7' },
          ],
        },
      } as any;

      await expect(service.create(dto, teacher)).resolves.toBeDefined();
      expect(mockRepo.save).toHaveBeenCalled();
    });

    it('otros tipos de pregunta (MCQ) no exigen testCases', async () => {
      const dto = {
        activityId: 1,
        type: QuestionType.MCQ,
        question: '¿2+2?',
        config: { options: [{ id: 'a', text: '4' }], correctAnswerId: 'a' },
      } as any;

      await expect(service.create(dto, teacher)).resolves.toBeDefined();
    });
  });

  // OLA 2 P2: sin esto, un docente podía inyectar preguntas (con su
  // respuesta correcta) en actividades de otro docente.
  describe('ownership — un docente no puede crear preguntas en actividades ajenas', () => {
    const dto = {
      activityId: 1,
      type: QuestionType.MCQ,
      question: '¿2+2?',
      config: { options: [{ id: 'a', text: '4' }], correctAnswerId: 'a' },
    } as any;

    it('llama a assertTeacherOwnsClass con el classId resuelto de la cadena Activity->LearningUnit->Topic->Section', async () => {
      await service.create(dto, teacher);
      expect(mockAuthorizationService.assertTeacherOwnsClass).toHaveBeenCalledWith(teacher, 42);
    });

    it('propaga el rechazo de AuthorizationService (docente ajeno) y no guarda nada', async () => {
      mockAuthorizationService.assertTeacherOwnsClass.mockRejectedValueOnce(
        new ForbiddenException('No dictas esta clase'),
      );

      await expect(service.create(dto, teacher)).rejects.toThrow('No dictas esta clase');
      expect(mockRepo.save).not.toHaveBeenCalled();
    });

    it('actividad sin cadena resoluble (learningUnit/topic/section rotos) → falla cerrado, no guarda', async () => {
      mockActivitiesRepository.findOne.mockResolvedValueOnce({ id: 1, learningUnit: null });

      await expect(service.create(dto, teacher)).rejects.toThrow(NotFoundException);
      expect(mockRepo.save).not.toHaveBeenCalled();
    });
  });
});
