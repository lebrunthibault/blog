---
title: "Les workflows de développement IA parallèles"
date: 2026-02-09
draft: false
wip: true
description: "Le développempent avec agents IA introduit un changement de paradigme pour le développeur qui doit maintenant gérer le développement de tâches en parallèle"
keywords:
  - Claude Code
  - Développement parallèle
  - Productivité
  - AI
---

<!-- TODO: intro à retravailler / personnaliser -->

Avec l'arrivée des agents IA, le développement parallèle est devenu **le** sujet. Quand un agent peut travailler seul pendant plusieurs minutes sur une tâche, la question naturelle devient : pourquoi ne pas en lancer plusieurs en même temps ?

C'est un changement fondamental dans le workflow de développeur. On passe d'un modèle séquentiel (une tâche à la fois) à un modèle où on orchestre plusieurs flux de travail simultanés.

<!-- TODO: développer la vision / le potentiel du dev parallèle avec agents -->

# Les approches de parallélisation

<!-- TODO: détailler chaque approche -->

## Parallèlisation au sein d'un même projet

### Subagents
Claude Code permet de lancer des subagents qui travaillent en parallèle sur des tâches indépendantes au sein d'une même session. Utile pour des tâches bien découpées sur un même projet.
Cette approche est pertinente pour optimiser les propositions du LLM ou générer plusieurs versions d'un design par exemple.

### Optimisation du contexte

Afin d'optimiser la context window (sujet traité en détail dans [cet article](/post/ai-development/gestion-du-contexte/)), on peut recourir à différentes techniques
- Rewind granulaire (avec `/rewind` ou double ESC)
- Sessions secondaires pour par exemple gérer des hotfix ou générer de la documentation

### Git worktrees

Le workflow pro pour gérer des évolutions au sein d'un même repo git. Je n'ai pas encore eu l'occasion de tester ca en détail mais la technique est prometteuse.
Voir [cet article](https://code.claude.com/docs/en/common-workflows#run-parallel-claude-code-sessions-with-git-worktrees)

## Développement parallèle sur plusieurs repositories

Maintenant que l'écriture du code est déléguée à l'agent il est plus facile de travailler en parallèle sur plusieurs repositories.

### Ma technique actuelle : Tmux

Aujourd'hui, j'utilise **Tmux** avec plusieurs onglets de terminaux. Chaque onglet correspond à un projet ou une branche, avec sa propre session Claude Code.


### Le hardware compte (à nouveau)

Avec le développement parallèle, avoir une machine qui tourne bien redevient un sujet.
Quand on lance plusieurs sessions Claude Code en même temps, chacune avec ses subagents, ses outils MCP, et des dev servers en arrière-plan — ça sollicite le CPU.

Personnellement, je travaille sur mon **PC de bureau avec un AMD Ryzen 9700X**.
C'est un choix que j'ai fait à la base pour la **production musicale**, mais qui se révèle parfaitement adapté au dev parallèle avec IA.
Le 9700X a le bon équilibre : rapide en single-thread et en multi-thread, tout en restant **sobre en consommation électrique** et **silencieux**.

[//]: # (# Conclusion)
