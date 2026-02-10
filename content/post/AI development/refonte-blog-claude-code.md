---
title: "Refonte graphique de mon blog avec Claude Code"
date: 2026-02-04
draft: false
description: "Retour d'expérience sur la refonte design de mon blog en utilisant Claude Code, Claude.ai et Claude in Chrome : animations GSAP, transitions SPA avec Swup.js, accessibilité et workflow IA."
keywords:
  - AI
  - Claude Code
  - Frontend Development
  - Design
sources:
  - title: "Typography in Dark Mode - Design Shack"
    url: "https://designshack.net/articles/typography/dark-mode-typography/"
  - title: "Dark Mode Design Best Practices - CUIBIT"
    url: "https://cuibit.com/dark-mode-design-best-practices-for-2025/"
  - title: "Line Height & Line Length - Pimp my Type"
    url: "https://pimpmytype.com/line-length-line-height/"
  - title: "Moving Letters - Tobias Ahlin"
    url: "https://tobiasahlin.com/moving-letters/"
  - title: "CSS Text Animations - Prismic"
    url: "https://prismic.io/blog/css-text-animations"
  - title: "Swup.js - Page transitions"
    url: "https://swup.js.org/"
  - title: "Anthropic Skills - GitHub"
    url: "https://github.com/anthropics/skills"
---

J'ai récemment entrepris une refonte complète du design de mon blog. Plutôt que de procéder manuellement, j'ai décidé d'utiliser l'IA comme partenaire de travail principal. Voici un retour d'expérience sur ce workflow hybride entre Claude Code, Claude.ai et différents outils.

# Une approche design guidée par la recherche

Pour le design général, j'ai laissé Claude Code chercher des sources d'inspiration sur les bonnes pratiques de lisibilité, notamment pour le dark mode. Il a identifié plusieurs ressources pertinentes :

- [Typography in Dark Mode - Design Shack](https://designshack.net/articles/typography/dark-mode-typography/)
- [Dark Mode Design Best Practices 2025 - CUIBIT](https://cuibit.com/dark-mode-design-best-practices-for-2025/)
- [Line Height & Line Length - Pimp my Type](https://pimpmytype.com/line-length-line-height/)

Ces recherches ont guidé mes choix : éviter le noir pur au profit d'un gris très foncé (#0c0c0c), utiliser des tons off-white plutôt que du blanc pur, et ajuster la typographie pour une meilleure lisibilité sur fond sombre.

Mon workflow a combiné deux outils : **Claude.ai** pour générer des templates de design que je modifiais ensuite, puis **Claude Code** pour implémenter ces modifications dans le code.

## Utilisation de skills et de subagents pour obtenir des propositions de homepage

Les skills permettent à Claude d'agir de manière spécialisée dans de nombreux domaines.
Une fois la première version de la home mise en place j'ai demandé à Claude d'utiliser le skill frontend-design pour m'aider à améliorer le design de la homepage.
J'ai installé le [skill Anthropic](https://github.com/anthropics/skills) frontend design puis lancé la commande suivante :
`
Utilise le skill frontend-design avec des subagents parallèles pour me
proposer 3 variations de homepage. Chaque agent doit :
- Analyser ma homepage actuelle (layouts/index.html)
- Proposer un design complet avec code HTML/CSS
- Sauvegarder sa proposition dans un fichier séparé (homepage-v1.html, etc.)
`

Claude Code a lancé 3 agents en parallèle, chacun avec une direction esthétique différente. Cliquez sur une miniature pour explorer le design complet :

<div class="homepage-gallery">
  <div class="homepage-card" onclick="openDesignModal('/homepage-v1-editorial.html', 'Editorial / Magazine')">
    <img src="/img/homepage-v1-editorial.png" alt="Homepage Editorial / Magazine">
    <div class="homepage-card-info">
      <strong>Editorial / Magazine</strong>
      <span>Cormorant Garamond · Layout asymétrique · Accent or/bronze</span>
    </div>
  </div>
  <div class="homepage-card" onclick="openDesignModal('/homepage-v2-brutalist.html', 'Brutalist / Raw')">
    <img src="/img/homepage-v2-brutalist.png" alt="Homepage Brutalist / Raw">
    <div class="homepage-card-info">
      <strong>Brutalist / Raw</strong>
      <span>JetBrains Mono · Effet glitch · Accents néon</span>
    </div>
  </div>
  <div class="homepage-card" onclick="openDesignModal('/homepage-v3-organic.html', 'Organic / Natural')">
    <img src="/img/homepage-v3-organic.png" alt="Homepage Organic / Natural">
    <div class="homepage-card-info">
      <strong>Organic / Natural</strong>
      <span>Quicksand · Blobs animés · Palette terreuse</span>
    </div>
  </div>
</div>

<div id="design-modal" class="design-modal" onclick="closeDesignModal(event)">
  <div class="design-modal-content">
    <div class="design-modal-header">
      <span id="design-modal-title"></span>
      <button onclick="closeDesignModal()" aria-label="Fermer">&times;</button>
    </div>
    <iframe id="design-modal-iframe" src="" title="Aperçu du design"></iframe>
  </div>
</div>

<style>
.homepage-gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 1.5rem 0;
}
@media (max-width: 768px) {
  .homepage-gallery { grid-template-columns: 1fr; }
}
.homepage-card {
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #333;
  transition: transform 0.2s, border-color 0.2s;
  background: #1a1a1a;
}
.homepage-card:hover {
  transform: translateY(-4px);
  border-color: #415a77;
}
.homepage-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  object-position: top;
  display: block;
}
.homepage-card-info {
  padding: 0.75rem;
}
.homepage-card-info strong {
  display: block;
  margin-bottom: 0.25rem;
  color: #e0e0e0;
}
.homepage-card-info span {
  font-size: 0.8rem;
  color: #888;
}
.design-modal {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.9);
  z-index: 9999;
  padding: 2rem;
}
.design-modal.active { display: flex; align-items: center; justify-content: center; }
.design-modal-content {
  width: 90vw;
  max-width: 1200px;
  height: 85vh;
  background: #0c0c0c;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.design-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #333;
  background: #111;
}
.design-modal-header span { font-weight: 600; color: #e0e0e0; }
.design-modal-header button {
  background: none;
  border: none;
  color: #888;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0 0.5rem;
}
.design-modal-header button:hover { color: #e0e0e0; }
#design-modal-iframe {
  flex: 1;
  border: none;
  width: 100%;
}
</style>

<script>
function openDesignModal(url, title) {
  document.getElementById('design-modal').classList.add('active');
  document.getElementById('design-modal-title').textContent = title;
  document.getElementById('design-modal-iframe').src = url;
  document.body.style.overflow = 'hidden';
}
function closeDesignModal(e) {
  if (e && e.target !== e.currentTarget) return;
  document.getElementById('design-modal').classList.remove('active');
  document.getElementById('design-modal-iframe').src = '';
  document.body.style.overflow = '';
}
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDesignModal(); });
</script>

