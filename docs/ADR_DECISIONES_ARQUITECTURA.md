# STIRE — ADR 06, ADR 07 y ADR 08

**Decisiones de arquitectura del sandbox de ejecución, la sanitización de contenido y la cola
de calificación.**

> **Nota de publicación (Reorganización Documental):** este documento reemplaza a
> `ADR-06-07_SANDBOX_SIN_DOCKER_Y_CONTENIDO.md`, que permaneció fuera del repositorio público
> (gitignorado) mientras contuvo el catálogo completo de payloads de ataque probados contra el
> sandbox y un fragmento de código de referencia que ya quedó desactualizado (no reflejaba las
> correcciones de Ola 2/Ola 3 al cortafuegos de red). Esta versión conserva la decisión de
> arquitectura, la comparativa de opciones evaluadas y los riesgos residuales — que es lo que un
> ADR necesita mostrar — sin los payloads de ataque literales ni el código obsoleto. El detalle
> completo de los vectores de ataque probados y el historial de hallazgos vive en los documentos
> de auditoría (`docs/AUDITORIA_TECNICA_ALTA_INTENSIDAD.md`, `docs/REAUDITORIA_CIERRE_OLA1.md`,
> `docs/REAUDITORIA_OLA2.md`), que permanecen gitignorados por la misma política de no publicar
> detalle de vulnerabilidades mientras el repositorio sea público.

---

# ADR 06 — Aislamiento de ejecución de código sin Docker

## Contexto y restricción

El sistema necesita ejecutar código no confiable de estudiantes. Los adaptadores explorados antes de esta decisión eran inviables:

- Aislar por contexto de JavaScript (`node:vm`) aísla *scope*, no *proceso*; nunca fue una frontera de seguridad real frente a código adversarial.
- Un adaptador Docker no es viable si la infraestructura Docker no está disponible en el entorno de despliegue.

Requisito del dueño del producto: **el sandbox debe funcionar y poder demostrarse**, sin depender de Docker.

## Decisión

Se introduce `HardenedProcessSandboxAdapter`, que pasa a ser el valor por defecto de `SANDBOX_TYPE`.

Aísla mediante **proceso hijo del sistema operativo**, no mediante contexto de JavaScript. Cuatro barreras independientes:

| Barrera | Mecanismo | Neutraliza |
|---|---|---|
| Entorno vacío | `spawn(..., { env: {} })` | Robo de secretos del proceso servidor (`JWT_SECRET`, credenciales de base de datos, claves de API) — no hay nada que robar en ese proceso |
| Modelo de permisos de Node | `--permission` sin `--allow-fs-write`, `--allow-child-process`, `--allow-worker`, `--allow-addons` | Lectura/escritura de disco, ejecución de comandos del sistema, hilos y bindings nativos |
| Sin generación de código | `--disallow-code-generation-from-strings` | Escape de contexto vía construcción dinámica de funciones |
| Cortafuegos de red en preludio | Script `--require` que anula las vías de conexión saliente y, desde Ola 3, también las de escucha entrante | Exfiltración y SSRF contra servicios internos (base de datos, la propia API) |

Más los límites de recurso: límite de memoria del heap V8, watchdog con `SIGKILL` por timeout, y tope de bytes de salida.

## Comparativa de opciones evaluadas

| Opción | Pros | Contras | Esfuerzo |
|---|---|---|---|
| **A. Proceso hijo endurecido** ✅ elegida | Cero infraestructura externa; funciona en cualquier sistema operativo; aislamiento a nivel de SO; los estudiantes conservan la autocalificación | Solo JavaScript; sin cuota estricta de CPU (solo timeout); el cortafuegos de red es defensa en profundidad, no del kernel | Bajo |
| B. `node:vm` | Ya escrito | No es una frontera de seguridad real frente a código adversarial | — |
| C. `isolated-vm` | Aislamiento V8 real con cuota de memoria nativa | Módulo nativo: exige toolchain de compilación C++; compatibilidad con versiones recientes de Node no garantizada; sigue siendo un solo proceso | Medio-Alto |
| D. Docker / gVisor | Estándar de la industria; multi-lenguaje; cuotas de CPU/RAM/red del kernel | Requiere infraestructura que no siempre está disponible | Alto + infraestructura |

**Nota de trayectoria:** A y D no compiten, se encadenan. El Patrón Adaptador permite que el día que haya infraestructura Docker real, D entre detrás de la misma interfaz `SandboxAdapter.executeIsolated()` sin tocar el resto del pipeline de calificación. Esta decisión valida el patrón en lugar de contradecirlo.

