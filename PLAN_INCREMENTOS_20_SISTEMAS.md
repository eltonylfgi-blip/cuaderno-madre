# PLAN DE INCREMENTOS — ejercicio «20 sistemas» (Fable 5, 10-jul-2026)

> **PARA EL EJECUTOR (Sonnet 5, misma sesión de chat):** este fichero es AUTOSUFICIENTE — no releas la
> conversación ni explores index.html a ciegas: cada incremento trae sus anclas exactas (función/ID/línea),
> verificadas HOY contra v0.49 por 18 agentes adversariales + 1 inventariador. Las líneas pueden desplazarse
> unas pocas posiciones con cada versión que subas: usa el PATRÓN grep, no el número ciego.
> Trabaja MÍNIMO 40 minutos reales, un incremento tras otro, en el ORDEN de este plan.
> «Ya publiqué varias versiones» NO es motivo de parada (prohibido explícitamente por Tony).

## Frase de cierre del ejercicio (conteo real)

**He generado 34 sistemas posibles → he descartado 17 → estos 17 sobreviven → ahora sí puedo entregar el plan.**

## Protocolo de arranque (una vez)

1. `cd C:\Users\anton\cuaderno-madre-pub` · `git pull --rebase --autostash` · `git status` (si hay cambios sin commitear AJENOS → espera/pull; protocolo anti-colisión).
2. Primera versión que publicas: **v0.50** (la web está en v0.49). Cada incremento = +1.
3. Si un incremento resulta bloqueado en la práctica → SÁLTALO, anota el porqué en la sección «BITÁCORA» al final de este fichero, y sigue con el siguiente. No pares a pedir permiso salvo gusto-de-Tony o restricción rota.

## Bucle por incremento (el que ya funcionó 14 versiones seguidas)

(1) implementa el cambio mínimo → (2) `node --check` de cada bloque `<script>` (script en `%TEMP%\claude\check_scripts.js` de la sesión anterior, o rehazlo ~15 líneas) → (3) preview real: consola limpia, sin solapes (getBBox por eval, NUNCA preview_screenshot — se cuelga en esta página), tap del mapa intacto si tocaste cerca (8→12 nodos al abrir rama), 360px sin overflow → (4) sube `window.__cmVersion` + 1 entrada honesta en `cambios[]` → (5) `git pull --rebase --autostash` + commit + push → (6) siguiente.

## Restricciones (NO negociables sin permiso explícito de Tony)

- **NO tocar** `onNodeClick`, `routeTap`, `nodeAtPoint`, `focusBranch` ni la cadena de transformación del SVG del mapa. Decorativo con `pointer-events:none` sí vale.
- **NO reordenar tarjetas** ni insertar tarjetas/elementos del MISMO tag ANTES de contenido existente (corazones anclados por nth-of-type — detalles en TRAMPAS).
- **NO tocar ni enlazar** el sistema ASMR ni el modo caótico.
- **HONESTIDAD:** cero datos inventados. Todo número/frase sale de datos reales ya presentes.
- **reduced-motion:** guard obligatorio en todo lo animado (el navegador de Tony lo tiene ON).

## TRAMPAS GLOBALES del fichero (hechos verificados hoy, v0.49)

- **Corazones/nth-of-type:** MECANISMO EXACTO (líneas 3322-3365, dentro del <script> que arranca en 3317): cada corazón se guarda como {path, note} en localStorage "cm_likes_v1" (loadLikes/saveLikes, líneas 3334-3335). El "path" lo genera cssPath(el) (líneas 3336-3344), comentario explícito en 3336: "ruta CSS estable de un elemento (nth-of-type por TAG; insertar <aside> de texturas no la rompe)". Algoritmo de cssPath: si el elemento tiene id, usa "#id" (CSS.escape) y PARA ahí (path corto, inmune a todo). Si no tiene id, cuenta cuántos HERMANOS DEL MISMO TAGNAME hay bajo el mismo padre (var same=[], filtra por c.tagName===el.tagName recorriendo firstElementChild/nextElementSibling) y construye "tag:nth-of-type(N)" con N=posición entre esos hermanos del mismo tag, recursivamente hacia arriba hasta <body>. Al pintar el corazón (addHeart, línea 3355-3356) se resuelve con document.querySelector(rec.path) — si no hay match, addHeart devuelve null (el corazón simplemente no aparece; no hay error visible, es fail-silent).
Los .card están todos como hijos directos de <div class="wrap"> (línea 295; primer card "vsCard" en 349).
VEREDICTO:
(a) Añadir contenido DENTRO de una tarjeta: SOLO rompe el anclaje si el nuevo elemento es del MISMO TAGNAME y se inserta ANTES (como hermano previo) del elemento ya anclado — eso desplaza su índice nth-of-type y el path guardado deja de apuntar a él. Si el contenido nuevo se añade DESPUÉS del elemento anclado (al final de ese contenedor), o es de un TAG DISTINTO (p.ej. <aside>, como dice el propio comentario de línea 3336), NO rompe nada, porque nth-of-type cuenta solo hermanos del mismo tag y solo importa la posición relativa.
(b) Añadir contenido DESPUÉS de la última tarjeta (al final de .wrap): NO rompe ningún anclaje existente, sea cual sea el tag, porque no desplaza el índice de ningún <div> anterior (nth-of-type solo se ve afectado por inserciones ANTES de un elemento, nunca por las que van después).
(c) Insertar una TARJETA NUEVA al final (nuevo <div class="card"> como último hijo de .wrap): SEGURO — no cambia el nth-of-type de ninguna tarjeta existente (su propio índice es el siguiente número, más alto que todos los anteriores); los corazones ya puestos en tarjetas previas siguen apuntando bien. Insertar una tarjeta nueva EN MEDIO del listado sí rompería los anclajes de todas las tarjetas .card posteriores a ese punto (y de cualquier corazón anclado dentro de ellas), porque desplazaría el nth-of-type("div") de cada una.
- **Supabase:** supabase-js v2, cargado como ES module remoto: línea 3467 "import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';" (script type="module" que empieza en línea 3465). createClient en línea 3470; se expone globalmente en línea 3471 "try{ window.__sb=sb; }catch(e){}".
Suscripción realtime a comentarios: línea 3732 "sb.channel('comments-rt').on('postgres_changes',{ event:'*', schema:'public', table:'comments' },()=>liveReload()).subscribe();" — API v2 (.channel().on('postgres_changes',...).subscribe()), NO la API v1 antigua (.from('table').on('*',cb).subscribe()). Hay otro canal igual de v2 para otra tabla en línea 671: "window.__sb.channel('mpt-rt').on('postgres_changes',{event:'*',schema:'public',table:'madre_para_tony'},...).subscribe();".
¿Soportaría Presence? El fichero NO usa Presence hoy (grep de "presence"/".track(" = 0 resultados) — esto es inferencia, no hecho verificado en el código: al ser la misma familia de API v2 de Realtime Channels (que unifica postgres_changes, broadcast y presence bajo el mismo .channel()), añadir presence con .channel(...).on('presence',{event:'sync'},cb).subscribe() + .track({...}) sería compatible con la versión ya cargada sin cambiar el import; pero hoy no hay ni una línea de presence en el HTML.
- **Changelog interno:** window.__cmCambiosMeta se define en la línea 3100: "try{ window.__cmCambiosMeta={count:cambios.length, oldest:cambios[cambios.length-1].fecha}; }catch(e){}", dentro del IIFE de "Evolución" (el array `cambios` se declara justo antes, cerrando en línea 3097; el comentario de línea 3098-3099 dice explícitamente: "`cambios` vive DENTRO de este IIFE (no es global) — expone 2 datos inofensivos y ya calculados... sin duplicar el array ni recalcular nada").
Campos expuestos: SOLO 2 — "count" (nº total de entradas del changelog, cambios.length) y "oldest" (la fecha del último elemento del array, cambios[cambios.length-1].fecha, es decir la fecha MÁS ANTIGUA porque el array está ordenado de más nuevo a más viejo — la última entrada, línea 3096, es "Nace el Cuaderno MADRE", fecha "2026-06-21").
El array `cambios[]` completo es PRIVADO/no accesible desde fuera del IIFE — solo esos 2 campos derivados se filtran a window. Se consume en al menos 3 sitios: línea 1733 (tooltip de descubrimiento del mapa), línea 1875-1879 (cálculo de "cambios desde tu última visita", guardado en localStorage "cm_last_visit_v2") y como plantilla para otro patrón gemelo, __investigMeta, en línea 3109 (mismo patrón, para investigBaked.length).
- **«Día 0»:** No existe una etiqueta literal "Día 0" ni "Día Cero" en el HTML (grep sin resultados). Hay dos aproximaciones distintas, ninguna es un "Día 0" explícito:
(1) La tarjeta "La historia de MADRE, en 5 pasos" (líneas 1971-1990) tiene una línea de tiempo (<ul class="tline">) cuyo PRIMER hito (línea 1980) es "Al principio" → "Yo era solo carpetas de texto: reglas escritas, cero vida." — SIN fecha calendario asociada (es relativo, no fechado).
(2) La fecha calendario más antigua de todo el fichero es "2026-06-21", del último elemento del array `cambios[]` (línea 3096: "Nace el Cuaderno MADRE" — "10 tarjetas en simple + progreso 0-10 + desviaciones + feedback que entra solo en BUZON_ENTRANTE"), expuesta también como window.__cmCambiosMeta.oldest (línea 3100). Pero eso es el nacimiento del CUADERNO (la web), no necesariamente el "Día 0" de MADRE como sistema (que según el propio texto de línea 1980 ya existía antes, "solo carpetas de texto").
- **reduced-motion (patrón existente):** Patrón doble, usado de forma sistemática por todo el fichero:
(1) CSS — bloques `@media(prefers-reduced-motion:reduce){...}` (y su variante con espacio `@media (prefers-reduced-motion: reduce)`) que ponen `animation:none`/`transition:none` a las clases con movimiento. Aparece 24 veces: líneas 161, 220, 249, 293, 311, 321, 445, 863, 1019, 1039, 1223, 1252, 1286, 3852, 3909, 3949, 4040, 4080, 4104, 4683, 5033, 5243, 5374, 5526, 6076, 6146, 6151. Hay además un uso inverso `@media(prefers-reduced-motion:no-preference)` en líneas 1315 y 1324 (animación SOLO si el usuario NO pidió reducir movimiento).
(2) JS — `matchMedia("(prefers-reduced-motion:reduce)").matches` capturado en una variable `reduce` local, envuelto en try/catch, y usado para saltar animaciones hechas con setInterval/requestAnimationFrame (que el CSS no puede frenar). Aparece en líneas 906, 1142, 1384, 4160, 5041, 5411, 6049, 6201. Comentario explícito en línea 1547: "cámara animada (setInterval = avanza también en headless; SALTA sin animar si reduced-motion)".
- **visibilitychange:** 8 listeners "visibilitychange" (todos con document.addEventListener, ninguno usa 'document.hidden' como listener en sí, pero SÍ como condición dentro del callback):
línea 520 — pausa/reanuda el polling de 'madre_para_tony' (setInterval de 180000ms) según document.hidden.
línea 4364 — (contexto del gato/mascota interactiva, pausa su comportamiento cuando la pestaña no es visible).
línea 5189 — pausa/limpia los elementos del "modo caótico" (chaos-el) cuando la pestaña se oculta, y los reinicia al volver.
línea 5605 — suspende/reanuda el AudioContext del modo ASMR según document.hidden.
línea 5841 — limpia/reprograma el "nudge" (aviso pulsante) del menú-hub flotante.
línea 6210 — para/arranca la animación del "hámster/rueda" decorativo.
Además, document.hidden se usa como GUARD dentro de setIntervals sin ser el propio listener, en líneas 3415 (reposicionar corazones), 6095 y 6112 (repintar "secreto"/"live"). Total: "ninguno" NO aplica — sí existen, listado arriba.
- **Scroll-listeners existentes:** El par scroll-listener + setInterval de respaldo asociado al sistema de corazones (tema 1) está en líneas 3410-3415, dentro del IIFE de "corazón" (arranca en 3317-3322):
- Línea 3412: `window.addEventListener("scroll", repositionHearts, {passive:true});` — reposiciona los corazones 💗 cuando el usuario hace scroll (porque están anclados con getBoundingClientRect(), fixed en viewport, no en flujo del documento).
- Línea 3413: `window.addEventListener("resize", repositionHearts);` — igual, al cambiar tamaño de ventana.
- Línea 3414: `setTimeout(repositionHearts, 600); setTimeout(repositionHearts, 1600);` — dos repintados diferidos tras cargar (por si el layout aún se está asentando, imágenes cargando, etc.).
- Línea 3415 (el "setInterval de respaldo"): `setInterval(function(){ if(!document.hidden && hearts.length) repositionHearts(); }, 1200);` con comentario "// no-op si no hay corazones" — repinta cada 1200ms SOLO si la pestaña está visible y hay al menos un corazón pintado, como red de seguridad ante cambios de layout que no disparan scroll/resize (p.ej. un <details> que se abre/cierra y mueve el contenido).
NOTA: no encontré comentario textual "v0.37" ni "v0.48" pegado a estas líneas concretas — el rango de versión que pide la pregunta lo infiero por proximidad temática (corazones) y por los v0.38-v0.48 que sí están explícitamente fechados alrededor (líneas 3035-3046, todas "2026-07-10"), pero no hay una cita literal que ate esa línea 3415 a un nº de versión exacto; repórtalo como aproximado, no como hecho verificado línea a línea.
Hay otro par scroll+reposition análogo pero para el TOUR guiado (no corazones): líneas 4530-4535 (`function reposition(){...} window.addEventListener("resize", reposition); window.addEventListener("scroll", reposition, {passive:true});`) — sin setInterval de respaldo, solo resize+scroll.
- **Favicon/título:** Línea 21: `<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤱</text></svg>">` — es un SVG inline codificado como data URI (sin base64, con comillas %22 URL-encoded), que dibuja el emoji 🤱 como único contenido.
document.title actual: línea 6 — `<title>Cuaderno MADRE</title>` (nunca se reasigna dinámicamente por JS — no hay ocurrencias de `document.title=` en el fichero).
- **Notas del inventariador:** (a) Orden de IIFEs / módulos — TRAMPA REAL: el script de Supabase (línea 3465) es `<script type="module">`, y los módulos se ejecutan DEFERRED (después de parsear todo el HTML), mientras que los `<script>` clásicos sin type se ejecutan SÍNCRONOS en el punto donde aparecen. Por eso cualquier `<script>` clásico que use `window.__sb` synchronously fallaría si se ejecutara antes de que el módulo corra — el propio código ya lo sabe y usa POLLING (`setInterval` esperando `window.__sb`) en vez de asumir disponibilidad inmediata: ver líneas 668-673 (`var t=0,iv=setInterval(...)`) y la función reutilizable `waitSb()` en líneas 4742 y 5255. Un ejecutor que añada código nuevo que lea `window.__sb`/`window.__cmCambiosMeta` fuera de una función diferida DEBE replicar ese patrón de espera, no asumir que ya existe.
(b) "use strict" — aparece UNA sola vez en todo el fichero (línea 2565, dentro del script que arranca en 2563); el resto (39 de 40 <script>) NO está en modo estricto — no asumas semántica strict en otros bloques.
(c) Nombres de localStorage casi-duplicados y confundibles: "cm_lastvisit_v1" (línea 469, Diario Vivo/commits) vs "cm_last_visit_v2" (línea 1875, changelog interno) — son DOS claves distintas para DOS features distintas con nombres que casi se leen igual; y "cm_likes_v1" (corazones sobre zonas, línea 3323) vs "cmt_likes_v1" (likes a comentarios, línea 3518) son también dos sistemas de "me gusta" independientes con su propio localStorage. Fácil de confundir/pisar si se toca a mano.
(d) El fichero completo vive en UN solo <script src=module> para Supabase (3465) + 39 `<script>` clásicos más; no hay bundler, todo es JS vanilla inline con muchos IIFEs `(function(){...})()` independientes que se comunican vía `window.__algo` (ver `__sb`, `__fb`, `__openFb`, `__cmCambiosMeta`, `__investigMeta`, `__exitLike`, `__exitLapiz`) — el acoplamiento entre bloques es por variables globales con try/catch alrededor de cada acceso (fail-open/fail-silent generalizado: casi todo está envuelto en `try{...}catch(e){}` vacíos, así que un fallo en un bloque no rompe visiblemente los demás, pero tampoco lo notarás en consola).
(e) `<div class="wrap">` (línea 295) es el contenedor directo de todas las `.card` — relevante para el veredicto de corazones (punto 1): todas comparten el mismo padre, así que la lógica de nth-of-type("div") aplica de forma uniforme entre tarjetas.

### Keys de localStorage existentes (no re-crear, no pisar)

- `cm_lastvisit_v1 (línea 469) — última visita vista del Diario Vivo (commits reales de GitHub); OJO: nombre muy parecido pero DISTINTO de cm_last_visit_v2`
- `cm_visitas_v1 (línea 971) — contador de nº de visitas del dispositivo + fecha de la última`
- `cm_map_explored_v1 (línea 1677) — qué ramas del mapa grande ya ha explorado este visitante`
- `cm_cmt_ts (línea 1452) — timestamp anti-spam al enviar un comentario (cooldown 5s)`
- `cm_rama_ts (línea 1505) — timestamp anti-spam al proponer una rama nueva (cooldown 5s)`
- `cm_props_pending_v1 (líneas 1517/1792) — cola local (máx 6) de propuestas de rama pendientes de aprobar`
- `cm_map_done_v1 (línea 1693) — flag de que el mapa ya se exploró al 100% (dispara celebración 1 sola vez)`
- `cm_last_visit_v2 (línea 1875) — fecha + nº de cambios vistos, para el mensaje 'desde tu última visita'`
- `cuaderno_madre_v1 (línea 2572) — estado general: pasos marcados, decisiones elegidas, feedback ya enviado`
- `cuaderno_madre_tony (líneas 596/2804/3205/6015) — flag de 'modo creador/Tony' desbloqueado (gate)`
- `cm_likes_v1 (línea 3323) — corazones 💗 marcados sobre zonas de la página (el sistema de 'corazones')`
- `cmt_likes_v1 (línea 3518) — 'me gusta' dado a comentarios públicos concretos (distinto del anterior)`
- `cuaderno_tour_seen (línea 4374) — ya vio la pantalla de bienvenida / ruta guiada inicial`
- `draw_likes (línea 4607) — likes a los dibujos de la pizarra colaborativa`
- `cm_identity_v1 (línea 5380) — identidad/nombre que el visitante guardó de sí mismo`
- `cm_asmr_v3 (línea 5408) — preferencia encendida/apagada del modo ASMR (sonidos); nombre con 'v3' porque v2 se quedaba pegado en apagado por bug reportado por Tony`
- `cm_hub_seen (líneas 5829/5838) — ya abrió una vez el menú-hub flotante ✦`

### Tarjetas principales en orden (HTML fuente)

- ⚖️ Una IA normal vs. MADRE — línea 349 (div, id=vsCard) / título línea 352
- 📍 ¿Dónde vive este cuaderno y cuándo te lee? — línea 702 (id=dondeVive) / título línea 705
- 🌍 Señales del mundo — línea 745 / título línea 746
- ⚖️ El marcador: se juzga sola — línea 783 / título línea 784
- 🎯 Camino al 10/10 — línea 987 / título línea 988
- 🌳 El mapa de MADRE — línea 1043 / título línea 1044
- 🙌 ¿Quieres ayudar a MADRE? — línea 1928 / título línea 1931
- 1️⃣ Qué es MADRE (y cómo sé que va bien) — línea 1945 / título línea 1946
- 📖 La historia de MADRE, en 5 pasos — línea 1971 / título línea 1974
- ⚙️ Las rutinas que mueven a MADRE — línea 1992 / título línea 1995
- 🔁 Lo que MADRE investiga: las «meta-palancas» — línea 2027 / título línea 2030
- 2️⃣ Tu parte — línea 2048 / título línea 2049
- 3️⃣ El foco ahora: que el mundo me VEA — línea 2085 / título línea 2088
- 4️⃣ Decisiones (archivo de junio) — línea 2107 / título línea 2108
- 5️⃣ Riesgos y puntos ciegos — línea 2192 / título línea 2195
- 6️⃣ Salud, progreso y desviaciones — línea 2215 / título línea 2218
- 8️⃣ Qué se está construyendo — línea 2235 / título línea 2238 (OJO: el num salta de 6 a 8, no hay tarjeta marcada '7' en el HTML)
- 9️⃣ Lo que MADRE va aprendiendo — línea 2256 / título línea 2259
- ⚰️ El cementerio de ideas muertas — línea 2270 / título línea 2273
- 🔟 Glosario en simple — línea 2294 / título línea 2295
- 1️⃣1️⃣ Mecanismos potentes (y cómo los usas tú) — línea 2321 / título línea 2324
- 1️⃣2️⃣ Evolución de MADRE — línea 2356 / título línea 2359
- ⭐ 8 de julio: alguien me vio — línea 2378 / título línea 2379
- 💬 Comentarios — línea 2388 (id=comentariosCard) / título línea 2391

## EL EJERCICIO — 34 sistemas candidatos, ordenados por impacto percibido

Pregunta: *«¿Qué tendría una versión del Cuaderno MADRE que provocara que el 90% de los visitantes
dijeran 'nunca había visto una web así'?»* — cruzado con los 12 cambios de paradigma de CALIDAD_FINAL_WEB.md.

