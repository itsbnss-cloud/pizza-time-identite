// Source unique des contenus partagés par le site et la charte PDF.
// Toute modification de texte, de couleur ou de règle se fait ici.

export const meta = {
  brand: 'Pizza Time',
  title: 'Identité visuelle',
  docTitle: 'Charte graphique',
  version: 'Version 1.0',
  date: 'Octobre 2026',
  pdfFile: 'pizza-time_charte-graphique_v1.pdf',
  disclaimer: 'Document de présentation. Les règles signalées « à valider » restent des recommandations tant qu’elles n’ont pas été approuvées.',
};

// Palette — référence exclusive : « Fichier 11pizza time.svg »
// CMJN : conversion indicative depuis sRGB, profil Coated FOGRA39 (ISO 12647-2:2004),
// intention colorimétrique relative. À confirmer avec l'imprimeur (BAT).
export const palette = [
  { id: 'green', name: 'Vert Pizza Time', short: 'Vert', hex: '#0E4725', rgb: [14, 71, 37], cmyk: [94, 46, 100, 56], ink: '#FFF6E9',
    role: 'Couleur de structure : cadre, bandeau, fonds pleins.' },
  { id: 'red', name: 'Rouge Pizza Time', short: 'Rouge', hex: '#C72F27', rgb: [199, 47, 39], cmyk: [14, 97, 100, 4], ink: '#FFF6E9',
    role: 'Couleur d’appel : « TIME », prix, promotions.' },
  { id: 'cream', name: 'Crème Pizza Time', short: 'Crème', hex: '#FFF6E9', rgb: [255, 246, 233], cmyk: [0, 4, 11, 0], ink: '#0E4725',
    role: 'Couleur de fond : remplace le blanc pur de l’ancienne identité.' },
];
export const cmykNote = 'CMJN indicatif — conversion depuis sRGB avec le profil Coated FOGRA39, intention colorimétrique relative. À confirmer par l’imprimeur selon le papier et le procédé (BAT). Aucune référence Pantone n’est définie à ce stade.';

// Contrastes mesurés (WCAG 2.1, luminance relative)
export const contrasts = [
  { fg: 'cream', bg: 'green', ratio: 10.07, verdict: 'Très lisible — tous textes' },
  { fg: 'green', bg: 'cream', ratio: 10.07, verdict: 'Très lisible — tous textes' },
  { fg: 'red', bg: 'cream', ratio: 5.07, verdict: 'Lisible — textes courants et titres' },
  { fg: 'cream', bg: 'red', ratio: 5.07, verdict: 'Lisible — textes courants et titres' },
  { fg: 'red', bg: 'green', ratio: 1.99, verdict: 'À éviter pour du texte' },
];

// Repère d'équilibre proposé (non mesuré), à valider
export const proportions = { note: 'Repère proposé, à valider : le crème domine, le vert structure, le rouge ponctue.', parts: [['cream', 60], ['green', 30], ['red', 10]] };

// Typographie
export const fonts = [
  { id: 'avigea', family: 'Avigea', file: 'Avigea.otf', css: 'Avigea', style: 'normal', role: 'Titres', foundry: 'Storytype Studio',
    desc: 'Capitales et bas-de-casse à fort contraste, empattements fins. Pour les titres et les noms de produits.' },
  { id: 'avigea-italic', family: 'Avigea Italic', file: 'Avigea Italic.otf', css: 'Avigea', style: 'italic', role: 'Promotions & accroches', foundry: 'Storytype Studio',
    desc: 'L’italique apporte du mouvement : offres, temps forts, mots mis en avant.' },
  { id: 'dillan', family: 'MADE Dillan', file: 'MADE Dillan PERSONAL USE.otf', css: 'MADE Dillan', style: 'normal', role: 'Sous-titres, prix, textes', foundry: 'MadeType',
    desc: 'Empattements doux et chiffres robustes. Proche de la mention « Depuis 1999 » ; police de la palette de référence.' },
];
export const fontNotUsed = 'MADE Gentle, également fournie, n’est pas retenue : son dessin est très proche de MADE Dillan et n’apporterait pas de niveau supplémentaire à la hiérarchie.';

