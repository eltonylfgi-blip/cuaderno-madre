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

> **Filtro de retención (revisor 12-jul, contra la acumulación):** una brújula solo SE QUEDA si ha
> cambiado **≥2 decisiones distintas** demostrables. Lo que no llegue es una *observación útil* (vive
> abajo, en 🌡️ EN PRUEBA, con contador) — asciende al demostrar las 2, o se poda. Si algún día hay 18
> brújulas, no se consultará ninguna: el tope implícito es ~media docena de verdad.

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
### 🌡️ EN PRUEBA (observaciones útiles — ascienden a brújula al cambiar 2 decisiones distintas)

- **E1 (era B7) — "Rompe tus mejores ideas antes de construirlas."** Genera 2-3 rivales que intenten
  superar la idea excelente; construye solo la que nadie supere — y aun esa, en su versión más simple
  (P-004). **ALCANCE CALIBRADO (GPT 12-jul, tras v1.36): el proceso COMPLETO (torneo + atacante
  independiente) SOLO para escenas de IDENTIDAD del Cuaderno (hero, cierre, mapa, veredicto) — para
  mejoras medianas basta el criterio + brújulas; el proceso no puede costar más que el producto.**
  Solo para decisiones CREATIVAS, no fixes mecánicos. **Decisiones cambiadas: 1/2** (torneo de
  la escena de cierre, 12-jul — mató 4 de 6 candidatas antes de construir nada).
- **E2 (era B8) — "La peor parte debe seguir siendo extraordinaria."** Al buscar el siguiente cuello,
  mirar también la sección MÁS DÉBIL. Test: ¿qué sección describiría un visitante con un "meh"?
  **Decisiones cambiadas: 1/2** (H6: el final de la página como objetivo, 12-jul).
- **E3 (era B9) — "La prueba del silencio."** Gate de "terminado" creativo: los 10 segundos de silencio
  tras explorar deben transmitir asombro/curiosidad. **Decisiones cambiadas: 0/2.**

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

**H6 — "Si el visitante termina la experiencia con una ESCENA DE CIERRE en lugar de comentarios de
prueba + nota administrativa, recordará mejor el Cuaderno."** *(Reformulada 12-jul por el revisor:
comparativa y falsable — "el final es malo" era el hecho, no la hipótesis. Regla pico-final → P-008.)*
- Estado: **☐ Probando** — Construida ✔ (v1.36, 12-jul, «LA ÚLTIMA LÍNEA»), evidencia pendiente.
- **Registro del torneo E1 (12-jul, cumplido):** 6 candidatas, 4 muertas contra brújulas (tapa teatral
  → copiable y "¿echar de menos?" negativo; espejo del visitante → compite con la protagonista; cierre
  circular → truco, no escena; "testigo" con contador → mecánica nueva + gamificación). Ganadora
  atacada por un adversarial independiente: 1 golpe MORTAL aceptado (fuera la frase "tú ya estabas..."
  — anticipaba triunfo no ganado, B1/B2, y era falsa post-15-jul) + 2 ajustes obligatorios aplicados
  (rótulo solo-hechos; pie de foto explicativo borrado) + su variante mejorada adoptada (evidencia
  sobre promesa: la última línea YA escrita, leída del ledger real — se actualiza sola al anotarse
  cada veredicto).
- **Nota de proceso:** construida bajo el "adelante con lo de más beneficio" de Tony (12-jul) —
  reversible en 1 Edit si al verla no le convence; no toca los 2 gates duros (mapa/marca).
- **HECHO medido (12-jul, recorrido de transiciones):** hoy lo último que ve quien llega al fondo es:
  comentarios de prueba crudos («ola gays» / «gay tu» como últimos comentarios visibles) → nota
  administrativa de tarjetas internas → footer. **No existe escena de cierre** — la web más honesta y
  viva del mundo termina... administrativamente. Para un sitio cuya historia es "la realidad me va a
  juzgar", el final es la parte más "meh" de toda la experiencia.
- **Qué intenta demostrar:** que el cierre pesa mucho más que su tamaño en lo que el visitante recuerda
  y cuenta (¿qué historia contaría al día siguiente? — hoy la respuesta no incluye el final).
- **Cómo sabremos si era verdad:** preguntar a una persona que la recorra entera: *"¿cómo termina la
  web?"* Hoy la respuesta esperable es "no sé / unos comentarios". Tras construir la escena: la nombra.