| # | Sistema | Paradigmas que sirve | Veredicto |
|---|---------|----------------------|-----------|
| 1 | Mapa como interfaz única (la web ES el mapa) | #2 #6 | ❌ DESCARTADO — exige cirugía del pan/zoom (restricción 1) y matar/reordenar la capa de tarjetas (restricción 2) |
| 2 | Zoom infinito hasta el código | #3 #8 | ❌ DESCARTADO — extiende la cadena de transformación del SVG (restricción 1; se rompió 2 veces con cambios menores) |
| 3 | Identidad visual propia total | #1 | ❌ DESCARTADO para esta fase — el 1er incremento ya exige el gusto de Tony (CONTINUAR_AQUI: «gusto, no ingeniería»); ofrecerle 2-3 direcciones = decisión suya, no incremento |
| 4 | Génesis: la web se construye delante de ti | #1 #11 #12 | ✅ SOBREVIVE (55 min) |
| 5 | Organismo visual de datos reales (fondo generativo) | #1 #9 | ✅ SOBREVIVE (60 min, colocación corregida) |
| 6 | IA de MADRE integrada (chat en vivo) | #7 #10 | ❌ DESCARTADO — coste API recurrente (gate de dinero, regla 2) + riesgo moat (backlog #8 ya lo documenta) |
| 7 | Modo película: 30 días en 30 segundos | #9 #11 #12 | ✅ SOBREVIVE (65 min) |
| 8 | Presencia compartida multi-visitante | #1 #7 | ✅ SOBREVIVE (60 min, con test runtime de Presence como paso 0) |
| 9 | Reliquia compartible generada con datos reales | #10 #12 | ✅ SOBREVIVE (75 min) |
| 10 | Teatro de errores interactivo | #10 #11 | ✅ SOBREVIVE (45 min) |
| 11 | Logros/coleccionables honestos | #7 #12 | ✅ SOBREVIVE (75 min) |
| 12 | Presencia de MADRE en toda la página | #1 #7 #11 | ✅ SOBREVIVE (60 min, anclas corregidas) |
| 13 | Física/materialidad de tarjetas | #7 #12 | ❌ DESCARTADO — duplica el modo caótico (tarjetas que caen/rebotan YA existen en caos v2) y ampliarlo = restricción 3; tamaño de subsistema, no de incremento |
| 14 | Sonido reactivo global | #1 #7 | ❌ DESCARTADO — restricción 3: el ASMR es subsistema aparte; enlazarlo al resto = arquitectura Tony-gated |
| 15 | MADRE duda: voto consultivo del visitante | #10 | ✅ SOBREVIVE (40 min) |
| 16 | Latido en directo ampliado | #1 #7 | ✅ SOBREVIVE (60 min) |
| 17 | Memoria del visitante ampliada | #7 #10 | ✅ SOBREVIVE (70 min, premisa corregida: el tracker hay que crearlo) |
| 18 | Tactilidad premium (haptics + muelles) | #7 | ✅ SOBREVIVE (45 min) |
| 19 | Micro-imposibles del navegador | #1 #12 | ✅ SOBREVIVE (40 min) |
| 20 | Clima real: tinte nocturno por hora local | #1 | ✅ SOBREVIVE (25 min) |
| 21 | Voz de MADRE (modo escucha) | #8 | ✅ SOBREVIVE (55 min) |
| 22 | Mini-historia por rama (capítulos) | #11 | ❌ DESCARTADO por verificación adversarial — showInfo() YA pinta nace/prog/benef/juicio íntegros en el mismo panel (L1399-1423); el bloque repetiría los mismos datos en la misma vista («consolida, no multiplica») |
| 23 | Consecuencia visible de propuestas | #10 | ✅ SOBREVIVE (25 min, requiere MCP Supabase) |
| 24 | Espejo del visitante (tu recorrido) | #7 | ✅ SOBREVIVE (60 min) |
| 25 | Multi-capa de audiencias (niño/ingeniero/investigador) | #8 | ❌ DESCARTADO — la versión barata YA existe (explicación en capas .s + details + glosario, v0.9/v0.11); el delta real = re-autoría masiva ×3 voces, no cabe en incrementos de 30-90 min |
| 26 | Niebla de exploración (fog of war del mapa) | #12 | ❌ DESCARTADO — contradice el gate escrito «Mapa autoexplicativo: las 8 ramas se entienden SIN abrirlas» (CALIDAD_FINAL_WEB, tabla de gates) |
| 27 | Credibilidad computable (score de predicciones) | #10 #11 | ❌ DESCARTADO — denominador insuficiente (4 predicciones resueltas < 6-8 mínimas, documentado); computar el score hoy violaría honestidad §9 |
| 28 | Grafo total de dependencias entre ramas | #4 | ❌ DESCARTADO — YA implementado (v0.38: 6 conexiones reales; v0.49: animación de flujo); el delta = declarar nuevas relaciones reales, que es contenido, no sistema |
| 29 | Comparador vivo IA-normal-vs-MADRE | #5 | ❌ DESCARTADO — versión viva = coste API (gate dinero); la estática YA existe (tarjeta ⚖️, v0.33) |
| 30 | Código en vivo dentro de la web | #3 | ❌ DESCARTADO — YA existe (🔦 «Hoy, de verdad» con commits reales 24h + evidencia cruda enlazada, v0.33) |
| 31 | Deep-links de estado compartibles | #10 | ❌ DESCARTADO — YA existe (#mapa compartible); el delta es marginal y común (no mueve «nunca vi una web así») |
| 32 | A11y-espectáculo (modos de lectura con estilo) | #8 | ❌ DESCARTADO — YA sólido y verificado (v0.34 lote a11y + auditoría: «Accesibilidad y Rendimiento ya estaban sólidos») |
| 33 | PWA instalable/offline con avisos | #7 | ❌ DESCARTADO — invisible en la primera visita: no responde a la pregunta del ejercicio (impacto percibido del visitante); push exige permisos+backend |
| 34 | Máquina del tiempo (scrubber del pasado) | #3 #9 | ❌ FUSIONADO con #7 modo película — mismos datos (cambios[]), misma superficie de UI («consolida, no multiplica») |

Los 12 paradigmas referenciados son los de `CALIDAD_FINAL_WEB.md` (crítica externa 10-jul, triada).
Nota de honestidad del conteo: los sistemas 1, 2, 3, 6, 13 y 14 NO son malos — son los de MÁS impacto de la lista;
se descartan para ESTA fase porque chocan con restricciones vigentes o exigen a Tony. Si Tony levanta una
restricción, se re-evalúan (condición de revisita: este mismo fichero).

## LOS 17 SUPERVIVIENTES — primer incremento de cada uno, en orden de ejecución

---

### 1. Génesis — la web se construye delante de ti (solo 1ª visita) · ~55 min

**Efecto que produce:** La primera visita ve la web ENSAMBLARSE delante de sus ojos (~4-6s, con botón saltar); las siguientes visitas no ven nada.

**⚖️ Ajustes del juez (Fable) — vinculantes:** Debe convivir con el saludo de visita (cm_visitas_v1) y el tour (cuaderno_tour_seen): génesis corre PRIMERO y solo en 1ª visita; no duplicar keys — usar cm_genesis_v1.

**Qué existe ya cerca (no duplicar):** Ninguno. Grep de "typewriter|génesis|genesis|ensambl|stagger|se construye" en todo el archivo no encontró ningún sistema de "construcción en 1ª visita" existente — solo hay dos mecanismos de datos (no de animación) que suenan parecidos pero son otra cosa: (1) cm_visitas_v1 (línea 971) = contador de visitas que cambia un TEXTO de saludo, sin animación; (2) chip #chipVeredicto = cuenta atrás a la próxima fecha juzgada. Ninguno anima nada ni usa localStorage como interruptor de "solo primera vez para efecto visual". Vía libre.

**Anclas verificadas (usa el patrón grep; la línea es orientativa):**