export const typeScale = [
  { level: 'Titre', font: 'Avigea', size: '56–96 px · 40–72 pt', tracking: '−1 %', sample: 'Nos pizzas', case: 'Phrase' },
  { level: 'Sous-titre', font: 'MADE Dillan', size: '14–18 px · 10–12 pt', tracking: '+8 %', sample: 'LA CARTE', case: 'Capitales' },
  { level: 'Promotion', font: 'Avigea Italic', size: '32–56 px · 24–40 pt', tracking: '0', sample: 'Offre du moment', case: 'Phrase' },
  { level: 'Prix', font: 'MADE Dillan', size: '24–40 px · 18–28 pt', tracking: '0', sample: '11,50 €', case: 'Chiffres' },
  { level: 'Texte', font: 'MADE Dillan', size: '16–18 px · 10–11 pt', tracking: '+1 %', sample: 'Tomate, mozzarella, basilic frais.', case: 'Phrase' },
];

export const licenses = [
  { font: 'MADE Dillan · MADE Gentle', status: 'warn', text: 'Fichiers fournis en version « PERSONAL USE » (mention « Free for personal use ONLY »). Une licence commerciale MadeType est nécessaire avant toute diffusion publique : site en ligne, impression, enseigne.' },
  { font: 'Avigea', status: 'check', text: 'Storytype Studio — « All rights reserved ». Le fichier ne précise pas la licence acquise : vérifier qu’elle couvre l’usage bureau, l’impression et l’intégration web.' },
];

// Contexte et objectifs
export const context = {
  lead: 'Pizza Time fait évoluer son identité : un logo redessiné, plus affirmé, qui garde les repères de la marque et son histoire depuis 1999.',
  values: [
    { name: 'Convivialité', text: 'Une marque proche, que l’on reconnaît au premier coup d’œil.' },
    { name: 'Gourmandise', text: 'Des couleurs chaudes et un lettrage généreux.' },
    { name: 'Générosité', text: 'Un logo qui occupe son espace avec assurance.' },
    { name: 'Qualité', text: 'Un dessin précis et des règles d’usage claires.' },
  ],
  themes: ['Le travail de la pâte', 'La préparation sur place'],
  themesNote: 'Pistes de communication issues du brief. Les accroches et signatures publicitaires sont reportées à une phase ultérieure.',
  goals: [
    { t: 'Moderniser', d: 'Redessiner le lettrage, le cadre et la palette pour une image actuelle.' },
    { t: 'Conserver', d: 'Garder la composition en deux lignes, le bandeau vert et le trio de couleurs.' },
    { t: 'Inscrire l’histoire', d: 'Intégrer « Depuis 1999 » au logo principal.' },
    { t: 'Décliner', d: 'Disposer de versions adaptées à chaque format et à chaque fond.' },
  ],
};

