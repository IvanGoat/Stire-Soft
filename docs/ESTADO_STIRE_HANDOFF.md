# STIRE — Estado del proyecto y punto de continuación
**Última actualización:** 2026-08-26 · **Commit actual:** `087f7b4` (rama `main`, repo público)
**Propósito:** documento de traspaso. Leer esto basta para retomar el trabajo sin releer el histórico.

---

## 0. Formato de trabajo con el dueño del proyecto

Toda respuesta del CTO sigue esta estructura, en este orden:

**1 · Qué hizo Claude Code.** Traducción en lenguaje llano de lo que ejecutó: qué cambió, qué encontró, qué se rompió y qué quedó a medias. Sin jerga innecesaria y sin repetir su reporte literal — lo que importa es lo que significa.

**2 · Lectura y consejo.** El criterio de ingeniería: si la solución es correcta, qué riesgo introduce, qué se pasó por alto, qué decisión hay que tomar y con qué trade-offs. Aquí van las objeciones, las tablas comparativas cuando hay dilema, y la franqueza cuando algo no está a la altura. También aquí se corrige el CTO a sí mismo cuando Claude Code lo refuta con evidencia.

**3 · El prompt para Claude Code.** Un bloque cerrado, listo para copiar y pegar, con: alcance explícito, pasos numerados, criterio de parada, tests de regresión exigidos y qué documentación actualizar. Nunca instrucciones sueltas repartidas por el texto.

Reglas de tono: conciso, sin ceremonia, sin documento nuevo por cada turno. Un artefacto se crea solo cuando hay algo que persistir de verdad (una decisión de arquitectura, un traspaso, un plan largo). El resto vive en la conversación.

---

## 1. Dónde estamos

Se ejecutó una auditoría forense adversarial sobre el commit `c7aac0e`, seguida de una Ola 1 de remediación en cuatro bloques, una reauditoría independiente sobre el resultado, y una Ola 2 de remediación en ocho puntos sobre esos hallazgos.

| Métrica | Antes (`c7aac0e`) | Tras Ola 1 (`0600783`) | Tras Ola 2 (`087f7b4`) |
|---|---|---|---|
| Calificación global | 3.05/10 | ≈5.1/10 | **sin medir — pendiente de reauditoría, ver Nota abajo** |
| Build | ❌ 6 errores TypeScript | ✅ exit 0 | ✅ exit 0 |
| Arranque sin Docker ni Redis | ❌ el proceso moría | ✅ arranca y responde en `:3001/docs` | ✅ (verificado además de punta a punta: `npm ci → migration:run → db:seed:demo → build → start`, sobre BD vacía real) |
| Tests | 19 suites / 105 tests | 33 suites / 183 tests | **36 suites / 215 tests** |
| Tablas con migración de creación | — | 1 de 26 | **26 de 26** (línea base única, ver §2) |
| XSS (ADR 07) | — | diseñado, no implementado | **implementado y cableado en los 5 puntos de escritura** |
| Vulnerabilidades npm audit | — | 1 crítica + 18 altas | **7 aceptadas como riesgo (todas en `sqlite3`, dev-only — ver §4)** |
| Veredicto | NO APTO | NO APTO (hallazgos residuales acotados) | **sin veredicto propio — ver Nota** |

> **Nota — por qué no hay una calificación de la Ola 2:** el 5.1/10 de la Ola 1 lo puso una reauditoría independiente, no el autor de los cambios. Este documento reporta qué se cerró y con qué evidencia (commits, tests, verificación end-to-end con `curl`), pero **no se autoasigna una nota** — eso le corresponde a la próxima reauditoría, con el mismo prompt y la misma vara que las anteriores.

**Lo que funciona hoy, verificado end-to-end contra la base de datos real:** un estudiante entrega código JavaScript, se ejecuta de verdad en un sandbox aislado, y recibe nota real (100 con solución correcta, 0 con incorrecta, `execution_results` persistido). Sin Docker, sin Redis. **Nuevo en Ola 2:** el sistema completo se levanta desde una base de datos vacía con `npm ci → migration:run → db:seed:demo → npm run build → npm start`, y un docente + 3 estudiantes de demo (`docente.demo@stire.local` / `Demo1234!`, ver README) pueden iniciar sesión y ver datos reales de inmediato.

