---
title: "La gestion du contexte : le nouveau sujet technique du développement assisté par IA"
date: 2026-02-09
draft: false
wip: true
description: "Le contexte est le concept le plus important en développement assisté par IA : mes techniques et réflexions."
keywords:
  - Claude Code
  - Contexte
  - Productivité
  - AI
---

<!-- TODO: intro à retravailler / personnaliser -->

Après plusieurs mois de développement intensif avec des agents IA, un constat s'impose : le concept le plus important à maîtriser n'est ni le prompting, ni la configuration, ni le choix du modèle. C'est la **gestion du contexte**.

Bien que ce sujet soit commun à tous les LLM je vais me concentrer sur les techniques spécifiques à Claude Code.

# Le contexte, concept central du développement IA

En terme de capacité à mémoriser les tâches et modifications en cours,
un agent IA fonctionne comme un humain, il est beaucoup plus fiable quand le contexte est simple et qu'un minimum d'informations
sont disponibles en même temps.

Par contre à l'inverse d'un humain, un LLM n'est pas désigné pour gérer une mémoire long terme et une vision globale
sur un projet. Pour avoir les meilleurs résultats et augmenter la fiabilité de la génération de code
c'est important de limiter le contexte de chaque conversation et de mettre en places de workflows et techniques allant dans ce sent.

## La fenêtre contextuelle (context window)

La contexte window correspond à tout le texte traité par le LLM dans une conversation : le prompt système, l'historique de conversation, le code envoyés, et sa réponse

Comparaisons
- GPT-4o : 128k tokens
- Claude Sonnet/Opus : 200k tokens
- Gemini 1.5 Pro : 1M-2M tokens (mais la qualité d'attention diminue sur les longs contextes)

Quand la conversation dépasse la context window, les messages les plus anciens sont "oubliés" (sortent de la fenêtre)
C'est pour ça que sur de longues sessions un LLM peut perdre le fil.

NB : pour limiter les hallucinations, on considère qu'il ne faut pas que la fenêtre dépasse *la moitié de la taille maximale* (soit 100k tokens pour Claude Code)

## Techniques de gestion du contexte

<!-- TODO: développer chaque point avec plus de détails -->

- **Clear régulièrement** : `/clear` entre chaque tâche distincte
- **Plan mode + shift+tab** : le moyen le plus fluide de repartir d'un contexte propre
- **Monitorer l'utilisation** : statusline custom et `\context` pour voir ce qui prend de la place
- **Attention aux MCP et skills chargés** : chaque outil chargé consomme du contexte, ne pas en abuser
- **Fichiers de spec pour les tâches longues** : externaliser le contexte dans des fichiers plutôt que de tout garder en conversation
- **CLAUDE.md bien structuré** : donner le bon contexte dès le départ sans surcharger

<!-- TODO: section sur le contexte "implicite" vs "explicite" ? -->
