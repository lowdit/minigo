# Architecture CSS — Minigo

Stratification ITCSS (ordre des imports dans `layouts/_default/baseof.html`),
sans build pipeline : les fichiers CSS sont servis bruts (via `resources.Get`
ou chemins statiques). Volonté lowtech — pas de SCSS/PostCSS.

## Couches (de la plus générique à la plus spécifique)

| # | Couche ITCSS | Fichier | Rôle |
|---|---|---|---|
| 1 | settings | `assets/css/tokens/*.css` (+ `lowdit-colors.css`) | Variables CSS (couleurs, layout, motion, elevation) — chargées par le partial `lowdit/view-tokens.html`, **avant** reset/base. |
| 2 | generic | `assets/css/base/reset.css` | Reset navigateur neutre (box-sizing, marges, listes, médias, reduced-motion). Aucune marque ni composant. |
| 3 | elements | `assets/css/lowdit-base.css` | Styles de base des éléments (html, body, titres, liens) typés avec les tokens |
| 4 | system + views | `assets/css/lowdit-system.css`, `assets/css/views/*.css` | Système partagé puis vues produit (publisher, cv-vitrine, deck-studio, inquiry, catalog, thinktank) |
| 5 | components | `assets/css/minigo.css` | Composants de la coque commune (header, nav, hero, listes, grilles) |
| 6 | utilities | `assets/css/utils.css` | Classes utilitaires réutilisables (skip-links). En dernier : elles peuvent surcharger sans `!important`. |
| 7 | doc | `assets/css/product-doc.css` | Habillage des pages de documentation produit |
| 8 | site | `assets/css/site-overrides.css` | **Optionnel, côté site** : surcharges d'un site consommant le thème (hook dans le baseof — ne jamais forker le baseof) |

## Règles

- **Ne pas forker `baseof.html`** : un site qui consomme Minigo (symlink ou
  Hugo Module) dépose ses surcharges dans son propre
  `assets/css/site-overrides.css` — chargé automatiquement en dernière position.
- **Une utility** (couche 6) n'a pas de sémantique de composant ; si elle
  décrit un composant, elle va dans `minigo.css` ou `css/views/*.css`.
- **Ordre à respecter** : ajouter un fichier exige de le placer dans la bonne
  couche du tableau ci-dessus, jamais « à la fin » par défaut.
- **Pas de `!important`** sauf overrides navigateur légitimes (reduced-motion).

## Historique

- 2026-10-16 : séparation des settings dans `lowdit/view-tokens.html` (chargé
  avant reset/base) ; suppression des `@import` redondants de `lowdit-system.css`
  (fin du double chargement des tokens) et de l'`@import` cassé de `lowdit-base.css`.
- 2026-10-15 : extraction des utilities de `minigo.css` → `utils.css` ; ajout
  du reset (`base/reset.css`) ; hook `site-overrides.css` pour les sites ;
  skip-links alignés entre Minigo et lowdit-brand (fork baseof supprimé).
