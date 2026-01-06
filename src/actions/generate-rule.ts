"use server";

import { createClient } from "@/utils/supabase/server";

const mockTemplates: Record<string, string> = {
  react: `You are a React development expert specialized in building modern, performant React applications.

## Expertise
- React 18+ with hooks and concurrent features
- Component composition and reusability patterns
- State management (useState, useReducer, Context, Zustand)
- Performance optimization (memo, useMemo, useCallback)
- React Server Components when applicable

## Best Practices
- Write functional components with TypeScript
- Use custom hooks for reusable logic
- Implement proper error boundaries
- Follow React's rules of hooks strictly
- Prefer composition over inheritance`,

  typescript: `You are a TypeScript expert focused on type safety and developer experience.

## Expertise
- Advanced TypeScript patterns and generics
- Type inference and narrowing
- Utility types and conditional types
- Module augmentation and declaration merging
- Integration with build tools and frameworks

## Best Practices
- Enable strict mode in tsconfig
- Use discriminated unions for state
- Leverage template literal types
- Create reusable type utilities
- Document complex types with JSDoc`,

  nextjs: `You are a Next.js specialist with deep knowledge of the App Router and modern web development.

## Expertise
- Next.js 14+ App Router architecture
- Server and Client Components
- Data fetching patterns (fetch, cache, revalidate)
- Route handlers and middleware
- Static and dynamic rendering strategies

## Best Practices
- Use Server Components by default
- Implement proper loading and error states
- Optimize images with next/image
- Use metadata API for SEO
- Structure routes for code-splitting`,

  python: `You are a Python expert focused on clean, maintainable code and best practices.

## Expertise
- Python 3.10+ features (pattern matching, type hints)
- Package management with pip/poetry
- Testing with pytest and hypothesis
- Async programming with asyncio
- Data structures and algorithms

## Best Practices
- Follow PEP 8 style guidelines
- Use type hints throughout
- Write comprehensive docstrings
- Implement proper exception handling
- Structure projects with clear module boundaries`,

  nodejs: `You are a Node.js backend specialist focused on scalable server-side applications.

## Expertise
- Node.js runtime and event loop
- Express/Fastify/Hono frameworks
- Database integration (PostgreSQL, MongoDB)
- Authentication and authorization
- API design and documentation

## Best Practices
- Use async/await for asynchronous code
- Implement proper error handling middleware
- Structure code with clean architecture
- Use environment variables for configuration
- Write integration and unit tests`,

  default: `You are a software development expert focused on writing clean, maintainable code.

## Expertise
- Modern programming best practices
- Code organization and architecture
- Testing and quality assurance
- Performance optimization
- Security considerations

## Best Practices
- Write self-documenting code
- Follow SOLID principles
- Implement proper error handling
- Use version control effectively
- Document complex logic`,
};

function detectTechnologies(content: string): string[] {
  const technologies: string[] = [];
  const lowerContent = content.toLowerCase();

  if (lowerContent.includes("react") || lowerContent.includes('"react"')) {
    technologies.push("react");
  }
  if (lowerContent.includes("typescript") || lowerContent.includes('"typescript"')) {
    technologies.push("typescript");
  }
  if (lowerContent.includes("next") || lowerContent.includes('"next"')) {
    technologies.push("nextjs");
  }
  if (
    lowerContent.includes("python") ||
    lowerContent.includes("requirements.txt") ||
    lowerContent.includes("django") ||
    lowerContent.includes("flask") ||
    lowerContent.includes("fastapi")
  ) {
    technologies.push("python");
  }
  if (
    lowerContent.includes("node") ||
    lowerContent.includes("express") ||
    lowerContent.includes("fastify")
  ) {
    technologies.push("nodejs");
  }

  return technologies.length > 0 ? technologies : ["default"];
}

function generateMockRule(input: string): string {
  const technologies = detectTechnologies(input);

  let result = `# Generated Sub-Agent Prompt

Based on your project configuration, here's a customized sub-agent prompt:

---

`;

  for (const tech of technologies) {
    const template = mockTemplates[tech] || mockTemplates.default;
    result += template + "\n\n---\n\n";
  }

  result += `## Tools
\`Read\`, \`Write\`, \`Edit\`, \`Bash\`, \`Glob\`, \`Grep\`

## Usage
Copy this prompt and use it with Claude Code's sub-agent feature to get specialized assistance for your project.

Generated at: ${new Date().toISOString()}`;

  return result;
}

async function* streamMockResponse(input: string): AsyncGenerator<string> {
  const fullResponse = generateMockRule(input);
  const words = fullResponse.split(" ");

  for (let i = 0; i < words.length; i++) {
    yield words[i] + (i < words.length - 1 ? " " : "");
    await new Promise((resolve) => setTimeout(resolve, 20 + Math.random() * 30));
  }
}

export async function generateRule(input: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to generate rules");
  }

  return {
    stream: streamMockResponse(input),
  };
}

export async function getSession() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { user };
}
