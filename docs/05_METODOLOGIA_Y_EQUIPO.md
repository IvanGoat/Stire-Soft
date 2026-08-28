# STIRE — Cómo trabaja el equipo
**Curso DDSE3 2026-2 · Universidad de Córdoba · Equipo de 5**
**Versión 4.0 · 25 de agosto de 2026 · Mantiene: Jeider Gómez**

> Este es el **único** documento de gestión del proyecto, junto con la bitácora
> `MONITOREO_SEMANAL.md` de la raíz. Todo lo demás vive en el tablero de Trello.
> **Cambio v3.0 → v4.0:** se eliminaron las reglas estrictas de Git y el tablero pasó a Trello.

---

## 1. En una frase

**Sprint de una semana, de viernes a viernes.** El viernes a las 8:00 pm nos reunimos los cinco: se
cierra lo de la semana y se arranca la siguiente en la misma llamada. Entre semana no hay reuniones,
solo dos mensajes escritos: martes y jueves.

---

## 2. Las tres reglas del equipo

### Regla 1 — Lo que no está subido, no está hecho
Si el trabajo está en el computador de alguien, en el chat o en un Drive personal, **no cuenta**.
Tiene que estar en el repositorio de GitHub.

**Sin complicaciones de Git.** No hay ramas obligatorias, ni revisiones cruzadas, ni convenciones de
mensajes, ni cuentas separadas. Basta con que el archivo esté en el repo antes del viernes a las
8:00 pm. **Si alguien no maneja Git, le pasa el archivo a Jeider o a Pedro y ellos lo suben** — eso
es perfectamente válido y no le resta nada a nadie.

Lo único que sí conservamos, porque lo exige la guía del docente, es el mensaje del commit de la
bitácora: `docs: actualiza bitacora semana X`.

### Regla 2 — Máximo 2 tarjetas «En curso» a la vez
Si quieres empezar una tercera, primero cierras una.

> *Por qué:* el problema no es que nadie trabaje, es empezar cinco cosas y terminar ninguna. Cinco
> tareas al 60 % son cero entregables.

### Regla 3 — Una tarjeta está «Hecha» solo si se puede mostrar
1. El archivo existe **y está subido al repositorio**.
2. Está completo, no a medias.
3. Si es un entregable para el docente, Jorge lo revisó contra la rúbrica.

> *Por qué:* sin esto, «ya casi» y «está hecho» significan lo mismo, y el viernes aparecen cinco
> «ya casi».

---

## 3. La semana

```
 VIE 8:00 pm        SÁB · DOM · LUN        MAR 8:00 pm       MIÉ       JUE 8:00 pm       VIE 8:00 pm
 ┌──────────┐                              ┌──────────┐                ┌──────────┐      ┌──────────┐
 │ CIERRE + │ ──── cada quien avanza ────► │ REPORTE  │ ──── ... ────► │ REPORTE  │ ───► │ CIERRE + │
 │ ARRANQUE │                              │ DE AVANCE│                │ DE RIESGO│      │ ARRANQUE │
 └──────────┘                              └──────────┘                └──────────┘      └──────────┘
   40 min, los 5                            escrito, 4 líneas           escrito, 3 líneas
```

### Viernes 8:00 pm — Cierre y Arranque (40 min, videollamada)

| Fase | Min | Qué pasa |
|---|---|---|
| **Cierre** | 20 | Cada uno **muestra** lo que hizo (comparte pantalla o pega el enlace del archivo). Se mueven las tarjetas a *Hecho* en Trello. Se anota lo que no salió y por qué |
| **Retro corta** | 5 | Una pregunta por turno: *¿qué haría más fácil la semana que viene?* |
| **Arranque** | 15 | Se jalan las tarjetas de la semana nueva. Máx. **3 por persona**, y cada uno dice cuáles se lleva |
| **Bitácora** | — | Pedro actualiza `MONITOREO_SEMANAL.md` ahí mismo y la sube |

Al terminar el viernes, los cinco saben qué les toca el sábado. Ese es todo el objetivo: que el fin
de semana y el lunes no se pierdan esperando que alguien asigne trabajo.

### Regla de asistencia

