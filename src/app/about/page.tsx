export const metadata = {
  title: "About Sub-Agents Directory",
  description: "Why we built Sub-Agents Directory",
};

export default function About() {
  return (
    <div className="flex flex-col items-center justify-center max-w-screen-md mx-auto px-6 py-12">
      <h1 className="text-4xl mb-12 mt-20 text-center">
        Why We Built <br />
        Sub-Agents Directory
      </h1>

      <div className="space-y-12 mt-10">
        <section>
          <p className="text-[#878787] leading-relaxed text-sm">
            Claude Code's sub-agents are incredibly powerful, but discovering the right prompts for
            your specific framework or language can be challenging. We built Sub-Agents Directory to
            solve this problem - a community-driven collection of curated prompts that help
            developers get the most out of Claude Code's agentic capabilities.
          </p>
        </section>

        <section>
          <h2 className="text-xl mb-2">What You'll Find</h2>
          <p className="text-[#878787] leading-relaxed text-sm">
            Sub-Agents Directory provides ready-to-use prompts for dozens of frameworks and
            languages including Next.js, React, Python, TypeScript, Go, Rust, and many more. Each
            prompt is designed to give Claude Code the context it needs to write better code, follow
            best practices, and understand your project's conventions.
          </p>
        </section>

        <section>
          <h2 className="text-xl mb-2">MCP Servers</h2>
          <p className="text-[#878787] leading-relaxed text-sm">
            Beyond prompts, we also curate a collection of Model Context Protocol (MCP) servers that
            extend Claude Code's capabilities. These servers allow Claude to interact with
            databases, APIs, and other tools directly, making your development workflow even more
            powerful.
          </p>
        </section>

        <section>
          <h2 className="text-xl mb-2">Community Driven</h2>
          <p className="text-[#878787] leading-relaxed text-sm">
            This project is open source and welcomes contributions from the community. If you have a
            prompt that's been working well for you, consider{" "}
            <a
              href="https://github.com/ayush-that/sub-agents.directory?tab=readme-ov-file#contributing"
              className="text-primary border-border border-dashed border-b-[1px]"
            >
              submitting it
            </a>{" "}
            to help other developers.
          </p>
        </section>
      </div>
    </div>
  );
}