| Qué | Patrón grep | Línea aprox |
|-----|-------------|-------------|
| Punto de inserción: IIFE + <style> nuevos van justo antes de </body>, después del último script existente (mapFab) | `grep -n "</body>" index.html` | 6278 |
| Último script existente (#mapFab, patrón try/catch/console.warn a copiar tal cual) | `grep -n 'id="mapFab"' index.html` | 6261 |
| Patrón reduced-motion exacto a copiar (var reduce=false; try{matchMedia...}catch) | `grep -n "prefers-reduced-motion:reduce).matches" index.html` | 6201 |
| Plantilla de flag one-shot en localStorage (check-y-marca) ya usada en el archivo, para el nuevo cm_genesis_v1 | `grep -n "cm_map_done_v1" index.html` | 1693 |
| Mecanismo YA existente de contador de visitas (cm_visitas_v1) — NO reutilizar como key propia del génesis, para no acoplarlo; usar cm_genesis_v1 aparte | `grep -n "cm_visitas_v1" index.html` | 971 |
| Contenedor #onboard con la 'historia' — .ob-hi (frase 1, sin HTML interno) | `grep -n 'ob-hi' index.html` | 326 |
| .ob-big (frase 2, contiene <b>) dentro de #onboard | `grep -n 'class="ob-big"' index.html` | 327 |
| .ob-q (frase 3, contiene <b>) dentro de #onboard | `grep -n 'class="ob-q"' index.html` | 328 |
| Chips del hero: contenedor .chips con 5 <span class="chip"> a animar en cascada | `grep -n 'class="chips"' index.html` | 377 |
| .hero / .scoreRow (el marcador 3/10) si se incluye en la fase de ensamblaje | `grep -n 'class="hero"' index.html` | 366 |
| Función cssPath (ancla los corazones 💗 por nth-of-type) — confirma que insertar FUERA de .wrap y al final del body no la afecta | `grep -n "nth-of-type" index.html` | 3342 |
| Lista de selectores 'likeables' (.hero y .chip lo son) — sin riesgo porque en 1ª visita aún no existe cm_likes_v1 | `grep -n "senalItem,.card,.hero" index.html` | 3400 |
| #visitLine (saludo de vuelta) se inyecta dentro de #onboard tras el arranque — roce de MENSAJE (redundancia leve), no de mecanismo, con la historia del génesis | `grep -n 'id="visitLine"' index.html` | 976 |

**Pasos de implementación y verificación (del verificador):**

VIABLE, no toca ninguna zona prohibida: no hay mapa/SVG/pan-zoom, no inserta ni reordena .card (todo el trabajo es sobre #onboard/.hero, que están ANTES de la primera tarjeta y fuera de la cadena nth-of-type que ancla los 💗), no enlaza ASMR/caos, y no inventa ningún dato (solo anima texto real ya presente en el HTML).

IMPLEMENTACIÓN (justo antes de </body>, línea 6278):
1. IIFE nuevo (mismo patrón try/catch que el de #mapFab, línea 6261): comprobar reduce (copiar patrón L.6201) → si reduce=true, no tocar nada y salir (así "todo visible al instante" sale gratis, sin código extra). Comprobar/marcar localStorage "cm_genesis_v1" (plantilla L.1693); si ya existía, salir sin animar.
2. Solo si primera visita Y no-reduce: ocultar con opacity/transform inline (NO clases CSS globales, para no arriesgar nada fuera de este bloque) .ob-hi/.ob-big/.ob-q (L.326-328), .scoreRow (dentro de .hero, L.366-370) y los 5 .chip (L.377-383). Crear un <button id="cmGenSkip"> fixed, texto "saltar ⏭", visible desde el primer frame (se crea en el mismo tick que se ocultan los demás).
3. Typewriter SOLO en las 3 frases: capturar el innerHTML original de cada una (ojo: .ob-big/.ob-q llevan un <b> interno — tipear con textContent plano y, al terminar cada frase, restaurar el innerHTML original para recuperar el negrita; es una simplificación de 1 línea, aceptable para v1). Encadenar frase1→frase2→frase3→score→chips en cascada (setTimeout), total ~4-6s.
4. El botón "saltar" y CUALQUIER click deben poder abortar a medio camino: función única finishNow() que limpia todos los timers y deja todo en su estado final real (mismo patrón que clearPropose() en el mapa, línea ~1500 — abortar por UNA sola función, no por N banderas sueltas).

ROCE DETECTADO (no bloqueante, decisión de diseño): #visitLine ("👀 es tu primera visita...", línea 976) se inyecta dentro de #onboard ANTES de que corra este nuevo IIFE (ese script está en la línea ~901-983, mucho antes en el documento) — por tanto ya estará visible y sin animar, repitiendo el mensaje "primera visita" MIENTRAS la historia de arriba todavía se está escribiendo. No rompe nada (keys de localStorage distintas, no hay colisión de datos), pero es redundante. Recomendación: añadir #visitLine al mismo array de elementos ocultos/revelados (se revela justo después de los chips) para que no aparezca "adelantado".

VERIFICACIÓN sin preview_screenshot (cuelga en esta página, ver PLAYBOOKS del propio repo):
- `localStorage.removeItem('cm_genesis_v1')` + recargar → eval inmediato: `getComputedStyle(document.querySelector('#onboard .ob-hi')).opacity` debe ser "0" o intermedio; a los ~6s debe ser "1" y `document.getElementById('cmGenSkip')` debe ser null.
- Recargar una 2ª vez (ya con la key puesta) → eval: opacity de .ob-hi/.chip debe ser "1" desde el primer instante (sin fase oculta) y no debe crearse #cmGenSkip.
- Click en "saltar" a medio tipeo → eval: los 3 párrafos deben tener su textContent/innerHTML COMPLETO y original (con <b>), no cortado.
- Consola limpia (0 errores) tras las 3 pruebas de arriba.
- No hace falta tocar reduce de verdad en este entorno (el navegador de Tony ya lo tiene ON en producción); basta verificar por lectura de código que el `if(reduce) return;` está ANTES de cualquier ocultamiento — así el peor caso es "no pasa nada" (fail-safe), nunca contenido invisible atascado.

Repo limpio (git status sin cambios sin commitear) al momento de esta revisión — sin riesgo de colisión con otra sesión activa ahora mismo, pero re-verificar con `git status` justo antes de editar (regla anti-colisión del propio repo).

---

### 2. Organismo visual de datos reales (fondo generativo) · ~60 min

**Efecto que produce:** Fondo generativo sutil: una partícula por cada cambio REAL documentado (cambios[].length), derivando lentamente en la zona de cabecera y márgenes.

**⚖️ Ajustes del juez (Fable) — vinculantes:** Colocación corregida por el verificador: los fondos de .hero/.card son OPACOS — el canvas solo se ve en #onboard (gradiente 72% transparente) y en los márgenes de .wrap. Objetivo realista: efecto sutil en la CABECERA, no un fondo de página entero. Insertar el <canvas> con document.body.appendChild (tag único, no rompe nth-of-type). Colores desde var(--accent) vía getComputedStyle (hay dark mode real, línea ~3905).

**Avisos del verificador:**
- NO usar <div> si el elemento se inserta entre paneles existentes: el propio DESARROLLO_CUADERNO.md (línea 39) ya documenta que <div> nuevo ahí rompe el nth-of-type de los corazones. Con <canvas> (tag que no se repite en el documento) es seguro insertarlo en CUALQUIER punto del DOM — confirmado por el propio cssPath (línea 3341: nth-of-type es POR TAG). Recomendado: no insertarlo 'entre' nada, sino con document.body.appendChild al final, exactamente como el patrón ya usado para los corazones (línea 3327).
- El efecto será prácticamente invisible DETRÁS de .hero/.card porque esos fondos son OPACOS (var(--card)=#fff, línea 68/42). Solo se verá donde el fondo real (var(--bg), línea 34) queda expuesto: los ~14-16px de padding lateral de .wrap (que no tiene fondo propio, línea 37) y el área semi-transparente de #onboard (gradiente a 72% transparent, línea 267) — que es justo la 'cabecera' literal. Es sutil a propósito (coherente con v0.40 'el mapa respira'), pero si se esperaba un efecto vistoso ocupando visualmente el hero, no va a pasar sin aflojar la opacidad de .hero/.card, y ESO no está pedido y sería mayor alcance/riesgo.
- Colores: leer con getComputedStyle(document.documentElement).getPropertyValue('--accent') en vez de hardcodear hex — hay dark mode real (@media prefers-color-scheme:dark en línea 3905) y un hex fijo rompería contraste ahí.
- Usar un global propio sin colisión (p.ej. window.__cmOrganism) — ya existen window.__asmr, window.__hamSpin, window.__cmVersion, etc.
- Checklist propio del proyecto (DESARROLLO_CUADERNO.md líneas 7-12), no opcional: node --check del script nuevo, probar en navegador real con 0 errores de consola (preview_screenshot SE CUELGA en esta página, ya documentado — usar preview_eval/preview_console_logs), añadir una entrada nueva al array cambios[] (v0.50) y subir window.__cmVersion a "v0.50", y anotar cualquier lección nueva en el propio DESARROLLO_CUADERNO.md.

**Qué existe ya cerca (no duplicar):** Ninguno. grep de "partic|drift|generativ" en todo el fichero → 0 resultados. Los 3 <canvas> que SÍ existen (líneas 3538, 3603, 4617/4635) son el lienzo de dibujo (#dbjsCanvas) y utilidades de recorte/exportación de imagen — nada de fondo animado ni sistema de partículas. No hay nada que duplicar.

**Anclas verificadas (usa el patrón grep; la línea es orientativa):**

| Qué | Patrón grep | Línea aprox |
|-----|-------------|-------------|
| window.__cmCambiosMeta YA expone {count, oldest} — basta el count, NO hace falta exponer la lista completa (responde la duda del propio incremento) | `window\.__cmCambiosMeta=` | 3100 |
| Array cambios[] — fuente del count real; no tocar salvo para anteponer la entrada de changelog v0.50 del propio incremento | `var cambios=\[` | 3033 |
| Patrón EXACTO de guard reduced-motion a copiar (mismo estilo usado 10+ veces en el fichero, este es el precedente más reciente/cercano) | `matchMedia\('\(prefers-reduced-motion:reduce\)'\)` | 6201 |
| Patrón EXACTO de pausa/resume con visibilitychange a copiar (mismo IIFE que el anterior, es literalmente el último script antes de </body>) | `visibilitychange.*document.hidden.*stop` | 6210 |
| cssPath: nth-of-type se calcula POR TAG entre hermanos — confirma que <canvas> (tag nuevo) no descoloca ningún corazón guardado, se inserte donde se inserte | `same.push\(c\)` | 3341 |
| Lección ya escrita en DESARROLLO_CUADERNO.md: usaron <aside> (tag no-div) a propósito para insertar 'entre paneles' sin romper nth-of-type — mismo principio aplica a <canvas> | `usa <aside> a propósito` | 39 |
| Patrón EXACTO para añadir una capa nueva sin tocar el DOM existente: crear elemento + document.body.appendChild (igual que fab/hint/layer de los corazones) | `document.body.appendChild\(fab\)` | 3327 |
| Punto de inserción del nuevo <script>: justo antes de este cierre, es la última pieza del body | `</body>` | 6278 |
| Fondo real de body (var(--bg), gris claro) — donde el canvas SÍ se verá, a diferencia de .hero/.card | `body\{margin:0;background:var\(--bg\)` | 34 |
| .wrap no tiene fondo propio (hereda body) y limita el ancho a 760px — el margen lateral es donde el canvas asoma en pantallas anchas | `\.wrap\{max-width:760px` | 37 |
| #onboard (la cabecera real, h1+texto) tiene fondo semi-transparente al 72% — el único sitio donde el canvas se verá detrás de texto, no solo en márgenes | `#onboard\{background:linear-gradient` | 267 |
| Variable de color a leer con getComputedStyle (NO hardcodear hex) para respetar el dark mode real que ya existe | `--accent:#3b6ef5` | 26 |
| Dark mode real activo — verificar el efecto también aquí | `@media \(prefers-color-scheme:dark\)` | 3905 |
| Versión visible a subir tras el incremento (v0.49→v0.50), mismo patrón que las 12 versiones anteriores del mismo día | `window.__cmVersion="v0.49"` | 5856 |

**Pasos de implementación y verificación (del verificador):**

REFUTACIÓN INTENTADA — no rompe nada: (a) no toca onNodeClick/routeTap/nodeAtPoint/focusBranch ni la cadena de transform del SVG del mapa (viven en otro bloque de script, ~1140-1500, ni se acercan); (b) no inserta NADA "entre" tarjetas — <canvas> es un tag que no se repite, así que el hook document.body.appendChild al final del body es 100% seguro para el anclaje nth-of-type de los corazones (confirmado con el propio código y con la lección ya escrita por el proyecto en su changelog v0.38/DESARROLLO_CUADERNO.md línea 39); (c) el dato (N=63 entradas hoy, grep "{fecha:"2026" cuenta 63) ya existe y ya está expuesto, cero llamadas nuevas; (d) no toca ASMR ni modo caótico. Único matiz real: "detrás de la cabecera/hero" es más honesto llamarlo "detrás del fondo de la página" — el efecto solo asoma donde .hero/.card no cubren (márgenes de .wrap y el #onboard semi-transparente), porque esas tarjetas son opacas. Es coherente con la estética "sutil" ya establecida (v0.40), no un fallo del plan.

PASOS DE IMPLEMENTACIÓN (2-5 líneas):
1. Justo antes de `</body>` (línea 6278) añadir un <script> nuevo: crear `canvas` (id="cmBgCanvas"), CSS inline `position:fixed;inset:0;width:100vw;height:100vh;z-index:-1;pointer-events:none`, `document.body.insertBefore(canvas, document.body.firstChild)` (da igual el punto real por ser fixed).
2. N = `(window.__cmCambiosMeta && window.__cmCambiosMeta.count) || 20` (fallback honesto si el meta aún no cargó); generar N puntos con posición/velocidad aleatoria dentro del viewport.
3. Loop con rAF throttleado (dibujar 1 de cada 3 frames, ~20fps): mover puntos despacio, dibujar líneas tenues (alpha bajo, opacity ~.12-.18) solo entre pares a <120px, color leído una vez con getComputedStyle(--accent).
4. Guard: si matchMedia reduced-motion → dibujar UN frame estático (sin bucle) y salir. Guard document.hidden vía visibilitychange (copiar línea 6210) para pausar/reanudar el rAF.
5. Añadir entrada nueva al array cambios[] (antes de la línea 3034, v0.49) describiendo v0.50, y cambiar window.__cmVersion (línea 5856) a "v0.50".

VERIFICACIÓN SIN preview_screenshot (se cuelga en esta página, ya documentado en DESARROLLO_CUADERNO.md línea 41):
- `node --check` sobre el bloque de script nuevo extraído a un .js temporal.
- preview_console_logs → 0 errores tras cargar.
- preview_eval: `document.getElementById('cmBgCanvas').getBoundingClientRect()` (confirma que cubre el viewport) + `getComputedStyle(document.getElementById('cmBgCanvas')).zIndex` (confirma -1) + `window.__cmCambiosMeta.count` (confirma que el N usado es el real, no inventado).
- preview_eval con reduced-motion forzado (matchMedia mock o preview_resize+colorScheme no cubre reduced-motion directamente; alternativa: leer en consola si el código realmente comprobó `matchMedia('(prefers-reduced-motion:reduce)').matches` — Tony YA tiene esto ON en su navegador real, así que basta confirmar que el código NO entra en el bucle rAF cuando `reduce===true`, inspeccionando que no haya `setInterval`/rAF activo vía `window.__cmOrganism.isOn()` expuesto igual que `window.__hamSpin.isOn()` en línea 6211 — mismo patrón, cópialo).
- Pixel real: `document.getElementById('cmBgCanvas').getContext('2d').getImageData(x,y,1,1).data` en una coordenada del margen lateral tras forzar un draw, para probar que SÍ se pintó algo no-transparente ahí (evita la trampa de "el canvas existe pero no dibuja nada").

---

### 3. Modo película — los últimos 30 días en 30 segundos · ~65 min

**Efecto que produce:** Botón «▶ 30 días en 30s» en la tarjeta Evolución: overlay que reproduce el changelog real como secuencia animada con barra de progreso.

**⚖️ Ajustes del juez (Fable) — vinculantes:** OJO sincronía (cazado por el verificador): loadCambios() puede sustituir el changelog visible por datos de Supabase sin tocar el array `cambios` original. Exponer la LISTA VIVA en el mismo IIFE (window.__cmCambios) y, si loadCambios sustituye, re-exponer la lista sustituida. Filtro 30 días con new Date(c.fecha) aunque hoy todo el array quepa en la ventana.

**Avisos del verificador:**
- El plan del ticket propone ampliar __cmCambiosMeta con la lista completa — funciona pero tiene un bug de sincronía: loadCambios() puede sustituir el changelog visible por datos de Supabase (CUADERNO_CAMBIOS.tsv) sin tocar la variable `cambios` original, así que exponer `cambios` (el array baked) puede quedar DESINCRONIZADO de lo que el visitante ve realmente en #changelog. Solución más segura (mismo espíritu, sin ese riesgo): añadir la exposición DENTRO de la función renderCambios(list) — así window.__cmCambiosFull siempre refleja exactamente lo último renderizado, venga del array baked o de Supabase. Es un cambio de 1 línea sobre una función ya existente, cero llamadas nuevas, cero recálculo — no es un blocker duro, pero el ejecutor DEBE usar este anclaje y no el que sugiere el ticket literalmente.
- El array `cambios` solo tiene fecha (string 'YYYY-MM-DD'), no hay campo timestamp extra — para filtrar '30 días' hay que parsear c.fecha con `new Date(c.fecha)` y comparar contra Date.now()-30*86400000; ahora mismo (10-jul-2026) TODO el array cabe en <20 días así que el filtro no recorta nada visible hoy, pero debe implementarse igualmente para que sea honesto a futuro (si no, en unas semanas 'los últimos 30 días' mostraría entradas de hace 2 meses).

**Qué existe ya cerca (no duplicar):** NO hay duplicado exacto (grep 'pelicula|película|autoplay|30s|30 días|timeline' = 0 resultados). Lo MÁS cercano es v0.38 (línea ~1873-1875): un badge estático que dice 'Desde tu última visita, MADRE cambió N veces' usando window.__cmCambiosMeta — pero solo muestra un CONTADOR, no reproduce las entradas en secuencia animada. No se solapa con el incremento propuesto, es complementario (mismo dato, uso distinto).

**Anclas verificadas (usa el patrón grep; la línea es orientativa):**

| Qué | Patrón grep | Línea aprox |
|-----|-------------|-------------|
| Array privado de la Evolución (dentro del IIFE que arranca en la línea 2564 y cierra en 3262) | `var cambios=\[` | 3033 |
| Función que renderiza el changelog — AQUÍ es donde hay que añadir 1 línea `try{ window.__cmCambiosFull=list; }catch(e){}` (al principio del cuerpo), NO tocar el bloque __cmCambiosMeta existente (línea 3100) que ya cubre otro consumidor y no hay que duplicar su lógica | `function renderCambios\(list\)\{` | 2975 |
| Las 2 únicas llamadas a renderCambios (confirman que la exposición cubrirá tanto el array baked como el fetch de Supabase, sin duplicar código) | `renderCambios\(cambios\)\|renderCambios\(list\)` | 3111 |
| Precedente ya existente del mismo patrón de exposición segura (v0.26): comentario + window.__cmCambiosMeta — léelo para mantener el mismo estilo de comentario/justificación, pero el nuevo dato completo va en renderCambios, no aquí | `window\.__cmCambiosMeta=\{count:cambios\.length` | 3100 |
| Tarjeta Evolución — título de la card (para ubicarla) y el ÚLTIMO hijo real del .body donde insertar el botón nuevo (después de este div, ANTES del cierre '</div></details>' de la línea 2372) — insertar AL FINAL, nunca antes, para no romper nth-of-type de corazones anclados dentro de esta tarjeta | `data-card="12\. Evoluci` | 2371 |
| Mecanismo real de anclaje de corazones por nth-of-type (confirma que insertar al final de .body es seguro; insertar ANTES de un hijo existente desplazaría índices y rompería corazones guardados en localStorage de visitantes reales) | `nth-of-type\("\+\(same\.indexOf\(el\)\+1\)` | 3342 |
| Overlay MÁS SIMPLE ya existente para copiar como patrón — 'overlay ligero' (sin pan/zoom, sin focus-trap, sin inert de hermanos, solo backdrop+Esc+botón cerrar): úsalo, NO #ov (atado al form de feedback) ni #mapBig-ov (pan/zoom/inert — restricción 1 lo prohíbe tocar igualmente) | `id="cmvOv"\|#cmvOv\{` | 5280 |
| CSS del overlay simple a clonar/adaptar (display:none + .clase-show{display:flex}, backdrop, card centrada, botón × arriba-dcha) — cambia el nombre de las clases (cmv-* está usado en otro sitio, no reutilizar el mismo prefijo) | `#cmvOv\{position:fixed;inset:0;z-index:9200` | 5220 |
| Guard de reduced-motion, patrón repetido en todo el fichero (usar EXACTAMENTE esta forma, ya probada) — con reduce=true: no montar el setInterval de autoplay, mostrar solo botones Siguiente/Anterior | `matchMedia\("\(prefers-reduced-motion:reduce\)"\)\.matches` | 906 |
| Helper `el(tag,cls,txt)` con textContent (no innerHTML/esc) — patrón a copiar para construir cada fotograma del overlay de forma segura sin depender del esc() local de otra IIFE (ese esc vive en el scope de la línea 2564-3262, no accesible desde una IIFE nueva más abajo) | `function el\(tag,cls,txt\)` | 5254 |
| Delegación de click de feedback — confirma que un botón SIN atributo data-fb (el nuestro) no dispara el modal de feedback por accidente, así que puede vivir dentro de un div.fb sin conflicto | `e\.target\.closest\("\[data-fb\]"\)` | 2744 |

**Pasos de implementación y verificación (del verificador):**

IMPLEMENTACIÓN (5 pasos, ~65 min): (1) En renderCambios (línea 2975), añadir como primera línea del cuerpo: try{ window.__cmMovieData=list.slice(); }catch(e){} — usar slice() por higiene aunque sea solo una referencia, no cambia el coste (cero llamadas nuevas, dato ya calculado). (2) Insertar el botón en la línea 2371 (después de ese div, antes del cierre en 2372): un <div class="fb" style="margin-top:8px"><button type="button" class="btn sm" id="cmMovieBtn">🎬 Ver 30 días en 30s</button></div>. (3) Nueva IIFE independiente (colocarla cerca de la de #cmvOv, p.ej. justo después de la línea 5334, para mantener juntas las funciones 'ligeras' del cuaderno): crea #cmMovieOv (backdrop) + #cmMovieCard con: barra de progreso (<div class="cmMovieBar"><i></i></div>), zona de fecha+título+detalle (3 spans con textContent), botones ⏮ Anterior / ⏭ Siguiente / Saltar al final / × Cerrar. (4) Al pulsar #cmMovieBtn: leer window.__cmMovieData||[], filtrar por fecha ISO dentro de últimos 30 días (new Date(c.fecha) >= Date.now()-30*86400000), ORDENAR cronológico ascendente (el array ya viene descendente — usar slice().reverse()) para que la 'película' avance del pasado al presente. Si reduce===true: mostrar el primer fotograma y los botones ⏮/⏭ sin arrancar timer. Si reduce===false: setInterval (p.ej. cada 1500-2000ms) que avanza índice y actualiza barra vía requestAnimationFrame de %, hasta el último; al terminar, detener el interval (no cerrar solo, deja el último fotograma visible con opción de cerrar). Esc y clic en backdrop cierran (mismo patrón que cmvOv, línea 5284+5332). (5) 'Saltar' = clearInterval + saltar directamente al último índice. VERIFICACIÓN SIN preview_screenshot (se cuelga en esta página): usar mcp__Claude_Browser__preview_eval con expresiones tipo (a) `document.getElementById('cmMovieBtn')!==null` tras cargar la página; (b) simular clic vía `document.getElementById('cmMovieBtn').click()` y comprobar `document.getElementById('cmMovieOv').classList.contains(<claseShow>)`; (c) comprobar `window.__cmMovieData.length>0` y que coincide con `document.querySelectorAll('#changelog>div').length`; (d) para forzar la rama reduced-motion sin depender del navegador de prueba, sobrescribir ANTES del clic: `window.matchMedia=function(q){return {matches:true};}` (válido porque el código debe leer matchMedia en el momento del clic, no cachearlo al cargar la página — anclar el guard DENTRO del click handler, no en el top-level del IIFE, para que este truco de test funcione); luego click y comprobar que NO existe ningún setInterval corriendo (p.ej. exponer un flag window.__cmMovieTimerOn para poder leerlo desde el test, patrón ya usado en el fichero con otros __ prefijos) y que los botones ⏮/⏭ están visibles vía getBoundingClientRect().width>0. (e) revisar consola con mcp__Claude_Browser__preview_console_logs level:'error' tras el clic para pillar excepciones silenciosas. RESTRICCIONES verificadas OK: (1) cero contacto con onNodeClick/routeTap/nodeAtPoint/focusBranch/SVG — todo el feature vive fuera del mapa; (2) inserción SOLO al final de .body de la tarjeta 12, nunca entre tarjetas ni antes de hijos existentes — no rompe corazones anclados por nth-of-type; (3) cero contacto con ASMR/audio ni con el modo caótico; (4) 100% datos reales ya cargados (mismo array que ya se muestra en pantalla, cero invención, cero llamada nueva); (5) guard reduced-motion explícito con rama manual sin autoplay, siguiendo el patrón exacto ya usado 15+ veces en el fichero.

---

### 4. Presencia compartida — cuántos exploran ahora mismo · ~60 min

**Efecto que produce:** La cabecera dice cuántas personas están explorando AHORA MISMO (Supabase Realtime Presence, anónimo, uuid efímero).

**⚖️ Ajustes del juez (Fable) — vinculantes:** PASO 0 obligatorio: test runtime de Presence en el preview (channel de prueba + .track() + evento sync en consola). Si Presence no funciona con la publishable key, SALTAR este sistema y anotarlo (la verificación por grep solo pudo INFERIR que funciona). Copy: no reutilizar la palabra «Ahora mismo:» — #obLive ya la usa para otra cosa (usar «explorando ahora: tú / tú y N más»). Canal nuevo único (p.ej. 'cuaderno-presence-rt').

**Avisos del verificador:**
- AMBIGUEDAD del propio encargo: el 'indicador vivo de cabecera' (#obLive, linea 329) YA muestra 'Ahora mismo: <actividad de MADRE>' desde v0.42 (lineas 1173-1178). Si se pega el texto de presencia como 'ahora mismo: tu y N mas' colisiona semanticamente con el 'Ahora mismo:' ya existente en el MISMO parrafo (dos cosas distintas usando la misma palabra). Hay que redactar el añadido como 'aquí ahora: tú' / 'aquí ahora: tú y N más' (evitar repetir literalmente 'ahora mismo'), y APPENDear DENTRO de #obLive (no crear un <p> hermano nuevo) para no arriesgar nada de nth-of-type.
- Presence de Supabase Realtime NO se puede verificar al 100% solo con grep: el fichero prueba que postgres_changes YA funciona con la publishable key (canales 'mpt-rt' y 'comments-rt', lineas 671 y 3732), lo que hace MUY probable que Presence tambien funcione (mismo cliente, mismo transporte websocket), pero es una inferencia, no una prueba directa de que el proyecto no tenga 'Realtime Authorization' activada para canales privados. Toca verificarlo EN VIVO tras desplegar (2 pestañas + consola), no darlo por hecho.
- Hay que usar un NOMBRE DE CANAL nuevo y unico ('cuaderno-presence-rt' o similar) — ya existen 'mpt-rt' (linea 671) y 'comments-rt' (linea 3732); reutilizar uno de esos por error mezclaria los payloads de postgres_changes con los de presence.

**Qué existe ya cerca (no duplicar):** NO es un duplicado exacto, pero hay un mecanismo HERMANO que hay que diferenciar en el copy: el 'Contador de visitas' (boton flotante #cmvFab, linea 5214-5264) ya muestra 'personas han abierto el cuaderno' via RPC bump_counter sobre una tabla counters — pero es un TOTAL HISTORICO acumulado (una vez por sesion via sessionStorage), NO gente conectada AHORA MISMO. El incremento propuesto (Presence) es complementario, no redundante — pero el texto debe dejar claro que son 2 numeros distintos (total-de-siempre vs concurrentes-ahora) o el visitante se lia entre '#cmvFab dice 47' y 'obLive dice tu y 2 mas'.

**Anclas verificadas (usa el patrón grep; la línea es orientativa):**

| Qué | Patrón grep | Línea aprox |
|-----|-------------|-------------|
| Confirma supabase-js v2 (createClient) y que window.__sb ya expone el cliente — v2 soporta Presence (.channel(...).on('presence',...).track()). | `import { createClient } from "https://esm.sh/@supabase/supabase-js@2"` | 3467 |
| window.__sb queda expuesto globalmente tras crear el cliente — punto de enganche para cualquier script posterior. | `try{ window.__sb=sb; }catch(e){}` | 3471 |
| Prueba de que Realtime YA funciona con la publishable key hoy (2 canales postgres_changes activos); usar nombres de canal DISTINTOS a estos. | `\.channel\(` | 671 |
| Segundo canal realtime existente ('comments-rt') — mismo patron .channel().on().subscribe(), confirma el idioma del codebase para el nuevo canal de presence. | `sb.channel("comments-rt").on("postgres_changes"` | 3732 |
| El indicador vivo de cabecera: <p class="ob-live" id="obLive" hidden></p> — destino del texto de presencia. | `id="obLive"` | 329 |
| Script que puebla #obLive UNA SOLA VEZ al cargar (live.innerHTML="" + appendChild) — no se vuelve a ejecutar despues, asi que es seguro APPENDear contenido adicional desde un script posterior en el documento. | `var live=document.getElementById("obLive")` | 1175 |
| CSS del punto que late en #obLive, YA con guard de prefers-reduced-motion — reutilizable para el punto de presencia sin escribir CSS nuevo. | `.ob-live .dot{width:8px` | 309 |
| Guard reduced-motion ya aplicado a ese mismo dot (patron a copiar si se anima algo nuevo). | `@media(prefers-reduced-motion:reduce){.ob-live .dot{animation:none}}` | 311 |
| Mecanismo de anclaje de corazones por nth-of-type: los elementos CON id (como #obLive) se anclan por '#id' y son INMUNES a insertar hermanos nuevos; los que NO tienen id se anclan por posicion entre hermanos del mismo tag y SI se rompen si insertas un hermano nuevo antes. Por eso: appendear DENTRO de #obLive, nunca crear un <p> hermano nuevo en #onboard. | `nth-of-type` | 3336 |
| Patron local ya usado en el fichero para esperar a que window.__sb exista antes de usarlo (poll cada 400ms, timeout ~25 intentos) — replicar este micro-patron en el nuevo script (no hay una funcion global compartida, cada bloque <script> declara su propio waitSb local). | `function waitSb(cb,err){ if(window.__sb)` | 5255 |
| Confirma que M.ahora esta hardcodeado y siempre truthy, por lo que #obLive.hidden ya queda en false de forma fiable (no hay caso borde donde #obLive permanezca oculto). | `ahora:"🛡️"` | 1074 |

**Pasos de implementación y verificación (del verificador):**

IMPLEMENTACION (2-5 pasos): (1) Nuevo <script> al final del body (despues de la linea ~3733, tras el modulo que fija window.__sb), envuelto en try/catch fail-open como el resto del fichero. (2) Poll local a window.__sb (copiar el patron de la linea 5255, ~5 lineas). (3) Generar uid efimero: var uid=(crypto.randomUUID?crypto.randomUUID():('a'+Math.random().toString(36).slice(2)+Date.now())) — cero dato personal, no se persiste en localStorage (sessionStorage opcional para sobrevivir un refresh en la misma pestaña). (4) var ch=sb.channel('cuaderno-presence-rt',{config:{presence:{key:uid}}}); ch.on('presence',{event:'sync'},function(){ var n=Object.keys(ch.presenceState()).length; paint(n); }).subscribe(function(st){ if(st==='SUBSCRIBED') ch.track({at:Date.now()}); }); (5) function paint(n){ var live=document.getElementById('obLive'); if(!live) return; var old=document.getElementById('obPresSpan'); if(old) old.remove(); var sp=document.createElement('span'); sp.id='obPresSpan'; sp.textContent=' · '+(n<=1?'aquí ahora: tú':'aquí ahora: tú y '+(n-1)+' más'); live.appendChild(sp); } — esto SOLO appendea dentro de #obLive (ya tiene id, cero riesgo nth-of-type), no toca el SVG del mapa, no toca ASMR/caotico, y el numero es 100% real (tamaño real de presenceState(), no inventado). Si se quiere el puntito animado, reusar la clase '.dot' ya existente (linea 309) en vez de crear CSS nuevo — el guard reduced-motion ya viene incluido. VERIFICACION SIN preview_screenshot (se cuelga en esta pagina): abrir la pagina en 2 pestañas/perfiles del navegador y, en la consola de CUALQUIERA de las dos, ejecutar `document.getElementById('obLive').textContent` — debe leerse '...· aquí ahora: tú y 1 más' en ambas; cerrando una pestaña y esperando el timeout de presencia (segundos), la otra debe volver a 'aquí ahora: tú'. Tambien `window.__sb.getChannels().map(c=>c.topic)` debe listar 'realtime:cuaderno-presence-rt' junto a los 2 canales existentes, confirmando que no hay colision de nombre. RIESGO PRINCIPAL no cubribible por grep: si el proyecto Supabase tuviera 'Realtime Authorization' (canales privados) activada, la subscripcion de presence podria fallar en silencio — pero la evidencia de que 'mpt-rt' y 'comments-rt' YA funcionan con la misma publishable key hace esto improbable; aun asi, es el unico punto que exige prueba en vivo, no solo lectura de codigo.

---

### 5. Reliquia compartible — imagen generada con tus datos reales · ~75 min

**Efecto que produce:** Al completar las 8 ramas, la celebración ofrece «guardar recuerdo»: imagen 1080×1080 generada en canvas con TUS datos reales, descargable/compartible.

**Qué existe ya cerca (no duplicar):** Ninguno funcional. Grep de \"recuerdo|reliquia|toBlob|toDataURL|navigator.share|createElement(\\\"canvas\\\")\" solo encuentra canvas usado en OTRAS 3 features ya existentes (compresión de imagen al subir feedback L3537, recorte de imagen L3603, envío de dibujos a Supabase L4759) — mismo estilo de código a reutilizar, pero ninguna genera una imagen descargable con datos del experimento. navigator.share no aparece en ningún sitio del fichero: es la primera vez que se usaría.

**Anclas verificadas (usa el patrón grep; la línea es orientativa):**

| Qué | Patrón grep | Línea aprox |
|-----|-------------|-------------|
| Función que recalcula la celebración/desbloqueos cada vez que cambia el nº de ramas exploradas — aquí vive el gancho | `function updateUnlocks(n,tot){` | 1710 |
| Bloque EXACTO que ya dispara solo cuando las 8 ramas están exploradas (n>=tot) — el botón nuevo va DENTRO de este if, después del row2 existente | `if(n>=tot){` | 1731 |
| Punto de inserción preciso: el código nuevo va justo antes de esta línea de cierre (después de u.appendChild(row2)) | `u.appendChild(row2); } }catch(e){}` | 1738 |
| Contenedor HTML real de la celebración — un <div> normal fuera del SVG, NO forma parte del pan/zoom ni de las tarjetas | `<div class="mbUnlock" id="mbUnlock" hidden aria-live="polite"></div>` | 1352 |
| DÍA 0 real: fecha del primer cambio registrado ('Nace el Cuaderno MADRE'), ya expuesta en window.__cmCambiosMeta.oldest — NO hay que inventar ni calcular nada nuevo | `window.__cmCambiosMeta={count:cambios.length, oldest:cambios[cambios.length-1].fecha}` | 3100 |
| Texto que confirma que esa fecha ES el nacimiento del cuaderno (para no inventar el concepto 'Día 0') | `{fecha:"2026-06-21",titulo:"Nace el Cuaderno MADRE"` | 3096 |
| Fuente de las 8 ramas reales (nombre+emoji) por si se listan en la imagen; confirma tot=8 | `window.__MAPA = {` | 1072 |
| Ramas YA exploradas por ESTE visitante — dato real de localStorage, no inventado | `function getExpl(){ try{ return JSON.parse(localStorage.getItem(EXPL)` | 1678 |
| Patrón de guard prefers-reduced-motion ya usado en esta misma zona (mbExpl) — cópialo SOLO si añades alguna animación de aparición al botón | `@media(prefers-reduced-motion:reduce){ .mbExpl.celebrate{animation:none} }` | 1286 |
| Prueba de que el mecanismo de anclaje nth-of-type (restricción 2) NO alcanza el modal del mapa: el selector de 'me gusta' ni siquiera lo incluye — zona verificada como segura para insertar | `.closest(".senalItem,.card,.hero,.body p,.body li,.ctitle .t,summary,h1,.sub,.postit,#gateBar,footer,.heronote,.dec,.alert,.step,.chip,#senalesCard,#comentarios,.cmTex")` | 3400 |
| Patrón de código ya existente en el mismo fichero para canvas→toBlob (estilo a replicar, mismo idioma de código) | `_exp.toBlob(function(blob){` | 4759 |
| Versión actual confirmada del fichero (para que el ejecutor verifique que trabaja sobre v0.49, no una copia vieja) | `window.__cmVersion="v0.49";` | 5856 |

**Pasos de implementación y verificación (del verificador):**

VEREDICTO: viable, con ámbito ligeramente ajustado (mantener el MVP en texto, sin rasterizar el SVG del mapa dentro del canvas — eso sí se saldría de 90 min).

REFUTACIÓN por restricción:
(1) Pan/zoom/hit-test intacto: `updateUnlocks(n,tot)` (L1710) es una función HTML pura, hermana de onNodeClick/routeTap/nodeAtPoint/focusBranch pero SIN tocarlas — `#mbUnlock` (L1352) es un `<div>` fuera del `<svg id="mbSvg">` (L1337). Cero riesgo de tocar la cadena de transformación.
(2) NO APLICA: verificado por grep (ancla 10) que el sistema de "me gusta"/nth-of-type solo puede anclarse a `.senalItem,.card,.hero,...` — el modal del mapa (`#mapBig-ov`/`#mbUnlock`) no figura en ese selector, así que ni siquiera es una zona susceptible de corazones. Además `#mbUnlock` ya se vacía y reconstruye entero en cada llamada (`u.textContent=""`, L1711) — su contenido interno ya es efímero por diseño, antes de este cambio.
(3) Sin relación con ASMR ni modo caótico: ningún archivo/función de esas zonas se toca.
(4) Honestidad: TODO dato sale de estructuras ya cargadas — `window.__cmCambiosMeta.oldest` (Día 0 real = 21-jun-2026, "Nace el Cuaderno MADRE"), `window.__cmCambiosMeta.count` (nº cambios), `NODES.length`/`getExpl()` (8/8 ramas, dato de sesión real), `location.href` (URL real), `new Date()` (hora local real). Cero texto inventado.
(5) Guard: el MVP (botón + generación de canvas al click, sin animación de aparición) NO necesita guard de reduced-motion porque no anima nada. Si se decide añadir un fade-in al botón nuevo, copiar el patrón de L1286.

PASOS DE IMPLEMENTACIÓN (dentro del `if(n>=tot){` de L1731-1739, después del row2 de L1735-1738):
1. Crear `var row3=document.createElement("span"); row3.className="mbUnlockRow";` + botón `btnMem` con texto "🖼️ Guardar recuerdo" (mismo patrón que btn/btn15 de L1717/1727).
2. `btnMem.addEventListener("click", function(ev){ ev.stopPropagation(); saveMemory(meta); })` — reutilizar la variable `meta` ya obtenida en el try de L1733 (mover el btn DENTRO de `if(meta&&meta.count){...}` para no depender de un `meta` nulo).
3. Función `saveMemory(meta)` (declarar junto a `updateUnlocks`, dentro del mismo IIFE L1373-1926): crea `<canvas width=1080 height=1080>`, dibuja fondo+gradiente, `var dias=Math.floor((Date.now()-new Date(meta.oldest+"T00:00:00").getTime())/86400000);`, textos con `ctx.fillText` (día, "8/8 ramas exploradas", `meta.count+" cambios documentados"`, `location.href`, fecha de hoy con `toLocaleDateString`).
4. `canvas.toBlob(function(blob){ var url=URL.createObjectURL(blob); if(navigator.share && navigator.canShare && navigator.canShare({files:[new File([blob],"recuerdo-madre.png",{type:"image/png"})]})){ navigator.share({files:[...], title:"Mi recuerdo de MADRE"}).catch(function(){}); } var a=document.createElement("a"); a.href=url; a.download="recuerdo-madre.png"; a.click(); setTimeout(function(){URL.revokeObjectURL(url);},4000); }, "image/png");` — mismo estilo que L4759.

VERIFICACIÓN SIN preview_screenshot (esta página cuelga el screenshot por Supabase Realtime — ya documentado en DESARROLLO_CUADERNO.md L41):
- `preview_eval`: `document.getElementById('mapBig').click()` para abrir el mapa, simular exploración con `localStorage.setItem('cm_map_explored_v1', JSON.stringify(window.__MAPA.nodes.map(n=>n.t)))`, recargar/forzar `updateExpl()` si está expuesta, y comprobar `document.querySelector('#mbUnlock button')?.textContent` incluye "Guardar recuerdo".
- Click programático del botón vía eval y comprobar con `preview_console_logs` (añadir un `console.debug` temporal con `dias`, `meta.count`, `location.href` dentro de `saveMemory` mientras se depura, quitarlo antes de publicar) que los valores calculados son correctos.
- Comprobar `canvas.width===1080 && canvas.height===1080` con `getBoundingClientRect`/propiedades directas del canvas vía eval (no getBBox, eso es para SVG).
- `preview_network`: confirmar que NO se dispara ninguna petición nueva (todo es 100% cliente, coherente con "cero llamadas nuevas" que ya usa el mismo bloque en L1732).

RIESGO MENOR (no bloqueante): `navigator.share` con `files` requiere gesto de usuario reciente; el `toBlob` es async pero rápido (<100ms) — mismo patrón ya aceptado en L4759 para un flujo async más largo (upload a Supabase). Si algún navegador lo rechaza, ya cae al `catch(function(){})` silencioso y queda la descarga normal como fallback, que siempre funciona.

MODELO recomendado para ejecutar: Sonnet 5 — tarea de implementación acotada, con anclas exactas, sin ambigüedad de diseño.

---

### 6. Teatro de errores — ¿qué habrías hecho tú? · ~45 min

**Efecto que produce:** Una idea muerta del cementerio se vuelve interactiva: «¿tú qué habrías hecho?» → eliges → se revela lo que MADRE hizo DE VERDAD y qué pasó.

**⚖️ Ajustes del juez (Fable) — vinculantes:** TODO el contenido interactivo sale del texto REAL de la entrada elegida del cementerio (citada en las anclas) — cero invención. Las opciones falsas deben ser plausibles pero la revelación es literal a lo documentado.

**Qué existe ya cerca (no duplicar):** Ninguno encontrado. grep -i \"teatro|Qué habrías hecho|que habrias hecho\" en index.html → 0 resultados. Existe un mecanismo PARECIDO pero distinto y no reutilizable aquí: la tarjeta \"Decisiones (archivo de junio)\" (líneas ~2105-2200, clase .dec/.decbtns/data-choice/data-reason) — es un sistema de VOTACIÓN que envía a Supabase vía data-sendreason/decstate (backend real, botones Aprobar/Rechazar/motivo). NO sirve para esto: mezclarlo simularía que el visitante está votando una decisión real de MADRE cuando en realidad es un quiz educativo sobre el pasado. El patrón correcto a reusar es el otro que ya existe: details.x (colapsable simple, sin backend, 25+ usos ya en el fichero) — cero riesgo, cero invención de mecanismo nuevo.

**Anclas verificadas (usa el patrón grep; la línea es orientativa):**

| Qué | Patrón grep | Línea aprox |
|-----|-------------|-------------|
| la <li> exacta de la entrada #1 ("Montar un 'estudio de outliers'...") que se convierte en interactiva; se sustituye SOLO su contenido interno, sin tocar las otras 5 <li> ni el <ul> | `grep -n "Montar un .estudio de outliers." index.html` | 2280 |
| apertura del <ul class="cementerio"> — confirma que hoy hay exactamente 6 <li> (no reordenar ninguna, no insertar nuevas antes/entre) | `grep -n "class=.cementerio." index.html` | 2279 |
| cierre del bloque .body de la tarjeta Cementerio (fin del <ul>, párrafo de cierre y botón de feedback) — límite hasta donde llega esta tarjeta, no tocar nada después por error | `grep -n "No es una lista de fracasos" index.html` | 2287 |
| patrón reutilizable details.x + summary>.plus + div.xb (colapsable, YA usado 25+ veces en el fichero: reglas CSS + ejemplos en 754/1953/2095/2097/2099) — reusar TAL CUAL para las 2 opciones, cero CSS/JS nuevo obligatorio | `grep -n "details\.x{" index.html` | 90 |
| reglas CSS propias del cementerio (por si se quiere añadir 1 línea cosmética .ce-plant, opcional, no obligatoria) | `grep -n "v0.11: cementerio de ideas muertas" index.html` | 284 |
| función cssPath(el): el mecanismo REAL de anclaje de los 💗 — genera la ruta como tag:nth-of-type(N) subiendo por parentNode; PRUEBA de que editar contenido DENTRO de la <li> (no insertar/mover <li> hermanas) es 100% seguro para cualquier corazón ya guardado | `grep -n "function cssPath" index.html` | 3337 |
| lista blanca de selectores que el modo 'me gusta' puede anclar (.card,.body p,.body li,... — NO incluye .fb ni .body a secas) — confirma que el nuevo <p> y los <details> internos no crean anclajes nuevos indeseados fuera de lo ya cubierto por el <li> padre | `grep -n "if(!likeMode \|\| e.target.closest" index.html` | 3399 |
| changelog interno (array cambios[]) + window.__cmVersion — convención del repo (v0.37→v0.49, un commit = una entrada): si se quiere ser coherente con el patrón ya establecido, añadir una línea v0.50 aquí y subir la versión (NO obligatorio por las restricciones duras, sí por consistencia con las 12 versiones anteriores) | `grep -n "var cambios=\[" index.html` | 3033 |

**Pasos de implementación y verificación (del verificador):**

VEREDICTO: viable, con un solo camino seguro (el que describo abajo) tras descartar 2 alternativas peores.

REFUTACIÓN intentada (y por qué sobrevive):
- ¿Toca zona prohibida del mapa? No. El Cementerio está en el flujo normal de tarjetas (.card > details > .body), a >900 líneas de distancia del SVG/onNodeClick/routeTap/nodeAtPoint/focusBranch. Cero contacto.
- ¿Duplica algo? No (ver campo duplicado). Sí hay un sistema de "elegir opción y revelar" pero es el de VOTACIÓN real (.dec) — deliberadamente NO se reusa porque mentiría sobre qué está pasando (regla honestidad §9 de la propia web: "nunca un texto inventado, solo contenido que YA EXISTE").
- ¿Necesita datos que no existen? No. Las 2 opciones + el veredicto salen 100% de las 2 frases YA escritas en la <li> línea 2280 (la idea muerta entre <s></s> = opción A/incorrecta citada literal; el ce-why = opción B/correcta citada literal). Cero invención.
- ¿Rompe el anclaje de los 💗 (restricción 2)? Verificado contra el código real (cssPath, línea 3337): la ruta se calcula subiendo por parentNode con tag:nth-of-type ENTRE HERMANOS. La técnica elegida NO inserta ni mueve ningún <li>/<p>/<div> a nivel de .body ni a nivel del <ul>: todo el contenido nuevo nace DENTRO de la <li> #1 ya existente, como hijos nuevos de ESA li. Ningún nth-of-type de ningún elemento en el resto del documento cambia. Es el caso más seguro posible de "añadir contenido dentro de una tarjeta existente".
- ¿Cabe en 30-90 min? Sí, es una única sustitución de ~1 línea por ~14 líneas de HTML (todas con clases CSS que YA existen: details.x/summary/.plus/.xb), sin JS nuevo, sin CSS nuevo obligatorio.

IMPLEMENTACIÓN (2-5 pasos):
1. git pull / git status en C:\Users\anton\cuaderno-madre-pub antes de tocar nada (repo limpio ahora mismo, HEAD 1c90702 = v0.49; protocolo anti-colisión de CONTINUAR_AQUI.md).
2. Sustituir la línea 2280 completa por el mismo <li> pero con un bloque añadido DENTRO, antes de </li>: un <p> corto de planteamiento (parafraseando "MADRE necesitaba cazar 'casos raros' que se salen del patrón normal") + dos <details class="x"><summary><span class="plus">+</span> OPCIÓN</summary><div class="xb"><p>REVELACIÓN</p></div></details> — opción A = cita literal de la idea muerta (❌, "eso es justo lo que MADRE estuvo a punto de hacer y mató"), opción B = cita literal del ce-why (✅, "esto hizo de verdad: ya tenía esa función en su capa de triggers").
3. (Opcional, no obligatorio) 1 línea CSS tras 289: `.cementerio .ce-plant{font-size:12.5px;color:var(--muted);margin:8px 0 6px}` — sin ella el <p> hereda estilo por defecto, se ve bien igual.
4. (Opcional, por coherencia con el patrón v0.37-v0.49) añadir 1 entrada a `cambios[]` (línea 3033) y subir `window.__cmVersion` (línea 5856) a "v0.50".
5. Commit: "v0.50: primera entrada interactiva del cementerio de ideas (elige y descubre qué hizo MADRE de verdad)".

VERIFICACIÓN SIN preview_screenshot (cuelga en esta página, confirmado en CONTINUAR_AQUI.md/DESARROLLO_CUADERNO.md):
a) Estructura: contar <li> dentro de .cementerio sigue en 6 — preview_start el server (launch.json de este repo, puerto 8137/8138 según cuál se use) → preview_eval: `document.querySelectorAll('.cementerio > li').length` debe dar 6 (ningún <li> nuevo, ninguna movida).
b) preview_eval: `document.querySelectorAll('.cementerio > li')[0].querySelectorAll('details.x').length` debe dar 2 (las 2 opciones nuevas).
c) preview_eval abre cada details con `.open=true` y lee `.querySelector('.xb').textContent` — confirmar que la opción A contiene "❌" y cita "casa nueva al lado de la que ya vivo" (texto real), y la B contiene "✅" y cita "capa de triggers" (texto real) — cero frase inventada.
d) preview_console_logs nivel error: debe seguir en 0.
e) (barato, opcional) simular el sistema de corazones: preview_eval clic en #likeFab → clic en la <li> #1 del cementerio → confirmar que abre el popover askLike con label correcto y que, tras guardar, `document.querySelector(cssPath_guardada)` sigue resolviendo al mismo <li> (prueba directa de que el anclaje nth-of-type no se rompió).
f) node --check de los bloques <script> del fichero (no se tocó JS, pero es el hábito del repo; confirma que no se rompió ningún <script> vecino por error de copy-paste).

NO hace falta guard de prefers-reduced-motion (restricción 5): confirmado que `details.x` no tiene ninguna transición/animación CSS asociada (solo el .caret del <details> EXTERIOR de la tarjeta la tiene, y ya está guardado en línea 161); esta interacción es 100% nativa del navegador (toggle de <details>), sin motion nuevo que guardar.

ALTERNATIVA si Tony prefiere otro epitafio: la entrada #5 ("Dejar que el predictor interno decida qué idea vale... el único que dicta sentencia es el mundo de fuera, con euros y estrellas", línea 2284) es igual de limpia y temáticamente muy fuerte (conecta con el principio "selector externo" repetido en toda la web) — mismo patrón, mismo riesgo cero, solo cambia qué <li> se edita.

---

### 7. Logros/coleccionables honestos · ~75 min

**Efecto que produce:** Chip discreto 🏆 N/M con logros REALES ya alcanzables (medibles hoy con las keys de localStorage existentes), pendientes en silueta sin spoiler.

**⚖️ Ajustes del juez (Fable) — vinculantes:** Ajustes del verificador que ADOPTO: «explorar las 8 ramas» cuenta como UN logro (no 3: explorar/niveles/celebración usan el mismo contador); NO usar cm_hub_seen como logro (se dispara casi solo); para «comentar» enganchar post() (comentario público, éxito inequívoco), no cm_cmt_ts (es un timestamp anti-spam). Chip montado con document.body.appendChild, fuera de .wrap.

**Avisos del verificador:**
- No hay bloqueador duro de zona prohibida: el chip nuevo se puede montar con document.body.appendChild (mismo patrón que gato/hub/tour/mapFab), fuera de <div class="wrap"> (línea 295) donde viven los .card — no toca el nth-of-type de las tarjetas ni onNodeClick/routeTap/nodeAtPoint/focusBranch.
- Definir de forma EXPLÍCITA cuál 'comentar' cuenta: hay 2 sistemas distintos — comentarios públicos vía post() (línea 3633, Supabase tabla 'comments') y comentario-de-rama vía window.__fb (línea 1441, tabla 'feedback'). Recomiendo enganchar el público (post(), más visible y con success real inequívoco) y NO usar cm_cmt_ts (línea 1452/1456) porque esa marca de tiempo se escribe ANTES de confirmar éxito (es solo un rate-limiter, no un flag de 'comentario enviado con éxito') — usarla violaría la regla de honestidad si el envío fallara después.
- Riesgo de inflar el 'N/9' contando 2-3 veces el MISMO contador cm_map_explored_v1 (ver 'duplicado'): recomiendo que 'explorar las 8 ramas' cuente como UN solo logro, no como 3 (explorar+niveles+celebración).
- cm_hub_seen (abrir el menú ✦, línea 5829) se dispara casi al primer toque de cualquier visitante — es un logro casi gratis; opcional, considerar dejarlo fuera si se quiere que los 6-9 logros reflejen esfuerzo/descubrimiento real.

**Qué existe ya cerca (no duplicar):** PARCIAL, dos solapamientos reales que hay que evitar contar como logros nuevos: (1) el sistema "DESCUBRIMIENTOS OCULTOS" (línea 1701, comentario explícito "v0.26: descubrimientos ocultos") YA implementa "niveles de descubrimiento" con umbrales sobre el MISMO contador (n<=2/n<=4/n>=6/n>=tot en función updateUnlocks, línea 1710) — si el registro añade "niveles de descubrimiento" como logro(s) aparte de "explorar las 8 ramas", está repitiendo el mismo dato con otro nombre, no un logro distinto. (2) "celebración" YA existe como localStorage cm_map_done_v1 (línea 1693), disparada EXACTAMENTE en la misma condición que "explorar las 8 ramas completas" (n>=tot) — es la MISMA hazaña con dos etiquetas. Ninguno de los dos bloquea el incremento, pero si se cuentan como entradas independientes en el "N/9" se está inflando el contador con el mismo hecho repetido (viola el espíritu, aunque no la letra, de la honestidad de datos). No existe ningún registro de "logros/coleccionables" previo en index.html, CONTINUAR_AQUI.md ni DESARROLLO_CUADERNO.md — el CHIP "🏆 N/9" en sí es nuevo, no duplicado.

**Anclas verificadas (usa el patrón grep; la línea es orientativa):**

| Qué | Patrón grep | Línea aprox |
|-----|-------------|-------------|
| HUB FAB existente (menú ✦) — referencia de dónde vive, para decidir si el chip cuelga cerca (id real, para grep) | `id="fabHubBtn"` | 5780 |
| Punto de inserción SEGURO del nuevo widget completo: al final del body, después del último <script> existente, mismo patrón que #mapFab. No interfiere con .wrap ni con nth-of-type de .card | `</body>` | 6278 |
| Contador REAL ya existente de ramas exploradas (array de nombres de rama en localStorage) — solo LEER, no tocar quien lo escribe | `localStorage.getItem("cm_map_explored_v1")` | 1056 |
| Total de ramas del mapa, DINÁMICO — usar esto como denominador, nunca hardcodear 8 (regla de honestidad) | `window.__MAPA.nodes.length` | 1057 |
| markExplored: la función que ESCRIBE cm_map_explored_v1, se llama desde onNodeClick (zona prohibida) — NO TOCAR esta función, solo leer su resultado desde fuera | `function markExplored(nd)` | 1679 |
| Celebración de mapa 100% explorado, YA existente — mismo trigger que 'explorar las 8 ramas completas' (ver 'duplicado') | `localStorage.getItem("cm_map_done_v1")` | 1693 |
| Tour guiado completado — key ya existente, medible hoy sin hook | `var SEEN_KEY = "cuaderno_tour_seen"` | 4374 |
| Al menos un 💗 (me gusta) dado — array ya existente, medible hoy sin hook (comprobar length>0) | `var LK="cm_likes_v1"` | 3323 |
| Menú ✦ (HUB) abierto alguna vez — medible hoy sin hook, pero es un logro casi trivial (ver blockers) | `localStorage.setItem("cm_hub_seen","1")` | 5829 |
| HOOK 1 línea — gato tocado/asustado: única función que cubre click+touch+teclado+cursor-cerca; insertar dentro, tras la primera línea (wake();) | `function flee(ax, ay){` | 4270 |
| HOOK 1 línea — nota secreta abierta (clic en la chincheta 📌); insertar dentro del try, tras el toggle de 'ns-open', condicionado a open===true | `var open = postit.classList.toggle('ns-open');` | 4141 |
| HOOK 1 línea — comentario público enviado CON ÉXITO (única función central; cubre comentarios de primer nivel y respuestas); insertar justo antes de 'return {};' final, es decir DESPUÉS de comprobar que no hubo error | `async function post(parentId, name, body, file){` | 3633 |
| HOOK 1 línea — dibujo enviado con éxito; insertar justo después de este 'say', dentro del mismo .then() de éxito | `say('¡Enviado! Gracias por dibujar 💜');` | 4777 |
| Confirmación de que las .card viven dentro de .wrap (contenedor que NUNCA se debe tocar por el candado nth-of-type) — el nuevo widget debe colgar de document.body, no de .wrap | `<div class="wrap">` | 295 |
| Guard de movimiento reducido, patrón a copiar SI (y solo si) se anima la aparición del chip/panel — Tony tiene reduced-motion ON | `@media(prefers-reduced-motion:reduce)` | 1286 |

**Pasos de implementación y verificación (del verificador):**

VEREDICTO: viable, cabe en ~60-90 min si se recorta a 6-8 logros reales (no 9) y se evita el padding descrito en "duplicado". Los 4 nuevos hooks son 1 línea cada uno y ninguno toca zona prohibida (map/zoom/hit-test, orden de tarjetas, ASMR, caos).

LISTA RECOMENDADA (evita duplicar el mismo contador 3 veces):
1. 🌳 Explorar las 8 ramas del mapa — cm_map_explored_v1.length >= window.__MAPA.nodes.length (línea 1056/1057). 0 hooks.
2. 🧭 Completar la ruta guiada — localStorage.getItem("cuaderno_tour_seen") (línea 4374). 0 hooks.
3. 💗 Dar tu primer "me gusta" — JSON.parse(localStorage.getItem("cm_likes_v1")||"[]").length>0 (línea 3323). 0 hooks.
4. 🐱 Encontrar/asustar al gato — cm_gato_v1 (hook nuevo, línea 4270).
5. 📌 Descubrir la nota secreta — cm_nota_v1 (hook nuevo, línea 4141).
6. 💬 Dejar un comentario — cm_comento_v1 (hook nuevo, línea 3633/3642, SOLO en el camino de éxito).
7. 🎨 Enviar un dibujo — cm_dibujo_v1 (hook nuevo, línea 4777).
8. [opcional, recortable] ✦ Abrir el menú de herramientas — cm_hub_seen (línea 5829); es casi gratis, decide Tony si cuenta.
NO incluir "niveles de descubrimiento" ni "celebración" como logros aparte: son el MISMO dato que el #1 con otro nombre (ver "duplicado").

PASOS DE IMPLEMENTACIÓN (2-5 líneas):
a) Insertar los 4 hooks de 1 línea en los 4 puntos de arriba (todos son `try{localStorage.setItem('cm_X_v1','1');}catch(e){}`, dentro de los callbacks de ÉXITO, nunca antes de confirmar éxito).
b) Añadir UN nuevo bloque <script> justo antes de `</body>` (línea 6278), autocontenido en un IIFE con try/catch (mismo patrón que los widgets gato/hub/tour), que define un array `LOGROS=[{id,icon,label,check:fn}]` con las 6-8 comprobaciones de arriba (todas boolean sobre localStorage/window.__MAPA ya reales), crea un botón fijo `document.body.appendChild(...)` con texto `"🏆 "+conseguidos+"/"+LOGROS.length`, y al click abre un panel simple (mismo patrón visual que `#mbUnlock`/`.fhActiveChip`) listando conseguidos con su nombre real y pendientes en silueta ("??? · aún no descubierto", SIN pistas del trigger exacto — cumple "silueta sin spoiler").
c) Recalcular en `DOMContentLoaded` + reabrir del panel (no hace falta listener en tiempo real; polling barato opcional tipo `setInterval(recalc,900)` como ya hace `#mapFab` en la línea 6275, si se quiere que el contador suba sin recargar).
d) CSS nuevo: reutilizar variables `--ink/--muted/--accent/--line` (definidas línea 25-26) y el estilo de chip pequeño ya usado (`.pr-chip`/`.fhActiveChip`) para consistencia visual; NO añadir animación de entrada en v1 (evita tener que replicar el guard de reduced-motion; si se anima luego, copiar el patrón de la línea 1286).

