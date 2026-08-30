# 🏛️ Insumo 06 — Arquitectura Funcional de Ventanas MODESEC

**Proyecto:** STIRE-Soft  
**Norma:** MODESEC §3.3 / Especificación Técnica de Pantallas  
**Total de Ventanas:** 15 (1 Común + 6 Estudiante + 5 Docente + 3 Administrador)  
**Fecha:** 30 de agosto de 2026  

---

## 🔑 PARTE 0: VISTA COMÚN

### VENTANA: Ingreso y Autenticación
* **CÓDIGO:** `COMP-V00`
* **ROL:** Público / Todos los roles (`estudiante`, `docente`, `admin`)
* **OBJETIVO:** Permitir el acceso seguro al sistema y registrar nuevos estudiantes.
* **ENTRADA:** Ruta raíz `/` o `/auth/login`.
* **DATOS MOSTRADOS:** Formulario de credenciales (email y password), botones de acción, mensajes de error en línea.
* **ACCIONES:** `[Iniciar Sesión]`, `[Crear Cuenta]`, `[Alternar Vista Registro/Login]`.
* **COMPONENTES:** `AuthCard`, `InputField`, `ButtonPrimary`, `AlertMessage`.
* **ENDPOINTS:** `POST /auth/login`, `POST /auth/register`.
* **ESTADOS:**
  * **Carga:** Botón con spinner, inputs deshabilitados.
  * **Error:** Alerta roja con mensaje ("Credenciales inválidas" o "Usuario inactivo").
  * **Éxito:** Redirección automática a la vista correspondiente según el rol del token JWT.
* **NAVEGACIÓN:**
  * Estudiante -> `EST-V01`
  * Docente -> `DOC-V01`
  * Admin -> `ADM-V01`
* **REGLAS DE NEGOCIO:** Throttling estricto a 5 intentos/minuto. La contraseña jamás se expone en la respuesta.
* **DEPENDENCIAS:** `AuthService`, `JwtModule`.

---

## 🎓 PARTE 1: VISTAS DEL ESTUDIANTE

### VENTANA: Mi Banco de Trabajo
* **CÓDIGO:** `EST-V01`
* **ROL:** `estudiante`
* **OBJETIVO:** Servir como panel central de control, mostrando estado actual, accesos directos de repaso y avance curricular.
* **ENTRADA:** `/estudiante/dashboard`
* **DATOS:** Saludo, tarjeta de última unidad estudiada, contador de repasos pendientes hoy, barra de maestría global, lista de clases matriculadas.
* **ACCIONES:** `[Continuar Unidad]`, `[Iniciar Repasos de Hoy]`, `[Unirse a Clase con Código]`, `[Abrir Bitácora]`.
* **COMPONENTES:** `HeaderStudent`, `MasterySummaryCard`, `SpacedRepetitionBadge`, `ClassCardList`, `JoinClassModal`.
* **ENDPOINTS:** `GET /enrollment/my`, `GET /analytics/student/:id`, `POST /enrollment/join`.
* **ESTADOS:**
  * **Vacío:** "No estás matriculado en ninguna clase. Ingresa el código provisto por tu docente".
  * **Carga:** Skeletons de tarjetas y barra de progreso titilante.
  * **Error:** "No se pudo cargar tu información de progreso. [Reintentar]".
  * **Éxito:** Renderizado de métricas y tarjetas de acción.
* **NAVEGACIÓN:** A `EST-V02` (Unidad), `EST-V05` (Repasos), `EST-V06` (Bitácora), `EST-V04` (Tutor).

### VENTANA: Unidad de Aprendizaje (Teoría)
* **CÓDIGO:** `EST-V02`
* **ROL:** `estudiante`
* **OBJETIVO:** Presentar la base conceptual, ejemplos de código y trazados de escritorio de una unidad temática.
* **ENTRADA:** `/estudiante/unidad/:id`
* **DATOS:** Título de la unidad, bloques de contenido Markdown (teoría, sintaxis, casos de uso), diagrama conceptual SVG, indicador de dificultad.
* **ACCIONES:** `[Comenzar Reto Práctico]`, `[Pedir Explicación al Tutor]`, `[Marcar como Leído]`.
* **COMPONENTES:** `ContentBlockViewer`, `CodeSyntaxHighlighter`, `BreadcrumbNav`, `ActionButtonGroup`.
* **ENDPOINTS:** `GET /learning-unit/:id`, `GET /content/unit/:id`.
* **ESTADOS:**
  * **Vacío:** "Esta unidad aún no tiene bloques de contenido publicados".
  * **Carga:** Skeleton de lectura de texto.
  * **Error:** "Unidad no encontrada o sin acceso".
* **NAVEGACIÓN:** A `EST-V03` (Práctica/Evaluación), `EST-V01` (Volver al banco).

