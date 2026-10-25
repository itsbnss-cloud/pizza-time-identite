// Fonctions partagées par le site et le PDF : accès aux assets, jetons de
// couleur, @font-face et maquettes d'application.
import fs from 'fs';
import path from 'path';
import * as brand from '../content/brand.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
export const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'content/generated/manifest.json'), 'utf8'));
export const asset = (id) => {
  const a = manifest.assets.find((x) => x.id === id);
  if (!a) throw new Error(`Asset inconnu : ${id}`);
  return a;
};
export const byStatus = (s) => manifest.assets.filter((a) => a.status === s);
export const mockup = (id) => {
  const m = manifest.mockups.find((x) => x.id === id);
  if (!m) throw new Error(`Visuel inconnu : ${id}`);
  return m;
};
export const photo = (id, base, { cls = '', alt, loading = 'lazy' } = {}) => {
  const m = mockup(id);
  return `<img class="${cls}" src="${base}/${m.path}" width="${m.width}" height="${m.height}" alt="${esc(alt ?? m.label)}" loading="${loading}" decoding="async">`;
};
export const color = (id) => brand.palette.find((p) => p.id === id);
export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// <img> vectoriel ; base = préfixe vers le dossier « assets »
export const img = (id, base, { cls = '', alt, style = '' } = {}) => {
  const a = asset(id);
  const label = alt ?? `Pizza Time — ${a.label}`;
  return `<img class="${cls}" src="${base}/${a.path}" width="${Math.round(a.width)}" height="${Math.round(a.height)}" alt="${esc(label)}"${style ? ` style="${style}"` : ''} decoding="async">`;
};

// Recadrage vectoriel d'un logo via un SVG englobant (détails agrandis)
export const crop = (id, base, view, label) => {
  const a = asset(id);
  return `<svg class="crop" viewBox="${view.join(' ')}" style="aspect-ratio:${view[2]}/${view[3]}" role="img" aria-label="${esc(label)}" preserveAspectRatio="xMidYMid meet"><image href="${base}/${a.path}" width="${a.width}" height="${a.height}"/></svg>`;
};

// Anatomie du logo principal : logo + repères numérotés hors du dessin, en un seul SVG
export const anatomySvg = (base) => {
  const a = asset('logo-principal');
  const red = color('red').hex, cream = color('cream').hex;
  const marks = brand.anatomy.map((p) => `<g><line x1="${p.pin[0]}" y1="${p.pin[1]}" x2="${p.target[0]}" y2="${p.target[1]}" stroke="${red}" stroke-width="4"/><circle cx="${p.target[0]}" cy="${p.target[1]}" r="11" fill="${red}" stroke="${cream}" stroke-width="5"/><circle cx="${p.pin[0]}" cy="${p.pin[1]}" r="44" fill="${red}"/><text x="${p.pin[0]}" y="${p.pin[1] + 16}" text-anchor="middle" font-family="Avigea, Georgia, serif" font-size="48" fill="${cream}">${p.n}</text></g>`).join('');
  return `<svg class="anat-svg" viewBox="-200 -170 1960 1450" role="img" aria-label="Anatomie du logo principal : ${brand.anatomy.map((p) => `${p.n}, ${p.t}`).join(' ; ')}"><image href="${base}/${a.path}" width="${a.width}" height="${a.height}"/>${marks}</svg>`;
};

// Aplat de motif : le raccord SVG répété en fond (taille d'affichage du raccord en CSS)
export const patternSwatch = (p, base, cls = 'pat') => `<div class="${cls}" role="img" aria-label="Motif ${esc(p.label)} : ${esc(p.desc)}" style="background-image:url('${base}/${p.path}');--tw:${p.w};--th:${p.h}"></div>`;

export const tokensCss = () => `:root{${brand.palette.map((p) => `--${p.id}:${p.hex};`).join('')}--font-title:'Avigea',Georgia,serif;--font-text:'MADE Dillan',Georgia,serif}`;

export const fontFaceCss = (base) => `
@font-face{font-family:'Avigea';src:url('${base}/Avigea.otf') format('opentype');font-style:normal;font-display:swap}
@font-face{font-family:'Avigea';src:url('${base}/Avigea-Italic.otf') format('opentype');font-style:italic;font-display:swap}
@font-face{font-family:'MADE Dillan';src:url('${base}/MADE-Dillan.otf') format('opentype');font-display:swap}`;

export const rgbStr = (p) => p.rgb.join(' · ');
export const cmykStr = (p) => p.cmyk.join(' · ');

export { brand };
