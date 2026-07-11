# CLAUDE.md — Cuaderno MADRE (repo del código, cuaderno-madre-pub)

Web pública real: el diario en vivo de MADRE, una IA que intenta demostrar que puede mejorar sola
y ganar su primer euro sin su humano (Tony), con apuestas fechadas y una puntuación de honestidad
que ella misma se pone. Vanilla HTML/CSS/JS en un solo `index.html`, sin build step, GitHub Pages.

**Detalle completo del proyecto (léelo para contexto, no lo repitas aquí):** `CONTINUAR_AQUI.md`
(handoff vivo, léelo primero), `PLAN_INCREMENTOS_20_SISTEMAS.md` (bitácora línea a línea de cada
versión), `DISEÑO_HEURISTICAS.md` + `MADRE_UI_REFERENCIAS.md` (arsenal de diseño propio — úsalo
antes de improvisar UI). Este fichero es solo el CONTRATO de cómo trabajar, no el estado del
proyecto — eso vive en los de arriba.

## Modo de trabajo (validado la noche del 10/11-jul-2026, confirmado varias veces por Tony)

Esto no es una lista que crece cada sesión — si una idea nueva no cambia una decisión real, no se
añade aquí. Si algo de esto deja de ser cierto, se CORRIGE, no se apila encima.

1. **Autonomía por defecto para todo lo reversible.** No pidas permiso salvo para las 2 decisiones
   realmente irreversibles o de gusto de Tony: (a) elegir una identidad visual/marca nueva y
   permanente (hay un prototipo reversible ya construido, `#cmIdBtn` — Tony reacciona, tú no
   decides el color), (b) tocar el motor de tap/zoom/hit-test del mapa (`onNodeClick`/`routeTap`/
   `nodeAtPoint`/`focusBranch`) o rehacer la navegación entera como "mapa único" — se rompió 2 veces
   antes. **Todo lo demás** (pulido, redundancia, accesibilidad, ritmo, copy, i18n, animación,
   estructura de una sección) se construye, se verifica y se commitea sin preguntar.
2. **Un bloqueo nunca es una categoría entera.** Cuando algo esté gateado, escribe qué parte exacta
   está bloqueada y qué parte sigue libre (ver ejemplo del mapa/identidad arriba) — y trabaja la
   parte libre, no toda la categoría.
3. **Nunca esperes a que termine un proceso en background para pensar o actuar.** Si un workflow
   corre solo, sigue evaluando/construyendo en paralelo (otro ángulo, otro incremento) — comparas y
   te quedas con lo mejor cuando termine. Un proceso en marcha no es excusa para no seguir.
4. **Evalúa el conjunto (experiencia del visitante), no piezas sueltas.** Antes de dar un frente por
   bueno, recorre la web entera como visitante nuevo. Un frente "cerrado" es solo la mejor versión
   conocida hoy, no algo sellado — puede reabrirse con una razón real.
5. **Cuando el criterio sea subjetivo ("¿es impresionante?"), pide evidencia, no vibra.** Prefiere
   medir con algo verificable (varios jueces/perspectivas independientes con evidencia citada de la
   web real) antes que declarar "creo que ya está bien" de palabra.
6. **No acumules reglas de proceso.** El riesgo real no es parar demasiado pronto — es pasar más
   tiempo evaluando/puntuando/creando workflows que construyendo. Por cada rato analizando, varios
   ratos implementando. Ante la duda entre preguntar y construir un cambio reversible: construye.

## Misión (aprobada por Tony, 11-jul-2026 — sustituye "esperar decisión" cuando no hay cuello claro)
Este chat no existe para cerrar tareas sueltas: existe para que el Cuaderno se acerque, versión a
versión, a memorable/inmersivo/sencillo de entender. El trabajo por defecto es encontrar el cuello
de botella de mayor impacto DENTRO del Cuaderno y resolverlo — no esperar una decisión externa.
- **"No sé cuál es el cuello" nunca es una respuesta final** — es el arranque de una búsqueda
  sistemática, no una razón para parar: genera candidatos, ordénalos por impacto estimado, empieza
  por el mayor.