### VENTANA: Resolución de Ejercicio (Sandbox)
* **CÓDIGO:** `EST-V03`
* **ROL:** `estudiante`
* **OBJETIVO:** Proveer un entorno de codificación interactivo donde el estudiante implementa algoritmos y los valida contra pruebas del juez.
* **ENTRADA:** `/estudiante/evaluacion/:activityId`
* **DATOS:** Enunciado estructurado, editor de código con numeración de líneas, consola de ejecución, tabla de casos de prueba (públicos: entrada, esperado, obtenido; privados: resultado oculto), contador de intentos.
* **ACCIONES:** `[Ejecutar]` (gratis, prueba libre), `[Entregar Solución]` (consume intento), `[Pedir Pista al Tutor]`, `[Reiniciar Código]`.
* **COMPONENTES:** `CodeEditorMonaco`, `TestCasesViewer`, `ConsoleOutput`, `SubmissionCountdown`, `ConfirmModal`.
* **ENDPOINTS:** `POST /submissions/start`, `PUT /submissions/:id/autosave`, `POST /submissions/:id/submit`.
* **ESTADOS:**
  * **Carga:** "Iniciando sandbox y cargando reto...".
  * **Ejecutando:** Spinner en consola "Sandbox ejecutando pruebas aisladas...".
  * **Éxito (Accepted):** Tarjeta verde de felicitación + actualización de maestría (+X%).
  * **Fallo (Wrong Answer / Error):** Detalle de diferencias en casos públicos sin revelar casos privados.
* **REGLAS DE NEGOCIO:** Autoguardado cada 15 segundos (`autosave`). `attemptsAllowed = 0` permite intentos ilimitados.

### VENTANA: Maestro de Taller (Tutor IA Socrático)
* **CÓDIGO:** `EST-V04`
* **ROL:** `estudiante`
* **OBJETIVO:** Brindar andamiaje pedagógico personalizado mediante diálogo socrático guiado por el estado cognitivo del estudiante.
* **ENTRADA:** Modal flotante global o `/estudiante/tutor`.
* **DATOS:** Historial de conversación reciente, badge de nivel cognitivo (Principiante / Intermedio / Avanzado), aviso de IA ("Verifica ejecutando tu algoritmo").
* **ACCIONES:** `[Enviar Mensaje]`, `[Adjuntar Código Actual]`, `[Limpiar Chat]`.
* **COMPONENTES:** `ChatTimeline`, `ChatMessageBubble`, `PromptInput`, `ThinkingIndicator`.
* **ENDPOINTS:** `POST /tutor/chat`.
* **ESTADOS:**
  * **Carga:** Indicador de digitación ("El Tutor está analizando tu algoritmo...").
  * **Error:** "El Tutor no está disponible temporalmente. Intenta nuevamente".
* **REGLAS DE NEGOCIO:** Throttle 20 req/min. NUNCA entrega el código resuelto.

### VENTANA: Mantenimiento (Repaso Espaciado SM-2)
* **CÓDIGO:** `EST-V05`
* **ROL:** `estudiante`
* **OBJETIVO:** Listar y ejecutar las actividades de repaso recomendadas por la curva del olvido para evitar el desentrenamiento de conceptos.
* **ENTRADA:** `/estudiante/repasos`
* **DATOS:** Lista de unidades con fecha de vencimiento SM-2 cumplida o próxima, etiqueta de urgencia (Crítico, Vencido, Para Hoy), factor de facilidad.
* **ACCIONES:** `[Iniciar Repaso]`, `[Posponer 24h]`.
* **COMPONENTES:** `ReviewCardList`, `UrgencyTag`, `EbbinghausProgressChart`.
* **ENDPOINTS:** `GET /analytics/student/:id`.
* **ESTADOS:**
  * **Vacío (Al día):** "¡Excelente! No tienes deuda de repaso pendiente hoy".

### VENTANA: Mi Bitácora (Progreso y Analítica)
* **CÓDIGO:** `EST-V06`
* **ROL:** `estudiante`
* **OBJETIVO:** Visualizar el progreso histórico, distribución de maestría por tema, tasa de éxito y racha de estudio.
* **ENTRADA:** `/estudiante/progreso`
* **DATOS:** Gráfico radar/barras de dominio por tema, total de actividades completadas, tasa global de éxito %, historial de envíos.
* **COMPONENTES:** `MasteryBarChart`, `StatCounter`, `SubmissionHistoryTable`.
* **ENDPOINTS:** `GET /learning-progress/student/:id`, `GET /analytics/student/:id`.

---

## 👨‍🏫 PARTE 2: VISTAS DEL DOCENTE

### VENTANA: Panel de Mis Clases
* **CÓDIGO:** `DOC-V01`
* **ROL:** `docente`
* **OBJETIVO:** Administrar las aulas activas, crear nuevas cohortes y consultar códigos de invitación.
* **ENTRADA:** `/docente/dashboard` o `/docente/clases`
* **DATOS:** Tarjetas de clases con nombre, código de matrícula, conteo de estudiantes matriculados y promedio de cohorte.
* **ACCIONES:** `[Crear Nueva Clase]`, `[Copiar Código de Acceso]`, `[Abrir Seguimiento]`, `[Archivar Clase]`.
* **COMPONENTES:** `ClassManagementGrid`, `CreateClassModal`, `CopyCodeButton`.
* **ENDPOINTS:** `GET /class/my-classes`, `POST /class`, `PATCH /class/:id`.