---

## 2. Decisiones de arquitectura vigentes

**ADR 06 — Sandbox por proceso hijo endurecido.** `HardenedProcessSandboxAdapter` es el único adaptador real. Aísla con proceso hijo del SO: `--permission` (deniega fs, child_process, worker_threads, `process.binding`), `--disallow-code-generation-from-strings`, entorno mínimo (en Windows hay que declarar las variables que libuv inyecta a la fuerza), cortafuegos de red en preludio (**Ola 2:** extendido a `dns.promises` y `dns.Resolver`, que evadían el cortafuegos original), `--max-old-space-size=128` y watchdog con `SIGKILL`. `SANDBOX_TYPE=hardened` por defecto; `docker` y `vm` **abortan el arranque** con excepción, nunca degradan a mock.

**ADR 07 — Sanitización con dos perfiles. Estado: implementado en Ola 2.** `RICH` para autoría docente (`content.body`, `activity.description`, `activity_question.question` — lista blanca generosa: tablas, imágenes, código, `iframe` solo de hosts permitidos) y `PLAIN` para texto de estudiante y de la IA (`submission_answer.feedback`, `tutor_conversation.content` — sin HTML). Saneamiento al escribir conservando Markdown, más saneamiento al renderizar. Suite sin mocks: `content-rendering.service.no-mock.spec.ts`. P1-04 cerrado.

**ADR 08 — Redis opcional.** Puerto `JudgeQueue` con `InlineJudgeQueueAdapter` (por defecto, `setImmediate`, sin Redis) y `BullJudgeQueueAdapter`. `BullModule` se registra condicionalmente. El ciclo de instancias entre `SubmissionsService` y `JudgeExecutionService` se rompió con eventos de dominio (`judge.answer-graded` / `judge.answer-failed`, con `emitAsync`), no con `forwardRef`.

**Línea base de migraciones (Ola 2, sin ADR propio — es infraestructura, no una decisión de diseño).** Las 5 migraciones incrementales anteriores (ninguna con los `CREATE TABLE` base — 25 de 26 tablas solo existían porque alguna vez se corrió con `synchronize: true`) quedan squasheadas en `src/migrations/1779000000000-InitialSchema.ts`: 26 tablas, todas las FK e índices, generada contra una base de datos vacía real y verificada con `migration:run` de punta a punta.

---

## 3. Cerrado y verificado

**Ola 1** (por reauditoría independiente): P1-01 build · P0-01 escape de sandbox · P0-02 escalada de privilegios · P0-03 fuga de respuestas correctas · P0-04 CRUD de actividades · P0-05 juez mock · P1-03 rate limiting · P1-06 escalada horizontal entre docentes · P1-10 a P1-12 (módulo de usuarios) · P1-02 parcial (cobertura de auth).

**Ola 2** (por el propio autor del cambio — pendiente de reauditoría, ver §1): propagación de `AuthorizationService` a `topic`/`learning-unit`/`content`/`activity-questions`/`activities.create()` · bug de ownership en `topic.service.ts` que nunca podía fallar · exfiltración por DNS en el sandbox (`dns.promises`/`dns.Resolver`) · P1-09 línea base de migraciones · P1-04 XSS (ADR 07) · P1-05 parcial (`npm audit fix`, 39→7 vulnerabilidades) · test de arquitectura que impide que el patrón de `@Roles`/`@Public` se vuelva a olvidar · dos bugs de reproducibilidad en `tsconfig.json` que rompían `npm start` en un checkout limpio.

Detalle completo, con commits, en `docs/RELEASE_NOTES.md` (v0.4.0).

---

## 4. Abierto

1. **P1-07** — condición de carrera en el límite de intentos (`startSubmission`, sin `UNIQUE` constraint).
2. **P1-08** — eventos `submission.graded` sin garantía de entrega si el proceso de negocio falla.
3. `easeFactor` de SM-2 no persistido · integración del `ActivityLog` en el Tutor — sin tocar, heredado de antes de Ola 1.

### Riesgos aceptados (decisión explícita del dueño del proyecto, cierre de Ola 2)

Estos dos ítems **no están pendientes** — se revisaron y se decidió conscientemente no actuar sobre ellos, o cambiar la regla en vez del código. No deben reabrirse como hallazgos en la próxima reauditoría sin que cambie el hecho que los sostiene.

