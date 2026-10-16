# Minigo

Coque Hugo **Lowdit** minimale : catalogues de documents, liens vers exports (`print`, `presentation`, `resume`), recherche [**Pagefind**](https://pagefind.app/) optionnelle.

## Sans modules Go (Windows)

```bash
# Copier brand + minigo dans themes/
./../lowdit-brand/scripts/sync-brand.sh themes/minigo
cp -R . themes/minigo   # ou clone dans themes/minigo

# Site
theme = "minigo"
```

## Distribution de la marque

`lowdit-brand` **n'est pas un module Hugo** : c'est un site (marque + design
system) qui centralise tokens, `lowdit-base.css`, `lowdit-system.css`, `views/`
et `components/`. Chaque thème en garde une **copie** pour rester autonome,
rafraîchie par `sync-brand.sh` (voir `../lowdit-brand/scripts/sync-brand.sh`).

Minigo embarque déjà ces assets sous `assets/css/` + `static/assets/css/` :
un site peut donc utiliser `theme = ["minigo", "repogo"]` sans rien d'autre à
importer.

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

Charte éditoriale des vues : **`lowdit-brand/brand/VUES-PREMIUM.md`**. Tokens et CSS : **`lowdit-brand/docs/DESIGN-SYSTEM.md`**. Sync : `../lowdit-brand/scripts/sync-brand.sh .`

## GitHub Pages

- `.github/workflows/gh-pages.yml` + `scripts/hugo-pages-build.sh`
- **Démo thème** : `.github/hugo-site-dir` contient `exampleSite`
- **Site utilisateur à la racine** : `content/` + `hugo.toml` à la racine → mettre `.` dans `.github/hugo-site-dir`
- Override : variable `HUGO_SITE_DIR` ou entrée manuelle *workflow_dispatch*

Empilement typique : `theme = ["minigo", "repogo"]` — voir `lowdit-brand/docs/PLAN-UNIVERS-SITES.md` et `docs/COHABITATION-VUES.md`.

### Galerie catalog

Partials `layouts/_partials/catalog/` — consommés par resugo, sligo, repogo. **Importer minigo** (`[module.imports]` + `replace` local dans `go.mod`). Listes : `layout: gallery` sur l’`_index` de section (minigo/repogo/resugo).
