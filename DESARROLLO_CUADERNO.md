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
- **Gato pegado al borde superior**: el gato vive en los bordes; si su `y` mínima es ~14px se **tapa con la barra del navegador/notch**. Solución: `TOPSAFE` (≈64px, leído de `env(safe-area-inset-top)`) como `y` mínima en spawn y clamp.
- **Deshacer en `<canvas>`**: pila de `getImageData/putImageData` en **píxeles de dispositivo** (`canvas.width/height`, que ya incluyen DPR); `putImageData` ignora el `scale(DPR)` del ctx, así que va en 0,0. Snapshot al EMPEZAR cada trazo (`pointerdown`) + en borrar. Atajo Ctrl/Cmd+Z global **ignorando** si el foco está en `INPUT/TEXTAREA/contentEditable`.
- **Contador real de visitas**: localStorage NO sirve (solo cuenta tu navegador). Hecho con Supabase: tabla `public.counters(key,n)` + RPC `bump_counter(k)` **SECURITY DEFINER** (incrementa atómico, sortea RLS), `grant execute … to anon`. Bump 1×/sesión con `sessionStorage` (un refresco no infla). Empieza en 0 a propósito (ética MADRE: "mide el mundo").
- **RLS y métricas públicas**: `feedback` es PRIVADA (anon no la lee) → un `count` sobre ella siempre da 0 en la web. Para stats públicos usar `comments`/`drawings` (sí legibles), p.ej. "respuestas de MADRE" = `comments` con `ai_replied=true`.
- **Caos en móvil**: detectar `(max-width:640px)` y `prefers-reduced-motion` → factor `K` que recorta ~70% partículas y alarga intervalos. Limpiar SIEMPRE con una clase común (`.chaos-el`) al apagar.

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

> Norte (de Tony/ChatGPT): que la web **actúe como MADRE** (deja notas, cambia cosas, esconde,
> recuerda, genera) en vez de solo explicarla → sensación de **"estoy explorando algo vivo y cambiante"**.
> Componentes visuales candidatos viven en **`MADRE_UI_REFERENCIAS.md`**.

**Prioridad alta (criterio de Tony):**
1. **Comentarios anclados VISIBLES para todos** (estilo Notion/Figma): hoy el lápiz captura la zona y la manda a MADRE; falta que el marcador/comentario quede pegado y visible para cualquier visitante (anclaje robusto + render al cargar). *El de más impacto.*
2. **Fotos/avatares** en comentarios: avatar aleatorio de un set, o que cada quien suba la suya. (Ya hay imagen adjunta.)

**Ideas "organismo vivo" (de la lista de ChatGPT que Tony aprobó) — por hacer:**
3. **El gato coleccionista**: 1 gato escondido que cada día aparece en un sitio distinto; al encontrarlo "has encontrado al gato nº17" y queda registrado (Supabase counter / localStorage). (Hoy el gato huye; falta la mecánica de "encontrar nº").
4. **La pared de garabatos**: los dibujos colgados como papeles reales (con likes/fecha/autor anónimo, algunos torcidos). Hoy hay galería simple; falta el "muro" físico.
5. **Mensajes encontrados**: trocitos de papel por la página ("hoy pensé algo raro", "nota encontrada el 14 jun") que dan sensación de sistema vivo. (El modo caótico ya hace algo así temporal; falta versión permanente/escondida.)
6. **El botón inútil** ("no pulses"): cada pulsación hace algo distinto (gato, nota que cae, sonido, frase absurda).
7. **El museo de ideas muertas**: sección con hipótesis abandonadas reales (da credibilidad y muestra evolución). Encaja MUCHO con MADRE; hoy hay "hipótesis muertas" mini → ampliar a sección-museo.
8. **El cementerio de bugs**: lista divertida ("☠️ Bug #14 — intenté pensar demasiado. Estado: eliminado").
9. **Huellas de visitantes**: "alguien estuvo aquí hace 3 min / dejó un dibujo hace 1 h" (parece habitado). Con la tabla `comments`/`drawings` + `created_at` es factible.
10. **El nivel secreto / recompensa al llegar al fondo**: "has llegado más lejos que el 90%" + desbloquea algo. (Liga con el **mapa de exploración**: visitas/llegaron-al-final/feedback/dibujaron — la parte "visitas" ya está en el panel 👁️.)
11. **Antorcha = "Modo explorador"**: encender la antorcha (ver `MADRE_UI_REFERENCIAS.md`) revela las notas/secretos ocultos.

**Otros:**
12. **Coleccionables / polaroids de descubrimientos de MADRE / pegatinas** que dejan visitantes.
13. **Gato: barriguita completa** ("me he cansado de huir, acaríciame" → enseña barriga, ronronea) y que se siente sobre paneles.
14. La **rutina buscadora de ideas** de UI (sección 🔭 de arriba).

**Hecho en esta tanda (2026-06-21):** contador de visitas 👁️ + panel "El cuaderno por dentro" (lo más
querido + actividad + "lo que opina MADRE" = mapa-de-exploración y máquina-de-pensamientos en versión
lite) · modo caótico narrativo (flechas/notas/avisos absurdos + recorte móvil) · arreglado gato tapado ·
deshacer (↩️/Ctrl+Z) en dibujos. Favoritos de Uiverse guardados en `MADRE_UI_REFERENCIAS.md`.

## Estado actual (resumen)
Backend Supabase (proyecto kopegamcjozrvmxruwdn): tablas `comments`, `feedback`, `drawings` (RLS; moderación `hidden`; bloqueo cliente de pedofilia). Widgets vivos: gato, dibujos, tour, nota-secreta, lápiz, corazón, modo-caótico, paneles interactivos. La rutina `cuaderno-feedback` (Claude Code, cada hora) procesa feedback (Drive+PC+Supabase), responde/modera comentarios, refresca números, mantiene vivo Supabase y guarda gustos en `GUSTOS_TONY.md`.
