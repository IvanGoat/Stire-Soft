# 🚀 Bitácora de Monitoreo y Control N.º 1 — Proyecto: STIRE-Soft
**Curso:** DDSE3 — 2026-2 | **Grupo:** [G1 / G2]
**Repositorio GitHub:** https://github.com/Jeider-Gomez/Stire-Soft
**Semana reportada:** 17 – 21 de agosto de 2026 | **Cerrada:** viernes 21 de agosto, 8:00 p.m.

> Bitácora archivada. La semana en curso vive siempre en
> [`MONITOREO_SEMANAL.md`](../../MONITOREO_SEMANAL.md), en la raíz del repositorio.
> Los compromisos de la sección 4 de este documento son exactamente los entregables que aparecen
> cumplidos en la bitácora de la semana del 24 al 28.

---

## 👥 1. Estructura del Equipo y Roles

| Integrante | Rol Principal | Horario de Reunión Individual | GitHub User |
| :--- | :--- | :--- | :--- |
| Jeider Gómez | Líder Técnico | *[por completar]* | @Jeider-Gomez |
| Jorge Cervantes | Calidad y Tablero | *[por completar]* | @*[por completar]* |
| José López | Diseño UI/UX — Ventana Estándar | *[por completar]* | @*[por completar]* |
| Julio Galvis | Diseño Instruccional — Contenidos y Navegación | *[por completar]* | @*[por completar]* |
| Pedro Romero | Documentación, Bitácora y Pitch | *[por completar]* | @*[por completar]* |

**Semana de arranque del Reto 1.** Fue la semana en que el equipo definió cómo iba a trabajar y
levantó las primeras piezas de los tres entregables.

---

## 🎯 2. Avances del Sprint / Semana Actual

### 2.1 Entregables Cumplidos

#### Jeider Gómez · Líder Técnico

- [x] **Definición del marco de trabajo del equipo.** Se compararon Scrum completo, Kanban,
  Shape Up y XP frente a las restricciones reales del grupo — cinco integrantes con horarios
  distintos, semanas alternas de clase y trabajo autónomo, y un alcance que ya fija la rúbrica del
  docente. Se adoptó **Sprint Semanal con tablero Kanban**, con una única reunión de cierre y
  arranque los viernes a las 8:00 p.m. y dos reportes escritos entre semana.
  → `docs/05_METODOLOGIA_Y_EQUIPO.md`
- [x] **Auditoría técnica del backend y primera ola de remediación.** Resultados medidos:

  | Aspecto evaluado | Antes | Después |
  |---|---|---|
  | Compilación del proyecto | 6 errores de TypeScript | compila sin errores |
  | Pruebas automatizadas | 19 suites / 105 pruebas | **33 suites / 183 pruebas** |
  | Cobertura del módulo de autenticación | 0 % | **79 % del servicio · 100 % del controlador** |
  | Arranque sin Docker ni Redis | el proceso se caía | arranca y responde |

- [x] **Endurecimiento del entorno de ejecución de código del estudiante.** El código que envía el
  estudiante corre aislado del sistema operativo, sin acceso a archivos, a red ni a procesos. Se
  probaron y bloquearon 10 vectores de ataque. Se validó el flujo completo contra la base de datos
  real: el estudiante entrega código JavaScript, se ejecuta de verdad y recibe calificación real.

#### Jorge Cervantes · Calidad y Tablero

- [x] **Lectura de la normativa del reto y extracción de los criterios de aceptación.** Revisó la
  Guía de Trabajo del Estudiante (Clase 02) y la presentación `DDS3-01.pdf`, y sacó de ahí la lista
  de lo que exige cada uno de los tres entregables: qué secciones debe tener el avance de MODESEC,
  qué pide la plantilla oficial de la bitácora, y cómo se reparte la nota del pitch. Esa lista es
  la que el equipo usó después para revisar cada pieza antes de darla por buena.
- [x] **Participación en la decisión metodológica.** Aportó en la comparación de marcos de trabajo
  y en la decisión de trabajar con sprint semanal y tablero Kanban, en lugar de Scrum completo.

