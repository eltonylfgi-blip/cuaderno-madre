#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(join(root, "media.html"), "utf8");
let failures = 0;

function check(label, condition) {
  if (condition) console.log("ok  " + label);
  else {
    failures += 1;
    console.log("FALLA  " + label);
  }
}

console.log("CONTRATO MESA DE RELACIONES — audio operable por teclado");
check("la superficie declara v1.82", /window\.__cmMedia=\{version:'v1\.82'/.test(html));
check("cada audio crea un botón nativo", /<button class="nodeExample relationPlay" type="button"/.test(html));
check("el botón expone estado de reproducir/parar", /relationPlay" type="button" aria-pressed="false"/.test(html));
check("el nombre accesible existe en español e inglés", /tr\('Escuchar ','Play '\)\+name/.test(html));
const outerPressed = /\bn\.setAttribute\('aria-pressed','false'\)/;
check("la ficha movible ya no finge ser el botón", !outerPressed.test(html));
check("el sensor distingue n.setAttribute de btn.setAttribute", outerPressed.test("n.setAttribute('aria-pressed','false')") && !outerPressed.test("btn.setAttribute('aria-pressed','false')"));
check("la ficha completa ya no captura clic para reproducir", !/if\(a\.kind==='audio'\)n\.addEventListener\('click'/.test(html));
check("Enter/Espacio llegan por semántica nativa del botón", /play\.addEventListener\('click'/.test(html));
check("el fin natural devuelve el botón a reposo", /audio\.onended=function\(\)\{if\(playing===audio\)stopPlaying\(\)\}/.test(html));
check("la modalidad distingue teclado y puntero", /e\.detail===0\?'teclado':'puntero'/.test(html));
check("el uso real viaja sin identidad verificada", /media-audio-mesa-operado[\s\S]*identidad: no-verificada/.test(html));
check("el selector se deduplica por audio, sesión y modalidad", /cm_media_relation_play_v1_[\s\S]*sessionStorage\.setItem\(key,'1'\)/.test(html));
check("arrastre y flechas ignoran el botón", (html.match(/relationPort,\.relationMismatch,\.relationPlay/g) || []).length >= 2);

const target = html.match(/\.relationPlay\{[^}]*min-height:(\d+)px/);
check("el blanco táctil mide al menos 44 px", Boolean(target) && Number(target[1]) >= 44);
const desktopReserve = html.match(/@media\(min-width:621px\)\{\.relationNode\.isAudio\{min-height:(\d+)px;padding-bottom:(\d+)px\}\}/);
check("la ficha de escritorio reserva espacio aunque crezca el título", Boolean(desktopReserve) && Number(desktopReserve[1]) >= 124 && Number(desktopReserve[2]) >= 64);

const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)];
check("media.html contiene JavaScript inline", scripts.length > 0);
for (const [index, match] of scripts.entries()) {
  try {
    new Function(match[1]);
    console.log("ok  script inline " + (index + 1) + " compila");
  } catch (error) {
    failures += 1;
    console.log("FALLA  script inline " + (index + 1) + ": " + error.message);
  }
}

if (failures) {
  console.log("\n" + failures + " comprobación(es) FALLAN");
  process.exit(1);
}
console.log("\nCONTRATO ESTÁTICO VERDE — la conducta y la geometría real se validan en verificar_pagina.py");
