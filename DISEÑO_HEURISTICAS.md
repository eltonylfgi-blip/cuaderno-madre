# DISEÑO_HEURISTICAS — cómo diseñar el Cuaderno MADRE (y futuras webs) · LÉEME ANTES DE DISEÑAR

Doc vivo. Aquí guardamos **lo que vamos aprendiendo sobre diseño** para que cada vez la web sea más
fácil/mejor, y para poder **clonar webs personalizadas** para distintas personas rápido y con buen diseño.
Hay 3 docs hermanos, uno por propósito (no mezclar):
- **Este** = principios de **usabilidad** + cómo **reutilizar/personalizar**.
- `NOTAS_DISENO.md` = política de **variedad visual** (piel, no esqueleto).
- `MADRE_UI_REFERENCIAS.md` = **biblioteca de componentes** (favoritos de Uiverse de Tony).

---

## 0. Norte y regla de oro
Objetivo: un desconocido entiende MADRE en **<60s** y la siente **viva**. Y la premisa de Tony:

> **Debe poder usarla desde una abuela hasta un borracho.** Test del borracho: persona cansada, móvil
> a una mano, sin leer con atención — ¿hace la **acción principal de un golpe**? Si sí, vale.

Clave: **esconder la complejidad, no eliminar la riqueza.** Lo lúdico/interactivo es bienvenido **si es
opcional y la acción principal está a un toque.** Usabilidad extrema e interacción rica NO se contradicen.

## 1. Los 10 principios (con test de 1 línea)
1. **Claridad brutal** — ¿se entiende sin pensar? Si dudas, sobra texto.
2. **1 acción principal por vista** — ¿cuál es EL botón? que destaque; lo demás, secundario.
3. **Lenguaje llano** — como a un amigo; nada de jerga sin un "¿qué es?" al lado.
4. **Affordances obvias** — parece tocable → es tocable; toca-targets **≥44px**.
5. **Feedback inmediato (<100ms)** — todo clic responde (toast/✓/animación). Nunca silencio.
6. **Errores imposibles o perdonables** — validar antes; permitir deshacer (ej. ↩️ en dibujos).
7. **Nada solo-hover en móvil** — el móvil no tiene hover: que todo tenga gemelo por toque.
8. **Accesibilidad de serie** — teclado (Tab/Enter/Esc), `aria-live` en avisos, contraste, `prefers-reduced-motion`.
9. **Deleite sin coste de comprensión** — lo lúdico (gato, caos, ASMR) **apagable** y nunca tapa la info.
10. **Carga progresiva** — `details`/paneles/FAB-hub: enseñar poco, revelar bajo demanda.

## 2. Checklist accionable (marcar antes de subir)
- [ ] El hero responde "¿qué es?" en <60s
- [ ] Hay UNA acción principal clara
- [ ] Lenguaje llano (sin jerga huérfana)
- [ ] Toca-targets ≥44px; nada solo-hover en móvil
- [ ] Feedback inmediato en cada acción
- [ ] Teclado: Tab/Enter/Esc funcionan; `aria-live` en toasts
- [ ] `prefers-reduced-motion` respetado por cada pieza
- [ ] 375px sin desbordes (factor `K`/`MOBILE` recorta efectos ~70%)
- [ ] Ningún texto de `.card` queda a <7px de un borde (incluido contenido directo sin `summary/.body`)
- [ ] Modos exclusivos (no se solapan barras — ver §5)
- [ ] Un panel largo en foco esconde los FAB inferiores que tapen su acción principal
- [ ] Un modo de señalar zonas esconde controles fijos ajenos y reserva sitio para su instrucción
- [ ] En móvil, ningún control superior queda `fixed` sobre el contenido normal: el aire inicial solo protege el aterrizaje, no todo el scroll
- [ ] Barras fijas con `pointer-events:none`
- [ ] Texto de usuario con `textContent` (anti-XSS)
- [ ] Lúdico apagable + se pausa con `document.hidden`
- [ ] 0 errores de consola; `node --check` de cada `<script>`

