# FASE II — DISEÑO MULTIMEDIAL (MODESEC)
## STIRE-Soft · Sistema Tutor Inteligente para la Resolución de Ejercicios

| Campo | Valor |
|---|---|
| **Proyecto** | STIRE-Soft (LMS adaptativo con tutor IA) |
| **Norma aplicada** | `DDS3-01.pdf` — GUIA MODESEC, §3 Fase II: Diseño Multimedial |
| **Modelo pedagógico** | MODESEC (Caro, Toscano, Hernández y David, 2009) + MOCAVI |
| **Nivel educativo** | Universitario — 3.er semestre, Licenciatura en Informática |
| **Asignatura** | Fundamentos de Algoritmia |
| **Población objetivo** | 18–22 años · alfabetización digital media · sin experiencia previa de programación formal |
| **Versión** | v1.0 — borrador maestro para revisión de equipo |
| **Fecha** | 2026-08-25 |
| **Piezas cubiertas** | §3.1 · §3.3 · §3.3.1 · §3.3.2 |
| **Pieza pendiente** | §3.3.3 Mapa de Navegación (dueño: Julio) y §3.2 Guión técnico multimedial |

> **Nota de proceso:** este documento es el borrador maestro consolidado. Cada dueño declarado en
> `docs/modesec/PLANTILLAS_MODESEC_FASE2.md` debe trasladar su sección a su archivo asignado y
> mantenerla allí. Este archivo no sustituye la estructura de archivos por dueño: la alimenta.

---

## 0. Encuadre pedagógico (insumo de Fase I que condiciona esta fase)

**Competencia declarada**

> *Resuelve problemas computacionales de baja y media complejidad mediante el diseño, la
> representación y la verificación de algoritmos, aplicando estructuras secuenciales, condicionales,
> iterativas y de datos elementales, con criterios de corrección y legibilidad.*

**Desagregación de la competencia (MODESEC — saberes):**

| Dimensión | Descriptor observable |
|---|---|
| **Saber conocer** | Identifica los elementos de un algoritmo (entrada, proceso, salida) y las estructuras de control disponibles. |
| **Saber hacer** | Construye, traza y depura algoritmos correctos para un enunciado dado, verificándolos con casos de prueba. |
| **Saber ser** | Persiste ante el error, argumenta sus decisiones de diseño y usa la retroalimentación del tutor como insumo, no como respuesta. |

**Implicación de diseño (por qué esto manda sobre la interfaz):** la competencia es de **ejecución**,
no de reconocimiento. Por tanto la interfaz debe minimizar el consumo de texto pasivo y maximizar el
tiempo en el banco de trabajo (editor + juez + tutor). Toda pantalla que no lleve a producir o
verificar un algoritmo es secundaria y se subordina en la jerarquía visual.

---

# 3.1 · Diagrama de Contenidos

Organización del contenido en **3 módulos**, coherente con la jerarquía curricular de STIRE
(*Clase → Sección/Corte → Tema → Unidad de Aprendizaje → Contenido/Actividad*). El **Módulo** de
MODESEC se materializa como **Sección/Corte** en el modelo de datos; el **Tema** como `Tema`; y cada
viñeta terminal como **Unidad de Aprendizaje**, que es el gránulo mínimo evaluable al que STIRE
asigna `mastery` y `review_schedule`.

## 3.1.1 Mapa de contenidos (vista de árbol)

```
                          ┌───────────────────────────────────────┐
                          │   STIRE · FUNDAMENTOS DE ALGORITMIA   │
                          │        (Competencia rectora)          │
                          └──────────────────┬────────────────────┘
                 ┌───────────────────────────┼───────────────────────────┐
                 ▼                           ▼                           ▼
   ┌──────────────────────────┐ ┌──────────────────────────┐ ┌──────────────────────────┐
   │  MÓDULO 1                │ │  MÓDULO 2                │ │  MÓDULO 3                │
   │  Fundamentos y           │ │  Control de flujo        │ │  Datos elementales y     │
   │  representación          │ │                          │ │  modularidad             │
   │  (Básico)                │ │  (Intermedio)            │ │  (Avanzado)              │
   └───────────┬──────────────┘ └───────────┬──────────────┘ └───────────┬──────────────┘
               │                            │                            │
   1.1 Algoritmo y pensamiento    2.1 Decisión simple            3.1 Arreglos 1D
       computacional                  y compuesta                    · declarar / indexar
       · noción de algoritmo          · if / if-else                  · recorrer
       · entrada-proceso-salida       · operadores relacionales       · cargar y mostrar
                                      · operadores lógicos
   1.2 Variables y tipos          2.2 Selección múltiple         3.2 Recorridos clásicos
       · declaración y asignación     · if anidado                    · búsqueda secuencial
       · enteros, reales, cadenas     · switch / según-sea            · máximo, mínimo, promedio
       · booleanos                                                    · ordenamiento por selección
   1.3 Operadores y expresiones   2.3 Ciclos                     3.3 Cadenas y arreglos 2D
       · aritméticos                  · while (indefinido)            · recorrido de cadenas
       · precedencia                  · for (definido)                · matriz: filas y columnas
       · expresiones mixtas           · do-while
   1.4 Representación             2.4 Acumulación y control      3.4 Modularidad
       · pseudocódigo                 · contadores                    · función y procedimiento
       · diagrama de flujo            · acumuladores                  · parámetros y retorno
       · prueba de escritorio         · banderas (flags)              · descomposición del problema
                                  2.5 Ciclos anidados
                                      · tablas y series
                                      · condición de corte
```

