---
draft: false
title: My Workflow with AI Agents
description:
  Best practices for coding with AI agents in a mindful and controlled manner
keywords:
  - Software Development
  - AI
  - Best Practices
  - Productivity
date: "2025-09-01"
color: "#8ba5ba"
---

*AI agents: great power comes with great responsibility*

AI agents burst onto the software development scene a few months ago and are driving a genuine revolution. Their capabilities are remarkable across all types of development, particularly in web development.

Today, it's nearly impossible not to integrate these agents as first-class citizens in a modern development toolkit.

However, using AI raises many questions and is far from being as straightforward and beneficial as first impressions and "trust me bro" benchmarks might suggest.

> After daily use over the past few months and considerable reflection, I decided to share my experience and discuss my workflow with AI agents, including its advantages and limitations.

# Ethical Considerations

Before diving into technical details, I want to address some ethical questions surrounding the use of these tools.

## Carbon Footprint

The carbon footprint of an LLM like Claude Sonnet can be significant but depends heavily on usage. Currently, my monthly usage is around 10 million tokens, which translates to:

- Power consumption (common estimate of 0.0005 kWh per 1,000 tokens): 5 kWh, or roughly 1-2 kg CO2 equivalent
- Factoring in infrastructure costs (manufacturing, maintenance), we can multiply by 2, potentially reaching close to 50 kg CO2 per year

In summary, it's not catastrophic but it's a notable cost.

**Why is it acceptable?**

## Rebound Effect

It all comes down to balance and impact. Using these LLMs can be ethical if it replaces developer work without a significant rebound effect. In other words, if developers use their freed-up time to generate even more revenue, we enter a harmful loop where costs and impact can explode.

My approach is different: I use AI to work less, and that's the direction technological innovations should take. The fact that so many (well-paid) people continue to work so hard in our era puzzles me. Nobody loves their job that much, right?

Put simply, I don't plan to increase my income through AI, just my hourly earnings. I hope to free up time for impact that I consider still modest at present. Other actions are far more significant (like eating vegetarian or avoiding air travel).

## Mindful Usage, Not Vibe Coding

It's difficult to separate fact from fiction regarding the term "vibe coding," supposedly representing developers who code almost entirely through AI. That's not what I've observed around me, but it goes without saying that this would be a completely inappropriate use of AI—producing throwaway, unsustainable code that borders on fraud and energy waste.

What's certain is that the recent trend, following massive hype around agents, is a return to a more reasoned, hybrid approach. Some statements from major US companies walking back their all-in-on-AI decisions are quite amusing.

It's therefore important to resist the temptation of intensive agent usage, which brings numerous problems:
- Environmental impact
- Less maintainable code
- Developer skill degradation
- Loss of enjoyment

# Mindful Use of Agents

## Agents Without Intent

Regardless of the type of AI, one thing that strikes me—despite the accuracy and speed of recent models—is the tendency of agents to propose responses lacking clear intent, and I'd almost say lacking emotion.

This feeling is obvious when asking an LLM to produce artistic text or music. All the richness and depth of human interactions, regardless of the medium, relies on communicating intent. Reading AI-generated code is tiresome. It's code without flair—verbose and generic.

In terms of both impact and results, practice encourages using agents in a controlled and segmented manner, or risk impoverishing the codebase and what it will convey to future developers. I can already picture myself revisiting codebases in a few years thinking "another thing coded by an AI..."

### The Context Problem

Arguably the main problem with agents today is their limited access to codebase context. Manually specifying files is slow, and letting the agent search is equally slow. LLMs tend to struggle anyway when conversation context becomes too long. They will therefore propose suboptimal solutions (due to lack of context) whenever requests are too generic.

## Knowing When to Use AI

AI agents provide code on demand and compete with many existing tools and coding techniques. Software development didn't wait for AI to offer solutions beyond manual coding!

Granted, some agent uses are unique because they can propose extremely specific code, but the nature of software projects is rarely to seek originality. The only people who think they're doing something unique are typically junior developers and clients.

Learning not to reinvent the wheel is fundamental to development work, and unfortunately, agents aren't excellent at applying this principle. They often propose verbose solutions and won't think of elegant or pragmatic alternatives (like using an existing library or the latest CSS directive) on their own.

Knowing the ecosystem inside out and continuing to learn remains the priority as a developer.

> Here's an example: I wrote this document in Google Docs and wanted to convert it to markdown for publishing on this blog. I first thought about copy-pasting the text into Claude before realizing that a Google Docs extension already existed and did the job better algorithmically and much faster!

**Let's now discuss my technical recommendations for using agents.**

# A Hybrid Workflow with Full Control

The real revolution for web development was the arrival of agents capable of working on an entire codebase.

Tools fall into two camps: AI IDEs (like Cursor) and CLI AI agents (like Claude Code).

I strongly prefer the second option, which allows me to maintain full control of my editor (JetBrains), without eroding either my coding enjoyment or my screen real estate.

I use Claude Code (Sonnet 4.5) connected to my JetBrains editor (via the [/ide](https://code.claude.com/docs/en/jetbrains) command—open files and selections are integrated into Claude Code's context).

## Claude Code, a Polished CLI

I admit I haven't tested other CLI tools like Codex, but I consider Claude Sonnet the best LLM for code (it's the one I use in the web version and it seems more accurate and useful than ChatGPT in particular).

Furthermore, Claude Code's CLI experience is polished—Anthropic has done excellent work on this aspect. I've noticed they're facing criticism lately for their product and competition from other solutions like openCode. Developers can be harsh.

## Bonus Tips

Claude, like all LLMs, gives an impression of being ready out of the box and doesn't need additional configuration to be highly useful.

For example, the recently added plan mode seems unnecessary to me and more targeted at vibe coders.

Nevertheless, I've successfully experimented with some [Anthropic recommendations](https://www.anthropic.com/engineering/claude-code-best-practices):

- I use a generic claude.local.md for all my projects, briefing Claude Code on my development approach whenever I start a new project (Makefile usage, architecture preferences, etc.)
- For existing projects, I ask Claude to enrich this file by analyzing the codebase. This enables intelligent modifications that go beyond the context of analyzed files (e.g., using internal services or libraries, running lint commands, etc.)

Final point: mastering git and having a dynamic workflow is important to avoid wasting time on rollbacks or differentiating irrelevant changes.
