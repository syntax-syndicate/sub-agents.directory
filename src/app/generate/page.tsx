import { Generate } from "@/components/generate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Generate Sub-Agent Prompts",
  description:
    "Generate custom Claude Code sub-agent prompts for your project by uploading your package.json, requirements.txt, or describing your tech stack.",
  openGraph: {
    title: "Generate Sub-Agent Prompts | Sub-Agents Directory",
    description:
      "Generate custom Claude Code sub-agent prompts for your project by uploading your package.json, requirements.txt, or describing your tech stack.",
    url: "https://sub-agents.directory/generate",
    images: [
      {
        url: "/cover-image.png",
        width: 1200,
        height: 630,
        alt: "Generate Sub-Agent Prompts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Generate Sub-Agent Prompts | Sub-Agents Directory",
    description:
      "Generate custom Claude Code sub-agent prompts for your project by uploading your package.json or describing your tech stack.",
    images: ["/cover-image.png"],
  },
};

export default function GeneratePage() {
  return <Generate />;
}
