> **DOCUMENTO HISTORICO — no vigente.** Conservado como evidencia del proceso de ingenieria.
> Estado actual: `docs/ESTADO_STIRE_HANDOFF.md`. Archivado el 2026-08-26.

# STIRE_Pitch_Ingles_60s.docx / .pdf — versión anterior del pitch

Ambos archivos son binarios (Word/PDF), así que la cabecera de "documento histórico" que llevan
el resto de los archivos de `docs/_archivo/` no se puede insertar dentro de su contenido sin
reescribir el documento — esta nota cumple esa misma función como archivo de acompañamiento.

Contienen el guión de pitch anterior (60 segundos, en inglés, con traducción, guía fonética,
guía de oratoria y evidencia del prompt ROCAS) que fue **reemplazado** por
`docs/pitch/PITCH_RETO_01_EN.md` durante la Reorganización Documental del 2026-08-26. La guía
fonética de este documento se extrajo antes de archivarlo — ver `docs/pitch/GUIA_PRONUNCIACION.md`.

El guión anterior usaba NestJS + PostgreSQL como stack declarado y evitaba deliberadamente
mencionar Docker/Redis/cola de procesamiento (documentando esa decisión explícitamente en su
sección 5, "Evidencia del prompt ROCAS"). El guión vigente usa NestJS + TypeORM + MySQL en el
backend y Next.js + React en el frontend, y sí menciona el sandbox de ejecución — corregido para
describir el aislamiento real por proceso del sistema operativo, sin Docker (ver la nota de
corrección en `docs/pitch/PITCH_RETO_01_EN.md`).
