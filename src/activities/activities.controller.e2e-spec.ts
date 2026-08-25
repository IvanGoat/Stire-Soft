import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ExecutionContext, CanActivate } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { ActivitiesController } from './activities.controller';
import { ActivitiesService } from './activities.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRole } from '../user/entities/user.entity';

// Regresión de P0-04 a nivel de ruta: un estudiante ni siquiera debe llegar
// al service en los endpoints de mutación — RolesGuard lo bloquea antes.
describe('ActivitiesController (e2e) — P0-04', () => {
  let app: INestApplication<App>;
  let currentUser: { id: number; role: UserRole };

  const mockActivitiesService = {
    update: jest.fn().mockResolvedValue({ id: 1 }),
    remove: jest.fn().mockResolvedValue(undefined),
    changeStatus: jest.fn().mockResolvedValue({ id: 1 }),
  };

  class FakeJwtAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      context.switchToHttp().getRequest().user = currentUser;
      return true;
    }
  }

  beforeEach(async () => {
    currentUser = { id: 20, role: UserRole.ESTUDIANTE };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [ActivitiesController],
      providers: [
        { provide: ActivitiesService, useValue: mockActivitiesService },
        // ActivitiesController usa @UseGuards(JwtAuthGuard) por decorador de
        // clase (no APP_GUARD global), así que se sustituye con
        // overrideGuard — es lo que intercepta la referencia por clase.
        // RolesGuard sí es real: es lo que estamos probando.
        RolesGuard,
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useClass(FakeJwtAuthGuard)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await app.close();
  });

  it('PATCH /activities/1 {"passingScore":0} como estudiante → 403, el service nunca se invoca', async () => {
    await request(app.getHttpServer())
      .patch('/activities/1')
      .send({ passingScore: 0 })
      .expect(403);

    expect(mockActivitiesService.update).not.toHaveBeenCalled();
  });

  it('DELETE /activities/1 como estudiante → 403', async () => {
    await request(app.getHttpServer()).delete('/activities/1').expect(403);
    expect(mockActivitiesService.remove).not.toHaveBeenCalled();
  });

  it('PATCH /activities/1/publish como estudiante → 403', async () => {
    await request(app.getHttpServer()).patch('/activities/1/publish').expect(403);
    expect(mockActivitiesService.changeStatus).not.toHaveBeenCalled();
  });

  it('PATCH /activities/1 como docente → pasa el guard (la propiedad la valida el service)', async () => {
    currentUser = { id: 10, role: UserRole.DOCENTE };
    await request(app.getHttpServer())
      .patch('/activities/1')
      .send({ passingScore: 0 })
      .expect(200);

    expect(mockActivitiesService.update).toHaveBeenCalled();
  });
});
