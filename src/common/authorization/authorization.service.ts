import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from '../../class/entities/class.entity';
import { Enrollment } from '../../enrollment/entities/enrollment.entity';
import { EnrollmentStatus } from '../../enrollment/enums/enrollment-status.enum';
import { User, UserRole } from '../../user/entities/user.entity';

// Servicio generico de autorizacion por propiedad de recurso (P0-04, P1-06).
// Admin siempre pasa. Lanza ForbiddenException/NotFoundException — nunca
// devuelve un booleano suelto que el llamador pueda ignorar por error.
@Injectable()
export class AuthorizationService {
  constructor(
    @InjectRepository(Class) private readonly classRepo: Repository<Class>,
    @InjectRepository(Enrollment) private readonly enrollmentRepo: Repository<Enrollment>,
  ) {}

  async assertTeacherOwnsClass(user: User, classId: number): Promise<void> {
    if (user.role === UserRole.ADMIN) return;
    const cls = await this.classRepo.findOne({ where: { id: classId } });
    if (!cls) {
      throw new NotFoundException('Clase no encontrada');
    }
    if (cls.teacherId !== user.id) {
      throw new ForbiddenException('No dictas esta clase');
    }
  }

  async assertEnrolledInClass(user: User, classId: number): Promise<void> {
    if (user.role === UserRole.ADMIN) return;
    const enrollment = await this.enrollmentRepo.findOne({
      where: { classId, studentId: user.id, status: EnrollmentStatus.ACTIVE },
    });
    if (!enrollment) {
      throw new ForbiddenException('No estás matriculado en esta clase');
    }
  }
}