1. **P1-05 (parcial) — 7 vulnerabilidades npm restantes** (2 low, 4 high, 1 critical), todas en el árbol de `sqlite3`. **Riesgo aceptado:** `sqlite3` es una devDependency usada únicamente para bases de datos en memoria en tests (`src/test-data-source.ts`) — nunca corre en producción ni en el proceso servido a usuarios. El único fix disponible exige un bump mayor de `sqlite3` (`--force`), que puede romper la API de tests o requerir binarios prebuilt distintos. Sin impacto en ejecución real: no se hace el bump.
2. **Regla de inyección de repositorios** (`docs/04_ESTANDARES_Y_SEGURIDAD.md` §1.1) — la regla original ("terminantemente prohibido" inyectar `Repository<Entity>` directo) no describía el código real desde la Ola 1 (`AuthorizationService`) y menos aún tras la Ola 2. **Decisión: se cambió la regla, no el código.** Repositorio Personalizado obligatorio solo con complejidad real de consulta (`QueryBuilder`, agregaciones, índices); `Repository<Entity>` directo permitido en CRUD simple. Una regla que el proyecto entero incumple no protege nada — hace mentir a la documentación.

---

## 5. Ola 2 — instrucción ejecutada

La instrucción completa (8 puntos) que produjo el estado descrito en §1–§4 queda registrada tal cual se recibió, en `docs/RELEASE_NOTES.md` v0.4.0 junto con los commits de cada punto. No se repite aquí para no duplicar la fuente de verdad — este documento resume el resultado; RELEASE_NOTES.md tiene el detalle punto por punto.

---

## 6. Reglas de trabajo de este proyecto

- **Todo hallazgo que emita el CTO se trata como HIPÓTESIS hasta verificarlo contra el árbol de trabajo.** Dos hallazgos suyos ya cayeron con evidencia (el `env` en Windows, causa real libuv; y P1-13, que resultó ser código muerto). Cuestionarlos con código es el comportamiento esperado, no una excepción.
- **Regla de Oro:** `npm run build` + `npm test` tras cada bloque. Contador de errores estrictamente decreciente. Si algo rompe, parar y reportar.
- **Prohibido** `as any`, `@ts-ignore`, relajar `tsconfig` o desactivar reglas para hacer pasar un build.
- **Sin test, un fix no está terminado.** El test prueba la propiedad, no la intención.
- **Sin commit sin mensaje aprobado. Sin push sin confirmación.**
- **`npm run lint` incluye `--fix` y muta el árbol de trabajo.** Para auditar formato, usar `eslint` directamente sin `--fix`.
- **Documentos con detalle de vulnerabilidades abiertas van en `.gitignore`**, nunca al repo (que es público por decisión del dueño). El código corregido sí se publica.
- **El repositorio es público por decisión explícita.** No volver a proponer hacerlo privado. Historial verificado limpio: sin secretos, `.env` nunca trackeado. La única condición: si se despliega en un servidor accesible, cerrar antes los hallazgos de autorización abiertos.

---

## 7. Para la defensa del proyecto

El material más fuerte no es el sistema, es el proceso: **3.05/10 → 5.1/10 medido con la misma vara y el mismo método**, con reauditoría independiente que además encontró cuatro cosas que la primera pasada no vio, seguida de una Ola 2 que las cerró y — por su cuenta — encontró y corrigió dos bugs de reproducibilidad más (`tsconfig.json`) que ni la auditoría original ni la reauditoría habían tocado. Muy pocos trabajos académicos presentan una auditoría adversarial de su propio sistema, un plan de remediación ejecutado con evidencia por commit, y una segunda pasada que refuta parte del trabajo propio.

Guardar para la presentación: la prueba end-to-end con `stdout: "6"` capturado de ejecución real, la tabla de los 10 vectores de ataque bloqueados por el sandbox, esta tabla de antes/después, y el log literal de la verificación `npm ci → migration:run → db:seed:demo → build → start` sobre una base de datos vacía (Ola 2) — falló dos veces antes de pasar limpia, lo cual es evidencia más fuerte que si hubiera pasado a la primera.

Publicar una versión **saneada** del informe — hallazgos, severidades y remediación, sin payloads funcionales — antes de la sustentación.