- **Escalón de escala cuando el retorno cae** (ya no es "cerrar sesión"): componente → sección →
  flujo → narrativa → identidad/emoción → curiosidad/descubrimiento → inmersión → memorabilidad →
  sensación global. Si una escala se agota, sube a la siguiente antes de parar.
- **Criterio de éxito de cada mejora (más exigente que "se nota" — sustituye al anterior, no se
  apila):** ¿qué historia contaría el visitante al día siguiente, con sus propias palabras? Si una
  mejora solo hace la web un poco más correcta pero no deja nada que contar, probablemente no era
  la de mayor impacto. Piensa en ESCENAS que vive el visitante (el momento en que entiende por qué
  existe MADRE, el momento en que el mapa deja de parecer un gráfico y se siente vivo), no en
  funcionalidades sueltas — "¿qué botón añado?" es la pregunta equivocada.
- **Un solo backlog, no dos.** Fricciones (qué frena/rompe) y momentos memorables (qué falta por
  crear) compiten en el MISMO ranking — construye el que más suba la experiencia global, sea cual
  sea su categoría. La lente generativa ("qué momento inolvidable falta") es UNA lente más a usar
  cuando haga falta, NO una fase fija del ciclo ni un agente permanente añadido a cada ronda.
- **Quitar cuenta como mejorar** — si eliminar algo sube más la calidad que añadir, elimina.
- **Nunca fabriques trabajo ni declares un frente agotado por costumbre** — solo cuando de verdad
  no encuentres un cambio razonable que suba más la calidad (regla 5: con evidencia, no de palabra).
- **El ciclo es Explorar → Elegir → Construir → Verificar → volver a Explorar — nunca Explorar →
  Explorar → Explorar.** Una ronda de exploración por ciclo. En cuanto un cambio esté identificado
  con confianza suficiente, PARA de explorar y construye ya — no encadenes otra ronda de agentes o
  jueces "para estar más seguro".
- **Los agentes amplían el espacio de búsqueda; no deciden.** Devuelven candidatos con evidencia —
  la decisión final (qué construir) la toma siempre el criterio del Cuaderno (qué sube más la
  experiencia global), no esperes a que un agente "te diga qué hacer".
- **Arreglar un cuello no reinicia la búsqueda a "no sé".** Tras construir y verificar, seguir
  buscando el siguiente cuello es CONTINUACIÓN del mismo trabajo — no un punto nuevo donde parar
  vuelve a ser válido.
- Esto NO deroga los 2 gates de Tony (identidad/marca, internals del mapa) ni la regla 6 de arriba
  (sigue prohibido acumular documentos de proceso — esta sección es la ÚNICA adición de este tipo).

## Protocolo técnico (ya validado, no reinventar)
- `index.html` es el ÚNICO fichero de producción — un solo escritor a la vez. Antes de editar:
  `git fetch && git status`; si hay cambios sin commitear ajenos, NO editar.
- Verificación de cada cambio: extraer cada `<script>` real (sin `type="text/plain"`, sin `src`) a
  `.js` y `node --check`; servidor local `python -m http.server 8137 --directory .` +
  `mcp__Claude_Browser__javascript_tool` (NUNCA la herramienta de screenshot, se cuelga en esta
  página — usa eval/DOM/consola); regresión estándar: `window.__openMapaBig()` debe dar 12 nodos;
  0 errores de consola; 375px sin overflow.
- Changelog: array `cambios` (buscar `var cambios=[`) — nueva entrada como PRIMER elemento, mismo
  estilo que las de abajo. Versión: `window.__cmVersion`.
- Commit + push inmediato tras verificar (no dejar el árbol sucio mucho rato — mitiga colisión con
  rutinas/otras sesiones).
