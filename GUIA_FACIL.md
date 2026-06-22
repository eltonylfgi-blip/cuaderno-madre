# GUÍA FÁCIL — el Cuaderno y MADRE, en cristiano

> Doc para Tony (y para cualquiera). Aquí se explican **dos cosas distintas, separadas a propósito**
> para no liarlas (era el lío del "punto 12"):
> 1. **EL CUADERNO** = la **web** (lo que se ve y se toca). Es la *ventana*.
> 2. **MADRE** = el **sistema** que hay detrás (lo que la web cuenta). Es lo que *se mira por la ventana*.
>
> Regla para escribir aquí: **de la abuela al borracho.** Si una abuela cansada o alguien con dos copas
> no lo entiende a la primera, está mal escrito. Frases cortas. Cero jerga.

---

## 🌐 1) EL CUADERNO (la web) — qué es y lo mejor que tiene

**Qué es:** una página viva en internet (https://eltonylfgi-blip.github.io/cuaderno-madre/) que **cuenta qué
es MADRE y deja jugar**. No es un manual: es una criatura que se toca, suena, dibuja y responde.

**Lo mejor del Cuaderno (sus mejores funciones), hoy:**
- **🧭 Ruta guiada** (abajo izquierda): te lleva de la mano en ~10 segundos. Al entrar **te llama** (palpita).
- **🎨 Zona de dibujo con plantillas traviesas:** una pizarra; pulsas «🎭 Plantillas» y te sale una figura
  tenue para **calcar y gamberrear** (gato, cohete, cara troll…). Tu dibujo queda en la galería.
- **🤲 Texturas ASMR entre los paneles:** tiras que, si las **rozas con el ratón**, suenan según vayas más
  rápido o más lento; y cositas que **revientan o crujen** al clicar. Cada recarga cambian las texturas.
- **💗 Marcar lo que te gusta:** dejas un corazón fijo en una zona; al pasar el ratón sale tu nota.
- **🤔 "No lo entiendo":** en cada tarjeta. Puedes **señalar la parte exacta** que no pillas, o seguir.
- **🤪 Modo caótico:** flechas clickbait, círculos dibujados rodeando cosas reales, datos random, retos
  ("dale un beso a tu abuela") y citas. Todo apagable.
- **💬 Comentarios públicos** (en vivo, en burbujas) y **👁️ "El cuaderno por dentro"** (lo más votado + actividad).
- **✦ Menú de botones** (abajo derecha): junta las herramientas en un sitio.

**El secreto técnico (esto es lo de "puedo ponerle HTML y CSS"):** el Cuaderno **entero es UN solo archivo**,
`index.html`, con su HTML + CSS + JavaScript dentro. Eso quiere decir que **se puede cambiar absolutamente
todo** (colores, textos, secciones, añadir cosas nuevas) editando ese único archivo. Y para **clonar webs
personalizadas** (una para la abuela, otra de fiesta…) se copia el `index.html` y se tocan solo 2 capas:
**TEMA** (colores/mascota/textos) y **PERFIL** (qué widgets van encendidos). Receta en `DISEÑO_HEURISTICAS.md` §4.

**Dónde se documenta el Cuaderno (cada doc tiene UN propósito):**
- `CONTINUAR_AQUI.md` — por dónde retomar (léelo primero).
- `DESARROLLO_CUADERNO.md` — checklist + lecciones/errores + backlog (lo técnico del día a día).
- `DISEÑO_HEURISTICAS.md` — **cómo diseñar** ("abuela↔borracho") + cómo clonar webs.
- `NOTAS_DISENO.md` — variedad visual. `MADRE_UI_REFERENCIAS.md` — componentes de UI favoritos.
- `CHANGELOG.md` — qué cambió y cuándo (arriba, el **resumen de versiones**).
- **Este `GUIA_FACIL.md`** — explicación en simple (lo que estás leyendo).

---

## 🤱🏻 2) MADRE (el sistema) — qué es, en simple

**Qué es, de una frase:** un sistema que intenta **lograr cosas reales por su cuenta y equivocarse menos**,
midiéndose por lo que pasa **fuera** (euros, clientes, estrellas), no por lo que cree de sí mismo.

**Para la abuela:** imagina alguien muy listo que, en vez de presumir de lo que sabe, **sale a la calle a
ver si lo suyo sirve de verdad** y corrige rápido cuando falla. Eso es MADRE.

**Sus 3 ideas clave (sin jerga):**
1. **Ciclo cerrado:** idea → hacerla → **ver qué dice el mundo** → corregir. Si no sale al mundo, no cuenta.
2. **Selector externo:** que **algo de fuera** (un comprador, las estrellas de GitHub) juzgue su trabajo;
   no se puede hacer trampa a uno mismo.
3. **No arruinarse:** una sola ruina lo borra todo, así que evita jugadas que puedan hundirlo.

**Por dónde van los avances (a día de hoy, sin adornos):** MADRE tiene **mucho construido** (sistemas,
criterio, herramientas) pero **aún poco resultado externo** — por eso su "termómetro" está bajo. El cuello
no es tener más ideas: es **sacarlas al mundo y que alguien de fuera las valide**. El Cuaderno es justo un
intento de eso: una cosa real, pública, que la gente usa.

> **OJO, la separación importa:** el **Cuaderno no es MADRE**. El Cuaderno es una web (un activo) que MADRE
> (o nosotros) hemos creado para explicarse y para tener contacto con el mundo. Las reglas y el "cerebro" de
> MADRE **no viven aquí**: viven en el sistema MADRE (carpeta `SISTEMA/` del proyecto raíz y su bucle). En
> este repo solo vive **la web**.

---

## ✍️ Cómo se sigue mejorando (el bucle de "aprender y reutilizar")
- La web **recoge dónde se pierde la gente** (botones 🤔 "no entiendo", y ahora "señala la parte").
- Cada sesión **lee lo aprendido** (`DISEÑO_HEURISTICAS.md`) antes de tocar → cada vez sale mejor.
- Lo aprendido se **acumula** en los docs; no se reescribe el cerebro de MADRE desde aquí.
