# PENDIENTE_TONY — decisiones que la rutina NO toma sola

Aquí la rutina **cuaderno-feedback** aparca lo que NO aplica por su cuenta:
feedback ambiguo, cambios estructurales/globales, preguntas con respuesta, e informes de deriva.
Tony lee esto y decide. (Lo grande SIEMPRE espera; lo pequeño y claro la rutina ya lo hace sola.)

---

## 2026-07-15 — Activar el backend del Archivo multimedia

**Preparado y probado en rama:** galería, subida de audio/imagen/vídeo o URL, cuarentena privada, revisión de seguridad/derechos, corazones de Tony, feedback por coincidencia y relaciones muchos-a-muchos. Los bytes aprobados ya no pueden ser una URL externa mutable: deben ser una copia revisada en Storage privado y se sirven por `media-public`, que vuelve 404 en cuanto el activo se retira.

**Escritura en producción que sigue gateada por el flujo del repo:** aplicar `supabase/migrations/20260715_media_archive_v1.sql`, desplegar `supabase/functions/media-intake` y `supabase/functions/media-public`, configurar `MEDIA_INTAKE_SALT`, verificar el límite del gateway y solo entonces poner `MEDIA_INTAKE_ENABLED=true`. El kill-switch queda apagado por defecto. Hasta entonces, la interfaz conserva los envíos como borradores locales y dice explícitamente que no se publicaron.

**No activar a medias:** la comprobación previa debe demostrar (1) rechazo antes de parsear un multipart sobredimensionado, (2) misma cuota aunque cambie el User-Agent y (3) URL del activo retirado = 404. Si cualquiera falla, `MEDIA_INTAKE_ENABLED` sigue sin `true`.

**Frase exacta para autorizarlo:** `activa el backend multimedia`.

---

## DERIVA (revisar) — 2026-07-06

**Control de deriva: 8 días desde el último informe (2026-06-28). Resumen desde el baseline `8d5f6d4`:**

- **index.html**: +3319 líneas netas. Lo más gordo desde el último informe (v0.19 → v0.26): mapa interactivo (anillos de beneficio, tap fiable en móvil real, abrir/reabrir ramas, comentar ramas, proponer ramas, brotes pendientes en revisión), detector de exploración ("MADRE observa cuántas ramas abres"), descubrimientos desbloqueables al explorar el mapa, chip de señales reales enlazado al desglose, panel "MADRE te dice" mejorado. Hoy: TSV baked + fix UX móvil (hint imagen + mensajes sin-conexión).
- **Docs nuevos desde el último informe**: `PANEL_MADRE_TE_DICE.md`, 13 entradas nuevas en `CHANGELOG.md`, `DESARROLLO_CUADERNO.md` actualizado.
- **~33 commits** desde el baseline; **4 cambios de feedback** aplicados por la rutina (CONTADOR = 4).
- **No hay secciones desaparecidas** ni cambios en la lógica de privacidad/moat.

¿Quieres avanzar el baseline? Di "deriva ok" o "baseline al día" y la rutina lo resetea.

---

---

## 2026-07-03 — 3 decisiones AUTO-DECIDIDAS (plazo vencido el 2026-07-02, regla 1e)

El panel ya las muestra como "🤖 Decidí yo (no contestaste a tiempo). Reversible: dime si lo cambio."  
Si algo te parece mal, dime cuál cambiar y lo revierto.

**#11 — ¿Publico un "changelog de lecciones" en el cuaderno?**  
→ Auto-decidí: **Sí, arrancar con 3-5 ejemplos seguros y ver cómo cae.**  
Implementación pendiente: es un cambio estructural (nueva sección en el cuaderno). Para ejecutarlo di "monta el changelog de lecciones" en una sesión de Claude Code o Cowork.

**#18 — 🔄 Elegir el producto de Aurova por DEMANDA**  
→ Auto-decidí: **Sí, hazlo.** MADRE debe correr una pasada de IA sobre foros/comentarios del nicho y traer tabla de dolores reales con lenguaje de compra. Lo ejecuta el loop (no yo, cuaderno-feedback); si el loop no lo recoge, pídelo tú en el buzón.

**#19 — 🔄 Validar Aurova con PREVENTA real**  
→ Auto-decidí: **Sí, monta el gate de preventa.** MADRE monta página de reserva con umbral antes de gastar en stock/fotos. Lo ejecuta el loop; si no lo recoge, pídelo tú en el buzón.

