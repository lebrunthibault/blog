---
title: "Création d'un skill Claude Code pour générer des messages de candidatures personnalisés"
date: 2026-02-06
draft: false
description: "Génération automatique de variations de réponses personnalisées aux offres freelance sur Malt."
keywords:
  - Claude Code
  - Skills
  - Automatisation
  - Subagents
---

En tant que freelance sur Malt, je reçois régulièrement des offres de mission. Rédiger une réponse personnalisée pour chacune prend du temps — il faut relire l'offre, identifier les points de connexion avec mon profil, adapter le ton selon le type de mission. J'ai décidé d'automatiser ce processus avec un skill Claude Code.

# Le problème à résoudre

Chaque réponse Malt demande le même travail :
- Analyser l'offre (type de mission, stack technique, contexte business)
- Identifier les expériences pertinentes dans mon CV
- Choisir le bon ton (court et direct pour une petite mission, plus stratégique pour un rôle CTO)
- Vérifier l'orthographe et relire attentivement mon message

Ce processus répétitif est un bon candidat pour l'automatisation via un skill.

# Créer un skill avec create-skill

Plutôt que d'écrire le skill from scratch, j'ai utilisé le skill `writing-skills` de [Superpowers](https://github.com/obra/superpowers/tree/main/skills/writing-skills) qui guide la création étape par étape.

```bash
# Dans Claude Code
> /writing-skills
```
Le skill m'a posé des questions structurées :
- Quel est le déclencheur ? → Quand l'utilisateur colle une offre Malt
- Quelles sources de contexte ? → CV, profil Malt, réponses précédentes
- Quel output ? → 3 variantes de réponse prêtes à coller


À partir de mes réponses, il a généré une première version du skill que j'ai ensuite affinée.

> J'ai aussi fourni un travail manuel de collecte de ressources concernant mon expertise (CV, articles que j'ai écrit) mais
> aussi et surtout d'offres d'emplois et de messages de candidatures précédemment envoyés pour que Claude puisse "s'entrainer"
> sur mon style et produire une réponse pertinente.
> J'ai aussi taggé les messages de candidature ou j'avais eu une réponse pour qu'ils aient un poids plus fort lors de la génération

Ce 

# Structure du skill malt-response

Le skill final suit 5 étapes :

## Step 1 — Charger le contexte

Le skill lit automatiquement mes fichiers de référence :
- `PROFIL.md` : résumé de mon profil Malt
- `CV.md` : expériences détaillées
- `answers/` : réponses précédentes (avec indication de celles qui ont obtenu une réponse positive)
- `articles/` : mes articles de blog pour sourcer l'expertise

## Step 2 — Analyser l'offre

À partir du texte collé, le skill identifie :
- Le type de mission (MVP, lead tech, CTO, mission courte...)
- Le match technologique avec ma stack
- Les expériences pertinentes à mettre en avant
- Les hooks spécifiques (valeurs, secteur, défis techniques)

## Step 3 — Appliquer les patterns de style

J'ai extrait des patterns de mes ~20 réponses précédentes :
- Ton légèrement informel mais professionnel
- Accroche personnalisée montrant la compréhension du besoin
- 2-3 expériences concrètes (noms de projets/entreprises)
- Toujours vouvoyer, même si l'offre tutoie
- Signature : "Bien cordialement," puis "Thibault Lebrun"

Le skill sélectionne aussi automatiquement un lien de mon blog pertinent selon le sujet de l'offre.

## Step 4 — Générer 3 variantes en parallèle

J'ai demandé à Claude d'éditer le skill pour qu'il lance des subagents en parallèle, chacun avec un angle différent :

- **Variante A — Directe/Efficace** : courte, va droit au but. Idéale pour les missions simples.
- **Variante B — Expérience détaillée** : développe les projets passés avec des exemples concrets.
- **Variante C — Vision/Conseil** : se positionne comme partenaire, propose une approche. Pour les rôles stratégiques.

Les 3 agents travaillent simultanément, ce qui accélère la génération.

## Step 5 — Output HTML

Le skill génère des fichiers HTML avec le texte prêt à copier :
- 3 fichiers individuels (`entreprise-A.html`, `entreprise-B.html`, `entreprise-C.html`)
- 1 fichier combiné avec des onglets pour naviguer entre les variantes

Chaque fichier inclut un bouton "Copier" pour coller directement dans Malt.

# Utilisation quotidienne

Le workflow est maintenant trivial :

```bash
# Dans Claude Code
> /malt-response

# Coller l'offre reçue sur Malt
[texte de l'offre...]

# Claude génère les 3 variantes
# Ouvrir le fichier combiné dans le navigateur
# Choisir la variante, copier, coller sur Malt
```

Bien entendu je finis toujours par éditer voire réécrire chaque réponse mais cette génération préalable 
me permet d'avoir une vision claire des différents éléments pertinents pour ma réponse et surtout d'avoir une manière ludique
de répondre à ces offres (sinon j'ai la flemme et je ne réponds pas).

# Ce que j'ai appris

## Les skills comme capitalisation

Un skill bien conçu capture non seulement un processus, mais aussi les patterns de qualité. Mes meilleures réponses passées servent de référence pour les nouvelles.

## L'importance du contexte structuré

Le skill fonctionne bien parce qu'il a accès à des données structurées (CV, profil, historique). Sans ce contexte, les réponses seraient génériques.

## Subagents pour la diversité

Lancer 3 agents en parallèle avec des angles différents produit de vraies alternatives, pas juste des reformulations. Chaque variante a sa propre logique.

# Conclusion

Créer un skill pour automatiser les réponses Malt m'a fait gagner un temps significatif sur une tâche répétitive. Le plus intéressant : le skill s'améliore avec le temps. Chaque nouvelle réponse validée enrichit le corpus de référence, affinant les patterns de style.
