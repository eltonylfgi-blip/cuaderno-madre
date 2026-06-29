# Panel «MADRE te dice» — canal MADRE → Tony (cómo mantenerlo VIVO)

> Añadido v0.15 (2026-06-29). El panel `#madreHabla` ya está en `index.html` y DESPLEGADO.
> Esto documenta cómo se ALIMENTA (para que la rutina `cuaderno-feedback` lo complete).

## Qué es
Un panel en la web (tras `#diarioVivo`) donde MADRE le deja cosas a Tony en el sitio que más mira:
- **avances** (públicos): lo que MADRE acaba de hacer.
- **oportunidades** (públicas): negocio absorbido de los vídeos.
- **decisiones** que requieren a Tony: SOLO visibles en «modo creador» (`localStorage cuaderno_madre_tony==="1"`);
  a los visitantes solo se les dice cuántas hay. Cada una con **recomendación + fecha límite + auto-decide**.

## Backend (Supabase, proyecto kopegamcjozrvmxruwdn)
Tabla `public.madre_para_tony` (creada por migración `create_madre_para_tony`). Columnas:
`id, tipo('avance'|'decision'|'oportunidad'), titulo, detalle, recomendacion, opciones, fecha_limite(date),
estado('pendiente'|'decidido_tony'|'decidido_auto'|'hecho'|'info'), publico(bool), hidden(bool), created_at`.
- **RLS:** anon SOLO lee filas `hidden=false`. Escribe SOLO `service_role` (la rutina). `publico=false` = oculto
  en la UI (modo creador), **NO cifrado** → NADA SECRETO aquí (lo secreto sigue en el BUZÓN de MADRE).
- El cliente lee con la clave publishable (`window.__sb`) y se suscribe al canal realtime `mpt-rt`.

## LO QUE FALTA — que la rutina `cuaderno-feedback` lo mantenga (3 pasos, usa service_role)
La rutina ya mantiene `PENDIENTE_TONY.md` y tiene credenciales service_role. Añadir a su SKILL un paso:

1. **ALIMENTAR (cada pasada):** por cada decisión nueva de `PENDIENTE_TONY.md` (y avances/oportunidades nuevos
   que decida mostrar), `upsert` a `madre_para_tony` (dedup por un hash del título). Ejemplo:
   ```sql
   insert into public.madre_para_tony (tipo,titulo,detalle,recomendacion,opciones,fecha_limite,estado,publico)
   values ('decision', '<titulo>', '<detalle>', '<recomendacion>', 'A) ... · B) ...', '<YYYY-MM-DD>', 'pendiente', false);
   ```
   (Las decisiones con estrategia/secreto NO van aquí: se quedan en el buzón. Aquí solo lo que da igual o conviene ver.)

2. **RECOGER la respuesta de Tony:** cuando llega un feedback con texto `DECISION #<id> -> elijo: <opción>`
   (lo manda el botón del panel vía `window.__fb`), marcar esa fila `estado='decidido_tony'` (y registrar la opción),
   y aplicar/archivar la decisión como corresponda.

3. **AUTO-DECIDIR si Tony no responde (regla anti-bloqueo de Tony, CLAUDE.md 1e):** las filas `estado='pendiente'`
   cuyo `fecha_limite < hoy` → ponerlas `estado='decidido_auto'`, ELEGIR la opción de `recomendacion` (solo si es
   REVERSIBLE), aplicarla, y avisar a Tony (el panel ya muestra «🤖 lo decidí yo sola»). NUNCA auto-decidir algo
   catastrófico-irreversible: eso espera a Tony sí o sí.

## Verificación hecha (2026-06-29)
Navegador local: vista pública (2 avances + 2 oport + candado) y vista creador (3 decisiones, 1 ✅, 2 con fecha
límite + botones; deadline «2 de julio»), 0 errores de consola. Web viva sirve `v0.15` con `#madreHabla`.

## Revertir todo
`git revert` del commit v0.15 (quita el panel) + `drop table public.madre_para_tony` (quita el backend).