VERIFICACIÓN SIN preview_screenshot (usa eval/console — el preview se cuelga en esta página):
1. `mcp__Claude_Browser__preview_eval`: `localStorage.clear(); location.reload()` → estado limpio.
2. Tras recargar, eval: `document.getElementById('<id-del-chip>').textContent` → debe leer "🏆 0/N" (N = el nº real del array, comprobar con `window.__MAPA.nodes.length` en la misma consola).
3. Simular cada logro uno a uno vía eval y recargar entre cada uno: `localStorage.setItem('cm_gato_v1','1')` → reload → comprobar que el contador sube en 1 y que la fila del panel cambia de silueta a nombre real (leer vía `document.querySelector('[data-logro="gato"]').textContent` si el implementador añade `data-logro` a cada fila, recomendado para testabilidad).
4. Regresión de zona prohibida: antes/después del cambio, eval `document.querySelectorAll('.wrap > .card').length` debe dar el MISMO número (confirma que no se insertó nada entre tarjetas) y `typeof onNodeClick` debe seguir siendo `"function"` sin haberse tocado (diff del código de esa función debe ser vacío).
5. Sanity del mapa: eval `document.getElementById('mapBig').click()` y comprobar por consola (`preview_console_logs`) que no aparecen errores nuevos, luego cerrar el overlay — confirma que el hook de "explorar ramas" (solo lectura) no rompió el flujo real de click en el mapa.

---

### 8. Presencia de MADRE en toda la página (voz contextual honesta) · ~60 min

**Efecto que produce:** MADRE te habla al llegar a hitos reales de scroll (1 frase por sección basada en hechos de esa sección, 1 sola vez, descartable).

**⚖️ Ajustes del juez (Fable) — vinculantes:** Anclas corregidas por el verificador: NO existe #evidencia — usar #senalesCard y los IDs reales listados abajo. NO reutilizar .mbExpl tal cual (su CSS asume fondo oscuro del overlay): clase nueva con tokens var(--card)/var(--ink) como #madreHabla. Las esquinas inferiores están CONGESTIONADAS (7+ FABs) y el singleton #toast no es aria-live: crear elemento propio aria-live=polite en banda inferior CENTRAL, por encima de #toast.

