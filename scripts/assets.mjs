// Organisation et harmonisation des fichiers de logo.
// - Lit le dossier SVG d'origine sans jamais l'écrire.
// - Écrit des copies dans assets/logos/<catégorie>/ avec :
//     · couleurs ramenées sur la palette du fichier 11 (COLOR_MAP) ;
//     · styles <style>/.cls-* convertis en attributs fill (aucune collision
//       quand plusieurs logos partagent une page) ;
//     · identifiants préfixés par l'id de l'asset ;
//     · tracés, viewBox et compositions inchangés.
// - Exporte un PNG transparent (3000 px de large) par version validée.
// - Écrit la table de correspondance et le journal des remplacements.
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { chromium } from 'playwright';
import { sweepAppleDouble } from './sweep.mjs';
import { ASSETS, OLD_LOGO, SOURCE_DIR, OLD_LOGO_SRC, COLOR_MAP, DEFAULT_FILL, MOCKUPS, MOCKUP_DIR, GRAPHICS_DIR, ICONS, MOTIFS, PLV_DIR, PLV } from '../content/assets.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.resolve(ROOT, SOURCE_DIR);
const OUT = path.join(ROOT, 'assets/logos');
const GEN = path.join(ROOT, 'content/generated');

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(GEN, { recursive: true });

const pathsOf = (svg) => [...svg.matchAll(/ d="([^"]+)"/g)].map((m) => m[1]).join('|');
const log = [];

function harmonize(svg, asset) {
  // 1. Table classe → couleur d'origine
  const classFill = {};
  const style = svg.match(/<style>([\s\S]*?)<\/style>/);
  if (style) {
    for (const rule of style[1].matchAll(/([^{}]+)\{([^}]*)\}/g)) {
      const fill = rule[2].match(/fill:\s*(#[0-9a-fA-F]{3,6})/);
      if (!fill) continue;
      for (const c of rule[1].match(/cls-\d+/g) || []) classFill[c] = fill[1].toLowerCase();
    }
  }
  const counts = {};
  const record = (from, to) => {
    const k = `${from}→${to}`;
    counts[k] = (counts[k] || 0) + 1;
  };
  // 2. Chaque forme reçoit un attribut fill explicite
  let out = svg.replace(/<(path|rect|polygon|circle|ellipse)\b([^>]*?)(\/?)>/g, (m, tag, attrs, close) => {
    const cls = attrs.match(/\sclass="([^"]+)"/);
    let from = null;
    if (cls) for (const c of cls[1].split(/\s+/)) if (classFill[c]) from = classFill[c];
    let to;
    if (from) {
      to = COLOR_MAP[from];
      if (!to) throw new Error(`${asset.src} : couleur hors table ${from}`);
    } else {
      from = '(aucune — noir par défaut)';
      to = DEFAULT_FILL;
    }
    record(from, to);
    const rest = attrs.replace(/\sclass="[^"]*"/, '');
    return `<${tag} fill="${to}"${rest}${close}>`;
  });
  // 3. Suppression du bloc de styles devenu inutile
  out = out.replace(/\s*<defs>\s*<style>[\s\S]*?<\/style>\s*<\/defs>/, '');
  // 4. Identifiants uniques
  out = out.replace(/id="Calque_2"/, `id="${asset.id}"`).replace(/id="Calque_1-2"/g, `id="${asset.id}-calque"`);
  // 5. Accessibilité
  out = out.replace(/<svg ([^>]*)>/, (m, a) => `<svg ${a} role="img" aria-labelledby="${asset.id}-titre"><title id="${asset.id}-titre">Pizza Time — ${asset.label}</title>`);
  for (const [k, n] of Object.entries(counts)) {
    const [from, to] = k.split('→');
    log.push({ src: asset.src, file: asset.file, from, to, n, changed: from.toLowerCase() !== to.toLowerCase() });
  }
  if (pathsOf(out) !== pathsOf(svg)) throw new Error(`${asset.src} : tracés modifiés !`);
  return out;
}

