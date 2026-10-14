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

## Avec modules Hugo

```toml
[module]
  [[module.imports]]
    path = "github.com/lowdit/brand"
  [[module.imports]]
    path = "github.com/lowdit/minigo"
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

Empilement typique : `theme = ["minigo", "repogo"]` — voir `lowdit-brand/docs/PLAN-UNIVERS-SITES.md`.

### Galerie catalog

Partials `layouts/_partials/catalog/` — consommés par resugo, sligo, repogo. **Importer minigo** (`[module.imports]` + `replace` local dans `go.mod`). Listes : `layout: gallery` sur l’`_index` de section (minigo/repogo/resugo).
