"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

interface GenerateInputProps {
  value: string;
  setValue: (value: string) => void;
  onSubmit: (fileContent?: string) => void;
  isLoading: boolean;
  rateLimitReset?: number | null;
}

const placeholder = "Paste your package.json, requirements.txt, or describe your project...";

export function GenerateInput({
  value,
  setValue,
  onSubmit,
  isLoading,
  rateLimitReset,
}: GenerateInputProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuth(!!session?.user);
      setAuthChecked(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuth(!!session?.user);
      setAuthChecked(true);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!rateLimitReset) {
      setCountdown(null);
      return;
    }

    const updateCountdown = () => {
      const remaining = Math.ceil((rateLimitReset - Date.now()) / 1000);
      if (remaining <= 0) {
        setCountdown(null);
      } else {
        setCountdown(remaining);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [rateLimitReset]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        const validFiles = ["package.json", "requirements.txt", ".cursorrules", "CLAUDE.md"];
        const isValid = validFiles.some(
          (valid) =>
            file.name === valid || file.name.endsWith(".txt") || file.name.endsWith(".json"),
        );

        if (isValid) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const content = event.target?.result as string;
            setValue(content);
            onSubmit(content);
          };
          reader.readAsText(file);
        }
      }
    },
    [setValue, onSubmit],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (value.trim() && !isLoading) {
          onSubmit();
        }
      }
    },
    [value, isLoading, onSubmit],
  );

  return (
    <div className="relative">
      <div
        className={cn(
          "relative border border-border rounded-lg transition-all duration-200",
          isDragging && "border-primary bg-primary/5",
          authChecked && isAuth === false && "blur-[2px] pointer-events-none select-none",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isLoading || (authChecked && isAuth === false)}
          className={cn(
            "w-full min-h-[200px] p-4 bg-transparent resize-none focus:outline-none",
            "text-sm font-mono text-foreground placeholder:text-muted-foreground",
            isLoading && "opacity-50 cursor-not-allowed",
          )}
        />

        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <p className="text-xs text-muted-foreground">Drop a file or press Enter to generate</p>
          <button
            type="button"
            onClick={() => onSubmit()}
            disabled={
              !value.trim() || isLoading || (authChecked && isAuth === false) || countdown !== null
            }
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-full transition-all",
              "bg-foreground text-background hover:opacity-90",
              "disabled:opacity-50 disabled:cursor-not-allowed",
            )}
          >
            {countdown ? `Wait ${countdown}s` : isLoading ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>

      {authChecked && isAuth === false && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Sign in to generate sub-agent prompts
            </p>
            <Link
              href="/login"
              className="px-6 py-2 text-sm font-medium rounded-full bg-foreground text-background hover:opacity-90 transition-opacity"
            >
              Sign in
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
