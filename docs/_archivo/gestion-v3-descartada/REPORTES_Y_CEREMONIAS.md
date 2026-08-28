> **DOCUMENTO HISTORICO — no vigente.** Conservado como evidencia del proceso de ingenieria.
> Estado actual: `docs/ESTADO_STIRE_HANDOFF.md`. Archivado el 2026-08-26.

# 🗓️ REPORTES Y CEREMONIAS — Formatos oficiales del equipo
**Curso DDSE3 2026-2 · Proyecto STIRE-Soft** · Mantiene: Jorge Cervantes (QA)

Tres momentos por semana. Dos son mensajes de WhatsApp. Uno es una videollamada de 40 minutos.
Nada más. Este archivo tiene el formato exacto de los tres, para copiar y pegar.

| Momento | Formato | Duración | Asistencia |
|---|---|---|---|
| **Martes 8:00 pm** | Reporte de Avance (escrito) | 2 min | Individual |
| **Jueves 8:00 pm** | Reporte de Riesgo (escrito) | 2 min | Individual |
| **Viernes 8:00 pm** | Cierre y Arranque (videollamada) | 40 min | **Los 5, obligatorio** |

---

## 📌 Regla de asistencia del viernes

> La reunión es **a las 8:00 pm** y se hace **con los cinco presentes**.
> ¿Inconveniente? Se avisa en el grupo **antes del jueves a las 8:00 pm** y se acuerda otra hora.
> **No se hace la reunión sin alguno del equipo.**

**Por qué es tan estricto:** en el Arranque se reparte el trabajo de siete días. Quien no está no se
puede comprometer con lo que le tocó, y el lunes se pierde preguntando qué tenía que hacer. Y el
aviso es el jueves, no el viernes: mover una reunión con 24 horas de margen es logística; moverla el
mismo día es cancelarla.

---

## 📊 Reporte de Avance — MARTES 8:00 pm

**Mira hacia atrás.** Cuenta lo que pasó desde el viernes.

```
📊 REPORTE MARTES · Sprint [N] · [Nombre]

1. Cerré: [tarjeta y qué quedó listo, o "nada todavía"]
2. Estoy en: [tarjeta en curso y % aproximado]
3. Me bloquea: [algo concreto, o "nada"]
4. Mis tarjetas: [R#-##] 🟢 · [R#-##] 🟡
```

**Ejemplo real:**

```
📊 REPORTE MARTES · Sprint 2 · José

1. Cerré: R2-03, la Ventana Estándar ya está con las 5 secciones explicadas.
2. Estoy en: R2-04 (fichas de las 7 categorías), voy en 2 de 3 ventanas, ~60 %.
3. Me bloquea: nada.
4. Mis tarjetas: R2-04 🟢
```

**Reglas de escritura:** cuatro líneas, no cuatro párrafos. "Avanzando" no es un reporte —
di **qué** tarjeta y **qué tanto**. Si no hiciste nada, escríbelo: eso es información útil el martes
y es un problema el viernes.

---

## ⚠️ Reporte de Riesgo — JUEVES 8:00 pm

**Mira hacia adelante.** Predice el viernes. Este es el reporte que salva el sprint.

```
⚠️ REPORTE JUEVES · Sprint [N] · [Nombre]

1. ¿Llego al viernes con mi compromiso? → SÍ / EN RIESGO / NO
2. Si no llego, falta exactamente: [qué queda pendiente]
3. Necesito del equipo en las próximas 24 h: [qué y de quién, o "nada"]
```

**Ejemplo real:**

```
⚠️ REPORTE JUEVES · Sprint 2 · Julio

1. EN RIESGO
2. Me falta el Mapa de Navegación (R2-06). El diagrama está, faltan las
   condiciones de transición de 4 ventanas.
3. Que José me confirme los nombres finales de las ventanas para no
   inventármelos. Con eso lo cierro mañana antes de las 6.
```