Chaque fichier généré est autonome (HTML + CSS + JS inline) et peut être prévisualisé directement dans le navigateur. Cette approche permet de comparer rapidement différentes directions créatives avant de choisir celle à intégrer.

# L'animation hero

Pour l'animation hero, j'ai commencé par générer une première animation avec Claude.ai, puis je l'ai affinée en m'inspirant de sources web :

- [Moving Letters - Tobias Ahlin](https://tobiasahlin.com/moving-letters/)
- [CSS Text Animations - Prismic](https://prismic.io/blog/css-text-animations)

## Animation du titre

Claude code a montré ses capacités dans l'intégration de code ad hoc notamment sur :
- L'effet typewriter
- L'effet Néon sur "AI First"

J'ai par ailleurs demandé à Claude Code de me détailler son implémentation pour pouvoir faire des ajustements manuels par la suite.

## Animation de l'image de profil

Pour l'image de profil, le workflow a été plus technique et j'ai pu générer et tester des images depuis Claude Code.

1. Création d'une image "loading" avec fond uni (#0c0c0c) via Python/PIL
2. Utilisation de `rembg` pour retirer le background de la photo originale en sélectivement certaines couleurs (bleus électriques, oranges) tout en préservant le visage
3Transition fade entre l'image neutre et l'image finale

## Typographie custom

Pour renforcer l'aspect tech/futuriste du "AI First", j'ai utilisé la police "Terminal F4" téléchargée depuis DaFont. L'intégration a été simple : drag & drop du fichier zip dans Claude Code qui s'est chargé de l'installer. Un fallback sur "Exo 2" (Google Font) assure la compatibilité.

## Vérification de l'intégration

Pour tester visuellement les animations, j'ai utilisé plusieurs approches :

- **screenshots avec Claude in Chrome** : efficace pour le gros du travail, mais consomme beaucoup de tokens
- **Feedback textuel avec Claude Code** : plus économe, suffisant pour les ajustements mineurs
- **Corrections manuelles** : certains détails de spacing et de margins que Claude avait du mal à appréhender

# Transition en expérience SPA

J'ai voulu ajouter des transitions fluides entre les pages, comme sur une Single Page Application, tout en gardant mon site Hugo (server-side rendered).

En utilisant le **plan mode** de Claude Code, il m'a proposé [Swup.js](https://swup.js.org/) : une librairie légère conçue exactement pour ce cas d'usage. L'implémentation a été rapide et le résultat transforme l'expérience de navigation.

# Accessibilité

L'accessibilité n'a pas été oubliée. J'ai utilisé **Claude in Chrome** pour lancer un audit via PageSpeed Insights directement depuis le navigateur.

Le site gère maintenant `prefers-reduced-motion` : les utilisateurs qui préfèrent réduire les animations voient des transitions simplifiées (opacité uniquement, sans mouvement).

## Vérification du contenu

En bonus, j'ai demandé à Claude Code de vérifier tous les liens cassés de mes articles. Il a utilisé des **subagents** pour paralléliser le travail et identifier rapidement les URLs mortes à corriger.

# Génération de cet article
J'ai documenté les étapes principales de cette refonte au fur et à mesure dans un Google Doc en notant notamment les technos et sites utilisées.
Claude Code a ensuite rédigé cet article que j'ai relu et corrigé (style, sections).

Le résultat : une documentation qui représente précisément le travail effectué avec un minimum de travail !

# Conclusion

Ce projet illustre bien comment l'IA peut s'intégrer dans un workflow de développement web. Plutôt qu'un outil qui fait tout à ma place, c'est un partenaire qui accélère la recherche, propose des solutions techniques, et implémente les détails fastidieux — tout en me laissant le contrôle créatif sur le résultat final.

Les outils utilisés :
- **Claude Code** : implémentation, recherche, vérification
- **Claude.ai** : génération de templates et brainstorming
- **Claude in Chrome** : tests visuels et inspiration depuis des sites existants
- **GSAP** : animations JavaScript
- **Swup.js** : transitions SPA
- **rembg** et **PIL** : manipulation d'images
- **Playwright** : screenshots automatisés
