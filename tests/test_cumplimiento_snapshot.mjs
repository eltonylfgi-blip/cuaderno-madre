#!/usr/bin/env node
/* Regresión del feedback de Tony: el snapshot debe separar revisión, uso, beneficio y cobertura. */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(join(root, "index.html"), "utf8");
const required = [
  'id="cumplimiento"',
  'function cumplimientoEstado',
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
process.exit(failures ? 1 : 0);
