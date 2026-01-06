import { getGenerationBySlug } from "@/actions/save-generation";
import { GenerationView } from "@/components/generation-view";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const generation = await getGenerationBySlug(slug);

  if (!generation) {
    return {
      title: "Generation Not Found",
    };
  }

  const title = generation.title || "Generated Sub-Agent Prompt";
  const description = generation.content.slice(0, 160);

  return {
    title: `${title} | Sub-Agents Directory`,
    description,
    openGraph: {
      title: `${title} | Sub-Agents Directory`,
      description,
      url: `https://sub-agents.directory/g/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Sub-Agents Directory`,
      description,
    },
  };
}

export default async function GenerationPage({ params }: { params: Params }) {
  const { slug } = await params;
  const generation = await getGenerationBySlug(slug);

  if (!generation) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-6 md:mt-28 mt-14 pb-24">
      <GenerationView generation={generation} />
    </div>
  );
}
