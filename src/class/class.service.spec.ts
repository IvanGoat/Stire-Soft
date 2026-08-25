import { ForbiddenException } from '@nestjs/common';
import { ClassService } from './class.service';
import { AuthorizationService } from '../common/authorization/authorization.service';
import { UserRole } from '../user/entities/user.entity';

// Regresión de P1-06: DELETE /class/:id solo era validado el UPDATE, no el
// remove. Usa un AuthorizationService real (con repos falsos).
describe('ClassService.remove — P1-06', () => {
  let service: ClassService;
  const mockClassRepo = { findOne: jest.fn(), remove: jest.fn().mockResolvedValue(undefined) };
  const mockEnrollmentRepo = { findOne: jest.fn() };
  const mockUserService = {};

  beforeEach(() => {
    jest.clearAllMocks();
    const authService = new AuthorizationService(mockClassRepo as any, mockEnrollmentRepo as any);
    service = new ClassService(mockClassRepo as any, mockUserService as any, authService);
  });

  it('docente A no puede eliminar la clase de docente B → 403', async () => {
    mockClassRepo.findOne.mockResolvedValue({ id: 5, teacherId: 10, teacher: {} });
    const docenteA = { id: 99, role: UserRole.DOCENTE } as any;

    await expect(service.remove(5, docenteA)).rejects.toThrow(ForbiddenException);
    expect(mockClassRepo.remove).not.toHaveBeenCalled();
  });

  it('el docente dueño sí puede eliminar su propia clase', async () => {
    mockClassRepo.findOne.mockResolvedValue({ id: 5, teacherId: 10, teacher: {} });
    const docenteDueño = { id: 10, role: UserRole.DOCENTE } as any;

    await expect(service.remove(5, docenteDueño)).resolves.toBeUndefined();
    expect(mockClassRepo.remove).toHaveBeenCalled();
  });
});
