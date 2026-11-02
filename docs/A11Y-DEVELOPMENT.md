# Accessibilité — développement Minigo (opérationnel)

Ce fichier est la couche **code**. Les autres dimensions (constat, référentiel, parc, personnes, pédagogie) sont dans l’analyse brouillon [`accessibilite-avec-ia.md`](../../bertrandkeller.github.io/content/resources/accessibility/analyse/accessibilite-avec-ia.md). Le schéma SeeCode [`univers-lowdit-architecture`](../../lowtech-dev-method/docs/diagrams/README.md) dit quel dépôt tient quelle vérité. Il ne décrit pas le cycle de correction d’un composant.

> Canon stratégique : [`../../lowtech-dev-method/docs/STRATEGIE-A11Y-THEME-MINIGO.md`](../../lowtech-dev-method/docs/STRATEGIE-A11Y-THEME-MINIGO.md)  
> Architecture CSS : [`CSS-ARCHITECTURE.md`](CSS-ARCHITECTURE.md) · Gates composants Brand : [`../../lowdit-brand/docs/ACCESSIBILITY-REFERENCES.md`](../../lowdit-brand/docs/ACCESSIBILITY-REFERENCES.md)

## Correctif de composant

Le correctif atterrit dans le composant. On ouvre ensuite la page de ce composant (par exemple `content/composants/boutons.md`) et on la relit. Si le geste a changé, une personne met à jour la page et le scénario auditeur. L’IA peut proposer le diff de code. Elle ne régénère pas la page. Elle lit la page avant d’écrire du code qui consomme le composant.

## Avant de merger un changement thème

1. **Couche ITCSS** — utilitaire vs composant vs vue ; pas de hack en fin de `baseof`.
2. **Spécificité prose** — les liens dans `.lowdit-product__content` sont soulignés ; les composants (`a.minigo-btn`, cartes cliquables…) doivent **expliciter** l’exception dans `lowdit-base.css` ou la couche composant.
3. **États** — chaque contrôle interactif : repos, hover, focus-visible, active, disabled ; ne pas compter sur hover seul.
4. **Contraste** — mesurer sur le fond **affiché** (tokens `--lowdit-*`), noter le ratio dans la PR / fiche composant.
5. **Clavier** — Tab, Entrée/Espace, Échap si overlay ; largeur 320 px si vue publique mobile.
6. **Build** — `hs test` sur minigo/exampleSite et les moteurs impactés.

## Outils dev (niveau 2–3)

| Outil | Usage |
| --- | --- |
| `assets/css/debug.css` / checka11y | Repérage grossier en local — **pas** gate prod |
| **`data/test_plan.yaml` + rail « Test »** | Checklist a11y + QA par page (`HUGO_ENV=dev`) |
| **`scripts/page-test-plan.py`** | Même plan **avant** `hugo server` (terminal) |
| Tab + zoom 200 % | Obligatoire humain ou IA avec checklist |
| axe / extensions | Rail (inject axe-core), WAVE / Insights — **signal** |
| Playwright a11y | M3 mission DS — pas exigé pour chaque PR |

```bash
python3 scripts/page-test-plan.py exampleSite
cd exampleSite && HUGO_ENV=dev hugo server
```

## Ce que l’IA ne doit pas faire

- Annoncer « conforme RGAA/WCAG » sans audit.
- Masquer format/poids/externe en `visually-hidden` — ces infos restent **visibles** dans le libellé.
- Remplacer un libellé visible par `aria-label` sauf bouton **icône seule**.
- Ignorer la section « non testé AT / utilisateurs » en clôture d’incrément.

## Scénarios auditeur

Voir [`A11Y-SCENARIOS-AUDITEUR.md`](A11Y-SCENARIOS-AUDITEUR.md) — à mettre à jour **dès qu’un composant Minigo change**.
