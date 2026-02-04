---
prod: false
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

## Supabase — The Backend Shortcut

For an MVP, Supabase's free tier is more than enough. It provides everything you need to ship fast without worrying about infrastructure costs early on.

### Why Supabase?

The main reason to consider Supabase is simple: it bundles critical features out of the box, drastically reducing implementation time:

| Feature | What you get |
|---------|--------------|
| **Authentication** | Magic links, OAuth providers, session management — no need to roll your own auth |
| **Hosted Postgres** | A real database with Row Level Security, not some proprietary NoSQL abstraction |
| **Object Storage** | S3-compatible buckets for audio files (full loops and previews in my case) |
| **Email system** | Built-in email templates for auth flows |
| **Vector DB** | pgvector extension ready for AI embeddings if you need it later |

### Low Learning Curve, Great DX

If you know SQL and basic REST/GraphQL concepts, you're already 80% there. The dashboard is intuitive, the client libraries are well-documented, and the TypeScript types can be auto-generated from your schema.

### Local Development

What I appreciate most: Supabase runs locally via Docker. You get a full replica of the production stack on your machine — database, auth, storage, everything. No more "works on my machine" surprises when deploying.

```bash
supabase start    # Spin up local instance
supabase db reset # Reset with migrations
```

This local-first approach makes iterating on database schema and RLS policies painless.

## Secure Payments with Stripe

I use **Stripe Checkout** in hosted mode for payments:

1. User clicks "Buy"
2. API creates a Checkout session with metadata
3. Redirect to Stripe (secure UI)
4. Webhook receives confirmation → purchase created in DB

**Best Practices Implemented:**
- Webhook validation with `stripe.webhooks.constructEvent()`
- Idempotency: check if purchase already exists
- Metadata for tracing user/loop without additional queries

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