const manifest = [];
for (const a of ASSETS) {
  const entry = { ...a };
  if (a.status !== 'exclu') {
    const src = fs.readFileSync(path.join(SRC, a.src), 'utf8');
    const dest = path.join(OUT, a.dir, a.file);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const svg = a.keepAsIs ? src : harmonize(src, a);
    fs.writeFileSync(dest, svg);
    const vb = src.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number);
    entry.path = `logos/${a.dir}/${a.file}`;
    entry.width = vb[2];
    entry.height = vb[3];
    entry.ratio = +(vb[2] / vb[3]).toFixed(4);
  }
  manifest.push(entry);
}

// Ancien logo : copie conforme, aucune retouche
fs.mkdirSync(path.join(OUT, OLD_LOGO.dir), { recursive: true });
fs.copyFileSync(path.resolve(ROOT, OLD_LOGO_SRC), path.join(OUT, OLD_LOGO.dir, OLD_LOGO.file));
manifest.push({ ...OLD_LOGO, src: path.basename(OLD_LOGO_SRC), path: `logos/${OLD_LOGO.dir}/${OLD_LOGO.file}`, width: 512, height: 351, ratio: 1.4587 });

// PNG transparents des versions validées
const browser = await chromium.launch();
const page = await browser.newPage();
for (const e of manifest.filter((m) => m.status === 'valide')) {
  const svg = fs.readFileSync(path.join(OUT, e.dir, e.file), 'utf8');
  const W = 3000, H = Math.round(W / e.ratio);
  await page.setViewportSize({ width: W, height: H });
  await page.setContent(`<html><body style="margin:0;background:transparent"><img style="display:block;width:${W}px;height:${H}px" src="data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}"></body></html>`);
  const png = e.file.replace(/\.svg$/, '_3000px.png');
  fs.mkdirSync(path.join(OUT, e.dir, 'png'), { recursive: true });
  await page.screenshot({ path: path.join(OUT, e.dir, 'png', png), omitBackground: true });
  e.png = `logos/${e.dir}/png/${png}`;
}
await browser.close();

// Pictogrammes et motifs du designer : copies conformes renommées
const copyGraphics = (list, dir) => {
  const out = path.join(ROOT, 'assets', dir);
  fs.rmSync(out, { recursive: true, force: true });
  fs.mkdirSync(out, { recursive: true });
  return list.map((g) => {
    const src = fs.readFileSync(path.resolve(ROOT, GRAPHICS_DIR, g.src), 'utf8');
    fs.writeFileSync(path.join(out, g.file), src);
    const [, , width, height] = src.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number);
    return { ...g, path: `${dir}/${g.file}`, width, height };
  });
};
const icons = copyGraphics(ICONS, 'pictos');
const motifs = copyGraphics(MOTIFS, 'motifs');
fs.rmSync(path.join(ROOT, 'assets/patterns'), { recursive: true, force: true });

// Visuels photographiques : copies JPEG (réduction seulement) via sips (macOS)
const dims = (f) => { const t = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', f]).toString(); return [+t.match(/pixelWidth: (\d+)/)[1], +t.match(/pixelHeight: (\d+)/)[1]]; };
const copyPhotos = (list, srcDir, dir, max) => {
  const out = path.join(ROOT, 'assets', dir);
  fs.rmSync(out, { recursive: true, force: true });
  fs.mkdirSync(out, { recursive: true });
  const res = list.map((m) => {
    const src = path.resolve(ROOT, srcDir, m.src), dest = path.join(out, m.file);
    const resize = Math.max(...dims(src)) > max ? ['-Z', String(max)] : [];
    execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '84', ...resize, src, '--out', dest], { stdio: 'ignore' });
    const [width, height] = dims(dest);
    return { ...m, path: `${dir}/${m.file}`, width, height };
  });
  sweepAppleDouble(out);
  return res;
};
const mockups = copyPhotos(MOCKUPS, MOCKUP_DIR, 'mockups', 2000);
const plv = copyPhotos(PLV, PLV_DIR, 'plv', 2600);


