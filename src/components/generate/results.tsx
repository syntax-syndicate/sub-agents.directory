"use client";

import { saveGeneration } from "@/actions/save-generation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Copy, RefreshCw, Save, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface GeneratedResultsProps {
  result: string;
  input: string;
  onNew: () => void;
}

export function GeneratedResults({ result, input, onNew }: GeneratedResultsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [savedSlug, setSavedSlug] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

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

  const handleSave = async () => {
    if (isSaving || savedSlug) return;

    setIsSaving(true);
    try {
      const { slug } = await saveGeneration(input, result);
      setSavedSlug(slug);
      toast.success("Saved! Your prompt is now shareable.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to save";
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = async () => {
    let slug = savedSlug;

    if (!slug) {
      setIsSaving(true);
      try {
        const res = await saveGeneration(input, result);
        slug = res.slug;
        setSavedSlug(slug);
        toast.success("Saved! Sharing your prompt...");
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to save";
        toast.error(message);
        setIsSaving(false);
        return;
      }
      setIsSaving(false);
    }

    const shareUrl = `https://sub-agents.directory/g/${slug}`;
    const text = encodeURIComponent(
      "Check out this sub-agent prompt I generated on Sub-Agents Directory!",
    );
    const url = encodeURIComponent(shareUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  };

  const handleCopyLink = async () => {
    if (!savedSlug) {
      toast.error("Save the prompt first to get a shareable link");
      return;
    }
    try {
      await navigator.clipboard.writeText(`https://sub-agents.directory/g/${savedSlug}`);
      toast.success("Link copied to clipboard!");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="border border-border p-4 bg-card">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Generated Sub-Agent Prompt</span>
          <div className="flex items-center gap-2">
            {savedSlug && (
              <button
                type="button"
                onClick={handleCopyLink}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                /g/{savedSlug}
              </button>
            )}
            <span className="text-xs text-muted-foreground">{new Date().toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="border border-t-0 border-border bg-[#0D0D0D] p-6 max-h-[50vh] overflow-y-auto custom-scrollbar"
      >
        <pre className="text-sm font-mono text-foreground whitespace-pre-wrap break-words leading-relaxed">
          {result}
        </pre>
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
            "hover:bg-card transition-colors",
          )}
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied!" : "Copy"}
        </button>

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving || !!savedSlug}
          className={cn(
            "flex items-center gap-2 px-4 py-2 text-sm rounded-full border border-border",
            "hover:bg-card transition-colors",
            savedSlug && "border-green-500/50 text-green-500",
          )}
        >
          {savedSlug ? <Check className="w-4 h-4 text-green-500" /> : <Save className="w-4 h-4" />}
          {isSaving ? "Saving..." : savedSlug ? "Saved" : "Save"}
        </button>

        <button
          type="button"
          onClick={handleShare}
          className={cn(
            "flex items-center gap-2 px-4 py-2 text-sm rounded-full border border-border",
            "hover:bg-card transition-colors",
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
            "bg-foreground text-background hover:opacity-90 transition-opacity",
          )}
        >
          <RefreshCw className="w-4 h-4" />
          Generate New
        </button>
      </motion.div>
    </motion.div>
  );
}
