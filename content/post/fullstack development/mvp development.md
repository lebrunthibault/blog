---
draft: false
title: "Construire un MVP Web Moderne"
date: 2026-02-03
description: "Guide pratique pour livrer un MVP fullstack avec Next.js, Supabase, Stripe, et le développement assisté par IA avec Claude Code et les serveurs MCP."
keywords:
  - Fullstack
  - TypeScript
  - AI
  - Best Practices
---

Dans cet article, je partage mon approche pour construire des MVP **robustes**, **évolutifs**, et **prêts au déploiement** dès le premier jour — en tirant parti des frameworks modernes et du développement assisté par IA.

# La Stack MVP Moderne

Après plusieurs projets, j'ai convergé vers une stack qui maximise la vélocité sans sacrifier la qualité production :

| Couche | Technologie | Pourquoi                                                                   |
|--------|-------------|----------------------------------------------------------------------------|
| Framework | **Next.js 16** (App Router) | Un framework front moderne et standard                                     |
| API | **tRPC v11** + React Query | Typage de bout en bout, rapide à setup et robuste pour des évolutions futures |
| Base de données | **Supabase** (PostgreSQL) | Le choix idéal pour du MVP sans avoir à setup Docker ou un système d'authentification |
| Paiements | **Stripe Checkout** | Standard et fonctionne out of the box                                      |
| UI | **shadcn/ui** + Tailwind CSS v4 | Pour un design professionnel et très flexible à modifier                   |
| Déploiement | **Vercel** | Pas de serveur à gérer, un free tier généreux                              |

Cette combinaison élimine des catégories entières de décisions et de boilerplate, vous permettant de vous concentrer sur la logique métier.

# Développement Assisté par IA avec Claude Code

L'un des multiplicateurs de productivité les plus significatifs dans mon workflow est **Claude Code** — un assistant IA qui comprend le contexte complet du projet et peut exécuter des tâches de manière autonome.

## Les Serveurs MCP : Le Game Changer

Ce qui distingue cette approche, c'est l'intégration des **serveurs Model Context Protocol (MCP)**. Ils permettent à l'IA d'interagir directement avec les services externes :

- **Supabase MCP** — Interroger les bases de données, appliquer les migrations, gérer les schémas directement depuis la conversation
- **Stripe MCP** — Rechercher des clients, lister les produits, débugger les flux de paiement sans changer de contexte
- **Vercel MCP** — Déployer, consulter les logs, gérer les variables d'environnement

En pratique, il suffit de décrire simplement les évolutions du modèle de données ("crée une table purchases avec tels champs"), 
l'IA analyse le schéma existant, génère la migration appropriée, l'applique via le MCP Supabase, et vérifie que tout fonctionne.

Cette intégration étroite signifie **moins de changements de contexte** et **des cycles d'itération plus rapides**.

# Supabase — Le raccourci backend

## Pourquoi Supabase ?

La gestion d'un backend hosté et d'une base de données type Postgresql (développement local avec Docker et déploiement en prod et préprod) ajoute
une complexité non négligeable dans le développement d'un backend.
L'approche moderne et appropriée au développement rapide d'un MVP consiste à utiliser un BAAS (Backend as a service) comprenant principalement une base de données serverless
mais aussi un service d'authentification, un service de stockage de fichiers, l'envoi d'email via SMTP et des fonctions serverless. 

Pour un MVP, le tier gratuit de Supabase est largement suffisant. Il fournit tout ce qu'il faut pour livrer rapidement sans se soucier des coûts d'infrastructure au départ.

## Au delà de la base de données hébergée

| Fonctionnalité             | Ce que vous obtenez                                                                       |
|----------------------------|-------------------------------------------------------------------------------------------|
| **Authentification**       | Magic links, providers OAuth, gestion de sessions — pas besoin de coder sa propre auth    |
| **Postgres hébergé**       | Une vraie base de données avec Row Level Security, pas une abstraction NoSQL propriétaire |
| **Stockage objet**         | Buckets compatibles S3 pour les fichiers uploadés                                         |
| **Système d'emails**       | Templates d'emails intégrés pour les flows d'authentification (faciles à modifier)        |
| **Notifications realtime** | Permet d'avoir des notification websockets                                                |
| **Vector DB**              | Extension pgvector prête à l'emploi pour les embeddings IA si besoin plus tard            |

