"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Copy, RefreshCw, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface GeneratedResultsProps {
  result: string;
  onNew: () => void;
}

export function GeneratedResults({ result, onNew }: GeneratedResultsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [result]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleShare = () => {
    const text = encodeURIComponent("Check out this sub-agent prompt I generated on Sub-Agents Directory!");
    const url = encodeURIComponent("https://sub-agents.directory/generate");
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="border border-dashed border-border rounded-t-lg p-4 bg-card/30">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Generated Sub-Agent Prompt</span>
          <span className="text-xs text-muted-foreground">
            {new Date().toLocaleString()}
          </span>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="border border-t-0 border-border bg-[#0D0D0D] p-6 max-h-[60vh] overflow-y-auto"
      >
        <pre className="text-sm font-mono text-foreground whitespace-pre-wrap break-words">
          {result}
        </pre>
      </div>

      <div className="flex border-x border-border">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 h-3 border-b border-border"
            style={{
              clipPath: "polygon(0 0, 50% 100%, 100% 0)",
              background: i % 2 === 0 ? "transparent" : "var(--card)",
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="flex items-center justify-center gap-3 mt-6"
      >
        <button
          type="button"
          onClick={handleCopy}
          className={cn(
            "flex items-center gap-2 px-4 py-2 text-sm rounded-full border border-border",
            "hover:bg-card transition-colors"
          )}
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          {copied ? "Copied!" : "Copy"}
        </button>

        <button
          type="button"
          onClick={handleShare}
          className={cn(
            "flex items-center gap-2 px-4 py-2 text-sm rounded-full border border-border",
            "hover:bg-card transition-colors"
          )}
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>

        <button
          type="button"
          onClick={onNew}
          className={cn(
            "flex items-center gap-2 px-4 py-2 text-sm rounded-full",
            "bg-foreground text-background hover:opacity-90 transition-opacity"
          )}
        >
          <RefreshCw className="w-4 h-4" />
          Generate New
        </button>
      </motion.div>
    </motion.div>
  );
}