> **La reunión es a las 8:00 pm y se hace con los cinco.** Si alguien tiene un inconveniente,
> **avisa en el grupo y se cambia la hora** — es más importante que estemos todos que la hora exacta.
> Entre más temprano avise, mejor: mover una reunión con un día de margen es fácil, moverla a las
> 7:50 pm es cancelarla.

### Martes y jueves — dos mensajes, cero reuniones

Se escriben en el grupo de WhatsApp. Dos minutos.

**📊 MARTES — Reporte de Avance** *(cuenta lo que pasó desde el viernes)*
```
📊 MARTES · [Nombre]
1. Terminé: [qué quedó listo, o "nada todavía"]
2. Estoy en: [tarjeta y más o menos qué tanto]
3. Me traba: [algo concreto, o "nada"]
```

**⚠️ JUEVES — Reporte de Riesgo** *(predice el viernes)*
```
⚠️ JUEVES · [Nombre]
1. ¿Llego al viernes? → SÍ / EN RIESGO / NO
2. Si no llego, me falta: [qué exactamente]
3. Necesito ayuda con: [qué y de quién, o "nada"]
```

| Respuesta del jueves | Qué hace el equipo, ese mismo día |
|---|---|
| **SÍ** | Nada |
| **EN RIESGO** | Alguien se ofrece a ayudar en el grupo |
| **NO** | Se parte la tarjeta: lo que sí llega se cierra el viernes y el resto pasa a la semana siguiente, anotado en la bitácora |

> **Por qué son dos reportes distintos:** el martes se mira atrás, el jueves se mira adelante. Un
> «EN RIESGO» el jueves todavía se salva entre cinco personas. El mismo problema descubierto el
> viernes a las 8:00 pm ya es un incumplimiento. **Avisar temprano no es quedar mal: es lo que el
> equipo espera de cada uno.**

---

## 4. El tablero — Trello

**Enlace del tablero:** `[pegar aquí el link de Trello]` · **Lo mantiene:** Jorge Cervantes

Trello es gratis, tiene app de celular y funciona arrastrando tarjetas. No hay que saber Git para usarlo.

### Las cuatro listas

| Lista | Qué es | Regla |
|---|---|---|
| 📥 **Backlog** | Todo lo que falta del reto | Aquí se deja lo que aún no se ha comprometido |
| 📋 **Esta semana** | A lo que me comprometí el viernes | Máx. **3 por persona**. Entre semana no se agregan tarjetas |
| ⚙️ **En curso** | Lo que estoy tocando hoy | Máx. **2 por persona** |
| ✅ **Hecho** | Lo que ya se puede mostrar | Cumple las 3 condiciones de la Regla 3 |

### Cómo se arma una tarjeta

```
Título:      §3.3.1 Fichas de ventana — las 7 categorías
Miembro:     José
Fecha:       jueves 27 de agosto
Etiqueta:    MODESEC  ·  🟢 verde = va bien / 🟡 amarilla = en riesgo / 🔴 roja = trabada
Descripción: Terminada cuando las 6 fichas están subidas a docs/modesec/ventanas/
             y Jorge las revisó.
```

**Lo único que no se negocia:** cada tarjeta tiene **un nombre** y **una fecha**. Una tarjeta sin
nombre no la hace nadie, y una sin fecha se hace el día antes de entregar.

### Cómo queda documentado para el docente
Trello es la herramienta de trabajo; la **bitácora es la evidencia**. Cada viernes, en el Cierre,
Pedro copia a `MONITOREO_SEMANAL.md` lo que quedó en *Hecho* y adjunta una captura del tablero. Así
el docente ve el resultado en el repositorio sin tener que entrar a otra aplicación.

---

## 5. Quién hace qué

| Integrante | Rol | De qué se encarga |
|---|---|---|
| **Jeider Gómez** | Líder Técnico | Backend de STIRE, pruebas, arquitectura, subir al repo lo que le pasen los compañeros |
| **Jorge Cervantes** | Calidad y Tablero | Mantener Trello al día y **revisar cada entregable contra la rúbrica antes de publicarlo** |
| **José López** | Diseño UI/UX — Ventana Estándar | MODESEC §3.3 Ventana Estándar y las fichas de las 7 categorías |
| **Julio Galvis** | Diseño Instruccional — Contenidos y Navegación | MODESEC §3.1 Contenidos · §3.3.2 Metáforas · §3.3.3 Mapa de Navegación |
| **Pedro Romero** | Documentación, Bitácora y Pitch | Bitácora semanal, evidencia de prompts ROCAS y guión del pitch en inglés |

