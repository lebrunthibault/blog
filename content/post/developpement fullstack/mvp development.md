---
prod: true
draft: false
title: "Building a Modern Web MVP: From Zero to Production in Record Time"
date: 2026-02-03
description: "A practical guide to shipping a full-stack MVP using Next.js, Supabase, Stripe, and AI-assisted development with Claude Code and MCP servers."
tags: ["Next.js", "Supabase", "Stripe", "TypeScript", "tRPC", "AI", "MVP", "Claude Code"]
---

# Building a Modern Web MVP: From Zero to Production in Record Time

Shipping a production-ready MVP quickly while maintaining code quality is the holy grail of modern web development. In this article, I'll walk through my approach to building full-stack applications that are **type-safe**, **secure**, and **deployment-ready** from day one—leveraging both cutting-edge frameworks and AI-assisted development.

## The Modern MVP Stack

After iterating on multiple projects, I've converged on a stack that maximizes developer velocity without sacrificing production readiness:

| Layer | Technology | Why |
|-------|------------|-----|
| Framework | **Next.js 16** (App Router) | Server components, streaming, built-in API routes |
| API Layer | **tRPC v11** + React Query | End-to-end type safety, zero boilerplate |
| Database | **Supabase** (PostgreSQL) | Managed Postgres, Auth, Storage, Row Level Security |
| Payments | **Stripe Checkout** | Industry standard, handles compliance |
| UI | **shadcn/ui** + Tailwind CSS v4 | Accessible components, rapid styling |
| Deployment | **Vercel** | Zero-config deploys, edge network, preview URLs |

This combination eliminates entire categories of decisions and boilerplate, letting you focus on business logic.

## AI-Assisted Development with Claude Code

One of the most significant productivity multipliers in my workflow is **Claude Code**—an AI coding assistant that understands full project context and can execute tasks autonomously.

### MCP Servers: The Game Changer

What sets this approach apart is the integration of **Model Context Protocol (MCP) servers**. These allow the AI to interact directly with external services:

- **Supabase MCP**: Query databases, apply migrations, manage schemas directly from the conversation
- **Stripe MCP**: Search customers, list products, debug payment flows without switching context
- **Vercel MCP**: Deploy, check logs, manage environment variables

```
Developer: "Create a purchases table with RLS policies for user access"

Claude Code: *Analyzes existing schema*
            *Generates migration SQL*
            *Applies via Supabase MCP*
            *Verifies with security advisor*
```

This tight integration means less context-switching, fewer copy-paste errors, and faster iteration cycles.

### When AI Shines (and When It Doesn't)

AI-assisted development excels at:
- **Boilerplate generation**: CRUD operations, API routes, type definitions
- **Integration code**: Connecting services (Stripe webhooks, Supabase auth)
- **Debugging**: Analyzing logs, tracing issues across the stack
- **Documentation**: Generating types, API docs, README files

Human judgment remains critical for:
- **Architecture decisions**: Choosing the right abstractions
- **Business logic**: Understanding user needs
- **Security review**: Validating AI-generated code
- **UX decisions**: What the product should actually do

## Project Architecture

A clean, scalable structure from the start prevents technical debt:

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/                # API routes (tRPC, webhooks)
│   ├── (auth)/             # Auth-related pages
│   └── admin/              # Protected admin routes
├── server/
│   ├── trpc.ts             # tRPC initialization + context
│   └── routers/            # Domain-specific API procedures
├── lib/
│   ├── supabase/           # Client instances (browser, server, admin)
│   └── stripe.ts           # Stripe client configuration
├── components/             # Reusable UI components
└── hooks/                  # Custom React hooks
```

**Key principles:**
- **Colocation**: Keep related code together
- **Clear boundaries**: Server code never leaks to client bundles
- **Type safety**: Shared types flow from database to UI

## End-to-End Type Safety with tRPC

The single biggest productivity boost comes from eliminating the API boundary as a source of bugs:

```typescript
// server/routers/products.ts
export const productsRouter = router({
  list: publicProcedure
    .input(z.object({
      category: z.string().optional(),
      minPrice: z.number().optional(),
      maxPrice: z.number().optional(),
    }))
    .query(async ({ input }) => {
      // Input is validated and typed automatically
      const products = await db.query(...)
      return products // Return type is inferred
    }),
})
```

```typescript
// Client component - full autocomplete, zero runtime surprises
const { data } = trpc.products.list.useQuery({ category: 'electronics' })
// data.map(...) - TypeScript knows the exact shape
```

No OpenAPI specs to maintain. No code generation step. Change the server, and TypeScript immediately flags client-side issues.

## Database Security with Row Level Security

Supabase's RLS lets you define security rules at the database level:

```sql
-- Users can only read their own purchases
CREATE POLICY "Users read own purchases" ON purchases
  FOR SELECT USING (user_id = auth.uid());

-- Only admins can modify products
CREATE POLICY "Admins manage products" ON products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );
```

**Why this matters:**
- Security bugs in application code can't bypass database rules
- Policies are auditable and version-controlled
- Defense in depth: multiple layers of protection

## Payment Integration with Stripe

For MVPs, **Stripe Checkout** is the fastest path to accepting payments:

```typescript
// Create checkout session with metadata for webhook processing
const session = await stripe.checkout.sessions.create({
  mode: 'payment',
  line_items: [{
    price_data: {
      currency: 'usd',
      product_data: { name: product.name },
      unit_amount: product.price, // in cents
    },
    quantity: 1,
  }],
  metadata: {
    user_id: ctx.user.id,
    product_id: input.productId,
  },
  success_url: `${APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${APP_URL}/cancel`,
})
```

The webhook handler processes successful payments:

```typescript
// api/webhooks/stripe/route.ts
if (event.type === 'checkout.session.completed') {
  const session = event.data.object

  // Idempotency check
  const existing = await db.getPurchaseBySessionId(session.id)
  if (existing) return { received: true }

  // Record purchase using metadata
  await db.createPurchase({
    userId: session.metadata.user_id,
    productId: session.metadata.product_id,
    stripeSessionId: session.id,
  })
}
```

## Deployment Pipeline

With Vercel, deployment is essentially automatic:

1. **Push to main** → Production deploy
2. **Push to branch** → Preview URL generated
3. **Open PR** → Preview URL in PR comments

Environment variables are managed per-environment (development, preview, production), and rollbacks are one click away.

For additional validation, a simple CI workflow ensures code quality:

```yaml
name: CI
on: [push, pull_request]
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run lint
      - run: npm run build
```

## Development Workflow Summary

1. **Define data model** → Supabase migrations with RLS
2. **Build API** → tRPC procedures with Zod validation
3. **Create UI** → shadcn/ui components with Tailwind
4. **Add payments** → Stripe Checkout + webhooks
5. **Deploy** → Push to main, Vercel handles the rest

With AI assistance handling boilerplate and integration code, the focus stays on what matters: building features users actually need.

## Key Takeaways

- **Type safety eliminates bugs**: tRPC + TypeScript catches errors before runtime
- **Managed services reduce ops burden**: Supabase and Vercel handle infrastructure
- **AI accelerates, humans validate**: Use Claude Code for speed, review for quality
- **MCP servers bridge the gap**: Direct service integration from your development environment
- **Ship early, iterate fast**: The best architecture is one that lets you learn from real users

---

The modern web development landscape offers unprecedented leverage. By combining the right tools with AI-assisted development, shipping a production-quality MVP is faster than ever—without cutting corners on security or code quality.

*Questions about this stack or approach? Connect with me on [LinkedIn](https://www.linkedin.com/in/thibault-lebrun/).*