// Packs ZIP (versions validées / kit composants)
const zip = (name, dirs) => {
  const target = path.join(OUT, name);
  execFileSync('zip', ['-rqX', target, ...dirs, '-x', '*.DS_Store', '*/._*', '._*'], { cwd: OUT });
  return `logos/${name}`;
};
const packs = {
  pictos: (() => { execFileSync('zip', ['-rqXj', path.join(OUT, 'pizza-time_pictogrammes.zip'), ...icons.map((p) => path.join(ROOT, 'assets', p.path))]); return 'logos/pizza-time_pictogrammes.zip'; })(),
  motifs: (() => { execFileSync('zip', ['-rqXj', path.join(OUT, 'pizza-time_motifs.zip'), ...motifs.map((p) => path.join(ROOT, 'assets', p.path))]); return 'logos/pizza-time_motifs.zip'; })(),
  logos: zip('pizza-time_logos-valides.zip', ['01_logo-principal', '02_declinaisons']),
  composants: zip('pizza-time_kit-composants.zip', ['03_composants']),
};

sweepAppleDouble(OUT);
fs.writeFileSync(path.join(GEN, 'manifest.json'), JSON.stringify({ assets: manifest, mockups, plv, icons, motifs, packs, colorLog: log }, null, 2));

// Documentation : table de correspondance + journal des remplacements
const statusLabel = { valide: 'Validé', composant: 'Composant', alternative: 'Alternative non validée', reference: 'Référence (copie conforme)', exclu: 'Exclu' };
let md = `# Table de correspondance des fichiers\n\nDossier source : \`SVG/\` (inchangé). Copies organisées : \`assets/logos/\`.\n\n| Fichier d'origine | Statut | Nouveau fichier | Description |\n|---|---|---|---|\n`;
for (const e of manifest) md += `| ${e.src} | ${statusLabel[e.status]} | ${e.path ? '`' + e.path.replace('logos/', '') + '`' : '—'} | ${e.label} |\n`;
md += `\n# Journal des remplacements de couleurs\n\nRéférence unique : « Fichier 11pizza time.svg » — vert #0E4725, rouge #C72F27, crème #FFF6E9.\nSeules les copies sont modifiées. L'ancien logo et la palette de référence sont copiés sans retouche.\n\n| Fichier d'origine | Couleur d'origine | Couleur appliquée | Formes concernées |\n|---|---|---|---|\n`;
for (const l of log.filter((x) => x.changed)) md += `| ${l.src} | ${l.from} | ${l.to} | ${l.n} |\n`;
md += `\nCouleurs déjà conformes (non modifiées) : ${[...new Set(log.filter((x) => !x.changed).map((x) => x.from.toUpperCase()))].join(', ')}.\n\nAutres traitements techniques des copies (sans effet sur le dessin) : styles internes \`.cls-*\` convertis en attributs \`fill\`, identifiants \`Calque_*\` renommés d'après le fichier, ajout d'un titre accessible. Les tracés \`d\` sont vérifiés identiques à l'original lors de chaque génération.\n`;
md += `\n# Visuels de mise en situation\n\nDossier source : \`Mokcups/\` (inchangé). Copies JPEG : \`assets/mockups/\`.\n\n| Fichier d'origine | Nouveau fichier | Description |\n|---|---|---|\n` + mockups.map((m) => `| ${m.src} | \`${m.file}\` | ${m.label} |`).join('\n') + '\n';
md += `\n# Pictogrammes, motifs et PLV\n\nCopies conformes (aucune retouche) depuis \`Patern + Icones/\` et \`Visuels PLV/\`.\n\n| Fichier d'origine | Nouveau fichier |\n|---|---|\n` + [...icons, ...motifs, ...plv].map((g) => `| ${g.src} | \`${g.path}\` |`).join('\n') + '\n';
fs.writeFileSync(path.join(ROOT, 'assets/CORRESPONDANCE.md'), md);
fs.writeFileSync(path.join(ROOT, 'assets/remplacements-couleurs.csv'), 'fichier_origine;nouveau_fichier;couleur_origine;couleur_appliquee;formes\n' + log.filter((x) => x.changed).map((l) => `${l.src};${l.file};${l.from};${l.to};${l.n}`).join('\n') + '\n');

console.log(`✓ ${manifest.filter((m) => m.path).length} fichiers organisés, ${log.filter((x) => x.changed).length} remplacements consignés`);