- **Cómo puede MORIR:** si casi nadie llega al fondo (medible), el final no es palanca → Rechazada, no
  se construye. También muere si la escena de cierre compite con la apuesta (violaría el criterio de
  siempre: protagonista es MADRE-vs-realidad).
- **⚠️ E1 OBLIGATORIA antes de construir (torneo de rivales):** no construir la primera idea. Candidatos
  iniciales (ninguno elegido aún): (a) «MADRE cierra el cuaderno» — literal, la tapa se cierra contigo
  dentro; (b) la despedida sabe cuánto viste (datos reales de TU sesión) y te emplaza al veredicto más
  cercano; (c) la última línea la escribe la realidad: "esta página no sabe cómo acaba su propia
  historia — vuelve el 15-jul". Generar más rivales antes de decidir.
- **Nota de moderación (decisión de Tony, NO mía):** los comentarios crudos son datos compartidos de
  producción — ocultarlos usa el campo `hidden` existente (mismo mecanismo ya usado 2 veces), pero
  mutar producción necesita su OK (precedente: fila TEST-VERIF bloqueada, ver CONTINUAR_AQUI 11-jul).
- **⚠️ GATED parcial:** una escena de cierre nueva = identidad/momento nuevo → enseñar a Tony la
  ganadora del torneo antes de fijarla (gate de identidad de CLAUDE.md).

**H15 — "Si Caos exagera lo que el visitante ACABA de tocar con lenguaje MLG reconocible, será más
memorable y menos cansado que una lluvia aleatoria de memes."**
- Estado: **☐ Probando — Construida ✔ (v1.63).** El director central suma energía por eventos reales,
  enseña combo/fase, limita a un titular héroe, deja el azar como condimento lento y limpia con Esc.
  Bajo movimiento reducido no arranca tint, cámara, partículas ni bromas móviles.
  `6,7` conserva un mini-MLG también fuera del modo; ninguna etiqueta puede afirmar éxito/estado.
- **Decisión que cambia:** conservar y extender el director a más escenas semánticas, o volver al Caos
  mínimo si la relación gesto→efecto no se entiende. No autoriza meter recursos MLG porque sí.
- **Selector externo barato:** Tony activa Caos, toca al menos mapa/ASMR/gato y responde sin pistas qué
  disparó cada golpe. Gana si identifica las causas y lo describe como MLG; pierde si dice «cosas random»,
  si un titular tapa lectura o si necesita salir antes de tres interacciones.
- **Cómo puede morir:** una observación real no distingue el nuevo modo del anterior, la cámara molesta
  bajo la preferencia reducida o el 67 deja de caber a 375px. Se conserva el mini-meme que sí funcione y se poda el
  director; no se sube intensidad para intentar rescatarlo.

**H16 — "Si el visitante puede guardar sus zonas favoritas y al volver ve qué cambios PUBLICADOS las
tocaron, el Cuaderno convierte feedback en una relación visible en vez de una caja negra."**
- Estado: **☐ Probando — Construida ✔ (v1.63).** `cm_favorites_v1` sobrevive a la recarga; el feedback
  existente recibe alta/actualización/retirada; el changelog horneado conserva `areas[]`; la tarjeta compara solo
  versiones posteriores y admite «aún no hay» cuando corresponde. Respuestas de red antiguas no pueden
  resucitar una nota borrada, y un fallo real al borrar se muestra en vez de fingir éxito.
- **Decisión que cambia:** el siguiente ciclo de Cuaderno puede priorizar una zona con señal explícita y
  mostrar la evidencia al volver. Si nadie guarda/retorna, no se convierte en perfil ni backend nuevo.
- **Selector externo:** (1) aparece `tipo:favorito-madre*` en el inbox privado; (2) una versión futura
  etiquetada con el área hace aparecer el cambio correcto al volver; (3) Tony reconoce que su nota sigue
  siendo la misma. Los tres pasos forman el ciclo; guardar localmente por sí solo no confirma la hipótesis.
- **Cómo puede morir:** no llega ninguna señal tras uso real, el visitante no vuelve/abre la tarjeta o las
  coincidencias del changelog resultan engañosas. Se retira la promesa de seguimiento antes de añadir
  perfiles, tablas o IA de matching.

