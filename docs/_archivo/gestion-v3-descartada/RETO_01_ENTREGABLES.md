> **DOCUMENTO HISTORICO — no vigente.** Conservado como evidencia del proceso de ingenieria.
> Estado actual: `docs/ESTADO_STIRE_HANDOFF.md`. Archivado el 2026-08-26.

# 🎯 RETO 1 — Entregables, formato y criterio de aceptación
**Curso:** DDSE3 2026-2 · **Docente:** Dr. Raúl Emiro Toscano Miranda
**Fuente normativa:** `Guia_Estudiante_Clase_02.docx` §5 y presentación `DDS3-01.pdf`
**Se ejecuta en 3 sprints semanales:** Sprint 1 (15–21 ago, cerrado) · Sprint 2 (22–28 ago, en curso) · Sprint 3 (29 ago–4 sep)
**Sustentación:** martes 8 de septiembre, clase presencial

> Este documento es el contrato del reto. Si algo no está aquí, no se entrega. Si algo está aquí y no
> cumple su criterio de aceptación, **QA lo bloquea** y no entra al PR final.

---

## Línea de tiempo

| Sprint | Ventana | Cierre | Qué debe estar listo |
|---|---|---|---|
| **Sprint 1** ✅ | 15–21 ago | vie 21, 8:00 pm | Marco de trabajo · bitácora publicada · guión del pitch + fonética · evidencia ROCAS · adelanto MODESEC |
| **Sprint 2** ⚙️ | 22–28 ago | vie 28, 8:00 pm | **MODESEC Fase II completo:** §3.1, §3.3, §3.3.1, §3.3.2, §3.3.3 · checklist de rúbrica aplicado · ensayo 1 del pitch |
| **Sprint 3** 📋 | 29 ago–4 sep | vie 4 sep, 8:00 pm | **Congelación:** correcciones del punto de control, ensayo 2 cronometrado, PR final a `main`, enlace al docente |
| — | 5–7 sep | — | Solo pulido de forma. **Nada nuevo entra** (Regla D-3) |
| **Entrega** 🎓 | mar 8 sep | 4:00 pm | Repositorio entregado + sustentación del pitch (Pedro) |

**Ritmo dentro de cada sprint:** martes 8:00 pm Reporte de Avance · jueves 8:00 pm Reporte de Riesgo ·
viernes 8:00 pm Cierre y Arranque con los cinco. Ver [`REPORTES_Y_CEREMONIAS.md`](./REPORTES_Y_CEREMONIAS.md).

**Momento crítico — viernes 28 de agosto, clase de 10:00 a 12:00:** es la **última oportunidad de
preguntarle al docente si el formato va bien mientras todavía hay tiempo de corregir**. Se llega a esa
clase con MODESEC Fase II ya avanzado, no con preguntas abstractas. Un entregable mal formateado que
se descubre el 8 de septiembre ya no se arregla.

---

## Entregable 1 · Bitácora de Monitoreo

| | |
|---|---|
| **Qué pide la guía** | Actualizar y publicar `MONITOREO_SEMANAL.md` en la **raíz** del repositorio de GitHub |
| **Archivo** | `MONITOREO_SEMANAL.md` (raíz, no dentro de `docs/`) |
| **Dueño** | Pedro Romero (tarjetas S2-08, S2-09) |
| **Commit exigido** | `docs: actualiza bitacora semana X` |

**Criterio de aceptación (QA verifica los 6):**

1. Está en la raíz del repo, con el nombre exacto `MONITOREO_SEMANAL.md`.
2. Tabla de equipo completa: los 5 integrantes, rol, horario de trabajo individual y usuario de GitHub real.
3. Sección de entregables cumplidos con checkboxes marcados **solo si hay commit que lo respalde**.
4. Sección de Evidencia de Ingeniería de Prompts con al menos un prompt ROCAS completo, la
   herramienta usada y el resultado obtenido.
5. Sección de Cuellos de Botella diligenciada. **Si está vacía, es sospechosa** — siempre hubo algún
   bloqueo; documentarlo es lo que se califica.
6. Enlaces vivos a los documentos MODESEC y al guión del pitch.

---

## Entregable 2 · Avance MODESEC Fase II (Diseño Multimedial)

| | |
|---|---|
| **Qué pide la guía** | Documento con Diagrama de Contenidos, Ventana Estándar (por secciones **y** por las 7 categorías), Guía de Metáforas y Mapa de Navegación |
| **Archivos** | `docs/modesec/contenidos/*.md` (Julio) · `docs/modesec/ventanas/*.md` (José) |
| **Plantillas** | `docs/modesec/PLANTILLAS_MODESEC_FASE2.md` — de ahí se parte, no de cero |
| **Objeto de diseño** | **STIRE**: el tutor inteligente para la resolución de ejercicios de programación |

**Las cuatro piezas y su criterio de aceptación:**

