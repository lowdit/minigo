# Scénarios de test — auditeur / AT (thème Minigo)

> **Usage :** procédure manuelle et base Gherkin pour missions Audit Kit (`@manual`, `@at-nvda`, `@at-voiceover`).  
> **Tags :** [`TESTING-STRATEGY.md`](../../lowdit-audit-kit/docs/TESTING-STRATEGY.md) · **Composant ACL :** [Button](https://tetralogical.com/resources/accessible-components-library/button/)

Les scénarios ci-dessous sont **exemples exécutables** sur Brand `/composants/boutons/` et surfaces Minigo (publisher, inquiry). Adapter l’URL dans `scope.yaml` mission.

**Pré-revue flux (optionnelle, signal seulement)** — skill agent `ui-review` (design.how) : captures + sondes clavier sur build local **avant** les steps `@at-*` ; ne remplace pas NVDA/VO. Protocole : [`PILOTE-UI-REVIEW-PARCOURS.md`](../../lowtech-dev-method/docs/PILOTE-UI-REVIEW-PARCOURS.md) · parcours pilote **J1** = cette page.

---

## Bouton / lien bouton (`@acl:button`)

```gherkin
@acl:button @manual @at-nvda @journey:ds-composants
Fonctionnalité: Bouton et lien stylé bouton (Minigo)

  Contexte:
    Étant donné la page "/composants/boutons/" du site design system
    Et un lecteur d'écran NVDA activé sur Firefox

  @equalize:Buttons:manual
  Scénario: Nom accessible du lien primaire
    Quand je place le focus sur le lien "Action principale"
    Alors le lecteur d'écran annonce un lien dont le nom contient "Action principale"
    Et le lien n'est pas annoncé comme "sans étiquette"

  Scénario: Téléchargement — type et poids visibles dans le libellé
    Quand je place le focus sur le lien "Télécharger le rapport (PDF, 2,3 Mo)"
    Alors le nom accessible annoncé contient "PDF"
    Et le nom accessible annoncé contient "2,3" ou "2.3" selon la locale du lecteur
    Et l'utilisateur voyant voit le format et le poids sans révéler de texte masqué

  Scénario: Lien externe — nouvelle fenêtre visible
    Quand je place le focus sur le lien "WCAG 2.2 (nouvelle fenêtre)"
    Alors le nom accessible mentionne l'ouverture dans une nouvelle fenêtre ou équivalent

  @manual
  Scénario: Clavier — activation Entrée sur lien bouton
    Étant donné le focus sur le lien "Action principale"
    Quand j'appuie sur Entrée
    Alors la navigation se produit vers la cible du href

  @manual
  Scénario: Clavier — bouton natif Espace
    Étant donné le focus sur le bouton "Déclencher"
    Quand j'appuie sur Espace
    Alors le bouton s'active sans soumettre un formulaire parent

  Scénario: Focus visible
    Quand j'atteins chaque contrôle de la démo au clavier
    Alors un indicateur de focus est visible à l'écran
    # WCAG 2.4.7 — ne pas se contenter du changement de couleur de fond seul

  Scénario: État désactivé
    Quand je place le focus sur le bouton "Désactivé"
    Alors le contrôle est annoncé comme indisponible ou désactivé
    Et il n'est pas activable au clavier
```

**Preuve auditeur :** date, URL, build (`hugo` ou commit), AT + version, navigateur, **constat** (OK / échec / NA avec justification). Statut mission : `signal` tant que non revu ; `confirmed` **uniquement** après reproduction humaine.

---

## Modèle pour nouveau composant

Copier le bloc ci-dessus et remplacer :

| Champ | Exemple |
| --- | --- |
| `@acl:*` | `disclosure`, `accordion`, `navigation` |
| `@equalize:*` | ID checklist Equalize si applicable |
| Steps Manual check ACL | Lien direct vers la fiche TetraLogical |
| Parcours utilisateur | 1 tâche réelle (« soumettre le formulaire inquiry ») |

---

## Tests utilisateurs (complément)

Pour un **nouveau parcours** (pas un seul composant isolé) :

1. Recruter 3–5 personnes **ou** 1 session modérée + grille async.
2. Tâches : accomplir l’objectif **sans aide** ; noter blocages, pas seulement WCAG ID.
3. Ne pas fusionner avec résultat axe — rapport séparé, lien vers frictions AT.

---

## Non exécuté par défaut

Ces fichiers **ne lancent pas** de tests. L’exécution Playwright (M3) et la promotion `confirmed` restent sous [`lowdit-audit-kit`](../../lowdit-audit-kit/docs/TESTING-STRATEGY.md).
