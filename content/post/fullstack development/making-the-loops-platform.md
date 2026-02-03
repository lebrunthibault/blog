---
prod: true
draft: false
title: "Building an Audio Marketplace with Next.js, Supabase and Stripe"
date: 2026-02-03
description: "A deep dive into building Loops, an audio loop marketplace. Architecture decisions, tech stack choices and best practices."
keywords:
  - Fullstack
  - TypeScript
  - AI
  - MVP
  - Best Practices
---


# Building an Audio Marketplace with Next.js, Supabase and Stripe

I recently built **Loops**, a marketplace where music producers can purchase and download piano audio loops. In this article, I share the **technical decisions** and **best practices** I implemented to create a modern, type-safe and scalable application.

## Tech Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Frontend | **Next.js 16** (App Router) | SSR, RSC, modern routing |
| API | **tRPC v11** + React Query | End-to-end type safety |
| Database | **Supabase** (PostgreSQL) | Built-in auth, RLS, Storage |
| Payments | **Stripe Checkout** | Industry standard, webhooks |
| UI | **shadcn/ui** + Tailwind v4 | Accessible, customizable components |

## Project Architecture

```
src/
├── app/                    # Pages (App Router)
│   ├── admin/              # Protected admin panel
│   ├── api/                # API routes (tRPC, webhooks)
│   └── auth/               # Authentication
├── server/
│   ├── trpc.ts             # tRPC config + context
│   └── routers/            # Typed API procedures
├── lib/
│   └── supabase/           # Clients (browser, server, admin)
├── components/             # Reusable UI components
└── hooks/                  # Business logic (auth, audio, filters)
```

### Why This Structure?

- **Clear separation** between client and server code
- **Colocation**: each feature has its own components, hooks and routes
- **Scalability**: easy to add new features

## End-to-End Type Safety with tRPC

One of the most impactful decisions was using **tRPC** instead of a traditional REST API.

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
      // Type-safe query with automatic validation
    }),
})
```

```typescript
// Client-side - full autocompletion
const { data } = trpc.loops.list.useQuery({ genreId: 'jazz' })
// data is automatically typed!
```

**Key Benefits:**
- Zero manual type generation
- Type errors caught at compile time
- Safe refactoring

## Authentication with Supabase SSR

Authentication is handled by **Supabase Auth** with Magic Links. The tricky part was properly managing sessions on the client side with `@supabase/ssr`.

## Security with Row Level Security (RLS)

Supabase allows defining **row-level security policies** directly in SQL:

```sql
-- Only admins can manage loops
CREATE POLICY "Admins can manage loops" ON loops
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Users can only see their own purchases
CREATE POLICY "Users see own purchases" ON purchases
  FOR SELECT
  USING (user_id = auth.uid());
```

**Why This Matters:**
- **Defense in depth** security: even if the API has a bug, the database rejects unauthorized access
- **Centralized** and auditable security logic
- No risk of missing authorization checks in code

## Secure Payments with Stripe

I use **Stripe Checkout** in hosted mode for payments:

1. User clicks "Buy"
2. API creates a Checkout session with metadata
3. Redirect to Stripe (secure UI)
4. Webhook receives confirmation → purchase created in DB

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

**Best Practices Implemented:**
- Webhook validation with `stripe.webhooks.constructEvent()`
- Idempotency: check if purchase already exists
- Metadata for tracing user/loop without additional queries

## CI/CD with GitHub Actions

The project includes a **continuous deployment** workflow:

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

**Workflow:**
1. Every push triggers ESLint checks
2. If `main` branch + lint passes → automatic deployment to Vercel
3. PRs are verified but not deployed

## Key Takeaways

1. **Type safety**: tRPC + TypeScript = zero runtime surprises
2. **Layered security**: RLS + API validation + auth middleware
3. **Methodical debugging**: logs, timeouts, systematic reproduction
4. **Simplicity**: Stripe Checkout over custom Stripe Elements
5. **CI/CD from day one**: automate to prevent human errors

---

The full source code is available on [GitHub](https://github.com/lebrunthibault/loops-store).

*Questions about the implementation? Reach out on [LinkedIn](https://www.linkedin.com/in/thibault-lebrun/).*