**#20 — ¿Cómo subir imágenes desde el móvil al cuaderno?** (vence HOY 2026-07-03, aún pendiente)  
→ Las 3 opciones siguen en pie: A) backend pequeño · B) Drive/Imgur con clave · C) móvil solo-texto por ahora. La rutina recomienda C (0 riesgo, reversible). Si no contestas hoy, lo auto-decidiré como C en la próxima pasada.

---

## MODERACIÓN — 2026-06-30 (2 comentarios ocultados)

Ocultados por la rutina automática. Puedes verlos en Supabase si quieres confirmar o restaurar.

- **id `b8940433`** (nombre: "pollamasiva") — Texto: insulto racial con referencia a Hitler. Ocultado: contenido de odio grave (insultos raciales + Hitler).
- **id `5f528da2`** (nombre: "soy franquista") — Texto: contenido racista dirigido a una etnia. Ocultado: discurso de odio.

Los demás comentarios borderline (juegos de palabras, bromas) se dejaron visibles.

---

## 2026-06-21 — Pegar imágenes desde el portapapeles (respuesta + 1 cosa que decides tú)
**Feedback (Drive, pedir-funcion, GENERAL):** "quiero q deje pegar imágenes desde el portapapeles, no lo de adjuntar seleccionando, quiero pegarlas directamente; pero me pregunto ¿cómo las procesa? si no pueden ir al buzón o qué?"

**Estado:** la función de **pegar con Ctrl/Cmd+V YA está** en la versión publicada hoy (hay una zona "📋 Haz clic aquí y pega" y un handler de `paste` que detecta la imagen). → marcado **ya-resuelto**.

**Respuesta a tu pregunta (cómo se procesan):**
- En **escritorio (Cowork)**: la imagen pegada/adjuntada **sí** sube a la carpeta del buzón en Google Drive como `IMG_<fecha>.png`, y el texto del feedback la referencia (`IMAGEN ADJUNTA: IMG_...`). La rutina la lee para entender el contexto.
- En **móvil / web (GitHub Pages)**: ahora mismo **la imagen NO se sube** — solo se copia el TEXTO al portapapeles para que lo pegues. O sea: **una imagen pegada desde el móvil NO llega al buzón todavía.** Eso es justo lo que intuías.

**Lo que decides tú (esto NO lo hago solo — necesita lógica/decisión):** ¿cómo subimos la imagen desde el móvil? Opciones típicas: (a) un pequeño backend/endpoint propio que reciba la imagen; (b) subirla a un servicio (Drive/Imgur/etc.) con una clave que no se puede dejar en una web pública; (c) dejar el móvil solo-texto y las imágenes solo en escritorio. Dime cuál y lo montamos.

---

## 2026-06-28 — Revisión del "corrector de errores" de MADRE (recordatorio, NO urgente)

**De qué va:** preguntaste si MADRE tiene un buen sistema que corrija fallos solo, para poder "hacer y hacer" sin nunca arriesgar nada catastrófico. Se revisó a fondo.

**Conclusión (puedes dejar de preocuparte):** la parte anti-catástrofe es **sólida** y ya ha funcionado de verdad en el pasado. NO hay que hacer nada por ese lado.

**Lo único pendiente (un afinado, no un fuego):** MADRE tenía un "segundo par de ojos" (un vigilante que comprueba que de verdad hace lo que dice) y **estaba dormido hacía una semana**. Ya quedó dejado para que el propio sistema lo despierte solo en su revisión diaria → **no necesita acción tuya**.

**Esto SÍ lo decides tú (opcional, sin prisa):** (1) convertir ese vigilante en tarea fija programada; (2) guardar copia del núcleo de MADRE fuera de OneDrive con git (taparía de raíz el riesgo real, que es que un archivo se corte al guardarse). Ninguna es urgente.

**El detalle técnico completo está en privado**, en el buzón de MADRE: `BUZON_ENTRANTE/DESDE_CLAUDE_2026-06-28_corrector-se-autocalifica-y-detector-dormido.txt` (no se pone aquí para no airear las tripas del sistema).

**DECIDIDO (28-jun):** para ver la salud de MADRE de un vistazo se montará un **semáforo (verde/ámbar/rojo) dentro de tu propio *pacer*** (privado, no en la web pública). Pendiente de montar en una sesión nueva (la receta exacta quedó guardada). Frase para arrancar: *"monta el semáforo de salud de MADRE dentro del pacer"*.

