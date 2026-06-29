# CONTINUAR_AQUI — handoff del Cuaderno MADRE (léeme primero)

> Para retomar en un chat nuevo de Claude Code. **Estado a 2026-06-29, versión v0.13.**

## 🧵 HILOS ABIERTOS — EMPIEZA POR AQUÍ (2026-06-29, para el chat nuevo)
> **NORTE NUEVO (la mejora nº1 de Tony, 29-jun): convertir el cuaderno en una HISTORIA / ORGANISMO que RESPIRA, no una documentación.** Detalle COMPLETO en `DESARROLLO_CUADERNO.md` §«🌳🫁 STAGED v0.14+ — DE WEB-VIVA A ORGANISMO» (léela ENTERA; ahí está toda la crítica de Tony estructurada en A–G). Resumen del orden a atacar:
> 1. **🐞 BUG (primero): la PARTE DE ABAJO del mapa a pantalla completa (`#mapBig-ov`) está bugueada** — el panel info/leyenda/pie se aprieta/solapa o se corta (sospecha: en ventanas BAJAS la pila `mbInfo+mbLeg+mbFoot` desborda el overlay fijo y se recorta). Reproducir en preview a varias alturas (móvil corto) y arreglar que quepa/scrollee sin tapar el mapa.
> 2. **Re-secuenciar la 1ª pantalla:** los primeros 60 s solo «¿qué es?» + «¿por qué me importa?»; bajar el resto; **MOVER EL MAPA más abajo** (Tony: «es una recompensa, no una introducción»); gancho 1ª persona corto; −40% texto; auditar funciones (si quito X, ¿se pierde algo? si no, fuera).
> 3. **Hacerlo «respirar» (REAL y barato, honestidad §9):** diario vivo desde commits, «alguien comentó (Argentina) → MADRE lo leyó» desde `comments` de Supabase, «pensando ahora…», cambios espontáneos sin recargar, «mientras leías, MADRE cambió de opinión». 1-2 primero y medir.
> 4. **🌳 Mapa siguiente nivel:** sub-ramas de TODO (varios niveles) + botón «explicación» y «no entiendo» por (sub)rama (reusar `__fb`) + que las ramas se auto-ordenen según lo que emerge (vía `MAPA_RAMAS.tsv` horneable, buzón ya dejado). Decisión de Tony pendiente: ¿mapa como página/acceso directo aparte o seguir overlay?
> A Tony LE ENCANTA el mapa grande («que chuloo»); el resto de su crítica (historia/personaje, progreso con movimiento, momentos wow, realidad cruda, menos funciones) está en la sección A–G. **Persistido el 29-jun; el chat viejo se cerró por tokens (~400k).**

