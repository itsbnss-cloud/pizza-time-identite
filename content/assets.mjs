// Registre unique des fichiers de l'identité Pizza Time.
// Source : dossier « SVG » d'origine (jamais modifié). Les copies harmonisées
// sont écrites dans assets/logos/ par scripts/assets.mjs.
//
// status :
//   valide      → version validée, présentée et téléchargeable
//   composant   → élément de construction (kit graphiste), non présenté comme logo
//   alternative → proposition non validée, présentée à part, non téléchargeable
//   reference   → copie conforme pour mémoire (palette, ancien logo), non harmonisée
//   exclu       → doublon ou artefact d'export, non copié

export const SOURCE_DIR = '../SVG';
export const OLD_LOGO_SRC = '../cropped-pizzatime-512x512-logo.png';

// Remplacements de couleurs autorisés (copies uniquement).
// Référence : « Fichier 11pizza time.svg ».
export const COLOR_MAP = {
  '#084027': '#0E4725', // vert plus sombre présent dans certaines déclinaisons
  '#fff0de': '#FFF6E9', // crème plus rosé (liseré extérieur des versions horizontales et du fichier 9)
  '#fff': '#FFF6E9', // blanc pur sur un micro-tracé d'export du fichier 8
  '#0e4725': '#0E4725',
  '#c72f27': '#C72F27',
  '#fff6e9': '#FFF6E9',
};
// Tracés sans couleur déclarée (noir par défaut) : micro-tracés d'export de
// surface quasi nulle, posés sur le fond crème. On leur attribue le crème.
export const DEFAULT_FILL = '#FFF6E9';

