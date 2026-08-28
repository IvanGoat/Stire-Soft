# Pitch Reto 01 — English Script (60s)

**Autor:** Pedro Romero
**Estado:** Vigente

---

## Hook (0–10s)

What if a system could detect when a student is falling behind before it's too late?

## Problem (10–25s)

In a university Algorithms class with several students, professors can't always identify in time who needs help. Without regular practice, students quickly forget what they've learned, while everyone receives the same content at the same pace.

## Solution & Value Prop (25–45s)

That's why we created STIRE, an intelligent tutoring system with spaced repetition. STIRE measures each student's mastery from zero to 100%, schedules reviews using SM-2, and provides a Socratic AI tutor who guides students with questions instead of giving them the answer. Learning becomes more personalized and adaptive.

## Tech Stack & CTA (45–60s)

STIRE is built with NestJS, TypeORM, and MySQL on the backend, and Next.js and React on the frontend. Student code runs in our own secure sandbox with operating-system-level process isolation — no Docker required, so it runs on any machine. STIRE doesn't just teach: it detects, reinforces, and supports learning. We want to bring this solution to more university classrooms.

---

> **Corrección aplicada (Reorganización Documental, 2026-08-26):** el bloque de tecnología
> decía originalmente *"We also use a secure Docker-based assessment engine to run the
> code."* — afirmación falsa desde la Ola 3: `DockerSandboxAdapter` se eliminó por ser un
> mock (hallazgo P0-05), y el aislamiento real desde entonces es `HardenedProcessSandboxAdapter`,
> por proceso del sistema operativo, sin Docker (ver `docs/ADR_DECISIONES_ARQUITECTURA.md`,
> ADR 06). Se sustituyó por la frase verificada contra el código actual.
>
> **Verificado, sin cambios:** "Next.js and React on the frontend" — `frontend/package.json`
> confirma `next` 16.2.3 y `react` 19.2.4. El proyecto frontend existe y usa esas tecnologías.

## Tabla fonética

Ver `docs/pitch/GUIA_PRONUNCIACION.md` — guía completa extraída del guión anterior antes de
archivarlo.
