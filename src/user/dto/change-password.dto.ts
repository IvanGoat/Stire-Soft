import { IsString, IsNotEmpty, MinLength, Matches } from 'class-validator';

export class ChangePasswordDto {
  @IsString({ message: 'La contraseña actual debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'Debes indicar tu contraseña actual' })
  currentPassword: string;

  @IsString({ message: 'La nueva contraseña debe ser una cadena de texto' })
  @MinLength(6, { message: 'La nueva contraseña debe tener al menos 6 caracteres' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'La nueva contraseña debe ser más segura (debe contener al menos una letra mayúscula, una minúscula y un número o carácter especial)',
  })
  @IsNotEmpty({ message: 'La nueva contraseña es obligatoria' })
  newPassword: string;
}
