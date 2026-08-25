import { IsEmail, IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';
import {
  PASSWORD_COMPLEXITY_REGEX,
  PASSWORD_COMPLEXITY_MESSAGE,
} from '../../common/validators/password-complexity';

export class CreateUserDto {
  // Validación de email con formato correcto
  @IsEmail({}, { message: 'El email debe ser válido' })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  email: string;

  // Misma política de complejidad que RegisterDto (POST /users no es una vía
  // alterna para crear cuentas con contraseñas débiles).
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @Matches(PASSWORD_COMPLEXITY_REGEX, { message: PASSWORD_COMPLEXITY_MESSAGE })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  password: string;

  // Validación de nombre completo
  @IsString({ message: 'El nombre completo debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre completo es obligatorio' })
  fullName: string;
}
