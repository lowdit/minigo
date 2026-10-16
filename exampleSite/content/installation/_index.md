---
title: Installation
description: Installer Minigo en local, depuis un fork GitHub, ou comme module Hugo — puis publier sur GitHub Pages.
layout: product
weight: 1
---

**Minigo** est la coque Hugo Lowdit : listes de documents, recherche Pagefind optionnelle et exports (`print`, `presentation`, `resume`). Cette page couvre l'installation pas à pas.

## Prérequis

| Outil | Version | Quand |
| --- | --- | --- |
| [Hugo](https://gohugo.io/) (extended) | ≥ 0.128 | Toujours |
| [Go](https://go.dev/) | ≥ 1.21 | Seulement pour les modules Hugo |
| Git | — | Clone / fork |

Vérifier : `hugo version` (la mention **extended** doit apparaître).

## Démarrage rapide

```bash
git clone https://github.com/lowdit/minigo
cd minigo/exampleSite
hugo server
```

→ site de démo sur <http://localhost:1313>. Éditez `content/` et `config/`.

## Directement depuis GitHub (fork — rien à installer)

Le dépôt contient `exampleSite/` et un workflow GitHub Pages prêts à l'emploi.

1. **Forker** [`lowdit/minigo`](https://github.com/lowdit/minigo).
2. Dans le fork : **Settings → Pages → Source : GitHub Actions**.
3. Le workflow construit `exampleSite/` et publie la démo.
4. Pour votre contenu, éditez `exampleSite/content/` puis poussez : le site se reconstruit.

Aucun outil local nécessaire pour ce parcours.

## En local (dépôt cloné)

```bash
git clone https://github.com/lowdit/minigo
cd minigo/exampleSite
hugo server        # http://localhost:1313
hugo               # build dans public/
```

## Dans votre propre site (module Hugo)

```bash
hugo mod init example.com/site
hugo mod get github.com/lowdit/minigo
```

```toml
# hugo.toml
theme = "minigo"

[params.lowdit]
  siteProfile = "library"   # library | hub
  view = "thinktank"        # thinktank | catalog | deck-studio | cv-vitrine | publisher | inquiry
  mainSections = ["reports"]
```

## Structure d'un site

```
.
├── hugo.toml            # theme + params.lowdit
├── content/
│   ├── _index.md        # accueil
│   ├── reports/         # documents (listes, galerie)
│   └── installation/    # cette page
└── assets/css/site-overrides.css   # surcharges optionnelles (chargé en dernier)
```

## Configuration (`params.lowdit`)

| Clé | Défaut | Rôle |
| --- | --- | --- |
| `view` | *(auto)* | Posture : `thinktank`, `catalog`, `deck-studio`, `cv-vitrine`, `publisher`, `inquiry`, `none` |
| `siteProfile` | `library` | `library` / `hub` (accueil), `cv`, `publisher`, `presentations`, `inquiry` |
| `mainSections` | `["reports"]` | Sections pour « Derniers documents » |
| `search` | `""` | `"pagefind"` active la barre de recherche |
| `listStyle` | `timeline` | `timeline`, `cards`, ou `layout: gallery` sur l'`_index` |
| `showPrintLink` | `true` | Lien « version imprimable » si l'output existe |
| `logo` | — | Chemin du logo (`logos/…`) |
| `faviconDir` | — | Dossier de favicons |

## Tâches courantes

**Ajouter un document** — créer `content/reports/mon-document/index.md` (front matter `title`, `description`, `date`).

**Changer la vue** — `view = "catalog"` dans `params.lowdit`, puis `hugo server`.

**Activer la recherche**

```bash
../scripts/build-with-pagefind.sh exampleSite   # après un premier `hugo`
# puis : search = "pagefind"
```

**Exporter** — déposez `layouts/_default/single.print.html` (Repogo), `…presentation.html` (Sligo) ou `…resume.html` (Resugo) ; les liens d'export apparaissent automatiquement.

## Sans Go (Windows)

Pas de modules Go : synchroniser la marque puis copier le thème dans `themes/minigo`.

```bash
lowdit-brand/scripts/sync-brand.sh themes/minigo minigo
```

## Déploiement GitHub Pages

- Par défaut, le workflow construit **`exampleSite/`** (fichier `.github/hugo-site-dir`).
- Pour un site à la **racine** du dépôt : mettez `content/` + `hugo.toml` à la racine et `.` dans `.github/hugo-site-dir`.
- Overrides : variable de dépôt `HUGO_SITE_DIR`, ou *Actions → Deploy → Run workflow*.

## Dépannage

| Symptôme | Cause probable | Correction |
| --- | --- | --- |
| `hugo: command not found` | Hugo absent du `PATH` | installer Hugo **extended** |
| CSS absent / page nue | `baseURL`/`--minify` ou assets non construits | lancer `hugo` puis vider `public/` |
| Menu vide en site multilingue | URLs de menu sans préfixe de langue | utiliser `url = "..."` (le thème applique `relLangURL`) |
| Recherche inerte | index Pagefind absent | `build-with-pagefind.sh` après le build |

## Vues et moteurs

Une **vue** (`params.lowdit.view`) fixe la posture éditoriale ; les **moteurs** ajoutent les formats.

| Vue | Posture | Moteur |
| --- | --- | --- |
| `thinktank` | Documentation, notes | Minigo |
| `catalog` | Grille de documents | Minigo |
| `deck-studio` | Présentations | Sligo |
| `cv-vitrine` | Curricula | Resugo |
| `publisher` | Catalogue éditorial | Repogo |
| `inquiry` | Enquêtes, formulaires | Fromago |

Intentions détaillées : `lowdit-brand/brand/VUES-PREMIUM.md`. Tokens et CSS : `lowdit-brand/docs/DESIGN-SYSTEM.md`.
