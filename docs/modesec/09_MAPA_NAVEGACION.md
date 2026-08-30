# 🗺️ Insumo 09 — Mapa Completo de Navegación y Sitemap Nuxt

**Proyecto:** STIRE-Soft Frontend (Vue 3 + Nuxt)  
**Estructura de Vistas:** 15 Ventanas Oficiales MODESEC  
**Fecha:** 30 de agosto de 2026  

---

## 1. Árbol de Rutas del Frontend

```
/ (Landing & Login) ───► COMP-V00 (Ingreso al Taller)
│
├── /auth/
│   ├── login ──────────► COMP-V00
│   └── register ───────► COMP-V00
│
├── /estudiante/ (Layout: StudentAppLayout)
│   ├── dashboard ──────► EST-V01 (Mi Banco de Trabajo)
│   ├── unidad/:id ─────► EST-V02 (Teoría de Unidad de Aprendizaje)
│   ├── evaluacion/:id ─► EST-V03 (Resolución de Ejercicio en Sandbox)
│   ├── tutor ──────────► EST-V04 (Maestro de Taller - Tutor IA)
│   ├── repasos ────────► EST-V05 (Mantenimiento SM-2 de Algoritmos)
│   └── progreso ───────► EST-V06 (Mi Bitácora y Analítica Personal)
│
├── /docente/ (Layout: TeacherAppLayout)
│   ├── dashboard ──────► DOC-V01 (Panel de Mis Clases y Cohortes)
│   ├── contenidos ─────► DOC-V02 (Gestor Curricular de Módulos y Unidades)
│   ├── ejercicios/crear► DOC-V03 (Diseñador de Ejercicios y Casos de Prueba)
│   ├── clase/:id/analitica ► DOC-V04 (Analítica de Cohorte y Alertas de Riesgo)
│   └── estudiante/:id ─► DOC-V05 (Seguimiento Individual de Estudiante)
│
└── /admin/ (Layout: AdminAppLayout)
    ├── dashboard ──────► ADM-V01 (Panel de Control Global)
    ├── usuarios ───────► ADM-V02 (Gestión de Usuarios y Roles)
    └── sistema ────────► ADM-V03 (Parámetros Técnicos y Logs de Auditoría)
```

---

## 2. Matriz de Rutas, Permisos y Middleware Nuxt

| Ruta Nuxt | Ventana | Middleware de Guardia | Redirección si falla |
|---|---|---|---|
| `/auth/login` | `COMP-V00` | `guest.ts` (si ya tiene JWT, redirige a su rol) | `/estudiante/dashboard` o `/docente/dashboard` |
| `/estudiante/*` | `EST-V01` a `EST-V06` | `auth.ts` + `role-student.ts` | `/auth/login` con toast "Acceso no autorizado" |
| `/docente/*` | `DOC-V01` a `DOC-V05` | `auth.ts` + `role-teacher.ts` | `/auth/login` |
| `/admin/*` | `ADM-V01` a `ADM-V03` | `auth.ts` + `role-admin.ts` | `/auth/login` |