// Comparaison ancien / nouveau
export const comparison = {
  oldCaption: 'Ancien logo — fichier PNG de 512 px fourni, présenté sans retouche.',
  newCaption: 'Nouveau logo principal — fichier vectoriel.',
  rows: [
    { topic: 'Composition', keep: true, old: '« PIZZA » au-dessus de « TIME », sur deux lignes.', now: 'Conservée.' },
    { topic: 'Bandeau', keep: true, old: 'Rectangle vert à bords droits derrière « PIZZA ».', now: 'Conservé, avec un bord supérieur cintré qui suit le cartouche.' },
    { topic: 'Lettrage', keep: false, old: 'Capitales à empattements aux déliés très fins.', now: 'Capitales redessinées, aux traits plus pleins et aux empattements plus marqués.' },
    { topic: 'Lisibilité', keep: false, old: 'Les déliés fins s’amenuisent en petite taille.', now: 'Des traits plus réguliers, qui tiennent mieux à la réduction (voir les essais).' },
    { topic: 'Cadre', keep: false, old: 'Contour noir, plus épais en partie basse.', now: 'Contour vert d’épaisseur régulière, angles arrondis, côtés légèrement bombés.' },
    { topic: 'Couleurs', keep: false, old: 'Vert vif, rouge vif, blanc et noir.', now: 'Vert profond, rouge plus chaud, crème. Le noir disparaît.' },
    { topic: 'Date', keep: false, old: 'Absente.', now: '« Depuis 1999 » est intégré sous « TIME ».' },
    { topic: 'Déclinaisons', keep: false, old: 'Une version unique fournie.', now: 'Un système : principal, sans cadre, horizontales, signature linéaire, composants.' },
    { topic: 'Symbole ®', keep: false, old: 'Présent à droite de « PIZZA ».', now: 'Absent du nouveau dessin. Son usage reste à confirmer selon l’enregistrement de la marque.' },
  ],
};

// Avant / après sur le terrain (paires de content/assets.mjs → MOCKUPS)
export const field = {
  title: 'Sur le terrain',
  lead: 'Deux façades existantes, photographiées avant la refonte, et leur simulation avec la nouvelle identité, au même cadrage.',
  pairs: [
    { before: 'avant-angle', after: 'apres-angle', caption: 'Vue d’angle : le bardage noir devient vert, le logo principal remplace l’ancien caisson et se décline en vitrine et en drapeau.' },
    { before: 'avant-rue', after: 'apres-rue', caption: 'Vue de rue : même façade rouge, nouveau caisson avec cartouche, bandeau vert et pastilles.' },
  ],
};

// Mises en situation photographiques
export const mockupsNote = 'Visuels de simulation : le logo y est reproduit par l’image et peut différer légèrement du fichier vectoriel, qui seul fait foi. Les pastilles « PIZZA · TIME · 1999 », le pictogramme des boîtes vertes et les textes des boîtes rouges sont des éléments de mise en scène, hors système validé.';

// Anatomie du logo principal — repères en unités du viewBox (1559.82 × 1113.2) :
// target = point désigné sur le dessin, pin = pastille numérotée hors du dessin
export const anatomy = [
  { n: 1, t: 'Cartouche', d: 'Contour vert régulier, angles arrondis, côtés légèrement bombés.', target: [13, 760], pin: [-130, 760] },
  { n: 2, t: 'Bandeau', d: 'Fond vert de « PIZZA », bord supérieur cintré.', target: [1150, 78], pin: [1150, -105] },
  { n: 3, t: '« PIZZA »', d: 'Capitales crème sur le bandeau.', target: [230, 300], pin: [-130, 300] },
  { n: 4, t: '« TIME »', d: 'Capitales rouges, posées sur le fond crème.', target: [1300, 720], pin: [1690, 720] },
  { n: 5, t: '« Depuis 1999 »', d: 'Mention verte centrée sous « TIME ».', target: [985, 1033], pin: [1690, 1033] },
];

// Détails agrandis du logo principal (fenêtres en unités du viewBox)
export const details = [
  { t: 'Bord du bandeau', d: 'Le bord supérieur du bandeau suit la courbe du cartouche.', view: [30, 20, 560, 330] },
  { t: 'Empattements', d: 'Des empattements nets et des traits pleins.', view: [140, 560, 1280, 230] },
  { t: 'La mention', d: '« Depuis 1999 » ancre l’histoire de la maison dans le logo.', view: [560, 992, 440, 82] },
];

// Usages recommandés par version (les ids renvoient à content/assets.mjs)
export const systemIntro = 'Le logo principal reste la version de référence. Les déclinaisons prennent le relais quand le format, la taille ou le fond l’exigent.';

