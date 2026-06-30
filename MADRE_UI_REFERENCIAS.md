# MADRE_UI_REFERENCIAS — biblioteca de componentes que le gustan a Tony

Este es el sitio donde **guardamos los favoritos de UI** (sobre todo de [uiverse.io](https://uiverse.io)).
No puedes "vincular" tu cuenta de Uiverse directamente, así que el flujo es:

> **Tú me pasas el componente y yo lo guardo aquí**, con: tier, por qué te gusta y dónde lo usaríamos.

### ¿Te lo paso en CSS o en HTML?
**Lo ideal es los DOS juntos** (un componente de Uiverse = un bloque HTML + su bloque CSS; sin el CSS
no se ve). En Uiverse, en cada componente hay pestañas **HTML** y **CSS** → cópiame las dos.
Si te da pereza: **pásame solo el enlace** del componente y yo saco HTML+CSS. Con el HTML solo puedo
guardar la estructura, pero necesito el CSS para que funcione de verdad.

**Formato cómodo para pasarme uno nuevo** (pégalo tal cual en el chat):
```
NUEVO COMPONENTE
nombre/autor: (o link de uiverse)
me gusta porque: ...
lo usaría en: ...
HTML: <...>
CSS: ...
```

### Vía automática (rutina `cuaderno-ui-refs`, 1×/semana)
Hay una **zona de drop** en el repo: **`UI_REFS_INBOX.txt`** (append-only, estilo `VIDEO_NUEVOS.txt`).
Pega ahí los enlaces de Uiverse (uno por línea) cuando quieras; la rutina la **drena cada pasada**,
intenta sacar HTML+CSS sola (Nimble → WebFetch) y añade el componente AQUÍ con su ficha. Solo edita
este doc (nunca `index.html`). Si la extracción falla, deja la ficha marcada **⚠️ NECESITA CÓDIGO
MANUAL** y tú vuelves a pegar el enlace en el inbox seguido de las 2 pestañas así:
```
URL: https://uiverse.io/autor/slug
--HTML--
<div ...>...</div>
--CSS--
.x{...}
--END--
```
La rutina detecta ese bloque y **rellena la ficha** con tu código. (Detalle en el `SKILL.md` de la rutina.)

---

## Tu gusto visual (lo que tienen en común tus favoritos)
No te van las animaciones "bonitas" decorativas. Te van las que parecen **juguetes / cacharros /
artefactos**: cosas que **reaccionan** y que están **vivas aunque no hagas nada**. Regla de oro para
elegir: *"¿esto parece un objeto físico con el que se puede juguetear?"* → si sí, encaja con MADRE.

## Regla de móvil (importante)
El problema en móvil no es UNA animación, son 20 a la vez (partículas + blur + glow + sombras +
seguimiento de ratón). **En móvil reducimos ~70% las partículas y efectos continuos, manteniendo el
comportamiento.** (Ya aplicado al modo caótico.) Antes de meter un componente nuevo y pesado: probarlo
en móvil y, si hace falta, recortar partículas/efectos continuos.

---

## Componentes guardados (los que me pasaste el 2026-06-21)

Tier según encaje con MADRE: **S = lo usaría ya · A = bonito, para más adelante.**

### 🐹 Hamster en rueda — *Uiverse / Nawsome* · **S-TIER**
- **Qué es:** un hámster naranja corriendo dentro de una rueda metálica, en bucle (un "cargando" con forma de bicho).
- **Por qué encaja:** parece un cacharro vivo. No como loader genérico.
- **Cómo funciona (idea reutilizable):** el bicho se anima por PARTES — cabeza, orejas, patas y cola llevan cada una su `@keyframes` en bucle sincronizado con una variable `--dur`, cada parte con su `transform-origin`; la rueda gira con `spoke` rotando `-1turn`. Idea = "animar un personaje troceándolo en piezas con keyframes desfasados, no como un bloque".
- **Dónde usarlo:** **"MADRE pensando / trabajando"** cuando una tarea tarde (en vez de un spinner).
- **Fuente:** https://uiverse.io/Nawsome/wet-mayfly-23
- **Estado:** ✅ completo (HTML + CSS). *(CSS extraído por la rutina/Nimble el 2026-06-22.)*
```html
<div aria-label="Orange and tan hamster running in a metal wheel" role="img" class="wheel-and-hamster">
  <div class="wheel"></div>
  <div class="hamster"><div class="hamster__body">
    <div class="hamster__head"><div class="hamster__ear"></div><div class="hamster__eye"></div><div class="hamster__nose"></div></div>
    <div class="hamster__limb hamster__limb--fr"></div><div class="hamster__limb hamster__limb--fl"></div>
    <div class="hamster__limb hamster__limb--br"></div><div class="hamster__limb hamster__limb--bl"></div>
    <div class="hamster__tail"></div>
  </div></div>
  <div class="spoke"></div>
</div>
```
```css
.wheel-and-hamster {
  --dur: 1s;
  position: relative;
  width: 12em;
  height: 12em;
  font-size: 14px;
}
.wheel, .hamster, .hamster div, .spoke { position: absolute; }
.wheel, .spoke { border-radius: 50%; top: 0; left: 0; width: 100%; height: 100%; }
.wheel { background: radial-gradient(100% 100% at center,hsla(0,0%,60%,0) 47.8%,hsl(0,0%,60%) 48%); z-index: 2; }
.hamster {
  animation: hamster var(--dur) ease-in-out infinite;
  top: 50%; left: calc(50% - 3.5em);
  width: 7em; height: 3.75em;
  transform: rotate(4deg) translate(-0.8em,1.85em);
  transform-origin: 50% 0; z-index: 1;
}
.hamster__head {
  animation: hamsterHead var(--dur) ease-in-out infinite;
  background: hsl(30,90%,55%);
  border-radius: 70% 30% 0 100% / 40% 25% 25% 60%;
  box-shadow: 0 -0.25em 0 hsl(30,90%,80%) inset, 0.75em -1.55em 0 hsl(30,90%,90%) inset;
  top: 0; left: -2em; width: 2.75em; height: 2.5em;
  transform-origin: 100% 50%;
}
.hamster__ear {
  animation: hamsterEar var(--dur) ease-in-out infinite;
  background: hsl(0,90%,85%); border-radius: 50%;
  box-shadow: -0.25em 0 hsl(30,90%,55%) inset;
  top: -0.25em; right: -0.25em; width: 0.75em; height: 0.75em;
  transform-origin: 50% 75%;
}
.hamster__eye {
  animation: hamsterEye var(--dur) linear infinite;
  background-color: hsl(0,0%,0%); border-radius: 50%;
  top: 0.375em; left: 1.25em; width: 0.5em; height: 0.5em;
}
.hamster__nose {
  background: hsl(0,90%,75%);
  border-radius: 35% 65% 85% 15% / 70% 50% 50% 30%;
  top: 0.75em; left: 0; width: 0.2em; height: 0.25em;
}
.hamster__body {
  animation: hamsterBody var(--dur) ease-in-out infinite;
  background: hsl(30,90%,90%);
  border-radius: 50% 30% 50% 30% / 15% 60% 40% 40%;
  box-shadow: 0.1em 0.75em 0 hsl(30,90%,55%) inset, 0.15em -0.5em 0 hsl(30,90%,80%) inset;
  top: 0.25em; left: 2em; width: 4.5em; height: 3em;
  transform-origin: 17% 50%; transform-style: preserve-3d;
}
.hamster__limb--fr, .hamster__limb--fl {
  clip-path: polygon(0 0,100% 0,70% 80%,60% 100%,0% 100%,40% 80%);
  top: 2em; left: 0.5em; width: 1em; height: 1.5em;
  transform-origin: 50% 0;
}
.hamster__limb--fr {
  animation: hamsterFRLimb var(--dur) linear infinite;
  background: linear-gradient(hsl(30,90%,80%) 80%,hsl(0,90%,75%) 80%);
  transform: rotate(15deg) translateZ(-1px);
}
.hamster__limb--fl {
  animation: hamsterFLLimb var(--dur) linear infinite;
  background: linear-gradient(hsl(30,90%,90%) 80%,hsl(0,90%,85%) 80%);
  transform: rotate(15deg);
}
.hamster__limb--br, .hamster__limb--bl {
  border-radius: 0.75em 0.75em 0 0;
  clip-path: polygon(0 0,100% 0,100% 30%,70% 90%,70% 100%,30% 100%,40% 90%,0% 30%);
  top: 1em; left: 2.8em; width: 1.5em; height: 2.5em;
  transform-origin: 50% 30%;
}
.hamster__limb--br {
  animation: hamsterBRLimb var(--dur) linear infinite;
  background: linear-gradient(hsl(30,90%,80%) 90%,hsl(0,90%,75%) 90%);
  transform: rotate(-25deg) translateZ(-1px);
}
.hamster__limb--bl {
  animation: hamsterBLLimb var(--dur) linear infinite;
  background: linear-gradient(hsl(30,90%,90%) 90%,hsl(0,90%,85%) 90%);
  transform: rotate(-25deg);
}
.hamster__tail {
  animation: hamsterTail var(--dur) linear infinite;
  background: hsl(0,90%,85%);
  border-radius: 0.25em 50% 50% 0.25em;
  box-shadow: 0 -0.2em 0 hsl(0,90%,75%) inset;
  top: 1.5em; right: -0.5em; width: 1em; height: 0.5em;
  transform: rotate(30deg) translateZ(-1px);
  transform-origin: 0.25em 0.25em;
}
.spoke {
  animation: spoke var(--dur) linear infinite;
  background: radial-gradient(100% 100% at center,hsl(0,0%,60%) 4.8%,hsla(0,0%,60%,0) 5%),
    linear-gradient(hsla(0,0%,55%,0) 46.9%,hsl(0,0%,65%) 47% 52.9%,hsla(0,0%,65%,0) 53%) 50% 50% / 99% 99% no-repeat;
}
@keyframes hamster {
  from, to { transform: rotate(4deg) translate(-0.8em,1.85em); }
  50% { transform: rotate(0) translate(-0.8em,1.85em); }
}
@keyframes hamsterHead {
  from, 25%, 50%, 75%, to { transform: rotate(0); }
  12.5%, 37.5%, 62.5%, 87.5% { transform: rotate(8deg); }
}
@keyframes hamsterEye {
  from, 90%, to { transform: scaleY(1); }
  95% { transform: scaleY(0); }
}
@keyframes hamsterEar {
  from, 25%, 50%, 75%, to { transform: rotate(0); }
  12.5%, 37.5%, 62.5%, 87.5% { transform: rotate(12deg); }
}
@keyframes hamsterBody {
  from, 25%, 50%, 75%, to { transform: rotate(0); }
  12.5%, 37.5%, 62.5%, 87.5% { transform: rotate(-2deg); }
}
@keyframes hamsterFRLimb {
  from, 25%, 50%, 75%, to { transform: rotate(50deg) translateZ(-1px); }
  12.5%, 37.5%, 62.5%, 87.5% { transform: rotate(-30deg) translateZ(-1px); }
}
@keyframes hamsterFLLimb {
  from, 25%, 50%, 75%, to { transform: rotate(-30deg); }
  12.5%, 37.5%, 62.5%, 87.5% { transform: rotate(50deg); }
}
@keyframes hamsterBRLimb {
  from, 25%, 50%, 75%, to { transform: rotate(-60deg) translateZ(-1px); }
  12.5%, 37.5%, 62.5%, 87.5% { transform: rotate(20deg) translateZ(-1px); }
}
@keyframes hamsterBLLimb {
  from, 25%, 50%, 75%, to { transform: rotate(20deg); }
  12.5%, 37.5%, 62.5%, 87.5% { transform: rotate(-60deg); }
}
@keyframes hamsterTail {
  from, 25%, 50%, 75%, to { transform: rotate(30deg) translateZ(-1px); }
  12.5%, 37.5%, 62.5%, 87.5% { transform: rotate(10deg) translateZ(-1px); }
}
@keyframes spoke {
  from { transform: rotate(0); }
  to { transform: rotate(-1turn); }
}
```

### 🖱️ Hover tracker "look mom, no JS" — *Uiverse* · **S-TIER**
- **Qué es:** una tarjeta que se inclina en 3D siguiendo al ratón, como si la movieras con la mano (sin JavaScript).
- **Por qué encaja:** da sensación de **objeto físico** (la tarjeta sigue al ratón en 3D, sin JS).
- **Cómo funciona (idea reutilizable):** una rejilla de ~25 zonas invisibles (`.tracker`) cubre la tarjeta; cada zona, con su `:hover`, aplica un `transform: rotateX()/rotateY()` distinto a `#card` (selector hermano) dentro de un contenedor con `perspective`. Idea = "mapear la posición del ratón a inclinación 3D con muchas hot-zones + selectores hermanos, sin JS".
- **Dónde usarlo:** tarjetas/paneles **importantes** o módulos especiales del cuaderno.
- **Estado:** tengo el HTML (los 25 `.tracker` + `#card`); **falta el CSS**.
```html
<div class="container noselect"><div class="canvas">
  <!-- .tracker tr-1 … tr-25 -->
  <div id="card"><p id="prompt">HOVER OVER :D</p>
    <div class="title">look mom,<br>no JS</div>
    <div class="subtitle">mouse hover tracker</div>
  </div>
</div></div>
```

### 🔥 Antorcha (torch) que se enciende — *Uiverse / 00Kubi* · **S-TIER (como easter-egg)**
- **Qué es:** una antorcha de píxeles en 3D que, al hacer clic, se enciende con llama, chispas y humo.
- **Por qué encaja:** cacharro 3D con partículas y humo; muy "artefacto".
- **Cómo funciona (idea reutilizable):** el cubo 3D se monta con caras `position:absolute` rotadas (`rotateX/rotateY` + `translateZ`) bajo `transform-style: preserve-3d`; un `checkbox` oculto enciende, vía `input:checked ~ .torch`, los `@keyframes` de partículas/humo/glow. Idea = "objeto 3D de caras + estado encendido/apagado con checkbox hermano, sin JS".
- **Dónde usarlo:** NO como botón normal → como **"Modo explorador"**: al encenderla, **aparecen
  notas/secretos ocultos** por la página. Eso sí es memorable.
- **Fuente:** https://uiverse.io/00Kubi/quiet-swan-27
- **Estado:** ✅ completo (HTML + CSS). *(CSS extraído por la rutina/Nimble el 2026-06-22 — era esta antorcha la que estaba a medias.)*
```html
<label class="container">
  <div class="simple-text">Click to light</div>
  <input type="checkbox" checked="checked" />
  <div class="checkmark"></div>
  <div class="torch">
    <div class="light-effect"></div><div class="glow-effect"></div>
    <div class="particles"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
    <div class="smoke"><span></span><span></span><span></span><span></span></div>
    <div class="head"><div class="face top"><div></div><div></div><div></div><div></div></div><div class="face left"><div></div><div></div><div></div><div></div></div><div class="face right"><div></div><div></div><div></div><div></div></div></div>
    <div class="stick">
      <div class="side side-left"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      <div class="side side-right"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  </div>
</label>
```
```css
.container input { position: absolute; opacity: 0; cursor: pointer; height: 0; width: 0; }
.container { display: flex; flex-direction: column; align-items: center; position: relative; cursor: pointer; user-select: none; }
.simple-text {
  position: absolute; bottom: -60px; width: 120px; text-align: center;
  color: #ffd700; font-size: 16pt; font-weight: 800; font-family: monospace;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5); transition: all 0.3s ease;
}
.torch { display: flex; justify-content: center; height: 150px; }
.head, .stick {
  position: absolute; width: 30px; transform-style: preserve-3d;
  transform: rotateX(-30deg) rotateY(45deg);
}
.stick { position: relative; height: 120px; }
.face {
  position: absolute; transform-style: preserve-3d; width: 30px; height: 30px;
  display: grid; grid-template-columns: 50% 50%; grid-template-rows: 50% 50%;
  background-color: #000000;
}
.top { transform: rotateX(90deg) translateZ(15px); }
.left { transform: rotateY(-90deg) translateZ(15px); }
.right { transform: rotateY(0deg) translateZ(15px); }
.top div, .left div, .right div { width: 102%; height: 102%; }
.top div:nth-child(1), .left div:nth-child(3), .right div:nth-child(3) { background-color: #ffff97aa; }
.top div:nth-child(2), .left div:nth-child(1), .right div:nth-child(1) { background-color: #ffd800aa; }
.top div:nth-child(3), .left div:nth-child(4), .right div:nth-child(4) { background-color: #ffffffaa; }
.top div:nth-child(4), .left div:nth-child(2), .right div:nth-child(2) { background-color: #ff8f00aa; }
.side {
  position: absolute; width: 30px; height: 120px; display: grid;
  grid-template-columns: 50% 50%; grid-template-rows: repeat(8, 12.5%);
  cursor: pointer; translate: 0 12px;
}
.side-left { transform: rotateY(-90deg) translateZ(15px) translateY(8px); }
.side-right { transform: rotateY(0deg) translateZ(15px) translateY(8px); }
.side-left div, .side-right div { width: 103%; height: 103%; }
.side div:nth-child(1) { background-color: #443622; }
.side div:nth-child(2) { background-color: #2e2517; }
.side div:nth-child(3), .side div:nth-child(5) { background-color: #4b3b23; }
.side div:nth-child(4), .side div:nth-child(10) { background-color: #251e12; }
.side div:nth-child(6) { background-color: #292115; }
.side div:nth-child(7) { background-color: #4b3c26; }
.side div:nth-child(8) { background-color: #292115; }
.side div:nth-child(9) { background-color: #4b3a21; }
.side div:nth-child(11), .side div:nth-child(15) { background-color: #3d311d; }
.side div:nth-child(12) { background-color: #2c2315; }
.side div:nth-child(13) { background-color: #493a22; }
.side div:nth-child(14) { background-color: #2b2114; }
.side div:nth-child(16) { background-color: #271e10; }
.light-effect {
  position: absolute; top: -20px; left: -35px; width: 100px; height: 100px;
  background: radial-gradient(circle at center, rgba(255,223,89,0.9) 0%, rgba(255,183,43,0.4) 30%, transparent 70%);
  filter: blur(8px); opacity: 0; transition: opacity 0.3s ease; pointer-events: none;
}
.particles { position: absolute; top: -10px; left: -20px; width: 70px; height: 70px; pointer-events: none; }
.particles span {
  position: absolute; width: 3px; height: 3px; background: #ffd700; border-radius: 50%;
  opacity: 0; pointer-events: none; box-shadow: 0 0 10px #ffd700; filter: blur(1px);
}
@keyframes particleFloat {
  0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 0; }
  20% { opacity: 1; }
  100% { transform: translate(calc(var(--x) * 20px), calc(var(--y) * -40px)) scale(0) rotate(360deg); opacity: 0; }
}
.particles span:nth-child(1) { --x: 1; --y: 1; }
.particles span:nth-child(2) { --x: -1; --y: 1; }
.particles span:nth-child(3) { --x: 0.5; --y: 1; }
.particles span:nth-child(4) { --x: -0.5; --y: 1; }
.particles span:nth-child(5) { --x: 0.7; --y: 1; }
.particles span:nth-child(6) { --x: -0.7; --y: 1; }
.particles span:nth-child(7) { --x: 0.3; --y: 1; }
.particles span:nth-child(8) { --x: -0.3; --y: 1; }
.container input:checked ~ .torch .light-effect { opacity: 1; animation: flicker 4s infinite; }
.container input:checked ~ .torch .particles span { animation: particleFloat 2s infinite; }
.container input:checked ~ .torch .particles span:nth-child(1) { animation-delay: 0s; }
.container input:checked ~ .torch .particles span:nth-child(2) { animation-delay: 0.2s; }
.container input:checked ~ .torch .particles span:nth-child(3) { animation-delay: 0.4s; }
.container input:checked ~ .torch .particles span:nth-child(4) { animation-delay: 0.6s; }
.container input:checked ~ .torch .particles span:nth-child(5) { animation-delay: 0.8s; }
.container input:checked ~ .torch .particles span:nth-child(6) { animation-delay: 1s; }
.container input:checked ~ .torch .particles span:nth-child(7) { animation-delay: 1.2s; }
.container input:checked ~ .torch .particles span:nth-child(8) { animation-delay: 1.4s; }
@keyframes flicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
  25%, 75% { opacity: 0.9; }
}
.container:hover .torch { transform: scale(1.05) rotate(2deg); transition: all 0.3s ease; }
.container:hover .simple-text {
  transform: scale(1.1);
  text-shadow: 0 0 15px rgba(255,215,0,0.7), 0 0 30px rgba(255,215,0,0.4);
  letter-spacing: 2px;
}
.container input:checked ~ .torch .face {
  filter: drop-shadow(0px 0px 8px rgb(255,255,255)) drop-shadow(0px 0px 20px rgba(255,237,156,0.8)) drop-shadow(0px 0px 40px rgba(255,227,101,0.5));
  transition: filter 0.3s ease;
}
.container input:checked ~ .torch .side { filter: brightness(1.3); transition: filter 0.3s ease; }
.glow-effect {
  position: absolute; top: -30px; left: -45px; width: 120px; height: 120px;
  background: radial-gradient(circle at center, rgba(255,160,0,0.4) 0%, rgba(255,120,0,0.2) 30%, transparent 70%);
  filter: blur(15px); opacity: 0; transition: opacity 0.3s ease; pointer-events: none;
  animation: glowPulse 3s infinite;
}
.smoke { position: absolute; top: -20px; left: -10px; width: 50px; height: 50px; pointer-events: none; }
.smoke span {
  position: absolute; width: 4px; height: 4px; background: rgba(255,255,255,0.3);
  border-radius: 50%; filter: blur(2px); opacity: 0; pointer-events: none;
}
@keyframes glowPulse {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.1); opacity: 0.5; }
}
@keyframes smokeRise {
  0% { transform: translate(0, 0) scale(1); opacity: 0; }
  20% { opacity: 0.5; }
  100% { transform: translate(calc(var(--x) * 30px), calc(var(--y) * -60px)) scale(3); opacity: 0; }
}
.smoke span:nth-child(1) { --x: 0.5; --y: 1; }
.smoke span:nth-child(2) { --x: -0.5; --y: 1; }
.smoke span:nth-child(3) { --x: 0.2; --y: 1; }
.smoke span:nth-child(4) { --x: -0.2; --y: 1; }
.container input:checked ~ .torch .smoke span { animation: smokeRise 3s infinite; }
.container input:checked ~ .torch .smoke span:nth-child(1) { animation-delay: 0s; }
.container input:checked ~ .torch .smoke span:nth-child(2) { animation-delay: 0.8s; }
.container input:checked ~ .torch .smoke span:nth-child(3) { animation-delay: 1.6s; }
.container input:checked ~ .torch .smoke span:nth-child(4) { animation-delay: 2.4s; }
.container input:checked ~ .torch .glow-effect { opacity: 1; }
.face div { transition: all 0.3s ease; }
.side div { transition: all 0.3s ease; }
.container input:checked ~ .torch .side div { filter: brightness(1.3); box-shadow: inset 0 0 5px rgba(255,183,43,0.2); }
```

### ✨ Spotlight card (borde con punto que orbita) — *Uiverse / Spacious74* · **A-TIER**
- **Qué es:** una tarjeta oscura con un puntito de luz que da vueltas por el borde, como un marco "tech" vivo.
- **Por qué encaja:** borde "tech" con un punto de luz que recorre el marco; queda muy vivo.
- **Cómo funciona (idea reutilizable):** el punto recorre el marco con un `@keyframes moveDot` que cambia `top`/`right` pasando por las 4 esquinas, sobre un fondo `radial-gradient`; el "rayo" es un div borroso (`filter: blur`) girado que simula luz. Idea = "un punto que viaja por el borde animando su posición esquina a esquina".
- **Dónde usarlo:** enmarcar una tarjeta destacada (p.ej. la nota o el panel de visitas).
- **Estado:** **tengo el CSS completo** (debajo); falta el HTML (`.outer > .dot + .card(.ray/.line…)`).
```css
.outer{width:300px;height:250px;border-radius:10px;padding:1px;background:radial-gradient(circle 230px at 0% 0%,#ffffff,#0c0d0d);position:relative}
.dot{width:5px;aspect-ratio:1;position:absolute;background-color:#fff;box-shadow:0 0 10px #fff;border-radius:100px;z-index:2;right:10%;top:10%;animation:moveDot 6s linear infinite}
@keyframes moveDot{0%,100%{top:10%;right:10%}25%{top:10%;right:calc(100% - 35px)}50%{top:calc(100% - 30px);right:calc(100% - 35px)}75%{top:calc(100% - 30px);right:10%}}
.card{z-index:1;width:100%;height:100%;border-radius:9px;border:solid 1px #202222;background:radial-gradient(circle 280px at 0% 0%,#444,#0c0d0d);display:flex;align-items:center;justify-content:center;position:relative;flex-direction:column;color:#fff}
.ray{width:220px;height:45px;border-radius:100px;position:absolute;background-color:#c7c7c7;opacity:.4;box-shadow:0 0 50px #fff;filter:blur(10px);transform-origin:10%;top:0;left:0;transform:rotate(40deg)}
.line{width:100%;height:1px;position:absolute;background-color:#2c2c2c}
.topl{top:10%;background:linear-gradient(90deg,#888 30%,#1d1f1f 70%)}.bottoml{bottom:10%}
.leftl{left:10%;width:1px;height:100%;background:linear-gradient(180deg,#747474 30%,#222424 70%)}.rightl{right:10%;width:1px;height:100%}
```

### 🔎 Buscador neón (#poda) — *Uiverse* · **A-TIER**
- **Qué es:** una barra de búsqueda futurista con bordes de neón que brillan y se animan.
- **Por qué encaja:** input futurista con glow/bordes animados; muy "cacharro".
- **Dónde usarlo:** si algún día hay buscador (de comentarios / dibujos / ideas).
- **Estado:** tengo el HTML (`#poda` con input + filter-icon + search-icon SVG); **falta el CSS**.

### 🌗 Switch día/noche (sol-luna con nubes y estrellas) — *Uiverse* · **A-TIER**
- **Qué es:** un interruptor que pasa de día a noche (sol→luna, con nubes y estrellas) al pulsarlo.
- **Por qué encaja:** bonito, pero **es decoración** (no cambia comportamiento). Para el final.
- **Dónde usarlo:** toggle de tema claro/oscuro, cuando toque.
- **Estado:** tengo el HTML completo (sun-moon + clouds + stars); **falta el CSS**.

### 🫧 Blob card — *Uiverse / dylanharriscameron* · **A-TIER (bajo)**
- **Qué es:** una tarjeta con una mancha de color (blob) que se mueve suave por detrás.
- **Por qué encaja:** queda bien pero aporta poco; hay cosas mejores antes.
```html
<div class="card"><div class="bg"></div><div class="blob"></div></div>
```

### 🔴 Botón 3D pulsable (se hunde al tocar) — *Uiverse / cssbuttons-io* · **S-TIER**
- **Qué es:** un botón rojo con relieve que se hunde al pulsarlo y rebota, como una tecla de verdad.
- **Por qué encaja:** parece un botón físico real (capas sombra/canto/cara) que **se hunde** al pulsar y rebota; pura afford táctil, no un botón plano. Tony ya pidió "botones pulsables".
- **Cómo funciona (idea reutilizable):** tres capas apiladas (`.shadow`, `.edge`, `.front`); la cara sube con `translateY(-4px)` y al `:active` baja a `-2px` con una transición de solo 34 ms (hundido instantáneo) mientras la sombra acompaña al soltar (transición lenta). Idea = "profundidad falsa con capas desplazadas en Y + transición asimétrica: rápida al pulsar, lenta al soltar".
- **Dónde usarlo:** la **acción principal** del cuaderno (CTA: "opina", "deja un dibujo", "enciende"). Ideal en móvil porque el toque se siente. Ligero (sin partículas) → seguro en móvil.
- **Fuente:** https://uiverse.io/cssbuttons-io/evil-monkey-41
- **Estado:** ✅ completo (HTML + CSS). *(auto-extraído por la rutina/Nimble el 2026-06-22.)*
```html
<button>
  <span class="shadow"></span>
  <span class="edge"></span>
  <span class="front text"> Click me </span>
</button>
```
```css
button {
  position: relative; border: none; background: transparent; padding: 0;
  cursor: pointer; outline-offset: 4px; transition: filter 250ms;
  user-select: none; touch-action: manipulation;
}
.shadow {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  border-radius: 12px; background: hsl(0deg 0% 0% / 0.25); will-change: transform;
  transform: translateY(2px); transition: transform 600ms cubic-bezier(.3, .7, .4, 1);
}
.edge {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 12px;
  background: linear-gradient(to left, hsl(340deg 100% 16%) 0%, hsl(340deg 100% 32%) 8%, hsl(340deg 100% 32%) 92%, hsl(340deg 100% 16%) 100%);
}
.front {
  display: block; position: relative; padding: 12px 27px; border-radius: 12px;
  font-size: 1.1rem; color: white; background: hsl(345deg 100% 47%); will-change: transform;
  transform: translateY(-4px); transition: transform 600ms cubic-bezier(.3, .7, .4, 1);
}
button:hover { filter: brightness(110%); }
button:hover .front { transform: translateY(-6px); transition: transform 250ms cubic-bezier(.3, .7, .4, 1.5); }
button:active .front { transform: translateY(-2px); transition: transform 34ms; }
button:hover .shadow { transform: translateY(4px); transition: transform 250ms cubic-bezier(.3, .7, .4, 1.5); }
button:active .shadow { transform: translateY(1px); transition: transform 34ms; }
button:focus:not(:focus-visible) { outline: none; }
```


### 🗺️ Tarjeta-mapa que aparece al pasar — *Uiverse / Amine-maker* · **S-TIER**
- **Qué es:** pasas el ratón por la palabra "Paris" y emerge una mini-tarjeta de mapa con nubes que se desplazan y un pin de ubicación que late.
- **Por qué encaja:** la tarjeta está VIVA (nubes a la deriva + pin latiendo) y se materializa al pasar el ratón; muy "artefacto".
- **Cómo funciona (idea reutilizable):** la tarjeta va de `scale(0)` a `scale(1)` con un `cubic-bezier` con rebote, disparada por `:has(.hover-card:hover)` en el padre; las nubes son divs con `@keyframes` de `translateX` infinito y el pin un `@keyframes pulse` (escala + box-shadow expansivo). Idea = "objeto que se materializa al hover + micro-vida en bucle".
- **Dónde usarlo:** previsualización al pasar sobre un nombre/enlace (un lugar, o una rama del mapa del cuaderno). OJO móvil: 4 nubes + pin en bucle = varias animaciones continuas, recortar.
- **Fuente:** https://uiverse.io/Amine-maker/tasty-panda-0
- **Estado:** ✅ completo (HTML + CSS). *(auto-extraído 2026-06-30.)*
```html
<div id="app">
  <div class="reference relative">
    <p class="main-title">
      Location
      <span style="font-style: italic; color: #226630" class="hover-card"
        >Paris</span
      >, France
    </p>
    <div class="card absolute hidden">
      <div class="cloud"></div>
      <div class="cloud"></div>
      <div class="cloud"></div>
      <div class="cloud"></div>
      <div class="relative inner-card">
        <div class="bg-map"></div>
        <div class="location absolute"></div>
        <div class="elements">
          <div class="description relative">
            <div class="blur-item absolute"></div>
            <span class="main-title">Paris</span>
            <p class="second-title">France</p>
          </div>
          <div class="details">
            <div class="peoples">
              <div class="people"></div>
              <div class="people"></div>
              <div class="people"></div>
            </div>
            <div class="action"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```
```css
#app {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  top: -100px;
  left: 15%;
  transition: transform 0.3s cubic-bezier(0.74, -0.03, 0.05, 1.24);
  width: 160px;
  height: 95px;
  will-change: transform;
  transform-origin: 50% 100%;
  transform: scale(0);
  filter: blur(10px);
  background: white;
  border-radius: 18px;
  box-shadow:
    0 0 0 2px #b0dbbf,
    1px 4px 5px 4px #ededed54;
  padding: 2px;
  animation-duration: 0.3s;
  animation-delay: 0.1s;
  animation-fill-mode: both;
  overflow: hidden;
}

#app:has(.hover-card:hover) > .reference > .card {
  transform: scale(1);
  animation-name: coolfadeIn;
}

.card:hover {
  pointer-events: all;
}

.bg-map {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 0;
  /* background-image: place your image */
  background-position: 15px -32px;
  background-repeat: no-repeat;
  background-size: cover;
}

.elements {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.details {
  z-index: 1;
  margin-bottom: -10%;
  margin-top: -12%;
  flex: 1 1 0;
  background: #daecdd;
  filter: blur(6px);
}
.description {
  padding: 15px;
  z-index: 1;
}

.main-title {
  font-size: 1.2rem;
  color: #4e8e5b;
  font-weight: 600;
}

.second-title {
  font-size: 0.9em;
  color: #5e836b;
  font-weight: 500;
}

.inner-card {
  position: relative;
  border-radius: calc(18px - 2%);
  height: 100%;
  width: 100%;
  border: 2px solid #2d2d2d45;
  background: #daecdd;
  overflow: hidden;
}

.blur-item {
  left: 0;
  top: 0;
  min-width: 60px;
  filter: blur(10px);
  background: #daecdd;
  z-index: -1;
  height: 110%;
}

.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.location {
  background-color: #226630;
  top: 24%;
  z-index: 1000;
  left: 60%;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  box-shadow: 0 0 10px 7px #c1c1c180;
  border: 5px solid white;
  animation: pulse 3s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow:
      0 0 0 0 rgba(72, 72, 72, 0.7),
      0 0 8px 5px #d9d9d980;
  }

  70% {
    transform: scale(1);
    box-shadow:
      0 0 0 10px rgba(72, 72, 72, 0),
      0 0 8px 5px #d9d9d980;
  }

  100% {
    transform: scale(0.95);
    box-shadow:
      0 0 0 0 rgba(72, 72, 72, 0),
      0 0 8px 5px #d9d9d980;
  }
}

@keyframes coolfadeIn {
  0% {
    filter: brightness(1) blur(10px);
  }

  10% {
    filter: brightness(1) blur(20px);
  }

  100% {
    filter: brightness(1) blur(0px);
  }
}

@keyframes movingClouds {
  from {
    transform: translateX(-100px);
  }
  to {
    transform: translateX(100px);
  }
}

.cloud {
  z-index: 1;
  position: absolute;
  border-radius: 50%;
  animation-name: movingClouds;
  animation-timing-function: ease;
  animation-iteration-count: infinite;
}

.cloud:nth-child(1) {
  animation-duration: 45s;
  height: 1em;
  width: 1.4em;
  top: 3.5em;
  left: 50%;
  filter: blur(0.125em) drop-shadow(0.438em 0.188em #ffffffae)
    drop-shadow(-0.625em 0.313em #ffffffae);
  background: linear-gradient(to top right, #ffffffae, #ffffffae);
  transition: 0.4s;
}

.cloud:nth-child(2) {
  animation-duration: 30s;
  top: 0.325em;
  right: -1em;
  width: 4.075em;
  height: 1.575em;
  background: #ebebebdb;
  filter: blur(0.425em) drop-shadow(-0.313em 0.812em #e0dfdfae)
    drop-shadow(-1.625em 0.812em #bbbbbbae) drop-shadow(-1em 0.063em #cfcfcfae);
}

.cloud:nth-child(3) {
  animation-duration: 60s;
  top: 2.45em;
  right: 4.938em;
  width: 1.075em;
  height: 0.575em;
  background: #ffffff;
  filter: blur(0.125em) drop-shadow(0.438em 0.188em #ffffffae)
    drop-shadow(-0.625em 0.313em #ffffffae);
  transition: 0.8s;
}

.cloud:nth-child(4) {
  animation-duration: 40s;
  top: 4.45em;
  right: 4.938em;
  width: 1.075em;
  height: 0.375em;
  background: #ffffff;
  filter: blur(0.125em) drop-shadow(0.438em 0.188em #ffffffae)
    drop-shadow(-0.625em 0.313em #ffffffae);
  transition: 0.8s;
}
```

### 🌙 Cielo nocturno con estrellas y meteoros — *Uiverse / kiranmayee-abbireddy* · **S-TIER**
- **Qué es:** un fondo de noche negro donde las estrellas parpadean en 3 capas, cruzan meteoros con cola y brilla una luna.
- **Por qué encaja:** está vivo aunque no hagas nada (parpadeo + estrellas fugaces en bucle); ambiente "artefacto", ideal para un fondo con alma.
- **Cómo funciona (idea reutilizable):** las estrellas son `radial-gradient` repetidos como `background-image` con `@keyframes twinkle` (opacidad 1↔0.2); los meteoros, divs con cola `::after` (gradiente) y `@keyframes shoot` que los lanza en diagonal rotados; la luna es un círculo con `box-shadow` desplazado (cuarto creciente). Idea = "fondo ambiental en capas con gradientes animados, cero imágenes".
- **Dónde usarlo:** fondo de modo noche / portada / pantalla "MADRE descansa". OJO móvil: 3 capas + 3 meteoros en bucle = pesado, recortar ~70%.
- **Fuente:** https://uiverse.io/kiranmayee-abbireddy/average-insect-70
- **Estado:** ✅ completo (HTML + CSS). *(auto-extraído 2026-06-30.)*
```html
<div class="uiverse-midnight-sky">
  <div class="sky-canvas">
    <div class="stars stars-1"></div>
    <div class="stars stars-2"></div>
    <div class="stars stars-3"></div>

    <div class="meteor m1"></div>
    <div class="meteor m2"></div>
    <div class="meteor m3"></div>

    <div class="moon"></div>
  </div>
</div>
```
```css
.uiverse-midnight-sky {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: 500px;
  overflow: hidden;
  background-color: #050505;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Base Sky Layer */
.uiverse-midnight-sky .sky-canvas {
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  background: #050505;
}

/* Generic star layer style */
.uiverse-midnight-sky .stars {
  position: absolute;
  inset: 0;
  background-repeat: repeat;
  pointer-events: none;
}

/* Layer 1: Small fast twinkling stars - High density */
.uiverse-midnight-sky .stars-1 {
  background-image: radial-gradient(1px 1px at 10% 10%, #fff, transparent),
    radial-gradient(1px 1px at 30% 20%, #fff, transparent),
    radial-gradient(1px 1px at 50% 50%, #fff, transparent),
    radial-gradient(1px 1px at 70% 30%, #fff, transparent),
    radial-gradient(1px 1px at 90% 10%, #fff, transparent);
  background-size: 200px 200px;
  animation: twinkle 3s ease-in-out infinite;
}

/* Layer 2: Medium slower twinkling stars */
.uiverse-midnight-sky .stars-2 {
  background-image: radial-gradient(1.5px 1.5px at 20% 40%, #fff, transparent),
    radial-gradient(1.5px 1.5px at 60% 85%, #fff, transparent),
    radial-gradient(1.5px 1.5px at 85% 65%, #fff, transparent);
  background-size: 300px 300px;
  animation: twinkle 5s ease-in-out infinite 1s;
}

/* Layer 3: Larger, very slow twinkling stars */
.uiverse-midnight-sky .stars-3 {
  background-image: radial-gradient(2px 2px at 40% 70%, #fff, transparent),
    radial-gradient(2px 2px at 10% 80%, #fff, transparent),
    radial-gradient(2px 2px at 80% 40%, #fff, transparent);
  background-size: 400px 400px;
  animation: twinkle 7s ease-in-out infinite 2s;
}

/* Meteor / Shooting Star Layer */
.uiverse-midnight-sky .meteor {
  position: absolute;
  width: 2px;
  height: 2px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.5);
  opacity: 0;
  pointer-events: none;
}

/* Meteor Tail */
.uiverse-midnight-sky .meteor::after {
  content: "";
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 80px;
  height: 1px;
  background: linear-gradient(90deg, #fff, transparent);
}

/* Meteor Instances with staggered starts */
.uiverse-midnight-sky .m1 {
  top: 10%;
  left: 110%;
  animation: shoot 8s linear infinite;
}
.uiverse-midnight-sky .m2 {
  top: 30%;
  left: 110%;
  animation: shoot 12s linear infinite 4s;
}
.uiverse-midnight-sky .m3 {
  top: 50%;
  left: 110%;
  animation: shoot 10s linear infinite 2s;
}

/* The Moon */
.uiverse-midnight-sky .moon {
  position: absolute;
  top: 15%;
  right: 15%;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: transparent;
  box-shadow: 15px 15px 0 0 #fdfbd3;
  filter: drop-shadow(0 0 15px rgba(253, 251, 211, 0.4));
  z-index: 10;
}

/* Twinkle Animation */
@keyframes twinkle {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
}

/* Shooting Star Animation - Using % instead of vw/vh */
@keyframes shoot {
  0% {
    transform: translateX(0) translateY(0) rotate(-35deg);
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  15% {
    transform: translateX(-1500px) translateY(1000px) rotate(-35deg);
    opacity: 0;
  }
  100% {
    transform: translateX(-1500px) translateY(1000px) rotate(-35deg);
    opacity: 0;
  }
}
```

### 📁 Árbol de carpetas al pasar el ratón — *Uiverse / themrsami* · **A-TIER**
- **Qué es:** un botón "Project Structure" con icono de carpeta; al pasar el ratón despliega debajo un árbol de archivos (carpetas y .js).
- **Por qué encaja:** más menú que cacharro, pero el desplegado limpio es útil; reacciona al ratón sin JS.
- **Cómo funciona (idea reutilizable):** el desplegable es un hijo en `opacity-0` que pasa a `opacity-100` cuando el padre `.group` recibe `:hover` (patrón group-hover de Tailwind) + `transition-opacity`. Idea = "revelar contenido al pasar por encima" sin una línea de JS.
- **Dónde usarlo:** un índice/menú que se despliega al pasar el ratón (lista de secciones del cuaderno).
- **Fuente:** https://uiverse.io/themrsami/quick-zebra-71
- **Estado:** ✅ completo (HTML + CSS). *(auto-extraído 2026-06-30.)*
```html
<div class="relative group inline-block">
  <div
    class="bg-white py-2 rounded-md shadow-lg hover:cursor-pointer flex justify-center items-center gap-4 px-4"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 18 14"
      height="25"
      width="25"
    >
      <path
        fill="#FFA000"
        d="M16.2 1.75H8.1L6.3 0H1.8C0.81 0 0 0.7875 0 1.75V12.25C0 13.2125 0.81 14 1.8 14H15.165L18 9.1875V3.5C18 2.5375 17.19 1.75 16.2 1.75Z"
      ></path>
      <path
        fill="#FFCA28"
        d="M16.2 2H1.8C0.81 2 0 2.77143 0 3.71429V12.2857C0 13.2286 0.81 14 1.8 14H16.2C17.19 14 18 13.2286 18 12.2857V3.71429C18 2.77143 17.19 2 16.2 2Z"
      ></path>
    </svg>
    <p>Project Structure</p>
  </div>

  <div
    class="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
  >
    <ul class="p-4 space-y-1">
      <li class="py-1">📁 src</li>
      <li class="pl-4 py-1">📁 app</li>
      <li class="pl-8 py-1">📄 layout.js</li>
      <li class="pl-8 py-1">📄 page.js</li>
      <li class="pl-4 py-1">📁 components</li>
      <li class="pl-8 py-1">📄 header.js</li>
      <li class="pl-8 py-1">📄 footer.js</li>
      <li class="pl-4 py-1">📁 styles</li>
      <li class="pl-8 py-1">📄 globals.css</li>
    </ul>
  </div>
</div>
```
```css
.absolute {
  position: absolute;
}
.relative {
  position: relative;
}
.left-0 {
  left: 0px;
}
.mt-2 {
  margin-top: 0.5rem;
}
.inline-block {
  display: inline-block;
}
.flex {
  display: flex;
}
.w-64 {
  width: 16rem;
}
.items-center {
  align-items: center;
}
.justify-center {
  justify-content: center;
}
.gap-4 {
  gap: 1rem;
}
.space-y-1 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.25rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.25rem * var(--tw-space-y-reverse));
}
.rounded-md {
  border-radius: 0.375rem;
}
.border {
  border-width: 1px;
}
.border-gray-200 {
  --tw-border-opacity: 1;
  border-color: rgb(229 231 235 / var(--tw-border-opacity));
}
.bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}
.p-4 {
  padding: 1rem;
}
.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.pl-4 {
  padding-left: 1rem;
}
.pl-8 {
  padding-left: 2rem;
}
.opacity-0 {
  opacity: 0;
}
.shadow-lg {
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color),
    0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.transition-opacity {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.duration-1000 {
  transition-duration: 1000ms;
}
.hover\\:cursor-pointer:hover {
  cursor: pointer;
}
.group:hover .group-hover\\:opacity-100 {
  opacity: 1;
}
```

### 💬 Tooltip con rebote (resorte) — *Uiverse / Siyu1017* · **A-TIER**
- **Qué es:** un botón morado degradado; al pasar el ratón crece un poco y sale un tooltip con un rebote elástico.
- **Por qué encaja:** el rebote da tacto de resorte, aunque es un tooltip estándar; agradable más que juguete.
- **Cómo funciona (idea reutilizable):** el tooltip parte de `scale(0)` y va a `scale(1)` con un `cubic-bezier` de rebote (valor >1) + `translateY`; el triangulito es un `::before` rotado 45º. Idea = "aparición con muelle" reaplicable a cualquier popover.
- **Dónde usarlo:** ayudas/tooltips de iconos del cuaderno con un toque juguetón.
- **Fuente:** https://uiverse.io/Siyu1017/giant-catfish-51
- **Estado:** ✅ completo (HTML + CSS). *(auto-extraído 2026-06-30.)*
```html
<div class="tooltip-container">
  <span class="tooltip">Uiverse.io</span>
  <span class="text">Tooltip</span>
</div>
```
```css
.tooltip-container {
  position: relative;
  transition: all 0.2s;
  font-size: 17px;
  padding: 1rem 0;
  width: fit-content;
  box-sizing: border-box;
  --bg: linear-gradient(135deg, #a940fd, #5b46e8);
  --color: #fff;
  --tooltip-bg: #fff;
  --tooltip-color: #303030;
  --margin: 0.5rem;
}

.text {
  z-index: 9;
  background: var(--bg);
  color: var(--color);
  padding: 0.7em 1.8em;
  border-radius: 0.75rem;
  height: fit-content;
  cursor: pointer;
  font-size: 100%;
  font-weight: 600;
  box-shadow: 0 4px 16px 4px rgba(0, 0, 0, 0.15);
  background-size: 100%;
  display: block;
  transition:
    box-shadow 0.4s ease-in-out,
    transform 0.2s cubic-bezier(0.06, 0.37, 0.3, 0.92);
}

.tooltip-container:hover .text {
  transform: scale(1.1);
  box-shadow:
    0px 8px 32px 16px #5b46e855,
    0px -2px 8px 2px #a940fd55;
}

.tooltip {
  position: absolute;
  top: calc(-1 * var(--margin));
  left: 50%;
  transform: translateX(-50%) translateY(0%) scale(0);
  padding: 0.3em 0.6em;
  opacity: 0;
  pointer-events: none;
  transition: all 0.4s cubic-bezier(0.07, 1.17, 0.44, 1.41);
  background: var(--tooltip-bg);
  color: var(--tooltip-color);
  border-radius: 0.5rem;
  z-index: 99999;
}

.tooltip::before {
  position: absolute;
  content: "";
  height: 0.6em;
  width: 0.6em;
  bottom: -0.2em;
  left: 50%;
  transform: translate(-50%) rotate(45deg);
  background: var(--tooltip-bg);
  border-bottom-right-radius: 0.175rem;
}

.tooltip-container:hover .tooltip {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translateX(-50%) translateY(-100%) scale(1);
}
```

### 🔗 Iconos sociales con color de marca al hover — *Uiverse / PriyanshuGupta28* · **A-TIER**
- **Qué es:** una fila de iconos redondos (Spotify, Pinterest, Dribbble, Telegram); al pasar el ratón cada uno se tiñe de SU color de marca y sube un tooltip.
- **Por qué encaja:** micro-reacción satisfactoria por icono, pero es una fila de enlaces decorativa.
- **Cómo funciona (idea reutilizable):** cada enlace lleva `data-social="x"` y un selector `[data-social="x"]:hover{color:...}` aplica el color de marca a un SVG con `fill: currentColor`; el tooltip sube con `top` + `opacity`. Idea = "un atributo data por item para variar color/estado sin duplicar reglas".
- **Dónde usarlo:** pie/cabecera con enlaces (si algún día hay redes del cuaderno).
- **Fuente:** https://uiverse.io/PriyanshuGupta28/dry-mole-12
- **Estado:** ✅ completo (HTML + CSS). *(auto-extraído 2026-06-30.)*
```html
<main>
  <ul class="example-1">
    <li class="icon-content">
      <a
        class="link"
        data-social="spotify"
        aria-label="Spotify"
        href="https://www.spotify.com/"
      >
        <svg viewBox="0 0 100 100" version="1.1">
          <path
            fill="currentColor"
            d="M50,4C24.7,4,4,24.7,4,50s20.6,46,46,46s46-20.6,46-46S75.4,4,50,4z M71.6,71.5c0,0,0,0.1-0.1,0.1c-0.8,1.2-2,1.8-3.2,1.8  c-0.7,0-1.4-0.2-2-0.6c-10.2-6.3-23.3-7.7-38.8-4.1c-2.1,0.6-4-0.9-4.5-2.7c-0.6-2.3,0.9-4.1,2.7-4.6c17.7-4,32.6-2.3,44.4,5  c0.9,0.4,1.5,1,1.8,1.9C72.2,69.3,72.1,70.5,71.6,71.5z M76.9,59.3L76.9,59.3c-0.8,1.1-1.9,1.9-3.2,2.1c-0.2,0-0.5,0.1-0.7,0.1  c-0.8,0-1.6-0.3-2.3-0.7c-12-7.3-30.1-9.4-43.9-5c-2.5,0.6-5-0.7-5.6-3c-0.6-2.5,0.7-4.9,3-5.5c16.5-5,37.2-2.5,51.4,6.2  c0.8,0.4,1.5,1.3,1.8,2.5C77.9,57,77.6,58.3,76.9,59.3z M83.2,45.6c-1,1.4-2.7,2.1-4.4,2.1c-0.9,0-1.9-0.2-2.7-0.7c0,0,0,0,0,0  c-13.9-8.3-37.8-9.3-51.4-5.1c-2.7,0.8-5.5-0.7-6.4-3.3c-0.8-2.7,0.7-5.6,3.3-6.4c16.2-4.8,43-3.8,59.8,6.2  C83.8,39.6,84.7,42.9,83.2,45.6C83.3,45.5,83.3,45.5,83.2,45.6z"
          ></path>
        </svg>
      </a>
      <div class="tooltip">Spotify</div>
    </li>
    <li class="icon-content">
      <a
        class="link"
        data-social="pinterest"
        aria-label="Pinterest"
        href="https://www.pinterest.com/"
      >
        <svg xml:space="preserve" viewBox="0 0 100 100" version="1.1">
          <path
            fill="currentColor"
            d="M83,17.8C74.5,8.9,63.4,4.3,50,4.1C37.7,4.2,26.8,8.6,17.9,17.3C8.9,26,4.3,37,4.1,50c0,0,0,0,0,0c0,9.1,2.5,17.4,7.4,24.9  c4.9,7.4,11.6,13.2,20.1,17.1c0.3,0.1,0.7,0.1,1-0.1c0.3-0.2,0.5-0.5,0.5-0.8l0-4.9c0.1-2.1,0.7-5.3,1.7-9.5c1-4,1.7-6.7,1.9-7.6  c0.7-3,1.7-7.2,3-12.6c0.1-0.2,0-0.5-0.1-0.7c-0.4-0.8-1-2.6-1.5-6.6c0.1-2.7,0.8-5.2,2.1-7.3c1.2-2,3.1-3.1,5.7-3.5  c2,0.1,4.7,0.8,5.1,5.9c-0.1,1.8-0.8,4.5-1.9,8.1c-1.2,3.8-1.9,6.3-2.1,7.6c-0.7,2.5-0.2,4.8,1.5,6.8c1.6,1.9,3.8,2.9,6.5,3.1  c4.3-0.1,8.1-2.6,11.2-7.5c1.7-3,2.9-6.3,3.5-9.7c0.7-3.4,0.7-7.1,0-10.8c-0.7-3.8-2.2-7.1-4.5-9.8c0,0-0.1-0.1-0.1-0.1  c-4.3-3.7-9.5-5.3-15.6-5c-6,0.4-11.3,2.6-15.9,6.6c-2.9,3.2-4.8,7.1-5.7,11.6c-0.9,4.6,0,9.1,2.6,13.3c0.3,0.5,0.5,0.8,0.6,1  c0,0.3,0,1-0.5,2.8c-0.5,1.8-0.9,2.2-0.9,2.2c0,0-0.1,0-0.1,0.1c0,0-0.2,0-0.4-0.1c-2.2-1-3.9-2.4-5.2-4.2c-1.3-1.9-2.1-4-2.5-6.3  c-0.3-2.5-0.4-5-0.3-7.5c0.2-2.5,0.7-5.1,1.4-7.7c3-6.9,8.5-11.9,16.3-14.8c7.8-2.9,16-3.2,24.3-0.8c6.5,2.8,11,7.4,13.6,13.7  c2.5,6.4,2.8,13.4,0.8,20.8c-2.2,7.1-6.4,12.4-12.1,15.7c-5.6,2.8-10.8,3-15.7,0.7c-1.8-1.1-3.1-2.3-3.9-3.5c-0.2-0.3-0.6-0.5-1-0.5  c-0.4,0.1-0.7,0.3-0.8,0.7c-0.7,2.7-1.3,4.7-1.6,6.2c-1.4,5.4-2.6,9.2-3.4,11c-0.8,1.6-1.6,3.1-2.4,4.3c-0.2,0.3-0.2,0.6-0.1,0.9  s0.3,0.5,0.6,0.6c4.3,1.3,8.7,2,13,2c12.4-0.1,23.2-4.6,32.1-13.4C91.1,73.9,95.8,62.9,96,50C95.9,37.5,91.5,26.7,83,17.8z"
          ></path>
        </svg>
      </a>
      <div class="tooltip">Pinterest</div>
    </li>
    <li class="icon-content">
      <a
        class="link"
        data-social="dribbble"
        aria-label="Dribbble"
        href="https://dribbble.com/"
      >
        <svg viewBox="0 0 100 100" version="1.1">
          <path
            fill="currentColor"
            d="M83.5,18.5C74.9,9.3,62.8,4,50.2,4c-6.1,0-12,1.1-17.6,3.4C15.2,14.5,4,31.3,4,50c0,13.9,6.2,26.9,17,35.7  C29.2,92.3,39.4,96,50,96c6.6,0,13.2-1.5,19.2-4.2c12.5-5.7,21.7-16.6,25.2-29.8C95.5,57.9,96,53.8,96,50  C96,38.3,91.6,27.1,83.5,18.5z M75,22.3c-0.7,0.9-1.4,1.8-2.1,2.6c-1.4,1.6-2.8,3-4.4,4.3c-0.3,0.3-0.6,0.6-1,0.8  c-1,0.9-2.1,1.7-3.2,2.5l-0.3,0.2c-1.1,0.7-2.2,1.5-3.5,2.2c-0.4,0.3-0.9,0.5-1.4,0.8c-0.8,0.5-1.7,0.9-2.7,1.4  c-0.6,0.3-1.2,0.5-1.8,0.8L54.3,38c-0.1,0-0.2,0.1-0.3,0.1c0,0,0,0,0,0c-1.3-2.6-2.4-4.9-3.5-7l-0.3-0.5c-1.1-2-2.2-4-3.3-6  l-0.7-1.3c-1.1-1.9-2.2-3.7-3.2-5.4l-0.7-1.1c-0.7-1.2-1.4-2.3-2.2-3.5c3.2-0.8,6.5-1.3,9.8-1.3c9.4,0,18.4,3.5,25.4,9.8  C75.3,21.9,75.2,22.1,75,22.3z M46.4,40.6c-1.4,0.4-2.9,0.8-4.4,1.1c-0.3,0-0.7,0.1-0.9,0.2c-6,1-12.5,1.4-19.4,1.1  c-0.3,0-0.6,0-0.9,0c-0.3,0-0.5,0-0.7,0c-2.5-0.2-4.9-0.4-7.2-0.7c2.3-11.2,9.6-20.9,19.8-26.1c2.1,3.3,4.2,6.7,6.3,10.3l0.4,0.7  c0.9,1.6,1.9,3.4,3.2,5.8l0.6,1.2C44.4,36.6,45.4,38.6,46.4,40.6z M24.4,51.1c2.2,0.1,4.2,0,6.2-0.1l0.7,0c0.4,0,0.9,0,1.3,0  c2.8-0.2,5.5-0.5,8.5-1c0.5-0.1,1-0.2,1.6-0.3l0.5-0.1c2.2-0.4,4.2-0.9,6.1-1.4c0.1,0,0.3-0.1,0.4-0.1l0.5,1.1  c1.2,2.8,2.3,5.5,3.3,8.1c0,0,0,0,0,0c-0.2,0.1-0.5,0.2-0.7,0.2c-2,0.6-4,1.4-5.9,2.2c-0.6,0.3-1.3,0.5-1.9,0.8  c-1.4,0.6-2.7,1.3-4.1,2.1l-0.3,0.2c-0.2,0.1-0.5,0.2-0.6,0.4c-1.5,0.9-3.1,1.9-4.7,3c-0.2,0.1-0.4,0.3-0.6,0.4  c-0.2,0.1-0.4,0.3-0.6,0.5c-1,0.7-2,1.5-3,2.3c-0.4,0.3-0.7,0.6-1.1,0.9l-0.3,0.3c-0.7,0.6-1.5,1.3-2.2,1.9l-0.2,0.2  c-0.4,0.4-0.7,0.7-1.1,1.1l-0.2,0.2c-0.6,0.6-1.3,1.3-2,2l-0.4,0.4c-0.2,0.2-0.4,0.4-0.5,0.6C16.1,69.9,12,60.2,12,50.3  c0,0,0.1,0,0.1,0c0.4,0,0.7,0,1.1,0.1c3.5,0.4,6.9,0.6,10.3,0.7C23.8,51,24.1,51.1,24.4,51.1z M29.5,81.9c0.2-0.2,0.3-0.4,0.5-0.5  c1-1.1,2-2.1,3-3c1.9-1.8,3.8-3.3,5.7-4.8c0.2-0.1,0.4-0.3,0.6-0.4c0.2-0.2,0.5-0.4,0.8-0.6c1.1-0.8,2.2-1.5,3.4-2.2  c0.1-0.1,0.2-0.1,0.3-0.2c0.1-0.1,0.2-0.1,0.3-0.2c1.4-0.8,2.9-1.6,4.5-2.3c0.3-0.1,0.6-0.2,0.8-0.4l0.6-0.3  c1.1-0.5,2.2-0.9,3.5-1.4c0.5-0.2,1.1-0.4,1.7-0.6l0.2-0.1c0.4-0.1,0.7-0.2,1.1-0.3c0,0,0,0,0,0c1.1,3.2,2.3,6.4,3.3,9.8l0.1,0.4  c1.1,3.6,2,7.3,2.9,10.8C51.7,89.8,39.3,88.3,29.5,81.9C29.4,81.9,29.4,81.9,29.5,81.9z M65.6,62.9c0.7-0.1,1.3-0.2,2-0.2  c2-0.2,4-0.2,5.9-0.2c0.2,0,0.4,0,0.6,0l0.2,0c2.2,0.1,4.6,0.3,6.9,0.6c0.4,0.1,0.9,0.1,1.3,0.2l0.6,0.1c0.7,0.1,1.5,0.3,2.2,0.4  c-3,7.6-8.3,14-15.2,18.3c-0.8-3.1-1.7-6.2-2.6-9.2l-0.1-0.4c-0.9-3-1.9-6.1-3.1-9.5C64.8,63.1,65.2,63,65.6,62.9z M81.6,55.2  C80,55,78.4,54.9,77,54.8l-0.9-0.1c-0.9-0.1-1.9-0.1-2.8-0.2c-0.2,0-0.3,0-0.5,0c-0.2,0-0.4,0-0.6,0c-2,0-3.9,0.1-5.9,0.3  c-0.2,0-0.3,0-0.5,0.1c-0.1,0-0.2,0-0.3,0c-1.3,0.1-2.6,0.3-3.9,0.5c-0.1-0.1-0.1-0.3-0.2-0.4c-0.1-0.2-0.2-0.5-0.3-0.7  c-1.1-2.9-2.3-5.7-3.2-7.8l-0.3-0.6c-0.1-0.1-0.1-0.3-0.2-0.4c0,0,0,0,0.1,0c0.2-0.1,0.5-0.2,0.7-0.3c0.6-0.2,1.2-0.5,1.8-0.8  c1.2-0.5,2.4-1.2,3.6-1.8c0.1-0.1,0.3-0.2,0.5-0.2c0.2-0.1,0.5-0.2,0.7-0.4c1.5-0.9,2.9-1.8,4.2-2.7l0.3-0.2  c0.2-0.1,0.4-0.3,0.6-0.4c0.9-0.6,1.9-1.4,2.8-2.2c1.5-1.2,2.9-2.5,4.3-4c0.8-0.8,1.5-1.6,2.2-2.4l0.4-0.5c0.5-0.5,0.9-1.1,1.3-1.6  C85.5,34.3,88,42.1,88,50c0,2-0.2,4.1-0.5,6.1c-0.3,0-0.6-0.1-0.8-0.1c-0.4-0.1-0.7-0.1-1.1-0.2l-1.1-0.2  C83.5,55.5,82.5,55.3,81.6,55.2z"
          ></path>
        </svg>
      </a>
      <div class="tooltip">Dribbble</div>
    </li>
    <li class="icon-content">
      <a
        class="link"
        data-social="telegram"
        aria-label="Telegram"
        href="https://telegram.org/"
      >
        <svg viewBox="0 0 100 100" version="1.1">
          <path
            fill="currentColor"
            d="M95,9.9c-1.3-1.1-3.4-1.2-7-0.1c0,0,0,0,0,0c-2.5,0.8-24.7,9.2-44.3,17.3c-17.6,7.3-31.9,13.7-33.6,14.5  c-1.9,0.6-6,2.4-6.2,5.2c-0.1,1.8,1.4,3.4,4.3,4.7c3.1,1.6,16.8,6.2,19.7,7.1c1,3.4,6.9,23.3,7.2,24.5c0.4,1.8,1.6,2.8,2.2,3.2  c0.1,0.1,0.3,0.3,0.5,0.4c0.3,0.2,0.7,0.3,1.2,0.3c0.7,0,1.5-0.3,2.2-0.8c3.7-3,10.1-9.7,11.9-11.6c7.9,6.2,16.5,13.1,17.3,13.9  c0,0,0.1,0.1,0.1,0.1c1.9,1.6,3.9,2.5,5.7,2.5c0.6,0,1.2-0.1,1.8-0.3c2.1-0.7,3.6-2.7,4.1-5.4c0-0.1,0.1-0.5,0.3-1.2  c3.4-14.8,6.1-27.8,8.3-38.7c2.1-10.7,3.8-21.2,4.8-26.8c0.2-1.4,0.4-2.5,0.5-3.2C96.3,13.5,96.5,11.2,95,9.9z M30,58.3l47.7-31.6  c0.1-0.1,0.3-0.2,0.4-0.3c0,0,0,0,0,0c0.1,0,0.1-0.1,0.2-0.1c0.1,0,0.1,0,0.2-0.1c-0.1,0.1-0.2,0.4-0.4,0.6L66,38.1  c-8.4,7.7-19.4,17.8-26.7,24.4c0,0,0,0,0,0.1c0,0-0.1,0.1-0.1,0.1c0,0,0,0.1-0.1,0.1c0,0.1,0,0.1-0.1,0.2c0,0,0,0.1,0,0.1  c0,0,0,0,0,0.1c-0.5,5.6-1.4,15.2-1.8,19.5c0,0,0,0,0-0.1C36.8,81.4,31.2,62.3,30,58.3z"
          ></path>
        </svg>
      </a>
      <div class="tooltip">Telegram</div>
    </li>
  </ul>
</main>
```
```css
ul {
  list-style: none;
}

.example-1 {
  display: flex;
  justify-content: center;
  align-items: center;
}
.example-1 .icon-content {
  margin: 0 10px;
  position: relative;
}
.example-1 .icon-content .tooltip {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #000;
  color: #fff;
  padding: 6px 10px;
  border-radius: 5px;
  opacity: 0;
  visibility: hidden;
  font-size: 14px;
  transition: all 0.3s ease;
}
.example-1 .icon-content:hover .tooltip {
  opacity: 1;
  visibility: visible;
  top: -50px;
}
.example-1 .icon-content .link {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: #4d4d4d;
  background-color: #fff;
  transition: all 0.3s ease-in-out;
}
.example-1 .icon-content .link:hover {
  box-shadow: 3px 2px 45px 0px rgb(0 0 0 / 12%);
}
.example-1 .icon-content .link svg {
  width: 30px;
  height: 30px;
}
.example-1 .icon-content .link[data-social="spotify"]:hover {
  color: #1db954;
}
.example-1 .icon-content .link[data-social="pinterest"]:hover {
  color: #bd081c;
}
.example-1 .icon-content .link[data-social="dribbble"]:hover {
  color: #ea4c89;
}
.example-1 .icon-content .link[data-social="telegram"]:hover {
  color: #0088cc;
}
```

### 🧭 Barra de navegación flotante (glass) — *Uiverse / themrsami* · **A-TIER**
- **Qué es:** una píldora de navegación oscura tipo cristal con iconos; flota, brilla en dorado al pasar el ratón y se hunde un pelín al pulsar, con tooltips arriba.
- **Por qué encaja:** tiene tacto (escala al hover + `active:scale-95` al pulsar) y aire premium, pero es UI de navegación, no un juguete.
- **Cómo funciona (idea reutilizable):** glassmorphism = `backdrop-blur` + fondo semi-transparente en degradado + borde tenue; el "press" = `active:scale-95` y el glow = `box-shadow` de color al `:hover`. Idea = "barra de cristal con feedback de pulsación", reaplicable a cualquier toolbar.
- **Dónde usarlo:** barra de acciones del cuaderno (volver, mapa, opinar) flotando arriba. OJO móvil: glass + blur puede pesar; mantener pero vigilar.
- **Fuente:** https://uiverse.io/themrsami/bad-bear-23
- **Estado:** ✅ completo (HTML + CSS). *(auto-extraído 2026-06-30.)*
```html
<div
  class="flex justify-center w-full p-4 bg-gradient-to-b from-black/5 to-transparent backdrop-blur-sm"
>
  <nav
    class="bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95 rounded-full px-4 sm:px-8 py-2 sm:py-3 shadow-[0_0_15px_rgba(0,0,0,0.2)] border border-yellow-300/20 backdrop-blur-md transform hover:scale-[1.02] transition-all duration-300 max-w-[95%] sm:max-w-[600px]"
  >
    <div class="flex items-center justify-center space-x-3 sm:space-x-10">
      <div class="relative group">
        <div
          class="p-2 sm:p-3 rounded-full hover:bg-white/5 cursor-pointer transition-all duration-300 hover:shadow-[0_0_15px_rgba(251,191,36,0.1)] active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 sm:w-6 sm:h-6 text-yellow-100/80 group-hover:text-yellow-300 transition-all duration-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>

          <div
            class="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 bottom-full mb-2 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div
              class="bg-black/85 backdrop-blur-md text-yellow-300 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg whitespace-nowrap font-light tracking-wider shadow-[0_0_15px_rgba(0,0,0,0.3)] border border-yellow-300/10"
            >
              Home
              <div
                class="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1"
              >
                <div
                  class="border-4 border-transparent border-t-black/85"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="relative group">
        <div
          class="p-2 sm:p-3 rounded-full hover:bg-white/5 cursor-pointer transition-all duration-300 hover:shadow-[0_0_15px_rgba(251,191,36,0.1)] active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 sm:w-6 sm:h-6 text-yellow-100/80 group-hover:text-yellow-300 transition-all duration-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 21H4.6c-1.1 0-2-.9-2-2V3"></path>
            <path d="M19 8l-7 6-4-4-4 4"></path>
          </svg>
          <div
            class="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 bottom-full mb-2 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div
              class="bg-black/85 backdrop-blur-md text-yellow-300 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg whitespace-nowrap font-light tracking-wider shadow-[0_0_15px_rgba(0,0,0,0.3)] border border-yellow-300/10"
            >
              Analytics
              <div
                class="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1"
              >
                <div
                  class="border-4 border-transparent border-t-black/85"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="relative group">
        <div
          class="p-2 sm:p-3 rounded-full hover:bg-white/5 cursor-pointer transition-all duration-300 hover:shadow-[0_0_15px_rgba(251,191,36,0.1)] active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 sm:w-6 sm:h-6 text-yellow-100/80 group-hover:text-yellow-300 transition-all duration-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <div
            class="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 bottom-full mb-2 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div
              class="bg-black/85 backdrop-blur-md text-yellow-300 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg whitespace-nowrap font-light tracking-wider shadow-[0_0_15px_rgba(0,0,0,0.3)] border border-yellow-300/10"
            >
              Notifications
              <div
                class="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1"
              >
                <div
                  class="border-4 border-transparent border-t-black/85"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="relative group">
        <div
          class="p-2 sm:p-3 rounded-full hover:bg-white/5 cursor-pointer transition-all duration-300 hover:shadow-[0_0_15px_rgba(251,191,36,0.1)] active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 sm:w-6 sm:h-6 text-yellow-100/80 group-hover:text-yellow-300 transition-all duration-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
            ></path>
          </svg>
          <div
            class="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 bottom-full mb-2 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div
              class="bg-black/85 backdrop-blur-md text-yellow-300 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg whitespace-nowrap font-light tracking-wider shadow-[0_0_15px_rgba(0,0,0,0.3)] border border-yellow-300/10"
            >
              Messages
              <div
                class="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1"
              >
                <div
                  class="border-4 border-transparent border-t-black/85"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="relative group">
        <div
          class="p-2 sm:p-3 rounded-full hover:bg-white/5 cursor-pointer transition-all duration-300 hover:shadow-[0_0_15px_rgba(251,191,36,0.1)] active:scale-95"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 sm:w-6 sm:h-6 text-yellow-100/80 group-hover:text-yellow-300 transition-all duration-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="3"></circle>
            <path
              d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
            ></path>
          </svg>
          <div
            class="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 bottom-full mb-2 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div
              class="bg-black/85 backdrop-blur-md text-yellow-300 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg whitespace-nowrap font-light tracking-wider shadow-[0_0_15px_rgba(0,0,0,0.3)] border border-yellow-300/10"
            >
              Settings
              <div
                class="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1"
              >
                <div
                  class="border-4 border-transparent border-t-black/85"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</div>
```
```css
/* (reset base de Tailwind omitido por la rutina; se conservan las utilidades que dan estilo) */
.invisible {
  visibility: hidden;
}
.absolute {
  position: absolute;
}
.relative {
  position: relative;
}
.bottom-full {
  bottom: 100%;
}
.left-1\/2 {
  left: 50%;
}
.top-full {
  top: 100%;
}
.z-50 {
  z-index: 50;
}
.-mt-1 {
  margin-top: -0.25rem;
}
.mb-2 {
  margin-bottom: 0.5rem;
}
.flex {
  display: flex;
}
.h-5 {
  height: 1.25rem;
}
.w-5 {
  width: 1.25rem;
}
.w-full {
  width: 100%;
}
.max-w-\\[95\\%\\] {
  max-width: 95%;
}
.-translate-x-1\/2 {
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.transform {
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.cursor-pointer {
  cursor: pointer;
}
.items-center {
  align-items: center;
}
.justify-center {
  justify-content: center;
}
.space-x-3 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.75rem * var(--tw-space-x-reverse));
  margin-left: calc(0.75rem * calc(1 - var(--tw-space-x-reverse)));
}
.whitespace-nowrap {
  white-space: nowrap;
}
.rounded-full {
  border-radius: 9999px;
}
.rounded-lg {
  border-radius: 0.5rem;
}
.border {
  border-width: 1px;
}
.border-4 {
  border-width: 4px;
}
.border-transparent {
  border-color: transparent;
}
.border-yellow-300\/10 {
  border-color: rgb(253 224 71 / 0.1);
}
.border-yellow-300\/20 {
  border-color: rgb(253 224 71 / 0.2);
}
.border-t-black\/85 {
  border-top-color: rgb(0 0 0 / 0.85);
}
.bg-black\/85 {
  background-color: rgb(0 0 0 / 0.85);
}
.bg-gradient-to-b {
  background-image: linear-gradient(to bottom, var(--tw-gradient-stops));
}
.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}
.from-black\/5 {
  --tw-gradient-from: rgb(0 0 0 / 0.05) var(--tw-gradient-from-position);
  --tw-gradient-to: rgb(0 0 0 / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}
.from-gray-900\/95 {
  --tw-gradient-from: rgb(17 24 39 / 0.95) var(--tw-gradient-from-position);
  --tw-gradient-to: rgb(17 24 39 / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}
.via-gray-800\/95 {
  --tw-gradient-to: rgb(31 41 55 / 0) var(--tw-gradient-to-position);
  --tw-gradient-stops: var(--tw-gradient-from),
    rgb(31 41 55 / 0.95) var(--tw-gradient-via-position), var(--tw-gradient-to);
}
.to-gray-900\/95 {
  --tw-gradient-to: rgb(17 24 39 / 0.95) var(--tw-gradient-to-position);
}
.to-transparent {
  --tw-gradient-to: transparent var(--tw-gradient-to-position);
}
.p-2 {
  padding: 0.5rem;
}
.p-4 {
  padding: 1rem;
}
.px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.py-1\\.5 {
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
}
.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}
.font-light {
  font-weight: 300;
}
.tracking-wider {
  letter-spacing: 0.05em;
}
.text-yellow-100\/80 {
  color: rgb(254 249 195 / 0.8);
}
.text-yellow-300 {
  --tw-text-opacity: 1;
  color: rgb(253 224 71 / var(--tw-text-opacity, 1));
}
.opacity-0 {
  opacity: 0;
}
.shadow-\\[0_0_15px_rgba\\(0\\2c 0\\2c 0\\2c 0\\.2\\)\\] {
  --tw-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  --tw-shadow-colored: 0 0 15px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.shadow-\\[0_0_15px_rgba\\(0\\2c 0\\2c 0\\2c 0\\.3\\)\\] {
  --tw-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  --tw-shadow-colored: 0 0 15px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.backdrop-blur-md {
  --tw-backdrop-blur: blur(12px);
  -webkit-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness)
    var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale)
    var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert)
    var(--tw-backdrop-opacity) var(--tw-backdrop-saturate)
    var(--tw-backdrop-sepia);
  backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness)
    var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale)
    var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert)
    var(--tw-backdrop-opacity) var(--tw-backdrop-saturate)
    var(--tw-backdrop-sepia);
}
.backdrop-blur-sm {
  --tw-backdrop-blur: blur(4px);
  -webkit-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness)
    var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale)
    var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert)
    var(--tw-backdrop-opacity) var(--tw-backdrop-saturate)
    var(--tw-backdrop-sepia);
  backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness)
    var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale)
    var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert)
    var(--tw-backdrop-opacity) var(--tw-backdrop-saturate)
    var(--tw-backdrop-sepia);
}
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.duration-300 {
  transition-duration: 300ms;
}
.hover\\:scale-\\[1\\.02\\]:hover {
  --tw-scale-x: 1.02;
  --tw-scale-y: 1.02;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.hover\\:bg-white\/5:hover {
  background-color: rgb(255 255 255 / 0.05);
}
.hover\\:shadow-\\[0_0_15px_rgba\\(251\\2c 191\\2c 36\\2c 0\\.1\\)\\]:hover {
  --tw-shadow: 0 0 15px rgba(251, 191, 36, 0.1);
  --tw-shadow-colored: 0 0 15px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.active\\:scale-95:active {
  --tw-scale-x: 0.95;
  --tw-scale-y: 0.95;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.group:hover .group-hover\\:visible {
  visibility: visible;
}
.group:hover .group-hover\\:text-yellow-300 {
  --tw-text-opacity: 1;
  color: rgb(253 224 71 / var(--tw-text-opacity, 1));
}
.group:hover .group-hover\\:opacity-100 {
  opacity: 1;
}
@media (min-width: 640px) {
  .sm\\:h-6 {
    height: 1.5rem;
  }
  .sm\\:w-6 {
    width: 1.5rem;
  }
  .sm\\:max-w-\\[600px\\] {
    max-width: 600px;
  }
  .sm\\:space-x-10 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(2.5rem * var(--tw-space-x-reverse));
    margin-left: calc(2.5rem * calc(1 - var(--tw-space-x-reverse)));
  }
  .sm\\:p-3 {
    padding: 0.75rem;
  }
  .sm\\:px-4 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .sm\\:px-8 {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  .sm\\:py-2 {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
  .sm\\:py-3 {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }
  .sm\\:text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
}
```
---

## Otras galerías de referencia (para buscar más)
- **UIVerse** (uiverse.io) — la principal. Buscar: `cute, playful, paper, note, pixel, cartoon, cat, floating, sticky note, tooltip`.
- **Hover.css** (ianlunn.github.io/Hover), **Animista** (animista.net), **LottieFiles** (cat, paper plane, pencil, sticker, note), **Aceternity / Magic UI / React Bits** (inspiración), **Neal.fun** (cómo explicar con interacción).