## 3. Patrones reutilizables YA validados (con anclas REALES en index.html)
- **Envío con degradado** Cowork → Supabase → portapapeles → modal (función `sendFeedback`). Nunca pierde el dato.
- **Globales tardíos**: `window.__sb` (Supabase), `window.__fb`/`window.__openFb` (feedback). Pueden tardar → patrón `waitSb` (poll). También expuestos: `window.__identity`, `window.__asmr`, `window.__exitLike`/`window.__exitLapiz`.
- **Gato con teclado**: id real **`#gxg-cat-root`** (clase `.gxg-cat`), `role="button"` + `keydown` Enter/Espacio. (OJO: no existe `#catSprite`.)
- **`prefers-reduced-motion` por pieza**: variable `reduce` vía `matchMedia` en cada widget.
- **Anti-XSS**: SIEMPRE `textContent`/`createTextNode` con datos; nunca `innerHTML` con datos de usuario.
- **IIFE autocontenido** con `try/catch`, prefijo de clase, `position:fixed`/append-only.
- **Pausa por `visibilitychange`** (gato + caos + ASMR) → ahorra batería en móvil.
- **Toast accesible** `#toast` `role="status" aria-live="polite"`.
- **Semilla visual por DÍA** (no por refresco) → huella visual estable 24h (PRNG sembrado con la fecha).
- **HUB de FAB** `#fabHubBtn` + `body.fabhub` (oculta los sueltos): un solo botón "✦" con menú que **proxya** `real.click()` — NO recrea listeners. **Init en `DOMContentLoaded`** porque los FAB de comentarios viven en un `<script type=module>` (diferido).
- **Contrato sensorial heredable**: cada textura ASMR nueva debe entrar en `MODELS` **y** en `FX_MANIFEST`, declarar respuesta visual semántica por intensidad y pasar el verificador de cobertura 1:1. El motor común limita a 24 elementos, limpia por TTL y respeta movimiento reducido. Si falta una manifestación, la textura no está terminada aunque ya suene.
- **Laboratorio ASMR falsable**: cada candidata nueva declara una `signature` única en `LAB_MODELS`, enruta su propio `labPreview` y permite corregir el voto tocando de nuevo (`asmr-candidato-retirado`). Tener 16 nombres con menos de 16 firmas, o un voto irreversible, bloquea el verificador.
- **MLG semántico, no lluvia de memes**: `window.__cmChaosDirector` acumula energía solo desde eventos reales (`branch:touch`, `asmr:phase`, `meme:67`…), mantiene un solo titular héroe, usa etiquetas que describen el gesto sin inventar resultados y limpia HUD/FX/clases con Esc. Bajo `prefers-reduced-motion` no arrancan bromas temporizadas, partículas, cámara ni tint animado. Fuera del opt-in, solo `6,7` conserva un mini-MLG breve y autocontenido.
- **Tarjeta-carcasa vs contenido directo**: `.card` no lleva padding global porque `summary/.body` ya lo aportan. Cualquier tarjeta que meta texto directamente debe declarar `.cardPad`; el sensor abre/revela todas las tarjetas y mide ambos bordes a 375/1280px.
- **Favoritas cierra un ciclo verificable**: `cm_favorites_v1` da memoria local inmediata; `tipo:favorito-madre`/`actualizado`/`retirado` usa el buzón privado ya existente; `areas[]` del changelog horneado permite que una visita futura muestre solo mejoras PUBLICADAS posteriores que coincidan. Un contador de operación impide que una respuesta de red vieja repinte una nota ya borrada y borrar solo se confirma si `localStorage.removeItem` tuvo éxito. Sin coincidencia, dice que aún no la hay: nunca promete implementación.
- **«Me aburro» cierra un ciclo visible**: guardar `cm_fun_next_v1` cambia la visita inmediatamente siguiente sin depender de red; con conexión, `tipo:aburre` deja además una señal privada para que una versión futura pruebe **una** mejora divertida en la misma zona. No vale guardar la queja ni añadir confeti genérico: el visitante tiene que poder notar qué cambió.

## 4. Reutilizar para webs PERSONALIZADAS (clonar fácil)
Pensar en **3 capas** para que un clon sea barato:
- **(A) Núcleo/motor** — los patrones de §3 + globales. No se toca al clonar.
- **(B) THEME** — tokens: colores (`--accent`/`--accent-soft`/`--bg`), fuente, **mascota** (emoji/sprite), **copy** (textos), paleta-del-día. Cambiar aquí = otra "piel".
- **(C) PERFIL** — preset de experiencia: `simple` / `curioso` / `fiesta`, con **widgets on/off** y `densidadAnim` (= factor `K`). Una abuela → `simple` (sin caos, sin ASMR, animaciones suaves); un fan → `fiesta`.
- **Receta de clonado**: copiar `index.html` → editar THEME + PERFIL → (opcional) apuntar a otro proyecto Supabase. *(Futuro: extraer un objeto `CONFIG` al principio para activar/desactivar widgets sin tocar cada IIFE — ver parking lot.)*

