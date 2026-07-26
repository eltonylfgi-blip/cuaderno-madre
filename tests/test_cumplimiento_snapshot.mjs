#!/usr/bin/env node
/* Regresión del feedback de Tony: el snapshot debe separar revisión, uso, beneficio y cobertura. */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(join(root, "index.html"), "utf8");
const required = [
  'id="cumplimiento"',
  'function cumplimientoClave',
  'function cumplimientoEstado',
  '!cumplimientoClave(p[1])',
  'review\\.due',
  'pending_historical_backfill',
  'classified_with_gaps',
  "value='OBSOLETO'",
  "value='SIN DATOS'",
  "['beneficio','Beneficio']"
];
let failures = 0;
for (const marker of required) {
  if (html.includes(marker)) console.log("ok   " + marker);
  else { console.log("FALLA " + marker); failures++; }
}

const helperStart = html.indexOf("function cumplimientoClave");
const helperEnd = html.indexOf("function cumplimientoEstado", helperStart);
if (helperStart < 0 || helperEnd < 0) {
  console.log("FALLA no se pudo extraer el clasificador real");
  failures++;
} else {
  const classify = new Function(html.slice(helperStart, helperEnd) + "; return cumplimientoClave;")();
  const internal = [
    ["Revision de compromisos permanentes", "revision"],
    ["Mecanismos transversales", "mecanismos"],
    ["Beneficio de mecanismos", "beneficio"],
    ["Cobertura de promesas historicas", "cobertura"]
  ];
  for (const [label, expected] of internal) {
    const actual = classify(label);
    if (actual === expected) console.log("ok   interna " + label + " -> " + actual);
    else { console.log("FALLA interna " + label + " -> " + actual); failures++; }
  }
  for (const label of [
    "Euros ganados",
    "Clientes reales",
    "Estrellas GitHub activos publicos",
    "Customer reviews",
    "Reviews App Store",
    "Review de clientes"
  ]) {
    const actual = classify(label);
    if (actual === "") console.log("ok   externa " + label + " queda en Señales");
    else { console.log("FALLA externa " + label + " clasificada como " + actual); failures++; }
  }
}
process.exit(failures ? 1 : 0);
