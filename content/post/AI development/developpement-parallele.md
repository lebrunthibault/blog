---
title: "Les workflows de développement IA parallèles"
date: 2026-02-09
draft: true
description: "Le développempent avec agents IA introduit un changement de paradigme pour le développeur qui doit maintenant gérer le développement de tâches en parallèle"
keywords:
  - Claude Code
  - Développement parallèle
  - Productivité
  - AI
---

<!-- TODO: intro à retravailler / personnaliser -->

# Développement parallèle

## Le sujet qui monte

Avec l'arrivée des agents de développement autonomes, le développement parallèle est devenu **le** sujet. Quand un agent peut travailler seul pendant plusieurs minutes sur une tâche, la question naturelle devient : pourquoi ne pas en lancer plusieurs en même temps ?

C'est un changement fondamental dans le workflow de développeur. On passe d'un modèle séquentiel (une tâche à la fois) à un modèle où on orchestre plusieurs flux de travail simultanés.

<!-- TODO: développer la vision / le potentiel du dev parallèle avec agents -->

## Les approches de parallélisation

<!-- TODO: détailler chaque approche -->

### Subagents dans une même session

Claude Code permet de lancer des subagents qui travaillent en parallèle sur des tâches indépendantes au sein d'une même session. Utile pour des tâches bien découpées sur un même projet.

### Sessions multiples sur des projets différents

C'est là que le vrai parallélisme entre en jeu : travailler sur plusieurs projets ou branches en même temps, chacun avec sa propre session Claude.

### Git worktrees

<!-- TODO: expliquer l'utilisation des worktrees pour isoler les branches -->

## Le hardware compte (à nouveau)

Avec le développement parallèle, avoir une machine qui tourne bien redevient un sujet.
Quand on lance plusieurs sessions Claude Code en même temps, chacune avec ses subagents, ses outils MCP, et potentiellement des dev servers en arrière-plan — ça sollicite le CPU.

Personnellement, je travaille sur mon **PC de bureau avec un AMD Ryzen 9700X**.
C'est un choix que j'ai fait à la base pour la **production musicale**, mais qui se révèle parfaitement adapté au dev parallèle avec IA.
Le 9700X a le bon équilibre : rapide en single-thread et en multi-thread, tout en restant **sobre en consommation électrique** et **silencieux**.

<!-- TODO: benchmark ou ressenti concret sur le nombre de sessions en parallèle ? -->
<!-- TODO: recommandations hardware pour ceux qui veulent s'équiper ? -->

# Context switching entre projets

## Le vrai défi

Le développement parallèle amène un défi très concret : le **context switching**. Quand on orchestre plusieurs agents sur différents projets, il faut pouvoir naviguer rapidement entre les contextes sans perdre le fil.

## Ma technique actuelle : Tmux

Aujourd'hui, j'utilise **Tmux** avec plusieurs onglets de terminaux. Chaque onglet correspond à un projet ou une branche, avec sa propre session Claude Code.

<!-- TODO: décrire le setup Tmux plus en détail -->
<!-- TODO: screenshot ou schéma du setup ? -->

L'avantage : c'est rapide, léger, et ça fonctionne bien dans un terminal. Le raccourci pour switcher entre les onglets est quasi instantané.

Les limites :
- Tout se passe dans le terminal, pas de vision d'ensemble visuelle
- Facile de perdre le fil quand on a 5+ onglets ouverts
- Pas de séparation visuelle forte entre les contextes

## Expérimentation : workspaces Linux

Je suis en train d'expérimenter avec la **gestion de workspaces sur Linux** pour aller plus loin dans la séparation des contextes.

### Workspaces horizontaux

<!-- TODO: décrire l'usage des workspaces horizontaux -->
<!-- TODO: quel DE / WM ? GNOME, i3, Hyprland ? -->

### Workspaces verticaux

<!-- TODO: décrire l'usage des workspaces verticaux -->
<!-- TODO: comment je combine horizontal et vertical -->

L'idée : chaque workspace correspond à un projet ou un flux de travail complet (terminal + navigateur + docs). Le switch entre workspaces donne une **coupure cognitive** plus nette qu'un simple changement d'onglet Tmux.

<!-- TODO: retour d'expérience après quelques semaines d'utilisation -->
<!-- TODO: comparer les deux approches (tmux vs workspaces) avec du recul -->

# Conclusion

<!-- TODO: écrire la conclusion -->
<!-- Points à couvrir :
- Le contexte comme fil rouge de toutes les bonnes pratiques IA
- Le dev parallèle comme évolution naturelle du workflow
- L'importance de trouver son propre setup d'orchestration
-->
