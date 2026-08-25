import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { UserRole } from '../../user/entities/user.entity';
import { EnrollmentStatus } from '../../enrollment/enums/enrollment-status.enum';

describe('AuthorizationService', () => {
  let service: AuthorizationService;
  const mockClassRepo = { findOne: jest.fn() };
  const mockEnrollmentRepo = { findOne: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
    service = new AuthorizationService(mockClassRepo as any, mockEnrollmentRepo as any);
  });

  describe('assertTeacherOwnsClass', () => {
    it('admin siempre pasa, sin consultar el repositorio', async () => {
      const admin = { id: 1, role: UserRole.ADMIN } as any;
      await expect(service.assertTeacherOwnsClass(admin, 999)).resolves.toBeUndefined();
      expect(mockClassRepo.findOne).not.toHaveBeenCalled();
    });

    it('docente dueño de la clase pasa', async () => {
      mockClassRepo.findOne.mockResolvedValue({ id: 5, teacherId: 10 });
      const docente = { id: 10, role: UserRole.DOCENTE } as any;
      await expect(service.assertTeacherOwnsClass(docente, 5)).resolves.toBeUndefined();
    });

    it('docente A intentando sobre la clase de docente B → 403', async () => {
      mockClassRepo.findOne.mockResolvedValue({ id: 5, teacherId: 10 });
      const docenteB = { id: 99, role: UserRole.DOCENTE } as any;
      await expect(service.assertTeacherOwnsClass(docenteB, 5)).rejects.toThrow(ForbiddenException);
    });

    it('clase inexistente → 404', async () => {
      mockClassRepo.findOne.mockResolvedValue(null);
      const docente = { id: 10, role: UserRole.DOCENTE } as any;
      await expect(service.assertTeacherOwnsClass(docente, 999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('assertEnrolledInClass', () => {
    it('admin siempre pasa', async () => {
      const admin = { id: 1, role: UserRole.ADMIN } as any;
      await expect(service.assertEnrolledInClass(admin, 999)).resolves.toBeUndefined();
    });

    it('estudiante matriculado activo pasa', async () => {
      mockEnrollmentRepo.findOne.mockResolvedValue({ classId: 5, studentId: 20, status: EnrollmentStatus.ACTIVE });
      const estudiante = { id: 20, role: UserRole.ESTUDIANTE } as any;
      await expect(service.assertEnrolledInClass(estudiante, 5)).resolves.toBeUndefined();
    });

    it('estudiante no matriculado → 403', async () => {
      mockEnrollmentRepo.findOne.mockResolvedValue(null);
      const estudiante = { id: 20, role: UserRole.ESTUDIANTE } as any;
      await expect(service.assertEnrolledInClass(estudiante, 5)).rejects.toThrow(ForbiddenException);
    });
  });
});