---

## 2026-06-28 — Feedback del cuaderno (3 notas) procesado + 1 widget que pediste

**HECHO YA (esta sesión, subido y verificado en navegador):**
- ✅ Widget **"📍 ¿Dónde vive este cuaderno y cuándo te lee?"** — tarjeta nueva con un dibujo simple (lo pediste tú). Verificado en móvil (375px), 0 errores.
- ✅ **Arreglado:** ya puedes usar el lápiz ✏️ y el corazón 💗 sobre las **tiras de sonido (ASMR)** — faltaba `.cmTex` en el selector. (Feedback id `c3c1f7f8`.)

**RESPUESTAS a tus preguntas:**
- **"¿Dónde está el guiño pa la tata y cómo lo abro?"** → Es la **nota secreta** escondida en el **post-it de arriba del todo** (el "📝 ¿feedback?"). Para abrirla: toca la **chincheta 📌 pequeñita** que tiene encima. *(✅ 2026-07-01: chincheta más visible — opacity subida de 0.38 a 0.62, commit `018efa7`. Ya no se esconde tanto. Espero que la tata la encuentre ahora 🙂)*
- **"¿Dónde meto vídeos para que salgan en la web del cuaderno?"** → Hoy **NO se pueden poner vídeos en la web del cuaderno** (función por construir). No confundir: los vídeos para que **MADRE los APRENDA** van al *pipeline de vídeo* (bandeja "PEGAR TODO" / `VIDEO_NUEVOS`), que es OTRA cosa distinta de esta web. *(PARKING: incrustar un vídeo elegido en el cuaderno.)*
- **"Falta una sección donde el cuaderno me hable/responda"** → **Ya existe a medias**: si dejas un **COMENTARIO PÚBLICO** (no "feedback"), **MADRE te contesta** (verás respuestas firmadas "MADRE 🤱🏻"). *(PARKING: una sección de chat dedicada, más grande.)*

**PARKING (lo grande — tú decides/priorizas; necesita más que un retoque):**
1. **Corazones GLOBALES alrededor de las zonas más queridas** (id `ffac4e41`): hoy el 💗 es solo tuyo (local). Para "los que más tienen" hace falta una tabla nueva en la nube (`zone_signals` + RPC). Ya estaba en el backlog como prioridad alta.
2. **Modo caótico más bestia** (id `3815c20d`): que cosas vibren, más caos, rodear/señalar, flechas en pantalla. Mejora lúdica.
3. **ASMR que pegue con lo que parece** (id `c3c1f7f8`): dices que los sonidos suenan raros y no reflejan la textura. Afinar el motor de sonido.
4. **Vídeo en el cuaderno** + **sección de chat dedicada con el cuaderno** (ver respuestas arriba).

---

## DERIVA (revisar) — 2026-06-28

**Control de deriva (≥7 días desde el último informe, 2026-06-21).**

Desde el baseline `8d5f6d4` hasta HEAD hay **16 commits**, con cambios en 12 ficheros:
- `index.html`: +1219 líneas netas (plantillas de dibujo, ASMR nuevos, skins, ruta guiada, HUB de FAB, visitas, panel "el cuaderno por dentro", caos mejorado, comentarios en burbujas, tarjeta "¿dónde vive?")
- Docs nuevos/actualizados: `GLOSARIO.md`, `GUIA_FACIL.md`, `DISEÑO_HEURISTICAS.md`, `CONTINUAR_AQUI.md`
- `CHANGELOG.md`: 16 entradas

**¿Quieres avanzar el baseline?** Di "deriva ok" o "baseline al día" y la rutina lo resetea. Si no dices nada, el contador sigue creciendo desde el antiguo punto de referencia.

---

## 2026-06-28 — Feedback de visitantes (6 items nuevos)

**1. "No entiendo nada MADRE" (visitante, 2026-06-21)**
- Feedback id `3a1c4dac`, tipo auto→mas-claridad, general.
- Señal de que la intro/tour no está enganchando a gente que llega de cero. Demasiado vago para editar algo concreto solo.
- ¿Quieres reforzar la intro o simplificar la ruta guiada?

