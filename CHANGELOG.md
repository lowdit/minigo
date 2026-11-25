# Changelog — minigo

Format : [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), versions
SemVer. Chaque entrée dit **quoi · où · migrer**. « Non publié » = ce que
reçoivent les sites qui suivent `main`. Politique :
`lowtech-dev-method/docs/TAGS-MODULES-HUGO.md`.

## Non publié

Changement d'architecture : minigo devient le **site navigable minimal**
(accueil, rubriques, listes, recherche). Le visuel et la coque viennent de
`lowdit-kit`, que minigo importe : rien à ajouter côté site.

### Cassé

- **`siteProfile = "catalog"` n'est plus posé par défaut** par minigo : le
  modèle par défaut (`catalog`) vient du kit. Même rendu.
  Où : un site qui lisait `site.Params.lowdit.siteProfile` dans ses gabarits.
  Migrer : lire `partial "lowdit/resolve-model.html" .`.
- **Classes `minigo-*` renommées `lowdit-*`** dans tous les gabarits
  (correspondance 1:1 : `minigo-hero` → `lowdit-hero`, `minigo-header__inner`
  → `lowdit-header__inner`, `minigo-card-grid` → `lowdit-card-grid`…).
  Classes de `<body>` `minigo` et `minigo--<kind>` retirées (restent `lowdit`
  et `lowdit--<kind>`).
  Où : CSS ou JS d'un site qui cible `.minigo-*` (ex. `site-overrides.css`,
  feuilles propres au site). Aucune erreur au build : le style ne s'applique
  plus, c'est tout.
  Migrer : remplacer `minigo-` par `lowdit-` dans les sélecteurs du site.
- **CSS retirées de minigo** (41 fichiers : jetons, base, composants, vues,
  `minigo.css`). Elles sont servies par `lowdit-kit` aux mêmes chemins
  publiés (`assets/css/…`, alias `minigo.css` et `lowdit-colors.css`
  conservés).
  Où : un site qui chargeait minigo **sans** passer par les modules Hugo
  (copie dans `themes/minigo`).
  Migrer : charger minigo par chemin de module
  (`theme = ["github.com/lowdit/minigo", …]`), qui apporte le kit.
- **Partials `brand/*` retirés** (`brand/lowdit-home`,
  `brand/lowdit-home-sections`, `brand/ds-diagram-strip`) : copies du site
  Brand, qui garde les siennes.
  Où : un site qui les appelle. Migrer : les copier depuis `lowdit-brand`.
- **`home/publisher` retiré** : copie ancienne de l'accueil éditorial de
  repogo, qui fournit le sien (c'est lui qui s'affichait déjà).
  Où : un site `siteProfile = "publisher"` **sans** repogo : l'accueil
  par défaut s'affiche (plus d'erreur). Migrer : ajouter repogo. Les clés
  `[params.lowdit] featuredBook` et `pinned` sont lues par repogo.
- **Logo et favicons** : valeurs par défaut minigo désormais dans la config du
  module (`[params.lowdit] logo`, `faviconDir`) ; inchangé pour un site qui
  n'y touche pas.

- **Retiré : `_default/list.gallery.html`**, sans effet : Hugo ne le choisit
  pas pour une rubrique `layout: gallery`. La galerie vient de la liste du kit,
  qui lit `layout: gallery`. Où, migrer : rien à faire.

### Déprécié

- **`partial "minigo/main-nav.html"`** → `lowdit/main-nav.html` (kit).
  Warning `lowdit-minigo-main-nav` ; retrait en v0.8.0.

### Déplacé vers le kit (transparent)

Mêmes noms, rien à changer : `_default/baseof`, `_default/single.product`,
`section/installation`, `lowdit/*` (tête, logo, favicon, social-meta, vues,
affichage), `catalog/*`, `components/*`, `debug/*`, `exports/links`,
`home/catalog-grid`, `product/layout`, `assets/js/*` (Mermaid, css-doodle,
débogage), shortcodes `mermaid` et `css-doodle`.

### Ajouté

- Modèles `catalog`, `hub`, `showroom` et l'accueil de `decks` déclarés dans
  `[params.lowdit.models]` ; l'accueil suit `[params.lowdit] model`.
- Feuilles des modèles `thinktank` et `catalog` (`assets/css/views/`),
  venues de `lowdit-kit` (même chemin : transparent).
- La recherche Pagefind se branche par les points d'accroche du kit
  (`lowdit/hooks/{head,header,body-end}`).
- Contrat `contract/api.json` (contrôle : `node ../lowdit-kit/scripts/check-public-api.mjs .`).

## v0.5.0 — 2026-11-02

Fondation `color-scheme`, copie de la marque Brand (dernière version
distribuée par copie). Historique antérieur : `git log`.
