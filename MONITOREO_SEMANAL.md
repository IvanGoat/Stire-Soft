# 🚀 Bitácora de Monitoreo y Control N.º 2 — Proyecto: STIRE-Soft
**Curso:** DDSE3 — 2026-2 | **Grupo:** [G1 / G2]
**Repositorio GitHub:** https://github.com/Jeider-Gomez/Stire-Soft
**Semana reportada:** 24 – 28 de agosto de 2026 | **Cierre:** hoy viernes 28 de agosto, 8:00 p.m.
**Estado del Reto 1:** MODESEC Fase II con **4 de 6 piezas cerradas** · bitácora al día · guión del pitch listo
**Tablero Kanban (Trello):** `[pegar aquí el enlace del tablero]`

*STIRE-Soft es un Sistema Tutor Inteligente para la Resolución de Ejercicios: el estudiante entrega
código, el sistema lo ejecuta de verdad, lo califica y adapta los siguientes ejercicios a su nivel de
dominio.*

---

## 👥 1. Estructura del Equipo y Roles

| Integrante | Rol Principal | Horario de Reunión Individual | GitHub User |
| :--- | :--- | :--- | :--- |
| Jeider Gómez | Líder Técnico | *[por completar]* | @Jeider-Gomez |
| Jorge Cervantes | Calidad y Tablero | *[por completar]* | @*[por completar]* |
| José López | Diseño UI/UX — Ventana Estándar | *[por completar]* | @*[por completar]* |
| Julio Galvis | Diseño Instruccional — Contenidos y Navegación | *[por completar]* | @*[por completar]* |
| Pedro Romero | Documentación, Bitácora y Pitch | *[por completar]* | @pedrorm20 |

**Reunión de equipo:** viernes 8:00 – 8:40 p.m., videollamada, con los cinco integrantes.
**Reportes escritos:** martes y jueves, 8:00 p.m., en el grupo del equipo.
**Metodología completa:** [`docs/05_METODOLOGIA_Y_EQUIPO.md`](./docs/05_METODOLOGIA_Y_EQUIPO.md)

---

## 🎯 2. Avances del Sprint / Semana Actual

### 2.1 Entregables Cumplidos

#### 🔧 Jeider Gómez · Líder Técnico

- [x] **Ola 2 de remediación del backend, cerrada.** Suite completa en verde: **36/36 suites ·
  215/215 pruebas**. Cobertura de sentencias del **26.88 % al 55.66 %**. El sistema es reproducible
  desde cero y verificado (`npm ci → migration:run → db:seed:demo → build → start`).
- [x] **Verificación ruta por ruta de los endpoints citados en las fichas de ventana.** Se leyeron
  los `@Controller` y decoradores en `src/`, no la documentación. De las 7 rutas citadas en la
  categoría 7 de las fichas V-01 a V-06: **1 existe tal cual, 2 existen con otra forma y 4 no
  existen**. Documentado con archivo y línea en `docs/modesec/FASE_II_DISENO_MULTIMEDIAL.md` §5.1.
  **No se modificó ninguna ficha de diseño para que encajara con el código:** el diseño manda, y las
  rutas faltantes quedan declaradas como contrato de la Fase III.
- [x] **Consolidación del borrador maestro de MODESEC Fase II**
  (`docs/modesec/FASE_II_DISENO_MULTIMEDIAL.md`), tomando como norma la guía `DDS3-01.pdf` §3.
- [x] **Reorganización documental del repositorio** (5 commits, `2b2dc16` → `27c224a`): se fusionaron
  `CHANGELOG.md` y `RELEASE_NOTES.md`; se renombraron `00_VISION_FUNCIONAL.md` y
  `ADR_DECISIONES_ARQUITECTURA.md` (al que se le añadió el ADR-08 de la cola en línea, publicado sin
  payloads de exploit); se creó `docs/_archivo/` con los planes ya consumidos; se eliminaron 3
  scripts obsoletos.
- [x] **Auditoría de veracidad documental.** Se encontraron **12 afirmaciones falsas sobre Docker**
  repartidas por `README.md`, `01_ARQUITECTURA`, `02_FLUJOS`, `04_ESTANDARES`, `00_VISION_FUNCIONAL`
  y `docs/README.md`; **un log de ejemplo fabricado** en `02_FLUJOS_Y_OPERACIONES.md:245-246`; y un
  bloque de resultados de pruebas desactualizado en `README.md:120-124`. **Hallazgo registrado, aún
  no corregido** — pasa a la semana siguiente como prioridad máxima (ver §3).
- [x] **Confirmado que el proyecto tiene frontend:** `frontend/` con Next 16.2.3 y React 19.2.4. Su
  estado funcional todavía no está diagnosticado.

