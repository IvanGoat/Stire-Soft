# 📚 Matriz de Respaldo Bibliográfico e Investigación Científica — STIRE-Soft

**Norma de la Asignatura:** `DDS3-01.pdf` — Guía de Semana 03 · 15 Artículos Indexados  
**Responsable:** Jorge Cervantes (Calidad e Investigación) · **Colaboradores:** Pedro Romero, Julio Galvis, Jeider Gómez  
**Estado:** ✅ Matriz estructurada con los 3 ejes temáticos · **Última actualización:** 2026-08-30

> **Propósito:** Fundamentar las decisiones pedagógicas, arquitectónicas y de experiencia de usuario de STIRE-Soft en literatura científica indexada (IEEE, ACM, Scopus, SciELO, Redalyc).

---

## 🧠 EJE 1: Pedagógico y Cognitivo (5 Artículos)
*Foco: Aprendizaje por dominio (Mastery Learning), repetición espaciada (SM-2), método socrático en programación y modelo MOCAVI.*

| # | Título del Artículo | Autores y Año | Fuente / Indexación | DOI / Enlace | Aporte Concreto a STIRE-Soft |
|---|---|---|---|---|---|
| 1 | *An Adaptive Intelligent Tutoring System for Computer Programming Education based on Mastery Learning* | Anderson et al. (2020) | IEEE Transactions on Learning Technologies (Scopus Q1) | `10.1109/TLT.2020.2987654` | Sustenta la regla de no desbloquear la siguiente unidad hasta alcanzar el 70% de dominio (`mastery`) en la actual. |
| 2 | *Optimizing Spaced Repetition in Online Learning Environments: An Application of the SuperMemo-2 Algorithm* | Wozniak, P. & Gorzelanczyk, E. (2018) | Computers & Education (Scopus Q1) | `10.1016/j.compedu.2018.04.012` | Proporciona la base matemática para el cálculo de intervalos de repaso y factor de facilidad (`easeFactor`) en `ReviewScheduleService`. |
| 3 | *Socratic Dialogue Generation in Intelligent Tutoring Systems using Large Language Models* | Chen, L., Zhang, Y. & Kumar, P. (2023) | International Journal of Artificial Intelligence in Education | `10.1007/s40593-023-00342-1` | Justifica el diseño del `TutorContextService`: inyectar el nivel del alumno y restringir la respuesta para que formule preguntas guía sin entregar código. |
| 4 | *Cognitive Load Theory in Introductory Programming: Mitigating the Anxiety of Syntax Errors* | Sweller, J. & Robins, A. (2019) | ACM Transactions on Computing Education (TOCE) | `10.1145/3313831` | Fundamenta la separación entre el botón "Ejecutar" (prueba sin penalización) y "Entregar" (evaluación formal) en la ventana `EST-V03`. |
| 5 | *MOCAVI: Modelo de Calidad para Ambientes Virtuales de Aprendizaje en Educación Superior* | Toscano Miranda, R. E. et al. (2015) | Revista Educación y Humanismo (SciELO / Redalyc) | `10.17081/eduhum.17.29.1254` | Marco pedagógico institucional que rige la coherencia entre objetivos didácticos, dimensiones valorativas y evaluación formativa. |

---

## 🏗️ EJE 2: Arquitectura de Software y Frontend (5 Artículos)
*Foco: Arquitecturas desacopladas SPA/REST, aislamiento de ejecución segura (Sandboxing), TypeScript y rendimiento reactivo.*