**El pitch en inglés lo escribe Pedro siempre, pero la voz rota:** Reto 1 Pedro · Reto 2 José ·
Reto 3 Julio · Reto 4 Jorge · Reto 5 Jeider. Si el docente pide que sustenten los cinco, el guión se
parte en sus cuatro bloques y se reparte.

---

## 6. Los tres entregables del Reto 1

Sustentación: **martes 8 de septiembre**. Congelamos el **viernes 4 de septiembre a las 8:00 pm** —
después de esa hora solo se corrige redacción y formato, no se agrega contenido nuevo.

| # | Entregable | Quién lo hace | Está bien cuando… |
|---|---|---|---|
| **1** | **Bitácora de Monitoreo** — `MONITOREO_SEMANAL.md` en la raíz del repo; las semanas cerradas se archivan numeradas en `docs/seguimiento/` | Pedro | Tiene el equipo con roles y horarios, los entregables cumplidos, al menos un prompt ROCAS **con sus iteraciones** y los cuellos de botella diligenciados |
| **2** | **MODESEC Fase II** — Diagrama de Contenidos, Ventana Estándar, Guía de Metáforas y Mapa de Navegación | José y Julio | §3.1 tiene 3 módulos con resultados de aprendizaje observables · §3.3 explica la ventana **sección por sección** con su función pedagógica · las fichas cubren **las 7 categorías sin dejar ninguna en blanco** (si no aplica, se justifica) · el mapa no tiene ventanas sin salida |
| **3** | **Pitch en inglés de 60 s** — sustentación + prompt ROCAS + guión | Pedro | 130–140 palabras en 4 bloques (Hook · Problem · Solution · Tech Stack + CTA), ensayado con cronómetro, con tabla fonética, y **el prompt ROCAS con sus iteraciones documentado — eso solo vale el 20 % de la nota** |

**Documentos del Entregable 2:**
- [`modesec/FASE_II_DISENO_MULTIMEDIAL.md`](./modesec/FASE_II_DISENO_MULTIMEDIAL.md) — **borrador maestro consolidado**, con la verificación de endpoints en §5.1.
- **Estado: 4 de las 6 piezas cerradas.** §3.1, §3.3, §3.3.1 y §3.3.2 están listas y trasladadas a sus archivos por autor. §3.3.3 Mapa de Navegación está iniciada (nodos definidos, falta la tabla de transiciones). §3.2 Guión Técnico Multimedial no ha empezado.
- [`modesec/PLANTILLAS_MODESEC_FASE2.md`](./modesec/PLANTILLAS_MODESEC_FASE2.md) — plantillas de cada sección, con quién la escribe.

> **Cómo se usa el borrador maestro:** no sustituye los archivos individuales, los alimenta. Cada quien
> traslada su sección a su archivo (`modesec/contenidos/` para Julio, `modesec/ventanas/` para José) y
> la mantiene ahí de aquí en adelante.

---

## 7. Dos reglas sobre la bitácora

**La bitácora dice lo que de verdad se hizo.** Si algo no se alcanzó, se escribe en *Cuellos de
Botella* con el motivo — un bloqueo explicado demuestra que el equipo se está gestionando y suma;
uno escondido es un riesgo que no compensa, porque el docente revisa el repositorio y el trabajo
o está ahí o no está.

**`MONITOREO_SEMANAL.md` la escribe Pedro, y solo Pedro.** Él la edita, y a veces lo hace directamente
desde la web de GitHub. Nadie más la reescribe entera — ni una persona ni una herramienta. Lo que se
añada se añade **después de un `git pull`**, y solo la sección que corresponda.

> *Por qué esta regla:* es el archivo que califica el docente y el único que dos manos tocan a la vez.
> Si alguien lo reescribe sin bajarse antes lo que Pedro subió, se pierde trabajo real y el
> entregable llega incompleto.

---

*Solo hay dos documentos de gestión: este y `MONITOREO_SEMANAL.md`. Si algo cabe en el tablero de
Trello o en la bitácora, no se crea un archivo nuevo.*
