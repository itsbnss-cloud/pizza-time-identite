// Captures section par section : node tools/shots.mjs url largeur dossier
import { chromium } from 'playwright';
const [,, url, w, out] = process.argv;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: +w, height: 900 } });
await p.goto(url, { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
await p.evaluate(() => document.querySelectorAll('.reveal').forEach((e) => e.classList.add('is-in')));
await p.addStyleTag({ content: '.bar,.toast{display:none!important}' });
await p.waitForTimeout(900);
const n = await p.evaluate(() => document.querySelectorAll('main > section, footer.foot').length);
for (let i = 0; i < n; i++) {
  const el = (await p.$$('main > section, footer.foot'))[i];
  await el.screenshot({ path: `${out}/w${w}-${String(i).padStart(2, '0')}.png` });
}
console.log(n, 'sections');
await b.close();
