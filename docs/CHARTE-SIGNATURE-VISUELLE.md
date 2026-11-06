# Charte — signature visuelle premium (lowtech)

> **Fichier CSS :** `assets/css/charte-premium.css` (chargé après `minigo.css`).

## Intentions visibles

| Élément | Traitement |
| --- | --- |
| **En-tête** | Sticky, fond crème légèrement flouté (sauf header nuit Repogo publisher) |
| **Logo module** | PNG planche dans cadre blanc + ombre teintée accent |
| **Hero** | Panneau blanc, ombre douce, **barre gradient** turquoise → violet → nuit |
| **Cartes `.minigo-card`** | Filet gradient en tête, ombre existante renforcée |
| **Catalogue Sligo/Resugo** | Cartes blanches, radius large, hover accent module |
| **Repogo workspace** | Bandeau accueil dégradé bleu Repogo + ombre |

## Variantes

- **`.minigo-hero--signature`** — panneau explicite (showroom Minigo, thinktank, Brand accueil).
- **`.minigo-hero--bare`** — hero plat (legacy / pages simples).
- **Vues deck-studio & cv-vitrine** — hero ouvert (pas de panneau), fond dégradé conservé.

## Accents par vue

Variables `--lowdit-charte-accent` et `--lowdit-charte-gradient` sur
`minigo--view-publisher | deck-studio | cv-vitrine | inquiry | thinktank`.

Ne pas confondre avec le **cycle O** observatoire : habillage `/status/` via
`views/status-observatory.css`, données d’abord.