**2. "No tengo ninguna peluquería, ¿qué hago?" (visitante, 2026-06-21)**
- Feedback id `0a99c3a0`, sección "Tu parte / Paso 1 — frente peluquería".
- Pregunta de visitante sin peluquería.
- ¿Añadimos una nota aclaratoria en esa sección ("si no tienes peluquería, aplica a tu negocio o al que conozcas")?

**3. "Resumen guiado de MADRE con imágenes y comparaciones" (visitante, 2026-06-21)**
- Feedback id `cc0febb1`, sección Evolución / Changelog.
- PARKING: estructural (nueva sección visual/timeline). ¿Lo planificamos en una sesión nueva?

**4. Tony (via cuaderno): "si lo de suelo externo es cambio a mejor, decídelo tú" (2026-06-22)**
- Feedback id `e4ca8cf9`, sección "Valor externo = 0".
- PARKING: "cambio a mejor" es ambiguo. ¿Optimismo? ¿Actualizado con tikslide? ¿Eliminado? Dime qué y lo hago.

**5. "No entiendo" — Ruta Guiada Paso 1, El Termómetro (visitante, 2026-06-21)**
- Feedback id `7efc942b`.
- Señal: la explicación del Paso 1 del tour no queda clara. ¿Quieres que lo simplifique?

**6. Propuesta "Changelog de lecciones" (sesión Claude Code anterior, 2026-06-28)**
- Drive `1-rF_p8T7KkajixzjNE-ApDN8uJ7SX6V5`, PC: `FEEDBACK_TONY_2026-06-28__cuaderno-changelog-lecciones.txt`.
- Propuesta: sección pública con lecciones aprendidas de MADRE, filtrada por el moat. Si dices "sí, arranca con 3-5 ejemplos", lo monto.

---

## 2026-06-30 — 5 opiniones detalladas sobre secciones del cuaderno (posiblemente IA)

Llegaron el 29-jun ~20:22-20:27 (5 feedbacks en 5 minutos, mismo patrón de redacción). Parecen de un modelo de IA revisando el cuaderno (¿usaste la 2ª opinión panel?). Son valiosas pero TODAS son mejoras estructurales → PARKING por el gate.

**1. "📄 🗳️ Decisiones que esperan tu criterio"** (id `a6b77cda`) — Evalúa 5 propuestas de autonomía de MADRE (watchdog, pipeline móvil, auto-implementar tras 5 revisiones, overlay de auto-ajuste, adelgazar instrucciones). Aprueba 4 directamente y la del overlay "con límites muy claros": snapshot → aplicar → observar → keep/rollback. NO es cambio al cuaderno sino valoración de decisiones del CORE. Lo dejo como registro; si quieres que actúe en esas propuestas, dímelo.

**2. "📄 El cementerio de ideas muertas"** (id `04d5cbfe`) — Propone: (a) fecha de defunción por entrada, (b) etiqueta de causa (Redundancia / Ya existía / No tocaba realidad…), (c) contador arriba (evaluadas / vivas / enterradas), (d) categorías: ⚰️Muerta / 😴Dormida / ♻️Absorbida / 🧬Fusionada / 🚫Refutada, (e) frase introductoria más potente. ¿Quieres que aplique alguna de estas?

**3. "📄 ⚠️ Riesgos y puntos ciegos"** (id `5dc82b9c`) — Propone: separar en 3 tipos (riesgos operativos / puntos ciegos / límites actuales), formato 4 partes por riesgo, medidor visual de cobertura, añadir 5 riesgos que faltan (dependencia de modelo, dependencia de Tony, corrupción lenta, complejidad creciente, éxito local), ordenar por riesgo existencial. ¿Priorizamos una?

**4. "📄 Lo que MADRE investiga: las «meta-palancas»"** (id `55496cbc`) — Propone: diagrama ciclo auto-mejora, ejemplo real, cambiar "hallazgo clave" → "la regla que cambió todo", barra de progreso de objetivos de MADRE, mostrar meta-palancas activas en tiempo real. ¿Cuál aplico primero?

**5. "📄 Las rutinas que mueven a MADRE"** (id `81275d71`) — Propone: personaje por rutina (🧠 El cerebro / 📹 El archivista / 📖 El bibliotecario…), mostrar cuándo despertaron y qué hicieron, diagrama de dependencias, coste y % de éxito, rutina "El auditor" que cuestione supuestos propios, hacer la sección viva con datos en tiempo real. ¿Lo planificamos?

---
