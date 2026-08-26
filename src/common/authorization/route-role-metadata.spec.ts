import 'reflect-metadata';
import * as fs from 'fs';
import * as path from 'path';
import { Reflector, MetadataScanner } from '@nestjs/core';
import { RequestMethod } from '@nestjs/common';
import { METHOD_METADATA, CONTROLLER_WATERMARK } from '@nestjs/common/constants';
import { IS_PUBLIC_KEY } from '../../auth/decorators/public.decorator';

/**
 * OLA 2 — PUNTO 1: test de arquitectura.
 *
 * Recorre TODOS los *.controller.ts del árbol de trabajo (descubiertos por
 * filesystem, no por una lista escrita a mano — así un controller nuevo
 * queda cubierto automáticamente) y falla si una ruta mutante
 * (POST/PUT/PATCH/DELETE) no declara ni @Roles(...) ni @Public().
 *
 * Deliberadamente NO bootea Nest (no hay TestingModule, no hay DiscoveryService
 * de una app compilada): la metadata de @Roles/@Public/@Post/etc. la escribe
 * `Reflect.defineMetadata` sobre la clase/función en el momento en que el
 * módulo se importa — no en el momento en que Nest instancia el controller.
 * DiscoveryService.getControllers() necesita un ModulesContainer de una app
 * ya compilada e inicializada (y por tanto, en este proyecto, una conexión
 * MySQL real: TypeOrmModule.forRootAsync se resuelve al arrancar) solo para
 * terminar leyendo la misma metadata que ya está disponible con un
 * `require()` de cada archivo. Se usa en su lugar `MetadataScanner` (la
 * misma clase que usa el RouterExplorer interno de Nest para enumerar los
 * métodos de un controller) + `Reflector` (la misma clase que usa
 * RolesGuard) directamente sobre los prototipos — cero DB, cero DI,
 * resultado idéntico.
 */

const SRC_ROOT = path.resolve(__dirname, '..', '..');

function findControllerFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...findControllerFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.controller.ts')) {
      out.push(full);
    }
  }
  return out;
}

const MUTANT_METHODS = new Set<RequestMethod>([
  RequestMethod.POST,
  RequestMethod.PUT,
  RequestMethod.PATCH,
  RequestMethod.DELETE,
]);

interface Exception {
  controller: string;
  method: string;
  reason: string;
}

/**
 * Excepciones justificadas — ÚNICO lugar donde se permite que una ruta
 * mutante no declare @Roles ni @Public. Todas comparten el mismo patrón:
 * operan EXCLUSIVAMENTE sobre el recurso del propio usuario autenticado
 * (siempre vía `user.id` salido del JWT — nunca de un id que llegue en la
 * URL o el body), verificado leyendo el service correspondiente. No hay
 * escalada de rol posible porque no hay recurso ajeno que tocar.
 *
 * Añadir una entrada aquí exige el mismo trabajo que quitarla: releer el
 * service y confirmar que el ownership está forzado en la query, no dado
 * por supuesto.
 */
const JUSTIFIED_EXCEPTIONS: Exception[] = [
  {
    controller: 'TutorController',
    method: 'chat',
    reason: 'tutorService.sendMessage(user.id, message) — siempre conversa con el propio usuario.',
  },
  {
    controller: 'SubmissionsController',
    method: 'startSubmission',
    reason: 'studentId sale de @GetUser(), nunca de la URL ni del body.',
  },
  {
    controller: 'SubmissionsController',
    method: 'submitAnswers',
    reason: 'submissionsRepo.findOne({ where: { id, studentId } }) — ownership forzado en el WHERE.',
  },
  {
    controller: 'SubmissionsController',
    method: 'autosave',
    reason: 'mismo WHERE { id, studentId } que submitAnswers.',
  },
  {
    controller: 'NotificationsController',
    method: 'markRead',
    reason: 'notificationsRepository.findOne({ where: { id, userId } }) — ownership forzado en el WHERE.',
  },
  {
    controller: 'MessageController',
    method: 'create',
    reason: 'el remitente es siempre user.id; no hay recurso ajeno que tocar al crear.',
  },
  {
    controller: 'MessageController',
    method: 'markAsRead',
    reason: 'messageRepository.findOne({ where: { id, receiverId: userId } }) — ownership forzado.',
  },
  {
    controller: 'UserController',
    method: 'addAffiliation',
    reason: 'addAffiliation(user.id, dto) — nunca acepta un id de otro usuario.',
  },
  {
    controller: 'UserController',
    method: 'updateProfile',
    reason: 'updateProfile(user.id, dto) — nunca acepta un id de otro usuario.',
  },
  {
    controller: 'UserController',
    method: 'changePassword',
    reason: 'changePassword(user.id, dto) — nunca acepta un id de otro usuario.',
  },
];

