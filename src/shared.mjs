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

// ---- Maquettes d'application (HTML/CSS à plat, mises à l'échelle par container queries)
export const mockups = (base) => {
  const m = brand.applications.menu;
  return {
    post: `<div class="mk mk-post" role="img" aria-label="Simulation : publication carrée pour les réseaux sociaux"><div class="mk-post__in">
      ${img('logo-principal', base, { cls: 'mk-post__logo', alt: '' })}
      <p class="mk-post__label">Nouvelle identité</p>
    </div></div>`,
    story: `<div class="mk mk-story" role="img" aria-label="Simulation : story verticale avec extrait de carte"><div class="mk-story__in">
      <div class="mk-story__head">${img('logo-sans-cadre', base, { cls: 'mk-story__logo', alt: '' })}</div>
      <p class="mk-story__kicker">La carte</p>
      <ul class="mk-story__list">${m.map((x) => `<li><span class="mk-story__name">${x.name}</span><span class="mk-story__desc">${x.desc}</span><span class="mk-story__price">${x.price}</span></li>`).join('')}</ul>
      <div class="mk-story__promo"><span>Offre du moment</span></div>
      ${img('mention-vert', base, { cls: 'mk-story__mention', alt: '' })}
    </div></div>`,
  };
};

export const mockupCss = `
.mk{container-type:inline-size;position:relative;overflow:hidden;font-family:var(--font-text)}
.mk img{display:block;max-width:none}
/* Publication */
.mk-post{aspect-ratio:1/1;background:var(--red)}
.mk-post__in{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5cqw}
.mk-post__logo{width:62cqw;height:auto}
.mk-post__label{margin:0;color:var(--cream);font-size:4.4cqw;letter-spacing:.12em;text-transform:uppercase}
/* Story */
.mk-story{aspect-ratio:9/16;background:var(--cream);color:var(--green)}
.mk-story__in{position:absolute;inset:0;padding:10cqw 8cqw 8cqw;display:flex;flex-direction:column}
.mk-story__head{display:flex;justify-content:center;margin-bottom:9cqw}
.mk-story__logo{width:52cqw;height:auto}
.mk-story__kicker{margin:0 0 4cqw;font-size:4.6cqw;letter-spacing:.12em;text-transform:uppercase;color:var(--red);text-align:center}
.mk-story__list{list-style:none;margin:0;padding:0;display:grid;gap:6cqw}
.mk-story__list li{display:grid;grid-template-columns:1fr auto;column-gap:3cqw;border-top:.4cqw solid var(--green);padding-top:3cqw}
.mk-story__name{font-family:var(--font-title);font-size:8.6cqw;line-height:1.05}
.mk-story__price{font-size:6.4cqw;color:var(--red);grid-row:1;grid-column:2;align-self:center}
.mk-story__desc{font-size:3.9cqw;grid-column:1/-1;margin-top:1cqw}
.mk-story__promo{margin-top:auto;background:var(--green);color:var(--cream);border-radius:2cqw;padding:4cqw;text-align:center}
.mk-story__promo span{font-family:var(--font-title);font-style:italic;font-size:9cqw}
.mk-story__mention{width:34cqw;height:auto;margin:6cqw auto 0}
`;

export { brand };
