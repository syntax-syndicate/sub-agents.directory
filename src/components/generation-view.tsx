"use client";

import { CopyButton } from "@/components/copy-button";
import { DownloadButton } from "@/components/download-button";
import { OpenInDropdown } from "@/components/open-in-dropdown";
import { ShareButton } from "@/components/share-button";
import Image from "next/image";
import Link from "next/link";

interface GenerationViewProps {
  generation: {
    slug: string;
    content: string;
    createdAt: Date;
    user: {
      name: string | null;
      username: string;
      avatarUrl: string | null;
    };
  };
}

export function GenerationView({ generation }: GenerationViewProps) {
  const extractName = () => {
    const match = generation.content.match(/^---[\s\S]*?name:\s*(.+)/m);
    return match ? match[1].trim() : null;
  };

  const title = extractName() || "Generated Sub-Agent Prompt";

  return (
    <div className="w-full">
      <div className="bg-background border border-border p-4">
        <div className="bg-card font-mono p-4 pr-1 text-sm relative group">
          <div className="group-hover:flex hidden right-4 bottom-4 absolute z-10 space-x-2">
            <OpenInDropdown content={generation.content} />
            <ShareButton slug={`g/${generation.slug}`} />
            <CopyButton content={generation.content} />
            <DownloadButton content={generation.content} filename={generation.slug} />
          </div>

          <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
            <code className="text-sm block pr-3 whitespace-pre-wrap">{generation.content}</code>
          </div>
        </div>

        <div className="pt-4 space-y-1">
          <h1 className="text-sm font-medium">{title}</h1>
          <span className="text-xs text-[#878787] font-mono">/g/{generation.slug}</span>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-dashed border-[#2C2C2C]">
        <Link href={`/u/${generation.user.username}`} className="flex items-center gap-3 group">
          {generation.user.avatarUrl ? (
            <Image
              src={generation.user.avatarUrl}
              alt={generation.user.name || generation.user.username}
              width={40}
              height={40}
              className="rounded-sm grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          ) : (
            <div className="w-10 h-10 rounded-sm bg-muted flex items-center justify-center text-sm font-mono">
              {(generation.user.name || generation.user.username)[0].toUpperCase()}
            </div>
          )}
          <div>
            <span className="text-sm font-medium group-hover:underline">
              {generation.user.name || generation.user.username}
            </span>
            <p className="text-xs text-[#878787]">
              {new Date(generation.createdAt).toLocaleDateString()}
            </p>
          </div>
        </Link>
      </div>

      <div className="mt-8">
        <Link
          href="/generate"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-foreground text-background hover:opacity-90 transition-opacity"
        >
          Generate Your Own
        </Link>
      </div>
    </div>
  );
}
