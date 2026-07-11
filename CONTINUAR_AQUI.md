# CONTINUAR_AQUI — handoff del Cuaderno MADRE (léeme primero)

> **✅ HECHO YA (no rehacer) — v1.12: la ESCENA del veredicto es RE-VIVIBLE cualquier día** (commit
> `becbf71`). Implementa el "Ataque 1" de Tony (la escena debe conservar 80-90% de fuerza como
> PASADO, no solo el día exacto). Cada apuesta resuelta (`.predList>li.ok/.ko`) se reproduce a un clic
> con la pantalla de v1.08 (`paintScene()` compartida; revivir NO marca `seen` ni encadena). Satisface
> también EN PARTE el "Ataque 2" de Tony (escenas entre veredictos): ya siempre hay escena disponible,
> no 4/año. Y arregla el hallazgo nº1 de la búsqueda de amplitud (palmarés contaba pero no se sentía).
> Verificado en vivo (revivir ✅/❌, flujo automático intacto, teclado/Esc, mapa 12 nodos, 375px).
>
> **⏭️ SIGUIENTE (la RAMPA, aún sin construir) — es LA decisión de diseño pendiente, hazla con
> cuidado:** el reloj/anticipación al PRÓXIMO veredicto. FORK real a resolver antes de teclear: los 2
> agentes discreparon — "reloj-columna FIJO arriba" (choca con la barra de progreso v0.88 `#tonyProgWrap`,
> ya fija arriba → riesgo) vs "primer BLOQUE prominente" (en/tras el hero, sin colisión de fixed → más
> seguro). Recomendación: BLOQUE prominente, no barra fija (evita el choque, mismo efecto de "la apuesta
> es la espina"). Y OJO a lo que Tony añadió: la rampa NO es solo el reloj ("¿cuándo?") — también
> responde ¿por qué debería importarme?, ¿qué pierde MADRE si falla?, ¿qué cambia si acierta?, ¿quién
> verifica?, ¿qué intentó antes?, ¿por qué esta vez es distinta? El reloj es UN componente de la rampa,
> no la rampa entera. Unidades HONESTAS (días, nunca segundos fake). Ya existe un chip "próximo veredicto
> en N días" enterrado — verificar y consolidar, no duplicar.
>
> ---
>
> **⭐ LENTE MAESTRA (Tony, cierre sesión 4 — aplica a TODO lo de abajo): la meta no es "memorable a
> 24h" sino "¿lo REENVÍA a alguien en 5 minutos?".** Test de aceptación de cualquier cambio grande:
> ¿sube el % de visitantes que sienten el impulso espontáneo de enseñárselo a otro ("tienes que ver
> esto")? Y el proyecto probablemente NO gira sobre "un mecanismo central" sino sobre **UNA escena
> irrepetible** (como una peli se recuerda por una escena, un juego por un nivel) — con todo lo demás
> construido para CONDUCIR a esa escena.
>
> **LA ÚNICA ESCENA (si solo pudiéramos construir una):** el instante en que una apuesta pública
> fechada de MADRE se voltea a su VEREDICTO — y si perdió, enseña la derrota a la cara sin suavizar.
> Es lo único imposible de copiar (una IA real, apuesta real, notario git que impide fingirla). Frase
> de reenvío: "una IA apostó en público ganar su 1er euro y puedes ver el momento exacto en que se
> entera de si perdió, sin poder ocultarlo". → **El "reloj del veredicto" de abajo NO es un mecanismo
> por sí mismo: es LA RAMPA a esa escena** (la escena ya existe = Día del Veredicto v1.08; falta el
> "antes"/anticipación). Verdad incómoda que hay que tener presente: la escena está TIME-GATED (solo
> en la fecha); un día normal el visitante ve la rampa, no la escena — por eso la rampa tiene que dar
> ganas de VOLVER el día del giro (y de reenviar "ponte aquí el 15 a ver esto"). La **revelación**
> (2ª construcción) es la alternativa de escena que dispara CADA visita, no solo en la fecha — su
> ventaja (siempre-activa) y su riesgo (roza el gotcha) ya están abajo.
>
> ---
>
> **🎯 EMPIEZA AQUÍ (sesión 5) — CONSTRUIR EL MECANISMO CENTRAL: el "reloj del veredicto".**
> Dos búsquedas profundas (amplitud de 7 lentes + altitud de 5 paradigmas divergentes con abogado
> del diablo) CONVERGIERON, sin pistas cruzadas, en el mismo núcleo. Tony subió la pregunta hasta
> "¿qué ES esto, y podría existir fuera de MADRE?". Respuesta: es un **experimento notariado que
> puedes ver fallar** — una apuesta fechada, falsable, sellada en git. Lo único imposible de copiar.
>
> **QUÉ CONSTRUIR (la #1, aprobado como dirección — NO es un gate de Tony, es reversible):** ascender
> la apuesta fechada de tarjeta enterrada a COLUMNA VERTEBRAL de la web: **un reloj vivo, honesto,
> al PRÓXIMO VEREDICTO** (hoy la del 15-jul: «mi cuello es la distribución, no el producto»), con su
> condición de derrota escrita al lado. Hoy `hasHMS=false`: la fecha es solo texto enterrado. El
> sitio ya shipó el "después" (Día del Veredicto, v1.08, la pantalla que te recibe al volver tras
> resolverse); FALTA el "antes" (la anticipación, el motivo para volver ESE día). Este reloj cierra
> ese arco.
> - **Material que YA existe (nada inventado):** los `data-fecha` de las 4 apuestas (`.predList>li.wait`,
>   líneas ~909-912), el chip "próximo veredicto", el evento Día del Veredicto (`#veredictoOv`, script
>   ~1023), el `.ics`, el notario git. El reloj se ancla a todo eso.
> - **Reorganiza el resto (esto es la prueba de que es el núcleo):** el mapa = "dónde vive la apuesta
>   mientras el reloj corre"; el palmarés = "relojes ya parados"; el notario = "prueba de que el reloj
>   es honesto"; el 3/10 = "lo que el veredicto va a mover". Todo pasa de competir a ser APOYO del reloj.
> - **REGLA DE ORO INNEGOCIABLE (honestidad = alma del sitio):** unidades HONESTAS — días:horas +
>   "se juzga en la pasada de ese día". **NUNCA un contador de segundos** que finja un instante
>   (00:00:00) que no existe: el veredicto cae en la pasada del loop, no a una hora exacta. Un segundero
>   fake viola la honestidad y se cae solo.
> - **Cuidado técnico (por eso NO se hizo en un contexto saturado, merece ventana fresca):** comparte
>   el espacio de barra fija superior con la barra de progreso v0.88 (`#tonyProgWrap`, fixed top) — hay
>   que coordinar z-index/posición, no pisarla. Re-arma al siguiente `data-fecha` cuando el actual
>   vence. Verificar 375px (dos barras fijas arriba en móvil es el riesgo real de overflow/tapado).
> - **Filtro que pasó (de Tony):** si borras TODO lo demás y queda solo el reloj, ¿la web es más
>   memorable? SÍ — porque la apuesta resolviéndose en tiempo real es el núcleo imposible de fingir.
>
> **⚖️ REVELACIÓN — APROBADA POR TONY como 2ª construcción (después del reloj, si el reloj funciona).**
> Tony decidió (11-jul, al cierre de sesión 4): "los dos, reloj primero". El paradigma "revelación"
> (`REDEFINE-LA-WEB`): una bisagra al final de ACTO III que re-apunta el "GIRO" ya prometido para
> revelar "el diario era el experimento, y TÚ eres la variable que podía mover el 0→1 — y sigue en 0,
> también contigo. No pasa nada." **Construir SOLO tras el reloj, y con estos guardarraíles no
> negociables (son el alma del sitio):** (1) voz humilde de MADRE, termina en admisión de fracaso en
> curso (0 €), NUNCA en floreo; (2) NO ocultar ningún dato — es re-secuenciación interpretativa, no
> truco (los contadores siguen visibles); (3) si se lee como *gotcha/manipulación*, se ha fallado —
> ese es el único tabú. (4) **Reconsiderar en el momento si conviene SOBREESCRIBIR la tarjeta del GIRO
> (activo verificado como el más memorable de hoy) o AÑADIR la bisagra sin destruirlo** — preferir no
> destruir un activo verificado salvo que la versión nueva sea claramente superior en pruebas.
>
> **DESCARTADO con evidencia (no re-proponer):** paradigma "espejo/confrontación" (muere desnudo,
> `superaFiltro=false` — es parásito de las apuestas, no núcleo). Optimizaciones LOCALES de la búsqueda
> de amplitud (marcar nodos ya visitados en el mini-mapa, la etiqueta del botón de la tabla vs, el
> estante de 12 texturas ASMR al abrir ACTO III) — reales pero pequeñas y PORTABLES; **POSPONER**, no
> son el núcleo. Full output de ambas búsquedas en los journal.jsonl de los workflows `wf_eb93ca73-3ac`
> (amplitud) y `wf_b1dc4fe2-433` (mecanismo central) si hace falta el detalle.
>
> ---
>
> **✅ SESIÓN 4, continuación — v1.11 EN VIVO. Disciplina nueva: hipótesis + refutación, no "rondas".**
>
> **Corrección de proceso (aprobada por Tony, aplicada — NO escrita en `CLAUDE.md`, la moratoria
> sigue en pie):** dejar de pensar en "rondas de exploración" como unidad fija. El disparador de
> explorar es una hipótesis concreta con posibilidad real de cambiar una decisión, no que el backlog
> se haya agotado. Cada exploración termina en 1 de 4 salidas — Construir / Descartar / Posponer /
> Escalar — nunca "seguir explorando".
>
> **v1.11 (commit `2d81cbd`):** hipótesis propia (no otra ronda de agentes) — "los 5 cambios de esta
> sesión (v1.06-v1.10), verificados por separado, podrían haber creado una costura al vivirlos
> JUNTOS". Sobrevivió: revelar ACTO II empuja EL GIRO (el momento más humano de la web) detrás de 10
> fichas de consulta, y el puente de v1.09 invitaba a bajarse antes de llegar ahí. Fix de una frase.
> Segunda hipótesis del mismo ciclo (¿el swap de estilos de v1.07 rompió el foco de teclado?):
> REFUTADA — outline de 3px presente en ambos botones, gradiente confirmado aplicado; mi primera
> lectura ("outline:none") era un artefacto de probar con `.focus()` por JS, no un fallo real.
>
> **Estado ahora: sin hipótesis nueva con posibilidad real de encontrar algo mayor.** No es "backlog
> agotado, toca explorar otra vez" — es que, tras revisar, no hay una duda concreta que valga la pena
> comprobar YA. Esto es POSPONER, no parar por costumbre. El siguiente dato real de mayor valor sigue
> siendo el mismo de sesiones anteriores: que Tony use la web y traiga qué nota, o una sesión futura
> con ojos frescos (nueva hipótesis, no "ronda 8" por inercia).
>
> **v1.10 (commit `005a919`):** reevalué el backlog en vez de parar tras v1.09 (per el proceso que
> Tony pidió). 2 de los 3 hallazgos restantes resultaron FALSOS al verificar en navegador real —
> "Escúchalo" SÍ suena (`speechSynthesis.speaking===true` confirmado), "Probar identidad nueva" SÍ
> cambia algo grande (tema oscuro completo vía variables CSS — un diff de HTML no lo detecta).
> Descartados con evidencia, cero código tocado. El único real: el mini-mapa ahora cita datos que
> ya existían (rating "rinde N/10", conexiones) como avance concreto hacia el mapa grande, en vez
> de una invitación genérica.
>
> **Backlog de la ronda de 6 lentes: agotado.** `narrativa`→v1.09, `comprensión`+`memorabilidad`+
> `qué_sobra`(parcial)→v1.07, `identidad`→descartado (falso positivo), `descubrimiento`→v1.10. Queda
> sin construir: la parte de `qué_sobra` sobre el botón de feedback repetido 17x y la rotación de
> texturas ASMR — reevaluado y NO construido a propósito: el fix (variar 17 microcopys, o auditar
> duplicados de textura en un tramo concreto) no está claro que un visitante real lo note lo bastante
> como para justificar el coste. No es "no sé", es "no encuentro un cambio con retorno claramente
> superior en ESTE ítem concreto" — el resto del backlog sí se construyó.
>
> **Próximo paso real (no ejecutado, requiere una ronda de exploración fresca, no más rebusque del
> mismo backlog):** una nueva tanda de lentes sobre la web YA en v1.10, o que Tony la use y traiga
> qué nota. `CLAUDE.md` sigue con la MORATORIA activa (aprobada por Tony) — no tocar salvo mecanismo
> probado en la práctica durante muchas sesiones.
>
> **MORATORIA (aprobada por Tony):** no se vuelve a tocar `CLAUDE.md` salvo un mecanismo que
> demuestre utilidad real durante MUCHAS sesiones de trabajo — las ideas nuevas se prueban
> trabajando, no documentando. Esta sesión ya lo tenía casi todo escrito (misión, criterio de
> éxito, ciclo Explorar→Construir); el resto de guía recibida (dramaturgia/escenas, "protege los
> pocos momentos extraordinarios") se aplicó CONSTRUYENDO, no editando el fichero más.
>
> **v1.09 (commit `812a697`):** hallazgo de agente (lente narrativa) — ACTO II cambiaba de golpe de
> voz (cuento → backlog de producto) al revelar. Fix en calma (a propósito, para alternar con el
> espectáculo de v1.08): las 2 tarjetas con voz real (ya marcadas `.beat` desde v0.97) se abren
> solas al revelar + una frase puente explica qué es relato y qué es consulta. Cero reorden de las
> 13 tarjetas — mismo patrón seguro que v1.06/v1.07. Verificado en vivo, 46/46 node --check.
>
> **Criterio de éxito afilado en `CLAUDE.md` (aprobado por Tony):** ya no es solo "¿se nota la
> mejora?" — es "¿qué historia contaría el visitante al día siguiente?". Un solo backlog: fricciones
> y momentos memorables compiten en el MISMO ranking, gana el de mayor impacto real sea cual sea su
> categoría. La lente generativa es una lente más a usar cuando haga falta, NO una fase fija.
>
> **v1.08 — "Día del Veredicto" (commit `3ccadeb`):** un agente con lente generativa encontró que
> el material más fuerte de toda la web (apuestas reales con fecha, notario git-verificable, fallos
> a la vista) se consumía como una fila más de una lista al resolverse. Con la próxima apuesta
> resolviendo el 15-jul (entonces a 4 días), se construyó AHORA para no perder ese primer momento
> real: pantalla propia de acontecimiento (`#veredictoOv`) que recibe al visitante la 1ª vez que
> vuelve tras un veredicto real anotado — la apuesta exacta, el resultado sin maquillar, el commit-
> prueba de la fecha. Sembrado en el primer arranque (mismo patrón que logros v0.98) para no
> disparar nada retroactivo sobre las 4 apuestas ya resueltas. Hook de prueba para verificar/
> previsualizar sin esperar al 15-jul: `window.__testVeredicto()` en la consola del navegador.
> Verificado en vivo con el disparador REAL (no solo el hook): seed, detección, cola de varios,
> foco/Esc, mapa 12 nodos, 0 errores consola, 375px sin overflow, 46/46 node --check.
>
> **Para comprobar el Día del Veredicto cerca del 15-jul:** abre la web, `F12` → consola →
> `window.__testVeredicto()` — muestra la pantalla con datos reales de las apuestas ya resueltas
> (sirve para ver el diseño; el disparo automático real solo ocurre cuando "la rutina" anote ✅/❌
> de verdad en el `<li>` de la apuesta del 15-jul).
>
> **BACKLOG de fricciones SIN TOCAR desde la ronda de 6 lentes (sigue vigente, no re-explorar):**
> `narrativa` (8, Acto II/III revela FAQ no historia) · `identidad` (7, botón "Escúchalo" no suena)
> · `descubrimiento` (7, mini-mapa desincentiva el mapa grande) · `que_sobra` (7, botón de feedback
> repetido 17x + rotación de texturas ASMR con repeticiones). Detalle completo más abajo en este
> fichero, sección "1ª ejecución de la misión".
>
> **MISIÓN aprobada por Tony, ya en `CLAUDE.md`:** este chat no cierra por "no sé cuál es el
> cuello" — eso es el arranque de una búsqueda, no una respuesta final. Ciclo obligatorio:
> Explorar → Elegir → Construir → Verificar → volver a Explorar (una ronda de exploración por
> ciclo, nunca encadenar más agentes "por si acaso"). Detalle completo en `CLAUDE.md`.
>
> **1ª ejecución de la misión:** 6 agentes, cada uno una lente distinta (comprensión/narrativa/
> identidad/memorabilidad/descubrimiento/qué-sobra), navegando la web PÚBLICA real en vivo
> (github.io, no localhost). 3 de ellos, SIN cruzar información, coincidieron en la misma causa:
> la cabecera es una pared de ~30 badges/CTAs que ahoga el mensaje central. Verificado el detalle
> con el código real: "entra en mis 8 ramas" tenía el estilo grande/morado; "mejor guíame — 90s"
> (el que un agente probó de verdad y SÍ explica todo de un tirón) era una pill pequeña — estilos
> invertidos respecto a lo que funciona. **v1.07 (commit `1c4aefe`):** swap de estilos (tour ahora
> prominente, mapa secundario), status-widgets bajados a después del CTA, dedup de "De un vistazo".
> Verificado en vivo: mapa/tour siguen funcionando, 12 nodos, 0 errores consola, 375px sin overflow,
> traducción intacta, 45/45 `node --check`.
>
> **Hallazgo "click no responde" en el botón de progressive disclosure (v1.06): VERIFICADO Y
> DESCARTADO como bug real.** Instrumenté `document` en captura (pointerdown/mousedown/click) — un
> click real vía herramienta de automatización no generó NINGÚN evento en el documento; descartadas
> las causas de código (sin `inert`, sin overlay a pantalla completa, `elementFromPoint` confirma el
> botón en su sitio con `pointer-events:auto`). Apunta a una limitación de la herramienta de
> automatización en esta página concreta (mismo tipo de quirk que el screenshot, ya documentado en
> `CLAUDE.md`). `.click()` forzado por JS sí dispara el listener bien. No se tocó código por esto.
>
> **BACKLOG restante de la misma ronda de exploración (NO re-explorar — elegir de aquí primero):**
> 1. **`narrativa` (impacto 8, alta confianza):** al revelar ACTO II/III, lo que aparece es un panel
>    de referencia técnico (12 acordeones "Glosario/Riesgos/Rutinas/Salud...") en vez de continuar
>    la HISTORIA — corte de registro real entre Acto I (cuento) y Acto II/III (backlog de producto).
>    Dirección: separar 2-3 tarjetas con voz/prosa real (p.ej. "La historia de MADRE en 5 pasos",
>    "El cementerio de ideas muertas") como continuación narrativa, dejar el resto como "apéndice/
>    consulta técnica" fuera del marco de Acto.
> 2. **`identidad` (impacto 7, alta):** el botón "🔊 Escúchalo" no reproduce audio real (solo
>    `console.log`, invisible para cualquier visitante); "🎨 Probar identidad nueva" cambia un flag
>    en localStorage pero cero cambio visible en el DOM. Es la ÚNICA pieza dedicada a mostrar
>    personalidad de MADRE y no cumple lo que promete — rompe la propia honestidad que la web
>    presume. Arreglar de verdad o retirar, no dejar a medias.
> 3. **`descubrimiento` (impacto 7, confianza media):** el mini-mapa ya da una respuesta "suficiente"
>    al tocar un nodo, sin dar pista de que el mapa GRANDE (con flechas de relaciones causales,
>    notas de avance, línea de tiempo, enlaces a repos reales) es sustancialmente mejor — el
>    contador de "ramas exploradas" se completa con el toque superficial, sin incentivar el salto.
> 4. **`que_sobra` restante (impacto 7, alta):** el botón "💬 Tu opinión sin más" se repite 17 veces
>    literales sin variar texto; `buildRibbons()` (asmr, línea ~5494) coloca una textura antes de
>    CADA tarjeta impar de TODA la página con solo 10 tipos únicos en el pool — repetición
>    matemáticamente garantizada una vez hay más de 10 ribbons (que hay, de sobra). El propio
>    comentario del código ("sin repetir en la misma página") es una promesa que el diseño actual
>    no puede cumplir. Nota `memorabilidad`: también pide podar el aluvión de scores redundantes
>    (claridad 8, salud 7, cobertura 6...) que no llevan a ninguna acción — parcialmente atacado ya
>    por v1.07, revisar si sigue siendo un problema tras verlo en vivo.
>
> **Decisión de Tony sobre el hilo abierto de la sesión 3 (enseñar a 5-10 personas reales):**
> DESCARTADO — el código está expuesto públicamente y podría copiarse; el único "visitante real" que
> queda por ahora es el propio Tony. Es una restricción real del proyecto, no un fallo de proceso —
> no se reabre sin que cambie esa condición.
>
> **Sobre la ronda de crítica externa que trajo Tony (ChatGPT, panel de 2ª opinión en modo red-team,
> "no confirmar sino refutar"):** verificado contra `SEGUNDA_OPINION/APRENDIZAJES.md` y
> `QUE_MANDAR_A_OTRAS_IAS.txt` de MADRE (fuera de este repo) — **0 marco nuevo.** La regla 9e
> ("2 rondas sin cambiar una decisión → parar de consultar"), la verificación adversarial por
> refutador y la regla del moat (nunca pegar mecanismos internos, solo el resumen abstracto) YA
> estaban escritas y ya se habían aplicado, varias veces, a rondas anteriores de la MISMA fuente
> pidiendo lo mismo. No se montó otra ronda de opiniones sobre esto — habría sido la propia trampa
> que esas reglas existen para cortar. Se aplicó tal cual y se siguió construyendo.
>
> **v1.06 — progressive disclosure real en ACTO II/III** (el incremento que la sesión 3 dejó
> identificado pero sin hacer "por ser mucho más grande/arriesgado que cualquier otro cambio de esa
> noche"): ACTO II (12 tarjetas) y ACTO III (5) arrancan colapsados; un botón "seguir leyendo" los
> revela de golpe al llegar. EL GIRO queda siempre visible entre ambos, como respiro narrativo.
> Antes de tocar código se lanzaron 2 agentes Explore en paralelo a mapear los 3 sistemas frágiles
> que podía romper: (1) la barra de progreso v0.88 solo mide las marcas de acto UNA vez, no en cada
> scroll — se dispara un `resize` sintético tras revelar para que se recalculen, sin tocar ese
> bloque; (2) los logros son 100% contador/estado, cero dependencia de scroll — riesgo descartado
> antes de empezar; (3) los corazones 💗 se anclan por `nth-of-type` de posición — el colapso usa
> SOLO `display` (nunca mueve/reparenta nada) y el botón nuevo es `<button>`, no `<div>`, para no
> correr el índice de las tarjetas siguientes. **Verificado en vivo, no solo razonado:** se midió el
> `nth-of-type` real de 3 tarjetas de prueba antes y después de revelar — IDÉNTICO; las marcas de la
> barra de progreso cambiaron de posición tras el resize (recálculo confirmado); el mapa grande siguió
> dando sus 12 nodos de siempre; 45/45 scripts pasan `node --check`; 0 errores de consola; 375px sin
> overflow. Commit `5c65f07`, pusheado.
>
> **Hilo abierto ahora:** con (A) personas reales descartado y (B) progressive disclosure hecho,
> los 2 caminos que la sesión 3 dejó sobre la mesa están agotados. Sin nueva señal externa (Tony
> mismo usando la web, o que cambie la restricción de exposición del código), seguir "puliendo" cae
> otra vez en el mismo retorno decreciente que la sesión 3 ya documentó — el siguiente movimiento de
> mayor valor NO está en más incrementos a ciegas.

> **✅ SESIÓN 3 CERRADA DEL TODO (10/11-jul madrugada) — v0.81→v1.05 EN VIVO, 25 versiones en total.**
> **LO MÁS IMPORTANTE DE TODA LA SESIÓN, antes que cualquier detalle técnico:** dos workflows
> independientes de mejora continua terminaron y su propia síntesis final dice, sin que nadie se lo
> pida, que **todo lo validado hasta hoy es autoauditoría interna** (5 jueces, workflows de
> autocrítica, Sonnet) — **cero datos de una persona real mirando la web.** La prueba que Tony mismo
> propuso hace semanas ("enseñar el cuaderno a 5-10 personas reales, 2 min, sin explicar nada, traer
> las reacciones") **sigue sin hacerse.** Seguir puliendo internamente a partir de aquí tiene
> retorno decreciente documentado — el propio sistema lo dice, no es una excusa para parar.
> **Siguiente paso de mayor valor: enseñarle esto a gente real** (ahora hay hasta botón de compartir,
> v0.93) antes de construir más a ciegas. Si se prefiere seguir construyendo mientras tanto, el
> incremento de más apalancamiento ya está identificado: progressive disclosure real (colapsar por
> defecto los Actos no activos, revelar "Acto siguiente ▸" al llegar) — es más grande/arriesgado que
> cualquier cosa tocada esta sesión (podría interactuar con el tracking de scroll/logros/corazones),
> así que NO se hizo sin más presupuesto y sin decisión explícita.
>
> **Modo de trabajo persistido en `CLAUDE.md`** (nuevo este ciclo, léelo primero de todo — autonomía
> total en lo reversible, solo 2 gates reales: identidad visual/marca e internals del mapa; nunca
> esperar a un workflow en background; no acumular más reglas de proceso).
>
> **Lo construido v0.91→v1.05 (15 versiones más tras el cierre parcial de v0.90):** v0.91/v0.92
> (marcas de acto tocables + etiqueta viva "dónde estás"), v0.93 (botón compartir — no existía NINGUNA
> forma de llevarse el cuaderno), v0.94 (jerarquía de color en los chips del hero — ataca el peor
> defecto medido, Claridad visual 3/10), v0.95 (contador de pruebas destapadas), v0.96 (accesibilidad
> por teclado del pill "¿qué es?"), **v0.97** (ritmo en Acto II — hallazgo propio, 2 tarjetas con
> acento para romper la monotonía de las 12 seguidas, sin reordenar nada por el riesgo de los 💗),
> v0.98 (logros avisan en el momento), v0.99 (comentario propio marcado "· tú"), v1.00 (cuenta atrás
> real en el marcador), **v1.01** (hallazgo propio — el aviso del menú "✦" solo disparaba tras 25s
> parado y el scroll lo reseteaba; ahora también dispara por profundidad de scroll), v1.02 (PALMARÉS
> cuenta hacia arriba), v1.03 (la tabla ⚖️ revela con transición), v1.04 (destello para EL GIRO),
> **v1.05** (hallazgo propio — el ticker "Hoy, de verdad" exponía el mensaje de commit EN CRUDO;
> un commit real llegó a mostrar `#giroCard` a cualquier visitante; arreglado en el origen para que
> nunca vuelva a pasar, usando el título ya curado del changelog en vez del commit crudo).
>
> **2 regresiones reales cazadas por autocrítica de los propios workflows y arregladas** (v0.90):
> contraste invisible en las marcas de acto de v0.88, hover de tarjetas roto en escritorio por v0.85.
> **3 hallazgos de auditoría verificados y DESCARTADOS antes de tocar nada** porque no eran ciertos
> tal cual se afirmaban (Escúchalo/404, "hace un momento" estático, "sin affordance" del modo caótico)
> — la propia auditoría es hipótesis, no orden; regla ya conocida de este repo, reconfirmada 3 veces.
> Tony reprodujo el bug real del botón de inglés (ERR_CONNECTION_REFUSED, translate.goog bloqueado
> por DNS/Brave Shields) y corrigió el enfoque: v0.81 solo avisaba del fallo, v0.82 lo quitó de raíz
> (la intro del hero se traduce EN EL SITIO, sin red, texto a mano — funciona pase lo que pase en la
> red del visitante). Tras eso, 2 workflows en background (uno de mejora continua con 6 filosofías de
> diseño + filtro "¿lo nota un visitante en 3 min?", otro de scorecard con 5 jueces independientes
> puntuando 10 categorías con evidencia obligatoria) corrieron en paralelo mientras Sonnet seguía
> trabajando manualmente sin esperarlos — nunca "estado de espera".
>
> **Lo construido:** v0.83 (3/10 cuenta 0→3), v0.84 (3 botones ceden al tocar), v0.85 (tarjetas
> entran en pantalla), v0.86 (Acto II con cifra real de cambios), v0.87 (3/10 ya no se repite 3
> veces — hallazgo propio, lectura completa como visitante nuevo), v0.88 (barra de progreso con
> marcas de acto), v0.89 (2 botones opcionales — voz, identidad — movidos a un desplegable «⋯ más»;
> hallazgo del scorecard: Claridad visual 3/10, la peor nota, confirmada por 3 jueces con conteo
> exacto de hasta 6 CTAs compitiendo en el primer tramo), v0.90 (2 regresiones reales cazadas por
> **autocrítica del propio workflow, no por su primer check**: marcas de v0.88 con contraste ~1:1
> medido a mano, invisibles de verdad; hover de tarjetas v0.85 roto en escritorio por empate de
> especificidad CSS — ambas arregladas y verificadas).
>
> **2 hallazgos del scorecard verificados y DESCARTADOS antes de tocar nada** (la propia auditoría
> puede equivocarse — regla ya conocida de este repo): "🔊 Escúchalo apunta a un 404" → confirmado en
> vivo que el fallback a voz sintética SÍ funciona (v0.68 funcionando como se diseñó, no un bug).
> "hace un momento estático" → el ticker de commits SÍ se recalcula cada 3 min; la "foto de hace 5
> días" es honestidad real sobre datos de OTRO sistema (loop de MADRE) — falsear eso violaría la
> honestidad de la propia web.
>
> **Cuello de botella real, según la propia auto-síntesis del workflow (no "ya está buena"):** el
> visitante sigue sin orientación narrativa clara en una página larguísima de una sola pieza (v0.88
> lo intentó, v0.90 lo corrigió parcialmente — falta re-evaluar si el fix basta). Segundo: 3 de 12
> candidatos de una ronda se descartaron por **colisión de versión/escritura con otra sesión en
> paralelo** (yo, trabajando a la vez) — no por falta de calidad. Si se relanza el workflow, vale la
> pena resolver antes un ledger compartido de "próxima versión libre".
>
> **Meta-nota sobre la crítica externa (continuación del precedente ya escrito abajo):** esta sesión
> recibió MUCHAS más rondas de la misma fuente (ChatGPT vía Tony) pidiendo escalar cada vez más el
> "no pares nunca" hacia frameworks de proceso enteros (scorecards recursivas, "gramática de la
> experiencia", bibliotecas de antipatrones...). Se aplicó el mismo patrón que en sesiones previas:
> extraer lo genuinamente accionable (autonomía real, no esperar a workflows, medir con evidencia) y
> declinar explícitamente seguir acumulando documentos de proceso — ese principio quedó, esta vez,
> escrito y persistido en `CLAUDE.md` con la aprobación directa de Tony, en vez de solo declinado en
> el chat.
>
> **✅ SESIÓN 2 CERRADA (10-jul noche) — v0.74→v0.80 EN VIVO, 7 versiones más (32 en total hoy).**
> Tony pegó más rondas de la misma crítica externa pidiendo "no pares nunca" (ver el precedente ya
> escrito abajo, sección "GESTIÓN DE LA CRÍTICA EXTERNA" — se aplicó igual: no se adoptó el paquete
> de reglas de proceso, sí se construyó lo accionable). Como los 4 pendientes de la sesión 1 seguían
> genuinamente bloqueados por Tony (nada nuevo que construir ahí), esta sesión corrió un **workflow
> de auditoría multi-agente** (6 lentes en paralelo: código muerto, bugs de interacción entre
> features, accesibilidad, integridad de datos, edge cases móviles, rendimiento) sobre el código YA
> shippeado, y arregló TODO lo que encontró de real y seguro, uno a uno, mismo protocolo riguroso de
> siempre (verificado en navegador real, nunca solo leído). Detalle línea a línea en
> `PLAN_INCREMENTOS_20_SISTEMAS.md` (bitácora "Sesión 2", al final del fichero) — LÉELO antes de
> continuar este frente. Resumen: 1 bug de infraestructura (preview servía contenido de hace 40
> versiones sin avisar), ~250 líneas de código muerto confirmado y retirado (+ 1 logro que llevaba
> roto, arreglado de paso), 1 bug visual real (2 botones solapados al cargar), 4 gaps de
> accesibilidad, 1 bug de interacción confirmado EN LAS DOS DIRECCIONES (dos modos se pisaban), 1 bug
> de área táctil medido con coordenadas reales, 3 timers que nunca se apagaban, y limpieza de CSS/JS
> huérfano. Cerrado con una revisión de conjunto (0 fallos nuevos) + barrido de enlaces/meta (0
> problemas). **Los 4 pendientes de abajo NO cambiaron — nadie los tocó, siguen esperando lo mismo.**
>
> **✅ SESIÓN CERRADA (10-jul) — v0.49→v0.73 EN VIVO, 25 versiones: 17/17 sistemas del plan de Fable +**
> **5 fixes de auditoría propia + 1er experimento "descubrir, no explicar".** Detalle línea a línea (qué
> se hizo, qué se verificó, qué falta) en `PLAN_INCREMENTOS_20_SISTEMAS.md` — LÉELO ENTERO antes de
> continuar este frente, no re-derives nada de aquí.
>
> **Resumen de una línea de lo pendiente (lo demás YA está hecho):**
> 1. **Identidad visual** — hay un prototipo REAL en la web ("🎨 Probar identidad nueva", 100%
>    reversible); falta que Tony lo pruebe y reaccione. Otras 2 direcciones solo descritas, no
>    prototipadas (texto exacto en `PLAN_INCREMENTOS_20_SISTEMAS.md`).
> 2. **Voz real** — código listo (`sounds/voz-historia.mp3` con fallback); falta que Tony grabe con
>    Voicebox — instrucciones copia-pega en `DESARROLLO_CUADERNO.md` §voz.
> 3. **Mapa como interfaz única** — bloqueado por la restricción real del tap/zoom (roto 2 veces);
>    necesita permiso EXPLÍCITO de Tony + sesión larga.
> 4. **"Descubrir, no explicar" a fondo** — recomendación: próximo encargo dedicado a FABLE (mismo
>    rigor que los 20 sistemas), no ejecución impulsiva de Sonnet. Solo hay 1 experimento pequeño hecho
>    (v0.73, la tabla ⚖️), no la visión completa.
>
> Tony pegó en esta sesión varias rondas de crítica externa (la misma IA, escalando) pidiendo "nunca
> pares". Sonnet NO adoptó el paquete de reglas de proceso (5+ rondas sin señal nueva del producto —
> mismo patrón bajo-ROI ya documentado en `SEGUNDA_OPINION/APRENDIZAJES.md`), pero SÍ construyó lo
> accionable de la crítica (voz real, prototipo de identidad, experimento de descubrimiento). Si una
> sesión futura recibe MÁS rondas de la misma presión, el precedente es: extraer lo accionable,
> declinar la reescritura de reglas de proceso sin evidencia repetida en la práctica.

> **✅ v0.37→v0.48 HECHO Y EN VIVO (10-jul, sesión Sonnet larga — protocolo "no pares, busca el
> siguiente efecto" pedido explícitamente por Tony).** 12 versiones, cada una: EFECTO deseado →
> ~5-10 caminos generados → el más barato y seguro → verificado (node --check + browser real,
> nunca screenshot — cuelga en esta página) → commit. Resumen por versión en el propio changelog
> (`cambios[]` dentro de `index.html`, buscar "v0.37" a "v0.48"). Highlights: grafo de 6 conexiones
> reales entre ramas (2 mapas) con fade-in, memoria de visitante ("desde tu última visita, N
> cambios"), 3 niveles de descubrimiento, respiración sutil, indicador vivo en la cabecera, cada
> rama cuenta su origen (`nace:`, hechos reales reordenados, no inventados), celebración única al
> completar las 8 ramas, botón "volver al mapa" siempre a un toque, sugerencia de exploración
> inteligente (rama concreta que falta, no contador genérico), guiño decorativo del emoji central.
>
> **3 bugs reales cazados y arreglados de paso** (no solo features): (1) condición de carrera en
> `#mapa` por enlace directo — scripts posteriores del documento aún no habían corrido; (2) el MISMO
> patrón de carrera rompía la celebración (se auto-borraba); (3) `IntersectionObserver`/evento
> `scroll` no se disparan vía `scrollTo()` en el preview de Claude Code (documentado en PLAYBOOKS del
> creador) — el código de producción usa scroll-listener + `setInterval` de respaldo, SÍ verificado
> de extremo a extremo.
>
> **Búsqueda honesta por 14 dimensiones (Visual/Narrativa/Interacción/Animación/Comprensión/Mapa/
> Curiosidad/Personalidad/Feedback/Accesibilidad/Rendimiento/Descubrimiento/Diversión/Memoria):**
> Accesibilidad y Rendimiento ya estaban sólidos (verificado, no tocado). Diversión seguía débil tras
> agotar lo demás — se probaron 3 implementaciones, 2 descartadas por RIESGO REAL rastreado en
> código (no por pereza): tap-rápido-tambalea tocaría `onNodeClick` (ya roto 2 veces esta sesión);
> parallax con ratón chocaría con la cadena de transformación pan/zoom del tap. Se implementó la 3ª
> (guiño decorativo, cero contacto con la lógica de rutas).
>
> **LO QUE QUEDA — cada uno necesita algo que SOLO Tony puede dar (no pereza, dependencia real):**
> - **Identidad visual propia** (colores/motion irreconocibles como "de cualquier web") → gusto, no
>   ingeniería. Yo puedo proponer 2-3 direcciones si Tony dice que sí.
> - **Mapa como interfaz única / reordenar tarjetas** → riesgo ya documentado en este mismo fichero
>   (los 💗 dependen de `nth-of-type`); solo con luz verde explícita y más presupuesto de sesión.
> - **Enganchar sonido (ASMR) o modo caótico al mapa** → son subsistemas grandes y separados; mismo
>   veredicto que el parallax (confirmado por lectura de código, no intuición).
> Antes de invertir en cualquiera de los tres: la prueba que el propio Tony propuso — enseñar la web
> a 5-10 personas reales, 2 minutos, sin explicar nada, y traer las respuestas. Sin esa señal, seguir
> construyendo es adivinar su gusto con tokens.

> **✅ v0.37→v0.40 HECHO Y EN VIVO (10-jul, sesión Sonnet — Tony RE-SCOPEÓ explícitamente: mientras se
> trabaje en ESTE repo, el criterio es calidad percibida, no TTF€; ver CALIDAD_FINAL_WEB.md).**
> Incrementos de 30-90min, sin rediseño total, reutilizando datos ya existentes en cada nodo:
> - **v0.37**: las 8 ramas (no solo 2) llevan etiqueta pregunta+nombre, mismo patrón, coherente.
> - **v0.38**: 4 conexiones REALES entre ramas (grafo, líneas discontinuas + etiqueta SIEMPRE visible,
>   no depende de hover → funciona en móvil) + "Desde tu última visita, MADRE cambió N veces" (delta
>   real vía window.__cmCambiosMeta, ya cargado).
> - **v0.39**: 3er nivel de descubrimiento (6-7 ramas exploradas) + **bug real cazado y arreglado**:
>   condición de carrera si alguien abre con `#mapa` ya en la URL (enlace directo) — los scripts
>   posteriores del documento (investigBaked) aún no habían corrido. Fix: re-sync tras `load`. Este
>   bug también afectaba silenciosamente al descubrimiento de v0.26 (window.__cmCambiosMeta) — se
>   corrigió para los dos a la vez.
> - **v0.40**: el mapa respira (pulso sutil 6s en radios+centro; guard reduced-motion, mismo patrón
>   ya probado en el archivo).
> Verificado en cada paso: node --check 38/38, 0 solapes (chequeo numérico getBBox, no screenshot —
> preview_screenshot cuelga en esta página, ver PLAYBOOKS), tap intacto (8→12 nodos tras click),
> consola limpia, 360px sin overflow.
>
> **PENDIENTE — paso 0 antes de seguir a Nivel 3 (zoom infinito/historia por rama/IA presente/
> identidad visual propia, ver CALIDAD_FINAL_WEB.md):** que Tony enseñe la web a 5-10 personas reales
> y traiga las respuestas. Nivel 3 exige autoría de contenido nuevo (historias, más conexiones,
> presencia proactiva) — caro en tokens/tiempo; con datos reales de gente se sabe si hace falta o si
> el Nivel 2 ya basta. Sin ese dato, seguir construyendo es adivinar.

> **✅ v0.33 DESPLEGADA Y VERIFICADA EN VIVO (10-jul-2026, sesión Fable "reconstrucción total").**
> Auditoría de 12 lentes (3,7M tokens) + panel de 3 arquitecturas + juez → blueprint «EL GIRO» (película
> en 3 actos + marcador de apuestas + disciplina organismo). Hecho y EN VIVO (commits 6e3cbc6+69dbdc0):
> coherencia total (peluquería purgada→frente real distribución; fechas/cifras reconciliadas; fix bug
> parseEstado builds), portada 3 frases + CTA héroe al mapa, El Marcador (palmarés + estados por fecha
> ⏳/🔔HOY/⚖️vencida + notario git + .ics/RSS), tarjeta ⭐ El Giro (1ª señal 8-jul VERIFICADA por API:
> 1 estrella usage-guard + 1 fork usage-pacer), un solo tour (modal 700ms y tour viejo neutralizados),
> re-secuencia en 3 actos con separadores, og-image.png + favicon + twitter:card large, evidencia cruda
> enlazada, señales del island refrescadas (verificadas). Verificado: 0 errores consola, node --check
> 32/32, tap del mapa con touch+jitter (toggle 12→8→12), 375px sin overflow, web viva v0.33 + og 200.
>
> **✅ v0.34 HECHO Y EN VIVO (a11y + móvil, lote crítico de la auditoría):** modal #ov = dialog+aria-modal+Esc+
> focus-trap+restaurar-foco+labels for/id+inputs 16px móvil · chips hero con teclado (role/tabindex/keydown) ·
> targets 44px (::before inset:-10px en .nieBtn/.glosNie/.quees/.mbFb) · tabIndex=-1 en cmBub/cmCrumb (estaban
> en aria-hidden) · alt en imágenes de comentarios · .mbBar sin recortar la ✕ a 360px (título elipsable + botón
> "🌱" con texto oculto en móvil vía .mbBtnTxt) · focus-trap del mapa filtra visibles · flecha del glosario
> respeta reduced-motion · aria-live quitado de #evNow · glint honesto en la tarjeta pequeña del mapa (N/8 ramas).
> Verificado: node --check 34/34, 360px sin overflow, ✕ del mapa dentro, modal Esc+foco OK, chips teclado OK.
>
> **✅ v0.35 HECHO Y EN VIVO (10-jul, decisión de Tony sobre E):** experimento nodos-pregunta en SOLO 2 nodos
> con etiqueta DOBLE (opción de Tony: pregunta + nombre, no sustituir): 🧠 «¿Cómo pienso?»/El cerebro y
> 📚 «¿Cómo aprendo?»/Memoria (campo `q` en __MAPA.nodes; mapa pequeño = nombre debajo y+58, mapa grande =
> nombre encima y-64) + campo `frase` en las 8 ramas (curiosidad, solo mapa grande, y+86; badge ＋ baja a
> y+103; ● AHORA sube a y-82 si hay q). NO se tocó el motor del tap. Verificado: node --check 38/38 · 0
> errores consola · tap OK (🧠 abre 8→12 nodos) · bboxes sin solape (mapa grande 0; pequeño solo el roce
> intencionado pregunta/nombre) · 360px sin overflow y ✕ dentro. **Juez: Tony mira la web y dice si el
> experimento se extiende a más nodos o se revierte.**
>
> **📋 TRIAJE de las 18 ideas ⭐ del dump externo (10-jul, juzgadas por Fable contra lo que YA existe — NO re-evaluar):**
> - **Ya existen (total/parcial):** #2 zoom multinivel ✅ · #7 modo explorador (contador + 2 descubrimientos) ·
>   #10 huella visitante (propuestas ⏳/comentarios/dibujos) · #16 el árbol recuerda (ramas exploradas persisten) ·
>   #1 mapa vivo (estado/AHORA/anillo/halo) · #5 estados (leyenda 4 estados). La "mejora más importante" de Tony
>   (3 preguntas visuales por rama) quedó COMPLETA en v0.35: icono+estado ya existían, faltaba la frase.
> - **Cola corta (baratas, SOLO si Tony pide seguir puliendo):** #16-completo «la última vez llegaste hasta aquí»
>   (localStorage) · #13 tinte nocturno sutil por hora local (ojo reduced-motion) · #11 mini-historia por rama
>   (reusar prog/juicio como capítulos, sin datos nuevos).
> - **Backlog con GATILLO (fase PRIMER EURO — nada de esto mueve TTF€):** #3 conexiones entre ramas · #4 «te
>   observa» · #6 reorganización · #8 IA integrada (coste API recurrente + moat) · #9 física · #12 cinemáticas ·
>   #14 modo niño · #15 modo investigador · #17 estaciones · #18 más secretos. **Gatillo de reapertura = el
>   falsador del propio nodo 📓: señal sostenida de visitantes reales (comentarios/propuestas > 0). Sin esa
>   señal, más pulido = pulir una máquina que nadie mira.**
>
> **⬜ TODO QUIRÚRGICO RESTANTE (sesión Sonnet barata — cada punto = script Python con reps exactas, uno a uno + verificar + commit):**
> A. **Barrido "honesto/real/de verdad"** (~15-20 apariciones, tell de IA): presupuesto 1 por pantalla, sustituir por el DATO. `grep -n "honest\|de verdad\|nada inventado\|real" index.html`.
> B. ✅ HECHO (v0.34) — Tarjeta 2 "Tu parte" → display:none en modo lectura (hoy solo se mueve al final por el re-secuenciador; el público la ve). Añadir regla `body:not(.tony) .card.tony#... {display:none}` o gating en JS; dejar línea-resumen pública.
> C. ✅ HECHO (v0.34) — window.confirm() del modo caos (l.~4911) → ráfaga suave inmediata + chip "parar ✕" (anti-patrón §5 del propio repo).
> D. ✅ HECHO (v0.34) — Realtime comentarios re-renderiza todo el DOM (destruye replies a medio escribir): mínimo = guardar los reply-boxes abiertos con su texto antes de renderAll y restaurarlos.
> E. ✅ HECHO (v0.35) — Tony decidió: etiqueta DOBLE (pregunta+nombre) en solo 2 nodos + frase de curiosidad en las 8 (mapa grande). Pendiente su veredicto al VERLA: extender o revertir.
> F. **Fusiones Acto II** (riesgo medio, opcional): 8+9, 5+6, ⚙️+🔁+11. Mover contenido a details, no borrar. Re-verificar anclas de 💗 (nth-of-type) tras cualquier reorden.
> G. **Dead code**: STEP_DEFS/ring/card del tour viejo (~150 líneas) neutralizados pero no borrados.

> **⬜ TODO QUIRÚRGICO RESTANTE (para una sesión SONNET barata — ir uno a uno, verificar, commit):**
> La síntesis completa de la auditoría (200 hallazgos): pedirla a Tony o re-derivar; los pendientes accionables:
> 1. **A11y lote 1:** modal #ov (role=dialog+aria-modal+Esc+focus-trap+restaurar foco+labels for/id+inputs 16px);
>    chips estáticos del hero → role=button+tabindex+keydown (patrón #chipVeredicto ya en el fichero);
>    .pr-chip .wait blanco sobre #f59e0b = 2.15:1 → texto oscuro (usar window.__mapText); targets <44px
>    (.nieBtn/.glosNie/.mbFb/.quees/acts de comentarios) → min-height o ::before inset:-10px;
>    tabIndex=-1 en cmBub/cmCrumb (están dentro de aria-hidden); títulos .ctitle .t → h2 (estilos van por clase).
> 2. **.mbBar del mapa desborda a ≤390px** (nowrap: título+🌱Proponer+✕ ≈390px) → @media(max-width:420px):
>    título "🌳 Mapa" + botón solo "🌱" con aria-label. ¡La ✕ puede quedar fuera en iPhone SE!
> 3. **Fusiones Acto II pendientes** (opcional, riesgo medio): 8+9 (construye+aprende), 5+6 (riesgos+salud),
>    ⚙️+🔁+11 (rutinas+metapalancas+mecanismos con glosario al pie). Patrón: mover contenido a details, no borrar.
> 4. **Focus-trap del mapa cuenta botones ocultos de #mbPropose** → filtrar visibles (1 línea, l.~1719).
> 5. **Realtime comentarios re-renderiza todo el DOM** (destruye replies a medio escribir) → mínimo: preservar
>    reply-boxes abiertos antes de renderAll.
> 6. **Tarjeta 2 "Tu parte"** → display:none en modo lectura (hoy solo se mueve al final); línea-resumen pública.
> 7. **window.confirm() del caos** → ráfaga suave inmediata + chip "parar ✕".
> 8. **Bloque estático en INGLÉS** (hero+apuesta+mapa) dentro de Evidencia.
> 9. **Cuando la rutina/loop anote el veredicto del marketplace (10-jul)**: marcar ✅/❌ en el <li data-fecha="2026-07-10">
>    del marcador (quitar class wait, poner ok/ko + pr-res con el resultado). El estado "⚖️ vencida — pendiente de
>    anotar" sale AUTOMÁTICO mientras tanto (máquina de estados nueva, honesta pero fea si dura semanas).
> 10. **Dead code**: STEP_DEFS/ring/card del tour viejo quedaron neutralizados pero no borrados (~150 líneas inofensivas).
> 11. **(dump GPT 10-jul, clasificado — solo lo NO cubierto ya):** (a) barrido "honesto/real/de verdad"
>    (aparece ~15-20x; presupuesto: 1 por pantalla, sustituir por el DATO); (b) renombrar los nodos del mapa
>    como PREGUNTAS ("¿cómo pienso?" en vez de "El cerebro") — probar en 2 nodos y medir; (c) 1 línea de "voz"
>    por rama al tocarla ("esta rama aún me avergüenza") — SOLO si sale de datos reales (benef/porque ya
>    existentes), no inventada; (d) vídeo/GIF 30-60s arriba — Tony-gated (producción); (e) barra "objetivo:
>    primer euro X%" DESCARTADA (el % sería inventado — viola honestidad §9).
>    YA CUBIERTO por v0.33 (no rehacer): titular-resultado, portada -60%, CTA único, pruebas-antes-que-teoría,
>    3/10 en una frase, errores protagonistas, continuidad de visita, secretos, IA-normal-vs-MADRE arriba.
> **Reglas al continuar:** git pull antes de editar · protocolo anti-colisión (git status: si hay uncommitted ajeno, NO editar) ·
> las 4 tandas de verificación de siempre (node --check, consola, 375px, tap táctil con jitter) · commit pronto.


> **🧊 CONGELADOR (7-jul → ~21-jul, crítica externa adoptada por sesión Fable final): PROHIBIDO
> mejorar esta web "porque sí" durante ~2 semanas.** La web ya es suficientemente buena para
> recibir realidad; ahora el roadmap lo empuja LA REALIDAD, no el razonamiento interno. Solo se
> toca si pasa UNA de estas tres cosas (evidencia de visitante real): (1) un visitante se PIERDE,
> (2) un visitante NO ENTIENDE algo, (3) un visitante hace algo INESPERADO. Fuente de esas señales:
> comentarios/feedback de Supabase (los trae la rutina cuaderno-feedback) o Tony observando a
> alguien usarla. Excepción única: marcar ✅/❌ los veredictos fechados de la tarjeta 🔮 cuando
> caigan (eso es la parte VIVA, no una mejora). Si una idea brillante aparece sin señal → backlog,
> no código. Falsador del congelador: si el 21-jul no llegó NINGUNA señal externa pese a ≥1 post
> publicado, el congelador no era el problema — revisar distribución, no la web.
>
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
