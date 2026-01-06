"use client";

export function GenerateTitle() {
  return (
    <div className="text-center mb-8">
      <h1
        className="text-[21px] font-medium mb-2"
        style={{
          opacity: 0,
          animation: "fadeIn 0.6s ease-out forwards",
        }}
      >
        Generate Sub-Agent Prompts
      </h1>
      <p
        className="text-sm text-[#878787] max-w-md mx-auto"
        style={{
          opacity: 0,
          animation: "fadeIn 0.6s ease-out forwards",
          animationDelay: "0.1s",
        }}
      >
        Upload your package.json, requirements.txt, or describe your project to generate customized
        Claude Code sub-agent prompts.
      </p>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