## 3.1.2 Tabla de contenidos, resultados de aprendizaje y dominio

| Módulo | Tema | Unidades de aprendizaje | Resultado de aprendizaje (verbo observable) | Nivel |
|---|---|---|---|---|
| **1. Fundamentos y representación** | 1.1 Algoritmo y pensamiento computacional | Noción de algoritmo · Entrada-proceso-salida | **Descompone** un enunciado en entradas, proceso y salidas identificando qué dato produce el resultado. | Básico |
| | 1.2 Variables y tipos de datos | Declaración y asignación · Numéricos · Cadenas · Booleanos | **Declara y asigna** variables del tipo correcto para los datos de un problema, justificando la elección. | Básico |
| | 1.3 Operadores y expresiones | Aritméticos · Precedencia · Expresiones mixtas | **Evalúa** expresiones respetando la precedencia y **predice** su resultado antes de ejecutar. | Básico |
| | 1.4 Representación algorítmica | Pseudocódigo · Diagrama de flujo · Prueba de escritorio | **Representa** un algoritmo en pseudocódigo y lo **verifica** con una prueba de escritorio de al menos 3 casos. | Básico |
| **2. Control de flujo** | 2.1 Decisión simple y compuesta | if / if-else · Relacionales · Lógicos | **Construye** algoritmos que seleccionan una acción entre alternativas mutuamente excluyentes. | Intermedio |
| | 2.2 Selección múltiple | if anidado · switch | **Reestructura** una cadena de decisiones anidadas en una selección múltiple equivalente y más legible. | Intermedio |
| | 2.3 Ciclos | while · for · do-while | **Diseña** ciclos con condición de corte correcta y **detecta** ciclos infinitos mediante trazado. | Intermedio |
| | 2.4 Acumulación y control | Contadores · Acumuladores · Banderas | **Implementa** contadores y acumuladores para producir totales, promedios y conteos condicionados. | Intermedio |
| | 2.5 Ciclos anidados | Series y tablas · Corte interno | **Construye** ciclos anidados y **explica** la relación entre iteración externa e interna. | Intermedio |
| **3. Datos elementales y modularidad** | 3.1 Arreglos unidimensionales | Declaración · Indexación · Carga y despliegue | **Manipula** arreglos accediendo por índice sin desbordar los límites del arreglo. | Avanzado |
| | 3.2 Recorridos clásicos | Búsqueda secuencial · Máximo/mínimo/promedio · Ordenamiento por selección | **Aplica** el recorrido adecuado al problema y **compara** su costo en número de comparaciones. | Avanzado |
| | 3.3 Cadenas y arreglos 2D | Recorrido de cadenas · Matriz filas/columnas | **Recorre** estructuras bidimensionales y de caracteres resolviendo problemas de conteo y transformación. | Avanzado |
| | 3.4 Modularidad | Función y procedimiento · Parámetros y retorno · Descomposición | **Descompone** un problema en funciones con responsabilidad única y **reutiliza** las que ya construyó. | Avanzado |

## 3.1.3 Reglas de progresión (enlace con el motor de dominio)

| Regla | Valor propuesto | Dónde vive en el sistema |
|---|---|---|
| Umbral de desbloqueo de la siguiente unidad | `mastery ≥ 70 %` | `minMasteryRequired` en el grafo de prerrequisitos |
| Umbral de estado **Dominado** | `mastery ≥ 85 %` | `learning_progress.mastery` |
| Activación de tutoría socrática proactiva | `mastery < 60 %` tras 2 intentos | `TutorService` |
| Programación de repaso | SM-2, intervalo con techo de 60 días | `review_schedules.nextReviewDate` |
| Prerrequisito duro entre módulos | M1 → M2 → M3 (secuencial); dentro del módulo, los temas admiten orden flexible salvo 2.3 → 2.4 → 2.5 | Grafo de prerrequisitos |

