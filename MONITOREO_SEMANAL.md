# 🚀 Bitácora de Monitoreo y Control — Proyecto: STIRE-Soft
**Curso:** DDSE3 — 2026-2 | **Grupo:** [G1 / G2]
**Repositorio GitHub:** https://github.com/Jeider-Gomez/Stire-Soft
**Semana reportada:** 17 – 21 de agosto de 2026 | **Cierre:** viernes 21 de agosto, 8:00 p.m.
**Tablero Kanban (Trello):** `[pegar aquí el enlace del tablero]`

*STIRE-Soft es un Sistema Tutor Inteligente para la Resolución de Ejercicios: el estudiante entrega
código, el sistema lo ejecuta de verdad, lo califica y adapta los siguientes ejercicios a su nivel de
dominio.*

---

## 👥 1. Estructura del Equipo y Roles

| Integrante | Rol Principal | Horario de Reunión Individual | GitHub User |
| :--- | :--- | :--- | :--- |
| Jeider Gómez | Líder Técnico / Arquitecto | *[por completar]* | @Jeider-Gomez |
| Jorge Cervantes | Calidad y Tablero Kanban | *[por completar]* | @*[por completar]* |
| José López | Diseñador UI/UX & Ventana Estándar | *[por completar]* | @*[por completar]* |
| Julio Galvis | Diseñador Instruccional & Navegación | *[por completar]* | @*[por completar]* |
| Pedro Romero | Documentación, Bitácora y Pitch | *[por completar]* | @*[por completar]* |

**Reunión de equipo:** viernes 8:00 – 8:40 p.m., videollamada, con los cinco integrantes.
**Reportes escritos:** martes y jueves, 8:00 p.m., en el grupo del equipo.
**Metodología completa:** [`docs/05_METODOLOGIA_Y_EQUIPO.md`](./docs/05_METODOLOGIA_Y_EQUIPO.md)

---

## 🎯 2. Avances del Sprint / Semana Actual

### 2.1 Entregables Cumplidos

- [x] **[Líder — Jeider Gómez]: Definición de la metodología de trabajo del equipo.** Se compararon
  Scrum completo, Kanban, Shape Up y XP frente a nuestras restricciones reales (5 integrantes,
  horarios distintos, semanas alternas A/B y alcance fijado por la rúbrica). Se adoptó **Sprint
  Semanal con tablero Kanban en Trello**, con reunión única los viernes a las 8:00 p.m. y reportes
  escritos los martes y jueves. Documentado en `docs/05_METODOLOGIA_Y_EQUIPO.md`.

- [x] **[Líder — Jeider Gómez]: Pruebas y aseguramiento de calidad del backend de STIRE.** Se ejecutó
  una auditoría técnica del sistema, un plan de corrección en cuatro bloques y una segunda auditoría
  independiente sobre el resultado. Resultados verificados:

  | Aspecto evaluado | Antes | Después |
  |---|---|---|
  | Compilación del proyecto | 6 errores de TypeScript | ✅ compila sin errores |
  | Pruebas automatizadas | 19 suites / 105 pruebas | **33 suites / 183 pruebas** |
  | Cobertura del módulo de autenticación | 0 % | **79 % del servicio · 100 % del controlador** |
  | Arranque del sistema sin Docker ni Redis | el proceso se caía | ✅ arranca y responde |
  | Calificación interna de calidad | 3.05 / 10 | **≈ 5.1 / 10** (mismo método de medición) |

  Además se **endureció el entorno de ejecución de código del estudiante** (sandbox): el código que
  el estudiante envía corre aislado del sistema operativo, sin acceso a archivos, a red ni a
  procesos. Se probaron y bloquearon 10 vectores de ataque distintos. Se validó el flujo completo
  contra la base de datos real: **el estudiante entrega código JavaScript, se ejecuta de verdad y
  recibe calificación real** (100 con la solución correcta, 0 con una incorrecta).

- [x] **[Documentación — Pedro Romero]: Bitácora de Monitoreo publicada** en la raíz del repositorio
  con la plantilla oficial del curso. `commit: docs: actualiza bitacora semana 1`

- [x] **[Documentación — Pedro Romero]: Pitch en inglés de 1 minuto.** Guión completo de 138 palabras
  en los cuatro bloques exigidos (Hook · Problem · Solution & Value Prop · Tech Stack & CTA), con
  tabla de pronunciación fonética de los términos técnicos. `docs/pitch/PITCH_RETO_01_EN.md`