### Qué hace el equipo con cada respuesta

| Respuesta | Acción, **ese mismo jueves** |
|---|---|
| **SÍ** | Nada. Se cierra el viernes en la demo |
| **EN RIESGO** | Alguien del equipo se ofrece explícitamente en el grupo. Si nadie se ofrece en 1 hora, el Líder asigna |
| **NO** | El Líder **parte la tarjeta**: la mitad que sí llega se cierra el viernes, el resto vuelve a `Por Hacer` de la semana siguiente y **se registra en la bitácora como cuello de botella** |

> Un "EN RIESGO" el jueves todavía se puede salvar entre cinco personas. El mismo problema descubierto
> el viernes a las 8:00 pm ya es un incumplimiento con el docente. **Reportar riesgo temprano no es
> reconocer una falla: es el comportamiento que el sistema premia.**

---

## 🎯 Cierre y Arranque — VIERNES 8:00 pm (40 min)

### Agenda fija

| Fase | Min | Qué pasa | Quién dirige |
|---|---|---|---|
| **1 · Cierre** | 20 | Cada uno **demuestra** lo cerrado: comparte pantalla o pega el enlace al archivo en `main`. Se mueven las tarjetas a `Hecho`. Se registra lo que no salió y por qué | Jorge (tablero) |
| **2 · Retro relámpago** | 5 | Una pregunta, por turno: *¿qué cambio concreto haría más fácil la semana que viene?* | Jeider |
| **3 · Arranque** | 15 | Se jalan tarjetas del `Backlog` a `Por Hacer`. Máx. **3 por persona**. Cada uno dice en voz alta cuáles se lleva | Jeider |
| **4 · Bitácora** | — | Pedro actualiza `MONITOREO_SEMANAL.md` en vivo y hace el commit `docs: actualiza bitacora semana X` | Pedro |

> **"Demostrar" significa mostrarlo.** "Ya lo hice, después lo subo" no cierra una tarjeta. Lo que no
> está en `main` el viernes a las 8:00 pm no cerró esta semana — y está bien, se documenta y sigue.

### Acta del viernes (se pega en la bitácora)

```
🎯 ACTA · Sprint [N] · viernes [fecha], 8:00 pm
Asistencia: Jeider ✅ · Jorge ✅ · José ✅ · Julio ✅ · Pedro ✅

CERRADAS: [IDs y una línea cada una]
NO CERRADAS: [ID — motivo — a qué sprint pasa]
ACUERDO DE LA RETRO: [una frase, o "ninguno"]
COMPROMISO DEL SPRINT [N+1]:
  Jeider: [IDs]   Jorge: [IDs]   José: [IDs]   Julio: [IDs]   Pedro: [IDs]
```

---

## 📎 Actas anteriores

### 🎯 ACTA · Sprint 1 · viernes 21 de agosto, 8:00 pm
```
Asistencia: los 5

CERRADAS:
  S1-01  Definición del marco de trabajo del equipo (investigación de
         metodologías y elección de Sprint Semanal + Kanban por Módulos)
  S1-02  Bitácora MONITOREO_SEMANAL.md creada y publicada en la raíz del repo
  S1-03  Guión del pitch en inglés de 60 s (4 bloques) + tabla fonética
  S1-04  Prompt ROCAS del pitch documentado con sus iteraciones
  S1-05  Adelanto MODESEC Fase II: borrador del Diagrama de Contenidos y
         primera maqueta de la Ventana Estándar

NO CERRADAS:
  S1-06  Fichas de las 7 categorías — pasa al Sprint 2 (faltó definir primero
         el listado final de ventanas)

ACUERDO DE LA RETRO: fijar la reunión a las 8:00 pm con asistencia de los cinco
y avisar antes del jueves si alguien no puede; añadir reportes escritos los
martes y jueves para no descubrir los bloqueos el viernes.

COMPROMISO DEL SPRINT 2: cerrar MODESEC Fase II completo.
```