> **Criterio de calidad aplicado:** ningún resultado de aprendizaje inicia con *conocer* o *entender*.
> Todos son medibles con una actividad concreta del banco de ejercicios.

---

# 3.3 · Diseño del Ambiente de Aprendizaje

## 3.3.a Diseño de la Ventana Estándar

Ventana modelo de la que derivan todas las demás interfaces. Se define por **cinco secciones
funcionales** con proporciones fijas, para que el estudiante no tenga que reaprender la ubicación de
los controles al cambiar de pantalla (reducción de carga cognitiva extrínseca).

### Maqueta de la ventana estándar

```
╔══════════════════════════════════════════════════════════════════════════════════╗
║ [A] HEADER                                                          alto: 64 px  ║
║ ┌────────┐  Módulo 2 › Ciclos › while                    ┌──────────────────┐   ║
║ │ STIRE  │  ▰▰▰▰▰▰▰▰▰▱▱▱  Dominio de la unidad: 72 %     │ ⌂ Repasos: 3  ⬤ │   ║
║ └────────┘                                               └──────────────────┘   ║
╠═══════════════════════╤══════════════════════════════════════════════════════════╣
║ [B] MENÚ   ancho: 260 │ [C] ZONA DE CONTENIDO                  ancho: resto      ║
║                       │                                                          ║
║  ▸ Mi banco de trabajo│  ┌────────────────────────────────────────────────────┐  ║
║                       │  │  Título de la unidad                               │  ║
║  ▾ M1 Fundamentos  ✔  │  ├────────────────────────────────────────────────────┤  ║
║      1.1 Algoritmo ✔  │  │                                                    │  ║
║      1.2 Variables ✔  │  │   Zona variable según la ventana:                  │  ║
║                       │  │   · enunciado + editor de código                   │  ║
║  ▾ M2 Control      ◐  │  │   · contenido teórico                              │  ║
║      2.3 Ciclos    ◐  │  │   · diálogo con el tutor                           │  ║
║      2.4 Acumular  ○  │  │   · tablero de repasos                             │  ║
║                       │  │                                                    │  ║
║  ▸ M3 Datos        🔒 │  │                                                    │  ║
║                       │  └────────────────────────────────────────────────────┘  ║
║  ─────────────────    │                                                          ║
║  ⟳ Repaso de hoy  (3) │  ┌────────────────────────────────────────────────────┐  ║
║  ▤ Mi progreso        │  │  Panel auxiliar contextual (tutor / casos de prueba)│ ║
║  ? Ayuda              │  └────────────────────────────────────────────────────┘  ║
╠═══════════════════════╧══════════════════════════════════════════════════════════╣
║ [D] ZONA DE ACCIONES                                                alto: 56 px  ║
║   [ ▶ Ejecutar ]  [ ✔ Entregar ]  [ ⚑ Pedir pista ]        [ ⟲ Reiniciar ]      ║
╠══════════════════════════════════════════════════════════════════════════════════╣
║ [E] FOOTER  ·  STIRE v0.2  ·  Autoguardado 12:04  ·  Accesibilidad  ·  Créditos  ║
╚══════════════════════════════════════════════════════════════════════════════════╝
```

**Rejilla base:** 12 columnas · canal de 24 px · ancho mínimo soportado 1024 px · en < 768 px la
sección [B] colapsa a menú lateral desplegable y [D] se ancla al borde inferior de la pantalla.

### Descripción de las secciones

| Sección | Elementos que contiene | **Función pedagógica** (por qué está ahí) |
|---|---|---|
| **[A] Header** | Marca, ruta de contenido (*Módulo › Tema › Unidad*), barra de dominio de la unidad, contador de repasos pendientes, acceso a perfil | Ancla al estudiante en el **mapa del conocimiento**: siempre sabe qué está estudiando, cuánto le falta para el umbral de dominio y qué deuda de repaso tiene. Hace visible el modelo de *mastery learning*, que de otro modo sería invisible y por tanto no regulador de la conducta de estudio. |
| **[B] Menú** | Árbol Módulo → Tema → Unidad con estado por unidad (✔ dominado · ◐ en práctica · ○ explorado · 🔒 bloqueado), accesos a Repaso de hoy, Mi progreso y Ayuda | Materializa el **grafo de prerrequisitos**: el candado no es una restricción administrativa, es información pedagógica ("aún no tienes la base para esto"). El estado por unidad sostiene la **autorregulación**: el estudiante decide dónde invertir esfuerzo con datos, no por intuición. |
| **[C] Contenido** | Zona principal de trabajo (teoría, enunciado, editor, diálogo del tutor o tablero de repaso) + panel auxiliar contextual | Concentra el **esfuerzo cognitivo pertinente** en una sola zona. Se aplica el principio de contigüidad: enunciado, editor y retroalimentación conviven sin cambio de pantalla, para que el estudiante no pierda el estado mental del problema al buscar información. |
| **[D] Acciones** | Verbos de la tarea: Ejecutar, Entregar, Pedir pista, Reiniciar. Posición fija en todas las ventanas | Separa **ensayar** de **entregar**. *Ejecutar* es gratis e ilimitado: habilita el ciclo ensayo-error sin castigo. *Entregar* consume intento y dispara la evaluación. Esa distinción visible es lo que convierte el error en instrumento de aprendizaje y no en amenaza. |
| **[E] Footer** | Versión, estado de autoguardado, accesibilidad, créditos y soporte | Sostiene la **confianza en el entorno**: saber que el trabajo está guardado elimina la ansiedad por pérdida, que en poblaciones novatas es una fuente real de abandono de la tarea. |

