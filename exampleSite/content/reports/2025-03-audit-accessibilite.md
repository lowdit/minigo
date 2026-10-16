---
title: "Audit d’accessibilité — Portail Citoyen de la Fabrique Publique"
date: 2025-03-11
summary: "Audit RGAA d’un portail public, synthèse des non-conformités et plan de remédiation priorisé."
description: Audit d’accessibilité numérique (référentiel RGAA) du portail citoyen de la Fabrique Publique, avec inventaire des écarts, priorisation et feuille de route de remédiation.
accent: "#14C6B1"
authors:
  - Camille Fontaine
  - Nour Belkacem
---

## Contexte de la mission

La **Fabrique Publique**, collectivité fictive regroupant trois communes, nous a confié l’audit d’accessibilité de son *Portail Citoyen*, refondu six mois plus tôt. L’objectif était double : mesurer la conformité au référentiel RGAA et outiller les équipes pour corriger durablement les écarts les plus bloquants.

Le périmètre couvrait 42 pages types : accueil, démarches en ligne, actualités, formulaires de contact, espace personnel et pages d’aide. L’audit s’est déroulé sur trois semaines, mêlant tests automatisés, inspection manuelle du code et parcours réels avec lecteur d’écran.

![Vue du portail et de ses composants d’interface](/images/demo/demo-3.svg)

## Méthodologie

Chaque page a été confrontée à l’ensemble des critères applicables, puis classée selon trois niveaux :

1. **Bloquant** — empêche l’accomplissement d’une tâche essentielle.
2. **Majeur** — dégrade fortement l’expérience sans la rendre impossible.
3. **Mineur** — gêne ponctuelle ou non-conformité de forme.

Les tests ont combiné plusieurs outils pour limiter les angles morts : analyse statique, navigation clavier seule, lecteur d’écran (VoiceOver et NVDA) et vérification des contrastes.

## Résultats de conformité

Le taux global de conformité s’établit à **68 %**, un niveau cohérent pour un portail récent mais encore loin des 100 % exigés par la réglementation.

| Thématique | Critères testés | Conformes | Taux | Priorité |
| --- | --- | --- | --- | --- |
| Images | 9 | 8 | 89 % | Mineure |
| Couleurs et contrastes | 6 | 3 | 50 % | **Majeur** |
| Formulaires | 11 | 7 | 64 % | **Bloquant** |
| Navigation | 12 | 9 | 75 % | Majeur |
| Structuration | 8 | 6 | 75 % | Mineure |
| Éléments multimédia | 4 | 2 | 50 % | Majeur |

### Principaux écarts constatés

- Libellés de champs non associés à leur contrôle dans le parcours de demande de subvention.
- Messages d’erreur uniquement signalés par la couleur, sans texte ni icône alternative.
- Piège au clavier dans la fenêtre modale de confirmation d’envoi.
- Contrastes insuffisants sur les liens visités dans le pied de page.

## Plan de remédiation

Nous avons proposé une feuille de route en trois vagues, ordonnée par ratio impact/effort.

> La correction des formulaires et des contrastes concentre à elle seule près de 70 % des blocages réellement vécus par les usagers.

Les équipes ont retenu la séquence suivante : corriger immédiatement les points bloquants (formulaires et modale), traiter les contrastes lors de la prochaine itération de design, puis intégrer un contrôle d’accessibilité automatisé à la chaîne d’intégration continue.

## Conclusion

L’audit a permis de transformer une inquiétude diffuse en un **plan d’action chiffré et séquencé**. La Fabrique Publique dispose désormais d’indicateurs de suivi clairs et d’un rituel de vérification trimestriel.
