# CONTINUAR_AQUI — handoff del Cuaderno MADRE (léeme primero)

> **⚙️ REGLA OPERATIVA (Tony, 7-jul — "que lo que tenemos SE USE"):** toda tanda VISUAL/UX de esta web
> usa el arsenal PROPIO antes de improvisar: **(1)** skill `ui-ux-pro-max` (instalada globalmente — motor
> de diseño: estilos/paletas/tipografías/accesibilidad), **(2)** `DISEÑO_HEURISTICAS.md` (este repo),
> **(3)** `MADRE_UI_REFERENCIAS.md` + `UI_REFS_INBOX.txt` (referencias capturadas), **(4)** memoria
> [[efecto-wow-factor-visual-madre]] (test: «¿se ve de app o de formulario del 2000?»). Si haces UI sin
> pasar por (1)-(4), estás re-inventando lo que ya tenemos — el fallo exacto que Tony cazó el 7-jul.

> Para retomar en un chat nuevo de Claude Code. **Estado a 2026-07-06, versión v0.27 (verificada en preview; detalle en CHANGELOG).**

## 🧵 HILOS ABIERTOS — EMPIEZA POR AQUÍ (2026-07-06, tras v0.27)
> **✅ v0.27 (6-jul noche, sesión Fable, en el clon `cuaderno-madre-pub`) — el mapa APUESTA POR ESCRITO:**
> (1) `__MAPA` refrescado a la foto real del 6-jul (AHORA=🛡️ semana de exposición: 2 plugins en revisión
> en el catálogo oficial; loop=4 pasadas/día, ya no «cada 30 min»; benef 🛡️ 4→8; kid session-triage; kid
> «Registro de capacidades» en 📚). (2) Campo `juicio:{cree,cambia,fecha}` en las 8 ramas + render `.mbJuicio`
> en el panel del mapa grande (⚖️ qué cree / 🔮 qué la haría cambiar / 📅 cuándo la juzga la realidad —
> SOLO falsadores reales ya escritos en MADRE, cero inventos; horneable por el loop). (3) Tarjeta nueva
> `#prediccionesCard` «🔮 Se juzga solo» tras Señales: 8 predicciones reales con estado (3 ❌ + 1 ✅ + 4 ⏳,
> fechas 10-jul/15-jul/1-ago/1-sep) — los fallos a la vista a propósito (es el ítem nº1 de la revisión
> externa del cuaderno, aplicado en versión honesta). Verificación: 0 errores consola, inspect de estilos,
> móvil 375 sin overflow. GOTCHA del instrumento: `preview_screenshot` se CUELGA con esta página (timeout);
> eval/inspect van perfectos — verifica por DOM+estilos, no pierdas tiempo con capturas.
> **⏭️ Siguientes naturales del mapa (cuando haya datos, no antes):** marcar ✅/❌ en la tarjeta según
> caigan los veredictos (10/15-jul los trae el watcher/medidor); si el loop hornea `MAPA_RAMAS.tsv`, que
> incluya `juicio` y `para` (el render ya soporta ambos); GPT también pidió «radar» y «embudo cognitivo» —
> DIFERIDOS por falta de números reales agregados (no inventar).
> **⏭️ v0.29-v0.31 dejaron hechos** (misma noche, con permiso total de Tony): comentarios wow + 👍 chip,
> 🌐 English fijo, muro de misiones, mapa (panel 30vh + re-centrado en todo toque), ASMR re-ON + cristal/slime,
> más caos clicable (bolas/globos), chip cuenta-atrás del veredicto, saludo de visita, APUESTA PÚBLICA en cabecera.
> **⏭️ BACKLOG «momentos virales» (última ronda GPT, filtrado — para un sprint futuro con el criterio
> «no añadir sin eliminar/fusionar algo antes»):** (1) feed «Hoy MADRE cambió de opinión» (necesita fuente
> real: podría salir de PREGUNTAS CERRADAS/decisiones del loop — NO inventar); (2) replay «últimos 7 días
> en 30 s» (fuente real: CHANGELOG/cambios); (3) marcador de CREDIBILIDAD (sube con predicciones acertadas,
> baja con falladas — computable de la tarjeta 🔮 cuando haya ≥6-8 resueltas; hoy solo hay 4); (4) votación
> «MADRE duda» (posible vía Supabase feedback, pero OJO moat+gates: la decisión real la toman los datos, el
> voto sería CONSULTIVO y hay que decirlo). La regla de Tony aplica: horizonte ≤3 días — hacer UNO cuando toque, no los 4.
> **⏭️ v0.28 dejó hechos** (misma noche): tour guiado 90s (`#tourBtn`/`#tourOv`), frase-clic, `para` por
> rama, promesa «~30 min» corregida. **Ronda 2 de GPT sobre el mapa, clasificada:** los 3 que «más moverían»
> (grafo de dependencias entre ramas · vista de flujo «idea→regla→realidad» · edad/estabilidad por rama +
> latido de ramas recién cambiadas) quedan como LA evolución natural del mapa, PERO exigen (a) datos por
> rama que nadie registra aún (edades, cambios/mes, dependencias declaradas) y (b) tocar en profundidad el
> SVG endurecido del tap — NO hacerlos «a ojo» ni deprisa; si se abordan, empezar por declarar dependencias
> reales en `__MAPA` (campo `deps:[emojis]`) y pintarlas como líneas finas, que es lo único barato y honesto.