### Reglas transversales de la ventana estándar

1. Las secciones [A], [B], [D] y [E] son **invariantes**; solo cambia el contenido de [C].
2. Nunca hay más de **una acción primaria** visible en [D] (jerarquía: primaria llena, secundaria contorno, terciaria texto).
3. El color **nunca** es el único portador de significado: todo estado lleva icono y etiqueta textual (WCAG 2.1 AA, contraste mínimo 4.5:1).
4. Toda operación destructiva (Reiniciar, Entregar el último intento) exige confirmación explícita.
5. Toda ventana tiene retorno a **Mi banco de trabajo** en un solo clic.

---

## 3.3.1 · Fichas de Descripción de Ventana

Cada ficha desglosa las **7 categorías MODESEC**. Ninguna queda en blanco: cuando no aplica, se
justifica. La columna de acciones enlaza con el contrato de API propuesto — **verificado contra el
código real el 2026-08-25** (ver §5.1, tabla de verificación de endpoints). Cada endpoint citado lleva
su estado entre corchetes: ✅ existe · ⚠️ existe parcial (otra forma) · ❌ no existe (propuesto, aún no
implementado).

### Ficha V-01 · Mi banco de trabajo (panel del estudiante)

| # | Categoría | Descripción |
|---|---|---|
| 1 | **Imagen** | Iconografía lineal monocromática de 24 px (SVG) para estados de unidad y acciones. Ilustración de cabecera única, plana, sin texto embebido. Sin fotografías: evitan la fatiga visual y no aportan información algorítmica. |
| 2 | **Nombre de ventana** | Interno: `V-01_BANCO_TRABAJO` · Visible: **"Mi banco de trabajo"** |
| 3 | **Texto** | Saludo breve (1 línea), tres tarjetas de estado (*Continuar donde ibas*, *Repasos de hoy*, *Dominio del módulo*). Registro cercano y directo, segunda persona, frases ≤ 20 palabras. Sin jerga técnica no introducida aún. |
| 4 | **Audio** | **No aplica.** El panel es de consulta rápida (< 30 s) y suele usarse en sala de cómputo compartida. Un audio no solicitado sería intrusivo y no aporta información que el texto no dé mejor. |
| 5 | **Video** | **No aplica** salvo el primer ingreso: video de bienvenida opcional de 60 s, silenciable y descartable de forma permanente. Después no se muestra. |
| 6 | **Animación** | Barra de dominio con transición de 400 ms al actualizarse (hace perceptible el avance). Aparición escalonada de tarjetas (60 ms). Sin bucles infinitos ni parpadeos. Respeta `prefers-reduced-motion`. |
| 7 | **Acciones** | Continuar unidad en curso `[GET /learning-progress/me — ⚠️ EXISTE PARCIAL, ver §5.1]` · Abrir repasos del día `[GET /review-schedules/due — ❌ endpoint propuesto, aún no implementado]` · Navegar a una unidad desbloqueada · Abrir el tutor · Ver progreso detallado. Toda acción registra metadato de interacción. |

### Ficha V-02 · Unidad de aprendizaje (contenido teórico)

