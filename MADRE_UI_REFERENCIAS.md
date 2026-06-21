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
- **Por qué encaja:** parece un cacharro vivo. No como loader genérico.
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
- **Por qué encaja:** da sensación de **objeto físico** (la tarjeta sigue al ratón en 3D, sin JS).
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

### 🔥 Antorcha (torch) que se enciende — *Uiverse* · **S-TIER (como easter-egg)**
- **Por qué encaja:** cacharro 3D con partículas y humo; muy "artefacto".
- **Dónde usarlo:** NO como botón normal → como **"Modo explorador"**: al encenderla, **aparecen
  notas/secretos ocultos** por la página. Eso sí es memorable.
- **Estado:** tengo el HTML completo (checkbox + torch + particles + smoke + head/stick); **falta el CSS**.
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
    <div class="stick"><div class="side side-left"><!-- 16 div --></div><div class="side side-right"><!-- 16 div --></div></div>
  </div>
</label>
```

### ✨ Spotlight card (borde con punto que orbita) — *Uiverse / Spacious74* · **A-TIER**
- **Por qué encaja:** borde "tech" con un punto de luz que recorre el marco; queda muy vivo.
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
- **Por qué encaja:** input futurista con glow/bordes animados; muy "cacharro".
- **Dónde usarlo:** si algún día hay buscador (de comentarios / dibujos / ideas).
- **Estado:** tengo el HTML (`#poda` con input + filter-icon + search-icon SVG); **falta el CSS**.

### 🌗 Switch día/noche (sol-luna con nubes y estrellas) — *Uiverse* · **A-TIER**
- **Por qué encaja:** bonito, pero **es decoración** (no cambia comportamiento). Para el final.
- **Dónde usarlo:** toggle de tema claro/oscuro, cuando toque.
- **Estado:** tengo el HTML completo (sun-moon + clouds + stars); **falta el CSS**.

### 🫧 Blob card — *Uiverse / dylanharriscameron* · **A-TIER (bajo)**
- **Por qué encaja:** queda bien pero aporta poco; hay cosas mejores antes.
```html
<div class="card"><div class="bg"></div><div class="blob"></div></div>
```

---

## Otras galerías de referencia (para buscar más)
- **UIVerse** (uiverse.io) — la principal. Buscar: `cute, playful, paper, note, pixel, cartoon, cat, floating, sticky note, tooltip`.
- **Hover.css** (ianlunn.github.io/Hover), **Animista** (animista.net), **LottieFiles** (cat, paper plane, pencil, sticker, note), **Aceternity / Magic UI / React Bits** (inspiración), **Neal.fun** (cómo explicar con interacción).
