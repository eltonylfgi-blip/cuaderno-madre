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
