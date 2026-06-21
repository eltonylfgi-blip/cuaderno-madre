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
- **Estado:** tengo el HTML; **falta el CSS** (cópialo de Uiverse o pásamelo).
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