### 🟨 Media palanca (bajo riesgo, no tocan el motor del mapa)

**H13 — "Si las marcas de la barra de progreso (saltan a cada Acto) son legibles a simple vista, no
solo por hover, más visitantes las usan para navegar en vez de verlas como ruido."** *(Tony, 12-jul —
las vio y las describió como "palitos negros" sin saber qué eran.)*
- Estado: **☐ Sin probar.** Hecho medido (12-jul): `.tonyProgMark` son marcas de 3×6px, color oscuro
  sólido, cuyo significado (qué Acto es) solo se revela por `title`/hover — inexistente en táctil/móvil.
- **Cómo puede morir:** si tras darles más pista visual (label persistente, o que el primer toque la
  enseñe) Tony sigue sin identificarlas como navegación, o si nadie las usa más que antes → Rechazada,
  se dejan como decoración menor de la barra o se quitan.

**H14 — "Una textura ASMR repartida por el recorrido se descubre más si, además de estar ahí, llama la
atención de forma puntual y recompensa el roce repetido con una manifestación visual propia del material."**
*(Tony, 12/14-jul: "entre paneles" + "que los emojis se muevan" + "si rozas mucho madera, árboles por los laterales".)*
- Estado: **☐ Probando — Construida ✔.** v1.47 repartió las zonas; v1.62 mantiene **13** texturas,
  programa reclamos ocasionales (crecer/twirl/vibración, nunca movimiento constante) y aplica un contrato
  común de 3 fases: brillo local → primeras señales → efecto lateral semántico. `FX_MANIFEST` cubre 13/13;
  reduced-motion y el interruptor ASMR anulan los efectos móviles; máximo 24 elementos y limpieza automática.
  v1.63 añade 16/16 firmas auditivas declaradas y hace cada voto reversible con señal de retirada.
- **Selector externo:** uso real de Tony + votos `asmr-candidato-gusta/no-gusta/retirado` del Laboratorio que
  lleguen al inbox (la preferencia local se conserva incluso offline). Si el reclamo no aumenta toques o molesta,
  se baja frecuencia/intensidad; si dos candidatas siguen sonando iguales al oído humano, una no madura aunque
  sus firmas técnicas sean distintas.
- **Regla heredable:** una textura nueva no está terminada hasta declarar `sonido + manifestación visual +
  umbrales progresivos + fallback sin movimiento`; el verificador debe fallar si queda fuera del manifiesto.
- **Cómo puede morir:** si Tony la ignora incluso con reclamo puntual, si tapa lectura, o si el feedback marca
  molestia. En ese caso se conserva el sonido a demanda y se poda el reclamo/efecto, no se añade más ruido.

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

**H7 — "Si cada rama enseña sus LOGROS TOP reales (los avances de verdad, no más texto), quien explora
—incluido un revisor de Anthropic— entiende el valor real del proyecto sin quedarse con hambre."**
- Estado: **☐ Sin probar** (pedida por Tony 12-jul con la misión del revisor). Solo puede usar datos
  REALES ya existentes (148 cambios, apuestas selladas en git, señales del 8-jul, sistema de rutinas) —
  cero inventos (B2). Toca CONTENIDO de los nodos, no el motor (los textos no son hit-test), pero mejor
  enseñar borrador a Tony por ser identidad del mapa.
- **Cómo puede MORIR:** si al añadir logros las ramas se vuelven más largas pero nadie las lee mejor
  (test con una persona), era bloat — fuera.