## ✅ ESTADO DE PUBLICACIÓN — LÉEME PRIMERO (2026-06-29, v0.13 — DESPLEGADO)
- **🟢 v0.10 + v0.11 + v0.12 + v0.13 = PUSHEADAS y EN VIVO.** Tony autorizó subir («hazlos sin mi ok»). v0.10 ya estaba en 2 commits locales (`091448c` + `9fa98fd`); v0.11+v0.12+v0.13 se juntaron en **un commit** (`5cea1dd`). `git push origin main` OK (`c8e99d8..5cea1dd`); `main` == `origin/main`. **Verificado EN LA WEB VIVA:** https://eltonylfgi-blip.github.io/cuaderno-madre/ sirve `__cmVersion="v0.13"`, con `#mapBig-ov` y `#evNow` presentes (HTTP 200). Antes de subir: 0 errores/0 warnings consola, `node --check` 26/26, revisado por workflow adversarial (12 hallazgos corregidos), móvil 375px OK.
- **🟢 La rutina `cuaderno-feedback` está REACTIVADA** (`enabled:true`, cada 6 h). El gate de push terminó. (Pausarla otra vez si hace falta: tool `update_scheduled_task` → `enabled:false`.)
- **`articulos/` NO se subió** (borradores «field notes»; publicarlos es decisión APARTE de Tony, regla del moat). Quedan en local y están en `.gitignore` para no publicarlos por accidente. Si Tony los quiere dentro: quitar `articulos/` del `.gitignore` y commitear.
- **PENDIENTE menor (criterio de Tony):** el revisor marcó algo de DENSIDAD en `#envivo` (varias piezas «vivas» arriba). Se mantuvieron porque Tony las pidió en el opening; si las ve recargadas → colapsar «🌙 Mientras no mirabas» en un `<details>`.
- **Accesos directos nuevos en el Escritorio** (Tony pidió no buscar la web): «Cuaderno MADRE - WEB en vivo» (lo publicado), «- GitHub (lo subido)», «- carpeta LOCAL (sin subir)».
- **PENDIENTE de Tony:**
  1. ¿**commit + push** de v0.10 + v0.11 + v0.12? (todo verificado, 0 errores/0 warnings). Luego reactivar la rutina. *(Recomendación de Claude: sí, en UN commit; ver §“¿Cuándo subimos?” abajo.)*
  2. **🔊 SONIDOS ASMR — AFINADO 3 veces por tu oído (29-jun). Bucle abierto: sigue afinando si quieres.**
     - **HECHO (v0.12, 3 pasadas):** síntesis por **MODELO FÍSICO por textura** (`grain`/`tone`/`modal`/`buzz` + `MODELS` en el `<script>` ASMR de `index.html`). 3ª pasada (tu 2º oído): **papel**=cracks irregulares + sueltos fuertes (arrugar), **hojas**=crunchy con cuerpo grave bajo los cracks, **arena**=«shhhh» suave (ataque lento `atk`, no granos), **pana**=ruido blanco mid (ya NO «suena a pedo»), **cremallera**=`buzz()` continuo/«smooth» (barrido + tremolo = dientes; rápido=más agudo). burbujas/madera/muelle = OK (👍, no tocados). `PROF2SAMPLE={}` (síntesis primaria). Verificado offline (pico/RMS sin clip/NaN) + en vivo (0 errores). **Recurrente: bandpass estrecho sale MUDO → subir peak/bajar Q (medir offline).**
     - **👉 ACCESO DIRECTO nuevo en el Escritorio: «Audicion ASMR (MADRE)»** → doble clic (arranca el server solo y abre la página). Lanzador en `sounds/abrir-audicion.cmd`. Manual: `python -m http.server 8137 --directory C:/Users/anton/repos/cuaderno-madre` → `http://localhost:8137/sounds/asmr-test.html`.
     - **👉 TU PASO (por oído):** en la página, prueba cada textura, marca **👍/😐/👎** y escribe a qué suena → botón **«📋 Copiar para Claude»** → **pégamelo en el chat de Code** (es el bucle más rápido: afino los números en `MODELS` del `<script>` ASMR de `index.html`). *(Claude no oye; por eso decides tú.)*
     - **Si alguna textura la quieres con sample real CC0** (último recurso): Pixabay Sound Effects / Freesound filtrado CC0 / Mixkit (clips <0.8s, licencia item a item). Splice `download_asset` gasta créditos + duda licencia → pídeme OK. Volver a sample: `PROF2SAMPLE={textura:'nombre'}`.
     - **«muestra CC0» quitada de la página** (te confundía: el sample de madera sonaba a burbuja) — la síntesis es el camino.
  2b. **🪟 CUADERNO «ventana viva» (crítica grande de Tony, 29-jun) — v0.13 AVANZADO MUCHO:** ya estaban las 3 piezas («⚖️ IA normal vs MADRE», «❓ Lo que aún no sé», 🌳 mapa v1 en `#mapaCard`). **HECHO en v0.13 (esta sesión):**
     - **🌳 MAPA — vista a PANTALLA COMPLETA inmersiva** (`#mapBig-ov`, botón «🔍 Explorar el mapa en grande» en la tarjeta): **(2) hecho** zoom/pan library-free (rueda+arrastre+pellizco táctil+botones ＋/－/⟳), fondo oscuro ambiente con estrellas; **(3) hecho** sub-ramas al tocar una rama (árbol 2 niveles, datos reales en `window.__MAPA.nodes[].kids`); **(4) hecho** la rama AHORA (`__MAPA.ahora`) se resalta sola; deep-link `#mapa` compartible (back/Esc/✕ cierran, sin sacar de la página). **(1) PARCIAL:** los estados/foco ya NO se duplican (movidos a `window.__MAPA`, fuente única tarjeta+overlay) y están **horneables por el loop** — falta que el loop los rellene desde `SISTEMA/MAPA_RAMAS.tsv` (propuesta dejada al BUZÓN: `DESDE_CLAUDE_2026-06-29_mapa-ramas-horneable-cuaderno.txt`). **(5) NO hecho (opcional):** dos anillos «atención vs conocimiento». Hoy todo es **foto** con fecha (honesto, regla §9).
     - **«ventana viva» en `#envivo`:** **hecho** abrir con **«📍 AHORA»** (foco del día = foto + «última señal vuestra» en vivo de Supabase, que se refresca cada 60s), **«🌙 Mientras no mirabas»** (3 líneas honestas que rotan por día) y **frase citable** del día. (El feed temporal, proceso de pensar, misión, museo… siguen en `DESARROLLO_CUADERNO.md` §«STAGED v0.13+».)
     - **Revisado por workflow adversarial (6 lentes, 12 hallazgos):** corregidos focus-trap+`inert` del overlay, contraste AA del badge, `role=group` en SVG con botones, `:focus-visible`, cerrar 44px, deep-link off-site, y guarda anti-crash si el loop hornea un estado desconocido. **OJO (gotcha para el loop):** el overlay vive DENTRO de `.wrap`, NO lo conviertas en hermano sin reajustar `bgInert`.
     - ⚠️ **Densidad (flag de Tony pendiente):** el revisor marcó que `#envivo` apila bastantes piezas «vivas» antes del primer contenido. Se mantuvieron porque Tony las pidió en el opening; si las ves recargadas, dilo y colapsamos «🌙 Mientras no mirabas» en un `<details>`.
     - **«Inmersivo por defecto»** (Tony) → regla §10 en `DISEÑO_HEURISTICAS.md`; el mapa a pantalla completa es ya el **patrón de referencia vivo**.
  2c. **🧩 Almacén de widgets = EMBUDO (diseño de Tony, 29-jun):** persistido al BUZÓN (`DESDE_CLAUDE_2026-06-29_almacen-widgets-embudo-evolutivo.txt`) para que el loop lo integre (estados Promocionado/Descartado/Revisión + N revisiones CORTAS, no por tiempo). NO es del cuaderno.
  3. **Estado rancio**: `CUADERNO_ESTADO.tsv` lleva ~6 días sin refrescar (lo escribe el loop Cowork, NO Code). La web ya lo enmarca con calma (📸) y el bloque «MADRE en directo» lo aclara. Forzarlo = decisión con Tony (fichero del loop).
  4. **Backlog grande «organismo vivo»** (ideas de Tony aún por hacer) persistido en `DESARROLLO_CUADERNO.md` §«STAGED v0.11+».