**Avisos del verificador:**
- CORRECCION DE HECHO: 'Evidencia' NO es un id real en el HTML. El unico texto 'Evidencia cruda' esta en un <details class="x"> SIN id (linea 1965), anidado dentro de la card '1' que tampoco tiene id propio (solo se identifica por .num=="1"). Si el ejecutor busca #evidencia se quedara sin ancla. Hay que sustituir ese hito por #senalesCard (linea 743, 'Señales del mundo' - subtitulo literal: 'Lo unico que no se puede falsear') que SI tiene id real y es tematicamente equivalente (evidencia externa).
- No reutilizar la clase .mbExpl tal cual para el nuevo elemento: su CSS (l.1282-1287) asume el fondo oscuro del overlay del mapa (color claro sobre rgba(255,255,255,.05)); sobre el fondo claro de la pagina normal quedaria ilegible. Hay que crear una clase nueva reutilizando los tokens de tema ya usados por #madreHabla (var(--card), var(--ink), var(--line), var(--accent-soft)).
- Zona de posicion fixed muy congestionada: bottom-izquierda ya tiene #mapFab(112px)/#chaosFab(66px)/#cmvFab(64px) todos z-index 58; bottom-derecha tiene #cmtFab(16px)/#likeFab(74px)/#lapizFab(132px)/#fabHubBtn(16px,z72). Ademas ya existe un singleton #toast (l.146-147 CSS, l.2579 funcion) centrado en bottom:20px z-index:100050 que NO es aria-live ni descartable - no reusarlo directamente (riesgo de que dos toast() se pisen), pero si copiar su timing (2600ms) como referencia. El nuevo elemento necesita su propia franja libre (p.ej. bottom-center por encima de #toast, o una tira fina bajo la cabecera) verificada con getBoundingClientRect en tiempo real, no asumida a ciegas.

**Qué existe ya cerca (no duplicar):** No hay duplicado exacto. Los dos precedentes más cercanos son distintos en mecanismo: (a) #mbExpl (CSS l.1282, HTML l.1350, JS updateExpl l.1680-1699) es la voz contextual pero vive DENTRO del overlay del mapa y se dispara desde markExplored()/onNodeClick (zona prohibida) - no reacciona a scroll de la pagina general. (b) #madreHabla (l.568-581) es un panel ESTATICO más (una card en la secuencia), no una linea flotante que reaccione a scroll. Ninguno cubre "linea flotante fuera del mapa, reactiva a hitos de scroll de toda la pagina" - el incremento es nuevo.

**Anclas verificadas (usa el patrón grep; la línea es orientativa):**

| Qué | Patrón grep | Línea aprox |
|-----|-------------|-------------|
| Punto de insercion del nuevo bloque: justo despues del script de #mapFab (el patron scroll-listener+rAF+setInterval de respaldo YA existente que pide el encargo), antes de cerrar body | `^</body>` | 6278 |
| Funcion a clonar como patron (checkFab): getBoundingClientRect + toggle de clase, disparada por scroll+rAF | `function checkFab\(\)` | 6269 |
| Listener de scroll con throttle via requestAnimationFrame (mismo bloque, para copiar tal cual) | `addEventListener\("scroll",function\(\)\{ if\(!ticking\)` | 6270 |
| setInterval de respaldo (900ms) del mismo bloque - reusar exactamente este patron para el nuevo watcher | `setInterval\(checkFab,900\)` | 6275 |
| Precedente #mbExpl: CSS (fondo oscuro de overlay, NO copiar tal cual el color) | `\.mbExpl\{` | 1282 |
| Precedente #mbExpl: HTML real con aria-live=polite (patron de accesibilidad a replicar) | `id="mbExpl" aria-live="polite"` | 1350 |
| Guard JS de reduced-motion ya usado 10+ veces en el fichero - reutilizar literalmente | `matchMedia\("\(prefers-reduced-motion:reduce\)"\)` | 906 |
| Ancla real de 'Marcador' = #prediccionesCard, titulo real 'El marcador: se juzga sola' | `id="prediccionesCard"` | 781 |
| Filas reales del marcador (clases .ok/.ko/.wait) para contar aciertos/fallos SIN inventar numeros - contar via querySelectorAll en el momento de mostrar el mensaje, no hardcodear | `class="predList"` | 793 |
| CORRECCION: ancla real de 'Evidencia' debe ser #senalesCard (no existe #evidencia) | `id="senalesCard"` | 743 |
| Dato real ya renderizado para el mensaje de evidencia (array senales -> DOM .senalItem .v/.k, incluye 'Ultima señal real: 8-jul-2026') | `var senales=\[` | 2889 |
| Ancla real de 'final' = <footer>, NO es .card por lo que el re-secuenciador (linea 6218-6245) no lo mueve - queda siempre ultimo | `<footer>` | 2400 |
| Dato real reutilizable para el mensaje final: contador de visitas ya persistido en localStorage por el propio navegador | `cm_visitas_v1` | 971 |
| Singleton #toast existente - NO reusar directo (no aria-live, no descartable, podria pisarse con otro toast()); solo referencia de timing | `function toast\(msg\)` | 2579 |
| Precedente de flag 'mostrado una vez por sesion' via sessionStorage (mismo patron a copiar con clave nueva, p.ej. cm_presence_seen_v1) | `cm_glosNie` | 5709 |

**Pasos de implementación y verificación (del verificador):**

IMPLEMENTACION (5 pasos, ~45-55 min + verificacion):
1) HTML (2-3 lineas): justo antes de </body> (tras el script de #mapFab, l.6277), añadir `<div id="mbPresence" aria-live="polite" hidden><span id="mbPresenceTxt"></span><button type="button" id="mbPresenceX" aria-label="Cerrar aviso">✕</button></div>` - append directo a body (mismo patron que #likeFab/#mapFab, NO dentro de .wrap ni de ninguna card, asi restriccion 2 no aplica en absoluto).
2) CSS (~20 lineas) en un <style> nuevo junto al HTML: clase nueva (no .mbExpl) con var(--card)/var(--ink)/var(--line)/var(--accent-soft) para que funcione en tema claro; position:fixed en una franja libre (sugerido: left:50%;bottom:170px;transform:translateX(-50%); max-width:min(360px,92vw); z-index:56 - por debajo de #toast(100050) y de los overlays, por encima del contenido normal); transicion de opacity/transform con `@media(prefers-reduced-motion:reduce){ transition:none }` (mismo patron que linea 1286/4090).
3) JS (~50-60 lineas) en un <script> nuevo, IIFE con try/catch (patron universal del fichero): (a) array MILESTONES = [{key:'evidencia', el:function(){return document.getElementById('senalesCard');}, msg:function(){ /* leer .senalItem real, NO inventar */ var items=document.querySelectorAll('#senales .senalItem'); ... }}, {key:'marcador', el:..., msg:function(){ var ok=document.querySelectorAll('#prediccionesCard .predList>li.ok').length, ko=...ko..., wait=...wait...; return '⚖️ El marcador ahora mismo: '+ok+' acierto(s), '+ko+' fallo(s), '+wait+' en juego.'; }}, {key:'final', el:function(){return document.querySelector('footer');}, msg:function(){ var v=JSON.parse(localStorage.getItem('cm_visitas_v1')||'{}'); return 'Llegaste al final. '+(v.n?('Esta es tu visita nº '+(v.n+0)+'.'):'')+' Si algo te sobra o te falta, dilo con 💬.'; }}]; (b) sessionStorage 'cm_presence_seen_v1' (patron l.5709) para 1-vez-por-seccion-por-sesion; (c) función check() que recorre MILESTONES, si !seen[key] && el() existe && el().getBoundingClientRect().top < innerHeight*0.7 -> mostrar texto real, marcar seen, auto-ocultar a los ~7s (setTimeout, guardado para poder cancelarlo si el usuario pulsa ✕ antes); (d) el boton #mbPresenceX oculta y marca seen; (e) enganchar via NUEVO listener `window.addEventListener('scroll', function(){...rAF...})` + NUEVO `setInterval(check,900)` - copia textual del patron checkFab (l.6262-6276), en un listener SEPARADO del existente (no tocar ni envolver el de mapFab).
4) Nunca tocar onNodeClick/routeTap/nodeAtPoint/focusBranch/la cadena de transform del SVG del mapa, ni el sistema ASMR/caos - el bloque nuevo no los referencia en absoluto (verificar con grep tras escribir: `grep -n "onNodeClick\|routeTap\|focusBranch\|ASMR" <bloque nuevo>` debe devolver 0 lineas).
VERIFICACION SIN preview_screenshot (se cuelga en esta pagina, documentado en CONTINUAR_AQUI.md/DESARROLLO_CUADERNO.md):
- Sintaxis: extraer el nuevo <script>...</script> a un .js temporal y `node --check` (patron ya usado en el repo, ver DESARROLLO_CUADERNO.md l.9).
- Runtime via preview_eval (no screenshot): `document.getElementById('mbPresence')` existe y hidden=true al cargar; `window.scrollTo(0, document.getElementById('senalesCard').offsetTop - 200)` seguido de disparar manualmente check() (o esperar al setInterval de 900ms) y comprobar `document.getElementById('mbPresenceTxt').textContent` contiene un dato REAL (comparar con el texto de `#senales .senalItem` actual, no un string fijo); repetir para #prediccionesCard y footer.
- Aria: `document.getElementById('mbPresence').getAttribute('aria-live')==='polite'`.
- Reduced-motion: `matchMedia('(prefers-reduced-motion:reduce)').matches` es true en el navegador de Tony (documentado) -> confirmar que la aparicion/desaparicion NO anima (transition:none aplicado) via `getComputedStyle(el).transitionDuration`.
- Consola limpia: `mcp__Claude_Browser__preview_console_logs` nivel error, debe estar vacio tras las 3 pruebas de scroll.
- No solape: getBoundingClientRect() del nuevo elemento vs de cualquier FAB visible en ese momento (mapFab/likeFab/lapizFab/fabHubBtn) - deben no intersectar.
- Confirmar que el bloque no esta dentro de `.wrap` ni reordenado por el re-secuenciador (`document.getElementById('mbPresence').closest('.wrap')` debe dar null, ya que se hizo document.body.appendChild).
Tiempo estimado real: HTML+CSS ~15min, JS ~20min, verificacion con eval/consola (sin screenshot) ~15-20min = ~55-60min, dentro de la ventana 30-90.

---

### 9. MADRE duda — voto consultivo sobre un dilema real · ~40 min

**Efecto que produce:** Bloque «🤔 MADRE duda ahora mismo» con el dilema REAL vigente (¿extender etiquetas-pregunta a las 8 ramas o revertir a 2?) y voto consultivo vía window.__fb.

**⚖️ Ajustes del juez (Fable) — vinculantes:** El dilema publicado debe ser el REAL y vigente (v0.35: ¿extender las etiquetas-pregunta a las 8 ramas del mapa o revertir a solo 2? — decisión abierta documentada en CONTINUAR_AQUI.md). Nota honesta OBLIGATORIA en el bloque: «tu voto es consultivo: MADRE decide con datos y publicará aquí el resultado». Dedupe de voto por sesión (patrón ya existente en __fb/cuaderno_madre_v1).

**Qué existe ya cerca (no duplicar):** PARCIAL, no bloqueante — existe un mecanismo SIMILAR en espíritu pero NO igual: '.dec' / botones [data-choice] (línea 2117, tarjeta 'card tony' id-less \"4. Decisiones (archivo de junio)\", línea 2105). Es un widget de aprobar/rechazar propuestas de MADRE dirigido EXCLUSIVAMENTE al creador: está oculto a cualquier visitante normal vía CSS 'body.lectura .card.tony{display:none}' (línea 3212) y solo se revela si localStorage 'cuaderno_madre_tony'==1 (isTonyNow(), línea 2804). Su propósito (aprobación interna de Tony sobre propuestas de MADRE, con estado state.decisions persistido y sin límite de re-voto) es distinto del pedido aquí (voto CONSULTIVO de cualquier VISITANTE sobre un dilema de producto, con nota honesta de que MADRE decide con datos y con dedupe de una vez por dispositivo). No hay ningún widget hoy visible al público que capture un voto de 2 opciones sobre un dilema de MADRE. Se puede reutilizar visualmente el patrón de botones (clases .btn.sm/.btn.sm.ok/.btn.sm.no) pero el mecanismo de guardado/gating es otro; no procede fusionar ni extender '.dec' porque eso arrastraría el gating soloTony y el contrato con 'state.decisions'/chipDecs, que no aplica a un voto público.

**Anclas verificadas (usa el patrón grep; la línea es orientativa):**

| Qué | Patrón grep | Línea aprox |
|-----|-------------|-------------|
| Tarjeta destino: #mapaCard (div.card key), el bloque nace DENTRO de ella, tras el botón de feedback existente, como ÚLTIMO hijo antes del cierre de la tarjeta — no se toca ningún hermano previo, así que ningún nth-of-type existente cambia de índice. | `grep -n 'id="mapaCard"' index.html` | 1041 |
| Ancla EXACTA de inserción: pegar el bloque nuevo INMEDIATAMENTE DESPUÉS de esta línea (el botón .fb de la tarjeta del mapa) y ANTES del </div> de la línea 1066. Insertar al final (append), nunca antes: así ningún elemento existente (incluido este mismo botón) cambia su índice nth-of-type. | `grep -n 'data-card="🌳 El mapa de MADRE"' index.html` | 1065 |
| Mecanismo real de anclaje de los corazones 💗: cssPath() usa el ID del elemento si lo tiene (cadena corta, inmune a reordenes) y solo cae a tag:nth-of-type(N) contando HERMANOS DEL MISMO TAG cuando el elemento no tiene id. Como #mapaCard SÍ tiene id, cualquier corazón puesto sobre la tarjeta entera resuelve a '#mapaCard' (estable). El único riesgo real es a corazones puestos sobre hijos SIN id de #mapaCard (p.ej. el div .fb) — insertar ANTES o ENTRE ellos les correría el índice; insertar DESPUÉS del último hijo (como se pide aquí) no mueve el índice de nadie porque nth-of-type solo cuenta hermanos anteriores. | `grep -n 'nth-of-type' index.html  (función cssPath)` | 3336 |
| Firma exacta y contrato de window.__fb (async, no lanza si falta backend, ya usado en 10+ sitios): recibe {card, section, tipo, texto} y devuelve una Promise que resuelve 'sent' o 'copied'. El campo 'tipo' es texto libre — el insert real a Supabase confirma que no hay enum/constraint que bloquee un tipo nuevo como 'voto-duda'. | `grep -n 'window.__openFb=openModal; window.__fb=sendFeedback' index.html` | 3260 |
| Ejemplo de uso real de window.__fb con card/section/tipo/texto dentro del propio mapa (mismo patrón a copiar para el voto), incluyendo el guard try/catch y el chequeo typeof window.__fb==='function'. | `grep -n 'card:"🌳 Mapa › comentario"' index.html` | 1457 |
| Confirmación de que 'tipo' es una columna libre en el insert real a Supabase (sin whitelist/enum visible en el cliente) — insertar tipo:'voto-duda' no rompe nada del backend. | `grep -n 'SB.from("feedback").insert' index.html` | 2645 |
| Patrón de dedupe REAL ya usado en el propio fichero para 'esto ya lo hiciste, no lo repitas' vía localStorage con flag de una sola vez (el más parecido a 'un voto por dispositivo'; NO existe un dedupe genérico dentro de __fb — cada llamador se las apaña solo, unos con throttle de 5s (cm_cmt_ts/cm_rama_ts) y otros con flag de una vez como este). | `grep -n 'cm_map_done_v1' index.html` | 1693 |
| El dilema real y vigente que hay que citar literalmente (v0.35, decisión de Tony 10-jul, aún sin resolver): experimento de etiqueta-pregunta en solo 2 nodos del mapa (🧠 y 📚), pendiente extender a las 8 ramas o revertir a 2. Fuente primaria en el propio código (comentario) y en CONTINUAR_AQUI.md línea ~111 ('Pendiente su veredicto al VERLA: extender o revertir'). | `grep -n 'v0.35: experimento (decisión de Tony 10-jul)' index.html` | 1164 |
| Zona PROHIBIDA de verdad (pan/zoom/hit-test del mapa grande): estas 4 funciones viven en un IIFE totalmente distinto y NO se tocan; el bloque nuevo vive en el script de la tarjeta pequeña del mapa (línea ~1052-1180), que es un SVG simple sin pan/zoom, así que no hay contacto físico con este código. | `grep -n 'function focusBranch\\|function routeTap\\|function nodeAtPoint\\|function onNodeClick' index.html` | 1556 |
| Clases CSS ya existentes y theme-aware para reutilizar tal cual (nada de estilos nuevos inventados): '.btn.sm' y '.btn.sm.primary' para los 2 botones de voto (mismo patrón que el botón '🔍 Explorar el mapa en grande' de la propia tarjeta), y var(--line)/var(--accent-soft)/var(--ink)/var(--muted) para el cajetín (mismo patrón que #apEstado en la tarjeta 'Se juzga solo'). | `grep -n 'id="mapBig"' index.html` | 1050 |

**Pasos de implementación y verificación (del verificador):**

VEREDICTO: viable, con el incremento acotado a "dentro de #mapaCard, al final". El dilema que pide el encargo (etiquetas-pregunta 2 vs 8 ramas) SIGUE genuinamente abierto en v0.49 (comprobado: no hay v0.50+ que lo resuelva, __cmVersion="v0.49" en línea 5856, y CONTINUAR_AQUI.md sigue listando el punto E como "Pendiente su veredicto al VERLA" sin marcar hecho) — cero riesgo de inventar un dilema falso o ya cerrado.

PASOS DE IMPLEMENTACIÓN (2-5 líneas, ejecutables sin explorar más el fichero):
1. Abrir index.html, ir a la línea 1065 (grep -n 'data-card="🌳 El mapa de MADRE"').
2. Justo DESPUÉS de esa línea (el </div> del botón .fb) y ANTES de la línea 1066 (</div> que cierra #mapaCard), pegar UN bloque nuevo: un <div id="mapDudaCard"> con (a) título "🤔 MADRE duda ahora mismo", (b) un <p> con el texto real del dilema v0.35 (citar el propio comentario de la línea 1164, sin inventar cifras), (c) 2 botones (class="btn sm primary" / "btn sm") con id="mapDudaA"/"mapDudaB", (d) un <div id="mapDudaState" style="display:none"> para el estado post-voto, (e) el párrafo honesto "tu voto es consultivo...".
3. Justo debajo, un <script> IIFE (mismo patrón try/catch que el resto del fichero) que: lea localStorage.getItem('cm_duda_mapa_pregunta_v1') al cargar (si existe, esconde botones y muestra "Ya votaste: X"); en click de cada botón, guarda el flag en localStorage, actualiza el DOM, y llama window.__fb({card:"🌳 El mapa de MADRE › MADRE duda", section:"etiqueta-pregunta-8-ramas", tipo:"voto-duda", texto:"<label del choice>"}) dentro de un try/catch con typeof window.__fb==="function".
4. NO tocar 'state.decisions', NO tocar nada de #mbSvg/mapBig-ov, NO añadir animación/keyframe (evita necesitar guard reduced-motion; solo toggles de display).
5. El SKILL.md del loop cuaderno-feedback deberá, en su próxima pasada, saber tratar tipo='voto-duda' igual que ya trata 'comentario-rama'/'propuesta-rama' (contar votos y, cuando MADRE decida, escribir el resultado en el propio párrafo — eso es trabajo de la RUTINA, no de este incremento; dejar nota en el commit o en un DESDE_CLAUDE_* si se quiere avisar al loop, no bloquea el viable=true de HOY).

CÓMO VERIFICAR SIN preview_screenshot:
- Sintaxis: extraer el <script> nuevo (y de paso los que ya había) y correr `node --check` sobre cada uno (ver DESARROLLO_CUADERNO.md línea 9, es la convención ya usada: "38/38").
- DOM/funcional con preview_eval (no screenshot): `document.getElementById('mapDudaCard')` debe existir y ser el ÚLTIMO hijo de `document.getElementById('mapaCard')` antes del cierre; `document.getElementById('mapDudaA').click()` y comprobar `localStorage.getItem('cm_duda_mapa_pregunta_v1')` (debe tener JSON con choice/label/at) y que `document.getElementById('mapDudaState').style.display==='block'` con el texto "Ya votaste:...".
- Recargar (o simular releyendo el script) y comprobar que con el flag ya en localStorage, los botones quedan ocultos desde el primer render (dedupe funcionando).
- Regresión del mapa: confirmar que #mapSvg sigue teniendo sus nodos clicables (document.querySelectorAll('#mapSvg .mapNode').length === 8) y que un click sobre un nodo sigue actualizando #mapaInfo — prueba de que el script nuevo no rompió el IIFE del mapa pequeño que vive justo antes en el mismo bloque.
- getBBox no aplica aquí (no es SVG); basta con lo anterior + `document.querySelector('#mapaCard').lastElementChild.id==='mapDudaCard'` o el id del <script>, según cómo se cierre, para confirmar el orden de inserción (append, no insert-before).

RIESGO RESIDUAL (bajo, no bloqueante): el voto queda "flotando" en Supabase hasta que la rutina del loop lo lea y publique un resultado real — mientras tanto, el párrafo "publicaré el resultado aquí" es una promesa a futuro, no una mentira (no se muestra ningún tally inventado), así que cumple la regla de honestidad §9. Si se quiere cerrar el círculo del todo, un incremento futuro (fuera de este ticket) podría mostrar el conteo real vía SB.from('feedback').select() si las políticas RLS lo permiten — no verificado aquí, no asumir que funciona sin comprobarlo primero.

---

### 10. Latido en directo — eventos reales → pulso visible · ~60 min

**Efecto que produce:** Cuando alguien comenta o da like MIENTRAS miras: el indicador vivo late más fuerte 2s + toast de 1 línea («alguien acaba de comentar»), máx 1/min.

**⚖️ Ajustes del juez (Fable) — vinculantes:** Colgar el hook en el callback del canal 'comments-rt' existente (línea ~3732) SIN tocar su lógica de liveReload — añadir, no sustituir. Anti-spam: máx 1 toast/min.

**Avisos del verificador:**
- Antes de tocar el fichero: `git status`/`git log -3` en C:\Users\anton\cuaderno-madre-pub — verificado AHORA (10-jul) árbol limpio en v0.49, pero el propio CONTINUAR_AQUI.md avisa de más de un escritor en este repo; si al ejecutar hay cambios sin commitear ajenos, esperar/pull antes de editar (protocolo anti-colisión ya documentado en el propio repo, no es un bloqueo del incremento en sí).
- El RPC `like_comment` vive en Supabase (fuera de este fichero) — no se pudo verificar que haga un UPDATE real sobre `comments.likes` (lo más probable dado que el cliente hace optimistic-update de `c.likes` en la línea 3646 y luego llama al RPC). Si en vez de UPDATE hiciera un INSERT en otra tabla, la rama 'like' del toast simplemente no se dispararía nunca — degradación silenciosa aceptable (el toast de 'comentario nuevo' seguiría funcionando), no rompe nada; el ejecutor puede confirmarlo dando like a un comentario ajeno desde dos pestañas y viendo si el evento UPDATE llega al mismo canal.

**Qué existe ya cerca (no duplicar):** No hay duplicado exacto — verificado con grep ("acaba de", "alguien", "toast", "latido en directo") sin resultados previos de esta combinación. SÍ reaprovecha 3 piezas YA existentes (nada que construir de cero): (1) el canal realtime "comments-rt" (línea 3732) — event:"*" ya cubre altas (INSERT) Y likes (UPDATE vía RPC like_comment, línea 3644-3647), así que "comentario nuevo/like" del enunciado YA es UN solo canal, no dos; (2) el dot de #obLive en cabecera (línea 309 CSS + 1174-1178 JS) que ya pulsa de forma pasiva/continua; (3) el elemento y patrón #toast (línea 146-147 CSS + 2435 HTML) ya usado en 10+ sitios del fichero. Lo MÁS parecido que existe es el "latido" pasivo de #envivo .ev-now (línea 6104-6112): hace polling cada 60s a la última fila de comments y pinta "en vivo · última señal vuestra: hace N min" — pero NO es event-driven, NO tiene toast, y vive en una tarjeta a mitad de página, no en la cabecera. Relacionado, no solapa: es honesto documentarlo pero no bloquea el incremento.

**Anclas verificadas (usa el patrón grep; la línea es orientativa):**

| Qué | Patrón grep | Línea aprox |
|-----|-------------|-------------|
| Canal realtime de comentarios — AQUÍ se cuelga el hook (event:"*" ya cubre INSERT=comentario nuevo y UPDATE=like, es UN solo sitio, no dos) | `sb.channel("comments-rt").on("postgres_changes"` | 3732 |
| Elemento HTML del indicador vivo de cabecera (#obLive, vive en el hero #onboard, antes de cualquier scroll — coincide con "cabecera" del enunciado) | `<p class="ob-live" id="obLive" hidden></p>` | 329 |
| JS que rellena y muestra #obLive con el .dot dentro (dónde vive el nodo exacto que hay que pulsar más fuerte 2s) | `document.getElementById("obLive")` | 1175 |
| CSS del pulso BASE del dot de cabecera + su guard reduced-motion ya existente (clonar el patrón para el pulso fuerte nuevo, dentro del mismo <style> que cierra en línea 315) | `.ob-live .dot{width:8px;height:8px` | 309 |
| Elemento #toast YA existente y global (reutilizar tal cual, NO crear un 2º sistema de notificación) | `<div class="toast" id="toast" role="status"` | 2435 |
| OJO (gotcha real): el helper toast(msg) existe pero vive DENTRO de una IIFE de un <script> NO-module distinto (líneas 2564-3263); el canal de comentarios está en <script type="module"> (línea 3465-3733) — son scopes JS separados, toast() NO es accesible ahí. Hay que reescribir el mini-bloque de 3 líneas contra #toast directamente (textContent + classList.add("on") + setTimeout remove ~2600ms), copiando el patrón, no llamando a la función. | `function toast(msg){ var t=document.getElementById("toast")` | 2579 |
| post() — insertar aquí lastOwnActionAt=Date.now() para no autonotificarme cuando comento yo mismo | `async function post(parentId, name, body, file){` | 3633 |
| like() — mismo marcador de auto-eco, antes de la llamada RPC que dispara el UPDATE realtime | `async function like(id){` | 3644 |
| Declaración de estado del módulo de comentarios — aquí añadir las 2 variables nuevas (lastOwnActionAt, lastLiveToastAt) | `let all=[];` | 3523 |

**Pasos de implementación y verificación (del verificador):**

VEREDICTO: viable, no toca ninguna zona prohibida (cero contacto con onNodeClick/routeTap/nodeAtPoint/focusBranch, cero tarjetas nuevas/reordenadas, cero ASMR/caos). Encaja en 30-90 min porque son 4 puntos de edición minúsculos sobre infraestructura que YA existe entera (canal, dot, toast).

RIESGO #1 A NO SALTARSE (el que mata la honestidad del feature si se omite): sin una ventana de supresión, CUALQUIER visitante que comente o dé like a SU PROPIO comentario dispararía su propio toast "alguien acaba de comentar" 1-2s después (el postgres_changes le llega también a él vía el mismo canal — ya pasa hoy con liveReload(), es comportamiento existente). Eso violaría la restricción de honestidad (implica un tercero cuando eres tú). Fix: variable `lastOwnActionAt` puesta a Date.now() al ENTRAR en post()/like(), y en el handler del canal, si `Date.now()-lastOwnActionAt<4000` → return sin pulso ni toast (el liveReload() normal sigue disparándose igual, eso no se toca).

IMPLEMENTACIÓN (4 ediciones):
1. CSS (dentro del <style> que cierra en línea 315, justo tras la línea 311): añadir un keyframe `obLivePulseStrong` (2 iteraciones ~1s c/u = ~2s) aplicado vía una clase `.ob-live .dot.pulseStrong` con más opacidad/escala/box-shadow que el pulso base, + su propio `@media(prefers-reduced-motion:reduce){...{animation:none}}` (mismo patrón que ya usa el resto del fichero en 25+ sitios).
2. JS (línea 3523): `let lastOwnActionAt=0, lastLiveToastAt=0;`.
3. JS (dentro de post(), antes del insert; dentro de like(), antes del rpc): `lastOwnActionAt=Date.now();`.
4. JS (línea 3732): cambiar el callback de `()=>liveReload()` a `(payload)=>{ liveReload(); try{ var now=Date.now(); if(now-lastOwnActionAt<4000) return; if(now-lastLiveToastAt<60000) return; lastLiveToastAt=now; var live=document.getElementById("obLive"); if(live&&!live.hidden){ var dot=live.querySelector(".dot"); if(dot){ dot.classList.add("pulseStrong"); setTimeout(function(){dot.classList.remove("pulseStrong");},2000); } } var isNew=payload&&payload.eventType==="INSERT"; var msg=isNew?"💬 alguien acaba de comentar":"❤ alguien acaba de reaccionar"; var t=document.getElementById("toast"); if(t){ t.textContent=msg; t.classList.add("on"); setTimeout(function(){t.classList.remove("on");},2600); } }catch(e){} }`.

VERIFICACIÓN SIN preview_screenshot (se cuelga en esta página):
a) Sintaxis: extraer cada bloque <script> modificado a un .js temporal y `node --check` (el módulo con `import` necesita `node --check --input-type=module` o simplemente revisión visual cuidadosa de llaves/paréntesis, ya que node --check no ejecuta imports remotos).
b) Wiring de CSS sin red: en el navegador (preview_eval), `document.querySelector("#obLive .dot").classList.add("pulseStrong")` y leer `getComputedStyle(dot).animationName` — debe devolver "obLivePulseStrong"; luego confirmar que con `matchMedia("(prefers-reduced-motion:reduce)").matches===true` (el navegador de Tony lo tiene ON) la animación computada sea "none".
c) E2E real y honesto (dos pestañas del mismo preview, sin captura): en la pestaña A, `await window.__sb.from("comments").insert({body:"prueba latido "+Date.now(), name:"QA"})` (window.__sb ya está expuesto, línea 3471); en la pestaña B, sondear con eval `document.getElementById("toast").textContent` y `document.querySelector("#obLive .dot").classList.contains("pulseStrong")` en la ventana de los 2s siguientes. Igual para like: `like(id)` de un comentario que NO sea tuyo desde la pestaña A y observar B.
d) Limpieza: el insert de prueba queda en la tabla `comments` de PRODUCCIÓN (sb usa la key pública real, no hay entorno de test) — borrar la fila de prueba al terminar (vía Supabase dashboard/MCP; la anon key probablemente no tiene permiso DELETE) para no dejar basura visible a visitantes reales.
e) Regresión rápida: confirmar que liveReload()/load() siguen llamándose en TODOS los eventos igual que hoy (no se ha tocado esa parte) y que escribir un comentario en curso (reply-box abierto) sigue sin perder el texto (guard de v0.34, línea 3722-3730, no tocado).