## Sécurité

Un système BAAS permet l'exécution de queries à la db depuis le browser et nécessite donc une couche de sécurité supplémentaire
comparé à la gestion d'une base de données classique (ou la db est protégée derrière une api qui gère l'authentification et l'authorisation).

Pour implémenter cette couche de sécurité Supabase utilise la primitive Postgresql [Row Level Security](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)

L'activation se fait par table :
```SQL
alter table "table_name" enable row level security;
```

Une fois le RLS activé on peut ajouter des policies qui sont des clauses WHERE implicites souvent basées
sur l'id de l'utilisateur connecté ou son rôle. Elles évient a l'utilisateur de la plateforme d'avoir accès à la db.

On crée une policy avec :
```SQL
create policy "Individuals can view their own todos."
on todos for select
using ( (select auth.uid()) = user_id );
```
ce qui ajoutera la policy sur chaque select !
```SQL
select *
from todos
where auth.uid() = todos.user_id;
-- ce where est ajouté
```

NB : les RLS ne s'utilisent que comme couche de sécurité et jamais comme logique métier. Le filtrage doit toujours être fait dans la query
originale pour des raisons d'une part de lisibilité et d'autre part de [performance](https://supabase.com/docs/guides/database/postgres/row-level-security#add-filters-to-every-query) (Postgres peut optimiser la requête).

## Performance

- [Minimiser les joins dans les policies](https://supabase.com/docs/guides/database/postgres/row-level-security#minimize-joins): éviter les correlated subqueries dans les policies RLS quand c'est possible.

# Intégration des Paiements avec Stripe

Pour un MVP, **Stripe Checkout** est le chemin le plus rapide vers l'acceptation de paiements — et c'est souvent suffisant même pour un produit mature.

# Déploiement serverless avec Vercel

Pour aller toujours plus vite dans le développement de prototype, il est utile de déléguer la charge de configuration du déploiement
à des services serverless comme Vercel.

Avec Vercel, le déploiement devient presque invisible — et c'est exactement ce qu'on veut pour un MVP où chaque minute compte.

**Le workflow est minimaliste mais efficace :**

- **Push sur main** → Déploiement automatique en production
- **Push sur une branche** → URL de preview générée instantanément
- **Ouverture d'une PR** → L'URL de preview apparaît dans les commentaires

**Pourquoi Vercel excelle pour les MVPs :**

- **Zero configuration** — Détection automatique de Next.js, installation des dépendances, build optimisé
- **Preview URLs** — Chaque branche a son environnement isolé. Parfait pour montrer une feature à un client ou tester une intégration
- **Rollbacks en un clic** — Une mise en prod qui casse quelque chose ? Retour à la version précédente en 30 secondes
- **Variables d'environnement par contexte** — Dev, preview, et production ont chacun leurs propres secrets

Pour la validation continue, une simple configuration GitHub Actions suffit : linting et build à chaque push. Si le build passe, Vercel déploie. Simple, efficace, et ça évite de merger du code buggé.

# Résumé du Workflow de Développement

1. **Définir le modèle de données** → Migrations Supabase
2. **Construire l'API** → Procédures tRPC avec validation Zod
3. **Créer l'UI** → Composants shadcn/ui avec Tailwind
4. **Ajouter les paiements** → Stripe Checkout + webhooks
5. **Déployer** → Push sur main, Vercel s'occupe du reste

# En conclustion

En combinant les bons outils avec le développement assisté par IA, livrer un MVP de qualité production est plus rapide que jamais — sans faire de compromis sur la sécurité ou la qualité du code.
L'attention reste sur ce qui compte : construire les fonctionnalités dont les utilisateurs ont vraiment besoin.

