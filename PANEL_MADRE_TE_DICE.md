# Panel «MADRE te dice» — canal visible MADRE → Tony

El panel `#madreHabla` vive dentro del recorrido del Cuaderno. Es el lugar donde MADRE deja solo lo que merece atención humana. Si hay una excepción humana pendiente, el panel se revela aunque la progresión visual todavía lo tuviera oculto.

Además, la franja de señales de la portada muestra `#chipHuman` con el número de excepciones pendientes. Ese botón tiene un objetivo táctil mínimo de 44 px y lleva directamente al panel: una dependencia humana ya no puede quedar enterrada en el recorrido largo del Cuaderno.

## Regla rectora: automático primero

Una sesión no puede depender de que Tony recuerde una skill, relea un chat o descubra una nota.

1. Si la acción se puede automatizar, la hace el agente.
2. Solo se admite una excepción por identidad, banco/dinero, CAPTCHA/2FA, gusto estrictamente personal o una acción física inevitable. Esta última exige dejar evidencia concreta de al menos dos vías agotadas entre API/conector, navegador y script/robot.
3. La excepción no se puede delegar hasta que su tarjeta privada esté publicada y sea legible por el mismo REST que usa el Cuaderno.
4. El cierre debe incluir `PENDIENTE_HUMANO_ID: <id>`; el hook `check_no_delegar.py` verifica el fichero y la fila externa. Una cola local sin tarjeta visible no basta.

El contrato ejecutable vive en:

- `C:/Users/anton/OneDrive/Escritorio/todo/CHAT GPT/Bot/PROYECTO MADRE/APRENDIZAJE_COMPUESTO/pendiente_humano.py`
- `C:/Users/anton/OneDrive/Escritorio/todo/CHAT GPT/Bot/PROYECTO MADRE/.claude/hooks/check_no_delegar.py`
- `C:/Users/anton/.claude/scheduled-tasks/cuaderno-feedback/SKILL.md`

## Qué enseña

- `cambio`: cambios permanentes del sistema.
- `aviso`: acción exclusivamente humana; aparece arriba, reservada en la interfaz del modo creador, con `✓ Lo he visto`.
- `decision`: preferencia/decisión que solo Tony puede tomar; recomendación, límite y auto-decisión si es reversible.
- `trabajo`: trabajo ya ejecutado.
- `conocimiento`: conocimiento evaluado, no solo guardado.
- `metrica`: estado resumido del aprendizaje.

La interfaz pública no enseña el título ni el detalle de `aviso` o `decision`; solo un conteo. Como el navegador descarga las filas desde un REST anónimo, esto **no es privacidad criptográfica** y el contenido nunca puede incluir secretos. El antiguo candado local del modo creador fue retirado: las decisiones privadas solo se muestran en el Centro de mando autenticado.

## Recibo de «Lo he visto»

El botón envía a `public.feedback`:

```text
card: madre_para_tony
tipo: acuse
texto: VISTO #<id-fila> -> <titulo>
```

La interfaz solo marca el acuse local si `window.__fb` devuelve `sent`. Si cae la red, conserva el botón y dice que no quedó confirmado; copiar texto al portapapeles no cuenta. La rutina consume después el UUID y actualiza el aviso a `estado='hecho'`.

Límite honesto: el recibo prueba que **ese navegador en modo creador** pulsó el botón. No demuestra legalmente que fue Tony y nunca autoriza pagos, borrados, publicación irreversible ni uso de credenciales. Añadir login solo se justifica si algún día el acuse pasa a tener consecuencias de seguridad.

## Backend

Proyecto Supabase `kopegamcjozrvmxruwdn`, tabla `public.madre_para_tony`:

`id, tipo, titulo, detalle, recomendacion, opciones, fecha_limite, estado, publico, hidden, aprendido, consecuencia, impacto, accion, sustituye, orden, created_at`.

- `hidden=false` permite la lectura anónima que necesita la web; por eso **no se guardan secretos**.
- `publico=false` controla la presentación en modo creador, no cifra la fila.
- El marcador de deduplicación es `accion='PENDIENTE_HUMANO_ID: <id>'`.
- Las sesiones/rutina escriben con el conector autorizado; el navegador solo lee y deja feedback.

## Flujo de una excepción real

```text
agotar automatización (y documentar las vías si es una acción física)
  → pendiente_humano.py create
  → insertar tipo=aviso y obtener row id
  → pendiente_humano.py surface (verifica REST público)
  → el hook permite PENDIENTE_HUMANO_ID
  → Tony ve la tarjeta y pulsa «Lo he visto»
  → cuaderno-feedback consume el acuse
```

La rutina `cuaderno-feedback` drena también recibos locales no publicados como recuperación ante una caída del conector. Ese camino no sustituye la publicación inmediata: mientras la tarjeta no sea legible, el hook no permite cerrar delegando.

## Selector y pruebas

- Selector técnico: crear → publicar → verificar REST → renderizar en 375/1280 px → enviar acuse; una caída de envío no puede fingir éxito.
- Selector externo: el primer caso humano real debe producir un acuse o seguir visible; si Tony vuelve a descubrir una dependencia solo por chat, el mecanismo falló.
- Reversión web: `git revert <commit>`.
