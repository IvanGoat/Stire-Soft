> **DOCUMENTO HISTORICO — no vigente.** Conservado como evidencia del proceso de ingenieria.
> Estado actual: `docs/ESTADO_STIRE_HANDOFF.md`. Archivado el 2026-08-26.

# 🗂️ TABLERO KANBAN — STIRE-Soft
**Sprint 2 · 22–28 de agosto de 2026** · Cierra **viernes 28, 8:00 pm**
**Meta del sprint:** cerrar MODESEC Fase II completo y dejar los tres entregables listos para congelar.
**Mantenedor:** Jorge Cervantes · **Última actualización:** martes 25 de agosto, 6:00 pm

---

## 📖 Cómo se lee y se usa este tablero

| Columna | Responde a | Para entrar hay que… |
|---|---|---|
| 📥 **Backlog** | ¿Qué falta en todo el reto? | Nada. Aquí vive todo lo que la rúbrica exige y aún no se comprometió |
| 📋 **Por Hacer** | ¿A qué me comprometí **esta semana**? | Haberla jalado el **viernes en el Arranque**. Máx. **3 por persona**. Entre semana no se agregan tarjetas |
| ⚙️ **En Progreso** | ¿Qué estoy tocando **hoy**? | Tener **menos de 2** tarjetas aquí. Si ya tienes 2, cierra una primero |
| ✅ **Hecho** | ¿Qué puedo **demostrar**? | Cumplir las 4 condiciones de la DoD **y tener el commit en `main`** |

**Semáforo** (se declara en el Reporte del martes): 🟢 avanza · 🟡 en riesgo, puede no llegar al viernes · 🔴 bloqueada, necesita intervención hoy
**Talla:** **S** ≤ 2 h · **M** ≤ 4 h · **L** > 4 h → *una tarjeta L hay que partirla, no se va a cerrar esta semana*

> ⚠️ **El error más común:** mover a `Hecho` cuando uno terminó de escribir. `Hecho` significa
> **mergeado a `main`, revisado y demostrable el viernes**. Un Pull Request abierto sigue siendo `En Progreso`.

**Mover una tarjeta = editar este archivo y commitear** (`chore: mueve S2-03 a Hecho`). El historial
de este archivo es, por sí solo, el acta de gestión del equipo ante el docente.

---

## ⚙️ En Progreso — WIP ≤ 2 por persona

| ID | 🚦 | Talla | Tarjeta | Dueño | Desde | Vence | Terminada cuando… |
|---|---|---|---|---|---|---|---|
| S2-01 | 🟢 | M | **§3.3 Ventana Estándar** — maqueta y explicación de las 5 secciones funcionales | José | sáb 22 | mié 27 | El archivo está en `docs/modesec/ventanas/` con Header, Menú, Contenido, Acciones y Footer, cada uno con su **función pedagógica** |
| S2-03 | 🟢 | M | **§3.1 Diagrama de Contenidos** — versión final de 3 módulos | Julio | sáb 22 | mié 27 | Árbol de 3 módulos con temas y un resultado de aprendizaje **observable** por tema |
| S2-06 | 🟢 | S | **Checklist de verificación** contra la rúbrica DDS3-01 y la Guía Clase 02 | Jorge | lun 24 | mié 27 | Existe una lista de chequeo aplicable a los 3 entregables, ítem por ítem |
| S2-09 | 🟡 | S | **Consolidar `EVIDENCIA_ROCAS.md`** con los prompts de los 5 | Pedro | dom 23 | jue 27 | Cada entregable producido con IA tiene su prompt ROCAS **con iteraciones** registrado |
| S2-10 | 🟢 | S | **`CODEOWNERS`**, protección de `main` y plantilla de Pull Request | Jeider | sáb 22 | mié 27 | `main` no acepta push directo y todo PR pide revisión del dueño del módulo |

> 🟡 **S2-09 en riesgo:** Pedro depende de que los demás le pasen los prompts que usaron. Recordarlo
> en el Reporte del jueves.

## 📋 Por Hacer — Sprint 2

| ID | Talla | Tarjeta | Dueño | Vence | Alimenta |
|---|---|---|---|---|---|
| S2-02 | M | **§3.3.1 Fichas de Descripción de Ventana** — 7 categorías, mínimo 3 ventanas | José | jue 27 | Entregable 2 |
| S2-04 | S | **§3.3.2 Guía de Metáforas** — metáfora rectora + tabla de correspondencias | Julio | jue 27 | Entregable 2 |
| S2-05 | M | **§3.3.3 Mapa de Navegación** — diagrama + tabla de transiciones | Julio | vie 28 | Entregable 2 |
| S2-07 | S | **Revisión cruzada** de los 4 documentos MODESEC; bloquear los que no cumplan formato | Jorge | vie 28 | Entregable 2 |
| S2-08 | S | **Actualizar la bitácora** con el Sprint 2 y pegar el acta del viernes | Pedro | vie 28 | Entregable 1 |
| S2-11 | S | **Coherencia MODESEC ↔ arquitectura real**: que cada acción del estudiante mapee a un endpoint existente o planificado | Jeider | vie 28 | Entregable 2 |
| S2-12 | S | **Ensayo 1 del pitch, cronometrado** (en el Cierre del viernes) | Los 5 | vie 28 | Entregable 3 |

