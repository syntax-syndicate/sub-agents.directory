"use client";

export function HeroTitle() {
  return (
    <div className="text-center mb-8">
      <h1
        className="text-[17px] sm:text-[21px] mb-2 font-fraunces"
        style={{
          opacity: 0,
          animation: "fadeIn 0.2s ease forwards",
        }}
      >
        Browse 200+ Claude Code Sub-Agent Prompts
      </h1>

      <p
        className="text-[#878787] text-sm max-w-md mx-auto"
        style={{
          opacity: 0,
          animation: "fadeIn 0.2s ease forwards 0.1s",
        }}
      >
        Copy-paste ready prompts for React, Python, TypeScript, and more.
      </p>
      <p
        className="text-[#878787] text-xs mt-2"
        style={{
          opacity: 0,
          animation: "fadeIn 0.2s ease forwards 0.15s",
        }}
      >
        <a
          className="border-b border-border border-dashed hover:text-primary transition-colors"
          href="https://docs.anthropic.com/en/docs/claude-code/sub-agents"
          target="_blank"
          rel="noreferrer"
        >
          New to Claude Code?
        </a>
      </p>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
