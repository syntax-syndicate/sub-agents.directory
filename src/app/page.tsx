import { GlobalSearch } from "@/components/global-search";
import { getSections } from "@/data/rules";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Windsurf Directory - Windsurf Rules & MCP Servers",
  description:
    "Enhance your Windsurf with custom rules, find MCP servers, and join a community of Windsurf enthusiasts.",
};

export default function Page() {
  const sections = getSections();

  return (
    <div className="flex justify-center min-h-screen w-full px-2 mt-[10%]">
      <div className="w-full max-w-6xl">
        <GlobalSearch sections={sections} />
      </div>
    </div>
  );
}
