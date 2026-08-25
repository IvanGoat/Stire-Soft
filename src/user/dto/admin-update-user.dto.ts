import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsOptional, IsEnum } from 'class-validator';
import { UserRole } from '../entities/user.entity';

// Uso EXCLUSIVO de administradores sobre cuentas de terceros (PATCH /users/:id
// con @Roles('admin')). Para auto-edición de perfil usar UpdateProfileDto.
// PartialType hace que todas las propiedades de CreateUserDto sean opcionales
export class AdminUpdateUserDto extends PartialType(CreateUserDto) {
  // Campo opcional para actualizar el estado activo
  @IsBoolean({ message: 'isActive debe ser un valor booleano' })
  @IsOptional()
  isActive?: boolean;

  // Campo opcional para actualizar el rol
  @IsEnum(UserRole, { message: 'El rol debe ser un rol válido (admin, docente, estudiante)' })
  @IsOptional()
  role?: UserRole;
}