#### ✅ Jorge Cervantes · Calidad y Tablero

> Las tres tareas de esta semana cierran hoy viernes; se confirman en la reunión de la noche.

- [⚙️] **Tablero Kanban en Trello** con las cuatro listas (Backlog · Esta semana · En curso · Hecho)
  y las tarjetas de la semana repartidas.
- [⚙️] **Revisión de las 6 fichas de ventana contra las 7 categorías MODESEC.** Lo que se verifica:
  que ninguna categoría quedó en blanco y que los "No aplica" llevan su justificación pedagógica
  escrita, que es el criterio bloqueante de la guía.
- [⚙️] **Checklist de verificación de los tres entregables** contra la rúbrica del docente, aplicado
  antes de dar por buena cada pieza. Parte de este trabajo viene de la semana anterior, cuando
  extrajo de la guía los criterios de aceptación de cada entregable.

#### 🎨 José López · Diseño UI/UX — Ventana Estándar

- [x] **§3.3 Ventana Estándar.** Maqueta con las cinco secciones funcionales (Header, Menú,
  Contenido, Acciones, Footer) y la tabla donde **cada sección justifica su función pedagógica**, no
  su apariencia. → `docs/modesec/ventanas/3.3_VENTANA_ESTANDAR.md`
- [x] **§3.3.1 Fichas de Descripción de Ventana.** **Seis fichas (V-01 a V-06)** con las 7 categorías
  MODESEC completas: Imagen · Nombre · Texto · Audio · Video · Animación · Acciones del estudiante.
  → `docs/modesec/ventanas/3.3.1_FICHAS_VENTANAS.md`

#### 📐 Julio Galvis · Diseño Instruccional — Contenidos y Navegación

- [x] **§3.1 Diagrama de Contenidos.** Tres módulos (Fundamentos y representación → Control de flujo
  → Datos elementales y modularidad), **13 temas**, cada uno con su resultado de aprendizaje en verbo
  observable — ninguno empieza por "conocer" o "entender". Incluye las reglas de progresión
  enlazadas con el motor de dominio: desbloqueo al 70 %, dominio al 85 %, tutoría proactiva por
  debajo del 60 %. → `docs/modesec/contenidos/3.1_DIAGRAMA_CONTENIDOS.md`
- [x] **§3.3.2 Guía de Metáforas.** Metáfora rectora única — **"el taller del algoritmista"** — con
  tabla de equivalencias y las consecuencias visuales que se derivan de ella.
  → `docs/modesec/contenidos/3.3.2_GUIA_METAFORAS.md`
- [⚙️] **§3.3.3 Mapa de Navegación — iniciado.** El archivo existe con las 6 ventanas ya declaradas
  como nodos; **falta la tabla de transiciones** (origen, destino, disparador, reversibilidad).
  → `docs/modesec/contenidos/3.3.3_MAPA_NAVEGACION.md`

#### 📝 Pedro Romero · Documentación, Bitácora y Pitch

- [x] **Bitácora publicada en la raíz del repositorio** y mantenida por él desde GitHub —
  `commit 78f47dc`, 27 de agosto.
- [x] **Guión del pitch en inglés actualizado.** 138 palabras en los cuatro bloques (Hook · Problem ·
  Solution & Value Prop · Tech Stack & CTA), con la afirmación sobre Docker corregida y la guía de
  pronunciación fonética extraída del material del docente. → `docs/pitch/PITCH_RETO_01_EN.md`
- [x] **Evidencia del prompt ROCAS** del pitch con sus iteraciones (ver §2.2).

### 2.2 Evidencia de Ingeniería de Prompts (ROCAS + MOCAVI / MODESEC)

**Prompt 01 — Guión del Pitch en Inglés (60 segundos)** — Pedro Romero

* **Prompt Utilizado:**
```
[ROL] Actúa como un experto consultor de comunicación técnica en inglés y coach de pitch de
startups EdTech.
[OBJETIVO] Generar un guión de Elevator Pitch en inglés de exactamente 60 segundos (130–140
palabras) para presentar STIRE-Soft, con guía de pronunciación fonética y consejos de oratoria.
[CONTEXTO] Somos estudiantes de Informática Educativa de la Universidad de Córdoba (DDSE3).
STIRE-Soft es un sistema tutor inteligente para la resolución de ejercicios de programación.
Resuelve el problema: el estudiante que aprende a programar recibe retroalimentación tardía y
genérica, repite ejercicios que ya domina y deja sin consolidar los que no. Aplicamos el modelo
MOCAVI, aprendizaje por dominio y repetición espaciada.
[ACCIÓN] 1. Redactar el guión en 4 bloques: Hook (0-10s), Problem (10-25s), Solution & Value
Prop (25-45s), Tech Stack & CTA (45-60s). 2. Dar la guía fonética de los términos difíciles y 3
pautas de lenguaje corporal.
[SALIDA] Documento Markdown con el guión en bloque de código y tabla fonética.
```
* **Herramienta IA:** *[indicar: ChatGPT / Claude / Gemini]*
* **Iteraciones realizadas:**
  1. La primera salida dio **165 palabras** y se pasaba de los 60 segundos → se agregó al prompt un
     límite duro de palabras por cada bloque.
  2. El vocabulario técnico era genérico ("learning app") → se exigió usar los términos propios del
     proyecto: *mastery learning*, *spaced repetition*, *sandboxed code execution*.
  3. El guión afirmaba que el sistema usa **Docker**, y no lo usa → se corrigió a la arquitectura
     real: sandbox propio con aislamiento de proceso del sistema operativo, sin Docker.
