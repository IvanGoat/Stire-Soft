# Contrato de `ContentRenderingService` y `GET /content/:id`

**Ola 3, Punto 5** (docs/REAUDITORIA_OLA2.md, hallazgo P1-R4): la "capa 2" del
saneamiento de ADR 07 (`renderMarkdownToHtml`) existía desde la Ola 2 pero
ningún endpoint la invocaba — el único vector que esa capa neutraliza
(`[texto](javascript:alert(1))` y sus variantes de mayúsculas/entidades) nunca
se ejercitaba en producción. Este documento fija el contrato para que no
vuelva a quedar sin conectar.

## Las dos capas, y qué campo devuelve cada una

`ContentRenderingService` tiene dos responsabilidades distintas, en dos
momentos distintos:

| Capa | Método | Cuándo corre | Qué hace |
|---|---|---|---|
| 1 — escritura | `sanitizeRichText` / `escapePlainText` | Al hacer `POST`/`PATCH` sobre `content.body`, `activity.description`, `activity_question.question` (RICH) o `submission_answer.feedback`, `tutor_conversation.content` (PLAIN) | Limpia HTML peligroso que ya viniera incrustado en el texto fuente, pero **conserva el Markdown tal cual** — no lo convierte a HTML. |
| 2 — lectura | `renderMarkdownToHtml` | Al leer, **solo si se pide explícitamente** | Convierte el Markdown (ya saneado en capa 1) a HTML con `marked`, y sanea el HTML resultante con DOMPurify — este es el único paso que neutraliza sintaxis Markdown como `[x](javascript:...)`, porque en el texto fuente eso es texto plano, invisible para la capa 1. |

## Contrato de `GET /content/:id`

```
GET /content/:id            → body: Markdown saneado en escritura (capa 1 únicamente)
GET /content/:id?format=markdown → idéntico al caso anterior, explícito
GET /content/:id?format=html     → body: HTML saneado (capas 1 + 2)
```

- El valor por defecto (sin `format`, o `format=markdown`) **no cambia respecto a antes de la Ola 3** — cualquier cliente existente sigue recibiendo Markdown, no HTML.
- `format=html` es la única vía por la que `renderMarkdownToHtml` se ejecuta hoy. Cualquier frontend que renderice `content.body` como HTML **debe** pedir `?format=html`, no convertir el Markdown él mismo — convertirlo del lado del cliente sin pasar por esta ruta reabre exactamente el vector que este contrato cierra.
- El resto de las reglas de autorización de `GET /content/:id` (docente dueño / estudiante matriculado y solo contenido visible / admin) se aplican igual con o sin `format` — `format` solo cambia la representación del `body`, nunca a quién se le sirve.
- Perfil de saneamiento usado en `format=html`: siempre `RICH` (autoría docente) — no hay hoy un caso de uso para `format=html` sobre PLAIN, ya que los campos PLAIN (`submission_answer.feedback`, `tutor_conversation.content`) no pasan por este endpoint.

## Qué NO cambia

- `content.body` guardado en base de datos sigue siendo Markdown, no HTML — `format=html` es una transformación en el momento de servir la respuesta, nunca se persiste.
- `findByUnit`/`findByUnitAll` (listados) siguen devolviendo Markdown sin convertir; `format=html` solo existe hoy en `GET /content/:id`. Si un futuro consumidor necesita HTML en el listado, debe extenderse ahí explícitamente — no asumir que ya funciona.

## Evidencia

`src/content/content.service.spec.ts`, describe `ContentService.findOne — ?format=html es real (Ola 3, Punto 5)`: usa `ContentRenderingService` real (DOMPurify + JSDOM reales, sin mocks) y prueba que `[texto](javascript:alert(1))` sale intacto sin `format`, y neutralizado (`<a>texto</a>`, sin `javascript:`) con `format=html`.