export const ASSETS = [
  {
    id: 'logo-principal', src: 'Fichier 8pizza time.svg', status: 'valide',
    dir: '01_logo-principal', file: 'pizza-time_logo-principal.svg',
    label: 'Logo principal',
    role: 'Version de référence : cartouche, bandeau vert, lettrage, mention « Depuis 1999 ».',
    usage: 'Enseigne, packaging, couverture, prises de parole principales.',
    grounds: ['cream', 'green', 'red'],
  },
  {
    id: 'logo-sans-cadre', src: 'Fichier 13pizza time.svg', status: 'valide',
    dir: '02_declinaisons', file: 'pizza-time_logo-sans-cadre.svg',
    label: 'Version sans cadre',
    role: 'Le bandeau et le lettrage du logo principal, sans cartouche ni mention.',
    usage: 'Sur fond crème uniquement : menus, papeterie, supports déjà cadrés.',
    grounds: ['cream'],
  },
  {
    id: 'horizontal-vert', src: 'Fichier 5pizza time.svg', status: 'valide',
    dir: '02_declinaisons', file: 'pizza-time_horizontal_vert.svg',
    label: 'Horizontale — verte',
    role: 'Déclinaison horizontale de référence, cernée d’un liseré crème.',
    usage: 'Bandeaux, en-têtes de site, façades étroites, réseaux sociaux.',
    grounds: ['cream', 'green', 'red'], family: 'horizontal',
  },
  {
    id: 'horizontal-rouge', src: 'Fichier 3pizza time.svg', status: 'valide',
    dir: '02_declinaisons', file: 'pizza-time_horizontal_rouge.svg',
    label: 'Horizontale — rouge',
    role: 'Fond rouge, « TIME » dans le bloc crème.',
    usage: 'Supports promotionnels, sur fond crème ou vert.',
    grounds: ['cream', 'green'], family: 'horizontal',
  },
  {
    id: 'horizontal-vert-bicolore', src: 'Fichier 4pizza time.svg', status: 'valide',
    dir: '02_declinaisons', file: 'pizza-time_horizontal_vert-bicolore.svg',
    label: 'Horizontale — vert et crème',
    role: 'Version bicolore, sans rouge.',
    usage: 'Impressions deux tons, tampons, marquages simples.',
    grounds: ['cream', 'red'], family: 'horizontal',
  },
  {
    id: 'horizontal-creme-vert', src: 'Fichier 6pizza time.svg', status: 'valide',
    dir: '02_declinaisons', file: 'pizza-time_horizontal_creme-vert.svg',
    label: 'Horizontale — crème et vert',
    role: 'Fond crème, lettrage vert.',
    usage: 'Sur fond vert ou rouge, ou sur photo sombre.',
    grounds: ['green', 'red'], family: 'horizontal',
  },
  {
    id: 'horizontal-creme-rouge', src: 'Fichier 7pizza time.svg', status: 'valide',
    dir: '02_declinaisons', file: 'pizza-time_horizontal_creme-rouge.svg',
    label: 'Horizontale — crème et rouge',
    role: 'Fond crème, lettrage rouge.',
    usage: 'Sur fond vert ou rouge.',
    grounds: ['green', 'red'], family: 'horizontal',
  },
  {
    id: 'horizontal-sans-cadre', src: 'Fichier 2pizza time.svg', status: 'valide',
    dir: '02_declinaisons', file: 'pizza-time_horizontal_sans-cadre.svg',
    label: 'Horizontale — sans cadre',
    role: '« PIZZA » crème et bloc « TIME », sans fond.',
    usage: 'Directement sur fond vert ou rouge.',
    grounds: ['green', 'red'], family: 'horizontal',
  },
  {
    id: 'signature-lineaire', src: 'Fichier 10pizza time.svg', status: 'valide',
    dir: '02_declinaisons', file: 'pizza-time_signature-lineaire_creme.svg',
    label: 'Signature linéaire',
    role: 'Lettrage sur une ligne et mention, monochrome crème.',
    usage: 'Sur fond vert ou rouge : signatures, vidéos, petits espaces en longueur.',
    grounds: ['green', 'red'],
  },

  // Composants graphiques
  { id: 'cadre-contour', src: 'Fichier 16pizza time.svg', status: 'composant', dir: '03_composants', file: 'pizza-time_cadre_contour-vert.svg', label: 'Cadre — contour vert', grounds: ['cream'] },
  { id: 'cadre-fond', src: 'Fichier 18pizza time.svg', status: 'composant', dir: '03_composants', file: 'pizza-time_cadre_fond-creme.svg', label: 'Cadre — fond crème', grounds: ['green'] },
  { id: 'lettrage-empile', src: 'Fichier 19pizza time.svg', status: 'composant', dir: '03_composants', file: 'pizza-time_lettrage-empile.svg', label: 'Lettrage empilé', grounds: ['green'] },
  { id: 'lettrage-empile-1999', src: 'Fichier 20pizza time.svg', status: 'composant', dir: '03_composants', file: 'pizza-time_lettrage-empile_depuis-1999.svg', label: 'Lettrage empilé + mention', grounds: ['green'] },
  { id: 'mot-pizza-principal', src: 'Fichier 22pizza time.svg', status: 'composant', dir: '03_composants', file: 'pizza-time_mot-pizza_logo-principal_creme.svg', label: '« PIZZA » du logo principal', grounds: ['green'] },
  { id: 'mot-time-principal', src: 'Fichier 23pizza time.svg', status: 'composant', dir: '03_composants', file: 'pizza-time_mot-time_logo-principal_rouge.svg', label: '« TIME » du logo principal', grounds: ['cream'] },
  { id: 'mot-pizza-horizontal', src: 'Fichier 24pizza time.svg', status: 'composant', dir: '03_composants', file: 'pizza-time_mot-pizza_horizontal_creme.svg', label: '« PIZZA » de l’horizontale', grounds: ['green'] },
  { id: 'mot-time-horizontal', src: 'Fichier 25pizza time.svg', status: 'composant', dir: '03_composants', file: 'pizza-time_mot-time_horizontal_creme.svg', label: '« TIME » de l’horizontale', grounds: ['red'] },
  { id: 'mention-vert', src: 'Fichier 12pizza time.svg', status: 'composant', dir: '03_composants', file: 'pizza-time_mention-depuis-1999_vert.svg', label: 'Mention « Depuis 1999 » — vert', grounds: ['cream'] },
  { id: 'mention-creme', src: 'Fichier 21pizza time.svg', status: 'composant', dir: '03_composants', file: 'pizza-time_mention-depuis-1999_creme.svg', label: 'Mention « Depuis 1999 » — crème', grounds: ['green'] },

  // Alternative non validée
  {
    id: 'alternative-cartouche-arrondi', src: 'Fichier 9pizza time.svg', status: 'alternative',
    dir: '04_alternatives-non-validees', file: 'pizza-time_alternative_cartouche-arrondi.svg',
    label: 'Cartouche arrondi',
    role: 'Même lettrage dans un rectangle à coins arrondis : silhouette différente du logo principal.',
    usage: 'Proposition alternative, non validée. Ne remplace pas le logo principal.',
    grounds: ['cream'],
  },

  // Références (copies conformes, non harmonisées)
  { id: 'palette-reference', src: 'Fichier 11pizza time.svg', status: 'reference', dir: '05_references', file: 'pizza-time_palette-reference.svg', label: 'Palette de référence', keepAsIs: true },

  // Exclus
  { id: 'doublon-horizontal', src: 'Fichier 1pizza time.svg', status: 'exclu', label: 'Doublon de « Fichier 5 » (tracés identiques, vert #084027 et liseré #FFF0DE)' },
  { id: 'artefact-14', src: 'Fichier 14pizza time.svg', status: 'exclu', label: 'Artefact d’export (micro-tracé de 1,6 × 2,1 unités, sans couleur)' },
  { id: 'artefact-15', src: 'Fichier 15pizza time.svg', status: 'exclu', label: 'Artefact d’export (micro-tracé de 1,3 × 1,1 unités, sans couleur)' },
  { id: 'artefact-17', src: 'Fichier 17pizza time.svg', status: 'exclu', label: 'Artefact d’export (micro-tracé blanc de 1,3 × 1,1 unités)' },
];

