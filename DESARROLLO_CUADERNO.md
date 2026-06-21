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
- **Scripts `type=module` son DIFERIDOS**: corren DESPUÉS de los `<script>` clásicos inline. Si un widget clásico (p.ej. el **HUB de FAB**) depende de algo creado en el módulo (el FAB de comentarios `#cmtFab`), inicialízalo en `DOMContentLoaded` (cuando los módulos ya corrieron), no en línea. Si no, "desaparece" ese FAB. *(Bug real cazado por la review adversarial.)*
- **HUB de FAB seguro**: el hub oculta los FAB sueltos con `body.fabhub`; **añade esa clase SOLO al final**, tras construir el menú con éxito (dentro del try). Así, si el hub peta, los FAB sueltos siguen visibles (no se pierde acceso). El menú **proxya** `real.click()` (no recrea listeners) y refleja `.on` leyendo el FAB real.
- **`getBoundingClientRect()` y `translate3d`**: con elementos movidos por `transform:translate3d` en capa compuesta, el rect puede leerse 0,0 en algún motor (p.ej. el preview headless). Para verificar posición, leer `style.transform`, no el rect (pasó con el gato `#gxg-cat-root`).
- **Gato en móvil**: no hay `mousemove` (solo se registra en no-touch). El `touchstart` debe ser **passive y SIN `preventDefault`** (si no, atrapa el scroll = "se atasca"). Y `edgePos` debe **evitar las esquinas inferiores** (donde viven los FAB) para no quedarse encima.
- **Chips de cabecera**: calcular del estado real (`refreshHeaderChips`: cuenta `.dec` no respondidas + `desvios.length` + sev `r`→salud "atención"). OJO: `desvios` se declara DESPUÉS del primer `refreshDecScore()` → guardar con `typeof desvios!=='undefined'` y re-llamar tras `renderDesvios()`.
- **Identidad anónima** (`window.__identity`, clave `cm_identity_v1`): alias persistente que pre-rellena nombre de dibujos/comentarios (vía `focusin` para formularios creados dinámicamente) + badge "· tú" (guarda ids de dibujos subidos; el insert usa `.select('id').single()`). Dueño verificable-para-todos = backend (diferido).
- **ASMR sin ficheros**: Web Audio sintetizado (oscilador + ruido filtrado) para pop/click/creak. `AudioContext` perezoso (autoplay necesita gesto), `suspend` en `visibilitychange`, hover solo si `(hover:hover)` y no `reduced-motion`. Control en el HUB (`window.__asmr`).
- **Validación de imagen (cliente)**: `shrinkImg` (canvas → JPEG ≤1600px, q .82) + rechazo de no-imagen/>8MB en `uploadImg`. NO es seguridad (bypasseable) → el control real es backend (parking lot).
- **`requestAnimationFrame` se PAUSA si la pestaña no está visible**: si usas rAF para "encender" una clase de entrada (fade-in), en una pestaña oculta o en el preview headless NO se aplica → la pieza parece no aparecer. Para clases de estado que deben aplicarse sí o sí, usa `setTimeout(...,20-30)`, no rAF (pasó con el globito `#tourNudge` del latido de la ruta guiada). rAF está bien solo para animación puramente visual que da igual si se pausa con la pestaña.
- **Insertar elementos "entre paneles" sin romper anclajes**: las texturas ASMR se insertan como `<aside class="cmTex">` ENTRE las `.card` (que son `<div>`). Se usa `<aside>` a propósito: el anclaje de los corazones 💗 (`cssPath`) usa `:nth-of-type` POR TAG, así que meter `<aside>` no cambia el `nth-of-type` de los `<div>`/`<p>`/`<li>` → los corazones guardados siguen cayendo en su sitio entre sesiones. Si hubiera usado `<div>` para las texturas, habría descolocado los corazones.
- **ASMR ON por defecto, pero respetando al usuario**: `cm_asmr_v1` ahora arranca `enabled=true` salvo que haya `"0"` guardado (alguien que lo apagó). El audio del navegador NO suena hasta el primer gesto → `unlock()` (pointerdown/keydown/touchstart, `{once}`) hace `ensure()+resume()`; las cosas que se clican (burbujas) ya sirven de gesto. Sonido = motor sintetizado: `brush(speed)` (fricción por velocidad del puntero), `pop`/`crack`/`crunch`.
- **Verificar en navegador con Supabase Realtime → el screenshot por "networkidle" NUNCA termina** (el websocket queda abierto): no es un cuelgue de la web. Verifica por `preview_eval` (estado del DOM, flujos) + `preview_console_logs` (0 errores), no por captura. Para una captura puntual habría que cortar el realtime antes.

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