---

### 11. Memoria del visitante — «la última vez llegaste hasta aquí» · ~70 min

**Efecto que produce:** Al volver en una visita posterior: chip «¿seguir donde lo dejaste? → [sección]» con scroll suave hasta la sección más profunda de tu visita anterior.

**⚖️ Ajustes del juez (Fable) — vinculantes:** Premisa corregida: NO existe un scroll-listener de secciones que reutilizar (los 3 reales son repositionHearts/reposition/checkFab y no sirven) — crear tracker propio ligero (scroll + setInterval de respaldo, patrón documentado). Leer cm_deepest_v1 ANTES de que el listener de esta visita empiece a sobrescribirlo (mismo patrón que diarioVivo con cm_lastvisit_v1, L469-522). Gatear el chip con nVis>1 (cm_visitas_v1 ya calculado en L971-974). NO añadir otro FAB: chip inline bajo la cabecera.

**Avisos del verificador:**
- La premisa 'reutilizando el scroll-listener existente' es FALSA tal cual está escrita: no hay ningún listener de scroll en el fichero que trackee 'sección/profundidad alcanzada'. Los 3 scroll-listeners reales son repositionHearts (L3412, atado al sistema de corazones nth-of-type — no tocar), reposition (L4535, anillo del tour) y checkFab (L6268-6270, visibilidad del FAB del mapa). Hay que ESCRIBIR uno nuevo calcando el idiom ticking+rAF de checkFab, no 'reusar' uno literal.
- Riesgo de colisión visual real si se clona el patrón #mapFab (botón flotante fijo): la página ya apila 7+ FABs en las esquinas inferiores (likeFab, cmtFab, lapizFab, chaosFab, cmvFab, fabHubBtn/Menu, mapFab) en bottom:16/64/66/74/80/112/132 — dos incluso comparten right:16;bottom:16 (cmtFab y fabHubBtn), señal de que ya están gestionados a mano para no chocar. Corrección de diseño: el chip debe vivir DENTRO de #onboard (append junto a #visitLine, L976-981), no como FAB nuevo.
- La feature está explícitamente aparcada en CONTINUAR_AQUI.md L97 dentro de 'Cola corta (baratas, SOLO si Tony pide seguir puliendo)' — no es un bloqueo técnico, pero es una condición de proceso documentada que conviene citar al reportar el incremento.
- Debe leerse localStorage('cm_deepest_v1') ANTES de que el propio listener de esta visita empiece a sobrescribirlo (mismo patrón que diarioVivo hace con cm_lastvisit_v1, L469-522) — si se lee después, el chip nunca podrá mostrar el valor de la visita ANTERIOR.
- Gatear la aparición del chip con nVis>1 (reusando cm_visitas_v1 ya calculado en L971-974, sin re-derivarlo) — si no, podría intentar mostrarse en la primera visita con un id inexistente en localStorage y fallar en silencio, o peor, mostrarse sin sentido.

**Qué existe ya cerca (no duplicar):** No es duplicado de código: 'cm_map_explored_v1' (L1677-1679, función markExplored) trackea qué RAMAS del mapa interactivo se han abierto — un eje distinto (dentro del overlay del mapa) al que pide este incremento (profundidad de scroll en la página, fuera del mapa). Sí es duplicado DE INTENCIÓN documentada: CONTINUAR_AQUI.md línea 97 ya nombra exactamente este ítem como '#16-completo «la última vez llegaste hasta aquí» (localStorage)' dentro de la Cola Corta — está pre-aprobado como candidato pero marcado 'SOLO si Tony pide seguir puliendo', o sea pendiente de luz verde explícita, no construido aún.

**Anclas verificadas (usa el patrón grep; la línea es orientativa):**

| Qué | Patrón grep | Línea aprox |
|-----|-------------|-------------|
| Punto de inserción del nuevo bloque: justo TRAS el cierre del IIFE 'volver' (v0.30, contador cm_visitas_v1 real) — no editar ese IIFE, añadir un <script> nuevo a continuación | `console.warn("volver",e)` | 982 |
| Contenedor donde debe vivir el chip (NO flotante) — mismo sitio donde ya se inyecta la línea real 'visita nº N' | `<div id="onboard">` | 325 |
| Contador de visitas REAL ya calculado — leer st.n / nVis, NO reimplementar el conteo | `var K="cm_visitas_v1", st={n:0,last:0}` | 971 |
| Idioma existente para abrir un <details> antes de hacer scroll a una tarjeta colapsada | `c.querySelector("details").open=true` | 967 |
| Guard de prefers-reduced-motion en scrollIntoView — copiar este ternario exacto | `behavior:reduce?"auto":"smooth"` | 923 |
| Detección estándar de reduced-motion usada en todo el fichero (uno de ~9 sitios) | `matchMedia("(prefers-reduced-motion:reduce)")` | 906 |
| Único patrón de scroll-listener throttled reutilizable (ticking+rAF) — NO existe uno que ya trackee 'sección más profunda', hay que escribirlo calcando este idiom | `window.addEventListener("scroll",function(){ if(!ticking)` | 6270 |
| ZONA PROHIBIDA #1 — no tocar ni importar: función de tap/click del mapa | `function onNodeClick(nd)` | 1660 |
| ZONA PROHIBIDA #1 — límite del bloque mapa (routeTap/nodeAtPoint/focusBranch, cadena de transformación SVG) — todo el IIFE mapaBig va de ~1041 a ~1925 | `function routeTap(cx,cy)` | 1600 |
| Mecanismo de anclaje nth-of-type de los corazones ('me gusta') — confirma que restricción #2 es real; un <button> plano (sin .card/.chip/.step) fuera de esta lista de selectores nunca puede recibir/desplazar un corazón | `nth-of-type` | 3342 |
| Lista exacta de selectores que SÍ pueden anclar un corazón — el nuevo elemento debe evitarlos todos | `closest(".senalItem,.card,.hero,.body p,.body li,.ctitle .t,summary,h1,.sub,.postit,#gateBar,footer,.heronote,.dec,.alert,.step,.chip,#senalesCard,#comentarios,.cmTex")` | 3400 |
| Texto real verificado del título de #madreHabla (para el mapa NAMES, cero invención) | `<span class="mh-title">MADRE te dice</span>` | 571 |
| Riesgo de colisión visual: ya hay 7+ botones flotantes apilados en las esquinas inferiores (bottom:16/64/66/74/80/112/132) — NO clonar el patrón #mapFab para este chip | `#mapFab{position:fixed;left:16px;bottom:112px` | 6254 |
| Feature YA documentada y aparcada en el backlog corto — citar, no re-descubrir | `#16-completo «la última vez llegaste hasta aquí»` | 97 |

**Pasos de implementación y verificación (del verificador):**

PASOS: (1) Nuevo &lt;script&gt; propio justo tras la línea 983 (cierre del IIFE 'volver' v0.30) — no editar ese bloque, añadir uno independiente al lado. (2) Objeto NAMES con SOLO estos 11 ids, texto copiado literal de su título real ya existente (cero invención): mapaCard='El mapa de MADRE'(L1044), prediccionesCard='El marcador: se juzga sola'(L784), vsCard='Una IA normal vs. MADRE'(L352), senalesCard='Señales del mundo'(L746), dondeVive='¿Dónde vive este cuaderno y cuándo te lee?'(L705), giroCard='8 de julio: alguien me vio'(L2379), comentariosCard='Comentarios'(L2391), caminoCard='Camino al 10/10'(L988), diarioVivo='📓 Diario del cuaderno'(L451), envivo='MADRE, en directo'(L397), madreHabla='MADRE te dice'(L571). (3) reduce=matchMedia(idem L906); prevRaw=localStorage.getItem('cm_deepest_v1') LEÍDO ANTES de instalar el listener. (4) Scroll listener throttled (idiom ticking+rAF de L6268-6270): en cada tick recorre Object.keys(NAMES), calcula getBoundingClientRect().top de cada uno, toma el de mayor offsetTop con top&lt;=innerHeight*0.6, y si supera al máximo ya guardado ESTA visita, localStorage.setItem('cm_deepest_v1', JSON.stringify({id,ts:Date.now()})) — solo avanza, nunca retrocede. (5) Al cargar: si prevRaw existe, su id sigue en document (getElementById), y nVis (leyendo cm_visitas_v1 de L971-974, sin re-derivarlo) &gt;1 → crear &lt;p id='seguirChip'&gt; con '¿Seguir donde lo dejaste? → '+NAMES[id]+' · tu visita nº '+nVis y un botón; appendChild en #onboard (L325), igual que hace visitLine (L976-981) — NO usar posición fixed ni clonar #mapFab (ver blocker de colisión). (6) Click: target=document.getElementById(prevId); det=target.closest('details')||target.querySelector('details'); if(det) det.open=true; target.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'}) (idem L923/967); luego remover el chip del DOM.

VERIFICACIÓN sin preview_screenshot (se cuelga en esta página): (a) `node --check index.html`; (b) en preview_eval: `localStorage.setItem('cm_deepest_v1', JSON.stringify({id:'senalesCard',ts:Date.now()-9e7})); localStorage.setItem('cm_visitas_v1', JSON.stringify({n:2,last:Date.now()-9e7}));` y luego `location.reload()`; tras recargar, `document.getElementById('seguirChip').textContent` debe incluir 'Señales del mundo' y 'visita nº 3'; (c) `document.getElementById('seguirChip').querySelector('button').click()` y comprobar `document.getElementById('senalesCard').getBoundingClientRect().top` está cerca de 0 (±80px) y que `document.getElementById('seguirChip')` ya no existe en el DOM; (d) `preview_console_logs` nivel error → debe quedar vacío; (e) grep del diff contra 'onNodeClick|routeTap|nodeAtPoint|focusBranch|nth-of-type|position:fixed' para confirmar cero contacto con zonas prohibidas.

---

### 12. Tactilidad premium (haptics + muelles) · ~45 min

**Efecto que produce:** Vibración sutil (navigator.vibrate(8), solo móvil, con guard) + curvas muelle y estados de presión en las interacciones de recompensa existentes (💗, likes, celebración).

**Qué existe ya cerca (no duplicar):** Parcial, no bloquea: el CSS del fichero YA usa curvas 'muelle' (overshoot cubic-bezier) en varios sitios — notas adhesivas L3827 (.34,1.56,.64,1), mapa grande L1226/L1284 (.2,1.3,.4,1 / .2,1.4,.4,1), gato L3868/L3897, tour L3965/L3985/L4021, papelitos caóticos L5129. Y el like de dibujos (.dbjsLike, L4072-4078) YA tiene un rebote de recompensa: keyframe dbjsBump (scale 1→1.3→1) al dar like. Conclusión: el LENGUAJE visual de 'muelle' no es nuevo — lo que falta de verdad es (1) el estado :active/press-down en los FAB y chips (hoy la mayoría solo tiene :hover), y (2) haptics (navigator.vibrate no aparece ni una vez en todo el fichero — cero riesgo de duplicar eso). Recomendación al ejecutor: define UNA variable/token reutilizando el valor .34,1.56,.64,1 ya usado, en vez de inventar una curva nueva.

**Anclas verificadas (usa el patrón grep; la línea es orientativa):**

| Qué | Patrón grep | Línea aprox |
|-----|-------------|-------------|
| Corazón (like de zona): dentro de confirm() de askLike, justo tras guardar el corazón nuevo — insertar navigator.vibrate(8) aquí, NO en addHeart() (esa también se llama al repintar los ya guardados al cargar la página, dispararía vibración fantasma sin acción del usuario) | `arr=loadLikes(); arr.push(rec); saveLikes(arr); addHeart(rec);` | 3387 |
| Like de comentario: función like(id) — el guard if(isLiked(id)) return ya impide re-disparo en clics repetidos, así que insertar el vibrate justo después de markLiked(id) es seguro (una sola vez por comentario) | `async function like(id){` | 3644 |
| Like de dibujo (👍 en galería): dentro del listener de click de .dbjsLike, el guard 'if(lk.classList.contains(dbjsLiked))return' ya está arriba — insertar el vibrate justo debajo, antes o después de arr.push(r.id) | `lk.addEventListener('click',function(){` | 4803 |
| Celebración (8/8 ramas exploradas): dentro de updateExpl(), la bandera didCelebrate=true SOLO se pone la primerísima vez en la historia del visitante (localStorage cm_map_done_v1) — insertar el vibrate ahí dentro, nunca en el 'if(didCelebrate) elx.classList.add(celebrate)' de la línea siguiente que se re-ejecuta en cada re-render | `localStorage.setItem("cm_map_done_v1","1"); didCelebrate=true;` | 1693 |
| Último bloque <style> del fichero (dedicado a #mapFab) — abrir un <style id="tactilCss"> NUEVO justo después de su </style> y antes del <button id=mapFab>, siguiendo el patrón de bloques con id ya usado en todo el fichero (mapaCss, dvCss, mhCss...) | `id="mapFab" aria-label="Volver al mapa de MADRE"` | 6260 |
| Patrón exacto de guard prefers-reduced-motion a replicar para las nuevas transiciones muelle (Tony lo tiene ON, así que sin este guard él nunca verá layout roto pero tampoco el efecto — es esperado) | `@media(prefers-reduced-motion:reduce){.lHeart{transition:none}}` | 220 |
| La curva 'muelle' con rebote YA EXISTE en el fichero (usada en notas adhesivas) — reusar este valor exacto como variable en vez de inventar una curva nueva, para no fragmentar el lenguaje visual | `transition: transform .42s cubic-bezier(.34,1.56,.64,1), opacity .3s ease;` | 3827 |
| Selector real del botón de like de comentario a enganchar :active (ya tiene :hover y transition; solo falta el estado de presión) | `.cmt .acts button{background:#fff` | 3484 |
| Selector real del FAB de corazón (#likeFab) — tiene transition pero CERO :active hoy | `#likeFab{position:fixed;right:16px;bottom:74px` | 199 |
| ZONA PROHIBIDA a no confundir con 'botones existentes': los controles de zoom del mapa grande (#mbIn/#mbOut/#mbReset) parecen botones normales pero llaman a zoomAround/collapseAll/center — NO tocarlos aunque el incremento diga 'botones existentes' | `var bi=document.getElementById("mbIn"),bo=document.getElementById("mbOut"),br=document.getElementById("mbReset");` | 1620 |

**Pasos de implementación y verificación (del verificador):**

PASOS DE IMPLEMENTACIÓN (2-5 líneas c/u):
1) En las 4 anclas de vibrate, usar EXACTAMENTE este patrón (ya es el estilo del fichero, try/catch silencioso): `try{ if(navigator.vibrate) navigator.vibrate(8); }catch(e){}` — una línea, sin dependencia, sin tocar el resto de la función.
2) CSS: abrir `<style id="tactilCss">` tras el último `</style>` (línea 6259, antes del botón #mapFab). Definir `:root{--muelle: cubic-bezier(.34,1.56,.64,1);}` (reusa L3827) y añadir `:active{transform:scale(.93);transition:transform .18s var(--muelle)}` a: #likeFab, #chaosFab, #cmtFab, #fabHubBtn, .chip[data-goto], .cmt .acts button, .dbjsLike (los que ya tienen :active como #tourLaunch/#lapizFab/#mapFab, opcional: solo cambiarles la curva a var(--muelle) en vez de la que tengan).
3) Envolver TODO el bloque nuevo en `@media(prefers-reduced-motion:reduce){ ... {transition:none} }` listando los mismos selectores — replica exacta del patrón L220.
4) NO tocar #mbIn/#mbOut/#mbReset ni ningún elemento dentro de <svg id="mapSvg"> (línea ~1620 en adelante) aunque técnicamente sean <button>: son parte de la cadena de zoom/pan prohibida.

CÓMO VERIFICAR SIN preview_screenshot (se cuelga en esta página, confirmado en CONTINUAR_AQUI.md):
- `node --check` de cada bloque <script> extraído (convención ya usada en este repo, "38/38"-style) para descartar roturas de sintaxis.
- preview_start + preview_console_logs (level:error) tras cargar → 0 errores nuevos.
- preview_eval: `getComputedStyle(document.querySelector('#likeFab')).transitionTimingFunction` debe devolver la curva nueva (no "ease"); repetir para los demás selectores tocados.
- preview_eval: parchear `navigator.vibrate` con un contador ANTES de interactuar (`navigator.vibrate=function(p){window.__v=(window.__v||0)+1;return true;}`), luego simular: click en #likeFab → click en una tarjeta → click en `.laOk` de #likeAsk, y comprobar `window.__v===1`. Repetir para el 👍 de un comentario real ya renderizado (`document.querySelector('.cmt .acts button').click()`) y para un `.dbjsLike` si hay dibujos cargados.
- La celebración (8/8 ramas) es la más cara de reproducir en E2E (exige abrir las 8 ramas); verificar por LECTURA del guard didCelebrate (reutiliza el mecanismo ya probado en v0.45/v0.48, documentado como "single-fire" en el propio código) en vez de gastar tiempo simulándola entera.
- preview_resize a 375-390px: confirmar que ningún :active con scale(.93) provoca overflow/salto de layout (usar solo `transform`, nunca padding/width/margin, para no chocar con el anclaje nth-of-type de los corazones — restricción 2).