## 5. Anti-patrones → su alternativa
- `confirm()`/`prompt()` nativos → modal propio tipo sheet *(pendiente Q7)*.
- Demasiados FAB sueltos → **hub "✦"** (hecho).
- Solo-hover en móvil → gemelo por toque / `@media (hover:hover)`.
- Modos no exclusivos (barras que se solapan) → registro central: activar uno apaga el otro (`window.__exitLike`/`__exitLapiz`).
- `innerHTML` con datos → `textContent`.
- Chips/números hardcodeados → calcular del estado real (`refreshHeaderChips`).
- `mask-composite`/`backdrop-filter` frágiles → `border-radius`/`box-shadow` spotlight.
- Intervalos que nunca paran → `visibilitychange`.
- Barras fijas que tapan/bloquean → `pointer-events:none`.
- Estado "verde" sin comprobar frescura → aviso si `actualizado` >48h (`checkStale`).

## 6. Mecanismo de persistencia (cómo se usa este doc)
- **Quién escribe**: una sesión de Claude Code añade lecciones a la **bitácora** (§8) y a §3/§5. La rutina
  `cuaderno-feedback` puede destilar las señales que hayan llegado de **"no entiendo"** (`tipo:no-entiendo`),
  **"me aburro"** (`tipo:aburre`), votos del laboratorio (`tipo:asmr-candidato-gusta/no-gusta/retirado`)
  y favoritas (`tipo:favorito-madre/actualizado/retirado`) por `card`/`section`.
  Supabase es el buzón privado de señales, no el gobierno del producto: la rutina **NO reescribe estos
  principios**. Una regla aceptada se versiona aquí y, si es ejecutable, en código + verificador.
- **Cómo lo usan futuras sesiones**: leer este doc ANTES de diseñar; usar el checklist §2 como gate.
- **Higiene**: consolidar en los 3 docs existentes; no crear docs de un solo uso.

## 7. PARKING LOT — persistido, no hacer aún (con porqué)
> **PRIORIDAD nº1 de la próxima vuelta (criterio de Tony, 2026-06-21): SEGURIDAD antes que más features lúdicas.** Es la única pieza con riesgo de abuso real; el resto es UX.
- **Seguridad real (TOP)**: rate-limit, RLS por IP/sesión, honeypot, moderación mejor que `blocked()`; sacar la contraseña de texto plano. (La validación cliente NO es seguridad — es bypasseable con un POST directo a la tabla/bucket.)
- **Comentarios: respuestas HUÉRFANAS con `.limit(200)`** (caso de borde, lejano hoy pero anotado): `load()` trae los 200 comentarios MÁS RECIENTES; si alguien responde a un comentario viejo que ya cayó fuera de esa ventana, esa respuesta tiene `parent_id` pero su padre no está en `all` → no se pinta ni como top-level ni como hijo (huérfana silenciosa). **Fix barato** (cuando crezca): en `renderListInto`, tras pintar los tops, pintar también como top-level los comentarios cuyo `parent_id` exista pero cuyo padre NO esté en `all` (fallback anti-huérfanos). **Fix completo**: paginación / "cargar más antiguos".
- **Subir VÍDEOS** en comentarios (la foto ya funciona): peso/moderación; depende de validación (Q1) y del rate-limit de arriba.
- **Split de `index.html`** en `.css`/`.js` externos + TSV→JSON + objeto `CONFIG` de widgets. Alto riesgo (rompe "un solo index.html").
- **localStorage namespaced+versionado** (`cm.v1.*`) con migración (hoy claves dispersas).
- **`og:image`** 1200×630 para tarjeta de enlace (las metas OG ya están).
- **Validación de imagen también en feedback** (hoy solo en comentarios).
- **Gestor único de timers** y `window.__toast()` global compartido.

