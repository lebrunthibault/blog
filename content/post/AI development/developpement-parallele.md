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
sources:
  - title: "Claude Code - Sessions parallèles avec git worktrees"
    url: "https://code.claude.com/docs/en/common-workflows#run-parallel-claude-code-sessions-with-git-worktrees"
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

Le workflow pro pour gérer des évolutions au sein d'un même repo git.
L'idée est de cloner une branche en local dans un dossier différent et de lancer Claude dedans

Voir [cet article](https://code.claude.com/docs/en/common-workflows#run-parallel-claude-code-sessions-with-git-worktrees)

Le workflow (je store mes worktrees dans **.worktrees**)
- `git worktree add -b feat/my-feat .worktress/my-feat origin/my-feat`
- `cd .worktrees/my-feat`
- copier le .env et le .claude
- `bun run dev`
- `claude`

Pro tip: ouvrir tout ca dans une nouvelle session tmux

## Développement parallèle sur plusieurs repositories

Maintenant que l'écriture du code est déléguée à l'agent il est plus facile de travailler en parallèle sur plusieurs repositories. J'utilise tmux et quelques plugins pour gérer mes terminaux et sessions Claude.


### Mon setup tmux pour le context switching entre projets

J'utilise [Ghostty](https://ghostty.org) comme terminal et tmux (configuré avec [Oh my tmux](https://github.com/gpakosz/.tmux)) pour gérer mes sessions. L'idée est simple : **une session tmux par projet, un onglet Ghostty par session**.

#### Le principe

Pour ouvrir un projet, j'ouvre un nouvel onglet Ghostty et je fais :

```bash
tmux attach -t <projet>
```

Pour switcher de projet, je navigue entre les onglets Ghostty.

#### Organisation des fenêtres

Dans chaque session tmux, j'ai souvent les mêmes fenêtres :

1. **claude** -- Claude Code pour coder en pair avec l'IA
2. **dev** -- le serveur de dev (bun pour les projets JS)
3. **terminal** -- un terminal classique pour git, commandes ponctuelles, etc.

Pas de panes, pas de splits. Juste des fenêtres tmux bien nommées et des onglets Ghostty pour naviguer entre les projets.

#### Intégration avec git worktree

Quand je veux paralléliser sur un même repo j'ouvre simplement une session tmux dans un worktree.

#### Persistance des sessions

Le duo **resurrect + continuum** dans ma config Oh my tmux fait que tout survit aux redémarrages :

```bash
set -g @plugin 'tmux-plugins/tmux-resurrect'
set -g @plugin 'tmux-plugins/tmux-continuum'
set -g @continuum-restore 'on'
```

Continuum sauvegarde l'état toutes les 15 minutes. Au reboot, je relance mes onglets Ghostty, `tmux attach -t <projet>`, et je retrouve mes fenêtres exactement comme je les avais laissées.

#### Notifications Claude

Pour optimiser le travail de mes agents j'ai configuré un [hook Claude](https://code.claude.com/docs/en/hooks) qui génère une notification système quand un agent a fini une tâche (qui prennent souvent un certain temps quand j'utilise [Get Shit Done](https://github.com/glittercowboy/get-shit-done)) pour faire du développement plus autonome.

Le hook Claude en question (compatible avec tmux)

```
"Notification": [
       {
         "matcher": "idle_prompt",
         "hooks": [
           {
             "type": "command",
             "command": "SESSION=$(tmux display-message -p '#S' 2>/dev/null) && notify-send -u normal \"Claude Code${SESSION:+ [$SESSION]}\" 'Done !'"
           }
         ]
       }
     ],
```

### Le hardware compte (à nouveau)

Avec le développement parallèle, avoir une machine qui tourne bien redevient un sujet.
Quand on lance plusieurs sessions Claude Code en même temps, chacune avec ses subagents, ses outils MCP, et des dev servers en arrière-plan — ça sollicite le CPU.

Personnellement, je travaille sur mon **PC de bureau avec un AMD Ryzen 9700X**.
C'est un choix que j'ai fait à la base pour la **production musicale**, mais qui se révèle parfaitement adapté au dev parallèle avec IA.
Le 9700X a le bon équilibre : rapide en single-thread et en multi-thread, tout en restant **sobre en consommation électrique** et **silencieux**.

[//]: # (# Conclusion)