| # | Categoría | Descripción |
|---|---|---|
| 1 | **Imagen** | Diagramas de flujo y esquemas conceptuales en SVG (escalables y legibles con zoom). Toda imagen lleva texto alternativo descriptivo. Capturas de código como texto seleccionable, **nunca** como imagen. |
| 2 | **Nombre de ventana** | Interno: `V-02_UNIDAD_TEORIA` · Visible: nombre de la unidad (p. ej. **"2.3 Ciclos: while"**) |
| 3 | **Texto** | Cuerpo teórico en Markdown renderizado: definición, ejemplo resuelto y trazado paso a paso. Bloques de ≤ 150 palabras separados por ejemplo ejecutable. Nivel de lectura para estudiante sin experiencia previa. Glosario emergente al pasar sobre un término marcado. |
| 4 | **Audio** | **No aplica** como narración obligatoria. Se ofrece lectura por voz del texto vía tecnología asistiva del navegador (accesibilidad), sin locución producida: la locución fija impone un ritmo que perjudica la lectura de código. |
| 5 | **Video** | **Aplica.** Cápsula de 3–6 min por unidad, subtitulada, con control de velocidad, marcadores por concepto y transcripción descargable. Es material de apoyo, no sustituye el texto. |
| 6 | **Animación** | Animación paso a paso del trazado de escritorio: resalta la línea en ejecución y actualiza la tabla de variables. Controlada por el estudiante (avanzar / retroceder), nunca automática. Es la pieza multimedial con mayor valor pedagógico de esta ventana: hace visible el estado de la memoria. |
| 7 | **Acciones** | Marcar como explorado `[POST /learning-progress/:unitId/explored — ❌ endpoint propuesto, aún no implementado]` · Avanzar/retroceder el trazado · Abrir el ejercicio asociado · Preguntar al tutor sobre el fragmento seleccionado `[POST /tutor/chat — ✅ EXISTE]` · Descargar transcripción. |

### Ficha V-03 · Resolución de ejercicio (banco de trabajo activo)

| # | Categoría | Descripción |
|---|---|---|
| 1 | **Imagen** | Iconos de estado de caso de prueba (✔ pasa · ✖ falla · ⏱ tiempo excedido). Sin decoración: cualquier elemento gráfico no funcional compite con el enunciado y el editor. |
| 2 | **Nombre de ventana** | Interno: `V-03_EJERCICIO` · Visible: **"Ejercicio: "** + título del ejercicio |
| 3 | **Texto** | Enunciado estructurado (contexto, entrada, salida esperada, restricciones), ejemplos de entrada/salida y contador de intentos restantes. Enunciado ≤ 200 palabras; los casos límite van en ejemplos, no en prosa. |
| 4 | **Audio** | **No aplica** como contenido. Solo dos señales sonoras cortas y desactivables por defecto: éxito y fallo de la ejecución, para no obligar a mirar la pantalla durante la espera del juez. |
| 5 | **Video** | **No aplica.** El video obligaría a abandonar el estado mental del problema. La ayuda audiovisual pertenece a V-02 y es accesible desde el enlace a la teoría de la unidad. |
| 6 | **Animación** | Indicador de progreso durante la ejecución en el sandbox (estados: en cola → ejecutando → evaluando). Los casos de prueba se revelan en secuencia conforme el juez responde. Sin animación en el editor. |
| 7 | **Acciones** | Ejecutar contra casos públicos `[POST /judge/run — ❌ endpoint propuesto, aún no implementado]` · Entregar `[POST /submissions — ⚠️ EXISTE PARCIAL, ver §5.1]` (consume intento, exige confirmación) · Pedir pista `[POST /tutor/hint — ❌ endpoint propuesto, aún no implementado]` · Reiniciar plantilla (confirmación) · Autoguardado periódico del borrador. **Los casos con `isPublic: false` nunca se envían al cliente.** |

### Ficha V-04 · Retroalimentación del tutor inteligente

| # | Categoría | Descripción |
|---|---|---|
| 1 | **Imagen** | Avatar geométrico abstracto del tutor (no humanoide, no antropomórfico): evita atribuirle autoridad o infalibilidad humana. Marcas visuales que distinguen mensaje del tutor de mensaje del estudiante. |
| 2 | **Nombre de ventana** | Interno: `V-04_TUTOR` · Visible: **"Maestro de taller"** (metáfora rectora, §3.3.2) |
| 3 | **Texto** | Diálogo socrático: el tutor responde con preguntas guía, contraejemplos y señalamientos sobre el propio código del estudiante. **Nunca entrega la solución**. Turnos ≤ 80 palabras. Aviso permanente y visible: *"Respuestas generadas por IA: verifícalas ejecutando tu algoritmo."* |
| 4 | **Audio** | **No aplica.** Sintetizar voz sobre texto generado por IA aumenta la percepción de autoridad de una fuente que puede equivocarse. Decisión pedagógica deliberada, no limitación técnica. |
| 5 | **Video** | **No aplica.** El intercambio es contextual e irrepetible; ningún video pregrabado puede responder al código concreto del estudiante. |
| 6 | **Animación** | Indicador de escritura mientras se genera la respuesta (evita la percepción de sistema congelado) y entrega progresiva del texto. Sin gestos ni expresiones del avatar. |
| 7 | **Acciones** | Enviar consulta `[POST /tutor/chat — ✅ EXISTE]` · Adjuntar el fragmento de código seleccionado como contexto · Marcar la respuesta como útil / no útil (insumo de calidad del tutor) · Volver al ejercicio conservando el borrador. Se persisten **metadatos** de interacción, no la conversación completa (RF-27). |

