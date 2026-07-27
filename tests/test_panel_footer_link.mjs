#!/usr/bin/env node
/*
  Sensor de colocación: el acceso al Panel debe vivir dentro del hub del pie,
  junto a las demás webs. Un enlace equivalente en otra zona no pasa.
*/
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(join(ROOT, "index.html"), "utf8");
const hubStart = html.indexOf('<nav id="cmWebHub"');
const hubEnd = html.indexOf("</nav>", hubStart);
const hub = hubStart >= 0 && hubEnd > hubStart ? html.slice(hubStart, hubEnd + 6) : "";

let failures = 0;
function check(name, condition, detail = "") {
  if (condition) console.log("  ok    " + name);
  else {
    failures++;
    console.log("  FALLA " + name + (detail ? "\n          -> " + detail : ""));
  }
}

console.log("\nPANEL EN EL PIE - acceso exacto dentro del hub de webs");
check("existe el hub inferior #cmWebHub", hub.length > 0);
check("el hub conserva cinco tarjetas", (hub.match(/class="cmWebLink"/g) || []).length === 5,
  "tarjetas=" + (hub.match(/class="cmWebLink"/g) || []).length);

const panelAnchor = hub.match(/<a class="cmWebLink"[^>]*data-cm-project="panel-tony"[^>]*>[\s\S]*?<\/a>/)?.[0] || "";
check("la tarjeta panel-tony está DENTRO del hub", panelAnchor.length > 0);
check("abre el Panel público exacto en otra pestaña",
  /href="https:\/\/panel-tony-online\.vercel\.app\/"/.test(panelAnchor) &&
  /target="_blank"/.test(panelAnchor) && /rel="[^"]*noopener[^"]*"/.test(panelAnchor));
check("el nombre y apoyo son visibles",
  panelAnchor.includes("Panel privado de Tony") && panelAnchor.includes("Centro de mando · solo Tony"));
check("la versión y el primer cambio son v1.85",
  html.includes('window.__cmVersion="v1.85"') &&
  /var cambios=\[\s*\{[^}]*v1\.85/.test(html));
check("el tour ya no promete cuatro proyectos públicos",
  !html.includes("Cuatro proyectos públicos, juntos y a un toque.") &&
  !html.includes("Four public projects, together and one tap away."));
check("reducir movimiento anula elevación salvo opt-in",
  html.includes("@media(prefers-reduced-motion:reduce){body:not(.cmMotionOn) .cmWebLink{transition:none}body:not(.cmMotionOn) .cmWebLink:hover{transform:none}}") &&
  html.includes("body.cmMotionOff .cmWebLink{transition:none!important}body.cmMotionOff .cmWebLink:hover{transform:none!important}"));

console.log(failures ? `\n${failures} comprobacion(es) FALLAN\n` : "\nTODO VERDE - el Panel está abajo con las demás webs\n");
process.exit(failures ? 1 : 0);