**H8 — "Si hay una señal de que «lo mejor está más abajo» (el mapa), más visitantes llegan hasta él."**
- Estado: **☐ Sin probar** (pedida por Tony 12-jul: "incentivos para seguir bajando... que esté
  reluciente"). Medible con el tracker de profundidad que YA existe (`cm_deepest_v1`): comparar hasta
  dónde llega la gente antes/después.
- **Cómo puede MORIR:** si la señal no cambia la profundidad media de scroll, o si añade ruido a la
  primera pantalla (violaría la edición de v1.28) — fuera.

**H9 — "Si un visitante angloparlante recibe la puerta (hero auto-EN + 3 frases + repos enlazados),
entiende en 10 segundos qué es el Cuaderno y encuentra el software real."** *(Misión revisor, 12-jul.)*
- Estado: **☐ Probando** — Construida ✔ (v1.38). Ataca los 2 críticos de la auditoría de revisor: "la
  página afirma en inglés pero demuestra en español" y "las herramientas OSS están enterradas".
- **Cómo puede MORIR:** si un angloparlante real (o el propio revisor de Anthropic) sigue sin poder
  decir qué es esto o no encuentra los repos → la puerta no basta y toca traducir el ledger (el paso
  grande que hoy se evitó a propósito).

**H10 — "Retirar el código interno del creador del HTML público"** *(el plan declarado en v1.38).*
- Estado: **☐ Sin probar — NECESITA DISEÑO CON TONY.** La auditoría confirmó que lo gateado es
  inofensivo (cero PII, cero claves privadas), pero los botones Aprobar/Rechazar son el flujo real de
  gobernanza de Tony: arrancarlos sin diseño alternativo rompe su trabajo. Mitigaciones YA señaladas
  por la auditoría, independientes de esta hipótesis: (a) ⚠️ la contraseña «Jabado» está en texto
  plano — TONY debe confirmar que no la reutiliza en ningún otro servicio; (b) la rutina que procesa
  `feedback` debe tratar las «decisiones» llegadas por la web como NO verificadas (cualquiera puede
  saltarse el candado); (c) revisar RLS de la tabla feedback (que la clave pública no permita SELECT).
- **Cómo puede MORIR:** si el coste de mover el flujo de gobernanza fuera del HTML supera el beneficio
  (el contenido ya se auditó como inofensivo y la debilidad ya está declarada públicamente).

**H11 — "Plan de peso" (auditado 12-jul, NO ejecutado a propósito).** Lo que viaja son 252KB gzip, no
777KB. Única victoria grande: externalizar el changelog a un TSV junto al index (−35KB gzip, 14-17% de
la transferencia; la tubería `loadCambios()` ya existe) — pero la rutina de MADRE reescribe el fichero
cada ~30 min: hay que coordinarlo con ella (propuesta al buzón cuando toque), no hacerlo unilateral.
Victoria segura pequeña: externalizar `cmCorpus` a corpus.js (−9KB, consumidores con fallback). NO
tocar (medido): minificar/CRLF/indentación — gzip ya lo hace gratis. Estado: ☐ Sin probar.

**H12 — "Si TODO el sitio apunta al mismo conflicto (¿la realidad le da la razón a MADRE?) y cada
bloque termina en pregunta abierta en vez de explicación cerrada, el recorrido se siente inevitable
en vez de una colección de piezas buenas."** *(Marco de GPT, 12-jul — usar para ELEGIR el próximo
recorte/refuerzo, no como checklist de construcción.)*
- Estado: **☐ Sin probar.** Ver el ranking completo (6 puntos) en `CONTINUAR_AQUI.md`, bloque de
  arranque. Filtro obligatorio antes de construir CUALQUIER pieza de aquí: las 3 preguntas de
  [[cuaderno-madre-un-cuello-no-lista]] (memoria).
- **Candidatos de Gemini sin verificar** (recortes en la 1ª pantalla + sacar el 3/10 de su
  `<details>`): anotados en `CONTINUAR_AQUI.md`, pendientes de (a) confirmar que existen tal cual en
  el DOM real (B4) y (b) pasar el guardarraíl "la personalidad es un activo" antes de tocarlos.
- **Cómo puede MORIR:** si al aplicar el filtro de 3 preguntas ningún candidato pasa las 3, esta
  hipótesis se aparca sin construir nada — es un marco de PRIORIZACIÓN, no una obligación de build.

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
- v1.39 — El marcador se pliega tras la 2ª apuesta en juego (difuminado + «Ver el marcador entero»):
  2536px→1424px. Reabierto con un hecho nuevo (Tony lo volvió a ver + medición al día de hoy) — Gemini
  y ChatGPT, en independiente, convergieron en este mismo panel como único cuello de mayor palanca.
  Mecanismo genérico (`.cardFold`/`.cardFoldBtn`), reusable en otros paneles largos si hiciera falta.
- (El marcador queda CERRADO otra vez tras v1.39 — mismo principio: no seguir aquí sin un hecho nuevo.)

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

---

## 📦 CAJÓN DE IDEAS MUY BUENAS (12-jul-2026, freno de versiones activo — orden de Tony: "no dejes nada fuera")
> Nada de aquí se construye durante el freno. Al retomarlo: re-preguntar cuál tiene MÁS palanca AHORA
> (no es cola FIFO), pasar el filtro de 3 preguntas, y UNA a la vez.