## 8. Bitácora (append-only: fecha · observación · lección · ancla)
- **2026-06-21** · Premisa "abuela↔borracho" establecida · usabilidad extrema + interacción rica conviven si lo lúdico es opcional y la acción principal está a un toque · norte de todo el diseño.
- **2026-06-21** · Bug: el HUB ocultó un FAB que aún no existía (creado en `<script type=module>` diferido) · los classic inline corren ANTES que los módulos → inicializar lo que dependa de módulos en `DOMContentLoaded` · `#fabHubBtn`.
- **2026-06-21** · `getBoundingClientRect()` puede devolver 0,0 para elementos movidos con `translate3d` (capa compuesta) en algunos motores · para verificar posición leer `style.transform`, no el rect · `.gxg-cat`.
- **2026-06-22** · "Deleite sin coste de comprensión" aplicado al ASMR: las texturas van ENTRE paneles (decoran, no tapan info), la acción principal sigue a un toque, y todo es apagable desde el HUB · lo lúdico-físico (rozar/reventar/crujir) puede ir ON por defecto si NO bloquea la lectura · `.cmTex`.
- **2026-06-22** · Feedback que PERSISTE y es legible: marcar "me gusta" deja un 💗 fijo y discreto en la esquina de la zona, con la nota al hover y opción de quitar (error perdonable). Mejor que un `prompt` que se evapora · patrón "capa de anclas fixed reposicionada en scroll/resize" (igual que el ring del tour) · `#likeHearts`.
- **2026-06-22** · Discoverability sin modal pesado: en vez de (o además de) la bienvenida, el propio botón de la acción recomendada PALPITA al entrar y se apaga al primer toque ("reclamo que no secuestra") · `#tourLaunch.callme`. Y para que algo sea clicable de un golpe, sácalo del menú-hub: la Ruta guiada y "El cuaderno por dentro" viven fuera, siempre visibles.
- **2026-06-22** · Señalar > decorar: en el modo caótico, RODEAR un elemento real con un círculo dibujado a mano comunica ("mira ESTO"); los círculos de colores sueltos solo eran ruido · `circleReal` (SVG `stroke-dashoffset`).
- **2026-06-22 (v0.7)** · **Variedad que no se repite**: lo lúdico cansa si es igual siempre → las texturas ASMR son 8 tipos que se **barajan por carga y no repiten** en la misma página (`shuffle`+cola). Aplica a cualquier elemento decorativo repetido.
- **2026-06-22 (v0.7)** · **Plantilla > lienzo en blanco**: dar algo para CALCAR (doodle tenue + frase traviesa) baja la barrera de "no sé dibujar" y dispara participación. Sirve para cualquier input creativo (no solo dibujo).
- **2026-06-22 (v0.7)** · **Capturar la confusión donde ocurre**: "no entiendo" mejora si dejas **señalar la parte exacta** (o ignorar). El dato pasa de "esta tarjeta cuesta" a "esta FRASE cuesta" → arreglo dirigido. Patrón modo-captura exclusivo (Esc/clic-fuera).
- **2026-06-22 (v0.7)** · **El contenido lúdico se genera en lote y se valida**: un workflow de agentes produce el corpus (datos/órdenes/comentarios/plantillas/skins), se **deduplica y valida** (SVG sin tags peligrosos) y se embebe como data-island de confianza. Separa generación (cara, paralela) de uso (barato, en cliente).
- **2026-06-22 (v0.7)** · **Separar "la ventana" del "sistema"**: el **Cuaderno** (web) ≠ **MADRE** (sistema). Confundirlos lía. Doc `GUIA_FACIL.md` los explica por separado y en simple. Regla: en este repo solo vive la web; el cerebro de MADRE vive en `SISTEMA/`.
- **2026-06-28 (v0.11)** · **Apilar avisos = ruido, no orientación**: 4 cajas amarillas seguidas (feedback/Tony/versión/datos-viejos) el cerebro las lee como «muchas advertencias», no «empieza aquí». Fusionar en UN bloque de bienvenida + bajar lo secundario a letra pequeña. · `#onboard`.
- **2026-06-28 (v0.11)** · **Contexto ANTES del número**: «Contacto con la realidad: 3/10» no suspende a nadie; «3/10» a secas sí. Reordenar y renombrar quita el malentendido «la IA va mal». · `.heroLead`/`.scoreLabel`.
- **2026-06-28 (v0.11)** · **Captura la confusión por PALABRA, no por tarjeta, y paga al instante**: un 🤔 por término que (a) da una versión más simple / un ejemplo AL MOMENTO (valor inmediato) y (b) manda la señal de qué palabra cuesta (deduplicada por sesión). Mejor que solo recoger «no entiendo» y prometer arreglarlo. · `.glosNie`.
- **2026-06-28 (v0.11)** · **El temblor CONSTANTE se siente artificial**: en el caos, un quake continuo cansa y parece bug; mejor sacudón PUNTUAL + acciones que SEÑALAN (rodear con «mira ESTO», flechas a cosas reales). El caos bueno comunica, no solo vibra. · quitado `chaosBig`.
- **2026-06-28 (v0.11)** · **Mostrar lo que MATAS demuestra más criterio que mostrar aciertos**: un «cementerio de ideas muertas» (reales, con su porqué) da credibilidad que ninguna lista de logros da. · card ⚰️.
- **2026-06-28 (v0.12)** · **El "deleite" sensorial tiene que sonar a SU material, no solo "sonar"**: un ruido genérico para todas las texturas se percibe como "raro/falso" aunque técnicamente funcione; el wow ASMR exige un modelo por material (granos para crujidos, parciales que decaen para golpes, glide de tono para el pop). El mismo principio que el visual: específico > genérico. · motor `MODELS` por textura.
- **2026-06-28 (v0.12)** · **Para validar un activo que el diseñador no puede percibir (aquí: audio, porque la IA no oye), crea una página de AUDICIÓN dedicada** que reproduce el activo real, aislado, etiqueta a etiqueta, para que el humano juzgue de un toque. Patrón general "no afirmes lo que no puedes percibir → fabrica el banco de pruebas y que decida quien sí percibe". · `sounds/asmr-test.html` (iframe→motor real, sin duplicar código).