> Lee también **`GUIA_FACIL.md`** (separa el Cuaderno de MADRE y explica lo mejor de cada uno en simple).

## v0.11 (2026-06-28) — hecho en esta tanda (cabecera limpia + «no entiendo» universal + MADRE en directo) — WORKING TREE, SIN COMMIT
- **Cabecera (Top 5 de Tony):** las 4 cajas amarillas apiladas → un solo `#onboard` (gancho + narrativa 3 frases + ⏱ tiempo de lectura + selector `#quickPick` «¿qué quieres ver?»). Caja **«Versión web» eliminada**. Marcador 3/10 renombrado **«Contacto con la realidad»** con `.heroLead` de contexto ANTES del número. **«Soy Tony» → «👤 Soy el creador»** (parecía login). staleBanner calmado (📸, gris, «no está roto»). `caminoCard` sube a `.key` (3 niveles visuales: key/normal/muted).
- **«No entiendo» universal:** pastilla 🤔 por **cada término del glosario** (data-island curado `term→{simple,ejemplo}`, respuesta AL INSTANTE + señal `__fb` deduplicada por sesión) + ramas «simplifícalo»/«ejemplo» en el `popFor` de las tarjetas. **TEMPERATURA** explicada (analogía maleta) en la decisión 5, el paso 3 de Tony y el glosario.
- **`#envivo` «MADRE en directo»** (tras el hero): latido (dot pulsante) + **hámster VISIBLE** (antes oculto en una card colapsada → por eso Tony «no veía el hámster») + **estado de ánimo del día** (7 estados, rota por día = regla de **no-rayada**) + **«lo que no te estoy contando»** (rota). Honesto: enmarca que las rutinas viven aunque los números sean una foto.
- **Cementerio de ideas muertas** (card nueva ⚰️, 6 entradas reales) — demuestra criterio.
- **Dibujo:** +9 plantillas de **objetos** (cohete/corazón roto/bombilla/taza/flor/estrella/rayo/planta/pez; las viejas eran casi todas caras) transformadas a 300×180 + **frase no-NPC**.
- **Caos:** fuera el **temblor CONSTANTE** `chaosBig` (era artificial, feedback de Tony); `jolt` espaciado; +6 órdenes (incl. «baja a dibujar»); **etiquetas «mira ESTO»** en los círculos que rodean cosas reales.
- **Comentarios:** `.cmtForm` restilado (contenedor + foco de acento + file punteado). **Brillo «secreto»** (`.secretGlow`, destello ocasional) en el gato y la chincheta.
- **Cómo se hizo:** copy redactado por un **workflow de 6 agentes** y **curado a mano** (descarté cifras inventadas «730 trozos»/«19 jul»; corregí la def. de «suelo externo» que el agente confundió). El copy crudo quedó en el output del workflow `cuaderno-copy-vivo`.