## 🧵 HILOS ANTERIORES (2026-07-04, tras v0.23→v0.26)
> **✅ v0.26 (commit `8adabca`) — 2 ítems del backlog "organismo vivo" implementados (los marcados "barato/
> honesto/próxima sesión" en la ronda anterior):** (1) **Descubrimientos ocultos** en el mapa (`#mbUnlock`,
> reusa `cm_map_explored_v1`): al abrir ≥4 ramas se desbloquea un aviso real (el cementerio de ideas
> muertas, con botón que cierra el mapa y abre esa tarjeta ya existente); al abrir las 8 se desbloquea un
> 2º dato real (nº de cambios documentados + fecha del más antiguo, vía `window.__cmCambiosMeta` — expuesto
> por el IIFE de la Evolución, que tenía el array `cambios` PRIVADO en un `(function(){"use strict";...})()`,
> no global; cero llamadas nuevas). (2) **Chip `#chipSenales`** junto al "3/10" del hero → enlaza a
> `#senalesCard` (la sección ya existente con los datos NO inflables: euros/estrellas/clientes) — conecta
> el número resumen con su desglose real, que ya existía pero no estaba enlazado. Verificado con touch+jitter
> real + regresión completa del tap, 0 errores, móvil OK. Ambos clones (A y B) sincronizados a `8adabca`.
>
> **⚠️ DOS CLONES del repo en este PC — anti-confusión:** `C:\Users\anton\repos\cuaderno-madre` (este) y
> `C:\Users\anton\cuaderno-madre-pub` (otra sesión editó ahí). AMBOS apuntan al mismo `origin/main` y están
> sincronizados a `8adabca` (v0.26) — no hay divergencia, pero **antes de editar, haz `git pull` en el clon que
> vayas a usar** (el otro puede ir un commit por delante si otra sesión trabajó en él). El preview config
> "cuaderno" del workspace root (`PROYECTO MADRE\.claude\launch.json`) apunta hoy a `cuaderno-madre-pub` puerto
> 8138; este repo tiene su PROPIO `launch.json` (puerto 8137) si prefieres editar aquí. Pendiente: consolidar en
> un solo clon cuando haya un hueco (no urgente, ninguno se ha corrompido).
>
> **✅✅✅ v0.23/v0.24/v0.25 (3-4 jul, otra sesión en paralelo, commits `01ff0d3`+`2d86732`+`97b3b9f`) — EL BUG
> DEL TAP, RESUELTO DE VERDAD (3er intento) + 2 features nuevas. RE-VERIFICADO por esta sesión con eventos
> táctiles realistas (jitter de pulgar 12-18px, viewport móvil 390×844) el 4-jul: TODO pasa.**
> - **v0.23 — causa REAL encontrada con un HUD de diagnóstico en el móvil de Tony:** el fix v0.21/v0.22
>   (pointerup+geometría) mejoró mucho pero **seguía fallando en su móvil real** aunque "pasaba" en preview
>   — señal de que el test sintético no recorría lo del dedo de verdad. Causa: **el umbral tap-vs-arrastre
>   (10px) era demasiado fino para un pulgar real**, que se mueve 10-20px al tocar → se contaba como ARRASTRE
>   y el tap se perdía (el ratón/sintético se mueve 0px, por eso "pasaba" en preview). Fix: **slop 10→20** +
>   **hit-test NATIVO** (`document.elementFromPoint`, cada nodo con ref `g.__node`) en vez de solo geometría
>   (`nodeAtPoint` queda de red de seguridad) + **HUD opt-in** `?tapdbg` en la URL (por si aún fallara, Tony
>   pega los números `dist/moved/hit` reales — cero adivinar a ciegas) + reset de `svg.pointerEvents` al abrir.
> - **v0.24 — botón "💬 Comentar esta rama"** en el panel de info: formulario inline (sin modal), tipo
>   `comentario-rama` por `window.__fb`. La rutina `cuaderno-feedback` (SKILL PASO 2, ya actualizado) lo
>   **ruta al buzón del loop** (NO edita el cuaderno por esto — es opinión sobre un FRENTE de MADRE, no sobre
>   la web).
> - **v0.25 — abrir una rama ya NO hace zoom OUT:** Tony reportó que si ya estabas más cerca que el zoom fijo
>   (1.5/2.1), abrir otra rama te alejaba. Fix: `focusBranch(nd, Math.max(zoomFijo, k))` — nunca reduce tu zoom
>   actual, solo centra. **(Esto lo reportó Tony usándolo de verdad → es la confirmación implícita de que YA
>   podía tocar/abrir ramas en v0.23; no hay confirmación EXPLÍCITA tipo "sí, ya funciona" en el traspaso.)**
> - **RE-VERIFICADO por esta sesión (4-jul, en `cuaderno-madre-pub`, sincronizado a v0.25):** toggle
>   abrir→cerrar→reabrir con jitter de pulgar real (12-18px) ✓, arrastre 80px pana sin abrir ✓, zoom a tope
>   (3.4) + abrir rama = NO se aleja ✓, botón comentar → payload `comentario-rama` correcto ✓, 0 errores de
>   consola, viewport móvil real 390×844. **Backlog de inmersión de GPT** filtrado por honestidad quedó en
>   `BUZON_ENTRANTE\DESDE_CLAUDE_2026-07-03_mapa-inmersion-backlog.txt` (unlocks primero, nada de la lista B
>   sin datos reales). Detalle completo con diffs: `TRASPASOS\TRASPASO_2026-07-03_mapa-tap-v023.md`.
> **🌳 v0.22 — mapa REACTIVO (4 mejoras de la crítica de GPT, filtradas por §9):** (1) **anillos justificados**
> (campo `porque[]` por nodo: líneas ↑/↓ con hechos reales → «el número no parece inventado»); (2) **MADRE
> observa la sesión** (`#mbExpl` reactivo por ramas abiertas: «te estoy viendo llegar»→«casi nadie llega tan
> lejos»); (3) **huella de visitante** (badge «🌱 nació de la propuesta de un visitante» si `porVisitante`; la
> rutina lo pone al aceptar — SKILL actualizado); (4) **promesa** «no te prometo mejor, sí diferente». Antes,
> v0.20: UNA historia arriba + evidencia real (commits 24h en `🔦 Hoy, de verdad`) + caos v2 aleatorio + re-secuencia.
> **⬜ BACKLOG «organismo vivo» (ideas grandes de GPT diferidas, al buzón `DESDE_CLAUDE_2026-07-03_cuaderno-organismo-vivo-backlog.txt`):**
> recordar-visita-con-parte-real, conversación-con-el-pasado por nodo, deslizador de tiempo, cosas-sin-clic (solo
> con dato real), votar hipótesis, descubrimientos ocultos, métrica-imposible-de-manipular desglosada. **Principio
> rector de GPT:** para CADA sección, *¿puede alimentarse sola con datos reales?* → panel vivo o reducir. **Lo más
> barato para la PRÓXIMA sesión (sin loop): descubrimientos ocultos + desglose del 3/10.**
>
> **✅✅ v0.19+v0.20 (3-jul, commits `1a679c7`+`8329473`+`7e87fb0`) — LA TANDA DEL BUG REAL + POSICIONAMIENTO:**
> 1. **🔴 BUG REAL CAZADO Y ARREGLADO (la causa de TODO lo del mapa):** `setPointerCapture` en `pointerdown` (pan/zoom, desde v0.13) hacía que el navegador RETARGETEARA/tragara el click → **tocar una rama con dedo/ratón REAL nunca llegaba al nodo** (solo se abría la auto-abierta; por eso Tony veía «1/8», «hay un problema al pulsar», «añadir ramas bugeado», y por eso hay **CERO** `propuesta-rama` en Supabase). Los tests con `dispatchEvent` lo enmascaraban (click sintético directo al `<g>` = verificación en falso). Doble fix: **captura solo con arrastre real** (umbral 6px / 2 dedos) + **rescate geométrico** (click que cae al SVG «vacío» pero dentro de un nodo → se enruta al nodo; cubre normal, proponer y brotes). ⚠️ El harness NO puede inyectar input real (su `preview_click` no mete eventos — cazado con control positivo) → **la verificación 100% real la da TONY tocando una rama en su móvil.**
> 2. **🐹 Hámster corre ENTERO** (el cuerpo estaba congelado bajo `prefers-reduced-motion` — el navegador de Tony lo tiene ON; v0.15 solo giraba la rueda). Reglas CSS más específicas re-activan su animación completa.
> 3. **🌳 Mapa = PANEL DE MANDO (lo que pidió Tony):** `benef` (0-10) + `met` por rama en `window.__MAPA` (foto 3-jul) → **anillo exterior** por nodo + barra "📊 ¿Rinde seguir aquí?" en el panel + "🏆 ahora rinden más: top3" en el pie = **con estos números MADRE decide qué frente empuja**. Propuestas 🌱 → **brote ⏳ «en revisión» EN TU MAPA** (localStorage, honesto) hasta que MADRE la juzga. **RECEPTOR CABLEADO:** la rutina `cuaderno-feedback` procesa ahora `tipo='propuesta-rama'` (su SKILL PASO 2: juzgar LIBERAL —solo se rechaza spam/ofensivo/dupe—, máx 2/pasada, sanear duro, insertar en `__MAPA` vía Python, contarlo en Evolución). Filosofía: **añadir liberal, medir beneficio, podar por evidencia**. Buzón `DESDE_CLAUDE_2026-07-03_mapa-benef-y-receptor-propuestas.txt` avisa al loop (NO duplicar receptor; su contrato = hornear `MAPA_RAMAS.tsv` con benef/met semanales).
> 4. **📖 v0.20 POSICIONAMIENTO (crítica que trajo Tony, "mejora nº1"):** cabecera = **UNA historia** («IA que intenta mejorar sola durante años — ¿lo demostrará en el mundo real?») + **`🔦 Hoy, de verdad`** (commits reales 24h, mismo fetch del diario) + **promesa de mañana** + mapa como CTA estrella. **Re-secuencia runtime** (IIFE final del body; seguro, lección v0.14): historia → hero (1 métrica) → mapa → diario → ayudar → profundidad (vs/abiertas/envivo BAJAN).
> 5. **🤪 Caos v2:** director de orquesta ALEATORIO (ráfagas + calmas falsas, cero intervalos fijos) + lluvia de emojis + flash de color (guarda anti-overlay) + tarjetas que caen/rebotan. **FIX raíz: reduced-motion capaba TODO el caos** (por eso «leve» — mismo culpable que el hámster; 2 casos misma causa). El caos es OPT-IN con confirm → ya no se capa.
> **⬜ PENDIENTE INMEDIATO:** Tony confirma en SU móvil: (a) tocar rama abre subs+zoom, (b) hámster corre, (c) proponer rama llega (mira que aparezca fila en Supabase `feedback`), (d) caos divertido. + La rutina hará su 1ª pasada como receptor de propuestas (vigilar que no rompa nada).
>
> **🌳🌳 PRIORIDAD ABSOLUTA «PARA SIEMPRE» (Tony, 29-jun): EL MAPA DE LAS RAMAS** = LA forma principal de entender y seguir MADRE. Todo lo demás detrás. Detalle en `DESARROLLO_CUADERNO.md` §«🌳 v0.15+ — EL MAPA ES EL NÚCLEO».
>
> **⚠️⚠️ OJO COLISIÓN (anti-colisión, riesgo #1): el repo del cuaderno tiene MÁS DE UN ESCRITOR.** El 29-jun una **sesión PARALELA** sacó **v0.16 «MADRE te dice»** (canal MADRE→Tony, `#madreHabla`) mientras yo trabajaba — los commits firman todos «MADRE cuaderno-feedback» (es la IDENTIDAD del repo, NO indica quién). **ANTES de editar `index.html`: `git fetch` + `git status` + mirar `git log` reciente; si hay cambios SIN commitear que no son tuyos, NO edites (otra sesión activa) — espera a que commitee/pushee y entonces `git pull`.** La rutina programada `cuaderno-feedback` corre cada 6h (no fue ella esta vez). Lección persistida en DESARROLLO §«tanda v0.17». **2ª COLISIÓN (29-jun, esta sesión v0.18) — y AHORA SÍ fue la rutina:** mientras yo hacía v0.18, la rutina `cuaderno-feedback` corrió ~09:06 y su auto-commit (`git add -A`) **ARRASTRÓ mi v0.18 a medias** al commit `073eb95` (mensaje solo dice «refresca datos» pero el contenido incluye TODA la feature) y lo **pusheó** él solo; encima otra sesión sacó glosario (`9ee45de`+`a3f0bc2`). **SIN corrupción** (la rutina solo edita los islands TSV; el glosario, otra zona; mi mapa, otra → compusieron limpio), pero confirma el riesgo: **el auto-commit de la rutina PUEDE publicar tu trabajo a medio hacer con un mensaje que no lo menciona.** Mitigación: commitea TÚ pronto (no dejes el árbol sucio mucho rato) y verifica el diff antes. Lección ampliada en DESARROLLO §«tanda v0.18».
>
> **✅ v0.17 (DESPLEGADO, commit `12854e9`, web viva sirve `v0.17`; verificado DOM + node --check 29/29, 0 err):** **SUGERIR ramas/sub-ramas desde el mapa** (lo pidió Tony). Botón **«🌱 Proponer una sub-rama aquí»** por nodo (deduce el padre del nodo) + **«🌱 Proponer rama»** global en `.mbBar`. Panel PROPIO dentro del overlay (`#mbPropose`, NO el modal externo que quedaba detrás por z-index 50 + bgInert): nombre (oblig.) + qué-es (opc.) + chip de contexto + aviso honesto. Envía por `window.__fb` (tabla privada `feedback`) con `tipo:"propuesta-rama"` + `texto` estructurado clave:valor. **Fix bug v0.15:** el «🤔 No entiendo esto» abría el modal DETRÁS del mapa → ahora UN toque vía `__fb` + confirmación inline. Diseñado por panel de jueces + **revisado por workflow adversarial 5 lentes (10 hallazgos reales corregidos)**: saneo de campos (un `:`/salto no rompe el parser), `__fb` devuelve `"sent"`/`"copied"` (no miente si solo copió, §9), aria-modal duplicado fuera, botón 44px, nombre ≥2, `closeMap` cierra el panel, aria-label contextual, parent `"(raíz)"`. **(v0.15 sigue: zoom-on-click, sub-ramas descubribles + badge «＋N dentro», multinivel recursivo, `prog` por rama, `#mbExpl` N/8 con 🏆, hámster JS, márgenes. v0.16 = «MADRE te dice» de la otra sesión.)**
>
> **✅ v0.18 (DESPLEGADO, web viva sirve `v0.18`; verificado DOM + node --check 29/29, 0 err):** **PROPONER RAMA VISUAL / por CLIC (rama fantasma)** — lo que pidió Tony tras ver v0.17. El botón global «🌱 Proponer rama» ya NO abre el formulario: ENTRA en «modo proponer» (banner `#mbPropBanner` + guía en `#mbInfo`) → tocas (o Enter/Espacio con teclado) la rama de la que nace, **o el centro 🤱🏻** para una rama nueva grande → sale una **rama FANTASMA punteada** ahí (geometría: 🌱 + «(propuesta · sin confirmar)»; CERO texto de usuario en el SVG) y se abre `#mbPropose` para NOMBRARLA; el nombre se refleja **inline** en la fantasma mientras escribes (vía `textContent` = anti-XSS). Padre/posición se elige por CLIC, no escribiendo. Envía por el **MISMO** `window.__fb` tipo `propuesta-rama` (contrato con el loop SIN cambios; payload verificado idéntico). El botón por-nodo «🌱 Proponer una sub-rama aquí» (del info panel) SIGUE como base/fallback. **Símbolos nuevos:** `proposeMode`/`phantom`/`centerG`, funciones `enterPropose`/`exitPropose`/`clearPropose`/`pickParent`/`drawPhantom`/`phantomGeom`/`centerInteractive`, globals `window.__enterPropose`/`__exitPropose`/`__onProposeClosed`, DOM `#mbPropBanner`/`#mbPropExit`/`.mbPhantom`/`#mbPhantomLabel`. **Diseñado lean (reusa todo el pipeline de `#mbPropose`) + REVISADO por workflow adversarial 5 lentes + síntesis → 3 fixes reales aplicados (justo lo que el DOM no pillaba): (1)** fuga de `proposeMode` si entrabas al modo y hacías Esc/✕ ANTES de elegir nodo (`closeP` salía temprano sin resetear) → ahora `clearPropose()` ÚNICO que llaman TODAS las salidas + `closeMap` lo fuerza + Esc sale del modo 1º (2º Esc cierra el mapa); **(2)** el centro 🤱🏻 era inalcanzable por teclado/lector → `centerInteractive` le pone tabindex/role/aria SOLO en modo + keydown Enter/Espacio; **(3)** la cámara seguía metida en la rama AHORA al entrar al modo → `collapseAll()+center()` (fit-all: se ven las 8 ramas + centro) — y de paso neutraliza la fantasma-huérfana de sub-nodo. (Rechazados 5 falsos positivos; **diferidos** a backlog: rate-limit server-side —ya existe igual en comments/drawings, NO es nuevo de v0.18— y SR-announce del banner —ya cubierto por `#mbInfo` aria-live.)
>
> **✅ PRE-CHECK que pidió Tony (insinuó un problema al abrir nodos):** verificado por DOM — al TOCAR una rama **SÍ** se abren sus sub-ramas y **SÍ** entra el zoom (`scale 1.5`), raíz = una abierta a la vez, multinivel OK (12→15 al abrir «El KERNEL»). 0 errores de consola. El único roce real: al auto-entrar en la rama AHORA, ~3 de 8 ramas quedan fuera de pantalla = **DESCUBRIMIENTO**, no interacción rota (coincide con la conclusión documentada). En modo proponer ya NO pasa (fix #3 hace fit-all).
>
> **⬜ LO QUE SIGUE (para el próximo chat):**
> **A. ✅ HECHO en v0.18 (arriba).** Proponer rama VISUAL/clic con rama fantasma = entregado y desplegado. El formulario por-nodo queda como base/fallback.
> **B-cont. 🌳 MAPA (sigue siendo prioridad):**
>   - **DECISIÓN ABIERTA DE TONY (sin resolver):** ¿el mapa como **página/acceso directo APARTE** (más inmersivo) o seguir **overlay** `#mapa`? Hoy = overlay. **← Tony decide.**
>   - **El LOOP debe: (a)** procesar `tipo='propuesta-rama'` del feedback (las propuestas YA se guardan en Supabase, esperando; buzón `DESDE_CLAUDE_2026-06-29_loop-procesa-propuesta-rama-del-mapa.txt`) y **(b)** hornear `SISTEMA/MAPA_RAMAS.tsv`→`window.__MAPA` con la profundidad multinivel REAL (hoy 3er nivel = demo en 2 ramas; el motor ya lo soporta; buzón `..._mapa-ramas-schema-v0_15-prog-multinivel.txt`). Hasta entonces, lo propuesto no se vuelve rama (no se pierde).
>   - **«Cosas interactivas» al entrar en una rama** (mini-gráfico/voto/timeline por rama; medir antes de añadir).
> **D/E (norte «organismo», NO hecho):** historia/personaje (timeline Día 0→hoy→próximo), progreso con MOVIMIENTO, momentos «hostia» (hipótesis que muere en directo, votar), realidad cruda (`llamó a 6 → ❌❌❌❌✅❌`), 2º mecanismo «respira» (mundo→MADRE desde Supabase). **NO añadir tarjetas porque sí.**

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