* **Resultado Obtenido:** guión final de 138 palabras en 4 bloques + tabla fonética,
  en `docs/pitch/PITCH_RETO_01_EN.md`.

**Prompt 02 — Ventana Estándar y Diseño Multimedial (MODESEC Fase II)** — José López y Julio Galvis

* **Prompt Utilizado:** adaptación del Prompt 02 oficial de la guía al contexto real de STIRE
  (nivel educativo: universitario, 3.er semestre; competencia: resolución de problemas mediante
  algoritmia y programación).
* **Herramienta IA:** *[indicar]*
* **Iteraciones realizadas:**
  1. La primera Ventana Estándar describía la interfaz **visualmente** pero no explicaba para qué
     sirve pedagógicamente cada sección → se reformuló la acción del prompt para exigir, por cada
     sección, *qué función cumple en el aprendizaje*, no solo *cómo se ve*.
  2. Las fichas dejaban vacías las categorías de audio y video → se exigió que **ninguna categoría
     quede en blanco**: si no aplica, se escribe "No aplica" con su justificación.
* **Resultado Obtenido:** las cuatro piezas cerradas de la Fase II, en `docs/modesec/`.

### 2.3 Estado de MODESEC Fase II — 4 de 6 piezas cerradas

| § | Pieza | Quién la escribe | Estado |
|---|---|---|---|
| 3.1 | Diagrama de Contenidos | Julio Galvis | ✅ cerrada |
| 3.2 | Guión Técnico Multimedial | *por asignar* | ❌ no iniciada — requiere las fichas como insumo, y ya las tiene |
| 3.3 | Ventana Estándar | José López | ✅ cerrada |
| 3.3.1 | Fichas de Ventana (7 categorías) | José López | ✅ cerrada — 6 ventanas |
| 3.3.2 | Guía de Metáforas | Julio Galvis | ✅ cerrada |
| 3.3.3 | Mapa de Navegación | Julio Galvis | ⚙️ iniciada — nodos definidos, falta la tabla de transiciones |

---

## ⚠️ 3. Cuellos de Botella y Apoyo Requerido

* **Riesgos / Bloqueos:**

  1. **La documentación afirma que el sistema usa Docker, y no lo usa.** Son 12 afirmaciones falsas
     repartidas por el `README.md` y los documentos núcleo, más **un log de ejemplo fabricado**
     (`02_FLUJOS_Y_OPERACIONES.md:245-246`) que presenta como real una salida de consola que nunca
     ocurrió: cita un servicio inexistente, un contenedor de Python y un flujo que el sistema no
     ejecuta. **Es el riesgo más grave que tiene el proyecto ahora mismo**, y no es técnico sino de
     credibilidad: un jurado que lea ese log y luego revise el código deja de creerle al resto de la
     documentación, incluida la parte que sí es cierta. Corrección programada para el lunes 31.
     *La bitácora y el pitch ya dicen "sin Docker": están correctos.*

  2. **Cuatro de los siete endpoints citados en las fichas de ventana no existen todavía.** Ya está
     verificado y documentado con evidencia (§5.1 del documento de Fase II). No obliga a cambiar el
     diseño — el diseño manda —, pero define el trabajo de backend de la Fase III.

  3. **El frontend existe pero no está diagnosticado.** Hay `frontend/` con Next 16.2.3 y React
     19.2.4, y el pitch lo menciona. Dado que en este proyecto varias cosas documentadas resultaron
     ser simulaciones, **hay que saber qué hay ahí de verdad antes de la sustentación, no durante**.

  4. **Decisión pendiente sobre la animación de trazado de escritorio (ficha V-02).** Es la pieza de
     mayor valor pedagógico del diseño y también la de mayor esfuerzo. **Recomendación:** si el
     tiempo aprieta, degradarla a trazado estático tabulado, **nunca eliminarla** — sin ella la
     unidad teórica queda en texto plano. Se decide en equipo en el cierre del viernes 28.

  5. **La bitácora tiene dos manos escribiendo.** Pedro la edita desde la web de GitHub y el trabajo
     técnico también la toca. **Regla adoptada:** la escribe Pedro; nadie más la
     reescribe entera, y cualquier añadido se hace después de un `git pull`. Sin esa regla, el
     entregable que califica el docente es justo el que se puede perder en un conflicto.

