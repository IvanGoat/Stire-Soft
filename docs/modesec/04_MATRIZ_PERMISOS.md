# 🔐 Insumo 04 — Matriz de Permisos y Control de Acceso (RBAC + BOLA)

**Proyecto:** STIRE-Soft Backend  
**Modelo de Seguridad:** Rol-Based Access Control (`RolesGuard`) + Object-Level Authorization (`AuthorizationService`)  
**Fecha:** 30 de agosto de 2026  

---

## 1. Matriz CRUD de Permisos por Recurso

| Recurso | Operación | Estudiante | Docente | Administrador | Regla de Validación en Backend |
|---|---|:---:|:---:|:---:|---|
| **Users** | `CREATE` | ✅ (Vía `/auth/register`) | ❌ | ✅ | Estudiante solo puede crear su propia cuenta con rol `estudiante`. |
| | `READ` | ✅ (Solo su perfil) | ✅ (Estudiantes de su clase) | ✅ (Todos) | BOLA: `AuthorizationService.assertTeacherSharesClassWithStudent`. |
| | `UPDATE` | ✅ (Su perfil básico) | ❌ | ✅ (Cualquier usuario) | Un usuario no puede cambiar su propio `role` (ignorado en DTO). |
| | `DELETE` | ❌ | ❌ | ✅ (Soft-delete) | Solo Admin puede desactivar usuarios. |
| **Classes** | `CREATE` | ❌ | ✅ | ✅ | Requiere `@Roles('docente', 'admin')`. |
| | `READ` | ✅ (Catálogo público) | ✅ (Sus clases) | ✅ (Todas) | El estudiante ve clases para matricularse; el docente administra las suyas. |
| | `UPDATE` | ❌ | ✅ (Solo si es dueño) | ✅ | `cls.teacherId === user.id` exigido estrictamente. |
| | `DELETE` | ❌ | ✅ (Solo si es dueño) | ✅ | `AuthorizationService.assertTeacherOwnsClass`. |
| **Enrollments** | `CREATE` | ✅ (Auto-matrícula) | ❌ (Prohibido) | ❌ | Regla: Un docente NO puede matricularse como estudiante. |
| | `READ` | ✅ (Sus matrículas) | ✅ (Estudiantes de su aula) | ✅ (Todas) | Filtrado por `studentId` o `classId`. |
| | `UPDATE / DELETE` | ❌ | ✅ (Expulsar estudiante) | ✅ | Solo el docente titular de la clase. |
| **LearningUnits** | `CREATE / EDIT` | ❌ | ✅ | ✅ | Requiere `@Roles('docente', 'admin')`. |
| | `READ` | ✅ (Solo activas) | ✅ (Todas) | ✅ (Todas) | Estudiantes filtrados por `isActive: true`. |
| **Submissions** | `CREATE (Start)` | ✅ | ❌ | ❌ | Solo estudiantes pueden iniciar intentos y entregar soluciones. |
| | `READ` | ✅ (Solo sus entregas)| ✅ (Estudiantes de su clase) | ✅ (Todas) | BOLA: Estudiante bloqueado si intenta ver envíos ajenos. |
| **LearningProgress** | `READ` | ✅ (Solo su mastery) | ✅ (Estudiantes de su clase) | ✅ (Todos) | `assertTeacherSharesClassWithStudent` activo en controlador. |
| **Tutor IA** | `CHAT` | ✅ | ❌ | ❌ | Exclusivo para estudiantes; requiere contexto cognitivo activo. |

---

## 2. Garantías de Seguridad contra Vulnerabilidades Comunes

1. **Aislamiento Horizontal (BOLA):**
   * Un docente no puede espiar el progreso de estudiantes que no pertenezcan a ninguna de sus clases activas.
   * Un estudiante que intente consultar `/learning-progress/student/:otroId` recibe de inmediato `403 Forbidden`.
2. **Escalamiento de Privilegios:**
   * La entidad `User` no expone el campo `role` en los DTOs de actualización del usuario (`UpdateProfileDto`). Solo `AdminUpdateUserDto` accesible por administradores permite alterar roles.
3. **Integridad de Evaluaciones:**
   * El envío de evaluaciones (`/submissions/:id/submit`) se procesa en una transacción SQL atómica: si falla la inserción de respuestas o el cómputo del score, se revierte todo el estado.