export const OLD_LOGO = {
  id: 'ancien-logo', status: 'reference', dir: '05_references',
  file: 'pizza-time_ancien-logo_512px.png', label: 'Ancien logo (PNG 512 px, non retouché)',
};

// Visuels de mise en situation (dossier « Mokcups », jamais modifié).
// Copies web/impression : JPEG, 2000 px max. Le logo y est rendu par l'image :
// ces visuels illustrent, ils ne font pas foi pour le dessin.
export const MOCKUP_DIR = '../Mokcups';
export const MOCKUPS = [
  { id: 'avant-angle', src: 'Argenteuil.jpg', file: 'avant_facade-angle.jpg', kind: 'avant', label: 'Façade existante, vue d’angle' },
  { id: 'apres-angle', src: 'Façade Pizza Time rénovée-2.png', file: 'apres_facade-angle.jpg', kind: 'apres', pair: 'avant-angle', label: 'Façade rénovée, vue d’angle' },
  { id: 'avant-rue', src: 'pizza-time_29554_489.webp', file: 'avant_facade-rue.jpg', kind: 'avant', label: 'Façade existante, vue de rue' },
  { id: 'apres-rue', src: 'Façade Pizza Time en vert et rouge-1.png', file: 'apres_facade-rue.jpg', kind: 'apres', pair: 'avant-rue', label: 'Façade rénovée, vue de rue' },
  { id: 'facade-lettrage', src: 'Nouvelle identité de façade Pizza Time-3.png', file: 'apres_facade-rue_lettres-boitiers.jpg', kind: 'situation', label: 'Façade en lettres boîtiers' },
  { id: 'boites-tenue', src: 'Identité Pizza Time sur boîtes à pizza-3.png', file: 'situation_boites-rouges.jpg', kind: 'situation', label: 'Boîtes rouges et t-shirt' },
  { id: 'boites-pile', src: 'Empilement de boîtes Pizza Time-1.png', file: 'situation_boites-empilees.jpg', kind: 'situation', label: 'Boîtes crème empilées' },
  { id: 'boites-livraison', src: 'Livraison Pizza Time, quatre boîtes vertes-2.png', file: 'situation_livraison.jpg', kind: 'situation', label: 'Livraison, boîtes vertes' },
];