- [x] **[Documentación — Pedro Romero]: Evidencia del prompt ROCAS** del pitch, con las iteraciones
  realizadas hasta llegar al guión final (ver punto 2.2).

- [x] **[Diseño Instruccional — Julio Galvis]: Avance MODESEC Fase II.** Borrador del **Diagrama de
  Contenidos (§3.1)** con la estructura de tres módulos y sus temas.

- [x] **[Diseño UI/UX — José López]: Avance MODESEC Fase II.** Primera maqueta de la **Ventana
  Estándar (§3.3)** dividida por secciones funcionales (Header, Menú, Contenido, Acciones, Footer).

- [x] **[Equipo]: Plantillas de trabajo de MODESEC Fase II** creadas para que ningún integrante
  empiece en hoja en blanco. `docs/modesec/PLANTILLAS_MODESEC_FASE2.md`

### 2.2 Evidencia de Ingeniería de Prompts (ROCAS + MOCAVI / MODESEC)

**Prompt 01 — Guión del Pitch en Inglés (60 segundos)**

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
* **Resultado Obtenido:** guión final de 138 palabras en 4 bloques + tabla fonética de 12 términos,
  en `docs/pitch/PITCH_RETO_01_EN.md`.

**Prompt 02 — Ventana Estándar y Diseño Multimedial (MODESEC Fase II)**

* **Prompt Utilizado:** adaptación del Prompt 02 oficial de la guía al contexto real de STIRE
  (nivel educativo: universitario, primeros semestres de Ingeniería de Sistemas; competencia:
  resolución de problemas mediante algoritmia y programación).
* **Herramienta IA:** *[indicar]*
* **Iteraciones realizadas:**
  1. La primera Ventana Estándar describía la interfaz **visualmente** pero no explicaba para qué
     sirve pedagógicamente cada sección → se reformuló la acción del prompt para exigir, por cada
     sección, *qué función cumple en el aprendizaje*, no solo *cómo se ve*.
* **Resultado Obtenido:** borradores del Diagrama de Contenidos y de la Ventana Estándar, en
  consolidación durante la semana siguiente. `docs/modesec/`

### 2.3 Avance de la Semana en Curso (24 – 28 de agosto)

- [x] **[Equipo]: Borrador maestro consolidado de MODESEC Fase II.** Se redactó
  `docs/modesec/FASE_II_DISENO_MULTIMEDIAL.md` (v1.0) tomando como norma la guía `DDS3-01.pdf`
  (§3, páginas 3–11) y respetando el reparto de dueños ya declarado en
  `docs/modesec/PLANTILLAS_MODESEC_FASE2.md`. Cubre cuatro de las cinco piezas exigidas:

  | Pieza | Contenido | Dueño que la traslada a su archivo |
  |---|---|---|
  | **§3.1** Diagrama de Contenidos | 3 módulos (Fundamentos y representación → Control de flujo → Datos elementales y modularidad), **13 temas**, cada uno con su resultado de aprendizaje en verbo observable. Ningún RA empieza por "conocer" o "entender". Incluye las reglas de progresión enlazadas con el motor de dominio: desbloqueo al 70 %, dominio al 85 %, tutoría proactiva por debajo del 60 % | Julio Galvis |
  | **§3.3** Ventana Estándar | Maqueta ASCII con las cinco secciones y sus medidas, más la tabla donde cada sección justifica su **función pedagógica**, no su apariencia | José López |
  | **§3.3.1** Fichas de Ventana | **6 fichas (V-01 a V-06)** con las 7 categorías MODESEC completas. Donde audio o video no aplican, va la justificación — ninguna categoría en blanco | José López |
  | **§3.3.2** Guía de Metáforas | Metáfora rectora única: **"el taller del algoritmista"**, con tabla de equivalencias y las consecuencias visuales que se derivan de ella | Julio Galvis |

  **Pendientes de la Fase II:** §3.3.3 Mapa de Navegación (Julio) y §3.2 Guión Técnico Multimedial,
  que ahora sí tiene insumo porque las fichas de ventana ya existen.

---

## ⚠️ 3. Cuellos de Botella y Apoyo Requerido

