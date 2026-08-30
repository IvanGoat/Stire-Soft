# 🚀 Bitácora de Monitoreo y Control N.º 2 — Proyecto: STIRE-Soft
**Curso:** DDSE3 — 2026-2 | **Grupo:** [G1 / G2]
**Repositorio GitHub:** https://github.com/Jeider-Gomez/Stire-Soft
**Semana reportada:** 24 – 28 de agosto de 2026 | **Cierre:** viernes 28 de agosto, 8:00 p.m.
**Estado al cierre:** MODESEC Fase II trabajada en seis piezas, con necesidad de una nueva reestructuración por roles antes de implementación; backend fortalecido; frontend experimental en Next/React descartado como base de implementación; Trello y documentación en transición.

> **Bitácora archivada.** Esta semana ya terminó. El documento de trabajo de la semana siguiente vive en `MONITOREO_SEMANAL.md` en la raíz.

---

## 👥 1. Estructura del Equipo y Roles

| Integrante | Rol Principal | GitHub User |
| :--- | :--- | :--- |
| Jeider Gómez | Líder Técnico | @Jeider-Gomez |
| Jorge Cervantes | Calidad y Tablero | @*[por completar]* |
| José López | Diseño UI/UX — Ventana Estándar | @*[por completar]* |
| Julio Galvis | Diseño Instruccional — Contenidos y Navegación | @*[por completar]* |
| Pedro Romero | Documentación, Bitácora y Pitch | @pedrorm20 |

**Reunión de equipo:** viernes 8:00 – 8:40 p.m.
**Reportes escritos:** martes y jueves, 8:00 p.m.

---

## 🎯 2. Avances del Sprint / Semana Cerrada

### 2.1 Entregables y avances registrados

#### 🔧 Jeider Gómez · Líder Técnico

- [x] Ola 2 de remediación del backend registrada y pruebas fortalecidas.
- [x] Verificación de endpoints citados por las fichas MODESEC; las rutas faltantes quedaron como contrato de Fase III y no se deformó el diseño para acomodarlo al código existente.
- [x] Consolidación documental de MODESEC Fase II.
- [x] Reorganización documental del repositorio y archivo de planes consumidos.
- [x] Auditoría de veracidad documental: se detectaron referencias obsoletas a Docker y un log de ejemplo que no representa el sistema real.
- [x] Confirmación de que existe un `frontend/` experimental basado en Next.js 16.2.3 y React 19.2.4.

#### ✅ Jorge Cervantes · Calidad y Tablero

- [x] Revisión de criterios de aceptación derivados de la guía.
- [x] Trabajo sobre el tablero Kanban y revisión de piezas MODESEC.

#### 🎨 José López · Diseño UI/UX

- [x] Ventana Estándar y seis fichas de ventana V-01 a V-06 desarrolladas como propuesta inicial de interfaz.

#### 📐 Julio Galvis · Diseño Instruccional

- [x] Diagrama de contenidos.
- [x] Guía de metáforas.
- [x] Mapa de navegación inicial.

#### 📝 Pedro Romero · Documentación, Bitácora y Pitch

- [x] Bitácora semanal mantenida.
- [x] Pitch del Reto 1 y evidencia ROCAS registrados.

---

## ⚠️ 3. Hallazgos que cambian el siguiente sprint

1. **Las seis ventanas actuales de MODESEC no cubren explícitamente los tres tipos de usuario del sistema:** estudiante, docente y administrador. Por tanto, no deben congelarse como especificación definitiva de implementación.
2. La nueva versión de MODESEC debe incorporar la arquitectura de vistas por rol y revisar, cuando corresponda, contenidos, ventana estándar, fichas, metáforas y mapa de navegación.
3. El frontend `frontend/` fue una prueba inicial. No representa todavía la arquitectura MODESEC que se va a implementar y no debe convertirse en la base de desarrollo por inercia.
4. El proyecto continuará el frontend con **Vue 3 + Nuxt**, una vez definido y aprobado el rediseño MODESEC.
5. El sandbox real actual **no utiliza Docker**: el repositorio documenta `HardenedProcessSandboxAdapter` con aislamiento por proceso del sistema operativo. Docker no debe volver a presentarse como tecnología activa del sandbox mientras no exista un adaptador Docker real.
6. El Tutor IA todavía requiere pasar de la inferencia simulada/placeholder a una integración real con el proveedor LLM y una configuración segura de credenciales.

---

## 📌 4. Compromisos de continuidad

| Compromiso | Quién | Estado al cierre |
|---|---|---|
| Reestructurar MODESEC para cubrir estudiante, docente y administrador | Equipo de diseño | Pasa al sprint siguiente |
| Definir y aprobar vistas por rol antes de programar frontend | Equipo | Pasa al sprint siguiente |
| Decidir y documentar Vue 3 + Nuxt como stack frontend | Jeider + equipo | Decisión tomada para el siguiente sprint |
| Congelar/eliminar progresivamente el frontend experimental cuando exista nueva base Nuxt | Jeider | Pasa al sprint siguiente |
| Corregir documentación obsoleta sobre Docker | Jeider | Pasa al sprint siguiente |
| Cerrar Tutor IA con integración real | Jeider | Pasa al sprint siguiente |
| Definir estrategia de sandbox para desarrollo y producción | Jeider | Pasa al sprint siguiente |
| Mantener Trello como tablero operativo | Jorge | Continuo |
| Preparar pitch de avances al final del siguiente sprint | Pedro + equipo | Pasa al cierre |

---

## 🎯 5. Acta del Cierre

**Resultado de la semana:** el equipo completó una primera versión de la documentación MODESEC y fortaleció de manera importante el backend, pero la revisión del alcance funcional evidenció que las seis ventanas diseñadas representan principalmente la experiencia del estudiante y no constituyen todavía una especificación completa de los tres roles del sistema.

**Decisión de continuidad:** no comenzar una implementación extensa del frontend experimental. Primero se reestructura MODESEC por roles, se aprueban las vistas y después se inicia una nueva base frontend en Vue 3 + Nuxt de manera incremental.

**Principio de trabajo adoptado:**

> MODESEC aprobado → arquitectura → componente → ventana → API → prueba → siguiente ventana.

Esto evita construir un frontend fragmentado o un "Frankenstein" de funcionalidades sin una especificación común.

---

*Bitácora N.º 2 · archivada como semana cerrada el 28 de agosto de 2026.*
