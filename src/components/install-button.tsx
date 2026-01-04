"use client";

import { cn } from "@/lib/utils";
import { Check, Terminal } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function InstallButton({ slug, small }: { slug: string; small?: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const installUrl = `${window.location.origin}/api/install/${slug}`;
    const command = `curl -fsSL "${installUrl}" | bash`;

    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      toast("Install command copied! Paste in your terminal to install.");

      setTimeout(() => {
        setCopied(false);
      }, 1000);
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "text-xs bg-black text-white dark:bg-white dark:text-black rounded-full flex items-center justify-center",
        small ? "p-1.5 size-7" : "p-2 size-9",
      )}
      type="button"
      title="Copy install command"
      aria-label={copied ? "Copied" : "Copy install command"}
    >
      {copied ? (
        <Check className={small ? "w-3 h-3" : "w-4 h-4"} />
      ) : (
        <Terminal className={small ? "w-3 h-3" : "w-4 h-4"} />
      )}
    </button>
  );
}