AVISO DE CONTEXTO (no bloquea, pero léelo antes de tocar nada): CONTINUAR_AQUI.md documenta un "🧊 CONGELADOR" (7-jul→~21-jul) que en teoría prohíbe mejorar la web "porque sí" salvo señal real de visitante confundido. PERO la cabecera MÁS RECIENTE del mismo documento (10-jul, hoy) dice que Tony pidió explícitamente seguir en modo "no pares, busca el siguiente efecto" y la propia web ya subió de v0.37 a v0.49 hoy bajo esa autorización — por eso este incremento es viable HOY. Si se ejecuta en una sesión posterior, releer las primeras ~40 líneas de CONTINUAR_AQUI.md para confirmar que esa autorización sigue vigente antes de tocar nada.

NOMBRE: evitar llamar al token CSS nuevo "muelle" a secas — el ASMR (que esta tarea NO debe tocar, restricción 3) ya usa la palabra "muelle" como nombre de una textura de sonido (líneas 5483/5515/5537). No hay colisión funcional real (son namespaces distintos, JS string vs CSS custom property) pero para claridad futura mejor usar `--spring`/`--ease-spring` o similar.

---

### 13. Micro-imposibles del navegador (favicon vivo, título, consola) · ~40 min

**Efecto que produce:** Favicon vivo (2-3 frames alternando), título de pestaña que te habla al irte (visibilitychange) y easter egg de consola con un hecho real.

**⚖️ Ajustes del juez (Fable) — vinculantes:** Pausar la alternancia del favicon cuando document.hidden (no quemar CPU en pestaña oculta). El título al ocultar: «🌱 sigo creciendo — vuelve»; restaurar EXACTAMENTE el título original al volver.

**Qué existe ya cerca (no duplicar):** Ninguno de los 3 existe ya: grep de \"rel=\"icon\"\" solo devuelve el <link> estático de línea 21 (0 código que le cambie el href en runtime); grep de \"document.title\" da 0 resultados en todo el fichero; grep de \"console.log\" da 0 resultados (solo hay console.warn en catches de error, ningún easter egg). El precedente temático MÁS cercano —no bloqueante, mecanismo distinto— es v0.48 \"MADRE te guiña el ojo\" (changelog línea 3035): un parpadeo del emoji 🤱🏻 DENTRO del SVG del mapa, no del favicon. No hay solapamiento de código.

**Anclas verificadas (usa el patrón grep; la línea es orientativa):**

| Qué | Patrón grep | Línea aprox |
|-----|-------------|-------------|
| link de favicon actual (SVG data-URI con emoji 🤱, sin rotación — grep confirma 0 código que le toque el href) | `rel="icon"` | 21 |
| título actual, estático (0 coincidencias de document.title en todo el fichero → zona libre, sin duplicado) | `<title>Cuaderno MADRE</title>` | 6 |
| window.__cmVersion, ya global (fuera de cualquier IIFE de otro script) — hecho real #1 para la consola: "v0.49" | `window\.__cmVersion="v0\.49"` | 5856 |
| window.__cmCambiosMeta={count,oldest} — EXPUESTO A PROPÓSITO porque `cambios` vive dentro de su IIFE y no es global (dice el propio comentario de línea 3098); hecho real #2: 67 cambios reales desde 2026-06-21 | `window\.__cmCambiosMeta=\{count:cambios\.length` | 3100 |
| plantilla exacta a copiar: guard reduce declarado UNA vez + setInterval que comprueba document.hidden EN CADA TICK (no limpia/relanza el timer) — mismo patrón a reutilizar para el favicon | `paintSecret\(\); if\(!reduce\)\{ setInterval` | 6095 |
| declaración reutilizable del guard prefers-reduced-motion (Tony lo tiene ON) justo antes del bloque de arriba | `reduce=matchMedia\('\(prefers-reduced-motion:reduce\)'\)\.matches` | 6049 |
| punto de inserción: precedente real de "IIFE decorativo, self-contained, añadido al final del body" (el botón mapFab) — el nuevo bloque va justo después de este </script> y antes de </body> | `</body>` | 6278 |
| mecanismo real de anclaje de los 💗 (nth-of-type por posición del TAG) que la restricción 2 protege — confirmado que el incremento no crea ni toca ningún .card, por tanto no lo roza | `nth-of-type` | 3336 |

**Pasos de implementación y verificación (del verificador):**

REFUTACIÓN: pasa las 5 restricciones. (1) No toca onNodeClick/routeTap/nodeAtPoint/focusBranch/transform del SVG — los 3 sub-incrementos son document/head-level puros (link.href, document.title, console.log), cero relación con el mapa. (2) No crea ni reordena ninguna tarjeta: se añade como <script> nuevo al final de <body>, mismo patrón que el botón #mapFab (línea 6260-6277, precedente real de "bloque decorativo self-contained al final"). Los 💗 (nth-of-type, línea 3336) quedan intactos porque no se toca ningún .card. (3) No referencia el sistema ASMR ni el modo caótico. (4) Honestidad: el favicon y el título son decorativos (mismo espíritu que el guiño v0.48), y el console.log usa 2 hechos 100% reales YA cargados y globales: window.__cmVersion ("v0.49", línea 5856) y window.__cmCambiosMeta.count/.oldest (67 cambios desde 2026-06-21, línea 3100) — cero datos inventados. (5) Guard reduce: OBLIGATORIO solo en el favicon (es lo único con un setInterval/animación real); el cambio de título es un evento discreto en visibilitychange, no una animación en bucle, así que no necesita el guard (igual que otros textContent de la página que cambian sin PRM, p.ej. línea 495/513).

IMPLEMENTACIÓN (pegar como <script> nuevo entre línea 6277 y 6278, 3 IIFEs independientes con try/catch como el resto del fichero):
1) Favicon vivo: `var link=document.querySelector('link[rel="icon"]'); var reduce=false; try{reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;}catch(e){} if(link&&!reduce){ var frames=["🤱","🌱","🫀"].map(function(e){return 'data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">'+e+'</text></svg>');}); var i=0; setInterval(function(){ if(document.hidden) return; i=(i+1)%frames.length; link.href=frames[i]; },4000); }` — SVG data-URI con encodeURIComponent, NO canvas (el favicon ya es SVG en línea 21; usar canvas añadiría un <canvas> oculto + toDataURL sin ganar nada — mismo efecto, menos código, más consistente con el propio fichero). Frames reutilizan emojis YA temáticos de la página (🌱=proponer rama, 🫀=v0.40 "el mapa respira"), no son arbitrarios.
2) Título reactivo: `var orig=document.title; document.addEventListener('visibilitychange',function(){ document.title=document.hidden?'🌱 sigo creciendo — vuelve':orig; });` — sin guard reduce (no es animación, ver arriba).
3) Easter egg de consola: `var meta=window.__cmCambiosMeta||{},v=window.__cmVersion||''; console.log('%c🤱 Cuaderno MADRE '+v+'%c\\n'+(meta.count||'?')+' cambios reales desde el '+(meta.oldest||'?')+', todos con hora, en el repo público.\\n¿Ves una rama que falta? Abre el mapa 🌳 grande y toca el centro para proponerla.','font-size:14px;font-weight:800;color:#3b6ef5','font-size:12px;color:inherit');` — dato real, invitación real (el flujo "tocar el centro para proponer" ya existe, confirmado con grep de mbPropose/centerInteractive).

VERIFICACIÓN sin preview_screenshot (esta página cuelga el screenshot, confirmado en CONTINUAR_AQUI.md): (a) extraer el bloque nuevo a un .js suelto y correr `node --check archivo.js` (así validan los 39 <script> existentes, según DESARROLLO_CUADERNO.md línea 9); (b) contar que <script> y </script> siguen balanceados y el fichero sigue cerrando en </body></html>; (c) con el navegador de preview abierto: `preview_eval` → `document.querySelector('link[rel="icon"]').href` antes y ~4.5s después (debe cambiar de string); `preview_eval` → `window.__cmCambiosMeta` y `window.__cmVersion` (deben existir y no ser undefined, prueba de que el orden de scripts es correcto); `preview_eval` → `document.dispatchEvent(new Event('visibilitychange'))` para forzar que el listener del título corra sin lanzar excepción (no cambiará el texto porque document.hidden sigue en false dentro del preview, pero confirma que no rompe nada); `preview_console_logs` → debe verse el mensaje estilizado una sola vez, sin ningún error/warn nuevo (mantiene "consola limpia": 0 errores, el log intencional no cuenta como ruido).

---

### 14. Clima real — tinte nocturno por hora local · ~25 min

**Efecto que produce:** Si la hora local es 21:00-07:00, la web se tiñe sutilmente de noche (box-shadow inset, sin romper contraste AA ni chocar con los 12 temas).

**⚖️ Ajustes del juez (Fable) — vinculantes:** El CONGELADOR del 7-jul citado por el verificador está superado por el re-scope explícito de Tony del 10-jul (este plan ES el encargo). Enfoque box-shadow inset del verificador (evita la colisión con los 12 temas/fondos). Verificar contraste AA del texto con el tinte puesto.

**Avisos del verificador:**
- NO técnico: ninguno encontrado — el diseño propuesto (box-shadow inset en vez de background-image) evita la única colisión real detectada contra el sistema de 12-temas/fondos existente.
- SUAVE/proceso, NO bloqueante pero a verificar en 1 línea antes de tocar producción (regla 11 CONTRATO DE ALCANCE del CLAUDE.md): CONTINUAR_AQUI.md L148 declara un CONGELADOR de mejoras 'porque sí' (7-jul→21-jul) salvo evidencia de visitante real perdido/confundido. Sin embargo el tope del mismo fichero (L3-6, L40-41), fechado el MISMO 10-jul, dice que Tony RE-SCOPEÓ explícitamente para este repo ('mientras se trabaje en ESTE repo, el criterio es calidad percibida, no TTF€') y ya se enviaron 12 versiones (v0.37→v0.48) hoy bajo ese permiso; el propio ítem #13 aparece catalogado HOY en la 'cola corta' aprobada. Lectura más probable: el congelador quedó superado para este repo, así que NO debería frenar este incremento — pero como el ejecutor no es Tony, confírmalo leyendo el bloque superior de CONTINUAR_AQUI.md antes de escribir (ya es parte del checklist del propio doc: 'léeme ANTES de editar').