- **2026-06-29 (v0.13)** · **«O que lleve a otro link» = un overlay a pantalla completa, no otra página.** Para hacer un diagrama/mapa una EXPERIENCIA inmersiva sin romper «un solo index.html» ni duplicar tema/paleta: un overlay `position:fixed;inset:0` deep-linkable por hash (`#mapa`, compartible, back/Esc cierran). Misma fuente de datos que la versión pequeña (`window.__MAPA`) → cero drift. Zoom/pan library-free con `getScreenCTM` + transform sobre un `<g>`; `touch-action:none`. · `#mapBig-ov`.
- **2026-06-29 (v0.13)** · **Honestidad VISUAL, no solo textual** (regla §9 aplicada a la vista): una señal de «en vivo» (punto verde latiente) sobre un dato que es FOTO engaña aunque el texto aclare «(foto del…)», sobre todo al que NO lee (abuela/borracho). La señal debe COINCIDIR con la verdad: ámbar estático = foto; verde latiente = solo lo realmente en vivo. · `.ev-now .nd` vs `.nd.live`.
- **2026-06-29 (v0.13)** · **Modal accesible = foco contenido, no solo `aria-modal`.** `role="dialog" aria-modal="true"` MIENTE si el Tab se escapa al fondo. Hace falta `inert`/`aria-hidden` en el fondo **y** un focus-trap de Tab (el `inert` no está en todos los navegadores). OJO si el overlay está anidado dentro de un contenedor (`.wrap`): no inertes a su ancestro; inerta a sus hermanos. Foco al abrir (botón cerrar) y restaurado al cerrar.
- **2026-06-29 (v0.13)** · **Color de texto sobre fondo de color = por luminancia, no fijo.** Texto blanco fijo en pastillas de estado falla AA sobre verde/ámbar/gris (ámbar 2.15:1). Elegir blanco o casi-negro según la luminancia del fondo (`__mapText(hex)`) cumple AA y es robusto aunque los colores los hornee el loop. · badge `.mi-st`/`.mbInfo .st`.
- **2026-06-29 (v0.13)** · **`role="img"` oculta los hijos interactivos** (children presentational): un SVG-mapa con `<g role="button" tabindex=0>` dentro debe ser `role="group"`, no `img`. `role="img"` solo para SVG decorativo. Foco de teclado siempre con `:focus-visible` de alto contraste DISTINTO del `:hover` (no `outline:none` a secas).
- **2026-06-29 (v0.14)** · **«Respirar» honesto y barato = traer un cambio REAL del mundo, no animar más.** Una web estática «respira» si muestra algo que de verdad cambia con el tiempo: los **commits** del propio repo (API pública de GitHub, CORS abierto, sin auth; degradar en silencio si falla) con su hora real + «desde tu última visita: N» (localStorage). Aquí el verde latiente SÍ es honesto (dato real y auto-refrescado), al revés que la lección v0.13 (verde sobre una foto). Da el «si vuelvo, habrá cambiado algo» = razón para volver, el norte del organismo. Decir «cambios» (no «commits» = jerga) y aclarar autoría mixta en letra pequeña. · `#diarioVivo`.
- **2026-06-29 (v0.14)** · **Secuencia > cantidad: «qué es» y «por qué me importa» en los primeros 60 s; lo bonito (el mapa) es RECOMPENSA, va abajo.** «Si todo es importante, nada lo es»: no enseñes capacidades antes de crear la curiosidad. Gancho en 1ª persona + una pregunta plantada que el resto responde. Mover una sección = mover el `.card` por ID (el JS que clava por ID/clase no se rompe); cuidado solo con globals (`window.__X` debe seguir antes que su lector → mueve el cluster entero).
- **2026-06-29 (v0.14)** · **Bug de overlay full-screen que solo aparece por ALTURA, no por anchura.** En `flex-direction:column`, un stage `flex:1 1 auto;min-height:0` se aplasta cuando el cromo inferior no cabe, y los controles `position:absolute` se salen del stage aplastado. Reproducir con `preview_resize` a varias ALTURAS (240/300/430) midiendo rects; fix = cromo inferior en contenedor acotado+scrollable (`max-height:NNvh;overflow-y:auto`) + controles en `flex-direction:row` en `@media(max-height:…)`; usar **vh** para que escale. · `.mbBottom`.
- **2026-07-14 (v1.62)** · **Una petición transversal solo se convierte en capacidad futura si queda como contrato falsable.** «Que todo ASMR nuevo reaccione más al insistir» ya no vive como idea suelta: `MODELS` + `FX_MANIFEST` + umbrales comunes + cobertura automática 1:1 + selector externo (uso y votos). Guardar texto sin mecanismo ni juez habría sido descripción, no aprendizaje.
- **2026-07-14 (v1.62)** · **«Me aburro» debe cambiar el siguiente ciclo observable.** La capa local modifica la próxima visita sin esperar ni necesitar red (`cm_fun_next_v1`); cuando la conexión entrega `tipo:aburre`, esa señal privada alimenta además la siguiente revisión. Si una futura versión no puede señalar el cambio juguetón que hizo en esa zona, no aprendió.
- **2026-07-14 (v1.62)** · **Backend parcial > backend nuevo para una hipótesis temprana.** La tabla de feedback con inserción pública y lectura privada ya sirve como buzón de mejoras/votos; no se añade tabla ni servicio hasta que el volumen real lo exija. La decisión de producto sigue versionada en estos documentos y en las pruebas, no escondida en una fila.
- **2026-07-14 (v1.63)** · **Un catálogo distinto de nombre pero igual de sonido es variedad falsa.** El fallo medido fue 16 candidatas/9 modelos; la guarda correcta no es «intentar variar», sino 16 firmas declaradas + 16 rutas ejecutadas + voto humano reversible. · `LAB_MODELS`/`labProfiles`/verificador.
- **2026-07-14 (v1.63)** · **MLG útil = exagerar una acción verdadera, no fabricar una hazaña.** Un director central traduce el toque real a energía/combo/cámara/HUD, pero los textos dicen «rama tocada», «señal ASMR» o «67 combo»: no «éxito» ni «headshot» factual. Un solo héroe a la vez evita volver al ruido que se quería arreglar. · `#cmChaosStage`/`__cmChaosDirector`.
- **2026-07-14 (v1.63)** · **«Guardar una preferencia» solo aprende si el visitante puede volver y contrastarla.** La copia local resiste la recarga, el backend recibe una señal corregible y el changelog etiquetado actúa como selector externo: muestra coincidencias posteriores reales o admite que aún no existen. · `#cmFavorites`/`cm_favorites_v1`/`areas[]`.
- **2026-07-14 (v1.63)** · **El margen y la obstrucción son familias, no dos píxeles sueltos.** `.cardPad` resuelve las carcasas con contenido directo; un escáner de nodos de texto guarda ambos bordes; `cmFavFocus` retira FAB que tapaban el textarea; y en móvil los controles superiores son `absolute`, porque reservar padding inicial no evita que un control `fixed` tape botones al hacer scroll. La inspección visual encontró lo último después de que el DOM ya pasara. · `.cardPad`/`.cmFavFocus`/`@media(max-width:560px)`.
- **2026-07-14 (v1.63)** · **La verdad local manda sobre una respuesta tardía de red.** Guardar→borrar antes de que responda feedback no puede resucitar “guardada”; cada operación invalida callbacks anteriores y un borrado fallido se admite en pantalla. El caso queda reproducido con una promesa controlada y `Storage.removeItem` forzado a fallar. · `opSeq`/`sameSnapshot`/verificador.
- **2026-07-14 (v1.64)** · **En móvil, “rozar” y “desplazar” son intenciones distintas y deben arbitrarse antes de premiar.** Un desplazamiento vertical dominante desde 12 px sigue siendo scroll y no activa ni marca la franja; el ASMR se arma tras ≥18 px horizontales y una inversión de dirección. Una sesión táctil conserva su franja aunque un sprite clicable pase bajo el dedo. Selector automático real: CDP `touchstart/move/end`; scroll vertical medido sin efectos + roce alterno que alcanza invasión. · `touchGesture`/verificador.
- **2026-07-14 (v1.64)** · **El “5×” sensorial multiplica la recompensa causada, no el volumen ni cinco motores.** `FX_MANIFEST` decide la semántica por material, un único stage aplica normal 19 / Caos 95 con caps 40/96, TTL y limpieza; cada aparición es un objetivo ≥44 px que explota con sonido y chispa. Las cinco WEBP rotan antes de repetirse. `Auto` mantiene la alternativa estática y solo el gesto explícito `❤️ Vivo` anula `prefers-reduced-motion`; `Calma` siempre gana. · `#cmAsmrFx`/`motionAllowed`/`FX_IMAGES`.
- **2026-07-14 (v1.64)** · **Integrar un ranking significa conservar una sola verdad, no copiar su apariencia.** El Cuaderno lee `fr_ranking`, vota por el `item_id` canónico y envía sugerencias privadas con nombre; no recalcula IA, no publica pendientes ni escribe `approved`/`owner_pick` desde el cliente. La preferencia local de Tony viaja como candidata no autenticada y queda rotulada «pendiente»: solo el mecanismo verificado de FanRank puede volverla selección canónica. Los gustos generales (“divertida, inmersiva…”) se presentan como criterios, nunca como votos de visitantes. · `#cmFanRank`/`__cmFanRank`/FanRank.
- **2026-07-14 (v1.64)** · **Preguntar no debe abrir otro backend ni fingir inmediatez.** La pregunta reutiliza el hilo público de comentarios; MADRE responde en su revisión real y la interfaz enseña primero una frase autocontenida. “Más simple” y “Ahonda” vuelven al feedback canónico como peticiones trazables. El límite local (10/24 h + 2 min) se declara como cortesía por dispositivo, no como seguridad; Tony puede saltarlo en modo creador. Antes de que llegue una respuesta, tres recorridos ilustrados hacen que entender el mecanismo ya sea explorable. · `#cmAsk`/`comments`/`qa-mas-simple`/`qa-ahondar`.