### Ficha V-05 · Repaso espaciado (SM-2)

| # | Categoría | Descripción |
|---|---|---|
| 1 | **Imagen** | Iconografía de urgencia con **doble codificación** (forma + color + etiqueta): ⬤ al día · ◐ vence mañana · ▲ vencido · ■ crítico. Curva del olvido como esquema explicativo en la primera visita. |
| 2 | **Nombre de ventana** | Interno: `V-05_REPASO` · Visible: **"Mantenimiento del taller"** |
| 3 | **Texto** | Lista de unidades con repaso programado, fecha de vencimiento, nivel de urgencia y explicación de una línea: *"Dominaste esto hace 12 días; un repaso corto ahora lo fija."* La justificación es obligatoria: sin ella el repaso se percibe como trabajo arbitrario. |
| 4 | **Audio** | **No aplica.** Sesión de trabajo focalizada y breve. |
| 5 | **Video** | **No aplica.** El repaso es recuperación activa; ver un video la sustituye por reconocimiento pasivo y anula el efecto del método. |
| 6 | **Animación** | Al completar un repaso, la tarjeta se desplaza fuera de la lista y la nueva fecha aparece con transición corta (≤ 300 ms): hace visible que el intervalo se extendió, que es el refuerzo conductual del método. |
| 7 | **Acciones** | Iniciar repaso de una unidad `[GET /review-schedules/due — ❌ endpoint propuesto, aún no implementado]` · Resolver el ejercicio de repaso (reutiliza V-03) · Posponer con motivo (registro auditable) · Ver historial de intervalos. La calificación actualiza `easeFactor` e intervalo SM-2. |

### Ficha V-06 · Mi progreso (bitácora de dominio)

| # | Categoría | Descripción |
|---|---|---|
| 1 | **Imagen** | Visualizaciones de datos: barras de dominio por módulo, mapa de calor de actividad, línea de evolución. Sin gráficas 3D ni efectos: distorsionan la lectura de magnitudes. |
| 2 | **Nombre de ventana** | Interno: `V-06_PROGRESO` · Visible: **"Mi bitácora"** |
| 3 | **Texto** | Métricas con su interpretación al lado: `mastery`, `successRate`, `attemptsCount`, unidades dominadas y racha de repasos. Cada métrica lleva una línea de lectura: *"72 %: te faltan 13 puntos para desbloquear 2.4."* Un número sin interpretación no orienta la acción. |
| 4 | **Audio** | **No aplica.** Ventana de consulta analítica. |
| 5 | **Video** | **No aplica.** El dato es propio y cambiante; ningún video puede describirlo. |
| 6 | **Animación** | Las barras crecen desde cero al cargar (400 ms) y la unidad que cambió desde la última visita se resalta brevemente. Sin animación en cada re-render, para no convertir el dato en espectáculo. |
| 7 | **Acciones** | Filtrar por módulo o rango de fechas · Abrir la unidad más débil (acción sugerida por el sistema) · Exportar reporte personal · Consultar al tutor sobre el plan de estudio `[POST /tutor/chat — ✅ EXISTE]`. |

---

## 3.3.2 · Guía de Metáforas

**Metáfora rectora: “El taller del algoritmista”.**

**Justificación pedagógica (anclada en MOCAVI):** MOCAVI sitúa el aprendizaje en la actividad
mediada y el trabajo colaborativo sobre problemas reales. El taller es el espacio donde se aprende un
oficio **produciendo piezas**, con un maestro que corrige el procedimiento y no el resultado, y donde
el error es parte esperada del proceso, no una sanción. Para estudiantes de tercer semestre que llegan
con miedo al error de compilación, esta metáfora reencuadra el fallo como **prueba de banco**: algo que
se hace a propósito, muchas veces, antes de dar por buena una pieza. La metáfora sostiene además el
repaso espaciado, que en un taller real no es castigo sino **mantenimiento del herramental**.

