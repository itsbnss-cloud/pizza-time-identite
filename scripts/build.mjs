// Génère le site (dist/) et la source HTML du PDF (build/print.html)
// à partir de content/brand.mjs et du manifeste des assets.
import fs from 'fs';
import path from 'path';
import { tokensCss, fontFaceCss, mockupCss } from '../src/shared.mjs';
import { renderSite } from '../src/site/template.mjs';
import { renderPrint } from '../src/print/template.mjs';
import { sweepAppleDouble } from './sweep.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIST = path.join(ROOT, 'dist');
const BUILD = path.join(ROOT, 'build');
const FONTS_SRC = path.resolve(ROOT, '../Polices');
const r = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

// Conserver un PDF déjà généré pendant la reconstruction du site
const pdfDir = path.join(DIST, 'telechargements');
const keep = fs.existsSync(pdfDir) ? fs.readdirSync(pdfDir).filter((f) => f.endsWith('.pdf')).map((f) => [f, fs.readFileSync(path.join(pdfDir, f))]) : [];
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(path.join(DIST, 'fonts'), { recursive: true });
fs.mkdirSync(pdfDir, { recursive: true });
fs.mkdirSync(BUILD, { recursive: true });
keep.forEach(([f, b]) => fs.writeFileSync(path.join(pdfDir, f), b));

// Assets : logos organisés (sans les fichiers techniques macOS)
for (const d of ['logos', 'mockups', 'plv', 'pictos', 'motifs']) fs.cpSync(path.join(ROOT, 'assets', d), path.join(DIST, 'assets', d), { recursive: true, filter: (s) => !path.basename(s).startsWith('._') && !s.endsWith('.DS_Store') });

// Polices : utilisées par les pages, jamais proposées en téléchargement
const fontMap = { 'Avigea.otf': 'Avigea.otf', 'Avigea Italic.otf': 'Avigea-Italic.otf', 'MADE Dillan PERSONAL USE.otf': 'MADE-Dillan.otf' };
for (const [src, dest] of Object.entries(fontMap)) fs.copyFileSync(path.join(FONTS_SRC, src), path.join(DIST, 'fonts', dest));

// Site
fs.writeFileSync(path.join(DIST, 'styles.css'), `${tokensCss()}\n${fontFaceCss('fonts')}\n${mockupCss}\n${r('src/site/site.css')}`);
fs.copyFileSync(path.join(ROOT, 'src/site/site.js'), path.join(DIST, 'site.js'));
fs.writeFileSync(path.join(DIST, 'index.html'), renderSite());
fs.writeFileSync(path.join(DIST, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
fs.writeFileSync(path.join(DIST, '.nojekyll'), '');

// Source du PDF
const { html, total } = renderPrint();
fs.writeFileSync(path.join(BUILD, 'print.html'), `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Pizza Time — Charte graphique</title>
<style>${tokensCss()}\n${fontFaceCss('../dist/fonts')}\n${mockupCss}\n${r('src/print/print.css')}</style></head><body>${html}</body></html>`);

sweepAppleDouble(DIST);
console.log(`✓ site → dist/index.html · PDF source → build/print.html (${total} pages)`);