## 9. La regla del organismo vivo (v0.11) — "¿vive / aprende / sonríe?"
> **Lente de Tony para TODO elemento nuevo** (gato, widget, tarjeta, animación): debe hacer pensar al visitante **una** de estas tres cosas — **«está viva» · «está aprendiendo» · «me ha sacado una sonrisa».** Si no logra ninguna, es **ruido visual**: fuera.
- **El "wow" persigue VIDA, no decoración.** Una animación sorprende 3 s; un organismo que cambia solo, minutos. Animaciones que EXPRESAN vida (gato asomándose, hámster cuando hay trabajo, post-it que cae y se repega, «…» de pensar, partículas en un logro, LED de rutina activa) SÍ; girar/flotar/brillar por brillar, NO (a los 2 min cansan).
- **Identidad unificadora: «el escritorio de una IA», no un dashboard.** El gato deja huellas, el hámster mueve la rueda, los post-its aparecen, llega correo, una lámpara parpadea con actividad, el diario se llena. Deja de ser «colección de widgets» y pasa a ser un espacio vivo al que te asomas.
- **Vida con LÍMITES (regla de no-rayada).** Los ánimos se derivan de datos reales, pero NO puede estar frustrada todos los días (eso es ruido, no dato): rota, y ante el agobio propone «el experimento más barato de hoy» con fecha y sigue. Se auto-regula; no se queda en bucle de queja.
- **Caos con dosis y causa:** fuera del modo opt-in, 0 ruido aleatorio; dentro, el 80% de la energía responde a lo que el visitante acaba de tocar y el azar queda como condimento lento. Un solo héroe en pantalla, cooldown, Esc y limpieza. Los secretos rarísimos pueden seguir existiendo, pero nunca compiten con lectura o verdad.
- **Honestidad de la vida:** «en directo» puede ser el LATIDO real de las rutinas (existen y corren), NO fingir tiempo real minuto a minuto si los datos son una foto. Enmarca la diferencia (no mientas para parecer más vivo).

