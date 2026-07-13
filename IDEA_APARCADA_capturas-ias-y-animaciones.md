# IDEA APARCADA — Sección "capturas de IAs" + absorber técnica de animaciones + preferencia visual

> Aparcado 13-jul-2026 (Tony, en el hilo de la web neuro-fuerza). No se construye ahora; queda
> registrado en la carpeta del cuaderno para retomar con gate + falsador (reglas 6/15/16 de MADRE).

---

## A) Sección del cuaderno: "capturas de IAs" (glazing / cosas graciosas)

**La idea (Tony):** una sección donde la gente sube capturas de IAs siendo graciosas o "glazing"
(halagando en exceso al usuario). Es MEMÉTICO y compartible → encaja con la brújula del cuaderno
(narrativa + memética).

**¿Necesita backend? SÍ, si la subida es directa.** Guardar imágenes que sube gente desconocida =
almacenamiento + MODERACIÓN (la gente sube basura/NSFW). No es un archivo estático.

**v0 BARATA sin backend (mínima innovación, máxima fiabilidad):** la gente te MANDA las capturas
(enlace/formulario que caiga en tu correo, o un "issue" de GitHub, o por redes), TÚ eliges las
buenas y se añaden como imágenes fijas a la web. Cero backend, cero riesgo de moderación. Curación
manual. Si funciona y hay volumen → entonces backend.

**v1 con backend (solo si v0 valida el interés):** Supabase (ya conectado a MADRE) = storage +
tabla + cola de moderación. Es un proyecto, no una tarde.

**Pendiente:** Tony dijo "te paso una [captura]" pero no llegó en el mensaje. Cuando la tenga, es
el primer ejemplo semilla.

**Gate antes de construir (regla 17):** ¿quién gana ya con esto? (secciones UGC de humor existen);
¿qué copiamos? (curación manual primero); ¿mejora única? (que sea sobre IAs, ligado a la narrativa
del cuaderno); ¿cómo se mide? (nº de envíos + compartidos); ¿momento wow? (reírse + querer enviar
la suya).

---

## B) MODO "absorber la TÉCNICA" de las animaciones que pasa Gemini (no la animación concreta)

**La idea (Tony):** cada vez que Gemini nos pase una animación buena, no quedarnos solo con ESA;
aprender CÓMO se hace para poder hacerlas nosotros. Un modo preparado para absorber la técnica.

**Mecanismo propuesto (barato, ya medio existe):** MADRE tiene `RECETAS_WEB\` (técnicas web sin
librerías). Cada vez que Gemini entregue una animación que guste → extraer el PATRÓN reutilizable
(no el archivo): p.ej., de la web neuro-fuerza la receta es *"partículas SVG generadas por JS +
transición CSS sobre cx/cy + bucle de spawn con probabilidad según una variable"*. Se guarda como
ficha en `RECETAS_WEB\` con: qué efecto, cómo se logra, snippet mínimo, cuándo usarlo. Así la
próxima la hacemos nosotros.

**Encaja con MADRE reglas 6/13** (aprender de/adquirir capacidades; aprender de código sin límite).
No es construir un pipeline nuevo: es un hábito de extracción a una carpeta que ya existe.

**Siguiente paso concreto (cuando Tony esté en modelo barato):** hacer la PRIMERA ficha en
`RECETAS_WEB\` con la técnica de partículas de esta web, como plantilla.

---

## C) PREFERENCIA de Tony (guardar): visual + interactivo + smooth

Tony, 13-jul-2026: *"me encanta q sea visual interactiva y smooth, guardemos esa preferencia"*.
Toda superficie que vea un cliente (web, demo, herramienta) debe tender a **visual, interactivo y
smooth**, no textual y estático. Es un SHARPEN de la regla 17 (WOW) y de la ficha
`efecto-wow-factor-visual-madre` de MADRE: el "wow" preferido de Tony es movimiento suave +
interacción, no solo estética. Aplicar por defecto al construir cara-al-cliente.
