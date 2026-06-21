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