**Hecho (tanda 1, 2026-06-21):** contador de visitas 👁️ + panel "El cuaderno por dentro" (lo más
querido + actividad + "lo que opina MADRE" = mapa-de-exploración y máquina-de-pensamientos en versión
lite) · modo caótico narrativo (flechas/notas/avisos absurdos + recorte móvil) · arreglado gato tapado ·
deshacer (↩️/Ctrl+Z) en dibujos. Favoritos de Uiverse guardados en `MADRE_UI_REFERENCIAS.md`.

**Hecho (tanda 2, 2026-06-21):** **HUB de FAB** (los 6 botones flotantes en un menú ✦ + nudge "toca aquí") ·
**ASMR** (sonidos sintetizados en hover/click, toggle en el hub) · botones **"🤔 no entiendo"** por tarjeta y
en la ruta guiada (con aburre/me gusta/desarrollar) · gato **cambia de pose** + arreglo móvil (no atasca) ·
**modo caótico x2** (flechas que apuntan a elementos reales, círculos, citas de comentarios reales, megaFlip,
travesuras contextuales) · chat abre **en lo último + foco** · comentarios in-page con **scroll interno** ·
post-it **más claro** (chincheta/borde) · dato **"MADRE = carpeta con identidad"** · **dibujos con dueño**
(identidad anónima + badge "tú") · **modos exclusivos** (no se solapan barras) · **bugs**: chips reales
(5 decisiones), aviso de estado **desfasado >48h**, `.limit()` en queries, validación/resize de imagen,
tema **por día**, metas **Open Graph**, `aria-live` en toasts. Nuevo doc **`DISEÑO_HEURISTICAS.md`** (cómo
diseñar: "de la abuela al borracho", checklist, patrones, reutilizar para webs personalizadas).

**PARKING LOT (persistido, no hecho aún — detalle en `DISEÑO_HEURISTICAS.md` §7):** subir VÍDEOS;
seguridad real (rate-limit/RLS por IP/honeypot/contraseña fuera de texto plano); split de `index.html`
(.css/.js + TSV→JSON + objeto CONFIG de widgets); `og:image` 1200×630; localStorage namespaced+versionado;
validación de imagen también en feedback; modal custom para sustituir `confirm`/`prompt`; gestor único de
timers + `window.__toast()` global. **Pregunta abierta de Tony:** usar los **laterales/fondo** en escritorio
(en móvil no se ven; en desktop hay márgenes vacíos → notas/ilustraciones laterales posibles).

## Estado actual (resumen)
Backend Supabase (proyecto kopegamcjozrvmxruwdn): tablas `comments`, `feedback`, `drawings` (RLS; moderación `hidden`; bloqueo cliente de pedofilia). Widgets vivos: gato, dibujos, tour, nota-secreta, lápiz, corazón, modo-caótico, paneles interactivos. La rutina `cuaderno-feedback` (Claude Code, cada hora) procesa feedback (Drive+PC+Supabase), responde/modera comentarios, refresca números, mantiene vivo Supabase y guarda gustos en `GUSTOS_TONY.md`.
