# Mise à jour des sources des articles

Parcourt tous les articles du blog et met à jour le frontmatter `sources` à partir des liens externes trouvés dans le contenu.

## Procédure

1. **Lister les articles** : Glob `content/post/**/*.md` (exclure `_index.md`)

2. **Pour chaque article**, lire le contenu et :
   - Extraire tous les liens markdown externes `[texte](url)` du body (après le frontmatter `---`)
   - **Inclure** : articles de référence, documentation, tutoriels, outils/librairies spécifiquement discutés, bibliographie
   - **Exclure** :
     - Liens internes au blog (commençant par `/`)
     - Liens vers les propres repos GitHub de l'auteur (`github.com/lebrunthibault/`)
     - Liens LinkedIn de l'auteur
     - Pages d'accueil génériques de technologies (vue.js, react.js, nestjs.com, etc.) sauf si la techno est le sujet principal de l'article
   - Utiliser le texte du lien markdown comme `title` de la source
   - Utiliser l'URL comme `url` de la source

3. **Mettre à jour le frontmatter** :
   - Si `sources:` existe déjà, le remplacer entièrement avec la nouvelle liste
   - Si `sources:` n'existe pas et qu'il y a des liens à ajouter, l'insérer avant le `---` fermant
   - Si aucun lien externe pertinent n'est trouvé, ne pas ajouter de section `sources`
   - Ne pas supprimer une section `sources` existante s'il n'y a plus de liens (l'utilisateur l'a peut-être ajoutée manuellement)

4. **Format du frontmatter sources** :
```yaml
sources:
  - title: "Titre de la source"
    url: "https://example.com"
  - title: "Autre source"
    url: "https://example.com/other"
```

5. **Afficher un résumé** à la fin : tableau avec le nom de chaque article et le nombre de sources ajoutées/mises à jour.
