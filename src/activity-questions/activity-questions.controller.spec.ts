import { ActivityQuestionsController } from './activity-questions.controller';
import { QuestionType } from '../common/enums/question-type.enum';
import { UserRole } from '../user/entities/user.entity';

// Regresión de P0-03: la fuga de respuestas correctas se corta en el
// controller, según el rol del solicitante.
describe('ActivityQuestionsController.findByActivity', () => {
  const rawQuestion = {
    id: 1,
    activityId: 5,
    type: QuestionType.MCQ,
    question: '¿Cuánto es 2+2?',
    points: 10,
    order: 0,
    config: { options: [{ id: 'a', text: '4' }], correctAnswerId: 'a', explanation: 'obvio' },
  } as any;

  const mockService = {
    findByActivity: jest.fn().mockResolvedValue([rawQuestion]),
  };

  let controller: ActivityQuestionsController;

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new ActivityQuestionsController(mockService as any);
  });

  it('a un estudiante NUNCA le llega correctAnswerId', async () => {
    const estudiante = { id: 7, role: UserRole.ESTUDIANTE } as any;
    const result = await controller.findByActivity(5, estudiante);

    expect(result[0].config).not.toHaveProperty('correctAnswerId');
    expect(result[0].config).not.toHaveProperty('explanation');
  });

  it('a un docente sí le llega la entidad completa (con correctAnswerId)', async () => {
    const docente = { id: 3, role: UserRole.DOCENTE } as any;
    const result = await controller.findByActivity(5, docente);

    expect(result[0]).toBe(rawQuestion);
    expect(result[0].config.correctAnswerId).toBe('a');
  });

  it('a un admin también le llega la entidad completa', async () => {
    const admin = { id: 1, role: UserRole.ADMIN } as any;
    const result = await controller.findByActivity(5, admin);

    expect(result[0].config.correctAnswerId).toBe('a');
  });
});
