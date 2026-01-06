import Link from "next/link";

interface GenerationCardProps {
  generation: {
    slug: string;
    content: string;
    title: string | null;
    createdAt: Date;
  };
}

export function GenerationCard({ generation }: GenerationCardProps) {
  const preview = generation.content.slice(0, 200);

  const extractName = () => {
    const match = generation.content.match(/^---[\s\S]*?name:\s*(.+)/m);
    return match ? match[1].trim() : null;
  };

  const title = generation.title || extractName() || "Untitled Prompt";

  return (
    <Link
      href={`/g/${generation.slug}`}
      className="block p-4 border border-border rounded-lg hover:bg-card/50 transition-colors"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium truncate">{title}</h3>
        <span className="text-xs text-muted-foreground">
          {new Date(generation.createdAt).toLocaleDateString()}
        </span>
      </div>
      <p className="text-sm text-[#878787] font-mono line-clamp-3">
        {preview}
        {generation.content.length > 200 && "..."}
      </p>
    </Link>
  );
}
