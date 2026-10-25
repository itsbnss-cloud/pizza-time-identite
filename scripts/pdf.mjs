// Génère la charte PDF depuis build/print.html avec Chromium (Playwright),
// après un contrôle automatique des débordements page par page.
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { chromium } from 'playwright';
import { meta } from '../content/brand.mjs';
import { sweepAppleDouble } from './sweep.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const src = path.join(ROOT, 'build/print.html');
const out = path.join(ROOT, 'dist/telechargements', meta.pdfFile);
if (!fs.existsSync(src)) throw new Error('Lancer « npm run build » avant « npm run pdf ».');

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(pathToFileURL(src).href, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.emulateMedia({ media: 'print' });

// Contrôle : aucun élément visible ne doit sortir de sa page ni de la zone de marges
const issues = await page.evaluate(() => {
  const mm = 96 / 25.4;
  const res = [];
  document.querySelectorAll('.pg').forEach((pg) => {
    const pr = pg.getBoundingClientRect();
    const bleed = pg.classList.contains('pg--bleed');
    pg.querySelectorAll('*').forEach((el) => {
      if (el.closest('.mk, .crop, .toc__frame, .off__art--pat, .pat--grid') && !el.matches('.mk, .crop')) return;
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') return;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const tol = 0.5;
      const out = r.left < pr.left - tol || r.right > pr.right + tol || r.top < pr.top - tol || r.bottom > pr.bottom + tol;
      // Texte coupé : contenu plus haut que sa boîte avec overflow masqué
      const clipped = (cs.overflow === 'hidden' || cs.overflowY === 'hidden') && el.scrollHeight > el.clientHeight + 2 && !el.matches('.pg, .mk, .dont, .det__win, .off__art, .pat--grid');
      // Marges : hors pages à fond perdu, le texte reste à 16 mm des bords (folio excepté)
      let margin = false;
      if (!bleed && !el.closest('.folio') && el.childNodes.length && [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) {
        margin = r.left < pr.left + 16 * mm - 1 || r.right > pr.right - 16 * mm + 1 || r.top < pr.top + 16 * mm - 1 || r.bottom > pr.bottom - 16 * mm + 1;
      }
      if ((out && !el.closest('.toc__frame')) || clipped || margin) res.push({ page: pg.dataset.page, el: el.className || el.tagName, out, clipped, margin, text: (el.textContent || '').trim().slice(0, 40) });
    });
  });
  return res;
});
if (issues.length) {
  console.warn(`⚠ ${issues.length} alerte(s) de mise en page :`);
  issues.slice(0, 40).forEach((i) => console.warn(`  p.${i.page} ${i.el} ${i.out ? '[hors page]' : ''}${i.clipped ? '[coupé]' : ''}${i.margin ? '[marge]' : ''} « ${i.text} »`));
}

await page.pdf({ path: out, width: '297mm', height: '210mm', printBackground: true, preferCSSPageSize: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
await browser.close();
sweepAppleDouble(path.dirname(out));
const kb = (fs.statSync(out).size / 1024).toFixed(0);
console.log(`✓ PDF → ${path.relative(ROOT, out)} (${kb} Ko)`);
if (issues.length && process.argv.includes('--strict')) process.exit(1);
