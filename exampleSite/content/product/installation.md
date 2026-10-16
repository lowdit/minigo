---
title: Installation
description: Modules Hugo ou copie themes/ — et déploiement GitHub Pages.
layout: product
weight: 2
---

## Modules Hugo

```bash
hugo mod init example.com/site
hugo mod get github.com/lowdit/minigo
```

```toml
theme = "minigo"

[params.lowdit]
  siteProfile = "library"
  view = "thinktank"
```

## Sans Go (Windows)

Synchroniser la marque puis copier le thème — voir `lowdit-brand/scripts/sync-brand.sh`.

## GitHub Pages

- Par défaut le workflow build **`exampleSite/`** (fichier `.github/hugo-site-dir`).
- Pour un site à la **racine** du dépôt : remplacez le contenu par `hugo.toml` + `content/`, et mettez `.` dans `.github/hugo-site-dir`.
- Override manuel : variable de dépôt `HUGO_SITE_DIR` ou entrée `site_dir` dans **Actions → Deploy → Run workflow**.
