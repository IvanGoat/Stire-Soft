# 🚀 Insumo 14 — Guía Maestra de Implementación Frontend (Vue 3 + Nuxt)

**Proyecto:** STIRE-Soft Frontend  
**Destinatarios:** Equipo de Desarrollo (José López, Pedro Romero, Julio Galvis, Jeider Gómez, Jorge Cervantes)  
**Stack Oficial:** Nuxt 3 (SSR/SSG Híbrido) + Vue 3 (Composition API `<script setup>`) + TypeScript + Pinia + Tailwind / Vanilla CSS  
**Fecha:** 30 de agosto de 2026  

---

## 1. Asignación de Ventanas y Fichas de Trabajo

Esta guía permite que cada integrante del equipo abra su ventana asignada y comience a maquetar y conectar componentes sin necesidad de re-investigar el backend.

---

### 🔑 VISTA COMÚN

#### `COMP-V00` · Ingreso y Autenticación
* **Responsable:** José López (UI) & Jeider Gómez (Auth Flow)
* **Ruta Nuxt:** `/auth/login` y `/auth/register`
* **Layout:** `layouts/auth.vue`
* **Componentes a Implementar:** `AuthCard.vue`, `LoginForm.vue`, `RegisterForm.vue`, `ErrorAlert.vue`.
* **Endpoints Backend:** `POST /auth/login`, `POST /auth/register`.
* **Datos y Estado:** Guardar JWT en cookie de sesión y poblar `useAuthStore()`. Redirección automática según `user.role`.

---

### 🎓 VISTAS DEL ESTUDIANTE

#### `EST-V01` · Mi Banco de Trabajo
* **Responsable:** José López (Diseño) & Julio Galvis (Pedagogía)
* **Ruta Nuxt:** `/estudiante/dashboard`
* **Layout:** `layouts/student.vue`
* **Componentes:** `StudentHeader.vue`, `MasteryCard.vue`, `SpacedRepetitionBadge.vue`, `EnrolledClassList.vue`, `JoinClassModal.vue`.
* **Endpoints:** `GET /enrollment/my`, `GET /analytics/student/:id`, `POST /enrollment/join`.

#### `EST-V02` · Unidad de Aprendizaje (Teoría)
* **Responsable:** Julio Galvis (Diseño Instruccional)
* **Ruta Nuxt:** `/estudiante/unidad/:id`
* **Layout:** `layouts/student.vue`
* **Componentes:** `MarkdownViewer.vue`, `CodeHighlighter.vue`, `ConceptualDiagramViewer.vue`, `StartExerciseButton.vue`.
* **Endpoints:** `GET /learning-unit/:id`, `GET /content/unit/:id`.

#### `EST-V03` · Resolución de Ejercicio en Sandbox
* **Responsable:** Jeider Gómez (Sandbox & Editor) & José López (UI)
* **Ruta Nuxt:** `/estudiante/evaluacion/:activityId`
* **Layout:** `layouts/workspace.vue` (Layout de pantalla completa sin distracciones)
* **Componentes:** `CodeEditorMonaco.vue`, `ProblemStatement.vue`, `TestCasesPanel.vue`, `ConsoleOutput.vue`, `AutosaveIndicator.vue`.
* **Endpoints:** `POST /submissions/start`, `PUT /submissions/:id/autosave`, `POST /submissions/:id/submit`.

#### `EST-V04` · Maestro de Taller (Tutor IA)
* **Responsable:** Jeider Gómez (LLM Integration) & Pedro Romero (Doc)
* **Ruta Nuxt:** Componente flotante global o `/estudiante/tutor`
* **Componentes:** `TutorChatDrawer.vue`, `ChatMessageItem.vue`, `PromptInput.vue`.
* **Endpoints:** `POST /tutor/chat`.

#### `EST-V05` · Mantenimiento (Repaso Espaciado SM-2)
* **Responsable:** Julio Galvis (Pedagogía) & José López (UI)
* **Ruta Nuxt:** `/estudiante/repasos`
* **Componentes:** `SpacedRepetitionCard.vue`, `UrgencyTag.vue`, `EmptyState.vue`.
* **Endpoints:** `GET /analytics/student/:id`.

