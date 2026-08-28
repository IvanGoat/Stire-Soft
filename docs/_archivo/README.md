# docs/_archivo/ — Documentos históricos

Esta carpeta contiene documentación que **ya no es vigente**, pero que se conserva
deliberadamente como evidencia del proceso de ingeniería del proyecto: planes de trabajo ya
ejecutados, decisiones de un bloque ya cerrado, revisiones puntuales ya superadas, y una línea
de gestión de proyecto (`gestion-v3-descartada/`) que se evaluó y se descartó a favor de otra
metodología.

**No se borra porque el proceso — auditorías adversariales, planes de remediación ejecutados
punto por punto con evidencia, decisiones tomadas y luego revisadas — es, para este proyecto,
tan parte del material de defensa como el sistema en sí.** Un documento archivado demuestra
que hubo un plan, que se ejecutó, y qué cambió respecto a lo planeado — borrarlo solo deja el
resultado final, sin el rastro de cómo se llegó ahí.

Cada archivo aquí lleva, al inicio, una cabecera que indica que es histórico y remite al
documento vigente (`docs/ESTADO_STIRE_HANDOFF.md`) para el estado real y actual del proyecto.
**Ningún documento de esta carpeta debe citarse como fuente de verdad del estado presente del
sistema** — para eso está `docs/ESTADO_STIRE_HANDOFF.md`, siempre.

## Qué hay aquí

| Archivo/carpeta | Qué es |
|---|---|
| `PLAN_OLA1_BLOQUE1_BUILD.md` | Plan de trabajo del primer bloque de la Ola 1 de remediación (reparación del build). Ejecutado. |
| `DECISIONES_BLOQUE2_Y_ADDENDA.md` | Decisiones de arquitectura del Bloque 2 de la Ola 1. Ejecutado. |
| `REVISION_2.1_Y_AMPLIACION_2.2.md` | Revisión puntual 2.1 y su ampliación 2.2. Superada por olas posteriores. |
| `REVISION_2.2_Y_SEGURIDAD_DEL_REPO.md` | Revisión de seguridad del repositorio en el punto 2.2. Superada. |
| `REPORTE_FINAL_ESTABILIDAD.md` | Reporte de estabilidad de una versión anterior del sistema. Los datos que reporta ya no reflejan el estado actual — ver `docs/ESTADO_STIRE_HANDOFF.md` para las cifras vigentes. |
| `gestion-v3-descartada/` | Una tercera línea de metodología de gestión de proyecto (tablero Kanban, disponibilidad de equipo, formatos de reporte/ceremonia, entregables del Reto 1) que se evaluó y no se adoptó — la metodología vigente está en `docs/05_METODOLOGIA_Y_EQUIPO.md`. |

## Nota sobre archivos que NO están aquí

Algunos documentos de auditoría con detalle de hallazgos de seguridad todavía abiertos, o con
payloads de ataque funcionales, permanecen **fuera del control de versiones** (gitignorados) en
`docs/` directamente — no se mueven a esta carpeta porque el criterio de exclusión no es "es
viejo", es "documenta una vulnerabilidad mientras el repositorio es público". Ver `.gitignore`
y `CLAUDE.md` (sección "Seguridad y datos") para la política completa.
