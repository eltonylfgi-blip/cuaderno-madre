# 💡 IDEAS Y BRÚJULA — Cuaderno MADRE

> **LÉEME antes de decidir qué mejorar, y SIEMPRE que no sepas qué hacer.** Este es el ÚNICO backlog del
> Cuaderno (fricciones + momentos memorables compiten en el MISMO ranking, por palanca). No es un documento
> de proceso: es una lista viva de qué atacar.
>
> **Cómo se usa (Tony, 11-jul-2026):**
> 1. Antes de un ciclo de mejora → repasa las 🧭 BRÚJULAS (filtran cualquier decisión) y coge la idea de
>    MÁS palanca del backlog que no esté gateada (o pide OK si lo está).
> 2. Cuando cierres algo y descubras una idea que te ENCANTA → añádela aquí con su palanca estimada, NO la
>    construyas por impulso. Ordénala por palanca.
> 3. Al construir una idea de aquí → muévela a ✅ CONSTRUIDO con su versión.
> - Palanca = cuánto cambia la EXPERIENCIA del visitante (qué recordaría/contaría al día siguiente), no cuánto
>   trabajo es. "Bonito" no es palanca. Medir antes de asumir (🧭 B4).

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

---

## 🔥 BACKLOG por palanca (arriba = más palanca)

### 🟥 Alta palanca

- **I1 — El árbol como "MAPA DE COMPROMISOS", no como estado.** Reencuadre de qué SIGNIFICA el árbol: cada
  rama con una apuesta abierta está *"jugándose algo con la realidad"*, no "va a morir/vivir". Mantiene la
  incertidumbre intacta (B1+B2). El visitante piensa "esa rama está comprometida", no "esa rama va a fallar".
  El dato ya existe (v1.25: cada apuesta tiene `data-rama`). *Palanca: cambia el significado entero del árbol.*
  **⚠️ GATED** (toca semántica/render del mapa) → necesita OK de Tony. Empezar por la versión MÍNIMA.

- **I2 — Vínculo apuesta↔rama que se ilumina AL TOCAR (no siempre).** Al pasar/tocar una apuesta abierta →
  se ilumina SOLO su línea hacia la rama; al tocar la rama → se ilumina la apuesta. Nada de que todos los
  vínculos respiren a la vez (ruido). Reviewer: construir la versión *"ridículamente simple"* primero (una
  sola línea luminosa al tocar), preguntar "¿ya se entiende?", y NO añadir metáforas (respiración, energía,
  cicatriz, brote) hasta comprobar que hace falta. *Palanca: hace visible la relación, que hoy hay que deducir.*
  **⚠️ GATED** (hit-test/interacción del mapa, uno de los 2 gates de CLAUDE.md) → OK de Tony.

- **I3 — Reordenar el VIAJE: el árbol DESPUÉS de la apuesta/veredicto.** MEDIDO 11-jul (375px): el árbol
  (pos 3, top 1465) se cruza ANTES que la apuesta (pos 4, top 2364) — el visitante topa el mapa antes de
  sentir el conflicto público, que es la estrella. Orden ideal del revisor: Hero→Conflicto→Apuesta→Veredicto→
  Árbol. *Palanca: alinea el recorrido con la historia principal.* Reversible (no toca el motor, solo posición
  de secciones) pero es un cambio narrativo grande → **medir/proponer antes**, probablemente pedir OK a Tony.

### 🟨 Media palanca (bajo riesgo, no tocan el motor del mapa)

- **I4 — El historial se DESPLIEGA como un pergamino al abrir 📜.** Al pulsar "📜 Ver el historial", en vez
  de aparecer 4 bloques de golpe, que se desenrolle (refuerza el significado de 📜). Reviewer: *"eso sí sería
  una mejora perceptible."* Listo para construir, CSS puro, respeta el interruptor de movimiento (v1.30). No
  toca el mapa. *Palanca media: pulido con significado.*

- **I5 — "¿Qué se está jugando MADRE HOY?" como línea-brújula que une secciones.** Una frase que conecte
  hero + apuesta + árbol + veredicto bajo la misma pregunta. Encaja con B1 (incertidumbre del presente).
  *Palanca: da hilo conductor al viaje (B3).* Copy, bajo riesgo. Definir bien antes de colocar.

### 🟦 Deuda técnica de baja prioridad (real, pero NO es el cuello hoy)

- **I6 — `<span role="button">` → `<button>` nativo** (p.ej. `#queesBtn`). Mejora accesibilidad/teclado/
  mantenimiento, no estética. Reviewer: valor 10/10, prioridad MADRE 8/10. Hacer cuando toque, no urge.
- **I7 — Hover en móvil**: si un tooltip importante depende de `:hover`, en móvil no se dispara. Reviewer 8/10.
- ❌ NO hacer ahora (reviewer, baja prioridad para MADRE): extraer CSS a fichero, quitar comentarios de
  producción, modularizar CSS, i18n con HTML separado, `will-change` (puede EMPEORAR el rendimiento si se
  abusa — solo con un problema medido). El cuello no es el código; es si la experiencia es inolvidable.

---

## ✅ CONSTRUIDO (ideas que salieron de aquí o del mismo hilo)

- v1.30/v1.31 — Interruptor de movimiento (Auto/Vivo/Calma) + latido inmediato en el título.
- v1.32 — Recorte del panel de apuestas (en juego vs historial), midiendo antes (B4, B5).
- v1.33 — Etiquetas "en juego" / "📜 historial" reforzando la separación.
- (El marcador de apuestas queda CERRADO por decisión del revisor — no hacer una v1.34 dedicada a él.)

---

## 📏 Foto del viaje (MEDIDA 11-jul, 375px — 13.3 pantallas de móvil, doc 10817px)
Hero(56,h606) · En directo(929,h522) · **🌳 Mapa(1465,h808)** · **⚖️ Apuesta(2364,h2604)** ·
IAvsMADRE(5051,h511) · QuéEsMADRE(5726,h808) · 8-jul(6812,h345) · Comentarios(8153,h868) · Duda(9035,h251).
→ Fricción medida: el árbol (pos 3) precede a la apuesta (pos 4). El marcador sigue siendo el bloque más
alto (2604px) aun tras recortarlo, pero NO se toca más (decisión del revisor).