interface ScannedRoute {
  controller: string;
  method: string;
  httpMethod: RequestMethod;
  file: string;
}

function scanMutantRoutes(): ScannedRoute[] {
  const scanner = new MetadataScanner();
  const routes: ScannedRoute[] = [];

  for (const file of findControllerFiles(SRC_ROOT)) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mod = require(file);

    const controllerClasses = Object.values(mod).filter(
      (exported): exported is new (...args: unknown[]) => object =>
        typeof exported === 'function' && Reflect.getMetadata(CONTROLLER_WATERMARK, exported) === true,
    );

    for (const ControllerClass of controllerClasses) {
      const prototype = (ControllerClass as { prototype: object }).prototype;
      for (const methodName of scanner.getAllMethodNames(prototype)) {
        const handler = (prototype as Record<string, unknown>)[methodName];
        const httpMethod = Reflect.getMetadata(METHOD_METADATA, handler);
        if (httpMethod === undefined || !MUTANT_METHODS.has(httpMethod)) continue;

        routes.push({
          controller: ControllerClass.name,
          method: methodName,
          httpMethod,
          file: path.relative(SRC_ROOT, file),
        });
      }
    }
  }

  return routes;
}

describe('Arquitectura — toda ruta mutante declara @Roles o @Public (Ola 2, Punto 1)', () => {
  const controllerFiles = findControllerFiles(SRC_ROOT);
  const mutantRoutes = scanMutantRoutes();
  const reflector = new Reflector();

  it('el descubrimiento por filesystem encuentra controllers reales (guarda contra un glob roto)', () => {
    expect(controllerFiles.length).toBeGreaterThanOrEqual(20);
  });

  it('el scanner encuentra rutas mutantes reales (guarda contra un scanner roto)', () => {
    expect(mutantRoutes.length).toBeGreaterThanOrEqual(20);
  });

  it('ninguna ruta mutante sin @Roles/@Public queda fuera de la lista de excepciones', () => {
    const violations: string[] = [];

    for (const route of mutantRoutes) {
      // Necesitamos el handler y la clase otra vez para leerlos con
      // Reflector.getAllAndOverride, exactamente como hace RolesGuard.
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const mod = require(path.join(SRC_ROOT, route.file));
      const ControllerClass = Object.values(mod).find(
        (exported): exported is new (...args: unknown[]) => object =>
          typeof exported === 'function' && (exported as { name: string }).name === route.controller,
      )!;
      const handler = (ControllerClass.prototype as Record<string, unknown>)[route.method];

      const isPublic = reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [handler, ControllerClass]);
      const roles = reflector.getAllAndOverride<string[]>('roles', [handler, ControllerClass]);
      if (isPublic || (roles && roles.length > 0)) continue;

      const justified = JUSTIFIED_EXCEPTIONS.some(
        (ex) => ex.controller === route.controller && ex.method === route.method,
      );
      if (justified) continue;

      violations.push(
        `${route.controller}.${route.method} (${RequestMethod[route.httpMethod]} — ${route.file})`,
      );
    }

    if (violations.length > 0) {
      throw new Error(
        `${violations.length} ruta(s) mutante(s) sin @Roles ni @Public y sin excepción justificada en ` +
          `JUSTIFIED_EXCEPTIONS:\n` +
          violations.map((v) => `  - ${v}`).join('\n') +
          '\n\nCada una necesita @Roles(...), @Public(), o una entrada en JUSTIFIED_EXCEPTIONS con el motivo ' +
          '(solo válido si la mutación está estructuralmente limitada al propio usuario autenticado).',
      );
    }
  });

  it('cada excepción justificada sigue existiendo como ruta mutante real (guarda contra excepciones huérfanas)', () => {
    const orphaned = JUSTIFIED_EXCEPTIONS.filter(
      (ex) => !mutantRoutes.some((r) => r.controller === ex.controller && r.method === ex.method),
    );
    expect(orphaned).toEqual([]);
  });
});
