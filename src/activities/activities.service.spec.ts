import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { AuthorizationService } from '../common/authorization/authorization.service';
import { PublicationStatus } from '../common/enums/status.enum';
import { UserRole } from '../user/entities/user.entity';
import { EnrollmentStatus } from '../enrollment/enums/enrollment-status.enum';

// Regresión de P0-04: CRUD de actividades sin control de acceso. Usa un
// AuthorizationService REAL (con repos falsos) — no mockeado — para probar
// la cadena de propiedad completa: activity -> learningUnit -> topic ->
// section -> class.teacherId, no solo que se haya "llamado a algo".
describe('ActivitiesService — P0-04', () => {
  let service: ActivitiesService;
  let authService: AuthorizationService;
  const mockActivitiesRepo = {
    create: jest.fn((dto) => dto),
    findOne: jest.fn(),
    merge: jest.fn((a, dto) => Object.assign(a, dto)),
    save: jest.fn((a) => Promise.resolve(a)),
    softRemove: jest.fn().mockResolvedValue(undefined),
    updateStatus: jest.fn().mockResolvedValue(undefined),
  };
  const mockClassRepo = { findOne: jest.fn() };
  const mockEnrollmentRepo = { findOne: jest.fn() };
  const mockLearningUnitRepo = { findOne: jest.fn() };

  // Actividad publicada de la clase 5 (dictada por el docente id=10),
  // encadenada learningUnit -> topic -> section -> class.
  const publishedActivityClass5 = {
    id: 1,
    status: PublicationStatus.PUBLISHED,
    passingScore: 60,
    learningUnit: { id: 8, topic: { id: 6, section: { id: 3, classId: 5 } } },
  };

  const draftActivityClass5 = {
    ...publishedActivityClass5,
    id: 2,
    status: PublicationStatus.DRAFT,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    authService = new AuthorizationService(mockClassRepo as any, mockEnrollmentRepo as any);
    service = new ActivitiesService(mockActivitiesRepo as any, authService, mockLearningUnitRepo as any);
  });

  it('docente A (id=99) NO puede eliminar una actividad de la clase de docente B (id=10) → 403', async () => {
    mockActivitiesRepo.findOne.mockResolvedValue(publishedActivityClass5);
    mockClassRepo.findOne.mockResolvedValue({ id: 5, teacherId: 10 });

    const docenteA = { id: 99, role: UserRole.DOCENTE } as any;

    await expect(service.remove(1, docenteA)).rejects.toThrow(ForbiddenException);
    expect(mockActivitiesRepo.softRemove).not.toHaveBeenCalled();
  });

  it('docente A (id=99) NO puede editar (PATCH passingScore) una actividad de docente B → 403', async () => {
    mockActivitiesRepo.findOne.mockResolvedValue(publishedActivityClass5);
    mockClassRepo.findOne.mockResolvedValue({ id: 5, teacherId: 10 });

    const docenteA = { id: 99, role: UserRole.DOCENTE } as any;

    await expect(service.update(1, { passingScore: 0 } as any, docenteA)).rejects.toThrow(
      ForbiddenException,
    );
  });

  it('el docente dueño (id=10) SÍ puede eliminar su propia actividad', async () => {
    mockActivitiesRepo.findOne.mockResolvedValue(publishedActivityClass5);
    mockClassRepo.findOne.mockResolvedValue({ id: 5, teacherId: 10 });

    const docenteDueño = { id: 10, role: UserRole.DOCENTE } as any;

    await expect(service.remove(1, docenteDueño)).resolves.toBeUndefined();
    expect(mockActivitiesRepo.softRemove).toHaveBeenCalled();
  });

  it('un admin puede mutar cualquier actividad sin importar la clase', async () => {
    mockActivitiesRepo.findOne.mockResolvedValue(publishedActivityClass5);
    const admin = { id: 1, role: UserRole.ADMIN } as any;

    await expect(service.remove(1, admin)).resolves.toBeUndefined();
    expect(mockClassRepo.findOne).not.toHaveBeenCalled();
  });

  it('estudiante NO matriculado en la clase → GET actividad → 403 (aunque esté publicada)', async () => {
    mockActivitiesRepo.findOne.mockResolvedValue(publishedActivityClass5);
    mockEnrollmentRepo.findOne.mockResolvedValue(null);

    const estudiante = { id: 20, role: UserRole.ESTUDIANTE } as any;

    await expect(service.findOneForRequester(1, estudiante)).rejects.toThrow(ForbiddenException);
  });

  it('estudiante matriculado → GET actividad en estado draft → 404 (nunca visible)', async () => {
    mockActivitiesRepo.findOne.mockResolvedValue(draftActivityClass5);
    mockEnrollmentRepo.findOne.mockResolvedValue({
      classId: 5,
      studentId: 20,
      status: EnrollmentStatus.ACTIVE,
    });

    const estudiante = { id: 20, role: UserRole.ESTUDIANTE } as any;

    await expect(service.findOneForRequester(2, estudiante)).rejects.toThrow(NotFoundException);
  });

  it('estudiante matriculado → GET actividad publicada → sí la ve', async () => {
    mockActivitiesRepo.findOne.mockResolvedValue(publishedActivityClass5);
    mockEnrollmentRepo.findOne.mockResolvedValue({
      classId: 5,
      studentId: 20,
      status: EnrollmentStatus.ACTIVE,
    });

    const estudiante = { id: 20, role: UserRole.ESTUDIANTE } as any;

    await expect(service.findOneForRequester(1, estudiante)).resolves.toBe(publishedActivityClass5);
  });

  // OLA 2 P2: create() era el único de los cinco métodos hermanos sin
  // verificación de ownership — cualquier docente podía crear actividades
  // en unidades de aprendizaje de otro.
  describe('create — P2', () => {
    const createDto = { learningUnitId: 8, activityTypeId: 1, title: 'Nueva actividad' } as any;

    it('docente ajeno (id=99) NO puede crear una actividad en una unidad de la clase de docente B (id=10) → 403', async () => {
      mockLearningUnitRepo.findOne.mockResolvedValue({ id: 8, topic: { section: { classId: 5 } } });
      mockClassRepo.findOne.mockResolvedValue({ id: 5, teacherId: 10 });

      const docenteA = { id: 99, role: UserRole.DOCENTE } as any;

      await expect(service.create(createDto, docenteA)).rejects.toThrow(ForbiddenException);
      expect(mockActivitiesRepo.save).not.toHaveBeenCalled();
    });

    it('el docente dueño de la clase SÍ puede crear la actividad', async () => {
      mockLearningUnitRepo.findOne.mockResolvedValue({ id: 8, topic: { section: { classId: 5 } } });
      mockClassRepo.findOne.mockResolvedValue({ id: 5, teacherId: 10 });

      const docenteDueño = { id: 10, role: UserRole.DOCENTE } as any;

      await expect(service.create(createDto, docenteDueño)).resolves.toBeDefined();
      expect(mockActivitiesRepo.save).toHaveBeenCalled();
    });

    it('unidad de aprendizaje sin topic/sección (cadena rota) → falla cerrado, no crea', async () => {
      mockLearningUnitRepo.findOne.mockResolvedValue({ id: 8, topic: null });

      const docente = { id: 10, role: UserRole.DOCENTE } as any;

      await expect(service.create(createDto, docente)).rejects.toThrow(NotFoundException);
      expect(mockActivitiesRepo.save).not.toHaveBeenCalled();
    });
  });
});
