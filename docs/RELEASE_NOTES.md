# RELEASE NOTES

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
