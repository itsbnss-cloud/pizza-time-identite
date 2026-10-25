// Contrôle du site : débordements horizontaux, liens et téléchargements, copie,
// navigation clavier, captures à plusieurs largeurs.
// Usage : node tools/check-site.mjs [url] [dossier-captures]
import { chromium } from 'playwright';
const url = process.argv[2] || 'http://localhost:4173/';
const out = process.argv[3];
const b = await chromium.launch();
const results = [];
for (const [name, w, h] of [['desktop', 1440, 900], ['tablette', 820, 1180], ['mobile', 375, 812]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, permissions: ['clipboard-read', 'clipboard-write'] });
  const p = await ctx.newPage();
  const errors = [];
  p.on('pageerror', (e) => errors.push(e.message));
  p.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  await p.goto(url, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  // révéler tout le contenu animé
  await p.evaluate(() => document.querySelectorAll('.reveal').forEach((e) => e.classList.add('is-in')));
  const overflow = await p.evaluate(() => {
    const W = document.documentElement.clientWidth;
    const bad = [];
    document.querySelectorAll('body *').forEach((el) => { const r = el.getBoundingClientRect(); if (r.width && (r.right > W + 1 || r.left < -1) && !el.closest('.hero__logo, .bar, .horiz-img, .compare, .mk, .tests__imgs, svg')) bad.push(`${el.tagName}.${el.className}`.slice(0, 60)); });
    return { scrollW: document.documentElement.scrollWidth, W, bad: [...new Set(bad)].slice(0, 10) };
  });
  results.push({ name, overflow, errors });
  if (out) await p.screenshot({ path: `${out}/site-${name}.png`, fullPage: true });
  await ctx.close();
}
// Liens, téléchargements, copie, clavier (desktop)
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, permissions: ['clipboard-read', 'clipboard-write'] });
const p = await ctx.newPage();
await p.goto(url, { waitUntil: 'networkidle' });
const hrefs = await p.evaluate(() => [...new Set([...document.querySelectorAll('a[href], img[src], link[href], [data-svg], [data-png], select option[data-src]')].map((e) => e.getAttribute('href') || e.getAttribute('src') || e.dataset.svg || e.dataset.png || e.dataset.src).concat([...document.querySelectorAll('[data-png]')].map((e) => e.dataset.png)))]);
const broken = [];
for (const h of hrefs) {
  if (h.startsWith('#')) { if (!(await p.$(h))) broken.push(h); continue; }
  const r = await p.request.get(new URL(h, url).href);
  if (r.status() !== 200) broken.push(`${r.status()} ${h}`);
}
const dlAttr = await p.evaluate(() => [...document.querySelectorAll('a[download]')].filter((a) => !a.getAttribute('href')).length);
const fontsOffered = await p.evaluate(() => [...document.querySelectorAll('a')].filter((a) => /\.(otf|ttf|woff2?)$/i.test(a.getAttribute('href') || '')).length);
// Téléchargement réel du PDF
const [dl] = await Promise.all([p.waitForEvent('download'), p.click('.hero__pdf')]);
const pdfName = dl.suggestedFilename();
// Copie d'un code couleur
await p.click('[data-copy="#C72F27"]');
const clip = await p.evaluate(() => navigator.clipboard.readText());
// Clavier : lien d'évitement puis barre visible au focus
await p.goto(url, { waitUntil: 'networkidle' });
await p.keyboard.press('Tab');
const skip = await p.evaluate(() => document.activeElement.className);
await p.keyboard.press('Tab');
const barFocus = await p.evaluate(() => getComputedStyle(document.querySelector('.bar')).transform);
// Sélecteur horizontales au clavier
await p.focus('.swatch[aria-checked="true"]');
await p.keyboard.press('ArrowRight');
const horiz = await p.evaluate(() => document.querySelector('[data-horiz-label]').textContent);
// Sélecteur de fonds
await p.selectOption('[data-grounds-select]', 'logo-sans-cadre');
const flags = await p.evaluate(() => [...document.querySelectorAll('[data-flag]')].map((f) => f.textContent).join(' / '));
// Animation réduite
const ctxR = await b.newContext({ reducedMotion: 'reduce' });
const pr = await ctxR.newPage();
await pr.goto(url, { waitUntil: 'networkidle' });
const reducedOpacity = await pr.evaluate(() => getComputedStyle(document.querySelector('.reveal')).opacity);
console.log(JSON.stringify({ results, links: hrefs.length, broken, dlAttr, fontsOffered, pdfName, clip, skip, barFocus, horiz, flags, reducedOpacity }, null, 1));
await b.close();
