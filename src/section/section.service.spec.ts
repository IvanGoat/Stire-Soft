import { ForbiddenException } from '@nestjs/common';
import { SectionService } from './section.service';
import { AuthorizationService } from '../common/authorization/authorization.service';
import { UserRole } from '../user/entities/user.entity';

// Regresión de P1-06: antes solo `create` verificaba propiedad de la clase;
// update/togglePublish/remove quedaban abiertos a cualquier docente/admin.
describe('SectionService — P1-06', () => {
  let service: SectionService;
  const mockSectionRepo = {
    findOne: jest.fn(),
    save: jest.fn((s) => Promise.resolve(s)),
    remove: jest.fn().mockResolvedValue(undefined),
  };
  const mockClassRepo = { findOne: jest.fn() };
  const mockEnrollmentRepo = { findOne: jest.fn() };
  const mockClassService = {};

  const sectionOfClass5 = { id: 1, classId: 5, title: 'Sección', isPublished: false };

  beforeEach(() => {
    jest.clearAllMocks();
    mockSectionRepo.findOne.mockResolvedValue({ ...sectionOfClass5 });
    mockClassRepo.findOne.mockResolvedValue({ id: 5, teacherId: 10 });
    const authService = new AuthorizationService(mockClassRepo as any, mockEnrollmentRepo as any);
    service = new SectionService(mockSectionRepo as any, mockClassService as any, authService);
  });

  it('update: docente A no puede editar sección de clase de docente B → 403', async () => {
    const docenteA = { id: 99, role: UserRole.DOCENTE } as any;
    await expect(service.update(1, { title: 'Hackeado' } as any, docenteA)).rejects.toThrow(
      ForbiddenException,
    );
  });

  it('togglePublish: docente A no puede publicar/despublicar sección ajena → 403', async () => {
    const docenteA = { id: 99, role: UserRole.DOCENTE } as any;
    await expect(service.togglePublish(1, docenteA)).rejects.toThrow(ForbiddenException);
  });

  it('remove: docente A no puede eliminar sección ajena → 403', async () => {
    const docenteA = { id: 99, role: UserRole.DOCENTE } as any;
    await expect(service.remove(1, docenteA)).rejects.toThrow(ForbiddenException);
    expect(mockSectionRepo.remove).not.toHaveBeenCalled();
  });

  it('el docente dueño sí puede editar/publicar/eliminar su sección', async () => {
    const docenteDueño = { id: 10, role: UserRole.DOCENTE } as any;
    await expect(service.update(1, { title: 'Nuevo' } as any, docenteDueño)).resolves.toBeDefined();
    await expect(service.togglePublish(1, docenteDueño)).resolves.toBeDefined();
    await expect(service.remove(1, docenteDueño)).resolves.toBeUndefined();
  });
});