| § | Pieza | Dueño | Criterio de aceptación |
|---|---|---|---|
| 3.1 | **Diagrama de Contenidos** | Julio (S2-03) | Jerarquía de **3 módulos**, cada uno con sus temas y el resultado de aprendizaje asociado. Representado como árbol (Mermaid o lista indentada), no como párrafo |
| 3.3 | **Ventana Estándar** | José (S2-01) | Maqueta en ASCII/texto o imagen, dividida y **explicada sección por sección**: Header, Menú, Zona de Contenido, Zona de Acciones, Footer. Cada sección con su función pedagógica, no solo su descripción visual |
| 3.3.1 | **Fichas de Descripción de Ventana** | José (S2-02) | Una ficha por ventana, mínimo 3 ventanas, cada una desglosada en las **7 categorías MODESEC**: Imagen · Nombre de ventana · Texto · Audio · Video · Animación · Acciones del estudiante. **Ninguna categoría puede quedar en blanco**; si no aplica, se escribe "No aplica" con su justificación |
| 3.3.2 | **Guía de Metáforas** | Julio (S2-04) | Una metáfora rectora declarada (p. ej. Laboratorio / Expedición / Taller) + tabla que mapea cada elemento de la interfaz a su equivalente en la metáfora + justificación pedagógica anclada en MOCAVI |
| 3.3.3 | **Mapa de Navegación** | Julio (S2-05) | Diagrama de flujo con todas las ventanas, sus transiciones y las condiciones de cada una. Sin nodos huérfanos y con ruta de retorno desde toda ventana |

**Regla de bloqueo de QA:** si una ficha deja categorías vacías, si la Ventana Estándar no está
explicada por secciones, o si el mapa tiene un nodo sin salida, Jorge devuelve la tarjeta a
`En Progreso`. **No se negocia con la rúbrica.**

**Verificación técnica adicional (Jeider, S2-11):** cada acción del estudiante declarada en las fichas
debe poder mapearse a una capacidad real o planificada de la API de STIRE. Un diseño multimedial que
no se puede implementar es deuda que se paga en el Reto 3.

---

## Entregable 3 · Pitch en inglés de 1 minuto

| | |
|---|---|
| **Qué pide la guía** | Sustentación oral de 60 segundos en clase presencial + entrega del **prompt ROCAS utilizado** y el **guión generado** |
| **Archivos** | `docs/pitch/PITCH_RETO_01_EN.md` (guión + fonética) · `docs/EVIDENCIA_ROCAS.md` (prompt e iteraciones) |
| **Autor del guión** | Pedro Romero (Sprint 1, cerrado) · **Sustenta:** Pedro (rotación declarada en metodología §4) |

**Estructura obligatoria (130–140 palabras, 60 s ±5 s):**

| Bloque | Tiempo | Contenido |
|---|---|---|
| Hook | 0–10 s | La afirmación que capta la atención |
| Problem | 10–25 s | El problema educativo concreto que resuelve STIRE |
| Solution & Value Prop | 25–45 s | Qué hace STIRE y por qué es distinto (mastery learning, SM-2, tutor adaptativo) |
| Tech Stack & CTA | 45–60 s | Arquitectura y llamado a la acción |

**Cómo se reparte la nota (rúbrica del docente):**

| Criterio | Peso | Cómo lo aseguramos |
|---|---|---|
| Estructura del pitch | 30% | Ensayo cronometrado 2 veces (S2-12 y S3-02); si pasa de 65 s se recorta el guión, no se habla más rápido |
| Pronunciación y fluidez | 30% | Tabla fonética de los términos difíciles + 2 ensayos con retroalimentación del equipo |
| Lenguaje técnico | 20% | Vocabulario de ingeniería de software educativo revisado por Jeider; nada de traducción literal |
| **Evidencia del prompt ROCAS** | **20%** | `EVIDENCIA_ROCAS.md` con el prompt **y sus iteraciones**. Este 20% es el más fácil de la rúbrica y el que más equipos pierden por no documentar |

**Nota sobre la progresión:** cada reto suma +30 s. Reto 1 = 60 s · Reto 2 = 90 s · Reto 3 = 120 s.
El guión debe escribirse de forma que se pueda **ampliar**, no reescribir.

---

## Definición de Terminado del Reto completo

El Reto 1 está terminado cuando **las cinco** condiciones se cumplen:

- [ ] `MONITOREO_SEMANAL.md` está en la raíz, actualizado y con commit propio de Pedro.
- [ ] Los 4 documentos MODESEC existen en `docs/modesec/`, aprobados por QA contra el checklist S2-06.
- [ ] El guión del pitch y la evidencia ROCAS están publicados y el pitch se ensayó cronometrado 2 veces.
- [ ] Los 5 integrantes tienen al menos un commit con su propia cuenta en este reto.
- [ ] El PR final está mergeado a `main` y el enlace del repositorio fue enviado al docente por la
      plataforma institucional.

---

*Dueño de este documento: Jeider Gómez (Líder Técnico). Se reemplaza por `RETO_02_ENTREGABLES.md` al
abrir el reto siguiente; este archivo no se borra — es el registro histórico del alcance comprometido.*
