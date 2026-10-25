// Mesure des éléments du dessin (bbox en unités du viewBox) pour fonder les règles.
import { chromium } from 'playwright';
import fs from 'fs';
const files = { principal: 'assets/logos/01_logo-principal/pizza-time_logo-principal.svg', horiz: 'assets/logos/02_declinaisons/pizza-time_horizontal_vert.svg', sanscadre: 'assets/logos/02_declinaisons/pizza-time_logo-sans-cadre.svg', lineaire: 'assets/logos/02_declinaisons/pizza-time_signature-lineaire_creme.svg' };
const b = await chromium.launch(); const p = await b.newPage();
for (const [k, f] of Object.entries(files)) {
  await p.setContent(fs.readFileSync(f, 'utf8'));
  const r = await p.evaluate(() => { const groups = {}; document.querySelectorAll('path').forEach(el => { const fill = el.getAttribute('fill'); const bb = el.getBBox(); if (bb.width < 5) return; (groups[fill] ||= []).push([+bb.x.toFixed(1), +bb.y.toFixed(1), +bb.width.toFixed(1), +bb.height.toFixed(1)]); }); return { vb: document.querySelector('svg').getAttribute('viewBox'), groups }; });
  console.log('##', k, r.vb); for (const [fill, l] of Object.entries(r.groups)) console.log(fill, JSON.stringify(l));
}
await b.close();
