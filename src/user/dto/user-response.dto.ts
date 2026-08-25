import { User, UserRole } from '../entities/user.entity';

// Vista pública de un usuario. Nunca se sirve la entidad cruda: aunque
// `password` ya tiene select:false a nivel de columna, la entidad completa
// puede arrastrar relaciones (affiliations, enrollments) que no deben viajar
// en una respuesta de listado/lectura simple.
export class UserResponseDto {
  id: number;
  email: string;
  fullName: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;

  static fromEntity(user: User): UserResponseDto {
    const dto = new UserResponseDto();
    dto.id = user.id;
    dto.email = user.email;
    dto.fullName = user.fullName;
    dto.role = user.role;
    dto.isActive = user.isActive;
    dto.createdAt = user.createdAt;
    return dto;
  }
}
