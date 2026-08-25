# STIRE — Estado del proyecto y punto de continuación
**Última actualización:** 2026-08-25 · **Commit actual:** `0600783` (rama `main`, repo público)
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

Se ejecutó una auditoría forense adversarial sobre el commit `c7aac0e`, seguida de una Ola 1 de remediación en cuatro bloques, y una reauditoría independiente sobre el resultado.

| Métrica | Antes (`c7aac0e`) | Ahora (`0600783`) |
|---|---|---|
| Calificación global | 3.05/10 | **≈5.1/10** |
| Build | ❌ 6 errores TypeScript | ✅ exit 0 |
| Arranque sin Docker ni Redis | ❌ el proceso moría | ✅ arranca y responde en `:3001/docs` |
| Tests | 19 suites / 105 tests | **33 suites / 183 tests** |
| Cobertura de `auth` | 0% | 79% servicio · 100% controller |
| Veracidad documental | 52% | **94.7%** |
| Veredicto | NO APTO | NO APTO (con hallazgos residuales acotados) |

**Lo que funciona hoy, verificado end-to-end contra la base de datos real:** un estudiante entrega código JavaScript, se ejecuta de verdad en un sandbox aislado, y recibe nota real (100 con solución correcta, 0 con incorrecta, `execution_results` persistido). Sin Docker, sin Redis.

---

## 2. Decisiones de arquitectura vigentes

**ADR 06 — Sandbox por proceso hijo endurecido.** `HardenedProcessSandboxAdapter` es el único adaptador real. Aísla con proceso hijo del SO: `--permission` (deniega fs, child_process, worker_threads, `process.binding`), `--disallow-code-generation-from-strings`, entorno mínimo (en Windows hay que declarar las variables que libuv inyecta a la fuerza), cortafuegos de red en preludio, `--max-old-space-size=128` y watchdog con `SIGKILL`. `SANDBOX_TYPE=hardened` por defecto; `docker` y `vm` **abortan el arranque** con excepción, nunca degradan a mock. Los adaptadores `LocalProcessSandboxAdapter` (vm, con RCE) y `DockerSandboxAdapter` (mock) fueron eliminados.

**ADR 07 — Sanitización con dos perfiles.** `RICH` para autoría docente (lista blanca generosa: tablas, imágenes, código, embeds de hosts permitidos) y `PLAIN` para texto de estudiante y de la IA (sin HTML). Saneamiento al escribir conservando Markdown, más saneamiento al renderizar. **Estado: diseñado, NO implementado.** P1-04 sigue abierto.

**ADR 08 — Redis opcional.** Puerto `JudgeQueue` con `InlineJudgeQueueAdapter` (por defecto, `setImmediate`, sin Redis) y `BullJudgeQueueAdapter`. `BullModule` se registra condicionalmente. El ciclo de instancias entre `SubmissionsService` y `JudgeExecutionService` se rompió con eventos de dominio (`judge.answer-graded` / `judge.answer-failed`, con `emitAsync`), no con `forwardRef`.

---

## 3. Cerrado y verificado por reauditoría independiente

P1-01 build · P0-01 escape de sandbox · P0-02 escalada de privilegios · P0-03 fuga de respuestas correctas · P0-04 CRUD de actividades · P0-05 juez mock · P1-03 rate limiting · P1-06 escalada horizontal entre docentes · P1-10 a P1-12 (módulo de usuarios) · P1-02 parcial (cobertura de auth).

---

## 4. Abierto — hallazgos de la reauditoría (Ola 2)

