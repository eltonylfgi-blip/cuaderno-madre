# PENDIENTE_TONY — decisiones que la rutina NO toma sola

Aquí la rutina **cuaderno-feedback** aparca lo que NO aplica por su cuenta:
feedback ambiguo, cambios estructurales/globales, preguntas con respuesta, e informes de deriva.
Tony lee esto y decide. (Lo grande SIEMPRE espera; lo pequeño y claro la rutina ya lo hace sola.)

---

## 2026-06-21 — Pegar imágenes desde el portapapeles (respuesta + 1 cosa que decides tú)
**Feedback (Drive, pedir-funcion, GENERAL):** "quiero q deje pegar imágenes desde el portapapeles, no lo de adjuntar seleccionando, quiero pegarlas directamente; pero me pregunto ¿cómo las procesa? si no pueden ir al buzón o qué?"

**Estado:** la función de **pegar con Ctrl/Cmd+V YA está** en la versión publicada hoy (hay una zona "📋 Haz clic aquí y pega" y un handler de `paste` que detecta la imagen). → marcado **ya-resuelto**.

**Respuesta a tu pregunta (cómo se procesan):**
- En **escritorio (Cowork)**: la imagen pegada/adjuntada **sí** sube a la carpeta del buzón en Google Drive como `IMG_<fecha>.png`, y el texto del feedback la referencia (`IMAGEN ADJUNTA: IMG_...`). La rutina la lee para entender el contexto.
- En **móvil / web (GitHub Pages)**: ahora mismo **la imagen NO se sube** — solo se copia el TEXTO al portapapeles para que lo pegues. O sea: **una imagen pegada desde el móvil NO llega al buzón todavía.** Eso es justo lo que intuías.

**Lo que decides tú (esto NO lo hago solo — necesita lógica/decisión):** ¿cómo subimos la imagen desde el móvil? Opciones típicas: (a) un pequeño backend/endpoint propio que reciba la imagen; (b) subirla a un servicio (Drive/Imgur/etc.) con una clave que no se puede dejar en una web pública; (c) dejar el móvil solo-texto y las imágenes solo en escritorio. Dime cuál y lo montamos.

---

## 2026-06-28 — Revisión del "corrector de errores" de MADRE (recordatorio, NO urgente)

**De qué va:** preguntaste si MADRE tiene un buen sistema que corrija fallos solo, para poder "hacer y hacer" sin nunca arriesgar nada catastrófico. Se revisó a fondo.

**Conclusión (puedes dejar de preocuparte):** la parte anti-catástrofe es **sólida** y ya ha funcionado de verdad en el pasado. NO hay que hacer nada por ese lado.

**Lo único pendiente (un afinado, no un fuego):** MADRE tenía un "segundo par de ojos" (un vigilante que comprueba que de verdad hace lo que dice) y **estaba dormido hacía una semana**. Ya quedó dejado para que el propio sistema lo despierte solo en su revisión diaria → **no necesita acción tuya**.

**Esto SÍ lo decides tú (opcional, sin prisa):** (1) convertir ese vigilante en tarea fija programada; (2) guardar copia del núcleo de MADRE fuera de OneDrive con git (taparía de raíz el riesgo real, que es que un archivo se corte al guardarse). Ninguna es urgente.

**El detalle técnico completo está en privado**, en el buzón de MADRE: `BUZON_ENTRANTE/DESDE_CLAUDE_2026-06-28_corrector-se-autocalifica-y-detector-dormido.txt` (no se pone aquí para no airear las tripas del sistema).

**DECIDIDO (28-jun):** para ver la salud de MADRE de un vistazo se montará un **semáforo (verde/ámbar/rojo) dentro de tu propio *pacer*** (privado, no en la web pública). Pendiente de montar en una sesión nueva (la receta exacta quedó guardada). Frase para arrancar: *"monta el semáforo de salud de MADRE dentro del pacer"*.

---

## 2026-06-28 — Feedback del cuaderno (3 notas) procesado + 1 widget que pediste

**HECHO YA (esta sesión, subido y verificado en navegador):**
- ✅ Widget **"📍 ¿Dónde vive este cuaderno y cuándo te lee?"** — tarjeta nueva con un dibujo simple (lo pediste tú). Verificado en móvil (375px), 0 errores.
- ✅ **Arreglado:** ya puedes usar el lápiz ✏️ y el corazón 💗 sobre las **tiras de sonido (ASMR)** — faltaba `.cmTex` en el selector. (Feedback id `c3c1f7f8`.)

**RESPUESTAS a tus preguntas:**
- **"¿Dónde está el guiño pa la tata y cómo lo abro?"** → Es la **nota secreta** escondida en el **post-it de arriba del todo** (el "📝 ¿feedback?"). Para abrirla: toca la **chincheta 📌 pequeñita** que tiene encima. Está discreta a propósito (easter-egg) — por eso no la encontrabas. *(PARKING: hacerla más fácil de ver, como pediste.)*
- **"¿Dónde meto vídeos para que salgan en la web del cuaderno?"** → Hoy **NO se pueden poner vídeos en la web del cuaderno** (función por construir). No confundir: los vídeos para que **MADRE los APRENDA** van al *pipeline de vídeo* (bandeja "PEGAR TODO" / `VIDEO_NUEVOS`), que es OTRA cosa distinta de esta web. *(PARKING: incrustar un vídeo elegido en el cuaderno.)*
- **"Falta una sección donde el cuaderno me hable/responda"** → **Ya existe a medias**: si dejas un **COMENTARIO PÚBLICO** (no "feedback"), **MADRE te contesta** (verás respuestas firmadas "MADRE 🤱🏻"). *(PARKING: una sección de chat dedicada, más grande.)*

**PARKING (lo grande — tú decides/priorizas; necesita más que un retoque):**
1. **Corazones GLOBALES alrededor de las zonas más queridas** (id `ffac4e41`): hoy el 💗 es solo tuyo (local). Para "los que más tienen" hace falta una tabla nueva en la nube (`zone_signals` + RPC). Ya estaba en el backlog como prioridad alta.
2. **Modo caótico más bestia** (id `3815c20d`): que cosas vibren, más caos, rodear/señalar, flechas en pantalla. Mejora lúdica.
3. **ASMR que pegue con lo que parece** (id `c3c1f7f8`): dices que los sonidos suenan raros y no reflejan la textura. Afinar el motor de sonido.
4. **Vídeo en el cuaderno** + **sección de chat dedicada con el cuaderno** (ver respuestas arriba).

---
