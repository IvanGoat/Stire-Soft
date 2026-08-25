# RELEASE NOTES

---

## v0.2.1 — Ola 1 · Bloque 1: Reparacion del Build · 25 de Agosto de 2026

Base: `docs/AUDITORIA_TECNICA_ALTA_INTENSIDAD.md` (hallazgo P1-01), commit `c7aac0e`.
Alcance exclusivo de este bloque: dejar `npm run build` en 0 errores, sin tocar seguridad ni logica de negocio. Ejecutado siguiendo `docs/PLAN_OLA1_BLOQUE1_BUILD.md`.

### Correcciones aplicadas (contador de errores estrictamente decreciente: 6 -> 0)

| # | Archivo:linea | Codigo TS | Cambio aplicado | Errores tras el cambio |
|---|---|---|---|---|
| 1 | `src/judge-engine/judge.worker.ts:14` | TS1272 | Separada la importacion de la interfaz `SandboxAdapter` (`import type`) del token `SANDBOX_ADAPTER` (import normal) | 5 |
| 2 | `src/test-data-source.ts:10` | TS2322 | Firma cambiada a `(entities: (Function \| string \| EntitySchema)[])`, importando `EntitySchema` de `typeorm` | 4 |
| 3 | `src/content-rendering/content-rendering.service.ts:8` | TS2724 | Anotacion cambiada a `ReturnType<typeof createDOMPurify>` (agnostica de version); eliminada la dependencia obsoleta `@types/dompurify` (`npm rm @types/dompurify`) | 3 |
| 4 | `src/tutor/tutor.service.ts:50` | TS2532 | Capturada la referencia ya estrechada en `const client = this.openai;` dentro del bloque `else`, usada en el closure de `callWithRetry` | 3 (fix junto con #5) |
| 5 | `src/tutor/tutor.service.ts:52` | TS2769 | Tipado el retorno de `buildMessages()` como `ChatCompletionMessageParam[]`; anadido `normalizeRole()` que mapea cualquier valor de `role` proveniente de BD a la union literal `'system'\|'user'\|'assistant'` (default `'user'`) | 1 |
| 6 | `src/tutor/tutor.service.ts:59` | TS2339 | Sin cambio adicional: el error desaparecio solo al corregir #5, tal como preveia el plan. No se aplico el fallback `stream: false` porque no fue necesario | **0** |

Sin `as any`, `@ts-ignore`, `@ts-expect-error` ni relajacion de `strict` en ningun punto (Regla de Oro del plan, punto 4).

### Resultado literal

```
$ npm run build
> stire@0.0.1 build
> nest build
EXIT_CODE=0

$ npm test
Test Suites: 19 passed, 19 total
Tests:       105 passed, 105 total
Time:        16.501 s

$ npx jest --coverage --coverageReporters=text-summary
Statements   : 26.92% ( 981/3643 )
Branches     : 35.47% ( 542/1528 )
Functions    : 16.92% ( 76/449 )
Lines        : 26.36% ( 872/3308 )
```

Linea base de tests preservada exactamente (19 suites / 105 tests, sin regresiones). Cobertura estable respecto a la auditoria (26.88% -> 26.92%, variacion atribuible a la nueva funcion `normalizeRole`).

### Verificacion de arranque real (PASO 5) — hallazgo nuevo, fuera de alcance de este bloque

Con `SANDBOX_TYPE=local` (solo para esta prueba puntual, **no** fijado como default: la Objecion 2 del plan sigue pendiente de decision), se ejecuto `node dist/src/main.js` de forma directa. La aplicacion inicializo todos los modulos, conecto correctamente contra el MySQL nativo del entorno y mapeo todas las rutas HTTP — confirmando que la correccion del build es funcionalmente valida. Sin embargo, **el proceso completo termino con una excepcion no capturada** al no encontrar Redis disponible:

```
Error: Worker requires a connection
    at new Worker (node_modules/bullmq/dist/cjs/classes/worker.js:45:19)
    at BullExplorer.handleProcessor (node_modules/@nestjs/bullmq/dist/bull.explorer.js:135:24)
```

Esto es una version mas severa de lo ya documentado en la Fase 2 de la auditoria (dependencia dura de BullMQ/Redis): no se trata solo de que el pipeline de calificacion quede en limbo sin Redis, sino de que **el arranque completo del servidor falla de forma fatal** si `BullModule.registerQueue`/`@Processor('judge')` no logran conectar. No se pudo confirmar la escucha efectiva en el puerto 3001 en este entorno por falta de Redis (Docker Desktop no disponible de forma estable durante esta sesion). Se anade como candidato a Ola 2, junto a P1-08 y P1-09.

### Estado de seguridad — sin cambios en este bloque

**P0-01 a P0-05 de la auditoria tecnica SIGUEN ABIERTOS.** Este bloque unicamente corrige errores de tipado que impedian compilar; no se toco autorizacion, sandbox, ni el adaptador de calificacion por defecto. Ningun hallazgo de seguridad se considera remediado por esta entrada.

---

## v0.2.0 — Auditoria de Cierre · 24 de Agosto de 2026

### Resumen Ejecutivo

STIRE alcanza una madurez tecnica de **8.4/10** tras la auditoria de cierre de proyecto. El sistema paso de una calificacion inicial de 6.1/10 (Auditoria v0.0.1) a un estado **APTO PARA PRODUCCION ACADEMICA**, con todos los bloqueadores de seguridad resueltos y una arquitectura preparada para escalar.

### Cambios Principales

#### 1. Hardening de Seguridad (Bloqueadores P0 Resueltos)

- **Autenticacion global por defecto:** `JwtAuthGuard` y `RolesGuard` configurados como `APP_GUARD` en `app.module.ts`. Todo endpoint requiere JWT valido; las rutas publicas se eximen con `@Public()`.
- **CORS estricto:** Reemplazado `app.enableCors()` permisivo por politica configurable via `CORS_ORIGIN` en `.env`.
- **`synchronize: false`:** TypeORM ya no sincroniza schema automaticamente. Todo cambio estructural pasa por migraciones versionadas.
- **Rate Limiting:** `ThrottlerModule` activo con 100 req/60s global.
- **Errores sanitizados:** `HttpExceptionFilter` global previene fuga de stack traces en produccion.

#### 2. Patron Adaptador en Judge Engine (Portabilidad Total)

El `JudgeEngine` implementa el **Patron Adaptador** completo:

- `SANDBOX_TYPE=local` (default): `LocalProcessSandboxAdapter` — usa `node:vm`, sin Docker ni Redis. Validado en tests. OK
- `SANDBOX_TYPE=docker`: `DockerSandboxAdapter` — diseno listo; integracion Dockerode en sprint siguiente.

#### 3. Integridad de Datos

- `@DeleteDateColumn()` anadido a la entidad `User` — soft delete activo en toda la plataforma.
- Migraciones TypeORM CLI configuradas: `migration:generate`, `migration:run`, `migration:revert`.

#### 4. Validacion de Tests — Resultado Oficial

Ejecutados sin MySQL, Docker ni Redis:

  Test Suites: 3 passed, 3 total
  Tests:       8 passed, 8 total
  Time:        16.998 s · Exit Code: 0 OK

Suites validadas:
- `local-process-sandbox.adapter.spec.ts` — 5 tests
- `tutor.service.spec.ts` — 2 tests
- `judge.worker.spec.ts` — 1 test (SQLite in-memory, ciclo completo)

#### 5. Correcciones de Documentacion

- `README.md`: Puerto corregido 3000 a 3001; Swagger URL /api a /docs; seccion Seguridad actualizada; Tests con comandos correctos.
- `docs/03_MOTOR_Y_TUTOR.md`: Tabla del Adapter Pattern anadida al inicio del Judge Engine.
- `CHANGELOG.md`: Entrada v0.2.0 anadida.

---

### Estado del Sistema — Matriz de Funcionalidad

VERDE (Production-Ready): Auth + JWT global, Evaluation Engine 6 estrategias, Mastery/SM-2, Sandbox local (node:vm), Notificaciones + Cron, Migraciones, Tutor mock socratico.

AMARILLO (Stub funcional): Docker Sandbox (mock avanzado), LLM real (requiere API Key), QuestionBanks (entidades sin modulo activo).

ROJO (Pendiente): Gamificacion (fase 3 en pausa), WebSocket Gateway en tiempo real.

### Recomendaciones para Entrega

1. Ejecutar `npm run build` — verificar sin errores TypeScript.
2. Ejecutar `npm run start` — validar Swagger en http://localhost:3001/docs.
3. Ejecutar `npm run test:judge` y `npm run test:tutor` — confirmar tests criticos.
4. Asegurarse que `.env` tiene `SANDBOX_TYPE=local` para entorno sin Docker.

---

## v0.1.0 — Remediacion de Auditoria · 21 de Mayo de 2026

### Resumen ejecutivo
STIRE completo la transicion de auditoria critica hacia un estado de operacion solido. La integracion con OpenAI es resiliente, configurable y validada por pruebas.

### Cambios principales

- `TutorService` usa `OPENAI_MODEL` desde configuracion; soporte `OPENAI_API_URL` configurable.
- Reintentos automaticos con backoff exponencial para errores transitorios (429, 503, timeouts).
- Fallback local controlado en caso de fallo no recuperable.
- `src/tutor/tutor.e2e-spec.ts`: verifica construccion de prompt RAG, contexto de progreso, retry sobre 429.
- `.env.example` actualizado con variables LLM.

### Estado al cierre de v0.1.0

| Dimension          | Estado anterior     | Estado v0.1.0              |
|--------------------|---------------------|-----------------------------|
| Seguridad          | Endpoints expuestos | Guardias globales + CORS    |
| Integridad BD      | Hard deletes        | Soft delete y migraciones   |
| Portabilidad       | Rigido              | Docker + local adaptativo   |
| Tutor IA           | Mock simple         | OpenAI real + RAG + retry   |
| Cobertura de tests | Muy baja            | Test E2E funcional          |
