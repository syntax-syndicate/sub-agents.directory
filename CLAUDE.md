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

- **Scheduled GitHub Action**: Runs at 00:00, 06:00, 12:00, 18:00 UTC daily
- **Manual trigger**: Can be run on-demand via GitHub Actions
- **Local sync**: Run `bun sync` to update content locally

The sync script only adds new files (won't overwrite existing ones) and commits directly to main when changes are detected.

### Key Patterns

- **Server Components** by default, Client Components marked with `"use client"`
- **URL State Management** via Nuqs for search/filter state
- **Static Generation** with `generateStaticParams()` for dynamic routes
- **Supabase Auth** for protected features (rule generation requires login)
- **Polar** for payment processing (advertising products)

### Directory Structure

```
src/
├── app/              # Next.js App Router pages and API routes
├── components/       # React components (ui/ for shadcn components)
├── data/             # Static data loaders (rules/, mcp/, ads, videos)
├── lib/              # Utility functions (utils, polar client)
└── utils/supabase/   # Supabase client configuration
```

## Adding New Rules

Add markdown files directly to the `content/` directory in the appropriate category folder:

```
content/
├── 01-core-development/
├── 02-language-specialists/
├── 03-infrastructure/
├── 04-quality-security/
├── 05-data-ai/
├── 06-developer-experience/
├── 07-specialized-domains/
├── 08-business-product/
├── 09-meta-orchestration/
└── 10-research-analysis/
```

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

Note: Content is also synced from [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents) as an additional source (won't overwrite local files).

## Environment Variables

Required for core functionality (see `.env.example`):

- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key

Required for advertising/payments:

- `POLAR_ACCESS_TOKEN` - Polar API access token
- `POLAR_PRODUCT_GRID_AD`, `POLAR_PRODUCT_BANNER_AD`, `POLAR_PRODUCT_PREMIUM` - Polar product IDs
- `NEXT_PUBLIC_APP_URL` - Application URL for redirects

## Code Style

- Oxlint enforces: strict equality (`===`), no console/debugger, React hooks rules, no import cycles
- Oxfmt for formatting
- Path alias: `@/*` maps to `./src/*`
- Component files: kebab-case (e.g., `rule-card.tsx`)
- Component names: PascalCase (e.g., `RuleCard`)
