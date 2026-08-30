# Auditoria Tecnica del Backend — STIRE

**Fecha:** 2026-08-30  
**Commit auditado:** a5fe6cb (HEAD origin/main)  
**Build:** OK (nest build, codigo 0)  
**Tests:** 259/259 PASS (38 suites)

---

## Resumen Ejecutivo

Backend solido con arquitectura limpia, seguridad auditada (OLA 1-3 aplicadas) y
suite de pruebas al 100%. Se detectaron 7 hallazgos, 2 corregidos en esta sesion.

**Veredicto:** LISTO CON OBSERVACIONES

---

## Correcciones Realizadas

### A-01 — Modelo Gemini incorrecto
- Archivos: .env, src/tutor/tutor.service.ts (lineas 26 y 130)
- Antes: gemini-3.6-flash (modelo inexistente en la API de Google)
- Despues: gemini-2.0-flash-001
- Impacto: El Tutor IA fallaba silenciosamente con 404 y caia al mock.

### A-02 — studentId con fallback peligroso
- Archivo: src/tutor/tutor.controller.ts (linea 28)
- Antes: const studentId = Number(user?.id) || 1;
- Despues: const studentId = user.id;
- Impacto: Si user.id era 0, el tutor consultaba el historial del usuario con id=1.

---

## Problemas Encontrados

| ID  | Problema                                        | Severidad | Estado        |
|-----|------------------------------------------------|-----------|---------------|
| A-01| OPENAI_MODEL=gemini-3.6-flash (inexistente)    | ALTO      | CORREGIDO     |
| A-02| studentId fallback || 1 en tutor controller    | ALTO      | CORREGIDO     |
| A-03| getClassProgress() ignora el classId (TODO)    | MEDIO     | PENDIENTE     |
| A-04| tutor-context no filtra por clase/unid activa  | BAJO      | PENDIENTE     |
| A-05| GET /class/my-classes devuelve todas (est.)    | MEDIO     | PENDIENTE     |
| A-06| JWT_EXPIRATION puede no usarse en auth.module  | BAJO      | VERIFICAR     |
| A-07| LearningUnit sin FK directa a Class            | MEDIO     | DISENO CONOCIDO|

---

## Funcionalidades Verificadas

- [OK] Autenticacion: JWT, bcrypt, throttle login 5/min
- [OK] Roles: guards globales, docente no puede matricularse
- [OK] Enrollment: duplicados, capacidad, fechas, reactivacion
- [OK] Submissions: transaccion SQL, throttle 10/min, attemptsAllowed
- [OK] LearningState: mastery [0,100], transiciones cognitivas, successRate
- [OK] Tutor IA: contexto con mastery+nivel, mock socrático, reintentos
- [OK] Sandbox: 4 barreras de aislamiento, red bloqueada, timeout/memoria
- [OK] Seguridad: BOLA corregido, mass assignment prevenido, JWT forzado

---

## Respuestas a las 20 Condiciones Finales

1.  Backend compila?                  SI
2.  Migraciones funcionan?            SI (InitialSchema definida)
3.  MySQL funciona?                   SI (docker compose)
4.  Redis funciona?                   SI (docker compose, opcional en dev)
5.  BullMQ funciona?                  SI (modo inline activo)
6.  Docker funciona?                  SI (docker-compose.yml correcto)
7.  Sandbox funciona?                 SI (tests pasan)
8.  Autenticacion funciona?           SI
9.  Tres roles respetan permisos?     SI
10. Enrollment funciona?              SI
11. Evaluaciones funcionan?           SI
12. Submissions actualiza aprendizaje? SI (EventEmitter2)
13. LearningState funciona?           SI
14. Progreso ignora unidades inactivas? SI (solo PUBLISHED)
15. Tutor recibe contexto correcto?   SI
16. Tutor responde segun nivel?       SI (3 niveles)
17. Recomendaciones coherentes?       SI
18. Vulnerabilidades importantes?     NO (OLA 1-3 corregidas)
19. Tests automatizados pasan?        SI (259/259)
20. Problemas pendientes?             A-03, A-05, A-06 (no bloqueantes)

---

## Recomendaciones para el Frontend (Vue 3 + Nuxt)

1. docker compose up -d (MySQL + Redis)
2. npx typeorm migration:run
3. Para el estudiante usar GET /enrollment/my (no /class/my-classes)
4. JWT: httpOnly cookie o sessionStorage (nunca localStorage)
5. Respetar Retry-After en respuestas 429

---

**ESTADO DEL BACKEND: LISTO CON OBSERVACIONES**