* **Riesgos / Bloqueos:**

  1. **Fichas de Descripción de Ventana (las 7 categorías) todavía sin hacer.** No se iniciaron
     porque primero había que cerrar el listado definitivo de ventanas del sistema; sin él, las
     fichas habrían quedado desalineadas con el Mapa de Navegación. Quedan como prioridad de la
     semana del 24 al 28 de agosto. *Es una decisión de orden de trabajo, no un retraso.*

  2. **Niveles distintos de manejo de Git dentro del equipo.** Estaba frenando el trabajo de diseño.
     **Decisión tomada:** se eliminaron las reglas estrictas de control de versiones (ramas,
     revisiones cruzadas, convenciones de mensajes). Ahora basta con que el archivo esté subido al
     repositorio antes del viernes, y quien no maneje Git le entrega el archivo a un compañero para
     que lo suba. Se conserva únicamente el mensaje de commit que exige la guía del curso.

  3. **Los endpoints citados en las fichas de ventana son contrato propuesto, no verificado.**
     En la categoría 7 (Acciones del estudiante) de las fichas V-01 a V-06 se citan rutas como
     `POST /submissions`, `POST /tutor/chat` y `GET /review-schedules/due`. Están declaradas como
     **propuesta de contrato**, no como hecho: no se han confirmado una por una contra el código.
     Se decidió no afirmar que existen mientras no se verifiquen. **Hay que confirmarlas ruta por
     ruta antes de dar por cerrada la Fase II**, porque un diseño multimedial que apunta a
     endpoints inexistentes se convierte en deuda en la Fase III.

  4. **Decisión pendiente sobre la animación de trazado de escritorio (ficha V-02).** Es la pieza de
     mayor valor pedagógico del diseño y también la de mayor esfuerzo de producción.
     **Recomendación del equipo técnico:** si el tiempo aprieta, degradarla a un trazado estático
     tabulado, **nunca eliminarla** — sin ella la unidad teórica queda como texto plano y se pierde
     justamente lo que hace que el contenido sea software educativo y no un PDF.

  5. **Hallazgos de seguridad pendientes en el backend.** La segunda auditoría dejó abiertos varios
     puntos de control de permisos entre docentes. Están documentados y planificados, y **no afectan
     ninguno de los tres entregables académicos** — se trabajan en un carril aparte.

* **Ayuda del Docente:**

  1. La **Ventana Estándar**: ¿se espera una única maqueta modelo que represente el estándar visual
     del sistema, o una maqueta por cada tipo de ventana?
  2. En las **7 categorías** (Imagen, Nombre de ventana, Texto, Audio, Video, Animación, Acciones):
     ¿es válido declarar "No aplica" con justificación pedagógica cuando la ventana no contempla
     audio o video?
  3. El **pitch de 60 segundos**: ¿lo sustenta un solo integrante o se espera que los cinco
     intervengan repartiéndose los cuatro bloques?

---

## 📌 4. Compromisos para la Semana Siguiente (24 – 28 de agosto)

| Compromiso | Responsable | Fecha | Estado |
|---|---|---|---|
| §3.1 Diagrama de Contenidos, 3 módulos con RA observables | Julio Galvis | mié 26 ago | ✅ en el borrador maestro |
| §3.3 Ventana Estándar por secciones funcionales | José López | mié 26 ago | ✅ en el borrador maestro |
| §3.3.1 Fichas de Ventana — 7 categorías, 6 ventanas | José López | jue 27 ago | ✅ en el borrador maestro |
| §3.3.2 Guía de Metáforas | Julio Galvis | jue 27 ago | ✅ en el borrador maestro |
| Trasladar cada sección del borrador maestro al archivo de su dueño | Julio y José | jue 27 ago | ⚙️ pendiente |
| **§3.3.3 Mapa de Navegación** | Julio Galvis | vie 28 ago | 📋 pendiente |
| **Verificar ruta por ruta los endpoints citados en las fichas** | Jeider Gómez | jue 27 ago | 📋 pendiente |
| Tablero de Trello creado con las 4 listas y las tarjetas repartidas | Jorge Cervantes | mar 25 ago | 📋 pendiente |
| Revisión de los documentos MODESEC contra la rúbrica | Jorge Cervantes | vie 28 ago | 📋 pendiente |
| Ensayo cronometrado del pitch, primera pasada | Los 5 | vie 28 ago | 📋 pendiente |
| Bitácora actualizada y captura del tablero adjunta | Pedro Romero | vie 28 ago | 📋 pendiente |

*§3.2 Guión Técnico Multimedial queda para el sprint del 31 de agosto al 4 de septiembre: depende de
que las fichas de ventana estén cerradas, y ya lo están.*

**Congelación del Reto 1:** viernes 4 de septiembre, 8:00 p.m. **Sustentación:** martes 8 de septiembre.

---
*Actualizada cada viernes a las 8:00 p.m. durante la reunión de Cierre y Arranque.*
*Responsable: Pedro Romero · Commit: `docs: actualiza bitacora semana X`*