| Elemento de la interfaz | Equivalente en la metáfora | Qué comunica al estudiante |
|---|---|---|
| Panel principal (V-01) | **Mi banco de trabajo** | "Este es tu puesto: aquí está lo que dejaste a medias y lo que toca hoy." |
| Ejercicio (V-03) | **Pieza en el banco** | "Es un encargo concreto, con medidas y tolerancias: entrada, salida y restricciones." |
| Ejecutar sin entregar | **Prueba de banco** | "Ensaya cuantas veces quieras; probar no cuesta nada y no queda registrado como intento." |
| Intento fallido | **Pieza que no pasa la medida** | "No pasó la verificación. Se ajusta y se vuelve a probar: eso es el oficio." |
| Tutor IA (V-04) | **Maestro de taller** | "Te muestra dónde mirar y te pregunta por qué; no hace la pieza por ti." |
| Casos de prueba | **Calibradores** | "Criterios objetivos y públicos: no dependen de la opinión de nadie." |
| Nivel de dominio (`mastery`) | **Temple de la herramienta** | "Se gana con uso repetido y se pierde con el desuso; por eso hay repasos." |
| Repaso espaciado (V-05) | **Mantenimiento del herramental** | "Se afila antes de que se desafile, no cuando ya falló." |
| Unidad bloqueada | **Encargo fuera de tu nivel** | "Aún no tienes la base; termina el encargo anterior y se abre." |
| Progreso del módulo (V-06) | **Bitácora del taller** | "Registro de lo que has producido y de lo que domina tu mano." |

### Consistencia visual derivada de la metáfora

| Dimensión | Decisión |
|---|---|
| **Paleta** | Base neutra de taller (grises cálidos y madera clara). Acento único **ámbar** para la acción primaria. Semánticos: verde = pasa, rojo = falla, azul = información del maestro. Ningún color decorativo compite con el acento. |
| **Iconografía** | Trazo lineal uniforme de 1.5 px, esquinas rectas, sin relleno. Vocabulario de herramienta e instrumento de medición; **prohibidos** trofeos, medallas, cofres y demás repertorio de videojuego: contradicen el encuadre de oficio y desplazan la motivación intrínseca. |
| **Tipografía** | Sans serif humanista para interfaz y monoespaciada para todo el código, sin excepción: el código nunca se compone con la tipografía de interfaz. |
| **Lenguaje** | Verbos de oficio (*ensayar, ajustar, verificar, entregar*). Se evita *ganar*, *perder*, *puntos* y *vidas*. |
| **Gamificación** | Fuera del alcance de esta fase. Si se incorpora, se hará como registro de oficio (bitácora, sellos de calidad) y no como economía de puntos. |

---

## 4. Trazabilidad — ventanas ↔ requisitos funcionales

| Ventana | Requisitos funcionales cubiertos | Módulo del sistema |
|---|---|---|
| V-01 Banco de trabajo | RF-08, RF-10, RF-11, RF-22, RF-23 | Seguimiento del aprendizaje · Recomendación de repaso |
| V-02 Unidad (teoría) | RF-05, RF-06, RF-07, RF-09 | Gestión de unidades de aprendizaje |
| V-03 Ejercicio | RF-17, RF-18, RF-19, RF-20 | Evaluación de conceptos · Judge |
| V-04 Tutor | RF-12, RF-13, RF-14, RF-15, RF-16, RF-25, RF-26, RF-27 | Tutor inteligente · Registro de interacciones |
| V-05 Repaso | RF-21, RF-22, RF-23, RF-24 | Recomendación de repaso (SM-2) |
| V-06 Progreso | RF-08, RF-10, RF-11 | Seguimiento del aprendizaje |
| *(transversal)* | RF-01, RF-02, RF-03, RF-04 | Gestión de usuarios — ventanas de autenticación, fuera del alcance de esta entrega |

---

## 5. Supuestos, pendientes y riesgos declarados

| # | Ítem | Estado | Responsable |
|---|---|---|---|
| 1 | Endpoints citados en la categoría 7 de las fichas | **Verificado ruta por ruta contra el código el 2026-08-25** (ver tabla §5.1). De las 7 rutas citadas: **1 existe tal cual, 2 existen con otra forma y 4 no existen** — quedan como contrato propuesto para Fase III. | Jeider (Líder Técnico) |
| 2 | §3.3.3 Mapa de Navegación | Pendiente — plantilla disponible | Julio |
| 3 | §3.2 Guión técnico multimedial (formatos 10 y 11 de la guía) | Pendiente — requiere las fichas de este documento como insumo | Por asignar |
| 4 | Video de la unidad (V-02, categoría 5) | **Alcance declarado, producción no iniciada.** Si no se produce, la unidad queda funcional solo con texto y animación de trazado. Debe reflejarse en `RELEASE_NOTES.md`. | Por asignar |
| 5 | Animación de trazado de escritorio (V-02, categoría 6) | Pieza de mayor valor pedagógico y mayor esfuerzo de implementación. Riesgo de recorte por tiempo: si se recorta, se sustituye por trazado estático tabulado, **no** se elimina. | Por asignar |
| 6 | Umbrales 70 % / 85 % / 60 % | Propuesta de diseño. Requiere validación con el docente titular de la asignatura. | Julio |
| 7 | Accesibilidad WCAG 2.1 AA | Declarada en el diseño; **sin auditoría ejecutada**. No debe reportarse como cumplida hasta verificarla con herramienta. | QA |

