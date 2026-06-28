# CONTINUAR_AQUI — handoff del Cuaderno MADRE (léeme primero)

> Para retomar en un chat nuevo de Claude Code. **Estado a 2026-06-28, versión v0.9.**
> Lee también **`GUIA_FACIL.md`** (separa el Cuaderno de MADRE y explica lo mejor de cada uno en simple).

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
