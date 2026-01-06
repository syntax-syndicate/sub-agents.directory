import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const getModel = () => openrouter("qwen/qwen3-coder:free");

export const SYSTEM_PROMPT = `You are an expert at creating Claude Code sub-agent prompts.
Given a project configuration (package.json, requirements.txt, or description),
generate a comprehensive sub-agent prompt that includes:

1. A clear role description with the agent name
2. Key expertise areas based on the detected technologies
3. Best practices for the tech stack
4. Specific tools the agent should use (Read, Write, Edit, Bash, Glob, Grep)
5. Communication and workflow guidelines

Format the output as markdown with clear sections using ## headings.
Be specific and actionable in your recommendations.
Start with a YAML frontmatter block containing:
- name: kebab-case agent name
- description: One-line description
- tools: Comma-separated list of tools

Example format:
---
name: react-typescript-expert
description: Expert React and TypeScript developer for modern web applications
tools: Read, Write, Edit, Bash, Glob, Grep
---

## Expertise
...`;
