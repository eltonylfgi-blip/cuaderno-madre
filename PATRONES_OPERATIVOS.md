# 🧬 PATRONES OPERATIVOS — formas de decidir que YA funcionaron aquí

> **Qué es:** NO una lista de "cosas que gustaron" (eso en 3 semanas no decide nada). Cada entrada es un
> patrón que (1) **CAMBIÓ una decisión real** y (2) **es REUTILIZABLE en otros problemas** — las dos
> condiciones de entrada, sin excepción. Si solo sirve para una pantalla concreta, no entra.
> (Pedido por Tony 12-jul-2026: "cada vez que nos guste algo, guardarlo operativo, para hacer cada vez
> más cosas así". Formato del revisor externo.)
>
> **Cuándo se AÑADE uno:** cuando una conversación cambia nuestra forma de decidir futuros problemas.
> Señales típicas (no hace falta que nadie diga "guárdalo"): *"vale oro"*, *"la mejor corrección del
> sprint"*, *"esto cambia muchas decisiones"*, *"ahora sí"*, *"esto no puede perderse"*. Claude lo
> detecta y lo PROPONE — no guarda todo en automático.
> **Cuándo se CONSULTA:** antes de una mejora, junto a `IDEAS_Y_BRUJULA.md`: *"¿esto se parece a un
> patrón que ya sabemos que funciona?"*
> **TOPE (revisor 12-jul): ~30-40 patrones máximo.** Pasado eso, deja de ser útil — *"mejor 18 patrones
> excelentes que 140 buenas ideas"*. Al acercarse al tope, PODAR: se quedan solo los que hayan cambiado
> VARIAS decisiones; el resto fuera (la poda es parte del mecanismo, no un fallo).
> **Advertencia vigente (revisor):** si esto acaba con prioridades, etiquetas, dependencias y matrices,
> habrá fracasado. Formato plano, 5 campos, y ya. Las brújulas de PRODUCTO (B1-B6) viven en
> `IDEAS_Y_BRUJULA.md` y NO se duplican aquí — esto es cómo DECIDIMOS, no qué cuenta la web.

---

## P-001 — Medir antes de tocar
- **Origen:** v1.32 (11-jul-2026).
- **Qué pasó:** Tony dijo "hay paneles demasiado largos"; en vez de adivinar cuál, se midió el DOM real:
  `#prediccionesCard` = 3381px, el siguiente = 868px. La decisión salió de un dato.
- **Por qué funcionó:** el culpable no era discutible; y reveló que el recorte correcto era narrativo
  (resueltas vs en juego), no "acortar todo".
- **Generalización:** ante cualquier "esto está mal", buscar primero el cuello MEDIBLE (px, ms, conteos,
  coordenadas). Sin dato, no hay decisión — hay opinión.

## P-002 — No mezclar dos hipótesis en un mismo cambio
- **Origen:** v1.34 (11-jul-2026).
- **Qué pasó:** se construyó el vínculo apuesta→rama pero NO se movió el árbol en la misma versión,
  aunque ambas ideas estaban sobre la mesa.
- **Por qué funcionó:** si algo mejora ahora, sabremos POR QUÉ. Dos cambios juntos = efecto inatribuible.
- **Generalización:** una variable por MVP. Si dos cambios responden a hipótesis distintas, versiones
  distintas.

## P-003 — Separar el hecho medido de la conclusión
- **Origen:** investigación del viaje, 11-jul-2026 (sin versión — nació de un error propio).
- **Qué pasó:** medí que el árbol aparece ANTES que la apuesta (hecho) y concluí "roba protagonismo"
  (conclusión sin probar). El revisor lo separó: *"solo sabemos que aparece antes"*.
- **Por qué funcionó:** evitó reordenar media web sobre una suposición disfrazada de dato.
- **Generalización:** al presentar un análisis, etiquetar QUÉ es dato y QUÉ es interpretación — y no
  actuar sobre la interpretación como si tuviera la certeza del dato. *(Propuesta como ley general a
  MADRE, buzón 12-jul.)*

## P-004 — Probar la versión ridículamente simple primero
- **Origen:** v1.34 (11-jul-2026).
- **Qué pasó:** el revisor propuso un vínculo apuesta↔rama con respiración/energía/cicatrices. Se
  construyó SOLO "tocar insignia → destacar nodo" y la pregunta "¿ya se entiende?" decide si hace falta
  más.
- **Por qué funcionó:** el 80% del valor suele estar en hacer visible la relación, no en las metáforas;
  y si la hipótesis muere, murió barata.
- **Generalización:** ante una idea grande, construir el MVP mínimo que la pruebe; no añadir capas hasta
  que la simple demuestre quedarse corta.

## P-005 — Reusar el vocabulario existente antes de inventar
- **Origen:** v1.33 (11-jul-2026).
- **Qué pasó:** para el botón de historial se comprobó (grep) qué emojis ya significaban algo: 📚 ya era
  la rama "Memoria/archivo" → descartado aunque lo sugirió el revisor; 📜 ya significaba "registro del
  pasado" en el changelog → elegido. Igual con ⏳ (reusado del chip "en juego").
- **Por qué funcionó:** cero ambigüedad nueva; el sitio se mantiene coherente sin que nadie lo note.
- **Generalización:** antes de introducir un símbolo/término, buscar si ya existe uno con ese significado
  — y comprobar que el candidato no signifique ya OTRA cosa.

## P-006 — Evidencia ≠ tráfico
- **Origen:** feedback del revisor sobre H1, 12-jul-2026.
- **Qué pasó:** dije "falta evidencia real de uso" implicando esperar visitantes. El revisor lo corrigió:
  observar a UNA persona, cronometrar un recorrido, preguntar qué entendió — todo eso ya valida/refuta,
  sin miles de visitas.
- **Por qué funcionó:** desbloquea la validación HOY en vez de aplazarla a un tráfico que aún no existe.
- **Generalización:** para cada hipótesis, definir la evidencia más BARATA que la mataría o confirmaría;
  el tráfico es solo una de las fuentes, y casi nunca la primera disponible.

## P-007 — Toda mejora se formula como hipótesis falsable
- **Origen:** reescritura del backlog, 12-jul-2026.
- **Qué pasó:** el backlog pasó de "ideas" a hipótesis con estado (Sin probar/Probando/Confirmada/
  Rechazada) y con su forma de morir escrita.
- **Por qué funcionó:** una idea puede vivir para siempre; una hipótesis está obligada a terminar su
  historia. Encaja con la identidad de MADRE (apuesta pública + realidad decide).
- **Generalización:** si una mejora no puede quedar refutada por nada, todavía no está bien formulada —
  reescribirla hasta que tenga una muerte posible.

## P-008 — El final pesa más que su tamaño (regla pico-final)
- **Origen:** H6 / auditoría de transiciones, 12-jul-2026 (promovido por el revisor: "afecta a demos,
  productos, presentaciones, vídeos, onboarding — es reutilizable").
- **Qué pasó:** el recorrido reveló que lo último que ve el visitante son comentarios de prueba crudos
  y una nota administrativa — el peor momento de la web justo donde la memoria pesa más (pico-final:
  la gente recuerda el pico y el FINAL de una experiencia, no la media).
- **Por qué funcionó:** redirigió el objetivo creativo hacia el cierre, que nadie miraba porque "el
  final no compite" — y sí compite: define el recuerdo con el que se va el visitante.
- **Generalización:** en cualquier experiencia (demo, producto, presentación, vídeo, onboarding),
  diseñar el FINAL tan deliberadamente como el pico. Pregunta: ¿cuál es la última impresión REAL (no
  la planeada)?
