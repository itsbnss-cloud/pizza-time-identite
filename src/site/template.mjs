// Gabarit du site de présentation (une page, sections ancrées).
import { brand, asset, byStatus, color, esc, img, crop, rgbStr, cmykStr, manifest, anatomySvg, mockup, photo } from '../shared.mjs';

const A = 'assets';
const { meta, palette, context, comparison, anatomy, details, sections } = brand;
const groundName = { cream: 'Crème', green: 'Vert', red: 'Rouge' };
const validated = byStatus('valide');
const horizontals = validated.filter((a) => a.family === 'horizontal');
const ICON_WAYS = [{ id: 'rouge', label: 'Contour rouge', bg: 'cream' }, { id: 'vert', label: 'Contour vert', bg: 'cream' }, { id: 'creme', label: 'Crème', bg: 'green' }];
const ICON_NAMES = [...new Set(manifest.icons.map((i) => i.name))];
const plvImg = (id) => { const m = manifest.plv.find((x) => x.id === id); return `<img src="${A}/${m.path}" width="${m.width}" height="${m.height}" alt="${esc(m.label)}" loading="lazy">`; };

const dl = (a, kind) => {
  const file = kind === 'png' ? a.png : a.path;
  const name = file.split('/').pop();
  return `<a class="dl" href="${A}/${file}" download="${name}">${kind.toUpperCase()}<span class="sr-only"> — ${esc(a.label)}</span></a>`;
};

const sectionHead = (id, kicker, title, lead = '') => `
  <header class="s-head reveal">
    <p class="kicker"><span class="kicker__n">${sections.find((s) => s.id === id)?.n ?? ''}</span>${kicker}</p>
    <h2 class="s-title">${title}</h2>
    ${lead ? `<p class="s-lead">${lead}</p>` : ''}
  </header>`;

