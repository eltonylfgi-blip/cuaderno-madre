# CHANGELOG — Cuaderno MADRE

Registro de cambios aplicados al cuaderno por la rutina **cuaderno-feedback** (y a mano).
Cada línea: fecha · qué cambió · por qué (qué feedback) · cómo revertir (`git revert <hash>`).

---

- 2026-06-21 · El repo `cuaderno-madre` pasa a ser la FUENTE ÚNICA DE VERDAD del cuaderno (sembrado con la última versión del PC) · base inicial · revertir: `git revert 0a2b75b`
- 2026-06-21 · **Bloque A**: modo lectura público + desbloqueo de Tony (contraseña `Jabado`, client-side); post-it explicando "feedback"; banner web corregido; y **refresco automático de números** (snapshot de `CUADERNO_ESTADO.tsv` horneado en el HTML para que la web sin Drive no muestre datos viejos) · por: petición de Tony (capa social Bloque A + "que no queden números viejos") · revertir: `git revert 8d7c729`
- 2026-06-21 · **Retoques A** (petición de Tony): la contraseña ahora SOLO protege las Decisiones; el feedback queda abierto a todos. El tipo de feedback pasa de desplegable a **botones pulsables debajo del mensaje**, con 🪄 "que elija MADRE" (`auto`) por defecto → la rutina clasifica el tipo sola. · revertir: `git revert 97935b3`
- 2026-06-21 · **Bloque B**: comentarios públicos en vivo con **Supabase** (proyecto `kopegamcjozrvmxruwdn`). Sección al final + botón flotante con panel. Comentar sin login (nombre opcional), 👍 likes (RPC atómico), hilos (responder), tiempo real. Texto escapado (anti-XSS). Tabla `public.comments` con RLS. SEPARADO del feedback privado a MADRE. · revertir: `git revert e5d0759` (y `drop table public.comments` si quieres borrar también el backend)
- 2026-06-21 · **v2 UX**: 🌍 Señales del mundo (evidencia arriba), hipótesis vivas/muertas, progreso de builds, 🤱🏻+tooltip+¿qué es?, emojis en secciones, explicación peluquería, variedad visual (tema/fondo aleatorio por visita), chat translúcido con burbujas + placeholders graciosos. · revertir: `git revert cd33d2c`
- 2026-06-21 · **Fase 2**: MADRE responde a los comentarios públicos (rutina cuaderno-feedback, columna `ai_replied`, respuestas breves/amables firmadas "MADRE 🤱🏻", ignora trolls). Respuestas de MADRE resaltadas en la UI. Keep-alive + backup de Supabase ya activos.
