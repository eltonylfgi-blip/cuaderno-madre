# NOTAS_DISEÑO — naturaleza del Cuaderno MADRE (persistida)

Tony quiere que el cuaderno tenga **variabilidad constante**: que pruebe muchas cosas distintas en lo visual,
para descubrir qué gusta — PERO sin dañar la comprensión.

## Experimenta agresivamente con (cambia libremente):
- iconos / emojis, ilustraciones, avatares
- colores y temas (acento, fondos)
- animaciones y microinteracciones (lentas, no intrusivas)
- formas de botones, estados hover (crecer, inclinar, iluminar, tooltip, pulse)
- fondos (limpio, cuadrícula, estelar, glow, orgánico…)
- cabecera / "personalidad visual" (cuaderno, dashboard, sistema vivo, terminal…)
- visualización de progreso (barra, termómetro, radar, árbol…)

## Mantén SIEMPRE estable (no tocar):
- estructura y navegación
- ubicación de las secciones principales (memoria espacial)
- orden de lectura
- las 4 anclas: 🌍 Señales del mundo · 🧠 Qué es MADRE · 🛠️ Qué hizo · 👤 Qué necesita Tony

## Las 5 preguntas que el cuaderno DEBE responder rápido (no romper esto):
1. ¿Qué es MADRE? (<30s) → tarjeta 1 + tooltip 🤱🏻 + chip "¿qué es?"
2. ¿Qué hace hoy? (<60s) → "Qué hizo" en Señales del mundo + Evolución
3. ¿Qué evidencia hay de que funciona? (<90s) → 🌍 Señales del mundo (arriba)
4. ¿Cómo genera valor externo? (<2min) → tarjeta 3 (dinero/peluquería) + builds
5. ¿Hipótesis vivas vs muertas? → tarjeta 12 (Evolución)

> Para principios de **usabilidad** (no de variedad) y cómo **clonar webs personalizadas** → ver `DISEÑO_HEURISTICAS.md`.

## Ya implementado (base de la variedad)
- Tema de color + fondo **fijados por DÍA** (cambian 1 vez/día, no en cada refresco — así se mantiene la huella visual; semilla por fecha en el IIFE cosmético de index.html: arrays `temas`/`fondos`).
- Animación "respira"/`pulse`/`funbtn`, tooltips, emojis por sección.
- Para AÑADIR variedad: amplía los arrays `temas`/`fondos`, añade keyframes, varía hover/botones — sin mover layout.

> Regla de oro: variar la PIEL, no el ESQUELETO.