1. **El patrón `AuthorizationService` no se propagó.** `topic`, `learning-unit` y `content` quedan exactamente igual de expuestos que estaban `activities`/`class`/`section` antes de la Ola 1. **Este es el hallazgo importante: no es un bug, es que corregimos instancias en lugar de la clase de problema.**
2. **`topic.service.ts`** — verificación de propiedad que nunca puede fallar: compara contra `section.class`, una relación que nunca se carga.
3. **`POST /activity-questions` sin control de propiedad** — un docente inyecta preguntas, con su respuesta correcta, en actividades de otro docente.
4. **`activities.create()`** — el único de sus cinco métodos hermanos sin la verificación que sí tienen `update`/`publish`/`archive`/`remove` en el mismo archivo.
5. **Exfiltración por DNS en el sandbox** — `dns.promises.lookup` y `dns.Resolver` evaden el cortafuegos del preludio (probado con Node real). Los secretos siguen a salvo (entorno vacío); lo exfiltrable es el contenido de los test cases ocultos. Impacto bajo, corrección de dos líneas.

### Abierto de antes, no bloqueante
P1-04 XSS (ADR 07 sin implementar) · P1-05 dependencias (1 crítica + 18 altas) · P1-07 condición de carrera en `attemptsAllowed` · P1-08 eventos `submission.graded` sin garantía · P1-09 25 de 26 tablas sin migración de creación · `easeFactor` de SM-2 no persistido · integración del `ActivityLog` en el Tutor.

---

## 5. Ola 2 — instrucción para Claude Code

```
OLA 2 — Cerrar los hallazgos de la reauditoria del commit 0600783.

PUNTO 1 — Que el patron NO se pueda olvidar (hacer esto ANTES de replicar nada):
  Escribe un test de arquitectura que recorra TODOS los controllers via la metadata de Nest
  y falle si una ruta mutante (POST/PATCH/DELETE) no declara @Roles ni @Public.
  Mantener una lista explicita de excepciones justificadas dentro del propio test.
  Motivo: la Ola 1 corrigio 5 modulos y dejo 4 fuera. Replicar a mano el patron a los 4 que
  faltan repite el mismo error dentro de tres sprints. El test convierte "acuerdate de
  aplicarlo" en "CI no te deja olvidarlo". Este test debe FALLAR hoy: esa es su prueba.

PUNTO 2 — Propagar AuthorizationService a topic, learning-unit, content y activity-questions
  (creacion incluida). Mismo patron que ya funciona en activities/class/section/enrollment.
  Incluye activities.create(), que se quedo fuera.

PUNTO 3 — Bug de topic.service.ts: la verificacion compara contra section.class sin cargar
  esa relacion, asi que nunca falla. Cargar la relacion o resolver la cadena con una query
  explicita. Test que demuestre que ANTES pasaba y AHORA falla para un docente ajeno.

PUNTO 4 — Sandbox: extender el cortafuegos del preludio a dns.promises (lookup, resolve*)
  y a dns.Resolver.prototype. Test con el payload real de exfiltracion por DNS.

PUNTO 5 — Implementar ADR 07 (XSS) segun docs/ADR-06-07_SANDBOX_SIN_DOCKER_Y_CONTENIDO.md:
  perfiles RICH/PLAIN, saneamiento al escribir conservando Markdown + al renderizar.
  Ojo: content-rendering.service.spec.ts mockea DOMPurify entero, esos tests verdes no
  prueban nada. Anadir una suite SIN mock.

PUNTO 6 — npm audit fix (no disruptivo) y reportar que queda.

Build + test tras cada punto. Un commit por punto. Sin push sin aprobacion.
```

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

El material más fuerte no es el sistema, es el proceso: **3.05/10 → 5.1/10 medido con la misma vara y el mismo método**, con reauditoría independiente que además encontró cuatro cosas que la primera pasada no vio. Muy pocos trabajos académicos presentan una auditoría adversarial de su propio sistema, un plan de remediación ejecutado con evidencia por commit, y una segunda pasada que refuta parte del trabajo propio.

Guardar para la presentación: la prueba end-to-end con `stdout: "6"` capturado de ejecución real, la tabla de los 10 vectores de ataque bloqueados por el sandbox, y esta tabla de antes/después.

Cuando la Ola 2 cierre, publicar una versión **saneada** del informe — hallazgos, severidades y remediación, sin payloads funcionales.