## Qué es
Web pública "Cuaderno MADRE" (un solo `index.html` autocontenido) en GitHub Pages:
- **Web:** https://eltonylfgi-blip.github.io/cuaderno-madre/
- **Repo (FUENTE ÚNICA):** `eltonylfgi-blip/cuaderno-madre` · clon local en `C:/Users/anton/repos/cuaderno-madre`. El `index.html` del repo es el MASTER. Flujo: `git pull` → editar → validar → `commit` + `push`.
- git ya está configurado (identidad + credential helper de gh) → push desatendido OK.

## Antes de editar — LEE ESTO
1. **`DESARROLLO_CUADERNO.md`** (mismo repo): checklist, lecciones/gotchas (bugs ya cometidos), fuentes de inspiración y backlog. Actualízalo con cada lección nueva.
1b. **`DISEÑO_HEURISTICAS.md`**: cómo diseñar ("de la abuela al borracho"), checklist de usabilidad, patrones validados, y cómo clonar webs personalizadas (capas THEME/PERFIL). `NOTAS_DISENO.md` = variedad visual; `MADRE_UI_REFERENCIAS.md` = componentes Uiverse.
2. Edita SOLO `index.html`.
3. Valida: `node --check` de cada `<script>` ejecutable + el `<script type=module>`; estructura OK.
4. Verifica EN NAVEGADOR (preview local: crear `.claude/launch.json` con `python -m http.server 8137 --directory C:/Users/anton/repos/cuaderno-madre`, luego preview_start/eval/console_logs). 0 errores de consola. Borra filas de prueba de Supabase.
5. Añade entrada al array `cambios` (Evolución) + línea a `CHANGELOG.md`.

## Backend (Supabase) — conector ya instalado en la app de Tony
- Proyecto `kopegamcjozrvmxruwdn` (org "Madre'org", eu-central-1). Tools: `mcp__258fef97-b287-400b-bd3a-f7bf69c0ab69__*`.
- URL: `https://kopegamcjozrvmxruwdn.supabase.co` · clave **publishable** (segura en el HTML): `sb_publishable_2NDyczKDwFCzNIWEMycRtw_yTnkUQAi`.
- Tablas (todas RLS): `comments` (likes vía RPC `like_comment`, `hidden` para moderación, `image_url`), `feedback` (móvil → MADRE, `image_url`; **privada: anon NO la lee**), `drawings` (RPC `like_drawing`, `hidden`), `counters` (visitas; RPC `bump_counter(k)` SECURITY DEFINER, grant a anon; lectura pública). Bucket Storage público `comment-images`.
- En el HTML: `window.__sb` = cliente Supabase; `window.__fb({card,section,tipo,texto})` y `window.__openFb(card,section,tipo)`.

