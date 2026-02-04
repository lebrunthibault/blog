# Session Claude Code - Animation Hero Homepage

## Objectif
Créer une animation d'entrée dynamique pour le titre hero du portfolio avec des effets modernes.

## Travail réalisé

### 1. Animation du titre en 3 étapes
- **"Modern"** : effet typewriter avec ligne verticale qui traverse et révèle chaque lettre
- **"Web Development"** : même effet typewriter
- **"AI First"** : apparition avec scale (zoom) pour "AI", fade in pour "First", suivi d'un effet néon subtil (glow bleu pulsant)

### 2. Effet néon personnalisé
- Alternance entre deux teintes de bleu avec `text-shadow` multicouche
- Paramétrage fin : blur (2px/6px/12px/20px), opacités, durées
- Fade out progressif en fin d'animation

### 3. Animation image de profil
- Création d'une image "loading" avec fond uni (#0c0c0c) via Python/PIL
- Utilisation de `rembg` pour retirer le background AI de la photo originale
- Script custom pour retirer sélectivement les couleurs (bleus électriques, oranges) tout en préservant le visage
- Transition fade entre image neutre et image avec background AI

### 4. Typographie
- Police custom "Terminal F4" pour "AI First" (style tech/futuriste)
- Fallback sur "Exo 2" (Google Font)

## Outils utilisés
- **GSAP** : bibliothèque d'animation (timelines, easing, stagger)
- **rembg** : suppression de fond d'image (installé via pipx)
- **PIL/Pillow** : manipulation d'image (remplacement de couleurs par plage HSV)
- **Playwright** : vérification visuelle des animations