**🔭 EL CRITERIO PARA LA PRÓXIMA VERSIÓN (revisor, 12-jul — semana de observación):**
responder 3 preguntas antes de construir nada: (1) ¿dónde se para la gente espontáneamente?
(2) ¿qué recuerda alguien 1 hora después? (3) ¿qué cuenta cuando enseña el enlace a otra persona?
Respuesta buena = «la IA que apuesta en público y en 3 días sabrá si estaba equivocada».
Respuesta mala = «el sonido» / «los logros» → habríamos ido en dirección equivocada.

**De Tony (12-jul):**
- Ruta guiada v2: el texto va APARECIENDO y palabras de color tiñen lo señalado (referencia visual viva).
- Mapa grande: el texto se sale de los círculos → círculos/«ambientes» según lo que haya dentro del
  nodo. Zona delicada (motor gateado al lado): MEDIR primero, cambio de presentación solamente.
- Panel de info del mapa denso en móvil + «el cuaderno no es muy explicativo, cuesta verlo todo».
- PRINCIPIO GENERAL suyo: primera impresión SIMPLE; ahondar clicando (colapsables, referencias,
  «explícame más»). Auditar dónde no se cumple aún.
- Sorpresa REAL al final: el teaser se retiró por gancho (no pasó «¿lo diría MADRE sin medir
  retención?»); si algún día EXISTE una sorpresa real al final, mencionarla dejará de ser gancho.
- H13 remate: si las marcas lavanda de la barra siguen sin entenderse, label persistente al pasar.

**De GPT (12-jul), filtradas por «¿hace participar en el experimento?»:**
- 💶 € en vez de % en el gesto de mojarse; versión fuerte: presupuesto de 100€ ficticios entre TODAS
  las apuestas → aparece estrategia, y la pérdida duele más que un porcentaje.
- 👣 Huellas del recorrido: el Cuaderno recuerda qué ramas tocaste (local, sin login) — al volver no
  eres un visitante nuevo.
- ✋ Vocabulario de gestos (3-5 repetidos = identidad; tabla semántica): Deslizar=Apostar ·
  Arrastrar=Priorizar · Tirar=Revelar · Conectar=Relaciones · Sellar=Comprometerse. Candidatos:
  rascar un veredicto (lotería) · palanca física para Vivo · sobre/pestaña para mensajes de MADRE ·
  cable apuesta↔rama · arrastrar prioridades (tu orden vs el orden real de MADRE — contraste, no
  acierto) · antes/después deslizable · balanza evidencia/intuición · sellos APROBADO/RECHAZADO ·
  máquina de escribir · lupa/linterna/imán/tensor (solo si sirven al experimento).
- 🎙️ Voz hablada: si Elvira no convence → torneo a CIEGAS de 10-15 voces gratuitas (mismo texto,
  rondas). Variante con significado: voz por ESTADO (normal/duda/falló/acertó), NUNCA aleatoria.
  TTS dinámico: generar audio de mensajes nuevos automáticamente (edge-tts pipeline).
- ✍️ Voz escrita: una temporada RECOLECTANDO frases (las que «solo MADRE diría» Y las que suenan a
  asistente) → el corpus crece con ejemplos, no reglas. Luego: pasada a textos largos + autopsia de
  frases-asistente restantes.
- 🧵 Terminaciones pendientes: el final de ACTO I (hoy: índice de desplegables) y el de ACTO III
  (hoy: «Actualizado: fecha») — solo se construyeron los 2 puentes de mayor palanca (v1.48).
- 🌳 Tensión abierta: brújula-del-mapa ↔ H3 (¿llevar más gente al mapa ayuda al recorrido o le roba
  protagonismo a la apuesta?). La responde la observación, no otra build.
- ⚰️ Protocolos con derecho a morir: en ~1 mes, podar los que no hayan cambiado 2 decisiones reales.
- 🎮 VIGILANCIA anti-videojuego (aviso repetido): sonido+vibración+logros+partículas+ambiente+voz
  COMPITEN entre sí. Celebrar solo lo que importa (un veredicto, un sello, un descubrimiento real).
  Antes de añadir otra interacción: «¿hace ENTENDER mejor el experimento?» — no «¿qué más puede tocar?».
