import { ForbiddenException } from '@nestjs/common';
import { TopicService } from './topic.service';
import { AuthorizationService } from '../common/authorization/authorization.service';
import { UserRole } from '../user/entities/user.entity';

/**
 * OLA 2 — PUNTO 3.
 *
 * `create()` comparaba contra `section.class`, una relación que
 * `sectionService.findOne` NUNCA carga (solo carga `topics` y
 * `topics.learningUnits`). Eso hacía que `section.class?.teacherId !==
 * teacherId` fuera siempre `undefined !== teacherId`, es decir, siempre
 * `true`. El bloque de "verificación de respaldo" tampoco podía salvar la
 * situación: llamaba otra vez a `sectionService.findOne`, que o devuelve la
 * entidad o lanza `NotFoundException` — nunca devuelve un valor falsy — así
 * que el `if (!fullSection)` jamás se cumplía.
 *
 * Resultado real: CUALQUIER docente autenticado podía crear un topic en la
 * sección de CUALQUIER OTRO docente, sin que el sistema lo rechazara nunca.
 *
 * Este test reproduce el escenario exacto del hallazgo: antes de la
 * corrección, la aserción `rejects.toThrow(ForbiddenException)` de abajo
 * FALLABA (la promesa se resolvía sin más — el topic se creaba). Con la
 * corrección (resolver `section.classId`, columna directa sin necesidad de
 * relación, y delegar en `AuthorizationService.assertTeacherOwnsClass`,
 * exactamente igual que `SectionService.update`), la aserción pasa.
 */
describe('TopicService — P3 (BOLA: section.class nunca se carga)', () => {
  let service: TopicService;
  let authService: AuthorizationService;

  const mockTopicRepo = {
    create: jest.fn((dto) => dto),
    save: jest.fn((t) => Promise.resolve(t)),
    findOne: jest.fn(),
  };
  // sectionService.findOne se mockea directamente (no su repo): en
  // producción NUNCA carga la relación `class`, solo `topics`/
  // `topics.learningUnits` — reproducir exactamente ese comportamiento es
  // la esencia del bug.
  const mockSectionService = {
    findOne: jest.fn(),
  };
  const mockClassRepo = { findOne: jest.fn() };
  const mockEnrollmentRepo = { findOne: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
    authService = new AuthorizationService(mockClassRepo as any, mockEnrollmentRepo as any);
    service = new TopicService(mockTopicRepo as any, mockSectionService as any, authService);
  });

  describe('create', () => {
    const dto = { sectionId: 3, title: 'Topic robado' } as any;

    it('docente ajeno (id=99) NO puede crear un topic en una sección de la clase de docente B (id=10) → 403', async () => {
      mockSectionService.findOne.mockResolvedValue({ id: 3, classId: 5 }); // sin `.class` cargado
      mockClassRepo.findOne.mockResolvedValue({ id: 5, teacherId: 10 });

      const docenteAjeno = { id: 99, role: UserRole.DOCENTE } as any;

      await expect(service.create(dto, docenteAjeno)).rejects.toThrow(ForbiddenException);
      expect(mockTopicRepo.save).not.toHaveBeenCalled();
    });

    it('el docente dueño de la clase (id=10) SÍ puede crear el topic', async () => {
      mockSectionService.findOne.mockResolvedValue({ id: 3, classId: 5 });
      mockClassRepo.findOne.mockResolvedValue({ id: 5, teacherId: 10 });

      const docenteDueño = { id: 10, role: UserRole.DOCENTE } as any;

      await expect(service.create(dto, docenteDueño)).resolves.toBeDefined();
      expect(mockTopicRepo.save).toHaveBeenCalled();
    });

    it('un admin puede crear un topic en la sección de cualquier docente', async () => {
      mockSectionService.findOne.mockResolvedValue({ id: 3, classId: 5 });
      const admin = { id: 1, role: UserRole.ADMIN } as any;

      await expect(service.create(dto, admin)).resolves.toBeDefined();
      expect(mockClassRepo.findOne).not.toHaveBeenCalled();
    });
  });

  // OLA 2 P2 (mismo commit): update/remove no tenían NINGUNA verificación de
  // ownership — ni siquiera la rota que tenía create().
  describe('update / remove — mismo patrón de ownership que create', () => {
    const existingTopic = { id: 7, sectionId: 3, isActive: true, title: 'x' };

    beforeEach(() => {
      mockTopicRepo.findOne.mockResolvedValue(existingTopic);
      mockSectionService.findOne.mockResolvedValue({ id: 3, classId: 5 });
      mockClassRepo.findOne.mockResolvedValue({ id: 5, teacherId: 10 });
    });

    it('update: docente ajeno (id=99) → 403', async () => {
      const docenteAjeno = { id: 99, role: UserRole.DOCENTE } as any;
      await expect(
        service.update(7, { title: 'hackeado' } as any, docenteAjeno),
      ).rejects.toThrow(ForbiddenException);
    });

    it('update: el docente dueño (id=10) SÍ puede actualizar', async () => {
      const docenteDueño = { id: 10, role: UserRole.DOCENTE } as any;
      await expect(
        service.update(7, { title: 'actualizado' } as any, docenteDueño),
      ).resolves.toBeDefined();
    });

    it('remove: docente ajeno (id=99) → 403', async () => {
      const docenteAjeno = { id: 99, role: UserRole.DOCENTE } as any;
      await expect(service.remove(7, docenteAjeno)).rejects.toThrow(ForbiddenException);
    });

    it('remove: el docente dueño (id=10) SÍ puede desactivar el topic', async () => {
      const docenteDueño = { id: 10, role: UserRole.DOCENTE } as any;
      await expect(service.remove(7, docenteDueño)).resolves.toBeDefined();
    });
  });
});
