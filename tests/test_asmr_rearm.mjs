#!/usr/bin/env node
/*
  Sensor del bug E5: una burbuja o miga ASMR no puede parecer de un solo uso.

  Ejecuta las funciones REALES extraidas de index.html contra un DOM y reloj
  minimos. El segundo toque inmediato sigue bloqueado para evitar dobles eventos,
  pero el mismo control debe estar armado otra vez antes de un segundo.
*/
import { readFileSync } from "node:fs";
import { createContext, runInContext } from "node:vm";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(join(ROOT, "index.html"), "utf8");
const start = html.indexOf("var ribbons=[];");
const end = html.indexOf("function mkLabel", start);

if (start < 0 || end < 0) {
  console.error("FATAL: no se encontro el motor real de controles ASMR");
  process.exit(1);
}

class FakeClassList {
  constructor(owner) { this.owner = owner; this.values = new Set(); }
  contains(name) { return this.values.has(name); }
  add(name) { this.values.add(name); }
  remove(name) { this.values.delete(name); }
}

class FakeElement {
  constructor() {
    this.dataset = {};
    this.style = { visibility: "" };
    this.classList = new FakeClassList(this);
    this.listeners = {};
    this.parent = null;
  }
  set className(value) {
    this.classList.values = new Set(String(value).split(/\s+/).filter(Boolean));
  }
  get className() { return [...this.classList.values].join(" "); }
  setAttribute() {}
  removeAttribute(name) {
    if (name === "data-busy") delete this.dataset.busy;
  }
  addEventListener(type, fn) { this.listeners[type] = fn; }
  closest(selector) { return selector === ".cmTex" ? this.parent : null; }
  animate() { return { finished: Promise.resolve() }; }
  click() {
    this.listeners.click({ stopPropagation() {}, clientX: 20, clientY: 20 });
  }
}

let timers = [];
let hits = [];
const sandbox = {
  document: { createElement: () => new FakeElement() },
  setTimeout: (fn, delay) => { timers.push({ fn, delay: Number(delay) }); return timers.length; },
  markTouched() {},
  hit: (profile) => hits.push(profile),
  progressFx() {},
  tr: (es) => es,
  reduce: false,
  Math,
  Promise,
};
runInContext(html.slice(start, end), createContext(sandbox));

function runUntil(maxDelay) {
  const due = timers.filter((timer) => timer.delay <= maxDelay);
  timers = timers.filter((timer) => timer.delay > maxDelay);
  due.forEach((timer) => timer.fn());
}

let failures = 0;
function check(name, condition, detail = "") {
  if (condition) console.log("  ok    " + name);
  else {
    failures++;
    console.log("  FALLA " + name + (detail ? "\n          -> " + detail : ""));
  }
}

console.log("\nREARME ASMR - mismo control reutilizable en <= 1000 ms");

const ribbon = new FakeElement();
ribbon.dataset.tex = "burbujas";

const bubble = sandbox.mkBubble("burbujas");
bubble.parent = ribbon;
bubble.click();
bubble.click();
check("burbuja filtra el doble toque inmediato", hits.length === 1, "hits=" + hits.length);
runUntil(1000);
bubble.click();
check("burbuja vuelve a responder antes de 1 s", hits.length === 2,
  "hits=" + hits.length + "; sigue bloqueada=" + bubble.classList.contains("popped"));

timers = [];
hits = [];
const crumb = sandbox.mkBit("x", "cristal");
crumb.parent = ribbon;
crumb.click();
crumb.click();
check("miga filtra el doble toque inmediato", hits.length === 1, "hits=" + hits.length);
runUntil(1000);
crumb.click();
check("miga vuelve a responder y es visible antes de 1 s", hits.length === 2 && crumb.style.visibility === "",
  "hits=" + hits.length + "; visibility=" + JSON.stringify(crumb.style.visibility) + "; busy=" + JSON.stringify(crumb.dataset.busy));

console.log(failures ? "\n" + failures + " comprobacion(es) FALLAN\n" : "\nTODO VERDE - los controles ASMR se rearman\n");
process.exit(failures ? 1 : 0);
