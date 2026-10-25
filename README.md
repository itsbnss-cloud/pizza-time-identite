# Pizza Time — Identité visuelle

Site de présentation et charte graphique PDF, générés depuis **une seule source** de contenus.

## Livrables

| Quoi | Où |
|---|---|
| Site prêt à déployer (statique) | `dist/` |
| Charte PDF (A4 paysage, 32 p.) | `dist/telechargements/pizza-time_charte-graphique_v1.pdf` |
| Logos organisés et harmonisés (SVG + PNG 3000 px + ZIP) | `assets/logos/` |
| Visuels de mise en situation (copies JPEG du dossier `Mokcups/`) | `assets/mockups/` |
| Pictogrammes, motifs et visuels PLV du designer (copies conformes) | `assets/pictos/`, `assets/motifs/`, `assets/plv/` |
| Table de correspondance + journal des couleurs | `assets/CORRESPONDANCE.md`, `assets/remplacements-couleurs.csv` |

Les dossiers sources `../SVG/` et `../Mokcups/` ne sont jamais modifiés (le dossier SVG reste identique à `../SVG.zip`).

## Lancer le projet

Prérequis : Node.js 18 ou plus.

```bash
npm install
npx playwright install chromium
npm run all      # assets → site → PDF
npm run serve    # aperçu sur http://localhost:4173
```

Commandes séparées :

- `npm run assets` — recopie et harmonise les SVG, génère les motifs, exporte les PNG, les visuels et les ZIP, réécrit la table de correspondance.
- `npm run build` — régénère le site (`dist/`) et la source du PDF (`build/print.html`).
- `npm run pdf` — imprime le PDF avec Chromium et signale tout texte hors marge, coupé ou hors page (`node scripts/pdf.mjs --strict` échoue en cas d'alerte).

## Modifier le contenu

| Pour changer… | Fichier |
|---|---|
| Textes, couleurs, règles, typographie, sections | `content/brand.mjs` |
| Classement des fichiers, statuts, usages, fonds recommandés, visuels de mise en situation | `content/assets.mjs` |
| Mise en page du site | `src/site/template.mjs`, `src/site/site.css`, `src/site/site.js` |
| Mise en page du PDF | `src/print/template.mjs`, `src/print/print.css` |
| Maquettes d'application (communes aux deux) | `src/shared.mjs` |

Après modification : `npm run build && npm run pdf` (ajouter `npm run assets` si `content/assets.mjs` change).

## Outils de contrôle

- `node tools/check-site.mjs http://localhost:4173/` — débordements à 1440 / 820 / 375 px, liens et téléchargements, copie des codes, clavier, animations réduites.
- `node tools/pdf2png.mjs <pdf> <dossier>` — rendu des pages en PNG pour relecture.
- `node tools/pdf-images.mjs <pdf>` — liste les images matricielles par page (les logos doivent rester vectoriels).

## Déploiement (GitHub Pages)

Le site est publié depuis le dépôt GitHub `itsbnss-cloud/pizza-time-identite` : https://itsbnss-cloud.github.io/pizza-time-identite/

Pour mettre le site en ligne après une modification :

```bash
npm run all
npm run deploy
```

`npm run deploy` enregistre les changements sur la branche `main`, puis publie le contenu de `dist/` sur la branche `gh-pages`, que GitHub Pages sert directement (mise en ligne en une à deux minutes). `dist/robots.txt` demande aux moteurs de ne pas indexer le site.

Attention : le dépôt et le site sont publics, polices comprises (`dist/fonts/`).

## Points à confirmer avant diffusion publique

- **Polices** : MADE Dillan et MADE Gentle sont des versions « PERSONAL USE » — une licence commerciale MadeType est nécessaire (site en ligne, impression, enseigne). Le site GitHub Pages les sert publiquement, à la demande du designer. Avigea (Storytype Studio) : vérifier que la licence couvre l'intégration web. Les polices servent à l'affichage du site et ne sont pas proposées au téléchargement.
- **CMJN** : valeurs indicatives (sRGB → Coated FOGRA39, colorimétrie relative), à valider par BAT.
- **Espace de protection et tailles minimales** : recommandations issues des essais, à valider.
- **Visuels de mise en situation** : le logo y est rendu par l'image (léger écart avec le SVG) ; pastilles « PIZZA · TIME · 1999 » et pictogramme des boîtes vertes hors système. Vérifier les droits de la photo `pizza-time_29554_489.webp` et la présence de passants sur la photo d'Argenteuil avant diffusion publique.
- **Pictogrammes et motifs** : présentés comme éléments complémentaires à valider ; teintes ton sur ton hors palette à valider.
- **Accroches des visuels PLV** : propositions (les signatures étaient reportées à une phase ultérieure).
- **Symbole ®** et **statut du fichier 9** : à confirmer.

Remarque disque externe : sur un disque exFAT, macOS crée des fichiers `._*` ; les scripts les suppriment de `dist/` et les excluent des ZIP.