## 10. Toque INMERSIVO por defecto (Tony, 29-jun) — regla para TODAS nuestras webs
> **Default nuevo de "nuestro modo de hacer webs":** toda web que hagamos lleva, **de serie**, una capa inmersiva **sutil y apagable**. No es saturar de animaciones (cansan a los 2 min); es que el espacio **tenga profundidad y se sienta vivo**.
- **4 ingredientes** (dosis baja): (1) **Profundidad** — sombras/glow/gradientes con sentido, capas, no plano. (2) **Micro-movimiento que EXPRESA vida** — latido, flotación leve, energía que «fluye» por las líneas/conexiones (no girar/brillar por brillar). (3) **Respuesta al usuario** — parallax suave al mover el cursor/scroll, hover que reacciona, foco que sigue. (4) **Jerarquía de foco** — lo vivo/importante destaca y se mueve; el resto reposa.
- **Innegociables** (siguen mandando sobre lo inmersivo): apagable, `prefers-reduced-motion`, **acción principal a un toque** (abuela↔borracho intacto), 0 coste de comprensión, móvil con factor `K` que recorta efectos.
- **Patrón de referencia vivo:** el **mapa de MADRE** (`#mapaCard`): centro que late (halo pulsante), ramas que flotan, líneas con el COLOR de su «energía/estado», hover con glow, clic que revela. Inmersivo pero legible y apagable.
- **Para clonar:** la capa inmersiva va en la **(C) PERFIL** (§4): preset `simple` la baja casi a cero (abuela), `fiesta` la sube. Por defecto, dosis media.

