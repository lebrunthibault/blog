---
title: "Refonte graphique de mon blog avec Claude Code"
date: 2026-02-04
draft: false
description: "Retour d'expérience sur la refonte design de mon blog en utilisant Claude Code, Claude.ai et Claude in Chrome : animations GSAP, transitions SPA avec Swup.js, accessibilité et workflow IA."
keywords:
  - AI
  - Claude Code
  - Web Development
  - Design
---

J'ai récemment entrepris une refonte complète du design de mon blog. Plutôt que de procéder manuellement, j'ai décidé d'utiliser l'IA comme partenaire de travail principal. Voici un retour d'expérience sur ce workflow hybride entre Claude Code, Claude.ai et différents outils.

## Une approche design guidée par la recherche

Pour le design général, j'ai laissé Claude Code chercher des sources d'inspiration sur les bonnes pratiques de lisibilité, notamment pour le dark mode. Il a identifié plusieurs ressources pertinentes :

- [Typography in Dark Mode - Design Shack](https://designshack.net/articles/typography/dark-mode-typography/)
- [Dark Mode Design Best Practices 2025 - CUIBIT](https://cuibit.com/dark-mode-design-best-practices-for-2025/)
- [Line Height & Line Length - Pimp my Type](https://pimpmytype.com/line-length-line-height/)

Ces recherches ont guidé mes choix : éviter le noir pur au profit d'un gris très foncé (#0c0c0c), utiliser des tons off-white plutôt que du blanc pur, et ajuster la typographie pour une meilleure lisibilité sur fond sombre.

Mon workflow a combiné deux outils : **Claude.ai** pour générer des templates de design que je modifiais ensuite, puis **Claude Code** pour implémenter ces modifications dans le code.

## L'animation hero : le cœur du projet

L'animation d'entrée du titre hero a été le travail le plus conséquent. J'ai commencé par générer une première animation avec Claude.ai, puis je l'ai affinée en m'inspirant de sources web :

- [Moving Letters - Tobias Ahlin](https://tobiasahlin.com/moving-letters/)
- [CSS Text Animations - Prismic](https://prismic.io/blog/css-text-animations)

### Animation en 3 temps

Le titre s'anime en trois étapes distinctes :

1. **"Modern"** : effet typewriter avec une ligne verticale qui traverse et révèle chaque lettre
2. **"Web Development"** : même effet typewriter
3. **"AI First"** : apparition avec un effet de scale (zoom) pour "AI", fade in pour "First", suivi d'un effet néon subtil avec un glow bleu pulsant

### L'effet néon personnalisé

L'effet néon a demandé un paramétrage fin : alternance entre deux teintes de bleu avec `text-shadow` multicouche, gestion des différents niveaux de blur (2px/6px/12px/20px), des opacités et des durées. Un fade out progressif clôture l'animation.

J'ai d'ailleurs demandé à Claude Code de me détailler son implémentation pour pouvoir faire des ajustements manuels par la suite.

### Animation de l'image de profil

Pour l'image de profil, le workflow a été plus technique :

1. Création d'une image "loading" avec fond uni (#0c0c0c) via Python/PIL
2. Utilisation de `rembg` pour retirer le background de la photo originale
3. Script custom pour retirer sélectivement certaines couleurs (bleus électriques, oranges) tout en préservant le visage
4. Transition fade entre l'image neutre et l'image finale

### Typographie custom

Pour renforcer l'aspect tech/futuriste du "AI First", j'ai utilisé la police "Terminal F4" téléchargée depuis DaFont. L'intégration a été simple : drag & drop du fichier zip dans Claude Code qui s'est chargé de l'installer. Un fallback sur "Exo 2" (Google Font) assure la compatibilité.

## Vérification de l'intégration

Tester visuellement les animations a été un défi. J'ai utilisé plusieurs approches :

- **Playwright (screenshots)** : efficace pour le gros du travail, mais consomme beaucoup de tokens
- **Feedback textuel avec Claude Code** : plus économe, suffisant pour les ajustements mineurs
- **Corrections manuelles** : certains détails de spacing et de margins que Claude avait du mal à appréhender

## Menu mobile : Claude in Chrome en action

Pour le menu mobile, j'ai trouvé un site existant avec exactement le comportement que je voulais. **Claude in Chrome** m'a permis de copier l'approche directement depuis ce site, puis de tester et d'implémenter la solution de manière interactive.

## Transition en expérience SPA

J'ai voulu ajouter des transitions fluides entre les pages, comme sur une Single Page Application, tout en gardant mon site Hugo (server-side rendered).

En utilisant le **plan mode** de Claude Code, il m'a proposé [Swup.js](https://swup.js.org/) : une librairie légère conçue exactement pour ce cas d'usage. L'implémentation a été rapide et le résultat transforme l'expérience de navigation.

## Accessibilité

L'accessibilité n'a pas été oubliée. J'ai utilisé **Claude in Chrome** pour lancer un audit via PageSpeed Insights directement depuis le navigateur.

Le site gère maintenant `prefers-reduced-motion` : les utilisateurs qui préfèrent réduire les animations voient des transitions simplifiées (opacité uniquement, sans mouvement).

## Vérification du contenu

En bonus, j'ai demandé à Claude Code de vérifier tous les liens cassés de mes articles. Il a utilisé des **subagents** pour paralléliser le travail et identifier rapidement les URLs mortes à corriger.

## Génération de cet article
J'ai documenté les étapes principales de cette refonte au fur et à mesure dans un Google Doc en notant notamment les technos et sites utilisées.
Claude Code a ensuite rédigé cet article que j'ai relu et corrigé (style, sections).

Le résultat : une documentation qui représente précisément le travail effectué avec un minimum de travail !

## Conclusion

Ce projet illustre bien comment l'IA peut s'intégrer dans un workflow de développement web. Plutôt qu'un outil qui fait tout à ma place, c'est un partenaire qui accélère la recherche, propose des solutions techniques, et implémente les détails fastidieux — tout en me laissant le contrôle créatif sur le résultat final.

Les outils utilisés :
- **Claude Code** : implémentation, recherche, vérification
- **Claude.ai** : génération de templates et brainstorming
- **Claude in Chrome** : tests visuels et inspiration depuis des sites existants
- **GSAP** : animations JavaScript
- **Swup.js** : transitions SPA
- **rembg** et **PIL** : manipulation d'images
- **Playwright** : screenshots automatisés