## Riesgos residuales — documentados, no ocultos

1. **Sin cuota estricta de CPU.** Solo hay timeout de reloj. Un envío puede saturar un núcleo durante la ventana permitida. **Mitigación:** limitar la concurrencia de ejecución y mantener el timeout bajo.
2. **El bloqueo de red es en proceso, no del kernel.** El acceso a bindings internos de red está denegado por el modelo de permisos de Node, lo que cierra la vía conocida de acceso a sockets crudos, pero no puede afirmarse imposibilidad absoluta.
3. **Solo JavaScript.** Otros lenguajes exigen una infraestructura de ejecución distinta o un juez externo. Deben devolver un error explícito, nunca aprobarse por defecto.
4. **Higiene de temporales.** Cada ejecución escribe un archivo en el directorio temporal del sistema operativo; la limpieza va en el bloque `finally`, y debe existir además un barrido periódico.

## Implementación de referencia

`src/judge-engine/hardened-process-sandbox.adapter.ts` — código vigente, ver el archivo fuente para el mecanismo exacto (evoluciona con cada ola de remediación; este documento describe la decisión, no un snapshot del código).

Registro en `judge-engine.module.ts` — **fail-closed**: cualquier valor de `SANDBOX_TYPE` no reconocido, o los valores `docker`/`vm` (adaptadores descartados), abortan el arranque con una excepción explícita en vez de degradar silenciosamente a un adaptador inseguro.

---

# ADR 07 — Sanitización de contenido con máxima flexibilidad docente

## Contexto

El requisito es que los docentes creen sus cursos **como quieran**: tablas, imágenes, bloques de código, vídeo incrustado. Una sanitización agresiva mata esa flexibilidad; ninguna sanitización deja el sistema expuesto a XSS almacenado.

## Decisión: dos perfiles de confianza + saneamiento en dos capas

**Perfiles según quién escribe:**

| Perfil | Aplica a | Política |
|---|---|---|
| `RICH` | Contenido de autoría docente: `content.body`, `activity.description`, `activity_question.question` | Lista blanca **generosa**: encabezados, listas, tablas, `img`, `a`, `blockquote`, `pre`/`code` con `class` (resaltado de sintaxis), y `iframe` **solo** contra hosts permitidos (YouTube, Vimeo). Prohibidos `script`, `style`, atributos de evento (`on*`) y el esquema `javascript:` |
| `PLAIN` | Texto de estudiante o IA: `submission_answer.feedback`, `tutor_conversation.content` | Sin HTML. Se escapa todo. Un estudiante nunca necesita inyectar marcado |

**Dos capas, porque una no basta:**

1. **Al escribir** — sanea el `create`/`update` de cada servicio que persiste el campo. **Conserva el formato Markdown original**: no convierte a HTML, así que no hay migración de datos ni impacto en el frontend. Elimina el HTML peligroso ya incrustado en el texto fuente.
2. **Al renderizar** — único camino hacia HTML, con la configuración de lista blanca del perfil correspondiente. Esta capa es la que atrapa los vectores que nacen del propio Markdown (por ejemplo, un enlace con esquema `javascript:` en la sintaxis `[texto](...)`), invisibles para la capa de escritura porque ahí son simple texto.

Ninguna de las dos capas es redundante: cubren vectores distintos. Contrato de exposición de la capa de renderizado: `docs/CONTRATO_CONTENT_RENDERING.md`.

---

# ADR 08 — Redis opcional para el Judge Engine

## Decisión

Puerto `JudgeQueue` con dos implementaciones intercambiables: `InlineJudgeQueueAdapter` (por defecto, ejecuta la calificación en el mismo proceso vía `setImmediate`, sin necesidad de Redis) y `BullJudgeQueueAdapter` (cola real con BullMQ, cuando Redis está disponible). `BullModule` se registra condicionalmente según configuración.

## Justificación

El sistema debía poder arrancar y calificar código real sin depender de infraestructura Redis no disponible en todos los entornos de desarrollo o despliegue. El ciclo de dependencias entre el servicio de envíos y el servicio de ejecución del juez se rompe con eventos de dominio (`judge.answer-graded`/`judge.answer-failed`), no con una referencia circular forzada entre servicios.

## Consecuencia

El pipeline de calificación funciona de forma idéntica desde la perspectiva del resto del sistema, sin importar cuál de los dos adaptadores está activo — el mismo patrón de Puerto/Adaptador que ADR 06 aplica al sandbox de ejecución.