## La rutina (Claude Code, cada hora)
`cuaderno-feedback` en `C:/Users/anton/.claude/scheduled-tasks/cuaderno-feedback/` (SKILL.md). Procesa feedback de 3 fuentes (Drive + PC buzón + tabla `feedback`), responde/modera comentarios, refresca los números de la web desde `SISTEMA/CUADERNO_ESTADO.tsv`, mantiene vivo + respalda Supabase, y guarda los gustos de Tony en `GUSTOS_TONY.md`. `BASELINE_COMMIT` de deriva en `ESTADO_RUTINA.md`. LÍNEA ROJA: nunca reescribe sus propias reglas.

## Hecho (lo grande)
Bloque A (modo lectura/gateo), refresco de números (TSV horneado), comentarios públicos (Supabase, likes, hilos, tiempo real), respuesta-IA de MADRE a comentarios, "Señales del mundo" arriba (evidencia primero), hipótesis vivas/muertas, progreso de builds, 🤱🏻+tooltip+"¿qué es?", emojis, variedad visual (12 temas + fondos + degradados), feedback con imagen desde móvil, modo lápiz ✏️, corazón 💗 "me gusta", flechas pegadas, gato troll, dibujos (canvas+galería+votos), tour guiado, nota secreta "pa la tata :)", modo caótico, contraseña que se ríe, paneles interactivos, moderación (bloqueo pedofilia + ocultar amenazas), curiosidad "¿por qué MADRE?", provenance.
- **2026-06-21 (tanda 1):** 👁️ **contador de visitas** + panel **"El cuaderno por dentro"** · **modo caótico narrativo** · **arreglado el gato tapado** (`TOPSAFE`) · **deshacer** (↩️/Ctrl+Z) en dibujos. Favoritos de Uiverse en `MADRE_UI_REFERENCIAS.md`.
- **2026-06-21 (tanda 2):** **HUB de FAB** (6 botones → un menú ✦ + nudge "toca aquí") · **ASMR** (sonidos sintetizados) · **"🤔 no entiendo"** por tarjeta + en la ruta guiada · gato con **poses** + arreglo móvil · **caos x2** (flechas a elementos reales, círculos, citas reales, travesuras, megaFlip) · chat abre **en lo último + foco** · comentarios con **scroll interno** · **post-it claro** · **MADRE = carpeta con identidad** · **dibujos con dueño** · **modos exclusivos** · bugs: chips reales (5), aviso **estado desfasado >48h**, `.limit()`, validación imagen, tema **por día**, **Open Graph**, `aria-live`. Nuevo `DISEÑO_HEURISTICAS.md`. Verificado en navegador (desktop+móvil), 0 errores; revisado por workflow adversarial. **Parking lot** en DESARROLLO_CUADERNO.md / DISEÑO_HEURISTICAS.md §7.

## v0.7 / v0.7.1 (2026-06-22) — hecho en esta tanda
ASMR motor reescrito (suena mejor) + **8 texturas que rotan por carga sin repetir** · **plantillas de dibujo**
(24, corpus en `window.__cmCorpus`) que solo GUÍAN (no salen en el dibujo enviado — fix v0.7.1) · "🤔 no entiendo →
**señalar la parte**" · caos con **clickbait + datos random + órdenes** · tour con paso sorpresa = dibujos ·
**etiquetas de emoji** · **skins de panel** (variedad por día) · **comentarios en burbujas** + mini-avatar ·
**recorte de imagen** al subir · HUB: lo encendido sube arriba · **versión visible** + nueva `GUIA_FACIL.md`.

