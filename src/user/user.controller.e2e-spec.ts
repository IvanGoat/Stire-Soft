import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, ExecutionContext, CanActivate } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import request from 'supertest';
import { App } from 'supertest/types';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from './entities/user.entity';

// Regresión de P0-02 (escalada de privilegios vía mass assignment).
// Usa los guards REALES (JwtAuthGuard sustituido por uno que simula un JWT ya
// validado, RolesGuard real) y el ValidationPipe global REAL, exactamente
// como está configurado en main.ts, para probar la cadena completa
// DTO + Guard + Ruta sin depender de una base de datos real.
describe('UserController (e2e) — P0-02 escalada de privilegios', () => {
  let app: INestApplication<App>;
  let currentUser: { id: number; email: string; role: UserRole };

  const mockUserService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn().mockResolvedValue({ id: 999, role: UserRole.ESTUDIANTE }),
    updateProfile: jest
      .fn()
      .mockImplementation((id: number, dto: { fullName?: string }) =>
        Promise.resolve({ id, fullName: dto.fullName, role: UserRole.ESTUDIANTE }),
      ),
    changePassword: jest.fn(),
    remove: jest.fn(),
    updateRole: jest.fn(),
    addAffiliation: jest.fn(),
  };

  // Simula un JwtAuthGuard que ya validó el token y adjuntó req.user —
  // el valor real lo controla cada test vía `currentUser`.
  class FakeJwtAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const req = context.switchToHttp().getRequest();
      req.user = currentUser;
      return true;
    }
  }

  beforeEach(async () => {
    currentUser = { id: 1, email: 'estudiante@stire.local', role: UserRole.ESTUDIANTE };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: APP_GUARD, useClass: FakeJwtAuthGuard },
        { provide: APP_GUARD, useClass: RolesGuard },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    // Misma configuración exacta que src/main.ts.
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );
    await app.init();
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await app.close();
  });

  it('PATCH /users/me con {"role":"admin"} es rechazado con 400 y el servicio NUNCA se invoca con ese campo', async () => {
    await request(app.getHttpServer())
      .patch('/users/me')
      .send({ role: 'admin' })
      .expect(400);

    expect(mockUserService.updateProfile).not.toHaveBeenCalled();
  });

  it('PATCH /users/me con {"password":"nueva"} sobre un tercero también es rechazado con 400 (campo no declarado en UpdateProfileDto)', async () => {
    await request(app.getHttpServer())
      .patch('/users/me')
      .send({ password: 'NuevaClave123' })
      .expect(400);

    expect(mockUserService.updateProfile).not.toHaveBeenCalled();
  });

  it('PATCH /users/me con {"fullName":"Nuevo Nombre"} SÍ funciona y usa el id del token, no uno del body', async () => {
    await request(app.getHttpServer())
      .patch('/users/me')
      .send({ fullName: 'Nuevo Nombre' })
      .expect(200);

    expect(mockUserService.updateProfile).toHaveBeenCalledWith(1, { fullName: 'Nuevo Nombre' });
  });

  it('PATCH /users/:id (id ajeno) con token de estudiante devuelve 403 — RolesGuard exige admin', async () => {
    await request(app.getHttpServer())
      .patch('/users/999')
      .send({ fullName: 'Intento de edicion ajena' })
      .expect(403);

    expect(mockUserService.update).not.toHaveBeenCalled();
  });

  it('PATCH /users/:id con {"role":"admin"} como estudiante también devuelve 403 antes de llegar al DTO admin', async () => {
    await request(app.getHttpServer())
      .patch('/users/1')
      .send({ role: 'admin' })
      .expect(403);

    expect(mockUserService.update).not.toHaveBeenCalled();
  });

  it('PATCH /users/:id como admin SÍ puede cambiar el rol de un tercero (ruta administrativa correcta)', async () => {
    currentUser = { id: 5, email: 'admin@stire.local', role: UserRole.ADMIN };

    await request(app.getHttpServer())
      .patch('/users/999')
      .send({ role: 'docente' })
      .expect(200);

    expect(mockUserService.update).toHaveBeenCalledWith(999, { role: 'docente' });
  });

  it('PATCH /users/:id como docente también devuelve 403 — la ruta es exclusiva de admin', async () => {
    currentUser = { id: 2, email: 'docente@stire.local', role: UserRole.DOCENTE };

    await request(app.getHttpServer())
      .patch('/users/999')
      .send({ fullName: 'Intento docente' })
      .expect(403);

    expect(mockUserService.update).not.toHaveBeenCalled();
  });
});