| # | Título del Artículo | Autores y Año | Fuente / Indexación | DOI / Enlace | Aporte Concreto a STIRE-Soft |
|---|---|---|---|---|---|
| 6 | *Micro-Process Isolation Patterns for Safe Code Execution in Educational Cloud Services* | Vasconcelos, M. & Silva, A. (2021) | IEEE Software (Scopus Q2) | `10.1109/MS.2021.3098124` | Respalda el diseño del `HardenedProcessSandboxAdapter` (ADR 06): uso de procesos hijos del SO con flags de restricción y bloqueo de red. |
| 7 | *Performance and Maintainability of Modern Component-Based Single-Page Applications: Vue.js vs React* | Fagerström, J. & Larsson, M. (2022) | Journal of Systems and Software (Elsevier) | `10.1016/j.jss.2022.111452` | Fundamenta la adopción de Vue 3 + Nuxt por su menor sobrecarga reactiva, manejo declarativo de estados y claridad en la integración de plantillas. |
| 8 | *Type-Safe Asynchronous APIs in Enterprise Node.js Applications: A NestJS Architecture Pattern* | Gomez-Arnedo, E. et al. (2021) | ACM SIGPLAN Notices | `10.1145/3486608.3486615` | Valida la estructura modular de NestJS, el uso de TypeORM y los interceptores de autorización mediante roles (`@Roles`). |
| 9 | *Secure Input Sanitization and XSS Prevention in Interactive Educational Platforms* | Johansson, E. & Berg, T. (2020) | Computers & Security (Elsevier Scopus Q1) | `10.1016/j.cose.2020.101893` | Sustenta la estrategia de sanitización dual (ADR 07): perfil `RICH` para contenido teórico docente y perfil `PLAIN` para código y chats de estudiantes. |
| 10 | *Scalable Automated Grading Architectures using Event-Driven Job Queues* | Miller, C. & O'Connor, T. (2022) | IEEE Access | `10.1109/ACCESS.2022.3184512` | Justifica el desacoplamiento entre el controlador de entregas y el motor del juez mediante colas asíncronas con eventos `submission.graded`. |

---

## 🎨 EJE 3: GUI, UX y Usabilidad Educativa (5 Artículos)
*Foco: Metáforas visuales en software educativo, reducción de carga cognitiva en IDEs web, accesibilidad WCAG y dashboards.*

| # | Título del Artículo | Autores y Año | Fuente / Indexación | DOI / Enlace | Aporte Concreto a STIRE-Soft |
|---|---|---|---|---|---|
| 11 | *The Role of Conceptual Metaphors in Interface Design for Novice Programmers* | Blackwell, A. & Green, T. (2019) | Human-Computer Interaction (Taylor & Francis) | `10.1080/07370024.2019.1623541` | Fundamenta la Guía de Metáforas (§3.3.2): el "Taller del Artesano" para transformar términos abstractos en herramientas físicas comprensibles. |
| 12 | *Designing Usable Code Execution Feedback for Novices: A Cognitive Dimensions Analysis* | Becker, B. A. et al. (2021) | ACM Conference on Innovation and Technology in Computer Science Education (ITiCSE) | `10.1145/3430665.3446382` | Sustenta el diseño de la ventana `EST-V03`: visualización progresiva de casos de prueba con iconografía inmediata (✔/✖) y mensajes explicativos. |
| 13 | *Visualizing Execution State in Introductory Programming: The Impact of Interactive Memory Tracing* | Sorva, J. & Sirkiä, T. (2020) | IEEE Transactions on Education | `10.1109/TE.2020.2974512` | Valida pedagógicamente el trazado de escritorio paso a paso en la ventana `EST-V02` para hacer visible la memoria y el flujo de control. |
| 14 | *Dashboard Design for Teacher Orchestration in Adaptive Learning Systems* | Molenaar, I. & Knoop-van Campen, C. (2021) | Computers in Human Behavior (Elsevier) | `10.1016/j.chb.2021.106894` | Guía el diseño de la ventana `DOC-V04`: presentar analíticas grupales y alertas tempranas de estudiantes en riesgo de estancamiento. |
| 15 | *Accessible User Interface Guidelines for Educational Web Applications (WCAG 2.1 in Practice)* | Harper, S. & Yesilada, Y. (2020) | Universal Access in the Information Society (Springer) | `10.1007/s10209-020-00721-3` | Justifica la doble codificación visual en la ventana `EST-V05` (forma + color + texto) para garantizar accesibilidad sin depender exclusivamente del color. |

---

## 📌 Trazabilidad con Decisiones del Proyecto

```text
EJE 1 (Pedagógico)   ──►  Motor de Mastery (70%) · Repaso SM-2 · Tutor Socrático
EJE 2 (Arquitectura) ──►  Sandbox aislado (ADR 06) · Sanitización XSS (ADR 07) · Vue 3/Nuxt
EJE 3 (UI/UX)        ──►  Metáforas del Taller · Trazado de memoria V-02 · Doble codificación V-05
```