// Pictogrammes et motifs du designer (dossier « Patern + Icones », jamais modifié).
// Copies conformes : aucune retouche de couleur ni de tracé.
export const GRAPHICS_DIR = '../Patern + Icones ';
const iconNames = ['salade', 'boisson', 'finger-food', 'dessert', 'sandwich', 'pizza'];
const iconLabels = ['Salade', 'Boisson', 'Finger food', 'Dessert', 'Sandwich', 'Pizza'];
const ways = [['rouge', 26], ['vert', 32], ['creme', 38]];
export const ICONS = iconNames.flatMap((n, i) => ways.map(([w, start]) => ({
  id: `picto-${n}-${w}`, name: n, label: iconLabels[i], way: w, src: `Fichier ${start + i}pizza time.svg`, file: `pizza-time_picto_${n}_${w}.svg`,
})));
export const ICON_WAYS = [
  { id: 'rouge', label: 'Contour rouge', bg: 'cream' },
  { id: 'vert', label: 'Contour vert', bg: 'cream' },
  { id: 'creme', label: 'Crème', bg: 'green' },
];
// show : présenté sur le site et dans le PDF ; les autres sont dans le ZIP
export const MOTIFS = [
  { n: 44, file: 'pizza-time_motif_lettrage-ton-sur-ton_creme.svg', label: 'Lettrage ton sur ton — crème', show: true },
  { n: 45, file: 'pizza-time_motif_lettrage-ton-sur-ton_rouge.svg', label: 'Lettrage ton sur ton — rouge', show: true },
  { n: 46, file: 'pizza-time_motif_lettrage-ton-sur-ton_vert.svg', label: 'Lettrage ton sur ton — vert', show: true },
  { n: 47, file: 'pizza-time_motif_cartouches_vert.svg', label: 'Cartouches — vert', show: true },
  { n: 48, file: 'pizza-time_motif_cartouches_rouge.svg', label: 'Cartouches — rouge' },
  { n: 49, file: 'pizza-time_motif_cartouches_creme.svg', label: 'Cartouches — crème' },
  { n: 50, file: 'pizza-time_motif_rayures.svg', label: 'Rayures', show: true },
  { n: 51, file: 'pizza-time_motif_lettrage-cartouche_creme.svg', label: 'Lettrage en cartouches — crème', show: true },
  { n: 52, file: 'pizza-time_motif_lettrage-decale_creme.svg', label: 'Lettrage décalé — crème', show: true },
  { n: 53, file: 'pizza-time_motif_lettrage-empile_creme.svg', label: 'Lettrage empilé — crème', show: true },
  { n: 54, file: 'pizza-time_motif_lettrage-ton-sur-ton_creme_sans-fond.svg', label: 'Lettrage ton sur ton — crème, sans fond' },
  { n: 55, file: 'pizza-time_motif_lettrage-ton-sur-ton_rouge_sans-fond.svg', label: 'Lettrage ton sur ton — rouge, sans fond' },
  { n: 56, file: 'pizza-time_motif_lettrage-ton-sur-ton_vert_sans-fond.svg', label: 'Lettrage ton sur ton — vert, sans fond' },
  { n: 57, file: 'pizza-time_motif_cartouches_vert_sans-fond.svg', label: 'Cartouches — vert, sans fond' },
  { n: 58, file: 'pizza-time_motif_cartouches_rouge_sans-fond.svg', label: 'Cartouches — rouge, sans fond' },
  { n: 59, file: 'pizza-time_motif_cartouches_creme_sans-fond.svg', label: 'Cartouches — crème, sans fond' },
  { n: 60, file: 'pizza-time_motif_lettrage-decale_sans-fond.svg', label: 'Lettrage décalé — sans fond' },
  { n: 61, file: 'pizza-time_motif_lettrage-empile_sans-fond.svg', label: 'Lettrage empilé — sans fond' },
  { n: 62, file: 'pizza-time_motif_lettrage-cartouche_sans-fond.svg', label: 'Lettrage en cartouches — sans fond' },
].map((m) => ({ ...m, id: `motif-${m.n}`, src: `Fichier ${m.n}pizza time.svg` }));

// Visuels PLV / campagne (dossier « Visuels PLV », jamais modifié)
export const PLV_DIR = '../Visuels PLV';
export const PLV = [
  { id: 'plv-banniere-rouge', src: 'Plan de travail 1.jpg', file: 'plv_banniere_rouge.jpg', label: 'Bannière — fond rouge' },
  { id: 'plv-banniere-creme', src: 'Plan de travail 2.jpg', file: 'plv_banniere_creme.jpg', label: 'Bannière — fond crème et rayures' },
  { id: 'plv-story', src: 'Plan de travail 3.jpg', file: 'plv_story.jpg', label: 'Story verticale' },
];