// Comportement sur les fonds — constats issus des essais
export const groundNotes = {
  cream: 'Fond de référence : toutes les couleurs du logo sont visibles.',
  green: 'Le contour vert se fond dans le fond : la silhouette est portée par le crème du cartouche.',
  red: 'Le cartouche se détache nettement ; le contour vert reste lisible.',
};
// Exemples d'associations (compositions de démonstration)
export const pairExamples = [
  { bg: 'green', title: 'Nos pizzas', price: '10,50 €', text: 'Titre crème, prix rouge sur pastille crème.' },
  { bg: 'red', promo: 'Offre du moment', text: 'Promotion en italique crème sur rouge.' },
  { bg: 'cream', title: 'Margherita', price: '10,50 €', text: 'Texte vert, prix rouge.' },
];
export const groundsLegend = { yes: 'Recommandé', no: 'Déconseillé' };

// Règles d'usage — recommandations à valider
export const protection = {
  title: 'Espace de protection',
  status: 'Recommandation à valider',
  rule: 'X = largeur du « I » de « TIME », empattements compris.',
  detail: 'Aucun texte, bord de support ou autre élément ne pénètre dans une marge de 1 X autour du logo. La mesure suit la taille du logo : elle se vérifie sur le dessin lui-même.',
  // largeur du I de TIME dans chaque fichier (unités du viewBox, mesurées)
  unit: { 'logo-principal': 136.3, 'horizontal-vert': 122.2 },
};

export const minSizes = {
  title: 'Tailles minimales',
  status: 'À valider par un essai d’impression',
  basis: 'Essais réalisés à l’écran (densité standard) : la mention « Depuis 1999 » devient lisible à partir de 180 px de large sur le logo principal.',
  items: [
    { id: 'logo-principal', screen: 180, print: 40, note: 'En dessous, utiliser la version sans cadre ou une horizontale.' },
    { id: 'logo-sans-cadre', screen: 64, print: 15, note: 'Lettrage seul : reste lisible en petite taille.' },
    { id: 'horizontal-vert', screen: 100, print: 25, note: 'Valable pour toutes les horizontales.' },
    { id: 'signature-lineaire', screen: 180, print: 40, note: 'Limite fixée par la lisibilité de la mention.' },
  ],
  tests: { 'logo-principal': [100, 140, 180, 240], 'logo-sans-cadre': [40, 64, 96], 'horizontal-vert': [64, 100, 140], 'signature-lineaire': [120, 180, 240] },
  printTests: { 'logo-principal': [30, 40, 60], 'logo-sans-cadre': [10, 15, 25], 'horizontal-vert': [20, 25, 40], 'signature-lineaire': [30, 40, 60] },
};

export const donts = [
  { t: 'Déformer', css: 'transform:scaleX(1.45)' },
  { t: 'Faire pivoter', css: 'transform:rotate(-12deg)' },
  { t: 'Changer les couleurs', css: 'filter:hue-rotate(150deg) saturate(1.4)' },
  { t: 'Ajouter un effet', css: 'filter:drop-shadow(8px 10px 0 rgba(0,0,0,.45))' },
  { t: 'Rouge sur vert', special: 'red-on-green' },
  { t: 'Recomposer', special: 'recompose' },
];
export const dontsNote = 'Ne pas non plus redessiner le lettrage, remplacer la mention par une police, ou utiliser l’alternative non validée comme logo.';

