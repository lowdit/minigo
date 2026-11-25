# Minigo

Coque Hugo **Lowdit** minimale : catalogues de documents, liens vers exports (`print`, `presentation`, `resume`), recherche [**Pagefind**](https://pagefind.app/) optionnelle.

## Place dans l'univers

Minigo = **site navigable minimal** : accueil, rubriques, listes, pagination,
RSS, recherche. Il n'a ni CSS ni gabarit de base : la coque (gabarit `baseof`,
jetons, Overgo, composants, vues) vient de [`lowdit-kit`](../lowdit-kit), qu'il
importe. Minigo étend le gabarit du kit par ses points d'accroche
(`layouts/_partials/lowdit/hooks/` : recherche Pagefind) et fournit le logo et
les favicons minigo par défaut (`[params.lowdit]` dans `config.toml`).

```toml
theme = ["github.com/lowdit/minigo", "github.com/lowdit/repogo"]
[module]
  workspace = "../bin/hugo.work"   # local ; "off" en production (go.mod)
```

## Example site + Pagefind

```bash
cd exampleSite && hugo mod get ./...
../scripts/build-with-pagefind.sh exampleSite
hugo -s exampleSite server
```

## Params (`params.lowdit`)

| Clé | Défaut | Description |
|-----|--------|-------------|
| `search` | `""` | `"pagefind"` active la barre (après `pagefind --site public`) |
| `mainSections` | `["reports"]` | Sections pour « Derniers documents » |
| `listStyle` | `timeline` | `timeline`, `cards`, ou section `_index` avec `layout: gallery` |
| `showDate` / `showSummary` | `true` | Listes |
| `showPrintLink` | `true` | Si output `print` existe (Repogo) |
| `view` | *(auto)* | Vue premium : `publisher`, `deck-studio`, `thinktank`, `cv-vitrine`, `inquiry`, `catalog`, ou `none` |
| `skin` | — | Alias de `view` (rétrocompat.) |

Charte éditoriale des vues : **`lowdit-brand/brand/VUES-PREMIUM.md`**. Jetons et CSS : **`lowdit-kit`** (voir son README).

## GitHub Pages

- `.github/workflows/gh-pages.yml` + `scripts/hugo-pages-build.sh`
- **Démo thème** : `.github/hugo-site-dir` contient `exampleSite`
- **Site utilisateur à la racine** : `content/` + `hugo.toml` à la racine → mettre `.` dans `.github/hugo-site-dir`
- Override : variable `HUGO_SITE_DIR` ou entrée manuelle *workflow_dispatch*

Empilement typique : `theme = ["minigo", "repogo"]` — voir `lowdit-brand/docs/PLAN-UNIVERS-SITES.md` et `docs/COHABITATION-VUES.md`.

### Galerie catalog

Partials `catalog/` (servis par `lowdit-kit`) — consommés par resugo, sligo, repogo. Listes : `layout: gallery` sur l’`_index` de section (minigo/repogo/resugo).
