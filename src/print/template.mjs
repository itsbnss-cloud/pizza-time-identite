// Gabarit de la charte PDF — A4 paysage (297 × 210 mm), une <section> par page.
import { brand, asset, byStatus, color, esc, img, crop, rgbStr, cmykStr, manifest, anatomySvg, mockup, photo } from '../shared.mjs';

const A = '../dist/assets';
const { meta, palette, context, comparison, anatomy, details, sections } = brand;
const groundName = { cream: 'Crème', green: 'Vert', red: 'Rouge' };
const validated = byStatus('valide');
const horizontals = validated.filter((a) => a.family === 'horizontal');
const sec = (id) => sections.find((s) => s.id === id);
const kicker = (id, txt) => `<p class="k"><span class="k__n">${sec(id).n}</span>${txt ?? sec(id).t}</p>`;

export function renderPrint() {
  const main = asset('logo-principal');
  const pages = [];
  // bg : fond de page ; sid : section (sommaire) ; folio : affiche la pagination
  const page = (bg, sid, body, { folio = true, cls = '' } = {}) => pages.push({ bg, sid, body, folio, cls });

  // 1 — Couverture
  page('green', null, `
    <div class="cover">
      <div class="cover__logo">${img('logo-principal', A)}</div>
      <div class="cover__band">
        <p class="cover__title">${meta.docTitle}</p>
        <p class="cover__meta"><span>${meta.title}</span><span>${meta.version}</span><span>${meta.date}</span></p>
      </div>
    </div>`, { folio: false, cls: 'pg--bleed' });

  // 2 — Sommaire (rempli plus bas, une fois les pages numérotées)
  page('cream', null, '__TOC__', { cls: 'pg--toc' });

  // 3 — Contexte
  page('cream', 'contexte', `
    <div class="ctx">
      <div class="ctx__top">
        <div>${kicker('contexte', 'Contexte & objectifs')}<h2 class="t1">Moderniser, sans perdre ses repères.</h2></div>
        <p class="lead">${context.lead}</p>
      </div>
      <div class="vals">
        <p class="lbl">Valeurs à traduire</p>
        ${context.values.map((v) => `<div class="val"><p class="val__n">${v.name}</p><p>${v.text}</p></div>`).join('')}
      </div>
    </div>`);

  // 4 — Objectifs
  page('green', 'contexte', `
    ${kicker('contexte', 'Objectifs de la refonte')}
    <ol class="goals">${context.goals.map((g, i) => `<li><span class="goals__n">${String(i + 1).padStart(2, '0')}</span><strong>${g.t}</strong><span>${g.d}</span></li>`).join('')}</ol>
    <div class="themes">
      <p class="lbl lbl--cream">Pistes du brief</p>
      <p class="themes__l">${context.themes.join('<span> · </span>')}</p>
      <p class="sm">${context.themesNote}</p>
    </div>`);

  // 5 — Avant / après
  page('cream', 'avant-apres', `
    <div class="head-row">${kicker('avant-apres', 'Avant / après')}<h2 class="t2">Un même héritage, un dessin repensé.</h2></div>
    <div class="ba">
      <figure class="ba__pane"><span class="ba__tag">Avant</span><div class="ba__art"><span class="ba__old" style="background-image:url('${A}/${asset('ancien-logo').path}')" role="img" aria-label="Ancien logo"></span></div><figcaption>${comparison.oldCaption}</figcaption></figure>
      <figure class="ba__pane"><span class="ba__tag ba__tag--new">Après</span><div class="ba__art">${img('logo-principal', A, { cls: 'ba__new' })}</div><figcaption>${comparison.newCaption}</figcaption></figure>
    </div>`);

  // Sur le terrain — une page par paire avant / simulation
  brand.field.pairs.forEach((pr, i) => {
    page('green', 'avant-apres', `
      <div class="head-row">${kicker('avant-apres', brand.field.title)}<h2 class="t2">${i === 0 ? 'La façade, avant et après.' : 'Même rue, nouvelle identité.'}</h2></div>
      <div class="fld">
        <figure class="fld__i"><span class="ba__tag">Avant</span>${photo(pr.before, A, { loading: 'eager' })}<figcaption>Photo de la façade existante.</figcaption></figure>
        <figure class="fld__i"><span class="ba__tag ba__tag--new">Simulation</span>${photo(pr.after, A, { loading: 'eager' })}<figcaption>${pr.caption}</figcaption></figure>
      </div>
      ${i === brand.field.pairs.length - 1 ? `<p class="sim">${brand.mockupsNote}</p>` : `<p class="sim">${brand.field.lead}</p>`}`);
  });

  // 6 — Le logo principal (démonstration)
  page('red', 'logo', `
    <div class="demo">
      ${kicker('logo', 'Le logo principal')}
      <div class="demo__logo">${img('logo-principal', A)}</div>
      <p class="demo__cap">La version de référence : enseigne, packaging, couverture, prises de parole principales.</p>
    </div>`, { cls: 'pg--demo' });

  // 7 — Anatomie
  page('cream', 'logo', `
    <div class="g g--anat">
      <div class="anat">${anatomySvg(A)}</div>
      <div>
        ${kicker('logo', 'Anatomie')}
        <h2 class="t2">Cinq éléments, une composition.</h2>
        <ol class="anat__list">${anatomy.map((p) => `<li><span class="pin pin--s">${p.n}</span><div><strong>${p.t}</strong><span>${p.d}</span></div></li>`).join('')}</ol>
      </div>
    </div>`);

  // 8 — Détails
  page('green', 'logo', `
    <div class="head-row">${kicker('logo', 'Détails du dessin')}<h2 class="t2">Au plus près du tracé.</h2></div>
    <div class="dets">${details.map((d, i) => `<figure class="det det--${i}"><div class="det__win">${crop('logo-principal', A, d.view, 'Détail : ' + d.t)}</div><figcaption><strong>${d.t}</strong>${d.d}</figcaption></figure>`).join('')}</div>`);

  // 9 — Évolutions
  page('cream', 'evolutions', `
    <div class="head-row">${kicker('evolutions', 'Continuité & évolutions')}<h2 class="t2">Ce qui reste, ce qui change.</h2></div>
    <table class="evo">
      <thead><tr><th>Élément</th><th>Ancien logo</th><th>Nouveau logo</th></tr></thead>
      <tbody>${comparison.rows.map((r) => `<tr><th><span>${r.topic}</span><em class="tag ${r.keep ? 'tag--keep' : 'tag--new'}">${r.keep ? 'Continuité' : 'Évolution'}</em></th><td>${r.old}</td><td>${r.now}</td></tr>`).join('')}</tbody>
    </table>`);

  // 10 — Déclinaisons : sans cadre
  const sc = asset('logo-sans-cadre');
  page('cream', 'declinaisons', `
    <div class="g g--var">
      <div>
        ${kicker('declinaisons', 'Déclinaisons')}
        <h2 class="t1">Une famille de versions.</h2>
        <p class="lead lead--s">${brand.systemIntro}</p>
        <div class="vcap"><p class="lbl">Version sans cadre</p><p>${sc.role}</p><p><b>Usage</b> ${sc.usage}</p></div>
      </div>
      <div class="var__art">${img('logo-sans-cadre', A)}</div>
    </div>`);

  // 11 — Horizontales
  page('green', 'declinaisons', `
    <div class="head-row">${kicker('declinaisons', 'Versions horizontales')}<h2 class="t2">Pour les formats en longueur.</h2></div>
    <div class="hz">${horizontals.map((h) => `<figure class="hz__item"><div class="hz__art" style="background:var(--${h.grounds[0]})">${img(h.id, A)}</div><figcaption><strong>${h.label.replace('Horizontale — ', '').replace(/^./, (c) => c.toUpperCase())}</strong>${h.usage}</figcaption></figure>`).join('')}</div>`);

  // 12 — Signature linéaire + composants
  const sl = asset('signature-lineaire');
  page('cream', 'declinaisons', `
    <div class="split">
      <div class="split__a split__a--red">
        ${kicker('declinaisons', 'Signature linéaire')}
        <div class="split__logo">${img('signature-lineaire', A)}</div>
        <p class="sm">${sl.role} ${sl.usage}</p>
      </div>
      <div class="split__b">
        <p class="lbl">Composants graphiques</p>
        <p class="lead lead--s">Cadre, lettrages et mention, fournis séparément pour construire des supports. Ils ne remplacent pas les logos.</p>
        <div class="parts">
          <span style="--bg:var(--cream)">${img('cadre-contour', A, { alt: '' })}<em>Cadre</em></span>
          <span style="--bg:var(--green)">${img('mot-pizza-principal', A, { alt: '' })}<em>« PIZZA »</em></span>
          <span style="--bg:var(--cream)">${img('mot-time-principal', A, { alt: '' })}<em>« TIME »</em></span>
          <span style="--bg:var(--green)">${img('mention-creme', A, { alt: '' })}<em>Mention</em></span>
        </div>
        <p class="sm">Dix fichiers : contour et fond du cadre, lettrages empilés, mots du logo principal et de l’horizontale, mention en vert et en crème.</p>
      </div>
    </div>`, { cls: 'pg--bleed' });

  // 13 — Sur les fonds (démonstration)
  page('cream', 'fonds', `
    <div class="tri">${['cream', 'green', 'red'].map((g) => `<figure class="tri__p" style="background:var(--${g})"><div class="tri__art">${img('logo-principal', A)}</div><figcaption class="${g === 'cream' ? '' : 'on-dark'}"><strong>${groundName[g]}</strong>${brand.groundNotes[g]}</figcaption></figure>`).join('')}</div>
    <div class="tri__k">${kicker('fonds', 'Sur les fonds de la palette')}</div>`, { cls: 'pg--bleed' });

  // 14 — Matrice des fonds et usages
  page('cream', 'fonds', `
    <div class="head-row">${kicker('fonds', 'Fonds & usages recommandés')}<h2 class="t2">Chaque version, son fond.</h2></div>
    <table class="mx">
      <thead><tr><th>Version</th><th class="c">Crème</th><th class="c">Vert</th><th class="c">Rouge</th><th>Usages</th></tr></thead>
      <tbody>${validated.map((a) => `<tr><th><span class="mx__th" style="background:var(--${a.grounds.includes('cream') ? 'cream' : a.grounds[0]})">${img(a.id, A, { alt: '' })}</span>${a.label}</th>${['cream', 'green', 'red'].map((g) => `<td class="c"><span class="dot dot--${g} ${a.grounds.includes(g) ? 'is-y' : 'is-n'}">${a.grounds.includes(g) ? '✓' : '–'}</span></td>`).join('')}<td>${a.usage}</td></tr>`).join('')}</tbody>
    </table>
    <p class="sm">Constats issus des essais sur les trois fonds de la palette. ✓ recommandé · – déconseillé.</p>`);

  // 15 — Palette
  page('cream', 'couleurs', `
    <div class="bands">${palette.map((p) => `<div class="band band--${p.id}">
      <p class="band__role">${p.role}</p>
      <h3 class="band__name">${p.name}</h3>
      <dl class="band__codes"><div><dt>HEX</dt><dd>${p.hex}</dd></div><div><dt>RVB</dt><dd>${rgbStr(p)}</dd></div><div><dt>CMJN*</dt><dd>${cmykStr(p)}</dd></div></dl>
    </div>`).join('')}</div>
    <div class="bands__k">${kicker('couleurs', 'Couleurs')}</div>
    <p class="bands__note">* ${brand.cmykNote}</p>`, { cls: 'pg--bleed' });

  // 16 — Associations
  page('cream', 'couleurs', `
    <div class="head-row">${kicker('couleurs', 'Associations')}<h2 class="t2">Des contrastes francs.</h2></div>
    <div class="g g--pairs">
      <ul class="pairs">${brand.contrasts.map((c) => `<li style="--fg:var(--${c.fg});--bg:var(--${c.bg})"><span class="chip">Aa</span><span><strong>${color(c.fg).short} sur ${color(c.bg).short.toLowerCase()}</strong>${c.ratio.toFixed(2).replace('.', ',')} : 1 — ${c.verdict}</span></li>`).join('')}</ul>
      <div>
        <p class="lbl">Équilibre</p>
        <div class="prop">${brand.proportions.parts.map(([id, v]) => `<span style="flex:${v};background:var(--${id});color:${color(id).ink}">${color(id).short}<b>${v} %</b></span>`).join('')}</div>
        <p class="sm">${brand.proportions.note}</p>
        <p class="sm">Contrastes calculés selon la méthode WCAG 2.1 (luminance relative). Un rapport d’au moins 4,5 : 1 convient aux textes courants.</p>
        <p class="lbl lbl--gap">Exemples</p>
        <div class="pex">${brand.pairExamples.map((e) => `<figure class="pex__i pex__i--${e.bg}"><div class="pex__art">${e.title ? `<span class="pex__t">${e.title}</span><span class="pex__p">${e.price}</span>` : `<span class="pex__promo">${e.promo}</span>`}</div><figcaption>${e.text}</figcaption></figure>`).join('')}</div>
      </div>
    </div>`);

  // 17 — Typographie : familles
  page('green', 'typographie', `
    <div class="head-row">${kicker('typographie', 'Typographie')}<h2 class="t2">Deux familles, cinq niveaux.</h2></div>
    <div class="specs">${brand.fonts.map((f) => `<div class="spec"><p class="spec__g" style="font-family:'${f.css}';font-style:${f.style}">Aa</p><div><p class="lbl lbl--cream">${f.role}</p><h3 class="spec__n" style="font-family:'${f.css}';font-style:${f.style}">${f.family}</h3><p class="sm">${f.desc}</p></div><p class="spec__set" style="font-family:'${f.css}';font-style:${f.style}">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>abcdefghijklmnopqrstuvwxyz<br>0123456789 € % &amp; àéèçôù</p></div>`).join('')}</div>
    <p class="sm">${brand.fontNotUsed} Les lettrages des logos sont dessinés : ils ne sont pas recomposés avec ces polices.</p>`);

  // 18 — Typographie : hiérarchie et composition
  page('cream', 'typographie', `
    <div class="g g--hier">
      <div>
        ${kicker('typographie', 'Hiérarchie')}
        <ul class="hier">${brand.typeScale.map((t) => `<li><span class="hier__l">${t.level}</span><span class="hier__s hier__s--${t.level.toLowerCase().replace(/[^a-z]/g, '')}">${t.sample}</span><span class="hier__m">${t.font} · ${t.size} · approche ${t.tracking}</span></li>`).join('')}</ul>
      </div>
      <div class="menu">
        <p class="menu__k">La carte</p>
        <h3 class="menu__t">Nos pizzas</h3>
        <ul>${brand.applications.menu.map((m) => `<li><span class="menu__n">${m.name}</span><span class="menu__p">${m.price}</span><span class="menu__d">${m.desc}</span></li>`).join('')}</ul>
        <p class="menu__promo">Offre du moment</p>
        <p class="xs">${brand.applications.sample}</p>
      </div>
    </div>
    <div class="lic">${brand.licenses.map((l) => `<p class="lic__i lic__i--${l.status}"><strong>${l.font}</strong>${l.text}</p>`).join('')}</div>`);

  // 19 — Espace de protection
  page('cream', 'regles', `
    <div class="g g--rule">
      <div class="clear" style="--x:${(brand.protection.unit['logo-principal'] / main.width * 100).toFixed(3)}">
        ${img('logo-principal', A, { cls: 'clear__logo' })}
        <span class="clear__x clear__x--t">X</span><span class="clear__x clear__x--l">X</span><span class="clear__x clear__x--r">X</span><span class="clear__x clear__x--b">X</span>
        <span class="clear__i"></span>
      </div>
      <div>
        ${kicker('regles', 'Règles d’utilisation')}
        <h2 class="t2">${brand.protection.title}</h2>
        <p class="status">${brand.protection.status}</p>
        <p class="rule__big">${brand.protection.rule}</p>
        <p>${brand.protection.detail}</p>
        <p class="sm">Même règle pour toutes les versions : X se mesure sur le « I » de « TIME » de la version utilisée.</p>
      </div>
    </div>`);

  // 20 — Tailles minimales (essais à l'échelle réelle)
  const printTests = brand.minSizes.printTests;
  page('cream', 'regles', `
    <div class="g g--sizes">
      <div>
        ${kicker('regles', brand.minSizes.title)}
        <p class="status">${brand.minSizes.status}</p>
        <p class="sm">${brand.minSizes.basis}</p>
        <table class="sizes"><thead><tr><th>Version</th><th>Écran</th><th>Impr.</th></tr></thead><tbody>${brand.minSizes.items.map((s) => `<tr><th>${asset(s.id).label}<span>${s.note}</span></th><td>${s.screen} px</td><td>${s.print} mm</td></tr>`).join('')}</tbody></table>
      </div>
      <div class="ptests">
        <p class="lbl">Essais à l’échelle 1 — imprimer à 100 %</p>
        ${Object.entries(printTests).map(([id, ws]) => `<div class="ptests__r"><p class="ptests__n">${asset(id).label}</p><div class="ptests__i${asset(id).grounds.includes('cream') ? '' : ' ptests__i--dark'}">${ws.map((w) => `<figure class="${w < brand.minSizes.items.find((s) => s.id === id).print ? 'is-under' : ''}">${img(id, A, { style: `width:${w}mm`, alt: '' })}<figcaption>${w} mm</figcaption></figure>`).join('')}</div></div>`).join('')}
        <p class="xs">Les tailles barrées sont sous le minimum proposé.</p>
      </div>
    </div>`);

  // 21 — Interdits
  page('cream', 'regles', `
    <div class="head-row">${kicker('regles', 'À ne pas faire')}<h2 class="t2">Le logo ne se modifie pas.</h2></div>
    <ul class="donts">${brand.donts.map((d) => `<li><div class="dont${d.special === 'red-on-green' ? ' dont--green' : ''}">${d.special === 'red-on-green' ? img('mot-time-principal', A, { cls: 'dont__img', alt: '' }) : d.special === 'recompose' ? `<span class="dont__re">${img('mention-vert', A, { alt: '' })}${img('logo-sans-cadre', A, { alt: '' })}</span>` : img('logo-principal', A, { cls: 'dont__img', alt: '', style: d.css })}<span class="dont__x"></span></div><p>${d.t}</p></li>`).join('')}</ul>
    <p class="sm">${brand.dontsNote}</p>`);

  // Applications : façade (photo pleine page)
  page('green', 'applications', `
    <div class="app-hero">
      ${photo('facade-lettrage', A, { cls: 'app-hero__img', loading: 'eager' })}
      <div class="app-hero__cap">${kicker('applications', 'Applications')}<h2 class="t2">L’identité en situation.</h2><p>${brand.applications.photos[0].caption}</p></div>
    </div>`, { cls: 'pg--bleed' });

  // Applications : boîtes et tenues
  page('cream', 'applications', `
    <div class="head-row">${kicker('applications', 'Packaging & tenues')}<h2 class="t2">Des boîtes aux couleurs de la maison.</h2></div>
    <div class="trio">${brand.applications.photos.slice(1).map((p) => `<figure>${photo(p.id, A, { loading: 'eager' })}<figcaption>${p.caption}</figcaption></figure>`).join('')}</div>
    <p class="sim">${brand.mockupsNote}</p>`);

  // PLV & campagne
  const plvImg = (id) => { const m = manifest.plv.find((x) => x.id === id); return `<img src="${A}/${m.path}" alt="${esc(m.label)}">`; };
  page('green', 'applications', `
    <div class="head-row">${kicker('applications', brand.plvText.title)}<h2 class="t2">Bannières & story.</h2></div>
    <div class="plvp">
      <div class="plvp__b">${plvImg('plv-banniere-rouge')}${plvImg('plv-banniere-creme')}</div>
      <div class="plvp__s">${plvImg('plv-story')}</div>
    </div>
    <p class="sim">${brand.plvText.note}</p>`);

  // Pictogrammes
  const ways = [['rouge', 'cream', 'Contour rouge'], ['vert', 'cream', 'Contour vert'], ['creme', 'green', 'Crème']];
  const names = [...new Set(manifest.icons.map((i) => i.name))];
  page('cream', 'motifs', `
    <div class="head-row">${kicker('motifs', 'Pictogrammes')}<h2 class="t2">Six pictogrammes, trois coloris.</h2></div>
    <div class="ico">${ways.map(([w, bg, label]) => `<div class="ico__row" style="background:var(--${bg})"><p class="ico__way">${label}</p>${names.map((n) => { const ic = manifest.icons.find((x) => x.name === n && x.way === w); return `<figure><img src="${A}/${ic.path}" alt="${ic.label}"><figcaption>${ic.label}</figcaption></figure>`; }).join('')}</div>`).join('')}</div>
    <p class="status">${brand.graphics.status}</p>
    <p class="sm sm--wide">${brand.graphics.iconsLead} Usages : ${brand.graphics.iconsUse.toLowerCase()}</p>`);

  // Motifs
  page('cream', 'motifs', `
    <div class="head-row">${kicker('motifs', 'Motifs')}<h2 class="t2">Le lettrage et le cartouche en motifs.</h2></div>
    <div class="mtf">${manifest.motifs.filter((m) => m.show).map((m) => `<figure><div class="mtf__art"><img src="${A}/${m.path}" alt="Motif ${esc(m.label)}"></div><figcaption>${m.label}</figcaption></figure>`).join('')}</div>
    <p class="sm sm--wide">${brand.graphics.motifsLead} ${brand.graphics.tintsNote}</p>`);

  // Hors système — alternative
  page('cream', 'motifs', `
    <div class="g g--alt">
      <div class="off__art off__art--big">${img('alternative-cartouche-arrondi', A)}</div>
      <div>
        <p class="k"><span class="k__n">+</span>Hors système</p>
        <h2 class="t2">Une alternative, non validée.</h2>
        <p class="status">Alternative non validée</p>
        <p class="lead lead--s">${brand.offSystem.alternativeNote}</p>
      </div>
    </div>`);

  // 26 — Synthèse
  page('green', 'ressources', `
    <div class="g g--sum">
      <div>
        ${kicker('ressources', 'Synthèse')}
        <h2 class="t1">L’essentiel.</h2>
        <div class="sum__logo">${img('signature-lineaire', A, { alt: 'Pizza Time, depuis 1999' })}</div>
      </div>
      <ol class="ess">${brand.summary.essentials.map((e) => `<li>${e}</li>`).join('')}</ol>
    </div>
    <div class="tov"><p class="lbl lbl--cream">Points à valider</p><ul>${brand.summary.toValidate.map((e) => `<li>${e}</li>`).join('')}</ul></div>`);

  // 27 — Ressources
  const rows = manifest.assets;
  const half = Math.ceil(rows.length / 2);
  const statusShort = { valide: 'Validé', composant: 'Composant', alternative: 'Alternative', reference: 'Référence', exclu: 'Exclu' };
  const srcShort = (a) => (a.src.endsWith('.png') ? 'Ancien logo' : a.src.replace('pizza time.svg', '').replace('Fichier ', 'Fichier '));
  const tbl = (list) => `<table class="corr"><tbody>${list.map((a) => `<tr class="st-${a.status}"><td>${esc(srcShort(a))}</td><td>${statusShort[a.status]}</td><td>${a.file ? a.file : '—'}</td></tr>`).join('')}</tbody></table>`;
  page('cream', 'ressources', `
    <div class="head-row">${kicker('ressources', 'Ressources')}<h2 class="t2">Fichiers & organisation.</h2></div>
    <div class="g g--res">
      <div>
        <p class="lbl">Disponibles sur le site de l’identité</p>
        <ul class="res">
          <li><strong>Charte graphique</strong>PDF — ce document</li>
          <li><strong>Logos validés</strong>ZIP — 9 versions, SVG et PNG 3000 px</li>
          <li><strong>Kit composants</strong>ZIP — 10 éléments SVG</li>
          <li><strong>Codes couleur</strong>HEX, RVB, CMJN indicatif</li>
        </ul>
        <p class="sm">Non diffusés : polices (licences individuelles), alternative non validée, ancien logo.</p>
      </div>
      <div><p class="lbl">Correspondance des fichiers d’origine</p><p class="xs xs--gap">Dossiers : 01 logo principal · 02 déclinaisons · 03 composants · 04 alternatives non validées · 05 références. Table complète : assets/CORRESPONDANCE.md.</p><div class="corr2">${tbl(rows.slice(0, half))}${tbl(rows.slice(half))}</div></div>
    </div>`);

  // Sommaire
  const first = {};
  pages.forEach((p, i) => { if (p.sid && !first[p.sid]) first[p.sid] = i + 1; });
  const toc = `
    <div class="toc">
      <div class="toc__a"><p class="k">${meta.docTitle}</p><h2 class="t1">Sommaire</h2><p class="sm">${meta.disclaimer}</p></div>
      <ol class="toc__l">${sections.map((s) => `<li><span class="toc__n">${s.n}</span><span class="toc__t">${s.t}</span><span class="toc__p">${String(first[s.id]).padStart(2, '0')}</span></li>`).join('')}</ol>
    </div>
    <div class="toc__frame">${img('cadre-contour', A, { alt: '' })}</div>`;
  pages[1].body = toc;

  const total = pages.length;
  const html = pages.map((p, i) => `<section class="pg pg--${p.bg} ${p.cls}" data-page="${i + 1}">${p.body}${p.folio ? `<footer class="folio"><span>${meta.brand} — ${meta.docTitle}</span><span>${String(i + 1).padStart(2, '0')} / ${total}</span></footer>` : ''}</section>`).join('\n');
  return { html, total };
}
