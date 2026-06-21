# CONTINUAR_AQUI — handoff del Cuaderno MADRE (léeme primero)

> Para retomar en un chat nuevo de Claude Code. Estado a 2026-06-21, commit `8d5f6d4`.

## Qué es
Web pública "Cuaderno MADRE" (un solo `index.html` autocontenido) en GitHub Pages:
- **Web:** https://eltonylfgi-blip.github.io/cuaderno-madre/
- **Repo (FUENTE ÚNICA):** `eltonylfgi-blip/cuaderno-madre` · clon local en `C:/Users/anton/repos/cuaderno-madre`. El `index.html` del repo es el MASTER. Flujo: `git pull` → editar → validar → `commit` + `push`.
- git ya está configurado (identidad + credential helper de gh) → push desatendido OK.

## Antes de editar — LEE ESTO
1. **`DESARROLLO_CUADERNO.md`** (mismo repo): checklist, lecciones/gotchas (bugs ya cometidos), fuentes de inspiración y backlog. Actualízalo con cada lección nueva.
2. Edita SOLO `index.html`.
3. Valida: `node --check` de cada `<script>` ejecutable + el `<script type=module>`; estructura OK.
4. Verifica EN NAVEGADOR (preview local: crear `.claude/launch.json` con `python -m http.server 8137 --directory C:/Users/anton/repos/cuaderno-madre`, luego preview_start/eval/console_logs). 0 errores de consola. Borra filas de prueba de Supabase.
5. Añade entrada al array `cambios` (Evolución) + línea a `CHANGELOG.md`.

## Backend (Supabase) — conector ya instalado en la app de Tony
- Proyecto `kopegamcjozrvmxruwdn` (org "Madre'org", eu-central-1). Tools: `mcp__258fef97-b287-400b-bd3a-f7bf69c0ab69__*`.
- URL: `https://kopegamcjozrvmxruwdn.supabase.co` · clave **publishable** (segura en el HTML): `sb_publishable_2NDyczKDwFCzNIWEMycRtw_yTnkUQAi`.
- Tablas (todas RLS): `comments` (likes vía RPC `like_comment`, `hidden` para moderación, `image_url`), `feedback` (móvil → MADRE, `image_url`), `drawings` (RPC `like_drawing`, `hidden`). Bucket Storage público `comment-images`.
- En el HTML: `window.__sb` = cliente Supabase; `window.__fb({card,section,tipo,texto})` y `window.__openFb(card,section,tipo)`.

## La rutina (Claude Code, cada hora)
`cuaderno-feedback` en `C:/Users/anton/.claude/scheduled-tasks/cuaderno-feedback/` (SKILL.md). Procesa feedback de 3 fuentes (Drive + PC buzón + tabla `feedback`), responde/modera comentarios, refresca los números de la web desde `SISTEMA/CUADERNO_ESTADO.tsv`, mantiene vivo + respalda Supabase, y guarda los gustos de Tony en `GUSTOS_TONY.md`. `BASELINE_COMMIT` de deriva en `ESTADO_RUTINA.md`. LÍNEA ROJA: nunca reescribe sus propias reglas.

## Hecho (lo grande)
Bloque A (modo lectura/gateo), refresco de números (TSV horneado), comentarios públicos (Supabase, likes, hilos, tiempo real), respuesta-IA de MADRE a comentarios, "Señales del mundo" arriba (evidencia primero), hipótesis vivas/muertas, progreso de builds, 🤱🏻+tooltip+"¿qué es?", emojis, variedad visual (12 temas + fondos + degradados), feedback con imagen desde móvil, modo lápiz ✏️, corazón 💗 "me gusta", flechas pegadas, gato troll, dibujos (canvas+galería+votos), tour guiado, nota secreta "pa la tata :)", modo caótico, contraseña que se ríe, paneles interactivos, moderación (bloqueo pedofilia + ocultar amenazas), curiosidad "¿por qué MADRE?", provenance.

## SIGUIENTE (backlog priorizado — detalle en DESARROLLO_CUADERNO.md)
1. **Comentarios anclados VISIBLES para todos** (Notion completo) — el de más impacto. Hoy el lápiz captura la zona y la manda a MADRE; falta anclar el marcador y renderizarlo para todos los visitantes.
2. **Avatares/fotos** en comentarios: (A) avatar aleatorio de un set, o (B) que cada quien suba la suya.
3. Coleccionables/polaroids/pegatinas; gato-barriguita completa.
4. Rutina "buscadora de ideas" de UI (dejada en BUZON_ENTRANTE como tarea opcional de MADRE).

## Cómo seguir en un chat NUEVO
Abrir Claude Code en la carpeta del repo y decir, por ejemplo:
> "Sigo con el Cuaderno MADRE. Lee `C:/Users/anton/repos/cuaderno-madre/CONTINUAR_AQUI.md` y `DESARROLLO_CUADERNO.md`, haz `git pull`, y sigamos con [lo que quieras del backlog]."
