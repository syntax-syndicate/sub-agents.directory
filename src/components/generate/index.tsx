"use client";

import { generateRule } from "@/actions/generate-rule";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";
import { GenerateInput } from "./input";
import { GenerateList } from "./list";
import { GeneratedResults } from "./results";
import { GenerateTitle } from "./title";

export function Generate() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (fileContent?: string) => {
    const input = fileContent || value;
    if (!input.trim()) return;

    setIsLoading(true);
    setResult("");
    setError(null);
    setFinished(false);

    try {
      const { stream } = await generateRule(input);

      let accumulated = "";
      for await (const chunk of stream) {
        accumulated += chunk;
        setResult(accumulated);
      }

      setFinished(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to generate rule";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setValue("");
    setResult("");
    setFinished(false);
    setError(null);
  };

  const hasResult = result.length > 0;

  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center px-4">
      <div
        className={cn(
          "w-full max-w-2xl transition-all duration-500",
          hasResult && "opacity-0 blur-sm pointer-events-none absolute"
        )}
      >
        <GenerateTitle />
        <GenerateInput
          value={value}
          setValue={setValue}
          onSubmit={handleGenerate}
          isLoading={isLoading}
        />
        <GenerateList />
      </div>

      {hasResult && (
        <GeneratedResults result={result} onNew={handleReset} />
      )}

      {error && !hasResult && (
        <div className="mt-4 p-4 border border-red-500/20 bg-red-500/10 rounded-lg text-sm text-red-500">
          {error}
        </div>
      )}
    </div>
  );
}
