# Architecture CSS — Minigo

Stratification ITCSS (ordre des imports dans `layouts/_default/baseof.html`),
sans build pipeline : les fichiers CSS sont servis bruts (via `resources.Get`
ou chemins statiques). Volonté lowtech — pas de SCSS/PostCSS.

## Couches (de la plus générique à la plus spécifique)

| # | Couche ITCSS | Fichier | Rôle |
|---|---|---|---|
| 1 | settings | `assets/css/tokens/*.css` (+ `lowdit-colors.css`) | Variables CSS (couleurs, layout, motion, elevation) — chargées par le partial `lowdit/view-tokens.html`, **avant** reset/base. |
| 2 | generic | `assets/css/base/reset.css` | Reset navigateur neutre (box-sizing, `scrollbar-gutter: stable` sur `html`, marges, listes, médias, reduced-motion). Aucune marque ni composant. |
| 3 | elements | `assets/css/base/typography.css` puis `assets/css/lowdit-base.css` | **Typographie fluide** (`clamp`) : taille des titres, corps, `dl/dt/dd`, citations, code — rétablit ce que le reset neutralise (`h1..h6 { font-size: inherit }`). Puis familles/interlignes et prose des éléments. |
| 4 | system + views | `assets/css/lowdit-system.css`, `assets/css/views/*.css` | Système partagé puis vues produit (publisher, cv-vitrine, deck-studio, inquiry, catalog, thinktank) |
| 5 | components | `assets/css/minigo.css` | Composants de la coque commune (header, nav, hero, listes, grilles) |
| 6 | utilities | `assets/css/utils.css` | Classes utilitaires réutilisables (skip-links). En dernier : elles peuvent surcharger sans `!important`. |
| 7 | doc | `assets/css/product-doc.css` | Habillage des pages de documentation produit |
| 8 | site | `assets/css/site-overrides.css` | **Optionnel, côté site** : surcharges d'un site consommant le thème (hook dans le baseof — ne jamais forker le baseof) |

## Accessibilité (exigence)

Toute modification de couche (tokens, base, composants, utilities) suit la **stratégie a11y thème** : [`A11Y-DEVELOPMENT.md`](A11Y-DEVELOPMENT.md) · [`../../lowtech-dev-method/docs/STRATEGIE-A11Y-THEME-MINIGO.md`](../../lowtech-dev-method/docs/STRATEGIE-A11Y-THEME-MINIGO.md).  
Attention aux **conflits de spécificité** entre prose (`.lowdit-product__content a`) et composants (`a.minigo-btn`).

## Schémas de couleur (2026-11-02)

Arbitrage **progressif** (option A étendue) — voir [`../../lowdit-brand/brand/PALETTE.md`](../../lowdit-brand/brand/PALETTE.md) et [`../../lowdit-brand/DECISIONS.md`](../../lowdit-brand/DECISIONS.md).

| Règle | Détail |
| --- | --- |
| Défaut | Clair : `color-scheme: light` sur `:root` avec jetons `--lowdit-color-*` dans `assets/css/tokens/colors.css` (servi aussi comme `static/assets/css/lowdit-colors.css`). |
| Sombre explicite | `html[data-theme="dark"]` ou `data-theme="light"` force le schéma. |
| OS | `prefers-color-scheme` **uniquement** si `data-theme="auto"`. |
| Hors scope jalon | Pas de `light-dark()` ; pas de sombre implicite sans attribut ; vues premium / coque (`minigo.css`, `views/*`) restent sur couleurs littérales tant qu'elles ne consomment pas les rôles sémantiques. |
| Exceptions | Frago Overgo (OS direct), Higo (`data-theme` + JS), Sligo decks (`colorway`) — documentées dans l'inventaire Brand. |

La prose de base (`lowdit-base.css`) et `html` consomment les rôles sémantiques ; le reste de la coque migre incrément par incrément.

## Règles

- **Ne pas forker `baseof.html`** : un site qui consomme Minigo (symlink ou
  Hugo Module) dépose ses surcharges dans son propre
  `assets/css/site-overrides.css` — chargé automatiquement en dernière position.
- **Une utility** (couche 6) n'a pas de sémantique de composant ; si elle
  décrit un composant, elle va dans `minigo.css` ou `css/views/*.css`.
