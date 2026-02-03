---
prod: true
draft: false
title: "Construire un Marketplace Audio avec Next.js, Supabase et Stripe"
date: 2026-02-03
description: "Retour d'expérience sur la création de Loops, une plateforme de vente de boucles audio. Architecture, choix techniques et bonnes pratiques."
keywods: ["IA web dev", "Next.js", "Supabase", "Stripe", "TypeScript", "tRPC"]
---


# Construire un Marketplace Audio avec Next.js, Supabase et Stripe

J'ai récemment développé **Loops**, un marketplace permettant aux producteurs de musique d'acheter et télécharger des boucles audio de piano. Dans cet article, je partage les **choix techniques** et les **bonnes pratiques** que j'ai implémentées pour créer une application moderne, type-safe et scalable.

## Stack Technique

| Couche | Technologie | Justification |
|--------|-------------|---------------|
| Frontend | **Next.js 16** (App Router) | SSR, RSC, routing moderne |
| API | **tRPC v11** + React Query | Type-safety end-to-end |
| Base de données | **Supabase** (PostgreSQL) | Auth intégrée, RLS, Storage |
| Paiements | **Stripe Checkout** | Standard industrie, webhooks |
| UI | **shadcn/ui** + Tailwind v4 | Composants accessibles, customisables |

## Architecture du Projet

```
src/
├── app/                    # Pages (App Router)
│   ├── admin/              # Panel admin protégé
│   ├── api/                # Routes API (tRPC, webhooks)
│   └── auth/               # Authentification
├── server/
│   ├── trpc.ts             # Config tRPC + contexte
│   └── routers/            # Procédures API typées
├── lib/
│   └── supabase/           # Clients (browser, server, admin)
├── components/             # UI réutilisables
└── hooks/                  # Logique métier (auth, audio, filters)
```

### Pourquoi cette structure ?

- **Séparation claire** entre code client et serveur
- **Colocation** : chaque feature a ses composants, hooks et routes
- **Scalabilité** : ajout facile de nouvelles fonctionnalités

## Type-Safety End-to-End avec tRPC

L'un des choix les plus impactants a été d'utiliser **tRPC** plutôt qu'une API REST classique.

```typescript
// server/routers/loops.ts
export const loopsRouter = router({
  list: publicProcedure
    .input(z.object({
      genreId: z.string().nullish(),
      bpmMin: z.number().nullish(),
      bpmMax: z.number().nullish(),
      key: z.string().nullish(),
    }))
    .query(async ({ input }) => {
      // Query type-safe, validation automatique
    }),
})
```

```typescript
// Côté client - autocomplétion complète
const { data } = trpc.loops.list.useQuery({ genreId: 'jazz' })
// data est typé automatiquement !
```

**Avantages concrets :**
- Zéro génération de types manuelle
- Erreurs de typage détectées à la compilation
- Refactoring sécurisé

## Authentification avec Supabase SSR

L'authentification est gérée par **Supabase Auth** avec Magic Links. La partie délicate a été de gérer correctement les sessions côté client avec `@supabase/ssr`.

## Sécurité avec Row Level Security (RLS)

Supabase permet de définir des **politiques de sécurité au niveau des lignes** directement en SQL :

```sql
-- Seuls les admins peuvent modifier les loops
CREATE POLICY "Admins can manage loops" ON loops
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Les utilisateurs ne voient que leurs propres achats
CREATE POLICY "Users see own purchases" ON purchases
  FOR SELECT
  USING (user_id = auth.uid());
```

**Pourquoi c'est important :**
- Sécurité **défense en profondeur** : même si l'API a un bug, la DB refuse
- Logique de sécurité **centralisée** et auditable
- Pas de risque d'oubli de vérification côté code

## Paiements Sécurisés avec Stripe

J'utilise **Stripe Checkout** en mode hosted pour les paiements :

1. Le client clique sur "Acheter"
2. L'API crée une session Checkout avec les métadonnées
3. Redirection vers Stripe (UI sécurisée)
4. Webhook reçoit confirmation → création de l'achat en DB

```typescript
// server/routers/purchases.ts
createCheckoutSession: protectedProcedure
  .input(z.object({ loopId: z.string() }))
  .mutation(async ({ ctx, input }) => {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price_data: {...}, quantity: 1 }],
      metadata: {
        userId: ctx.user.id,
        loopId: input.loopId
      },
      success_url: `${APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    })
    return { url: session.url }
  })
```

**Bonnes pratiques implémentées :**
- Validation du webhook avec `stripe.webhooks.constructEvent()`
- Idempotence : vérification si l'achat existe déjà
- Metadata pour tracer user/loop sans requête supplémentaire

## CI/CD avec GitHub Actions

Le projet inclut un workflow de **déploiement continu** :

```yaml
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run lint

  deploy:
    needs: lint
    if: github.ref == 'refs/heads/main'
    steps:
      - run: vercel deploy --prod
```

**Workflow :**
1. Chaque push déclenche le linting ESLint
2. Si `main` + lint OK → déploiement automatique sur Vercel
3. Les PRs sont vérifiées mais pas déployées

## Points Clés à Retenir

1. **Type-safety** : tRPC + TypeScript = zéro surprise en runtime
2. **Sécurité en couches** : RLS + validation API + auth middleware
3. **Debug méthodique** : logs, timeouts, reproduction systématique
4. **Simplicité** : Stripe Checkout plutôt que Stripe Elements custom
5. **CI/CD dès le début** : automatiser pour éviter les erreurs humaines

---

Le code source complet est disponible sur [GitHub](https://github.com/lebrunthibault/loops-store).

*Des questions sur l'implémentation ? Contactez-moi sur [LinkedIn](https://www.linkedin.com/in/thibault-lebrun/).*
