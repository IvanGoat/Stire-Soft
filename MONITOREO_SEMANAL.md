# 🚀 Bitácora de Monitoreo y Control N.º 3 — Proyecto: STIRE-Soft
**Curso:** DDSE3 — 2026-2 | **Grupo:** [G1 / G2]
**Repositorio GitHub:** https://github.com/Jeider-Gomez/Stire-Soft
**Semana reportada:** 31 de agosto – 4 de septiembre de 2026 | **Cierre:** viernes 4 de septiembre, 8:00 p.m.
**Estado del sprint:** Reestructuración de MODESEC por roles · decisión de Vue 3 + Nuxt · cierre progresivo del backend · definición del sandbox · nueva base frontend · Trello operativo.
**Tablero Kanban (Trello):** `[pegar aquí el enlace del tablero]`

*STIRE-Soft es un Sistema Tutor Inteligente para la Resolución de Ejercicios: el estudiante entrega código, el sistema lo ejecuta de forma aislada, lo califica y adapta los siguientes ejercicios a su nivel de dominio.*

---

## 👥 1. Estructura del Equipo y Roles

| Integrante | Rol Principal | Horario de Reunión Individual | GitHub User |
| :--- | :--- | :--- | :--- |
| Jeider Gómez | Líder Técnico y Backend | *[por completar]* | @Jeider-Gomez |
| Jorge Cervantes | Calidad y Tablero | *[por completar]* | @*[por completar]* |
| José López | Diseño UI/UX | *[por completar]* | @*[por completar]* |
| Julio Galvis | Diseño Instruccional y Navegación | *[por completar]* | @*[por completar]* |
| Pedro Romero | Documentación, Bitácora y Pitch | *[por completar]* | @pedrorm20 |

**Reunión de equipo:** viernes 8:00 – 8:40 p.m., videollamada, con los cinco integrantes.
**Reportes escritos:** martes y jueves, 8:00 p.m., en el grupo del equipo.
**Metodología:** [`docs/05_METODOLOGIA_Y_EQUIPO.md`](./docs/05_METODOLOGIA_Y_EQUIPO.md)

---

## 🎯 2. Objetivo del Sprint / Semana Actual

El objetivo de esta semana es **convertir el diseño MODESEC en una especificación completa y aprobada para los tres roles del sistema**, y utilizarla como fuente para iniciar de forma ordenada la nueva implementación frontend.

En paralelo, se busca cerrar los componentes fundamentales del backend que ya pueden considerarse funcionales, activar el Tutor IA real y dejar definida una estrategia viable para el sandbox de ejecución de código.

### 2.1 Resultados esperados

1. MODESEC reestructurado para cubrir **Estudiante, Docente y Administrador**.
2. Vistas, navegación y responsabilidades de cada rol definidas antes de implementar frontend.
3. Gráficos y fichas revisados, corregidos y aprobados como especificación de implementación.
4. Decisión formal: **Vue 3 + Nuxt** para el nuevo frontend.
5. Frontend experimental Next.js/React congelado como prueba histórica y sin nuevas funcionalidades.
6. Backend auditado para identificar qué módulos pueden declararse cerrados y qué endpoints faltan para las vistas aprobadas.
7. Tutor IA conectado a un proveedor LLM real, con configuración segura y pruebas.
8. Sandbox documentado con una decisión realista de infraestructura; Docker no se considera requisito del sandbox actual.
9. Tablero Trello actualizado con tareas, subtareas, responsables, dependencias y criterios de terminado.
10. Pitch de avances preparado al cierre de la semana exclusivamente con evidencia verificable.

---

## 🧩 3. Retos y Actividades del Sprint

### 🔵 RETO 1 — Reestructuración y cierre de MODESEC por roles

**Objetivo:** ampliar la especificación actual para que represente las experiencias completas de los tres tipos de usuario: **estudiante, docente y administrador**.

#### Subtareas