## 11. EL LISTÓN CREATIVO (Tony + revisor, 12-jul-2026) — cómo de ALTO apuntar
> El sistema de decisión (brújulas, hipótesis, patrones) dice QUÉ construir y CÓMO no engañarse.
> Esto dice CUÁNTO exigirLE a lo que se construye. **No se contradicen: el listón sube la ambición;
> las brújulas siguen vetando el árbol de navidad.** El listón NUNCA justifica añadir por añadir —
> justifica no conformarse con lo que ya hay.

1. **Inevitable** — al terminar, cada decisión debe parecer la única correcta. No "perfecta": inevitable.
2. **Momentos que hacen historia** — pregunta continua: *¿qué parte contará alguien a un amigo?* Si esa
   parte no existe, no has terminado.
3. **Cada detalle, candidato a premio** — diseña cada sección como candidata a un premio internacional
   (UX, narrativa, interacción, innovación). Sin rincones mediocres. *(Versión OPERATIVA — corrección
   del revisor 12-jul: "premio" inspira pero no decide; para DECIDIR usa estas dos: ¿la echaríamos de
   menos si desapareciera? · ¿hace que alguien recuerde mejor la historia?)*
4. **Irrepetible, no bonito** — si otro diseñador pudiera copiarlo en un fin de semana, aún no es
   suficientemente original. (Ya era guardarraíl: la personalidad es el activo imposible de copiar.)
5. **Descubrimientos durante años** — no diseñes solo el primer día; que dentro de 3 años alguien siga
   encontrando cosas.
6. **Obsesión por lo nunca visto** — antes de aceptar una solución: ¿existe algo parecido? ¿quién hace
   esto? ¿cómo sería 10× más original?
7. **Rompe tus mejores ideas** — una idea excelente no se construye de inmediato: genera rivales que
   intenten superarla; construye solo la que nadie supere (y aún esa, en su versión más simple — P-004).
8. **Escenas, no pantallas** — cada sección con identidad propia: entrar en otro lugar del mismo universo.
9. **Calidad uniforme** — la PEOR parte de la página debe seguir siendo extraordinaria. La calidad
   mínima manda tanto como el pico.
10. **Director creativo obsesivo** — una mejora del 0,5% también se hace; cientos de veces. Se para
    cuando lo restante es imperceptible, no cuando "ya está bien".
11. **Emociones alternadas** — como una buena película: sorpresa, risa, calma, misterio, ternura,
    admiración, reflexión. No una emoción constante.
12. **La comunidad deja huella** — que el visitante quiera volver, compartir, descubrir secretos,
    enseñar a otros, discutir teorías, dejar su marca.
13. **La prueba del silencio (gate de "terminado" creativo)** — imagina 10 personas excepcionales
    explorándolo; no importa lo que digan: importan los **10 segundos de silencio** después. Si ese
    silencio no transmite asombro/curiosidad/necesidad de seguir explorando, no está listo.
