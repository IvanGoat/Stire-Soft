import { BadRequestException } from '@nestjs/common';
import { ActivityQuestionsService } from './activity-questions.service';
import { QuestionType } from '../common/enums/question-type.enum';

// Regresión del punto 6 del Bloque 4: una pregunta CODING sin ningún
// testCase público deja al estudiante programando a ciegas.
describe('ActivityQuestionsService.create — validación de testCases públicos', () => {
  let service: ActivityQuestionsService;
  const mockRepo = {
    create: jest.fn((dto) => dto),
    save: jest.fn((q) => Promise.resolve(q)),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    service = new ActivityQuestionsService(mockRepo as any);
  });

  it('CODING sin ningún testCase isPublic:true → 400', async () => {
    const dto = {
      activityId: 1,
      type: QuestionType.CODING,
      question: 'Suma dos números',
      config: { language: 'javascript', testCases: [{ label: 'oculto', isPublic: false }] },
    } as any;

    await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    expect(mockRepo.save).not.toHaveBeenCalled();
  });

  it('CODING con testCases vacío → 400', async () => {
    const dto = {
      activityId: 1,
      type: QuestionType.CODING,
      question: 'Suma dos números',
      config: { language: 'javascript', testCases: [] },
    } as any;

    await expect(service.create(dto)).rejects.toThrow(BadRequestException);
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

    await expect(service.create(dto)).resolves.toBeDefined();
    expect(mockRepo.save).toHaveBeenCalled();
  });

  it('otros tipos de pregunta (MCQ) no exigen testCases', async () => {
    const dto = {
      activityId: 1,
      type: QuestionType.MCQ,
      question: '¿2+2?',
      config: { options: [{ id: 'a', text: '4' }], correctAnswerId: 'a' },
    } as any;

    await expect(service.create(dto)).resolves.toBeDefined();
  });
});
