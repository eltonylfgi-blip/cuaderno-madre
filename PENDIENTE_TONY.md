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
