import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

// Declarado desde cero, NO extiende CreateUserDto ni AdminUpdateUserDto.
// Auto-edición de perfil: únicamente campos no sensibles. Prohibido incluir
// role, isActive, password o email aquí — ver AdminUpdateUserDto para eso.
export class UpdateProfileDto {
  @IsString({ message: 'El nombre completo debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre completo no puede estar vacío' })
  @MaxLength(150, { message: 'El nombre completo es demasiado largo' })
  @IsOptional()
  fullName?: string;
}