// Applications
export const applications = {
  photos: [
    { id: 'facade-lettrage', caption: 'Façade : lettrage sur une ligne et mention, en lettres boîtiers sur le bardage vert.' },
    { id: 'boites-tenue', caption: 'Boîtes rouges : logo principal sur le couvercle ; t-shirt crème.' },
    { id: 'boites-pile', caption: 'Boîtes crème : horizontale verte sur les chants.' },
    { id: 'boites-livraison', caption: 'Livraison : boîtes vertes, horizontale sur les chants ; casquette et manche.' },
  ],
  note: 'Mises en situation et visuels de campagne. Ce ne sont pas des fichiers de fabrication : formats, découpes et textes définitifs restent à établir.',
  sample: 'Textes et prix d’exemple.',
  menu: [
    { name: 'Margherita', desc: 'Tomate, mozzarella, basilic', price: '10,50 €' },
    { name: 'Reine', desc: 'Tomate, mozzarella, jambon, champignons', price: '12,00 €' },
    { name: 'Quatre fromages', desc: 'Crème, mozzarella, gorgonzola, chèvre', price: '13,50 €' },
  ],
};

// Hors système
export const offSystem = {
  alternativeNote: 'Le fichier 9 propose une autre silhouette — rectangle à coins arrondis. Il ne remplace pas le logo principal et n’est pas diffusé.',
};

// Pictogrammes et motifs (fichiers du designer)
export const graphics = {
  title: 'Pictogrammes & motifs',
  lead: 'Une famille de pictogrammes pour la carte et la signalétique, et des motifs qui reprennent le lettrage et le cartouche du logo.',
  status: 'Éléments complémentaires — à valider avec le client',
  iconsLead: 'Six pictogrammes au trait épais et aux angles arrondis, en trois coloris.',
  iconsUse: 'Carte, menus, application, signalétique de comptoir.',
  motifsLead: 'Lettrage ton sur ton, cartouches, rayures et lettrage tricolore. Chaque motif existe aussi sans fond.',
  motifsUse: 'Packaging, papier de comptoir, fonds de PLV et de réseaux sociaux.',
  tintsNote: 'Les motifs ton sur ton utilisent des nuances propres à chaque fond (#EFD6BF, #841818, #7F1414, #0D351A, #EED7BF), en plus des trois couleurs de la palette. À valider comme teintes de motif.',
};

// Visuels PLV
export const plvText = {
  title: 'PLV & campagne',
  lead: 'Bannières et story : photographie produit, motifs et logo principal.',
  note: 'Les accroches figurant sur ces visuels sont des propositions : le compte rendu reportait les signatures publicitaires à une phase ultérieure.',

};

// Synthèse et points à valider
export const summary = {
  essentials: [
    'Le logo principal en priorité, sur crème, vert ou rouge.',
    'Sous 180 px ou 40 mm : version sans cadre ou horizontale.',
    'Trois couleurs, et seulement trois : #0E4725, #C72F27, #FFF6E9.',
    'Avigea pour les titres, MADE Dillan pour les textes et les prix.',
    'Une marge de 1 X autour du logo.',
    'Les fichiers fournis, jamais redessinés ni recolorés.',
  ],
  toValidate: [
    'Licences commerciales des polices MADE et vérification de la licence Avigea.',
    'Valeurs CMJN : épreuve contractuelle chez l’imprimeur.',
    'Espace de protection et tailles minimales proposés.',
    'Usage du symbole ® avec le nouveau logo.',
    'Statut du fichier 9 (alternative non validée).',
  ],
};

export const sections = [
  { id: 'contexte', n: '01', t: 'Contexte' },
  { id: 'avant-apres', n: '02', t: 'Avant / après' },
  { id: 'logo', n: '03', t: 'Le logo' },
  { id: 'evolutions', n: '04', t: 'Évolutions' },
  { id: 'declinaisons', n: '05', t: 'Déclinaisons' },
  { id: 'fonds', n: '06', t: 'Sur les fonds' },
  { id: 'couleurs', n: '07', t: 'Couleurs' },
  { id: 'typographie', n: '08', t: 'Typographie' },
  { id: 'regles', n: '09', t: 'Règles' },
  { id: 'applications', n: '10', t: 'Applications' },
  { id: 'motifs', n: '11', t: 'Pictos & motifs' },
  { id: 'ressources', n: '12', t: 'Ressources' },
];