export function renderSite() {
  const main = asset('logo-principal');

  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Pizza Time — ${meta.title}</title>
<meta name="description" content="Présentation de la nouvelle identité visuelle de Pizza Time : logo, déclinaisons, couleurs, typographie et règles d’usage.">
<meta name="theme-color" content="${color('green').hex}">
<link rel="icon" href="${A}/${asset('logo-principal').path}" type="image/svg+xml">
<link rel="icon" href="${A}/icones/favicon-32.png" sizes="32x32" type="image/png">
<link rel="icon" href="${A}/icones/favicon-192.png" sizes="192x192" type="image/png">
<link rel="apple-touch-icon" href="${A}/icones/apple-touch-icon.png">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<a class="skip" href="#contenu">Aller au contenu</a>

<header class="bar" id="barre">
  <a class="bar__brand" href="#ouverture" aria-label="Pizza Time — retour à l’ouverture">${img('horizontal-sans-cadre', A, { alt: '' })}</a>
  <nav class="bar__nav" id="nav" aria-label="Sections">
    <ol>${sections.map((s) => `<li><a href="#${s.id}"><span aria-hidden="true">${s.n}</span>${s.t}</a></li>`).join('')}</ol>
  </nav>
  <a class="btn btn--cream bar__pdf" href="telechargements/${meta.pdfFile}" download>PDF<span class="hide-sm">&nbsp;de la charte</span></a>
  <button class="bar__menu" type="button" aria-expanded="false" aria-controls="nav"><span class="sr-only">Ouvrir le menu des sections</span><span class="bar__burger" aria-hidden="true"></span></button>
</header>

<main id="contenu">

<!-- OUVERTURE -->
<section class="hero" id="ouverture" aria-label="Ouverture">
  <div class="hero__stage">
    ${img('logo-principal', A, { cls: 'hero__logo' })}
  </div>
  <div class="hero__meta">
    <p><span>${meta.title}</span><span>${meta.version} · ${meta.date}</span></p>
    <span class="hero__links"><a class="hero__pdf" href="telechargements/${meta.pdfFile}" download>Charte PDF</a><a class="hero__cue" href="#contexte">Découvrir la refonte <span aria-hidden="true">↓</span></a></span>
  </div>
</section>

<!-- 01 CONTEXTE -->
<section class="s s--cream" id="contexte">
  <div class="wrap">
    ${sectionHead('contexte', 'Contexte & objectifs', 'Moderniser, sans perdre ses repères.')}
    <p class="lead-xl reveal">${context.lead}</p>
    <div class="values">
      ${context.values.map((v, i) => `<div class="value reveal" style="--d:${i * 80}ms"><p class="value__name">${v.name}</p><p class="value__text">${v.text}</p></div>`).join('')}
    </div>
    <div class="goals">
      <h3 class="label reveal">Objectifs de la refonte</h3>
      <ol class="goals__list">
        ${context.goals.map((g, i) => `<li class="reveal" style="--d:${i * 80}ms"><span class="goals__n">${String(i + 1).padStart(2, '0')}</span><strong>${g.t}</strong><span>${g.d}</span></li>`).join('')}
      </ol>
    </div>
    <aside class="themes reveal">
      <h3 class="label">Pistes du brief</h3>
      <p class="themes__list">${context.themes.map((t) => `<span>${t}</span>`).join('<span class="dot" aria-hidden="true">·</span>')}</p>
      <p class="note">${context.themesNote}</p>
    </aside>
  </div>
</section>

<!-- 02 AVANT / APRÈS -->
<section class="s s--green" id="avant-apres">
  <div class="wrap">
    ${sectionHead('avant-apres', 'Avant / après', 'Un même héritage, un dessin repensé.', 'Faites glisser le curseur pour comparer les deux logos, présentés à hauteur égale.')}
    <div class="compare reveal" data-compare>
      <div class="compare__frame">
        <figure class="compare__pane compare__pane--new">
          ${img('logo-principal', A, { cls: 'compare__img' })}
        </figure>
        <figure class="compare__pane compare__pane--old" data-compare-old>
          <span class="compare__old" role="img" aria-label="Ancien logo Pizza Time" style="background-image:url('${A}/${asset('ancien-logo').path}')"></span>
        </figure>
        <span class="compare__handle" aria-hidden="true"><span></span></span>
        <span class="compare__tag compare__tag--old">Avant</span>
        <span class="compare__tag compare__tag--new">Après</span>
      </div>
      <label class="compare__range"><span class="sr-only">Position du curseur de comparaison</span><input type="range" min="0" max="100" value="50" data-compare-range></label>
      <div class="compare__captions">
        <p>${comparison.oldCaption}</p>
        <p>${comparison.newCaption}</p>
      </div>
    </div>
    <div class="field">
      <header class="field__head reveal"><h3 class="field__title">${brand.field.title}</h3><p>${brand.field.lead}</p></header>
      ${brand.field.pairs.map((pr, i) => { const b = mockup(pr.before), a = mockup(pr.after); return `<figure class="compare compare--photo reveal" data-compare style="--ar:${b.width}/${b.height}">
        <div class="compare__frame">
          <div class="compare__pane">${photo(pr.after, A, { cls: 'compare__photo', alt: a.label })}</div>
          <div class="compare__pane compare__pane--old">${photo(pr.before, A, { cls: 'compare__photo', alt: b.label + ' (photo avant la refonte)' })}</div>
          <span class="compare__handle" aria-hidden="true"><span></span></span>
          <span class="compare__tag compare__tag--old">Avant</span>
          <span class="compare__tag compare__tag--new">Simulation</span>
        </div>
        <label class="compare__range"><span class="sr-only">Comparer : ${b.label}</span><input type="range" min="0" max="100" value="50" data-compare-range></label>
        <figcaption class="field__cap">${pr.caption}</figcaption>
      </figure>`; }).join('')}
      <p class="note note--cream reveal">${brand.mockupsNote}</p>
    </div>
  </div>
</section>

<!-- 03 LE LOGO -->
<section class="s s--cream" id="logo">
  <div class="wrap">
    ${sectionHead('logo', 'Le logo principal', 'La version de référence.', 'Utilisée pour l’enseigne, le packaging et les prises de parole principales.')}
    <figure class="anatomy reveal">
      <div class="anatomy__art">${anatomySvg(A)}</div>
      <figcaption>
        <ol class="anatomy__list">${anatomy.map((p) => `<li><span class="pin pin--static" aria-hidden="true">${p.n}</span><div><strong>${p.t}</strong><span>${p.d}</span></div></li>`).join('')}</ol>
        <p class="dls">Logo principal ${dl(main, 'svg')} ${dl(main, 'png')}</p>
      </figcaption>
    </figure>
  </div>
</section>
<section class="s s--red s--tight" aria-label="Détails du dessin">
  <div class="wrap">
    <h3 class="label label--cream reveal">Détails du dessin</h3>
    <div class="details">
      ${details.map((d, i) => `<figure class="detail detail--${i} reveal" style="--d:${i * 100}ms"><div class="detail__win">${crop('logo-principal', A, d.view, 'Détail : ' + d.t)}</div><figcaption><strong>${d.t}</strong> ${d.d}</figcaption></figure>`).join('')}
    </div>
  </div>
</section>

<!-- 04 ÉVOLUTIONS -->
<section class="s s--cream" id="evolutions">
  <div class="wrap">
    ${sectionHead('evolutions', 'Continuité & évolutions', 'Ce qui reste, ce qui change.', 'Constats établis à partir des deux fichiers.')}
    <div class="evo reveal" role="table" aria-label="Comparaison point par point">
      <div class="evo__row evo__row--head" role="row"><span role="columnheader">Élément</span><span role="columnheader">Ancien logo</span><span role="columnheader">Nouveau logo</span></div>
      ${comparison.rows.map((r) => `<div class="evo__row" role="row"><span class="evo__topic" role="rowheader">${r.topic}<em class="tag ${r.keep ? 'tag--keep' : 'tag--new'}">${r.keep ? 'Continuité' : 'Évolution'}</em></span><span role="cell">${r.old}</span><span role="cell">${r.now}</span></div>`).join('')}
    </div>
  </div>
</section>

<!-- 05 DÉCLINAISONS -->
<section class="s s--cream s--flush" id="declinaisons">
  <div class="wrap">
    ${sectionHead('declinaisons', 'Déclinaisons', 'Une famille de versions.', brand.systemIntro)}
  </div>
  <div class="variant variant--cream reveal">
    <div class="variant__art">${img('logo-sans-cadre', A)}</div>
    <div class="variant__text"><p class="label">Version sans cadre</p><p>${asset('logo-sans-cadre').role}</p><p class="variant__use"><strong>Usage</strong> ${asset('logo-sans-cadre').usage}</p><p class="dls">${dl(asset('logo-sans-cadre'), 'svg')} ${dl(asset('logo-sans-cadre'), 'png')}</p></div>
  </div>
  <div class="variant variant--green reveal" data-horiz>
    <div class="variant__art variant__art--wide" data-horiz-stage style="--bg:var(--${horizontals[0].grounds[0]})">
      ${horizontals.map((h, i) => img(h.id, A, { cls: `horiz-img${i === 0 ? ' is-on' : ''}` })).join('')}
    </div>
    <div class="variant__text">
      <p class="label label--cream">Versions horizontales</p>
      <div class="swatches" role="radiogroup" aria-label="Choisir une version horizontale">
        ${horizontals.map((h, i) => `<button type="button" role="radio" aria-checked="${i === 0}" class="swatch" data-i="${i}" data-bg="${h.grounds[0]}" data-label="${esc(h.label)}" data-role="${esc(h.role)}" data-usage="${esc(h.usage)}" data-svg="${A}/${h.path}" data-png="${A}/${h.png}" data-grounds="${h.grounds.map((g) => groundName[g]).join(', ')}">${img(h.id, A, { alt: h.label })}</button>`).join('')}
      </div>
      <p class="horiz__name" data-horiz-label>${horizontals[0].label}</p>
      <p data-horiz-role>${horizontals[0].role}</p>
      <p class="variant__use"><strong>Usage</strong> <span data-horiz-usage>${horizontals[0].usage}</span></p>
      <p class="variant__use"><strong>Fonds</strong> <span data-horiz-grounds>${horizontals[0].grounds.map((g) => groundName[g]).join(', ')}</span></p>
      <p class="dls"><a class="dl" data-horiz-svg href="${A}/${horizontals[0].path}" download>SVG</a> <a class="dl" data-horiz-png href="${A}/${horizontals[0].png}" download>PNG</a></p>
    </div>
  </div>
  <div class="variant variant--red reveal">
    <div class="variant__art variant__art--wide">${img('signature-lineaire', A)}</div>
    <div class="variant__text"><p class="label label--cream">Signature linéaire</p><p>${asset('signature-lineaire').role}</p><p class="variant__use"><strong>Usage</strong> ${asset('signature-lineaire').usage}</p><p class="dls">${dl(asset('signature-lineaire'), 'svg')} ${dl(asset('signature-lineaire'), 'png')}</p></div>
  </div>
  <div class="wrap">
    <div class="parts reveal">
      <div class="parts__text"><p class="label">Composants graphiques</p><p>Cadre, lettrages et mention, fournis séparément pour les graphistes. Ils servent à construire des supports ; ils ne remplacent pas les logos.</p><p class="dls"><a class="dl dl--wide" href="${A}/${manifest.packs.composants}" download>Kit composants · ZIP</a></p></div>
      <div class="parts__strip">
        <span style="--bg:var(--cream)">${img('cadre-contour', A, { alt: 'Cadre, contour vert' })}</span>
        <span style="--bg:var(--green)">${img('mot-pizza-principal', A, { alt: 'Mot PIZZA du logo principal' })}</span>
        <span style="--bg:var(--cream)">${img('mot-time-principal', A, { alt: 'Mot TIME du logo principal' })}</span>
        <span style="--bg:var(--green)">${img('mention-creme', A, { alt: 'Mention Depuis 1999, crème' })}</span>
      </div>
    </div>
  </div>
</section>

<!-- 06 FONDS -->
<section class="s s--cream" id="fonds">
  <div class="wrap">
    ${sectionHead('fonds', 'Sur les fonds de la palette', 'Chaque version, son fond.', 'Choisissez une version : les fonds recommandés et déconseillés s’affichent d’après les essais.')}
    <div class="grounds reveal" data-grounds-box>
      <label class="grounds__pick"><span class="label">Version</span>
        <select data-grounds-select>${validated.map((a) => `<option value="${a.id}" data-grounds="${a.grounds.join(' ')}" data-src="${A}/${a.path}">${a.label}</option>`).join('')}</select>
      </label>
      <div class="grounds__row">
        ${['cream', 'green', 'red'].map((g) => `<figure class="ground ground--${g}" data-ground="${g}"><div class="ground__art">${img('logo-principal', A, { cls: 'ground__img', alt: '' })}</div><figcaption><span>${groundName[g]}</span><em class="ground__flag" data-flag></em></figcaption></figure>`).join('')}
      </div>
      <dl class="grounds__notes">${['cream', 'green', 'red'].map((g) => `<div><dt>Logo principal sur ${groundName[g].toLowerCase()}</dt><dd>${brand.groundNotes[g]}</dd></div>`).join('')}</dl>
    </div>
  </div>
</section>

<!-- 07 COULEURS -->
<section class="s s--cream s--flush" id="couleurs">
  <div class="wrap">${sectionHead('couleurs', 'Couleurs', 'Trois couleurs, pas une de plus.', 'Cliquez sur une valeur pour la copier.')}</div>
  <div class="swatchbands">
    ${palette.map((p) => `<article class="band band--${p.id} reveal">
      <h3 class="band__name">${p.name}</h3>
      <p class="band__role">${p.role}</p>
      <dl class="band__codes">
        <div><dt>HEX</dt><dd><button type="button" class="copy" data-copy="${p.hex}">${p.hex}</button></dd></div>
        <div><dt>RVB</dt><dd><button type="button" class="copy" data-copy="rgb(${p.rgb.join(', ')})">${rgbStr(p)}</button></dd></div>
        <div><dt>CMJN<sup>*</sup></dt><dd><button type="button" class="copy" data-copy="C${p.cmyk[0]} M${p.cmyk[1]} J${p.cmyk[2]} N${p.cmyk[3]}">${cmykStr(p)}</button></dd></div>
      </dl>
    </article>`).join('')}
  </div>
  <div class="wrap">
    <p class="note note--cmyk reveal"><sup>*</sup> ${brand.cmykNote}</p>
    <div class="pairs reveal">
      <div class="pairs__intro"><p class="label">Associations</p><p>Contrastes mesurés selon la méthode WCAG 2.1.</p></div>
      <ul class="pairs__list">
        ${brand.contrasts.map((c) => `<li class="pair" style="--fg:var(--${c.fg});--bg:var(--${c.bg})"><span class="pair__chip">Aa</span><span class="pair__txt"><strong>${color(c.fg).short} sur ${color(c.bg).short.toLowerCase()}</strong><span>${c.ratio.toFixed(2).replace('.', ',')} : 1 — ${c.verdict}</span></span></li>`).join('')}
      </ul>
    </div>
    <div class="prop reveal">
      <p class="label">Équilibre</p>
      <div class="prop__bar">${brand.proportions.parts.map(([id, v]) => `<span style="flex:${v};background:var(--${id})"><em style="color:${color(id).ink}">${color(id).short} ${v} %</em></span>`).join('')}</div>
      <p class="note">${brand.proportions.note}</p>
    </div>
  </div>
</section>

<!-- 08 TYPOGRAPHIE -->
<section class="s s--green" id="typographie">
  <div class="wrap">
    ${sectionHead('typographie', 'Typographie', 'Deux familles, cinq niveaux.', 'Les lettrages du logo sont dessinés : les polices servent aux textes qui l’accompagnent.')}
    <div class="specimens">
      ${brand.fonts.map((f) => `<article class="spec reveal">
        <p class="spec__glyph" style="font-family:'${f.css}';font-style:${f.style}" aria-hidden="true">Aa</p>
        <div class="spec__body">
          <p class="label label--cream">${f.role}</p>
          <h3 class="spec__name" style="font-family:'${f.css}';font-style:${f.style}">${f.family}</h3>
          <p class="spec__desc">${f.desc}</p>
          <p class="spec__set" style="font-family:'${f.css}';font-style:${f.style}" aria-hidden="true">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>abcdefghijklmnopqrstuvwxyz<br>0123456789 € % & àéèçôù « »</p>
        </div>
      </article>`).join('')}
    </div>
    <p class="note note--cream reveal">${brand.fontNotUsed}</p>
    <div class="tester reveal">
      <label class="label label--cream" for="tester-input">Essayer un texte</label>
      <input id="tester-input" class="tester__input" type="text" value="Margherita · 10,50 €" maxlength="60" data-tester>
      <div class="tester__out" aria-live="polite">
        ${brand.fonts.map((f) => `<p style="font-family:'${f.css}';font-style:${f.style}" data-tester-out><span class="tester__tag">${f.family}</span><span data-tester-text>Margherita · 10,50 €</span></p>`).join('')}
      </div>
    </div>
  </div>
</section>
<section class="s s--cream" aria-label="Hiérarchie typographique">
  <div class="wrap">
    <div class="hier">
      <div class="hier__scale reveal">
        <h3 class="label">Hiérarchie</h3>
        <ul>${brand.typeScale.map((t) => `<li><span class="hier__lvl">${t.level}</span><span class="hier__sample hier__sample--${t.level.toLowerCase().replace(/[^a-z]/g, '')}">${t.sample}</span><span class="hier__spec">${t.font} · ${t.size} · approche ${t.tracking}</span></li>`).join('')}</ul>
      </div>
      <div class="menu-card reveal" aria-label="Exemple de composition : extrait de carte">
        <p class="menu-card__kicker">La carte</p>
        <h3 class="menu-card__title">Nos pizzas</h3>
        <ul>${brand.applications.menu.map((m) => `<li><span class="menu-card__name">${m.name}</span><span class="menu-card__price">${m.price}</span><span class="menu-card__desc">${m.desc}</span></li>`).join('')}</ul>
        <p class="menu-card__promo">Offre du moment</p>
        <p class="note">${brand.applications.sample}</p>
      </div>
    </div>
    <div class="licenses reveal">
      <h3 class="label">Licences — points à confirmer</h3>
      ${brand.licenses.map((l) => `<p class="license license--${l.status}"><strong>${l.font}</strong> ${l.text}</p>`).join('')}
    </div>
  </div>
</section>

<!-- 09 RÈGLES -->
<section class="s s--cream" id="regles">
  <div class="wrap">
    ${sectionHead('regles', 'Règles d’utilisation', 'Protéger le logo.', brand.meta.disclaimer)}
    <div class="rule reveal">
      <div class="rule__art">
        <div class="clear" style="--x:${(brand.protection.unit['logo-principal'] / main.width * 100).toFixed(3)}">
          <span class="clear__zone" aria-hidden="true"></span>
          ${img('logo-principal', A, { cls: 'clear__logo' })}
          <span class="clear__x clear__x--t" aria-hidden="true">X</span><span class="clear__x clear__x--l" aria-hidden="true">X</span><span class="clear__x clear__x--r" aria-hidden="true">X</span><span class="clear__x clear__x--b" aria-hidden="true">X</span>
        </div>
      </div>
      <div class="rule__text">
        <p class="label">${brand.protection.title}</p><p class="status">${brand.protection.status}</p>
        <p class="rule__big">${brand.protection.rule}</p>
        <p>${brand.protection.detail}</p>
      </div>
    </div>
    <div class="rule rule--sizes reveal">
      <div class="rule__text">
        <p class="label">${brand.minSizes.title}</p><p class="status">${brand.minSizes.status}</p>
        <p>${brand.minSizes.basis}</p>
        <table class="sizes"><thead><tr><th scope="col">Version</th><th scope="col">Écran</th><th scope="col">Impression</th></tr></thead>
        <tbody>${brand.minSizes.items.map((s) => `<tr><th scope="row">${asset(s.id).label}<span>${s.note}</span></th><td>${s.screen} px</td><td>${s.print} mm</td></tr>`).join('')}</tbody></table>
      </div>
      <div class="tests" aria-label="Essais de réduction à taille réelle">
        ${Object.entries(brand.minSizes.tests).map(([id, ws]) => `<div class="tests__row"><p class="tests__name">${asset(id).label}</p><div class="tests__imgs${asset(id).grounds.includes('cream') ? '' : ' tests__imgs--dark'}">${ws.map((w) => `<figure class="${w < brand.minSizes.items.find((s) => s.id === id).screen ? 'is-under' : ''}">${img(id, A, { style: `width:${w}px`, alt: `${asset(id).label} à ${w} px` })}<figcaption>${w} px</figcaption></figure>`).join('')}</div></div>`).join('')}
        <p class="note">Affichage à taille réelle en pixels CSS. Les tailles barrées sont sous le minimum proposé.</p>
      </div>
    </div>
    <div class="donts reveal">
      <p class="label">À ne pas faire</p>
      <ul class="donts__grid">
        ${brand.donts.map((d) => `<li class="dont"><div class="dont__art${d.special === 'red-on-green' ? ' dont__art--green' : ''}">${d.special === 'red-on-green' ? img('mot-time-principal', A, { cls: 'dont__img', alt: '' }) : d.special === 'recompose' ? `<span class="dont__recompose">${img('mention-vert', A, { alt: '' })}${img('logo-sans-cadre', A, { alt: '' })}</span>` : img('logo-principal', A, { cls: 'dont__img', alt: '', style: d.css })}<span class="dont__x" aria-hidden="true"></span></div><p>${d.t}</p></li>`).join('')}
      </ul>
      <p class="note">${brand.dontsNote}</p>
    </div>
  </div>
</section>

<!-- 10 APPLICATIONS -->
<section class="s s--green" id="applications">
  <div class="wrap">
    ${sectionHead('applications', 'Applications', 'L’identité en situation.', brand.applications.note)}
    <div class="shots">
      ${brand.applications.photos.map((ph, i) => `<figure class="shot shot--${i} reveal">${photo(ph.id, A)}<figcaption>${ph.caption}</figcaption></figure>`).join('')}
    </div>
    <p class="note note--cream reveal">${brand.mockupsNote}</p>
    <div class="plv">
      <header class="field__head reveal"><h3 class="field__title">${brand.plvText.title}</h3><p>${brand.plvText.lead}</p></header>
      <div class="plv__grid">
        <div class="plv__banners">${['plv-banniere-rouge', 'plv-banniere-creme'].map((id) => `<figure class="reveal">${plvImg(id)}</figure>`).join('')}</div>
        <figure class="plv__story reveal">${plvImg('plv-story')}</figure>
      </div>
      <p class="note note--cream reveal">${brand.plvText.note}</p>
    </div>
  </div>
</section>

<!-- 11 PICTOGRAMMES & MOTIFS -->
<section class="s s--cream" id="motifs">
  <div class="wrap">
    ${sectionHead('motifs', 'Pictogrammes & motifs', 'Le vocabulaire graphique.', brand.graphics.lead)}
    <p class="status reveal">${brand.graphics.status}</p>
    <div class="icons reveal" data-icons>
      <div class="icons__head">
        <div><h3 class="sub">Pictogrammes</h3><p>${brand.graphics.iconsLead}</p><p class="variant__use"><strong>Usages</strong> ${brand.graphics.iconsUse}</p></div>
        <div class="icons__ways" role="radiogroup" aria-label="Choisir un coloris">
          ${ICON_WAYS.map((w, i) => `<button type="button" role="radio" class="way" aria-checked="${i === 0}" data-way="${w.id}" data-bg="${w.bg}">${w.label}</button>`).join('')}
        </div>
      </div>
      <ul class="icons__grid" data-icons-grid style="--bg:var(--${ICON_WAYS[0].bg})">
        ${ICON_NAMES.map((n) => `<li>${ICON_WAYS.map((w, i) => { const ic = manifest.icons.find((x) => x.name === n && x.way === w.id); return `<img class="icon${i === 0 ? ' is-on' : ''}" data-way="${w.id}" src="${A}/${ic.path}" alt="${i === 0 ? ic.label : ''}" width="${Math.round(ic.width)}" height="${Math.round(ic.height)}">`; }).join('')}<span>${manifest.icons.find((x) => x.name === n).label}</span></li>`).join('')}
      </ul>
      <p class="dls"><a class="dl dl--wide" href="${A}/${manifest.packs.pictos}" download>Pictogrammes · ZIP (18 SVG)</a></p>
    </div>
    <div class="motifs">
      <div class="motifs__head reveal"><h3 class="sub">Motifs</h3><p>${brand.graphics.motifsLead}</p><p class="variant__use"><strong>Usages</strong> ${brand.graphics.motifsUse}</p></div>
      <div class="motifs__grid">
        ${manifest.motifs.filter((m) => m.show).map((m, i) => `<figure class="motif motif--${i} reveal"><div class="motif__art"><img src="${A}/${m.path}" alt="Motif ${esc(m.label)}" loading="lazy"></div><figcaption>${m.label}</figcaption></figure>`).join('')}
      </div>
      <p class="note reveal">${brand.graphics.tintsNote}</p>
      <p class="dls reveal"><a class="dl dl--wide" href="${A}/${manifest.packs.motifs}" download>Motifs · ZIP (19 SVG, avec et sans fond)</a></p>
    </div>
  </div>
</section>

<!-- HORS SYSTÈME -->
<section class="s s--cream s--tight" id="hors-systeme" aria-label="Hors système">
  <div class="wrap">
    <figure class="off__item off__item--solo reveal">
      <div class="off__art">${img('alternative-cartouche-arrondi', A)}</div>
      <figcaption><p class="label">Alternative non validée</p><p>${brand.offSystem.alternativeNote}</p></figcaption>
    </figure>
  </div>
</section>

<!-- 11 RESSOURCES -->
<section class="s s--red" id="ressources">
  <div class="wrap">
    ${sectionHead('ressources', 'Synthèse & ressources', 'L’essentiel, à portée de main.')}
    <div class="summary">
      <div class="summary__col reveal">
        <h3 class="label label--cream">À retenir</h3>
        <ol class="essentials">${brand.summary.essentials.map((e) => `<li>${e}</li>`).join('')}</ol>
      </div>
      <div class="summary__col reveal">
        <h3 class="label label--cream">Téléchargements</h3>
        <ul class="downloads">
          <li><a class="btn btn--cream" href="telechargements/${meta.pdfFile}" download>Charte graphique · PDF</a></li>
          <li><a class="btn btn--line" href="${A}/${manifest.packs.logos}" download>Logos validés · ZIP (SVG + PNG)</a></li>
          <li><a class="btn btn--line" href="${A}/${manifest.packs.composants}" download>Kit composants · ZIP (SVG)</a></li>
        </ul>
        <details class="files">
          <summary>Fichiers à l’unité</summary>
          <ul>${validated.map((a) => `<li><span>${a.label}</span><span>${dl(a, 'svg')} ${dl(a, 'png')}</span></li>`).join('')}</ul>
        </details>
        <p class="note note--cream">Les polices ne sont pas distribuées ici : elles doivent être acquises sous licence par chaque utilisateur.</p>
      </div>
    </div>
    <div class="validate reveal">
      <h3 class="label label--cream">Points à valider</h3>
      <ul>${brand.summary.toValidate.map((e) => `<li>${e}</li>`).join('')}</ul>
    </div>
  </div>
</section>

</main>

<footer class="foot">
  ${img('signature-lineaire', A, { cls: 'foot__logo', alt: 'Pizza Time, depuis 1999' })}
  <p>${meta.docTitle} · ${meta.version} · ${meta.date}</p>
</footer>

<div class="toast" role="status" aria-live="polite" data-toast></div>
<script src="site.js" defer></script>
</body>
</html>`;
}
