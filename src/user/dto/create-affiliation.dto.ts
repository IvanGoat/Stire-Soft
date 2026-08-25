import { IsInt, IsEnum, IsOptional } from 'class-validator';

// Antes este cuerpo era una anotación TypeScript inline (@Body() body: {...}),
// que ValidationPipe NO valida: TypeScript borra los tipos estructurales en
// tiempo de ejecución, así que sin una clase con decoradores de
// class-validator, whitelist/forbidNonWhitelisted no tienen nada sobre lo
// que actuar y el cuerpo entra sin validar.
export enum AffiliationRoleType {
  ESTUDIANTE = 'estudiante',
  DOCENTE = 'docente',
}

export class CreateAffiliationDto {
  @IsInt({ message: 'programId debe ser un número entero' })
  programId: number;

  @IsEnum(AffiliationRoleType, {
    message: 'roleType debe ser "estudiante" o "docente"',
  })
  roleType: AffiliationRoleType;

  @IsOptional()
  @IsInt({ message: 'currentSemester debe ser un número entero' })
  currentSemester?: number;
}