- [ ] Inventariar las funciones reales de cada rol en el backend y documentación.
- [ ] Definir el flujo principal del estudiante.
- [ ] Definir el flujo principal del docente.
- [ ] Definir el flujo principal del administrador.
- [ ] Determinar qué ventanas actuales pertenecen al estudiante.
- [ ] Determinar qué ventanas nuevas necesita el docente.
- [ ] Determinar qué ventanas nuevas necesita el administrador.
- [ ] Revisar la Ventana Estándar para verificar qué elementos son comunes y cuáles dependen del rol.
- [ ] Reestructurar el mapa de navegación para incluir los tres roles.
- [ ] Crear/actualizar las fichas MODESEC de las nuevas ventanas.
- [ ] Revisar la guía de metáforas frente a las nuevas vistas.
- [ ] Revisar el guion técnico multimedial.
- [ ] Actualizar los gráficos SVG y sus PNG.
- [ ] Hacer revisión cruzada de diseño, pedagogía y viabilidad técnica.
- [ ] Aprobar la versión que servirá como especificación oficial de frontend.

**Criterio de terminado:** ningún rol queda sin flujo principal ni vistas necesarias y cada vista aprobada tiene correspondencia con navegación, ficha MODESEC y gráfico cuando aplique.

**Dependencia:** esta actividad bloquea el desarrollo de nuevas vistas frontend.

---

### 🟢 RETO 2 — Cierre progresivo del Backend

**Objetivo:** dejar de considerar el backend como una colección de pruebas y llevarlo a un estado funcional alineado con MODESEC.

#### Subtareas

- [ ] Auditar módulos existentes y clasificarlos: completo / requiere ajuste / falta implementar.
- [ ] Verificar autenticación JWT y RBAC para estudiante, docente y administrador.
- [ ] Verificar endpoints necesarios para el flujo de estudiante.
- [ ] Identificar endpoints faltantes para docente.
- [ ] Identificar endpoints faltantes para administrador.
- [ ] Implementar únicamente los endpoints que correspondan a las vistas aprobadas.
- [ ] Verificar persistencia de progreso/mastery.
- [ ] Verificar programación SM-2.
- [ ] Verificar flujo de entrega y evaluación.
- [ ] Verificar actualización de progreso después de una evaluación.
- [ ] Ejecutar pruebas unitarias y E2E relevantes.
- [ ] Actualizar documentación de endpoints y contratos.

**Criterio de terminado:** cada función prioritaria del sprint tiene endpoint probado o queda explícitamente registrada como dependencia posterior.

---

### 🤖 RETO 3 — Tutor Inteligente funcional

**Objetivo:** pasar del placeholder/mock a una integración real del Tutor IA.

#### Subtareas

- [ ] Auditar el estado real de `TutorService` y su proveedor LLM.
- [ ] Configurar `OPENAI_API_KEY` mediante variables de entorno, nunca en código.
- [ ] Implementar la llamada real al proveedor LLM.
- [ ] Mantener el contexto de mastery del estudiante.
- [ ] Mantener el contexto conversacional limitado y controlado.
- [ ] Implementar las reglas socráticas definidas en MODESEC.
- [ ] Impedir que el tutor entregue directamente la solución de programación.
- [ ] Manejar errores, timeouts y ausencia de API key.
- [ ] Aplicar límites de uso para evitar consumo accidental excesivo.
- [ ] Crear pruebas del servicio y del endpoint.
- [ ] Realizar una prueba real con un usuario de demostración.
- [ ] Documentar el flujo y las variables necesarias.

**Criterio de terminado:** `POST /tutor/chat` produce una respuesta real del modelo, contextualizada con el estudiante, y el flujo queda probado sin exponer credenciales.

---

### 🛡️ RETO 4 — Sandbox y decisión de Docker

**Objetivo:** establecer una arquitectura de ejecución de código segura, reproducible y viable para desarrollo y futura producción.

