// Politica de complejidad de contrasena compartida. Antes vivia duplicada
// (y desincronizada) entre RegisterDto y CreateUserDto: CreateUserDto solo
// exigia longitud minima, lo que convertia a POST /users en una via para
// crear cuentas con contrasenas debiles saltandose /auth/register.
export const PASSWORD_COMPLEXITY_REGEX =
  /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

export const PASSWORD_COMPLEXITY_MESSAGE =
  'La contraseña debe ser más segura (debe contener al menos una letra mayúscula, una minúscula y un número o carácter especial)';