- **Ordre à respecter** : ajouter un fichier exige de le placer dans la bonne
  couche du tableau ci-dessus, jamais « à la fin » par défaut.
- **Pas de `!important`** sauf overrides navigateur légitimes (reduced-motion).

## Choix de codage (position CSS du kit)

Décision humaine 2026-10-25 (`P-minigo-card-titre-pattern-01`) après revue du
bloc `.minigo-card` en session directe.

1. **Component-scope d'abord** — le style d'un composant vit dans le bloc du
   composant (`minigo.css`, ou `views/*.css` quand c'est une vue). Les
   **utilities** (`utils.css`) sont réservées aux primitives réutilisables
   hors de tout composant (skip-links, `.visually-hidden`). Un site sans
   composants partout ne supporte pas une cascade d'utilities
   sémantiquement creuses : la maintenance se fait par bloc, pas par
   famille de classes atomiques.
2. **BEM allégé** — BEM garde le bloc (`.minigo-card`), les variantes
   (`--audience`, `--pillar`) et les éléments dont le rôle est réellement
   distinct (`__kicker`, `__meta`, `__summary`). À l'intérieur du bloc, quand
   le partial garantit la structure, on préfère les **sélecteurs structuraux**
   (`.minigo-card h3`) à des classes d'élément qui ne changent rien pour un
   humain qui relit. Exemple : `.minigo-card h3` au lieu de
   `.minigo-card__heading`, `.minigo-card h3 a` au lieu de `__title-link`.
3. **Un markup par pattern** — un même rôle visuel (titre de carte) n'est pas
   déclaré trois fois (`a` nu, `__title-link`, `__heading`). Un seul markup
   répond au lien et sans lien :
   `<h3><a href="…">Titre</a></h3>` — le lien s'étend à la carte via
   `::after` (`inset: 0`), le titre reste un heading réel. Limite assumée :
   le texte sous l'overlay n'est pas sélectionnable à la souris.
4. **CSS moderne + ancien, sans fiche de compat** —
   - **Repli d'abord, amélioration ensuite** : déclarer la valeur token simple
     (`border-color: var(--lowdit-border-subtle)`) PUIS la version moderne
     (`color-mix(...)`) dans la même règle. Un moteur ancien garde la première,
     un récent l'écrase.
   - **Amélioration tolérante au parsage** : `:has()`, `@property`, style
     queries… vivent dans une règle que le vieux moteur ignore ENTIÈREMENT.
     Dégrader est ok (pas de levée, pas d'icône) ; casser non.
   - Pas de polyfill ni d'arborescence `@supports` systématique : une compat
     se justifie par un cas réel (« vieilles machines » citées), pas par
     principe — cf. conventions de code § compatibilité.
   - Tokens avec replis hex inline quand la couche qui les consomme peut
     charger sans la couche settings (site-specific).

## Historique

- 2026-11-02 : jetons sémantiques clair/sombre opt-in dans `tokens/colors.css` ; prose `lowdit-base.css` branchée sur `--lowdit-color-*` ; section « Schémas de couleur » (P-brand-color-scheme-css-01).
- 2026-10-26 : navigation du header — suppression de `.minigo-nav__spacer`,
  Installation reste le dernier élément ; sous 40 rem la navigation passe sur
  sa propre ligne, sous 48 rem les liens visent **44 × 44 px** (16 px de
  texte), au-dessus `min-height: 1.5rem` (cible WCAG 2.2 de 24 px).
- 2026-10-16 : ajout de la couche **typographie** (`assets/css/base/typography.css`,
  chargée après le reset) — échelle fluide `clamp` pour `h1..h6` et éléments de
  base ; correction de `.minigo-page-header h1` (sans `font-size` depuis le reset).
- 2026-10-16 : séparation des settings dans `lowdit/view-tokens.html` (chargé
  avant reset/base) ; suppression des `@import` redondants de `lowdit-system.css`
  (fin du double chargement des tokens) et de l'`@import` cassé de `lowdit-base.css`.
- 2026-10-15 : extraction des utilities de `minigo.css` → `utils.css` ; ajout
  du reset (`base/reset.css`) ; hook `site-overrides.css` pour les sites ;
  skip-links alignés entre Minigo et lowdit-brand (fork baseof supprimé).