El backend actual documenta como activo el `HardenedProcessSandboxAdapter`, basado en aislamiento por proceso del sistema operativo, y declara Docker como no implementado. Por tanto, **no se debe volver a introducir Docker como si fuera el sandbox actual**. citeturn20file0turn26file0

#### Decisión preliminar

**Docker se conservará como herramienta opcional de infraestructura/desarrollo, no como requisito del sandbox actual.**

La prioridad es:

`HardenedProcessSandboxAdapter` → pruebas de seguridad → límites de recursos → ejecución real → documentación.

Docker solo volverá al sandbox si se implementa y prueba un adaptador Docker real detrás de `SandboxAdapter`.

#### Subtareas

- [ ] Corregir las menciones documentales que presentan Docker como tecnología activa.
- [ ] Mantener `hardened` como modo funcional por defecto.
- [ ] Verificar que el sandbox siga ejecutando código real con límites de tiempo, memoria, red y procesos.
- [ ] Evaluar Docker como segunda capa/aislamiento futuro, no como requisito inmediato.
- [ ] Documentar requisitos de CPU, RAM y almacenamiento del sandbox.
- [ ] Definir si el entorno de producción necesitará un worker independiente.
- [ ] Documentar qué partes pueden ejecutarse en Vercel y cuáles no deben depender de Vercel Functions.

**Criterio de terminado:** existe una decisión de infraestructura documentada y un flujo de ejecución que puede reproducirse sin depender de Docker.

---

### 🟣 RETO 5 — Nuevo Frontend con Vue 3 + Nuxt

**Decisión:** el frontend experimental actual basado en Next.js/React se congela y no recibe nuevas funcionalidades. Se conserva únicamente como referencia histórica hasta realizar la migración o extracción de cualquier componente que realmente tenga valor.

La guía de Semana 03 orienta el desarrollo frontend hacia **Nuxt (Vue 3)**, por lo que esta será la base de la nueva implementación. fileciteturn18file0turn18file2

#### Subtareas

- [ ] Crear la nueva aplicación Nuxt 3 + Vue 3.
- [ ] Configurar TypeScript.
- [ ] Definir estructura de carpetas.
- [ ] Definir layout general.
- [ ] Definir sistema de navegación por rol.
- [ ] Definir manejo de autenticación JWT.
- [ ] Definir cliente HTTP/API.
- [ ] Definir componentes UI reutilizables.
- [ ] Definir variables de entorno.
- [ ] Configurar linting/formateo.
- [ ] Crear únicamente la estructura base, sin implementar todas las vistas.
- [ ] Esperar la aprobación MODESEC para construir las vistas definitivas.

**Criterio de terminado:** el proyecto Nuxt inicia, compila y tiene una arquitectura base preparada para implementar las vistas aprobadas.

---

### 🟡 RETO 6 — Trello y control del sprint

**Responsable:** Jorge.

#### Subtareas

- [ ] Crear/confirmar tablero.
- [ ] Listas: BACKLOG / ESTA SEMANA / EN CURSO / EN REVISIÓN / BLOQUEADO / HECHO.
- [ ] Etiquetas por área.
- [ ] Crear tarjetas desde este documento.
- [ ] Dividir cada tarjeta en checklist.
- [ ] Asignar responsable.
- [ ] Registrar dependencias.
- [ ] Aplicar Definition of Done.
- [ ] Registrar bloqueos.
- [ ] Publicar enlace en la bitácora.
- [ ] Mantener máximo una tarea activa por integrante cuando sea posible.

---

### 🟠 RETO 7 — Respaldo científico

La guía de Semana 03 solicita 15 artículos indexados distribuidos en tres ejes: 5 pedagógico/cognitivo, 5 arquitectura/software/frontend y 5 GUI/UX/usabilidad. fileciteturn18file1

#### Subtareas

- [ ] Crear `docs/investigacion/`.
- [ ] Diseñar matriz bibliográfica.
- [ ] Registrar 5 artículos pedagógicos/cognitivos.
- [ ] Registrar 5 artículos de arquitectura/software/frontend.
- [ ] Registrar 5 artículos de GUI/UX/usabilidad.
- [ ] Verificar DOI/indexación.
- [ ] Registrar objetivo, metodología, resultados y aporte a STIRE.
- [ ] Relacionar los artículos con decisiones de diseño.

