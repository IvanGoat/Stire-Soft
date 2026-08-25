# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-08-24
### Added
- `LocalProcessSandboxAdapter`: ejecución de JavaScript aislada con `node:vm` (timeout 1500ms), sin dependencia de Docker. Activable via `SANDBOX_TYPE=local`.
- `SandboxAdapter` interface y factory en `JudgeEngineModule` — Patrón Adaptador completo.
- `@DeleteDateColumn()` en `User` entity — soft delete habilitado en toda la plataforma.
- `HttpExceptionFilter` global para sanitizar errores en producción.
- Documentación actualizada: puerto correcto (3001), estado del Sandbox, resultados de tests verificados.

### Fixed
- Puerto en README.md corregido de 3000 a 3001.
- Endpoint Swagger corregido de `/api` a `/docs`.
- Inconsistencia entre documentación del Docker Sandbox y estado real de implementación clarificada.

### Security
- `JwtAuthGuard` + `RolesGuard` registrados como `APP_GUARD` global — protección por defecto en todos los endpoints.
- `CORS_ORIGIN` configurable vía `.env` — política estricta de lista blanca.
- `synchronize: false` en TypeORM — schema gestionado solo por migraciones versionadas.
- `ThrottlerModule` activo con rate limiting configurable por endpoint.

### Tests
- Validados con evidencia real: `Test Suites: 3 passed · Tests: 8 passed · Exit Code: 0`.
- `judge.worker.spec.ts` corre con SQLite in-memory (sin MySQL requerido).
- `local-process-sandbox.adapter.spec.ts` y `tutor.service.spec.ts` pasan sin infraestructura externa.

## [0.1.0] - 2026-05-21

### Added
- Added support for multiple execution environments via `SANDBOX_TYPE`.
- Integrated real OpenAI tutor engine with configurable model selection through `.env`.
- Added automatic retry logic with exponential backoff for transient OpenAI API failures.
- Added TypeORM migration support and a hardened database initialization flow.

### Fixed
- Fixed critical security issues by applying a global JWT guard and strict CORS policy.
- Fixed database integrity issues with foreign key constraints and replaced hard deletes with soft deletes.
- Resolved critical audit findings by hardening the backend and improving test coverage.

### Security
- Secured user endpoints with global authentication guard.
- Restricted Swagger access and tightened API exposure.

### Docs
- Added documentation and release notes summarizing architecture, test coverage, and audit remediation.