**Qué existe ya cerca (no duplicar):** No hay duplicado exacto: grep de "getHours|hora local|nocturno|noche|clima" sobre index.html completo da 0 resultados salvo lo que se construiría aquí. Sí hay 3 sistemas HERMANOS que rozan el tema pero no lo cubren (no reinventar sobre ellos, pero tampoco confundirlos con "ya existe"): (1) "skins de panel" — index.html L5860-5869: asigna una skin aleatoria POR TARJETA (papel-crema/papel-rosa/borde-ambar…, 8 en total, ver corpus "skins":[ dentro de window.__cmCorpus), sembrada por fecha, aplicada a .card, NO a <body>, y no distingue hora. (2) "12 temas-por-día" — index.html L3265-3286: ESTE es el que el ticket describe como "los 12 temas por día que aplican su clase al body" — CONFIRMADO, array `temas` con exactamente 12 entradas (L3269-3276), PRNG sembrado por FECHA (día, no hora) que fija --accent/--accent-soft/--bg vía documentElement.style.setProperty y además elige una clase de "fondo" aleatoria (bgGrid/bgStars/bgGlow/ninguna) que SÍ añade a document.body.classList (L3283). Cambia una vez al día, nunca por hora, y no es un tinte "nocturno" (los 12 temas son colores de acento variados, no oscurecimiento). (3) body.bgGrid/bgStars/bgGlow (L183-185): las 3 clases de fondo decorativo que usa (2), vía background-image — es la pieza con la que el tinte nocturno PUEDE chocar si se implementa mal (ver blockers/notas).

**Anclas verificadas (usa el patrón grep; la línea es orientativa):**

| Qué | Patrón grep | Línea aprox |
|-----|-------------|-------------|
| index.html: array de los '12 temas-por-día' (ESTE es el sistema real que aplica clase al body por fecha — 12 objetos, contados a mano en L3269-3276) | `var temas=[` | 3269 |
| index.html: PRNG sembrado por fecha (año/mes/día) que elige el tema del día — mismo patrón de seed a reusar SI hiciera falta, pero para hora no hace falta PRNG, basta new Date().getHours() | `_seed=(dt.getFullYear()*10000+(dt.getMonth()+1)*100+dt.getDate())` | 3279 |
| index.html: la línea EXACTA que añade la clase de fondo aleatorio al <body> (el ancla que pedía el ticket: 'cómo aplican los 12 temas su clase al body') | `document.body.classList.add(f)` | 3283 |
| index.html: patrón YA EXISTENTE de clases decorativas en <body> vía background-image (bgGrid/bgStars/bgGlow). RIESGO REAL: si el tinte nocturno también usa background-image, SE PISAN (gana la última regla en cascada, no se combinan) — hay que usar una propiedad CSS distinta (recomendado: box-shadow inset, ver notas) | `body.bgGrid{background-image:radial-gradient` | 183 |
| index.html: variables de color base — --ink (texto) y --muted (texto secundario) que NUNCA debe tocar el tinte; solo tocar superficie de fondo, nunca color de texto | `--ink:#1d2430; --muted:#5b6473` | 25 |
| index.html: regla body{...} base, para saber qué toca exactamente 'background:var(--bg)' que el tinte va a decorar por encima | `body{margin:0;background:var(--bg);color:var(--ink)` | 34 |
| index.html: cierre del IIFE de los 12-temas-por-día — punto natural de inserción de un <script> nuevo justo después, mismo bloque temático, sin tocar el existente | `})();\n</script>` | 3314 |
| index.html: array cambios[] del changelog, entradas MÁS NUEVAS primero — la nueva entrada v0.50 va justo aquí, antes de la de v0.49 | `var cambios=[` | 3033 |
| index.html: versión visible en el footer, a bump-ear de v0.49 a v0.50 junto con el changelog | `window.__cmVersion="v0.49"` | 5856 |
| index.html: patrón de guard reduced-motion ya usado en el fichero (referencia, por si en algún momento se añadiera una transición al aplicar la clase — con la implementación estática propuesta NO hace falta, ver notas) | `@media(prefers-reduced-motion:reduce)` | 161 |
| CONTINUAR_AQUI.md (mismo repo, no index.html): CONGELADOR de mejoras 'porque sí' declarado 7-jul→21-jul — LEER antes de tocar nada; ver notas sobre por qué probablemente ya está superado por el re-scope del propio 10-jul | `CONGELADOR (7-jul → ~21-jul` | 148 |
| CONTINUAR_AQUI.md: re-scope explícito de Tony el MISMO día 10-jul que ya produjo 12 versiones (v0.37→v0.48) en este repo bajo 'no pares, busca el siguiente efecto' — evidencia de que el congelador de L148 está superado para este repo | `Tony RE-SCOPEÓ explícitamente` | 40 |
| CONTINUAR_AQUI.md: el propio ítem #13 catalogado HOY en la 'cola corta' del triaje, confirma que no es idea nueva sino backlog ya aprobado en principio, gated solo a 'si Tony pide seguir puliendo' | `#13 tinte nocturno sutil por hora local` | 98 |

**Pasos de implementación y verificación (del verificador):**

VEREDICTO: viable, cabe holgado en 30-90 min, y el hallazgo de mayor valor de esta revisión es la respuesta a la pregunta "OJO" del propio ticket (¿el tema-por-día y el tinte componen bien o chocan?): CHOCAN si el tinte usa background-image (misma propiedad CSS que bgGrid/bgStars/bgGlow, L183-185 — la última regla en cascada gana, NO se combinan las dos capas). SOLUCIÓN: usar una propiedad CSS ORTOGONAL que nunca colisiona con background-image: box-shadow inset. Como .card/.hero tienen fondo OPACO propio (--card, L68), el box-shadow del body solo se ve en los huecos (márgenes, y detrás de h1/.sub/footer que sí están sueltos en .wrap sin card) — exactamente el mismo comportamiento que ya tienen bgGrid/bgStars/bgGlow, pero sin pisarlos.

PASOS DE IMPLEMENTACIÓN (2-5 líneas):
1. CSS — insertar justo después de la L185 (body.bgGlow): `body.noche{box-shadow:inset 0 0 0 9999px rgba(10,14,32,.05)}` (opacidad entre .04 y .06; VER contraste abajo, no superar ~.08).
2. JS — nuevo <script> standalone justo tras el `</script>` de la L3315 (cierre del IIFE de los 12-temas): `(function(){ try{ var h=new Date().getHours(); if(h>=21||h<7) document.body.classList.add("noche"); }catch(e){} })();` — se ejecuta una sola vez al parsear, sin timer, tal como pide el ticket.
3. Changelog — insertar objeto nuevo AL PRINCIPIO del array `cambios` (justo tras `var cambios=[` en L3033, antes de la entrada v0.49): `{fecha:"2026-07-10",titulo:"🌙 v0.50 — Clima real: si es de noche donde estás, el cuaderno también lo nota",detalle:"..."}`.
4. Versión — L5856 `window.__cmVersion="v0.49"` → `"v0.50"` (el texto del footer usa la misma constante, no hace falta tocar nada más).

CONTRASTE AA (verificado con cálculo real de luminancia relativa WCAG, no a ojo): probé los 12 --bg del array `temas` (L3270-3275) mezclados con overlay rgba(10,14,32,X) sobre el par más ajustado que existe en el fichero, --muted (#5b6473) sobre --bg (el que usa .sub y footer, que SON los únicos textos que quedan directamente sobre el body sin tarjeta opaca de por medio). Resultado: contraste baseline ~5.55-5.68:1 (ya pasa AA 4.5:1 con poco margen, no es cosa mía, es preexistente). Con overlay al 5% → ~4.99-5.11:1 (sigue pasando con margen). Al 8% → ~4.71:1 (al límite pero pasa). Al 10% → 4.49:1 (YA NO PASA en el peor --bg, #f8f5ff). CONCLUSIÓN: usar opacidad 0.04-0.06 dentro del rgba, nunca más de 0.08 — con eso el AA queda garantizado matemáticamente en los 12 temas sin necesidad de comprobar cada uno a mano. (Nota: contra-intuitivo pero correcto — oscurecer el fondo con texto YA oscuro sobre él BAJA el contraste, no lo sube, porque acerca las dos luminancias; por eso el límite de opacidad es real y no un "cuanto más oscuro mejor".)

GUARD reduced-motion: la implementación propuesta es 100% estática (clase fija + box-shadow fijo, sin transition ni animation), así que NO dispara ningún guard — no hay nada que "reducir". Recomendación explícita: NO añadir un fade-in de "pulido" a esto (el navegador de Tony tiene reduced-motion ON); si en el futuro alguien quisiera una transición suave, tendría que ir envuelta en `@media(prefers-reduced-motion:reduce){body.noche{transition:none}}` siguiendo el patrón de L161, pero la versión mínima de este ticket no lo necesita.

VERIFICACIÓN SIN preview_screenshot (se cuelga en esta página, confirmado en CONTINUAR_AQUI.md y DESARROLLO_CUADERNO.md L41): (a) `node --check` sobre el bloque nuevo; (b) en el navegador real (preview_eval): `document.body.classList.contains('noche')` debe coincidir con `(new Date().getHours()>=21 || new Date().getHours()<7)`; (c) forzar con `document.body.classList.add('noche')` vía eval y leer `getComputedStyle(document.body).boxShadow` (debe reflejar la regla) SIN que cambie `getComputedStyle(document.body).backgroundImage` (debe seguir mostrando el bgGrid/bgStars/bgGlow del día si tocó uno — así se prueba en 1 línea que NO chocan); (d) `preview_inspect` de un `.card` cualquiera para confirmar que su `background-color` sigue siendo blanco/--card intacto (el tinte no debe tocarlo, y si lo tocara sería el bug más grave posible aquí).

Zonas prohibidas: cero contacto — no toca #mapa/SVG/onNodeClick/routeTap/nodeAtPoint/focusBranch (es CSS+JS de <body> global, ajeno por completo a la cadena de transformación del SVG), no inserta/reordena tarjetas (el nuevo <script> va suelto entre dos <script> ya existentes, ninguna tarjeta nueva ni reordenada, los corazones nth-of-type quedan intactos), no toca ASMR ni modo caótico (grep confirma cero referencias cruzadas). Honestidad: la hora es `new Date().getHours()` real del navegador del visitante — dato 100% real, no inventado, exactamente lo que pide la restricción (4).

---

### 15. Voz de MADRE (modo escucha) · ~55 min

**Efecto que produce:** Botón «🔊 Escúchalo»: MADRE lee su propia historia con speechSynthesis (voz es-* si existe; el botón NO aparece si no hay soporte/voz).

**⚖️ Ajustes del juez (Fable) — vinculantes:** getVoices() puede devolver [] en la primera llamada (carga async) — listener 'voiceschanged' como fallback. Si nunca llega voz es-*, el botón queda oculto (comportamiento correcto, no bug).

**Avisos del verificador:**
- Ninguno duro. Único riesgo técnico: getVoices() puede devolver [] en la primera llamada (carga async de voces en Chrome/Edge) — mitigar con listener 'voiceschanged' como fallback; si nunca llega una voz es*, el botón se queda oculto (eso es el comportamiento CORRECTO pedido, no un bug).
- #obLive puede seguir hidden si window.__MAPA.ahora no matchea ningún nodo (no pasa hoy, pero sería un fallo silencioso de datos, no del incremento) — leer siempre con guard `!live.hidden && live.textContent` y degradar a solo las 3 frases si falta.

**Qué existe ya cerca (no duplicar):** No hay speechSynthesis/TTS en el fichero (0 matches de "speechSynthesis" en 6279 líneas) → genuinamente nuevo. Lo único tangencialmente relacionado es "voz en 1ª persona" (DESARROLLO_CUADERNO.md l.244), que es TONO DE TEXTO/copy, no audio — no es duplicado. El ASMR (síntesis por WebAudio, l.5417 AudioContext) es un sistema de sonido distinto por API distinta — cero solape funcional ni de código.

**Anclas verificadas (usa el patrón grep; la línea es orientativa):**

| Qué | Patrón grep | Línea aprox |
|-----|-------------|-------------|
| Contenedor de la historia de 3 frases (#onboard). El botón nuevo debe insertarse como ÚLTIMO hijo (tras el <p class="ob-ics">, antes del </div> de cierre) — NUNCA en medio, ver ancla de corazones más abajo. | `id="onboard"` | 325 |
| Las 3 frases reales de cabecera a leer, en orden: .ob-hi ("Soy MADRE"), .ob-big (la apuesta), .ob-q ("aposté en público, con fechas"). Selector estable ya usado por CSS, no por nth-of-type. | `class="ob-hi"` | 326 |
| Última línea a añadir tras las 3 frases: <p id="obLive"> ya existe (vacío/hidden por defecto) y se rellena en runtime con el AHORA real ("Ahora mismo: 🛡️ Activos publicados — se le da atención"). NO recalcular desde window.__MAPA: leer directamente live.textContent (dato ya honesto y ya calculado). Definición del elemento aquí; se rellena en la línea 1173-1177 (dentro de la IIFE del mapa, que corre antes por orden de documento). | `id="obLive"` | 329 |
| Confirmación de NO-interferencia con ASMR: usa Web Audio API (AudioContext/webkitAudioContext), API totalmente distinta de Web Speech API (speechSynthesis). Cero globals ni funciones compartidas. | `window.AudioContext\|\|window.webkitAudioContext` | 5417 |
| Punto de inserción del <script> nuevo: justo tras el </script> del CTA v0.33 (que solo abre el mapa al pulsar #ctaMapa), antes del comentario de la línea secundaria. Bloque autocontenido, IIFE con try/catch (mismo patrón que el resto del fichero), sin requerir nada de la IIFE del mapa. | `línea secundaria pequeña` | 344 |
| Por qué el botón va AL FINAL y no en medio: los corazones 💗 (like-mode) guardan en localStorage una ruta CSS calculada con nth-of-type POR TAG en el momento del clic (cssPath()). Insertar un <button> ANTES de un hermano existente desplazaría el índice de ese hermano y de todo lo posterior, rompiendo corazones ya guardados por visitantes reales. Insertar al final no desplaza a nadie anterior. | `nth-of-type("+(same.indexOf(el)+1)+")` | 3342 |
| Las 4 funciones prohibidas del mapa (pan/zoom/hit-test) localizadas y confirmadas FUERA del alcance de este incremento — no se tocan ni se referencian: focusBranch (l.1556), routeTap (l.1600), nodeAtPoint (l.1653), onNodeClick (l.1660). El incremento vive en #onboard, un bloque totalmente distinto del documento. | `function focusBranch` | 1556 |

**Pasos de implementación y verificación (del verificador):**

VEREDICTO: viable, cabe cómodo en 30-90 min (est. 55). No toca ninguna zona prohibida (mapa/ASMR/caos), no duplica nada, y usa solo texto ya presente en el DOM (honestidad §4 cumplida por diseño, no por revisión posterior).

PASOS DE IMPLEMENTACIÓN (2-5 líneas cada uno):
1. HTML: tras la línea 333 (<p class="ob-ics">...</p>), añadir `<p class="ob-row"><button type="button" id="vozBtn" class="ob-time" hidden aria-pressed="false">🔊 Escúchalo</button></p>` — hidden por defecto, reutiliza la clase .ob-time ya estilada (línea 273), cero CSS nuevo necesario para el MVP.
2. JS (nuevo <script> tras la línea 342, ver ancla): IIFE que (a) sale si !('speechSynthesis' in window); (b) busca voz es* con getVoices().find(v=>/^es/i.test(v.lang)) y re-intenta en 'voiceschanged'; (c) solo entonces btn.hidden=false; (d) al click, construye el texto leyendo en vivo .ob-hi/.ob-big/.ob-q + (si !obLive.hidden) obLive.textContent, crea un SpeechSynthesisUtterance con esa voz y lang es-ES/es-*, cambia el label a "⏹️ Parar" y aria-pressed=true; (e) segundo click o tecla Escape → speechSynthesis.cancel() + vuelve el label; (f) onend/onerror también resetean el label (evita que se quede en "Parar" si el TTS termina solo).
3. Nada de CSS animado nuevo → restricción (5) de reduced-motion no aplica (no hay @keyframes); si más adelante se añade un indicador pulsante de "hablando", reusar el patrón guardia ya presente en el fichero (ej. línea 906/1142: `try{ reduce=matchMedia("(prefers-reduced-motion:reduce)").matches; }catch(e){}`) antes de animarlo.

VERIFICACIÓN SIN preview_screenshot (se cuelga en esta página, confirmado en CONTINUAR_AQUI.md):
- Sintaxis: extraer el nuevo bloque <script>...</script> a un .js temporal y correr `node --check archivo.js` (patrón ya usado en el repo, hoy 40 bloques <script>, pasará a 41).
- Con el server local (launch.json "cuaderno", puerto 8138) + `mcp__Claude_Browser__preview_eval`: comprobar `typeof window.speechSynthesis`, `document.getElementById('vozBtn').hidden` (debe ser false si hay voz es*, true si no), simular click vía `document.getElementById('vozBtn').click()` y leer `speechSynthesis.speaking` (debe ser true), luego click otra vez y comprobar `speechSynthesis.speaking===false`.
- `mcp__Claude_Browser__preview_console_logs` para confirmar 0 errores nuevos.
- Confirmar que el resto del tap del mapa sigue intacto con un par de `preview_eval` que llamen a abrir/cerrar el mapa grande (mismo patrón de regresión que ya usan las sesiones anteriores, ej. "8→12 nodos tras click"), ya que es la prueba estándar de "no rompí el pan/zoom" en este repo aunque este incremento no lo toque en absoluto.

RECOMENDACIÓN EXTRA (no bloqueante): que el ejecutor confirme en Windows que Tony tiene al menos una voz es-ES/es-* instalada (normalmente sí, Windows trae "Microsoft Sabina/Helena" o similar) — si no la tiene, el botón se ocultará correctamente por diseño y no habrá nada que depurar.

---

### 16. Consecuencia visible de propuestas (agregado real horneado) · ~25 min

**Efecto que produce:** El panel de proponer muestra el agregado REAL horneado: «🌱 N propuestas de visitantes recibidas (a fecha X)» — número real de Supabase, patrón foto-con-fecha.

**⚖️ Ajustes del juez (Fable) — vinculantes:** Si el MCP de Supabase no está disponible en la sesión ejecutora → SALTAR y anotar. Antes del SQL: comprobar si feedback tiene columna hidden (filtrar hidden=false si existe). El número va horneado con fecha («a fecha 10-jul»), patrón foto-honesta.

**Avisos del verificador:**
- Verificar antes de escribir el SQL si la tabla feedback tiene columna 'hidden' de moderación igual que comments/drawings (CONTINUAR_AQUI.md linea 359 dice 'moderación hidden' para las 3 tablas) -- si existe, filtrar hidden=false/NULL para no contar spam moderado; si no existe esa columna en feedback, contar sin ese filtro.
- El ejecutor necesita el MCP de Supabase conectado al proyecto kopegamcjozrvmxruwdn (CONTINUAR_AQUI.md linea 359) -- ya asumido por el enunciado, solo lo dejo explícito.

**Qué existe ya cerca (no duplicar):** No hay duplicado directo. Lo único parecido son los brotes '⏳ en revisión' (index.html líneas 1788-1821, función drawGhosts): muestran SOLO las propuestas pendientes de ESE dispositivo via localStorage (cm_props_pending_v1), nunca un agregado global de todos los visitantes. El incremento propuesto (contador global horneado) es complementario, no redundante.

**Anclas verificadas (usa el patrón grep; la línea es orientativa):**

| Qué | Patrón grep | Línea aprox |
|-----|-------------|-------------|
| Contenedor del panel de proponer (ancla principal, fuera del sistema de tarjetas con corazones) | `id="mbPropose"` | 1358 |
| Título del panel (línea 1 del panel) | `class="mbPropTitle"` | 1359 |
| Chip de contexto -- lo rellena JS dinámicamente (openP en linea 1492), NO tocar ni reusar este id | `id="mbPropChip"` | 1360 |
| PUNTO DE INSERCIÓN exacto: nueva <div class="mbPropCount">🌱 propuestas de visitantes recibidas: N (a fecha X)</div> justo aquí, entre el cierre de mbPropChip y el <label> siguiente | `</div>\n      <label class="mbPropLbl" for="mbPropName"` | 1361 |
| Bloque CSS del panel donde añadir la regla .mbPropCount (copiar estilo de .mbPropChip o .mbPropNote) | `.mbPropChip{font-size:12.5px;color:#aab4d0` | 1303 |
| Precedente EXACTO del patrón 'foto-con-fecha' ya usado y aceptado en la web (número real + fecha, texto estático, sin JS) | `Más de <b>800 vídeos</b> absorbidos y destilados (a 10-jul-2026)` | 2265 |
| Precedente del patrón 'snapshot horneado' (bloque de datos escrito por la rutina, comentario NO editar a mano) | `Snapshot horneado de CUADERNO_ESTADO.tsv` | 2446 |
| Confirma que la tabla feedback es PRIVADA (anon no la lee) -- valida la premisa del incremento, no es invención | `feedback.*privada: anon NO la lee` | 337 |
| Confirma el nombre de columna real a filtrar en SQL (tipo) y su valor exacto para branch-proposals | `SB.from("feedback").insert({ card:tarjeta, section:seccion, tipo:` | 2645 |
| Valor EXACTO de tipo que hay que contar en el SQL (WHERE tipo='propuesta-rama') | `tipo:"propuesta-rama"` | 1513 |
| Zona PROHIBIDA (1) -- confirmado que estas 4 funciones están lejos del punto de inserción y no se tocan | `function onNodeClick\|function routeTap\|function nodeAtPoint\|function focusBranch` | 1556 |

**Pasos de implementación y verificación (del verificador):**

REFUTACIÓN: no toca zona prohibida (1) -- #mbPropose es un panel HTML estático superpuesto al SVG, las 4 funciones de pan/zoom/hit-test viven en líneas 1556-1660, sin relación. No toca (2) -- #mbPropose NO es una de las 'tarjetas' del listado principal (esas usan nth-of-type para anclar corazones, función en línea 3336-3342); añadir un <div> hijo DENTRO de #mbPropose no altera el nth-of-type de NINGÚN elemento hermano de otro nivel. No toca (3) ASMR/caos -- cero relación. Cumple (4) honestidad -- el patrón 'N (a fecha X)' ya existe tal cual en línea 2265 (800 vídeos, a 10-jul-2026), y la privacidad de la tabla feedback está confirmada en CONTINUAR_AQUI.md línea 337, no es una suposición del prompt. No necesita guard de (5) porque es texto estático sin animación propia (hereda la animación ya guardada de #mbPropose en línea 1315 si el panel se abre). PASOS DE IMPLEMENTACIÓN (2-5 líneas): 1) vía MCP Supabase, ejecutar `select count(*) from feedback where tipo='propuesta-rama'` (añadir `and (hidden is null or hidden=false)` si la columna existe) contra el proyecto kopegamcjozrvmxruwdn; 2) insertar en línea 1303 la regla `.mbPropCount{font-size:11.5px;color:#8b96b6;margin:2px 0 8px}`; 3) insertar entre líneas 1360-1361 `<div class="mbPropCount">🌱 propuestas de visitantes recibidas: N (a fecha DD-mmm-AAAA)</div>` con N y fecha reales del paso 1; 4) NO usar JS, es texto ya horneado (coherente con el patrón de línea 2265). VERIFICACIÓN SIN preview_screenshot (esta página cuelga el screenshot): abrir el HTML y en consola ejecutar `document.querySelector('#mbPropose .mbPropCount').textContent` (debe devolver la frase con el número real); luego `window.__openPropose({donde:'rama-nueva',parentPath:'(raíz)',depth:-1,color:'#7c3aed'})` y comprobar que `document.getElementById('mbPropChip').textContent` sigue poblándose normal (confirma que no rompimos openP) y que `document.getElementById('mbPropose').hidden===false`; opcionalmente `document.querySelectorAll('.card').length` antes/después del cambio debe dar el mismo número (confirma que no se tocó el listado de tarjetas ancladas por corazones). Estimado real: ~10 min consulta SQL + ~10 min editar HTML/CSS + ~5 min verificación en consola = ~25 min, dentro del rango 30-90 con margen amplio.

---

### 17. Espejo del visitante — tu recorrido en esta sesión · ~60 min

**Efecto que produce:** Al llegar al final de la página: «tu recorrido: donde más te paraste fue [sección]» — medido solo en local, cero servidor.

**Qué existe ya cerca (no duplicar):** Ninguno. Grep de "recorrido|dwell|tiempo por sección|te paraste|donde más" → 0 resultados en index.html. Grep de "Espejo|espejo" → 1 único hit y es un falso positivo no relacionado (línea 2556, frase del modo caótico "Guíñale un ojo al espejo la próxima vez que pases", dentro del array "orders"). El único sistema parecido que existe es cm_map_explored_v1 (localStorage que registra qué RAMAS del mapa se han abierto, líneas 1056/1693) pero es un tracking de EXPLORACIÓN DEL ÁRBOL, no de scroll/tiempo por sección de la página — no se solapa con este incremento.

**Anclas verificadas (usa el patrón grep; la línea es orientativa):**

| Qué | Patrón grep | Línea aprox |
|-----|-------------|-------------|
| Patrón de scroll-listener a IMITAR (rAF-throttle + setInterval de respaldo 900ms; mismo espíritu pide el encargo). Es el #mapFab, el bloque <script> justo antes de </body>. | `function checkFab\(\)` | 6269 |
| Punto EXACTO de inserción del nuevo <script>: justo después de este cierre y antes de </body> (línea 6278). Añadir el bloque nuevo ENTRE estas dos líneas. | `</script>\n</body>` | 6277 |
| Separadores .tonySep: se crean EN RUNTIME (no están en el HTML fuente) por el re-secuenciador, con el texto humano de cada Acto como primer childNode. Hay que leerlos, no inventar los nombres. | `function sep\(txt,sub\)` | 6226 |
| Los 4 nombres humanos reales de sección que usará el incremento (más 'Portada y el mapa' como sección implícita antes del primer separador): ACTO I, ACTO II, EL GIRO, ACTO III. | `ACTO I · Lo que me juego` | 6233 |
| CSS ya existente de los separadores (no crear estilos nuevos, solo leer sus nodos). | `\.tonySep\{margin:30px` | 244 |
| Anclaje de destino para la línea discreta: el <footer> real, que es el ÚLTIMO elemento de .wrap y NO figura en el array `seq` del re-secuenciador (por tanto nunca se mueve) — cumple 'al FINAL tras la última tarjeta', no crea una tarjeta nueva ni se inserta ENTRE tarjetas. | `<footer>` | 2400 |
| Mecanismo real de anclaje de los corazones 💗 (nth-of-type dinámico por TAG entre hermanos) — confirma que añadir un <div> hijo dentro de <footer> NO altera ningún cssPath ya guardado en localStorage (footer no es .card y no tiene hijos referenciados hoy). | `function cssPath\(el\)` | 3337 |
| Patrón de guard reduced-motion a copiar SOLO si se decide animar la aparición de la línea (la versión mínima recomendada no anima nada y no lo necesita). | `@media\(prefers-reduced-motion:no-preference\)\{ #mbPropose` | 1315 |
| Convención ya usada en el repo para exponer estado en window.__cm* (para depurar sin screenshot vía preview_eval), coherente con lo que se propone añadir (window.__cmRecorrido). | `window\.__cmCambiosMeta=` | 3100 |

**Pasos de implementación y verificación (del verificador):**

VEREDICTO: viable, cabe cómodo en 45-60 min. No toca zona prohibida (nada de SVG/onNodeClick/routeTap/nodeAtPoint/focusBranch, nada de ASMR/caos), no inserta ni reordena .card (usa <footer>, que ya es el final estructural y no está en el array `seq` del re-secuenciador), y los datos son 100% reales (tiempo de scroll real del propio visitante + nombres de sección que ya existen literalmente en el DOM).

PASOS DE IMPLEMENTACIÓN:
1. Nuevo bloque <script> entre línea 6277 y 6278 (después del script de #mapFab, antes de </body>). Todo envuelto en `(function(){ try{ ... }catch(e){} })();` con early-return si falta `.tonySep` o `<footer>` (patrón universal del archivo).
2. `var seps=[].slice.call(document.querySelectorAll(".tonySep"))`; construir `secciones=[{nombre:"Portada y el mapa"}].concat(seps.map(function(s){return {nombre:(s.childNodes[0]?s.childNodes[0].nodeValue:s.textContent).trim(), el:s};}))`. IMPORTANTE: recalcular `top=el.getBoundingClientRect().top+window.scrollY` EN CADA tick (no cachear una vez), porque los comentarios (`#comentarios`, carga async) pueden desplazar el layout tras el primer cálculo.
3. Función `cmrSeccionActual()`: usa `window.scrollY+innerHeight/2` y recorre `secciones` devolviendo el nombre de la última cuyo `top` (recalculado) sea ≤ ese punto (la "Portada" implícita = top 0 fijo).
4. `tiempos={}` en memoria (por sección). Listener `scroll` con throttle rAF (calcado de checkFab, línea 6268-6270) + `setInterval(fn,900)` de respaldo (línea 6275) que en cada tick suma `Math.min(Date.now()-last,5000)` (tope anti-tab-en-background) a `tiempos[seccionActual]` si `!document.hidden`.
5. Cuando `footer.getBoundingClientRect().top < innerHeight` por primera vez (mismo chequeo que usa `checkFab` para #mapFab, línea 6269): elegir la clave de `tiempos` con mayor valor y `footer.appendChild()` un `<div id="cmRecorrido">` con `textContent="🧭 tu recorrido: donde más te paraste fue en " + top`. Sin animación (no necesita guard reduced-motion); si se quiere un fade-in, usar el patrón de la línea 1315.
6. Opcional/recomendado: `window.__cmRecorrido={tiempos:tiempos}` para poder inspeccionar por eval sin tocar el DOM (mismo patrón que `window.__cmCambiosMeta`, línea 3100).

CÓMO VERIFICAR (preview_screenshot cuelga en esta página — usar eval/consola/inspect):
- Extraer el JS nuevo a un .js temporal y correr `node --check` (mismo patrón "node --check N/N" que ya usa el repo en cada versión).
- `preview_eval`: `window.scrollTo(0, document.body.scrollHeight)` → esperar ~1200ms (setInterval respaldo) → leer `document.getElementById('cmRecorrido')?.textContent`; debe contener uno de los nombres reales de sección.
- `preview_eval`: `window.__cmRecorrido.tiempos` para confirmar que los ms acumulados son coherentes (suman aprox. el tiempo transcurrido) y que no hay NaN/Infinity.
- `preview_console_logs` nivel error → debe seguir en 0 tras el cambio.
- `preview_inspect` sobre `#cmRecorrido` para confirmar que su padre es `footer` (no una `.card` nueva) y que no desborda a 360-390px.
- Regresión estándar del repo tras cualquier cambio: abrir/cerrar una rama del mapa con tap simulado (toggle de nodos) para confirmar que `onNodeClick`/`focusBranch` siguen intactos — aunque el incremento no los toca, es la verificación que exige el propio CONTINUAR_AQUI.md en cada versión.

CAVEATS (no bloqueantes, para que el ejecutor no se sorprenda):
- Es tracking DE SESIÓN (memoria, no localStorage) — coherente con el título "tu recorrido en esta sesión" del encargo; persistir entre recargas sería una v2 fuera de alcance.
- Existe otra función `tick()` en un scope distinto (línea 6206, rueda del hámster) — no colisiona por estar en su propia IIFE, pero conviene nombrar las funciones nuevas con prefijo `cmr` para que un futuro grep no se confunda entre ambas.
- El nombre "Portada y el mapa" para la sección antes del primer separador es una ETIQUETA de navegación (como las que ya usa `sep()` para los Actos), no un dato/cifra — no viola la regla de honestidad (esa regla protege números/hechos inventados, no etiquetas de UI).

---

## BITÁCORA del ejecutor (append-only: qué se hizo, qué se saltó y por qué)

**Sesión 1 (Sonnet 5, 10-jul-2026, ~1h40 reales, 9/17 incrementos, v0.49→v0.58, sin parar entre uno y
otro salvo para verificar):**

- **v0.50 Génesis** — HECHO. Typewriter+cascada en 1ª visita, botón saltar, guard reduce+one-shot.
  Verificado: node --check, 2ª visita instantánea, 360px sin overflow, consola limpia.
- **v0.51 Organismo** — HECHO. Canvas fixed z-index:-1, N=cambios.length partículas, ~11fps (no 60fps,
  ahorro CPU). Verificado: canvas creado con estilos correctos, 65 partículas reales, 0 errores.
- **v0.52 Modo película** — HECHO. Overlay propio, changelog real en secuencia. **Bug real cazado
  ANTES de shippearlo** (el verificador lo predijo): `loadCambios()` puede sustituir el array `cambios`
  con datos de Supabase sin tocar la variable original → `renderCambios()` ahora expone SIEMPRE
  `window.__cmCambios` = la lista REALMENTE pintada (fix aplicado en la propia función, no solo en mi
  incremento). Verificado: 66 entradas reales, navegación manual OK, Esc cierra, 360px OK.
- **v0.53 Presencia compartida** — HECHO. **Bug real de carrera cazado y arreglado**: mi script (regular,
  corre síncrono durante el parseo) intentaba usar `window.__sb` ANTES de que el `<script type=module>`
  con el import remoto de Supabase hubiera corrido (los módulos son deferred, corren DESPUÉS). Solución:
  mismo patrón poll ya usado en el hub (`#cmtFab`, 200ms/25 intentos) esperando a `window.__sb` en vez de
  a un elemento del DOM. Verificado con test REAL de Presence contra Supabase (SUBSCRIBED+tracked+synced)
  antes de escribir nada, y tras el fix: "🟣 explorando ahora: tú" aparece correctamente.
- **v0.54 Reliquia** — HECHO. Botón "💾 Guardar recuerdo" en la celebración de las 8 ramas → canvas
  1080×1080 con datos reales (meta.count, meta.oldest, fecha de hoy) → descarga PNG + share si existe.
  Verificado: blob real de ~700KB generado, botón aparece solo con las 8 ramas exploradas, tap del mapa
  intacto (12 nodos, cero toque a onNodeClick/routeTap/focusBranch).
- **v0.55 Teatro de errores** — HECHO. La idea del cementerio "dejar que el predictor interno decida"
  se volvió interactiva (3 opciones → revelación literal del texto ya existente). Verificado: acierto y
  fallo ambos revelan el texto correcto, botones se deshabilitan tras elegir, 360px OK.
- **v0.56 Logros honestos** — HECHO. 6 hitos reales (explorar 4+/8 ramas cuenta como 2 logros distintos
  —parcial/completo—, no 3 como advertía el verificador; comentar y dibujar necesitaron 2 hooks nuevos
  de 1 línea cada uno colgados en `post()` y en el `.then(ins)` del envío de dibujos). Verificado: panel
  reactivo (1/6→3/6 al simular logros), oculto-con-"???" para lo no conseguido, 360px OK.
- **v0.57 Clima** — HECHO. Tinte nocturno 21-07h hora local, capa fija z-index:-2 (detrás del organismo,
  nunca sobre texto → cero riesgo de contraste, mismo patrón que v0.51). Verificado con hora simulada.
- **v0.58 Micro-imposibles** — HECHO. Favicon vivo (3 frames/4s, pausa oculto), título que llama al irte
  y se restaura EXACTO al volver, easter egg de consola con dato real (72 cambios). Verificado: título
  hidden/visible correcto, favicon cambia de encoding (confirma tick), consola sin errores.

**PENDIENTES (8/17, no tocados esta sesión — el plan de cada uno sigue arriba, listo para retomar sin
releer nada):** MADRE duda (#9) · Latido en directo (#10) · Memoria del visitante (#11) · Tactilidad
premium (#12) · Voz de MADRE (#15) · Consecuencia visible de propuestas (#16, requiere MCP Supabase) ·
Espejo del visitante (#17) · Presencia de MADRE en toda la página (#8 — el más delicado de los que
faltan: el verificador corrigió 3 anclas falsas, revisar sus notas con calma antes de tocarlo).

**Aprendizaje que vale para las próximas sesiones de este repo:** el navegador de PREVIEW (no solo el
de Tony) tiene `prefers-reduced-motion:reduce` ON por defecto — toda verificación de una rama animada
necesita una réplica manual inyectada por eval con `reduce` forzado a false (patrón usado en v0.50), no
basta con mirar la ejecución real. Y **`window.__sb` (Supabase) puede no existir aún** cuando corre un
`<script>` normal cerca del final del body, porque el módulo que lo crea es deferred y corre después —
cualquier incremento nuevo que use `window.__sb`/`window.__identity` debe envolver su arranque en el
mismo poll de 200ms que ya usa `#cmtFab` (línea ~5853), NUNCA asumir que ya está listo.