**Criterio de terminado:** 15 artículos verificables y trazables a decisiones concretas del proyecto.

---

### 🎤 RETO 8 — Pitch de avances

**Actividad de cierre:** viernes 4 de septiembre.

No se desarrolla al comienzo del sprint.

#### Subtareas

- [ ] Recopilar avances reales.
- [ ] Seleccionar únicamente resultados demostrables.
- [ ] Capturar evidencia.
- [ ] Preparar guion.
- [ ] Preparar material visual.
- [ ] Ensayar.
- [ ] Cronometrar.
- [ ] Ajustar.
- [ ] Presentar.

El pitch no debe afirmar que una funcionalidad existe si solamente está documentada.

---

## 🔗 4. Dependencias del Sprint

```text
REESTRUCTURAR MODESEC POR ROLES
        │
        ├──────────────► APROBAR VISTAS Y NAVEGACIÓN
        │                         │
        │                         ▼
        │                 ARQUITECTURA FRONTEND
        │                         │
        │                         ▼
        │                 NUEVA BASE NUXT
        │                         │
        │                         ▼
        │                  PRIMERA VISTA
        │                         │
        │                         ▼
        │                    INTEGRACIÓN
        │
        ├──────────────► ENDPOINTS BACKEND NECESARIOS
        │
        └──────────────► REVISIÓN DE TUTOR / SANDBOX

TRELLO ───────────────► seguimiento de todos los bloques
INVESTIGACIÓN ────────► respaldo de decisiones
PITCH ────────────────► cierre y evidencia del sprint
```

---

## 📊 5. Priorización

### 🔥 P0 — Obligatorio

1. Reestructuración MODESEC para estudiante/docente/administrador.
2. Aprobación de vistas y navegación.
3. Decisión/documentación Vue 3 + Nuxt.
4. Cierre de inconsistencias críticas de documentación Docker.
5. Auditoría y cierre funcional prioritario del backend.
6. Tutor IA real.
7. Trello operativo.

### 🟡 P1 — Importante

8. Nueva base Nuxt compilando.
9. Primer flujo frontend basado en MODESEC aprobado.
10. Matriz de 15 artículos.
11. Definición de estrategia de despliegue.

### 🟢 P2 — Posterior

12. Editor avanzado de código.
13. Integración completa del sandbox como infraestructura independiente si llega a ser necesaria.
14. Vistas secundarias no indispensables para el primer flujo.
15. Optimización avanzada.

---

## 🗓️ 6. Plan de Trabajo — 31 de agosto al 4 de septiembre

### Lunes 31

**Objetivo:** establecer la nueva base de diseño y limpiar inconsistencias.

- Reestructuración de MODESEC por roles.
- Inventario de vistas existentes y nuevas.
- Corrección de documentación Docker.
- Auditoría inicial del backend y Tutor IA.
- Creación/actualización de Trello.

### Martes 1

**Objetivo:** definir las vistas de los tres roles.

- Flujos estudiante/docente/administrador.
- Mapa de navegación actualizado.
- Inventario de ventanas.
- Primeros wireframes/gráficos.
- Reporte de bloqueo si alguna decisión impide continuar.

### Miércoles 2

**Objetivo:** consolidar MODESEC y cerrar contratos técnicos.

- Fichas por ventana.
- Revisión gráfica.
- Dependencias API por vista.
- Auditoría profunda Tutor IA.
- Decisión final sobre estructura Nuxt.

### Jueves 3

**Objetivo:** aprobar MODESEC e iniciar implementación técnica mínima.

- Revisión cruzada.
- Aprobación de vistas.
- Crear nueva base Nuxt.
- Configurar API/auth.
- Avanzar integración real del Tutor IA.
- Pruebas backend.

