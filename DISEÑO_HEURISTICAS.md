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
- [ ] Modos exclusivos (no se solapan barras — ver §5)
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
  `cuaderno-feedback` puede destilar señales de los botones **"no entiendo"** (tipo `no-entiendo` por
  `card`/`section`) para señalar qué partes cuestan más — pero **NO reescribe estos principios** (línea roja).
- **Cómo lo usan futuras sesiones**: leer este doc ANTES de diseñar; usar el checklist §2 como gate.
- **Higiene**: consolidar en los 3 docs existentes; no crear docs de un solo uso.

## 7. PARKING LOT — persistido, no hacer aún (con porqué)
- **Subir VÍDEOS** en comentarios (la foto ya funciona): peso/moderación; depende de validación (Q1) y rate-limit (Q9).
- **Seguridad real**: rate-limit, RLS por IP/sesión, honeypot, moderación mejor que `blocked()`; sacar la contraseña de texto plano. (La validación cliente NO es seguridad.)
- **Split de `index.html`** en `.css`/`.js` externos + TSV→JSON + objeto `CONFIG` de widgets. Alto riesgo (rompe "un solo index.html").
- **localStorage namespaced+versionado** (`cm.v1.*`) con migración (hoy claves dispersas).
- **`og:image`** 1200×630 para tarjeta de enlace (las metas OG ya están).
- **Validación de imagen también en feedback** (hoy solo en comentarios).
- **Gestor único de timers** y `window.__toast()` global compartido.

## 8. Bitácora (append-only: fecha · observación · lección · ancla)
- **2026-06-21** · Premisa "abuela↔borracho" establecida · usabilidad extrema + interacción rica conviven si lo lúdico es opcional y la acción principal está a un toque · norte de todo el diseño.
- **2026-06-21** · Bug: el HUB ocultó un FAB que aún no existía (creado en `<script type=module>` diferido) · los classic inline corren ANTES que los módulos → inicializar lo que dependa de módulos en `DOMContentLoaded` · `#fabHubBtn`.
- **2026-06-21** · `getBoundingClientRect()` puede devolver 0,0 para elementos movidos con `translate3d` (capa compuesta) en algunos motores · para verificar posición leer `style.transform`, no el rect · `.gxg-cat`.
