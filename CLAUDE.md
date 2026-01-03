# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Sub-Agents Directory is a Next.js web application serving as a searchable directory of Claude Code sub-agent prompts and MCP (Model Context Protocol) servers. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS.

## Commands

```bash
# Development
bun install          # Install dependencies (uses bun as package manager)
bun dev              # Start dev server at localhost:3000

# Build & Production
bun build            # Build for production
bun start            # Start production server

# Code Quality
bun typecheck        # TypeScript type checking (tsc --noEmit)
bun lint             # Run Oxlint
bun lint:fix         # Auto-fix linting issues
bun format           # Format code with Oxfmt
bun format:check     # Check formatting without modifying

# Content Sync
bun sync             # Sync content from upstream (VoltAgent/awesome-claude-code-subagents)
```

## Architecture

### Data Flow

- **Content** (`content/`): Markdown files synced from [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents), organized by category
- **Rules Loader** (`src/data/rules/index.ts`): Parses markdown files with YAML frontmatter at build time
- **MCP Servers** (`src/data/mcp/index.ts`): Registry of MCP server definitions
- **API Routes**: Static JSON endpoints at `/api` and `/api/[slug]` with 24h ISR revalidation

### Content Sync

Content is synced from the upstream repository via:

- **Scheduled GitHub Action**: Runs every 6 hours to check for updates
- **Manual trigger**: Can be run on-demand via GitHub Actions
- **Local sync**: Run `bun sync` to update content locally

The sync creates a PR when changes are detected, allowing review before merge.

### Key Patterns

- **Server Components** by default, Client Components marked with `"use client"`
- **URL State Management** via Nuqs for search/filter state
- **Server Actions** in `src/actions/` for mutations (AI rule generation, subscriptions)
- **Static Generation** with `generateStaticParams()` for dynamic routes
- **Supabase Auth** for protected features (rule generation requires login)

### Directory Structure

```
src/
├── app/              # Next.js App Router pages and API routes
├── components/       # React components (ui/ for shadcn components)
├── data/             # Static data (rules/, mcp/)
├── actions/          # Server actions
├── lib/              # Utility functions
└── utils/supabase/   # Supabase client configuration
```

## Adding New Rules

Rules are synced from [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents). To contribute:

1. Submit a PR to the upstream repository
2. Once merged, content will sync automatically via GitHub Action

### Content Format

Each rule is a markdown file with YAML frontmatter:

```markdown
---
name: agent-name
description: Brief description of the agent
tools: Read, Write, Edit, Bash, Glob, Grep
---

Agent instructions and expertise guidelines in markdown...
```

## Environment Variables

Required (see `.env.example`):

- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key

## Code Style

- Oxlint enforces: strict equality (`===`), no console/debugger, React hooks rules, no import cycles
- Oxfmt for formatting
- Path alias: `@/*` maps to `./src/*`
- Component files: kebab-case (e.g., `rule-card.tsx`)
- Component names: PascalCase (e.g., `RuleCard`)