### Viernes 4

**Objetivo:** demostrar un incremento real y cerrar el sprint.

- QA.
- Consolidación documental.
- Verificación Trello.
- Recopilar evidencias.
- Preparar y ensayar pitch.
- Reunión de cierre 8:00 p.m.

---

## 👤 7. Distribución del Equipo

| Integrante | Responsabilidad principal | Subtareas prioritarias |
|---|---|---|
| **Jeider** | Liderazgo técnico / Backend | Backend, Tutor IA, sandbox, arquitectura Nuxt, API y decisiones técnicas |
| **Jorge** | QA / Trello | Tablero, criterios de aceptación, revisión cruzada, QA de MODESEC y frontend |
| **José** | UI/UX | Vistas de los tres roles, gráficos, fichas visuales, sistema visual |
| **Julio** | Diseño instruccional | Flujos de usuario, navegación, coherencia pedagógica, contenidos por rol |
| **Pedro** | Documentación / Pitch | Bitácora, evidencias, investigación, pitch y consolidación documental |

> La asignación puede ajustarse en la reunión si el equipo demuestra una carga desigual, pero ningún integrante debe iniciar una tarea cuya dependencia todavía esté bloqueada.

---

## 🧪 8. Definition of Done del Sprint

Una tarea solo pasa a **HECHO** cuando:

- [ ] Está implementada o documentada según corresponda.
- [ ] Tiene evidencia.
- [ ] Está en GitHub.
- [ ] Fue revisada por la persona responsable de QA cuando corresponda.
- [ ] No contradice MODESEC.
- [ ] Tiene sus dependencias resueltas.
- [ ] Está registrada en Trello.

---

## 🎤 9. Pitch de Cierre

El pitch debe demostrar la evolución del proyecto, no prometer funcionalidades futuras.

Estructura propuesta:

1. **Problema:** aprendizaje de programación con retroalimentación tardía/genérica.
2. **Diseño:** MODESEC reestructurado para los tres roles.
3. **Tecnología:** backend NestJS fortalecido + nueva arquitectura Vue 3/Nuxt.
4. **Inteligencia:** Tutor IA funcional y adaptación mediante mastery/SM-2.
5. **Seguridad:** sandbox aislado y decisión de infraestructura.
6. **Cierre:** primera pieza implementada o incremento técnico realmente verificable.

---

## 📋 10. Acta de Cierre del Sprint

> Se diligencia el viernes 4 de septiembre, 8:00 p.m.

**Asistencia:** Jeider __ · Jorge __ · José __ · Julio __ · Pedro __

**MODESEC:** ______________________________________________

**Backend:** ______________________________________________

**Tutor IA:** ______________________________________________

**Sandbox/Docker:** ________________________________________

**Frontend Nuxt:** __________________________________________

**Trello:** _________________________________________________

**Investigación:** __________________________________________

**Pitch:** __________________________________________________

**Acuerdo de retrospectiva:** ________________________________

---

## 📌 11. Compromisos para la Semana Siguiente

Esta sección se completa al cierre del viernes 4, tomando únicamente tareas que hayan quedado realmente pendientes y que estén respaldadas por la retrospectiva.

---

## 🗂️ 12. Bitácoras Anteriores

| N.º | Semana | Documento |
|---|---|---|
| 1 | 17 – 21 de agosto de 2026 | [`MONITOREO_SEMANAL_01.md`](./seguimiento/MONITOREO_SEMANAL_01.md) |
| 2 | 24 – 28 de agosto de 2026 | [`MONITOREO_SEMANAL_02.md`](./seguimiento/MONITOREO_SEMANAL_02.md) |

Los documentos anteriores se conservan como historial. La semana en curso siempre vive en `MONITOREO_SEMANAL.md` en la raíz.

---

*Bitácora N.º 3 · Semana del 31 de agosto al 4 de septiembre de 2026.*
*La mantiene Pedro Romero · Actualización durante la reunión de cierre.*