### VENTANA: Gestor Curricular y Contenidos
* **CÓDIGO:** `DOC-V02`
* **ROL:** `docente`
* **OBJETIVO:** Organizar la estructura didáctica en módulos, temas y unidades de aprendizaje, regulando su publicación.
* **ENTRADA:** `/docente/contenidos`
* **DATOS:** Árbol jerárquico desplegable (Módulo > Tema > Unidad), interruptor de estado (Borrador / Publicado).
* **ACCIONES:** `[Agregar Tema]`, `[Agregar Unidad]`, `[Alternar Publicación]`, `[Reordenar]`.
* **COMPONENTES:** `CurriculumTreeView`, `ContentItemRow`, `PublishSwitch`.
* **ENDPOINTS:** `GET /topic`, `POST /topic`, `POST /learning-unit`, `PATCH /learning-unit/:id`.

### VENTANA: Diseñador de Ejercicios y Rúbricas
* **CÓDIGO:** `DOC-V03`
* **ROL:** `docente`
* **OBJETIVO:** Crear ejercicios prácticos con enunciados, código base, solución de referencia y casos de prueba.
* **ENTRADA:** `/docente/ejercicios/crear`
* **DATOS:** Formulario de título, enunciado Markdown, selector de tipo de pregunta, tabla de casos de prueba.
* **ACCIONES:** `[Añadir Caso de Prueba]`, `[Probar Solución en Sandbox]`, `[Guardar Ejercicio]`.
* **COMPONENTES:** `ExerciseBuilderForm`, `TestCasesManagerTable`, `CodeEditorMonaco`.
* **ENDPOINTS:** `POST /activities`, `POST /activity-questions`.

### VENTANA: Analítica de Cohorte y Alertas
* **CÓDIGO:** `DOC-V04`
* **ROL:** `docente`
* **OBJETIVO:** Monitorear el rendimiento grupal, detectar estudiantes en rezago cognitivo y exportar planillas.
* **ENTRADA:** `/docente/clase/:id/analitica`
* **DATOS:** Promedio de dominio de la cohorte, lista de estudiantes ordenados por rendimiento, ranking, tasa de error por ejercicio.
* **ACCIONES:** `[Filtrar por Riesgo]`, `[Ver Detalle de Estudiante]`, `[Exportar Reporte CSV]`.
* **COMPONENTES:** `ClassMetricsSummary`, `StudentRankingsTable`, `RiskIndicatorBadge`.
* **ENDPOINTS:** `GET /analytics/class/:id`.

### VENTANA: Seguimiento Individual de Estudiante
* **CÓDIGO:** `DOC-V05`
* **ROL:** `docente`
* **OBJETIVO:** Inspeccionar en profundidad el desempeño de un estudiante particular de la clase.
* **ENTRADA:** `/docente/estudiante/:id`
* **DATOS:** Historial de intentos, código enviado en cada submission, evolución del mastery individual.
* **COMPONENTES:** `StudentProfileHeader`, `SubmissionsInspector`, `MasteryRadarChart`.
* **ENDPOINTS:** `GET /learning-progress/student/:id`, `GET /analytics/student/:id`.

---

## 🛡️ PARTE 3: VISTAS DEL ADMINISTRADOR

### VENTANA: Panel de Control del Sistema
* **CÓDIGO:** `ADM-V01`
* **ROL:** `admin`
* **OBJETIVO:** Supervisión general del estado operativo de STIRE.
* **ENTRADA:** `/admin/dashboard`
* **DATOS:** Total de usuarios registrados por rol, total de clases activas, volumen de ejecuciones en sandbox hoy.
* **COMPONENTES:** `StatKpiGrid`, `ServerHealthTacometer`, `RecentActivityFeed`.
* **ENDPOINTS:** `GET /maintenance`, `GET /analytics`.

### VENTANA: Gestión de Usuarios y Permisos
* **CÓDIGO:** `ADM-V02`
* **ROL:** `admin`
* **OBJETIVO:** Administrar cuentas de usuario, asignación de roles y estados de actividad.
* **ENTRADA:** `/admin/usuarios`
* **DATOS:** Tabla paginada con nombre, email, rol actual, estado activo/inactivo, fecha de creación.
* **ACCIONES:** `[Crear Usuario]`, `[Cambiar Rol]`, `[Activar/Desactivar]`, `[Restablecer Acceso]`.
* **COMPONENTES:** `UsersDataTable`, `RoleBadgeSelect`, `UserEditModal`.
* **ENDPOINTS:** `GET /users`, `PATCH /users/:id`, `POST /users`.

### VENTANA: Parámetros del Sistema y Logs
* **CÓDIGO:** `ADM-V03`
* **ROL:** `admin`
* **OBJETIVO:** Consultar logs de auditoría técnica y estado de componentes del sistema.
* **ENTRADA:** `/admin/sistema`
* **DATOS:** Logs de eventos de seguridad, estado de conexión de base de datos, memoria utilizada por el sandbox.
* **COMPONENTES:** `SystemLogsViewer`, `ServiceStatusList`.
* **ENDPOINTS:** `GET /maintenance`.