* **Ayuda del Docente** *(preguntas para la clase de HOY, viernes 28, 10:00 – 12:00)*:

  1. La **Ventana Estándar**: ¿se espera una única maqueta modelo que represente el estándar visual
     del sistema, o una maqueta por cada tipo de ventana?
  2. En las **7 categorías** (Imagen, Nombre de ventana, Texto, Audio, Video, Animación, Acciones):
     ¿es válido declarar "No aplica" con justificación pedagógica cuando la ventana no contempla
     audio o video?
  3. El **pitch de 60 segundos**: ¿lo sustenta un solo integrante o se espera que los cinco
     intervengan repartiéndose los cuatro bloques?

---

## 🎯 4. Acta del Cierre — hoy viernes 28 de agosto, 8:00 p.m.

> Se diligencia en la reunión de esta noche, con los cinco integrantes. Este bloque se completa y
> se sube antes de las 9:00 p.m.

```
Asistencia: Jeider __ · Jorge __ · José __ · Julio __ · Pedro __

CERRADAS ESTA SEMANA: §3.1 · §3.3 · §3.3.1 · §3.3.2 · Ola 2 del backend ·
                      verificación de endpoints

POR CONFIRMAR HOY (Jorge): tablero en Trello · revisión de las 6 fichas ·
                      checklist contra la rúbrica

NO CERRADAS: §3.3.3 Mapa de Navegación — falta la tabla de transiciones — pasa al 1 de sep

DECISIÓN PENDIENTE — animación de trazado de escritorio (ficha V-02):
   [ ] Se produce completa    [ ] Se degrada a trazado estático tabulado
   Motivo: ______________________________________________

RESPUESTAS DEL DOCENTE (clase de las 10:00 a.m.):
   1. Ventana Estándar, ¿una maqueta modelo o una por tipo de ventana? → ______
   2. "No aplica" justificado en las 7 categorías, ¿es válido?          → ______
   3. Pitch de 60 s, ¿lo sustenta uno o los cinco?                      → ______

ACUERDO DE LA RETRO: ______________________________________________
```

---

## 📌 5. Compromisos para la Semana Siguiente (31 de agosto – 4 de septiembre · semana autónoma)

| Compromiso | Quién | Fecha |
|---|---|---|
| Corregir las 12 afirmaciones falsas sobre Docker y **eliminar el log fabricado** de `02_FLUJOS` | Jeider Gómez | lun 31 ago |
| Actualizar el bloque de resultados de pruebas del `README.md` a la corrida vigente (36 suites / 215 pruebas) | Jeider Gómez | lun 31 ago |
| **§3.3.3 Mapa de Navegación:** completar la tabla de transiciones y cerrar la pieza | Julio Galvis | mar 1 sep |
| Diagnóstico del `frontend/`: qué rutas son reales, si consume la API o usa datos simulados, si compila | Jeider Gómez | mié 2 sep |
| **§3.2 Guión Técnico Multimedial** (formatos 10 y 11 de la guía) | José López y Julio Galvis | jue 3 sep |
| Revisión final de las 6 piezas de MODESEC contra la rúbrica | Jorge Cervantes | jue 3 sep |
| Captura del tablero de Trello para adjuntar a la bitácora | Jorge Cervantes | vie 4 sep |
| Ensayo cronometrado del pitch, segunda pasada | Los 5 | vie 4 sep |
| Bitácora de cierre del Reto 1 | Pedro Romero | vie 4 sep |

**Congelación del Reto 1:** viernes 4 de septiembre, 8:00 p.m. — después solo se corrige forma.
**Sustentación:** martes 8 de septiembre, clase presencial.

---

## 🗓️ 6. Bitácoras Anteriores

| N.º | Semana | Documento |
|---|---|---|
| 1 | 17 – 21 de agosto de 2026 | [`docs/seguimiento/MONITOREO_SEMANAL_01.md`](./docs/seguimiento/MONITOREO_SEMANAL_01.md) |

Los compromisos de la bitácora N.º 1 son exactamente los entregables que aparecen cumplidos en la
sección 2 de este documento: esa continuidad es la que permite seguir el avance semana a semana.

---
*Actualizada cada viernes a las 8:00 p.m. durante la reunión de Cierre y Arranque.*
*La mantiene Pedro Romero · Commit: `docs: actualiza bitacora semana X`*
