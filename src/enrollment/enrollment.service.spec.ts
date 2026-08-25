import { ForbiddenException } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { AuthorizationService } from '../common/authorization/authorization.service';
import { UserRole } from '../user/entities/user.entity';

// Regresión de P1-06: GET /enrollment/class/:classId exponía el roster
// completo (nombres, emails) de CUALQUIER clase a cualquier docente/admin.
describe('EnrollmentService.findByClass — P1-06', () => {
  let service: EnrollmentService;
  const mockEnrollmentRepo = { find: jest.fn().mockResolvedValue([{ id: 1 }]), findOne: jest.fn() };
  const mockClassRepo = { findOne: jest.fn() };
  const mockClassService = {};
  const mockUserService = {};

  beforeEach(() => {
    jest.clearAllMocks();
    mockClassRepo.findOne.mockResolvedValue({ id: 5, teacherId: 10 });
    const authService = new AuthorizationService(mockClassRepo as any, mockEnrollmentRepo as any);
    service = new EnrollmentService(
      mockEnrollmentRepo as any,
      mockClassService as any,
      mockUserService as any,
      authService,
    );
  });

  it('docente A no puede ver el roster de la clase de docente B → 403', async () => {
    const docenteA = { id: 99, role: UserRole.DOCENTE } as any;
    await expect(service.findByClass(5, docenteA)).rejects.toThrow(ForbiddenException);
    expect(mockEnrollmentRepo.find).not.toHaveBeenCalled();
  });

  it('el docente dueño de la clase sí ve su propio roster', async () => {
    const docenteDueño = { id: 10, role: UserRole.DOCENTE } as any;
    await expect(service.findByClass(5, docenteDueño)).resolves.toEqual([{ id: 1 }]);
  });

  it('un admin ve el roster de cualquier clase', async () => {
    const admin = { id: 1, role: UserRole.ADMIN } as any;
    await expect(service.findByClass(5, admin)).resolves.toEqual([{ id: 1 }]);
  });
});
