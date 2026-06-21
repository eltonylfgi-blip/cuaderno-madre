# DESARROLLO_CUADERNO — léeme ANTES de editar el cuaderno

Objetivo del cuaderno: que alguien **totalmente ajeno entienda MADRE en <60s** y que se sienta como una
**criatura viva y explorable**, no documentación. Tony quiere: mucha interacción, cosas locas/graciosas/
llamativas, MUY explicativas, easter-eggs y recompensa por explorar — **sin romper el orden ni la comprensión**.

## ✅ Checklist antes de tocar `index.html`
1. `git pull` y edita SOLO el `index.html` del repo (fuente única).
2. Tras editar, VALIDA: `node --check` de cada `<script>` ejecutable + del módulo; estructura (`<script>`==`</script>`, cierra `</body></html>`).
3. VERIFICA EN NAVEGADOR (preview local con `python -m http.server`): que la pieza funciona y **0 errores de consola**. Para Supabase, prueba contra la BD real y BORRA filas de prueba.
4. Añade una entrada al array `cambios` (Evolución) y línea al `CHANGELOG.md`.
5. Actualiza este doc con cualquier lección nueva.

## ⚠️ Lecciones / gotchas (errores ya cometidos — no repetir)
- **`mask-image` + `mask-composite` (esquinas rotas)**: frágil entre navegadores; dejó la nota "rara". NO usar para recortes; usar `border-radius` irregular.
- **`backdrop-filter:blur` en un overlay a pantalla completa** deja BORROSA también la zona que quieres destacar. Para spotlight usa el truco `box-shadow:0 0 0 9999px rgba(0,0,0,.6)` SOBRE el elemento destacado (su interior queda nítido) y backdrop transparente.
- **Selectores de "señala una zona" (lápiz/corazón)**: incluir TAMBIÉN cabecera y bordes (`h1, .sub, .postit, #gateBar, footer, .heronote, .dec, .alert, .step, .chip, #senalesCard, #comentarios`), no solo `.card/.hero`.
- **Barras fijas (banners de modo)**: ponles `pointer-events:none` o tapan/bloquean el contenido que el usuario quiere tocar.
- **TSV horneado**: preservar TABULADORES (usar Python, no edición a mano).
- **Python en consola Windows (cp1252)**: `print()` con emojis PETA → usa `PYTHONIOENCODING=utf-8` o evita emojis en prints.
- **Texto de usuario SIEMPRE con `textContent`** (anti-XSS), nunca `innerHTML` con datos.
- **`window.prompt` no se puede "interceptar"** para reacciones (p.ej. contraseña que se ríe) → usar modal propio.
- Widgets nuevos: IIFE autocontenido con `try/catch`, prefijo de clases propio, position:fixed/append-only, móvil OK, usar globales `window.__sb` (Supabase, puede tardar→poll), `window.__fb`, `window.__openFb`.

## 🎨 Fuentes de inspiración (para sacar ideas de UI viva)
Galerías de COMPONENTES ya hechos (lo más útil, copiar HTML/CSS):
- **UIVerse** (uiverse.io) — miles de botones/cards/toggles/hover; buscar: cute, playful, paper, note, pixel, cartoon.
- **Animista** (animista.net) — genera CSS de entradas/rebotes/flotación (ideal post-its, gato, notas).
- **Hover.css** (ianlunn.github.io/Hover) — efectos hover (rebotes, inclinaciones, pulsos, vuelos).
- **LottieFiles** — animaciones: cat, paper plane, pencil, sticker, note, mail.
- **React Bits / Magic UI / Aceternity** — microinteracciones (inspiración aunque usemos HTML puro).
Mecánicas e ideas:
- **Codrops** (tympanus.net/codrops) — efectos/transiciones experimentales.
- **CodePen** — buscar: floating cat, sticky note, paper airplane button, pixel character, hand drawn ui.
- **Neal.fun** — cómo explicar cosas complejas con interacción y curiosidad (muy alineado con MADRE).
- **GSAP showcase**, **Awwwards (experimental/interactive)**, **Godly**, **Land-book**, **itch.io / OpenGameArt** (sprites pixel gratis).
Términos de búsqueda: "playful web design", "delightful ui", "microinteractions inspiration", "whimsical website",
"interactive easter egg website", "sticky note ui", "paper note animation", "notion/figma comments ui",
"pixel art website character", "gamified feedback".

## 🔭 Plan: rutina "buscadora de ideas" (FUTURO — aún no montada)
Una tarea programada que: (1) navegue/observe estas fuentes (WebFetch/búsqueda), (2) extraiga 1-3 mecánicas
reutilizables (snippet CSS/JS), (3) las proponga en `PENDIENTE_TONY.md` (o un `IDEAS_UI.md`) etiquetadas
con impacto/encaje, sin tocar la web sola (Tony elige). Encaja con la naturaleza N4 de MADRE (mejorar la
capacidad de mejorar). Persistido aquí para construirla más adelante.

## 🗂️ Backlog (ideas pedidas, AÚN no hechas — persistidas)
Orden por impacto (criterio de Tony):
1. **Comentarios anclados VISIBLES para todos** (estilo Notion/Figma): hoy el lápiz captura la zona y la manda a MADRE; falta que el marcador/comentario quede pegado y visible para cualquier visitante (anclaje robusto + render al cargar).
2. **Fotos/avatares**: que quien comente tenga una foto (avatar) — o aleatoria de un set subido, o que cada quien suba la suya. (Comentarios ya soportan imagen adjunta.)
3. **Coleccionables ocultos / polaroids de descubrimientos de MADRE / pegatinas que dejan visitantes.**
4. **Gato: barriguita completa** ("me he cansado de huir, acaríciame" → enseña barriga, ronronea al acariciar) y que se siente/interactúe encima de paneles.
5. **Secretos que solo aparecen tras explorar** (easter eggs progresivos).
6. La **rutina buscadora de ideas** de arriba.

## Estado actual (resumen)
Backend Supabase (proyecto kopegamcjozrvmxruwdn): tablas `comments`, `feedback`, `drawings` (RLS; moderación `hidden`; bloqueo cliente de pedofilia). Widgets vivos: gato, dibujos, tour, nota-secreta, lápiz, corazón, modo-caótico, paneles interactivos. La rutina `cuaderno-feedback` (Claude Code, cada hora) procesa feedback (Drive+PC+Supabase), responde/modera comentarios, refresca números, mantiene vivo Supabase y guarda gustos en `GUSTOS_TONY.md`.
