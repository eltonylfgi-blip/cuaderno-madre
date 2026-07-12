# 💡 IDEAS Y BRÚJULA — Cuaderno MADRE

> **LÉEME antes de decidir qué mejorar, y SIEMPRE que no sepas qué hacer.** Este es el ÚNICO backlog del
> Cuaderno (fricciones + momentos memorables compiten en el MISMO ranking, por palanca). No es un documento
> de proceso: es un banco de HIPÓTESIS vivo — el Cuaderno no acumula ideas, MATA hipótesis malas y conserva
> las que sobreviven (reformulado 11-jul-2026, revisor externo: *"no haría una lista de ideas, haría una
> lista de hipótesis... eso refleja mucho mejor la identidad de MADRE que un backlog tradicional"* — MADRE
> es literalmente un sistema que apuesta por escrito, con fecha, y deja que la realidad decida; este
> documento aplica esa misma disciplina a las decisiones de diseño, no solo al producto).
>
> **Cómo se usa (Tony, 11-jul-2026 — "decide tú, nunca esperes a mí para hacer cosas"):**
> 1. Antes de un ciclo de mejora → repasa las 🧭 BRÚJULAS (filtran cualquier decisión) y coge la hipótesis
>    de MÁS palanca en estado `☐ Sin probar` que no esté gateada. Las gateadas (tocan mapa/identidad) SÍ
>    necesitan OK de Tony — eso no lo decide la autonomía, lo dice CLAUDE.md.
>    **⚠️ Esto NO es una cola FIFO (revisor 12-jul):** antes de construir, re-preguntar *"¿sigue siendo
>    ESTA la hipótesis de mayor retorno AHORA?"* — el orden escrito es la foto del último ranking, no
>    una promesa. Construir "la siguiente porque toca" es exactamente lo que este documento existe
>    para impedir.
> 2. Cuando descubras una hipótesis que te ENCANTA → añádela aquí con su palanca estimada y estado
>    `☐ Sin probar`. NO la construyas por impulso. **Toda hipótesis DEBE traer escrito CÓMO PUEDE MORIR**
>    (revisor 12-jul: *"si una hipótesis no tiene una forma clara de quedar refutada, todavía no está
>    bien formulada"* — MADRE gana precisamente cuando descubre que estaba equivocada).
> 3. Al construir el MVP de una hipótesis → pasa a `☐ Probando` (construida y en vivo, SIN validar con
>    evidencia real todavía — técnicamente desplegado ≠ operativamente confirmado).
> 4. Cuando haya evidencia real → pasa a `☑ Confirmada` o `☒ Rechazada`, con la evidencia anotada. Una
>    confirmada puede escalar a la siguiente versión de sí misma; una rechazada NO se reintenta sin un
>    dato nuevo que la reabra. **Evidencia ≠ tráfico** (P-006): observar a UNA persona usarla (Tony
>    vale), un recorrido cronometrado, preguntar qué entendió, pedir que señale/dibuje — todo eso ya
>    confirma o mata, sin esperar visitas.
> 5. Antes de decidir, mirar también `PATRONES_OPERATIVOS.md` (formas de decidir que ya funcionaron
>    aquí): *"¿esto se parece a un patrón conocido?"*
> - **Nunca mezclar dos hipótesis en el mismo cambio** (lección de esta sesión): si cambias el vínculo Y el
>   orden del árbol a la vez, y algo mejora, no sabrás cuál de las dos lo causó. Una variable por MVP.
> - Palanca = cuánto cambia la EXPERIENCIA del visitante (qué recordaría/contaría al día siguiente), no
>   cuánto trabajo es. "Bonito" no es palanca. Medir antes de asumir (🧭 B4).

---

## 🧭 BRÚJULAS (principios que filtran TODA decisión — si una mejora las viola, no se construye)

- **B1 — "Aumenta la incertidumbre del PRESENTE, no el contraste del fracaso."** El fracaso pasado ya pasó;
  la tensión está en *"no sé qué pasará dentro de X días"*. Afecta hero, apuesta, contador, veredicto,
  revelación. (Revisor, 11-jul — "el recurso narrativo más valioso que tiene hoy el Cuaderno".)
- **B2 — "El árbol nunca sabe más que la realidad."** LEY DE HONESTIDAD, aplicable a todo el Cuaderno.
  Prohíbe exagerar, anticipar, dramatizar, vender humo. El árbol NO predice el futuro; muestra *dónde la
  realidad todavía tiene la última palabra*. (Revisor, 11-jul.)
- **B3 — "Optimiza el VIAJE entre bloques, no los bloques."** La siguiente fricción ya no está DENTRO de las
  secciones (bastante pulidas), sino en las TRANSICIONES: hero→conflicto→apuesta→veredicto→árbol→comentarios.
  (Revisor, 11-jul: *"Deja de optimizar bloques. Empieza a optimizar el viaje entre bloques."*)
- **B4 — "Medí antes de tocar."** Nunca adivinar dónde está el cuello: medir el DOM real (getBoundingClientRect
  a 375px, coordenadas reales del recorrido). Validado toda la sesión del 11-jul; es lo que más valora Tony.
- **B5 — "Esconder cuenta como mejorar — pero NUNCA moviendo el DOM."** Colapsar por clase CSS ya existente,
  jamás reordenando nodos (rompe scripts que dependen de `selector > li`). Cortar por NARRATIVA (qué aporta
  menos al conflicto), no por posición. (Validado v1.32/v1.33.)
- **B6 — "Correlación no es causa: separar el HECHO medido de la CONCLUSIÓN."** Que el árbol se cruce antes
  que la apuesta es un HECHO (medido, B4). Que eso "robe protagonismo" es una hipótesis, NO un hecho — falta
  probarla antes de actuar como si estuviera demostrada. (Revisor, 11-jul, corrigiendo mi propia conclusión
  precipitada tras medir I3.)

---

## 🧪 HIPÓTESIS por palanca (arriba = más palanca)

### 🟥 Alta palanca

**H1 — "Si el visitante puede saltar al instante desde una apuesta a la rama afectada, entenderá mejor
QUÉ PARTE de MADRE está comprometida con esa apuesta."**
*(Reformulada 12-jul para ser FALSABLE — antes decía "añadir un vínculo", que no se puede refutar.)*
- Estado: **☐ Probando** — Construida ✔ (MVP en vivo desde v1.34), evidencia pendiente.
- **Qué intenta demostrar:** que la relación apuesta↔rama (hoy implícita en los datos) es algo que el
  visitante NECESITA ver para entender qué se juega MADRE — no un adorno.
- **Cómo sabremos si era verdad (evidencia barata, sin esperar tráfico — P-006):** con UNA persona (Tony
  vale): preguntarle "¿qué parte de MADRE depende de esta apuesta?" antes y después de descubrir el
  vínculo. Si la respuesta pasa de vaga a concreta ("la rama 🛡️ Activos") → `☑ Confirmada`.
- **Cómo puede MORIR:** si quien lo usa responde igual de vago después de tocarlo (el salto no añade
  comprensión), o si en varias sesiones nadie lo descubre de forma natural → `☒ Rechazada`, se retira
  sin más inversión y NO se construye H2 sobre ella.
- MVP construido (el más barato posible, UNA sola dirección): insignia de rama (📓🎬🧠🛡️📚) tocable →
  abre el mapa, scroll, destaca el nodo exacto (borde de acento siempre visible; brillo solo si el
  interruptor v1.30 lo permite). Cero riesgo al motor: consulta DOM externa (`.mn-emoji`), CERO llamada a
  `onNodeClick`/`routeTap`/`nodeAtPoint`/`focusBranch` (confirmado por grep).
- Deliberadamente NO construido (P-002, una variable por MVP): el sentido inverso (rama→apuestas), la
  respiración/energía/cicatriz del revisor, y cualquier cambio al orden de secciones (eso es H3).
- Palanca si se confirma: alta — validaría además la premisa de H2 (mapa de compromisos).

**H2 — "El árbol como MAPA DE COMPROMISOS (no como estado) mantiene la incertidumbre y da más significado."**
- Estado: **☐ Sin probar.** Reencuadre de qué SIGNIFICA el árbol: cada rama con una apuesta abierta está
  *"jugándose algo con la realidad"*, no "va a morir/vivir" (mantiene B1+B2 intactos). El dato ya existe
  (`data-rama` desde v1.25).
- **Depende de H1:** no tiene sentido construir el reencuadre completo del árbol si el vínculo mínimo (H1)
  ni siquiera demuestra ser útil. Esperar a que H1 tenga evidencia.
- **Cómo puede MORIR:** si tras confirmar H1, al probar el reencuadre una persona sigue describiendo el
  árbol como "estado/decoración" (no como "dónde se juega algo") — o si implementarlo exige anticipar
  resultados (violaría B2) → Rechazada.
- **⚠️ GATED** (toca semántica/render del mapa) → necesita OK de Tony cuando llegue el momento.

**H3 — "Reordenar el viaje (árbol DESPUÉS de la apuesta/veredicto) alinea el recorrido con la historia
principal y aumenta el impulso de seguir bajando."**
- Estado: **☐ Sin probar.** ⚠️ Corregido 11-jul (B6): el HECHO medido es que el árbol (pos 3, top 1465px)
  se cruza ANTES que la apuesta (pos 4, top 2364px). La CONCLUSIÓN ("eso perjudica") NO está demostrada —
  el revisor lo señaló explícitamente: *"solo sabemos que aparece antes, no sabemos si eso perjudica"*.
- **No mezclar con H1** (ya construida): si se reordena el árbol AHORA, cualquier cambio de reacción de
  Tony no se sabría si vino del vínculo (H1) o del reorden (H3). Esperar a tener lectura de H1 primero.
- **Cómo puede MORIR:** la prueba del revisor con una persona — enseñar A (árbol→apuesta, actual) vs B
  (apuesta→árbol) y preguntar *"¿cuál da más SIGNIFICADO al árbol?"*. Si B no gana con claridad →
  Rechazada, el orden actual se queda (no se reordena por estética ni "porque aparece antes").
- Reversible (no toca el motor, solo posición de secciones) pero es un cambio narrativo grande → medir/
  proponer explícitamente antes de construir, probablemente con el criterio de Tony antes de decidir solo.

### 🟨 Media palanca (bajo riesgo, no tocan el motor del mapa)

**H4 — "El historial se despliega como un pergamino (no aparece de golpe) refuerza el significado de 📜."**
- Estado: **☐ Probando** — Construida ✔ (v1.35, 12-jul), evidencia pendiente. Elegida tras el re-ranking
  anti-FIFO del 12-jul: el recorrido de transiciones ELIMINÓ con datos a los otros candidatos (ver Foto
  del viaje abajo), y H4 era la acción de mayor retorno que no esperaba evidencia humana.
- **Qué intenta demostrar:** que la coherencia símbolo↔comportamiento (📜 = pergamino que se desenrolla)
  se percibe, aunque nadie sepa explicarla.
- **Cómo sabremos si era verdad:** al enseñárselo a una persona en ❤️ Vivo (o sin reduced-motion), nota
  el desenrollado sin que se lo señalen, o lo menciona ("se abre como una lista que cae").
- **Cómo puede MORIR:** si no lo nota, o le estorba para leer → se quita (un Edit reversible) y se queda
  el corte de golpe, que no está roto.
- MVP: escalonado 0/.13/.26/.39s con el muelle ya existente (P-005); gates de movimiento idénticos al
  resto del sitio (reduced-motion sin opt-in → sin animar; Calma → nunca). Cero DOM movido.

**H5 — "¿Qué se está jugando MADRE HOY? como línea-brújula uniendo secciones aumenta la sensación de
viaje continuo (B3)."**
- Estado: **☐ Sin probar.** ⚠️ PREMISA DEBILITADA 12-jul: el recorrido de transiciones demostró que el
  hilo conductor YA existe (5 separadores de acto + 1 puente, en runtime — ver Foto del viaje). H5 solo
  tiene sentido si la evidencia dice que los actos NO bastan; no construir antes de eso.
- **Cómo puede MORIR:** si tras el recorrido nadie usa esa idea al contar de qué va la web (la frase no
  une nada en la práctica) → fuera, sin duelo. Muere también si los separadores de acto ya cumplen (el
  hallazgo del 12-jul apunta ahí).

### 🟦 Deuda técnica de baja prioridad (real, pero NO es el cuello hoy)

- **H6 — `<span role="button">` → `<button>` nativo** (p.ej. `#queesBtn`). Estado: ☐ Sin probar, no urge.
  Mejora accesibilidad/teclado/mantenimiento, no estética.
- **H7 — Hover en móvil**: si un tooltip importante depende de `:hover`, en móvil no se dispara.
- ❌ Descartadas para MADRE ahora (reviewer): extraer CSS a fichero, quitar comentarios de producción,
  modularizar CSS, i18n con HTML separado, `will-change` sin medir (puede EMPEORAR el rendimiento). El
  cuello no es el código; es si la experiencia es inolvidable.

---

## ✅ CONFIRMADO / CONSTRUIDO (con versión — lo que ya se desplegó)

- v1.30/v1.31 — Interruptor de movimiento (Auto/Vivo/Calma) + latido inmediato en el título.
- v1.32 — Recorte del panel de apuestas (en juego vs historial), midiendo antes (B4, B5).
- v1.33 — Etiquetas "en juego" / "📜 historial" reforzando la separación.
- v1.34 — H1 en `☐ Probando`: vínculo mínimo apuesta→rama (ver arriba).
- v1.35 — H4 en `☐ Probando`: el historial se desenrolla como pergamino (la ÚNICA excepción al cierre
  del marcador que el propio revisor dejó carved: "eso sí sería una mejora perceptible").
- (El marcador de apuestas queda CERRADO por decisión del revisor — no construir más ahí sin un hecho nuevo.)

---

## 📏 Foto del viaje (MEDIDA 11-jul, 375px — 13.3 pantallas de móvil, doc 10817px)
Hero(56,h606) · En directo(929,h522) · **🌳 Mapa(1465,h808)** · **⚖️ Apuesta(2364,h2604)** ·
IAvsMADRE(5051,h511) · QuéEsMADRE(5726,h808) · 8-jul(6812,h345) · Comentarios(8153,h868) · Duda(9035,h251).
→ HECHO: el árbol (pos 3) precede a la apuesta (pos 4). Si eso perjudica es H3, sin probar (ver arriba).

**Auditoría de TRANSICIONES (12-jul, runtime real — corrige dos conclusiones precipitadas):**
- Las fronteras entre bloques NO están mudas: hay **5 separadores de acto + 1 puente**, todos visibles,
  insertados por el resecuenciador v0.33 en runtime (por eso una medición ingenua de tarjetas no los ve):
  ACTO I «Lo que me juego» (2295px, JUSTO entre mapa y apuesta) · puente v1.29 (5002) · ACTO II (6577) ·
  EL GIRO (6763) · ACTO III (7199) · «Tu parte · solo Tony» (7984).
- ⚠️ Dos FALSAS ALARMAS paradas por P-003: (1) "mapa→apuesta es un corte seco" — FALSO, ahí está el
  separador de ACTO I presentando la apuesta; (2) "hay ~1000px vacíos antes de comentarios" — FALSO, es
  la zona de revelado progresivo de v1.06 (tarjetas colapsadas de ACTO II/III + separadores).
- Consecuencia: no hay transición muda que arreglar hoy; H5 debilitada; la pregunta pendiente del viaje
  es si los SEPARADORES cumplen su papel — y eso es evidencia humana (recorrido con una persona), no más
  medición.