#### `EST-V06` · Mi Bitácora (Progreso y Analítica Personal)
* **Responsable:** Pedro Romero (Documentación) & José López (UI)
* **Ruta Nuxt:** `/estudiante/progreso`
* **Componentes:** `MasteryBarChart.vue`, `StreakCounter.vue`, `SubmissionsHistoryTable.vue`.
* **Endpoints:** `GET /learning-progress/student/:id`, `GET /analytics/student/:id`.

---

### 👨‍🏫 VISTAS DEL DOCENTE

#### `DOC-V01` · Panel de Mis Clases
* **Responsable:** José López (UI) & Jorge Cervantes (QA)
* **Ruta Nuxt:** `/docente/dashboard`
* **Componentes:** `ClassCardGrid.vue`, `CreateClassModal.vue`, `CopyAccessCodeButton.vue`.
* **Endpoints:** `GET /class/my-classes`, `POST /class`.

#### `DOC-V02` · Gestor Curricular y de Contenidos
* **Responsable:** Julio Galvis (Diseño Instruccional)
* **Ruta Nuxt:** `/docente/contenidos`
* **Componentes:** `TopicTreeAccordion.vue`, `LearningUnitRow.vue`, `PublishToggle.vue`.
* **Endpoints:** `GET /topic`, `POST /topic`, `POST /learning-unit`, `PATCH /learning-unit/:id`.

#### `DOC-V03` · Diseñador de Ejercicios y Casos de Prueba
* **Responsable:** Jeider Gómez (Backend) & José López (UI)
* **Ruta Nuxt:** `/docente/ejercicios/crear`
* **Componentes:** `ExerciseForm.vue`, `TestCasesEditorTable.vue`, `SandboxTestButton.vue`.
* **Endpoints:** `POST /activities`, `POST /activity-questions`.

#### `DOC-V04` · Analítica de Cohorte y Alertas
* **Responsable:** Pedro Romero & Jorge Cervantes (QA)
* **Ruta Nuxt:** `/docente/clase/:id/analitica`
* **Componentes:** `CohortMetricsCard.vue`, `StudentRankingsTable.vue`, `RiskAlertBadge.vue`.
* **Endpoints:** `GET /analytics/class/:id`.

#### `DOC-V05` · Seguimiento Individual de Estudiante
* **Responsable:** Julio Galvis & Pedro Romero
* **Ruta Nuxt:** `/docente/estudiante/:id`
* **Componentes:** `StudentDetailCard.vue`, `SubmissionCodeInspector.vue`.
* **Endpoints:** `GET /learning-progress/student/:id`, `GET /analytics/student/:id`.

---

### 🛡️ VISTAS DEL ADMINISTRADOR

#### `ADM-V01` · Panel de Control Global
* **Responsable:** Jeider Gómez & Jorge Cervantes
* **Ruta Nuxt:** `/admin/dashboard`
* **Componentes:** `KpiGrid.vue`, `ServiceHealthCard.vue`.
* **Endpoints:** `GET /maintenance`, `GET /analytics`.

#### `ADM-V02` · Gestión de Usuarios y Permisos
* **Responsable:** Pedro Romero & Jeider Gómez
* **Ruta Nuxt:** `/admin/usuarios`
* **Componentes:** `UsersTable.vue`, `ChangeRoleModal.vue`, `UserStatusToggle.vue`.
* **Endpoints:** `GET /users`, `PATCH /users/:id`.

#### `ADM-V03` · Parámetros Técnicos y Logs
* **Responsable:** Jorge Cervantes (QA) & Jeider Gómez
* **Ruta Nuxt:** `/admin/sistema`
* **Componentes:** `SystemLogsViewer.vue`, `SandboxMemoryMonitor.vue`.
* **Endpoints:** `GET /maintenance`.