## v0.10 (2026-06-28) — hecho en esta tanda (ayudar + sonidos reales + frescura visible) — COMMIT LOCAL, SIN PUSH (Tony da el OK)
- **Sección «🙌 ¿Quieres ayudar a MADRE?»**: island `#ayudaBaked` (tabs, seed 5 items genéricos/moat-safe) + card (tras Camino) + render en el IIFE de camino. La rutina `cuaderno-feedback` hornea también `AYUDA.tsv` (PASO 0.5). El loop mantiene `SISTEMA/AYUDA.tsv` (buzón: `DESDE_CLAUDE_2026-06-28_seccion-ayuda-cuaderno.txt`).
- **Sonidos ASMR REALES (CC0)** en `sounds/`: `pop.mp3` (Freesound "Plop!" CC0), `wood.wav`+`click.wav` (Kenney Interface Sounds CC0) + `CREDITS.txt`. El motor ASMR (`window.__asmr`): `loadSamples()` en `ensure()`, `playSample()`; `hit()` y `softClick()` reproducen el sample real con **fallback al sintetizado**; el roce (brush/hover) sigue sintetizado. Mapa `PROF2SAMPLE={burbujas:'pop',madera:'wood'}`. **No verificable de oído desde Code** (Tony confirma); verificado que cargan (200) y decodean.
- **Hámster 🐹** (Uiverse/Nawsome, en MADRE_UI_REFERENCIAS): `.cmHamWrap` + `.wheel-and-hamster` (font-size 6px desktop / 5px móvil) en la tarjeta Rutinas; CSS en bloque `<style>` antes de `</body>`; respeta `reduced-motion`.
- **Frescura visible (bug "De un vistazo")**: la tira ahora pinta fecha `actualizado` + chip ROJO `.dvStale` «posiblemente desfasado» si >48h. **Causa raíz** de la foto vieja: SOURCE `CUADERNO_ESTADO.tsv` a 22-jun (loop no lo refresca hace 6 días); el horneado es SIMÉTRICO (PASO 0.5 hornea estado+camino+ayuda) — NO era bug de horneado.