### 5.1 Verificación de endpoints (categoría 7, fichas V-01 a V-06)

Verificación hecha leyendo directamente los `@Controller` y decoradores de método en `src/`, no la
documentación. **No se cambió ninguna ficha de diseño para que encajara con el código** — el diseño
manda; esta tabla solo dice qué está construido hoy.

| Endpoint citado | Estado | Evidencia |
|---|---|---|
| `GET /learning-progress/me` (V-01) | ⚠️ **EXISTE PARCIAL** | No hay ruta `/me`. Existe [`GET /learning-progress/student/:studentId`](../../src/learning-progress/learning-progress.controller.ts) en `src/learning-progress/learning-progress.controller.ts:27`, que exige el `studentId` explícito (un estudiante solo puede consultar el suyo; lo aplica `ForbiddenException` en el propio método). |
| `GET /review-schedules/due` (V-01, V-05) | ❌ **NO EXISTE** | El módulo `review-schedules` tiene entidad, repositorio y servicio (`src/review-schedules/`) pero **no tiene ningún controlador**, o sea ninguna ruta HTTP. Endpoint propuesto, aún no implementado. |
| `POST /learning-progress/:unitId/explored` (V-02) | ❌ **NO EXISTE** | `LearningProgressController` (`src/learning-progress/learning-progress.controller.ts`) solo expone dos métodos, ambos `GET` (`student/:studentId` y `student/:studentId/unit/:unitId`). No hay ningún método `POST`. Endpoint propuesto, aún no implementado. |
| `POST /submissions` (V-03) | ⚠️ **EXISTE PARCIAL** | No existe `POST /submissions` a secas. Existen [`POST /submissions/start`](../../src/submissions/submissions.controller.ts) (`src/submissions/submissions.controller.ts:17`) y [`POST /submissions/:id/submit`](../../src/submissions/submissions.controller.ts) (`:26`) — el flujo real es en dos pasos, no uno. |
| `POST /tutor/chat` (V-02, V-04, V-06) | ✅ **EXISTE** | [`src/tutor/tutor.controller.ts:17`](../../src/tutor/tutor.controller.ts), método `POST`, con `@Throttle` propio. |
| `POST /tutor/hint` (V-03) | ❌ **NO EXISTE** | `TutorController` (`src/tutor/tutor.controller.ts`) solo expone `chat`. No hay método `hint`. Endpoint propuesto, aún no implementado. |
| `POST /judge/run` (V-03) | ❌ **NO EXISTE** | No hay ningún controlador HTTP para `judge-engine` (`src/judge-engine/` solo tiene worker, adapters, repositorio y servicio internos). La ejecución contra el sandbox ocurre de forma **asíncrona e interna**: `POST /submissions/:id/submit` encola un job en `JudgeQueue` (`src/submissions/submissions.service.ts`); el cliente no dispara la ejecución con una llamada síncrona propia. Endpoint propuesto, aún no implementado. |

**Lectura para diseño:** de las 7 acciones citadas, solo el chat del tutor está listo tal cual está
descrito. Las demás son contrato de Fase III: la ventana puede diseñarse igual (el diseño no cambia),
pero el equipo de backend sabe exactamente qué falta por construir antes de integrar.

---

## 6. Fuentes

- Guía de la asignatura `DDS3-01.pdf` — *3. Fase II: Diseño Multimedial*, §3.1, §3.3, §3.3.2, §3.3.3 (Formatos 10, 11, 13).
- Caro, M., Toscano, R., Hernández, F. y David, M. (2009). *MODESEC: Modelo para el desarrollo de software educativo basado en competencias.* Nuevas Ideas en Informática Educativa, 5, 188–200.
- *Modelo pedagógico Educación virtual — MOCAVI* (2023).
- Giraldo, J. C. (2004). *Metodología SEMLI: Software Educativo, Multimedia, Lúdico e Interactivo.* Montería.
- Documentación interna STIRE: `docs/STIRE_FUNCTIONAL_VISION.md`, documento maestro de requisitos (RF-01 a RF-27), `docs/modesec/PLANTILLAS_MODESEC_FASE2.md`.