## ✅ Hecho — Sprint 1 (15–21 de agosto), cerrado el viernes 21 a las 8:00 pm

| ID | Tarjeta | Dueño | Evidencia |
|---|---|---|---|
| S1-01 | **Definición del marco de trabajo:** investigación de metodologías ágiles y elección de *Sprint Semanal con Kanban por Módulos* | Jeider | `docs/05_METODOLOGIA_Y_EQUIPO.md` · commit `docs:` |
| S1-02 | **Bitácora publicada** — `MONITOREO_SEMANAL.md` creada en la raíz del repositorio con la plantilla oficial del docente | Pedro | `MONITOREO_SEMANAL.md` · commit `docs: actualiza bitacora semana 1` |
| S1-03 | **Pitch en inglés de 60 s** — guión en 4 bloques (Hook · Problem · Solution · Tech+CTA) + tabla fonética | Pedro | `docs/pitch/PITCH_RETO_01_EN.md` |
| S1-04 | **Prompt ROCAS del pitch documentado** con sus iteraciones | Pedro | `docs/EVIDENCIA_ROCAS.md` — Entrada 001 |
| S1-05 | **Adelanto MODESEC Fase II** — borrador del Diagrama de Contenidos y primera maqueta de la Ventana Estándar | Julio · José | `docs/modesec/` |
| S1-06 | Estructura de carpetas y plantillas maestras de MODESEC Fase II | Jeider | `docs/modesec/PLANTILLAS_MODESEC_FASE2.md` |

**No cerrada en el Sprint 1:** las fichas de las 7 categorías — faltaba definir primero el listado
final de ventanas. Se replanificó como **S2-02**. *(Registrada como cuello de botella en la bitácora.)*

---

## 📥 Backlog

### Carril académico — Sprint 3 (29 ago – 4 sep) y siguientes

| ID | Tarjeta | Dueño previsto | Nota |
|---|---|---|---|
| S3-01 | Congelación del Reto 1: PR final a `main` y enlace enviado al docente | Jeider | Regla D-3: viernes 4 sep, 8:00 pm |
| S3-02 | Ensayo 2 del pitch, cronometrado, con retroalimentación de pronunciación | Los 5 | Antes del martes 8 sep |
| S3-03 | Corrección de lo que el docente observe en la clase del viernes 28 | Según el tema | Depende del punto de control |
| S4-01 | Pitch de 90 s (Reto 2, +30 s) — sustenta José | Pedro escribe | Progresión de la rúbrica |
| S4-02 | MODESEC §3.2 Guión Técnico Multimedial completo | Julio · José | Fase II, siguiente entrega |
| S4-03 | Prototipo navegable de la Ventana Estándar en Figma | José | Opcional, suma en sustentación |

### Carril de ingeniería — Ola 2 (independiente del académico)

| ID | Tarjeta | Nota |
|---|---|---|
| ING-01 | Test de arquitectura que exija `@Roles`/`@Public` en toda ruta mutante | Debe **fallar hoy**: esa es su prueba |
| ING-02 | Propagar `AuthorizationService` a `topic`, `learning-unit`, `content`, `activity-questions` | Hallazgo de clase, no de instancia |
| ING-03 | Bug de `topic.service.ts` — verifica contra una relación que nunca carga | — |
| ING-04 | Cortafuegos DNS del sandbox (`dns.promises`, `dns.Resolver`) | Corrección de 2 líneas |
| ING-05 | Implementar ADR 07 — sanitización RICH/PLAIN (XSS, P1-04) | Abierto desde la Ola 1 |

---

## 📊 Estado del Sprint 2 (corte: martes 25, 6:00 pm)

| Columna | Tarjetas |
|---|---|
| ✅ Hecho (Sprint 1) | 6 |
| ⚙️ En Progreso | 5 |
| 📋 Por Hacer | 7 |
| 📥 Backlog | 11 |

| Integrante | En Progreso | Por Hacer | ¿Respeta WIP ≤ 2? |
|---|---|---|---|
| Jeider | 1 | 1 | ✅ |
| Jorge | 1 | 1 | ✅ |
| José | 1 | 1 | ✅ |
| Julio | 1 | 2 | ✅ |
| Pedro | 1 | 1 | ✅ |