## v0.9 (2026-06-28) — hecho en esta tanda (claridad + separar públicos)
- **Gancho** `#promesa` + cue `.sub2` (dos públicos) tras el `.sub`. CSS nuevo en `<style id="overhaulCss">` (tras `<body>`).
- **Explicación en capas**: subtítulos `.s` de calle en cards clave; detalle en `<details>`. **Glosario** reescrito (+«suelo externo»/«publicar 1 activo», −«overlay»).
- **Tarjetas nuevas** (en la zona visitante, antes de las de Tony): 📖 Historia (`.tline`), ⚙️ Rutinas (`.simpleList`), 🔁 Meta-palancas. Usan `.num` con emoji (no chocan con el JS que busca `.num`=="8"/"10").
- **Jerarquía**: `.card.key` (Qué es MADRE, #senalesCard), `.card.muted` (Glosario nº10), `.card.tony` (Tu parte nº2, Decisiones nº4).
- **Separar públicos**: un IIFE al final mueve `.card.tony` al final (antes de Comentarios) bajo `.tonySep`, y oculta `#chipDecs/#chipSteps` salvo en modo Tony. **OJO**: las tony se reordenan a RUNTIME (no en el HTML fuente).
- **Bug "Tu parte" solo Tony** (commit fa1996e): guard en el listener de checkboxes (`isTonyNow()` lee `localStorage`), + CSS atenuado en lectura, + nota `.soloTony` en la card. (Corazón/chincheta y «¿por qué?» también en fa1996e.)
- **Peluquería = EN MARCHA** (no "paso pendiente") en card 3 (Tony ya hace llamadas en frío).
- **Aviso desfasado** reescrito a "foto de hace ~N días" (`checkStale`).
- **Datos viejos**: `CUADERNO_ESTADO.tsv` está a 22-jun (6 días). NO lo edito (escritor único = loop). Nota dejada: `BUZON_ENTRANTE/DESDE_CLAUDE_2026-06-28_refresco-estado-cuaderno.txt`.
- **PENDIENTE**: el **ASMR** sigue sonando "raro" (sintetizado); recomendado pasar a sonidos reales CC0 (Pixabay/Freesound) — no se puede verificar de oído desde Claude Code, requiere que Tony escuche. Splice = gasta créditos (pedir OK).

## v0.8 (2026-06-28) — hecho en esta tanda
- **Bug dibujos**: tras enviar, Ctrl+Z recuperaba el dibujo y se podía REENVIAR el mismo → al enviar se vacía la pila de deshacer + `isBlank()` bloquea enviar lienzo en blanco.
- **Modo caótico más bestia**: `chaosQuake` (tiembla `.wrap`, solo desktop, clase `body.chaosBig`), `chaosJolt` (sacudones), `#chaosTint` (tinte de color que muta), wiggle más fuerte, más partículas/más rápido. Apagable + respeta `prefers-reduced-motion`.
- **HUB ✦**: lo ENCENDIDO sale FUERA del menú como chip siempre visible (`#fabHubActive`), apagable de un toque; sincronizado con `MutationObserver` (capta Esc/clic-fuera).
- **Camino al 10/10**: sección nueva que lee `SISTEMA/CAMINO_10.tsv` (island `#caminoBaked`, tabs reales) + tira **"De un vistazo"** arriba. **OJO**: la rutina `cuaderno-feedback` (SKILL PASO 0.5) ahora hornea TAMBIÉN `CAMINO_10.tsv` cada pasada → no edites ese island a mano.
- **PENDIENTE v3** (parking, ver BUZÓN `DESDE_CLAUDE_2026-06-28_cuaderno-v3-camino-y-pendientes.txt`): explicación "en capas" (`▸ ver más`) en TODAS las tarjetas + repaso del glosario a lenguaje de calle (pasada grande, sin hacer).

## SIGUIENTE (backlog priorizado → detalle en `DESARROLLO_CUADERNO.md` sección 🗂️ "STAGED")
0. **Decisión pendiente de Tony — SPLICE:** está conectado; `describe_a_sound` (buscar) es gratis, `download_asset`
   **gasta créditos + duda de licencia** para web pública. El ASMR es sintetizado (mejorado). Candidatos ya listados
   (bubble_wrap UUID `4ae4267e-f0fb-487a-ae04-a82fe7fa579d`, paper_crunch 1s UUID `8e409aef-7834-41c5-b057-056d03506b19`).
   Preguntar a Tony si descargar e incrustar de verdad, o seguir sintetizado.
1. **Estado VIVO en Supabase (el "punto 1" que Tony quiere):** mover `global_score/areas/desvios/senales/investig/hipotesis/changelog`
   a una tabla; el loop `cuaderno-feedback` hace `upsert` (service_role) cada pasada; el cliente `select` + se suscribe al
   canal (igual que `comments`) → cambios al instante sin esperar build. Implica editar el SKILL del loop con cuidado.
2. **Cerrar el ciclo de decisiones:** estado por `.dec` (pendiente/procesada/aplicada) que el loop actualiza + badge.
3. **Corazones/likes GLOBALES alrededor de zonas más queridas + comentarios alrededor de las menos entendidas:** tabla pública
   `zone_signals(zone_key, likes, confusions)` + RPC `bump_zone` SECURITY DEFINER (patrón `counters`). Hoy el 💗 es local.
4. **Vídeo + recorte** (tiempo y dimensiones; hoy solo imagen) · **og:image 1200×630 PNG** · **simplificar copy in-page** (abuela/borracho).
5. **Confirmar con Tony:** "toggled-on fuera del colapsable" — hoy en el HUB lo activo sube arriba del menú; ¿lo quiere como chips SIEMPRE visibles fuera?
6. **SEGURIDAD (sigue siendo prioridad de fondo):** rate-limit / RLS por IP / honeypot / contraseña fuera de texto plano; respuestas huérfanas `.limit(200)`.
7. Resto persistido: comentarios anclados visibles para todos; ideas "organismo vivo" (gato coleccionista, pared de garabatos, museo de ideas muertas, etc.).

> Componentes de UI candidatos (favoritos de Tony en Uiverse) → **`MADRE_UI_REFERENCIAS.md`** (hamster=MADRE pensando, hover-tracker, antorcha=modo explorador, etc.). Para pasar más: el formato está en ese doc.

## Cómo seguir en un chat NUEVO
Abrir Claude Code en la carpeta del repo y decir, por ejemplo:
> "Sigo con el Cuaderno MADRE. Lee `C:/Users/anton/repos/cuaderno-madre/CONTINUAR_AQUI.md` y `DESARROLLO_CUADERNO.md`, haz `git pull`, y sigamos con [lo que quieras del backlog]."