#### José López · Diseño UI/UX — Ventana Estándar

- [x] **Primera maqueta de la Ventana Estándar (§3.3).** Interfaz modelo dividida en sus secciones
  funcionales: Header, Menú, Zona de Contenido, Zona de Acciones y Footer.

#### Julio Galvis · Diseño Instruccional — Contenidos y Navegación

- [x] **Borrador del Diagrama de Contenidos (§3.1).** Estructura de tres módulos con sus temas,
  como punto de partida del diseño instruccional.

#### Pedro Romero · Documentación, Bitácora y Pitch

- [x] **Bitácora creada y publicada** en el repositorio con la plantilla oficial del curso.
- [x] **Primera versión del guión del pitch en inglés**, en los cuatro bloques exigidos
  (Hook · Problem · Solution & Value Prop · Tech Stack & CTA), con guía de pronunciación fonética.
- [x] **Registro del prompt ROCAS** usado para generar el guión, con sus iteraciones (ver 2.2).

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
* **Resultado Obtenido:** guión de 138 palabras en cuatro bloques con su tabla fonética.

---

## ⚠️ 3. Cuellos de Botella y Apoyo Requerido

* **Riesgos / Bloqueos:**

  1. **Las fichas de las 7 categorías no se iniciaron esta semana.** Primero había que cerrar el
     inventario definitivo de ventanas del sistema; sin él, las fichas habrían quedado
     desalineadas con el Mapa de Navegación. Se pasaron a la semana siguiente por decisión de
     orden de trabajo, no por retraso.

  2. **Niveles muy distintos de manejo de Git dentro del equipo.** Estaba frenando el trabajo de
     diseño. **Decisión tomada:** se eliminaron las reglas estrictas de control de versiones —
     ramas, revisiones cruzadas, convenciones de mensajes. Basta con que el archivo esté subido al
     repositorio antes del viernes, y quien no maneje Git le entrega el archivo a un compañero para
     que lo suba. Se conserva solo el mensaje de commit que exige la guía del curso.

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

| Compromiso | Quién | Fecha |
|---|---|---|
| §3.1 Diagrama de Contenidos, versión final con resultados de aprendizaje observables | Julio Galvis | mié 26 ago |
| §3.3 Ventana Estándar, versión final por secciones funcionales | José López | mié 26 ago |
| §3.3.1 Fichas de Descripción de Ventana con las 7 categorías | José López | jue 27 ago |
| §3.3.2 Guía de Metáforas | Julio Galvis | jue 27 ago |
| §3.3.3 Mapa de Navegación | Julio Galvis | vie 28 ago |
| Verificar contra el código los endpoints que citan las fichas | Jeider Gómez | jue 27 ago |
| Montar el tablero Kanban en Trello y repartir las tarjetas | Jorge Cervantes | mar 25 ago |
| Revisar los documentos de MODESEC contra la rúbrica | Jorge Cervantes | vie 28 ago |
| Ensayo cronometrado del pitch, primera pasada | Los 5 | vie 28 ago |
| Actualizar la bitácora | Pedro Romero | vie 28 ago |

---

## 🎯 5. Acta del Cierre — viernes 21 de agosto, 8:00 p.m.

* **Cerradas:** marco metodológico · auditoría y primera ola de remediación del backend · bitácora
  publicada · guión del pitch con su tabla fonética · evidencia ROCAS · borrador del Diagrama de
  Contenidos · primera maqueta de la Ventana Estándar · criterios de aceptación extraídos de la
  guía del docente.
* **No cerradas:** las fichas de las 7 categorías → pasan a la semana del 24 al 28.
* **Acuerdo de la retrospectiva:** fijar la reunión de cierre y arranque los viernes a las
  8:00 p.m. con los cinco integrantes, avisando con tiempo si alguien no puede; e incorporar
  reportes escritos los martes y jueves para dejar de descubrir los bloqueos el mismo viernes.

---
*Bitácora N.º 1 · cerrada el 21 de agosto de 2026. La mantiene Pedro Romero.*
