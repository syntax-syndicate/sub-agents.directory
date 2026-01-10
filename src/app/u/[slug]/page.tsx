import { getUserByUsername, getUserGenerations } from "@/actions/user";
import { GenerationCard } from "@/components/generation-card";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const user = await getUserByUsername(slug);

  if (!user) {
    return {
      title: "User Not Found",
    };
  }

  const name = user.name || user.username;

  return {
    title: `${name}'s Profile | Sub-Agents Directory`,
    description: `View ${name}'s generated Claude Code sub-agent prompts.`,
    openGraph: {
      title: `${name}'s Profile | Sub-Agents Directory`,
      description: `View ${name}'s generated Claude Code sub-agent prompts.`,
      url: `https://sub-agents.directory/u/${slug}`,
    },
  };
}

export default async function UserProfilePage({ params }: { params: Params }) {
  const { slug } = await params;
  const user = await getUserByUsername(slug);

  if (!user) {
    notFound();
  }

  const { generations } = await getUserGenerations(user.id, 1, 24);

  return (
    <div className="flex mx-auto max-w-4xl min-h-screen w-full md:mt-28 mt-14 px-6 lg:px-0">
      <div className="w-full">
        <div
          className="w-full h-[145px] mb-8"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -60deg,
              transparent,
              transparent 1px,
              #2C2C2C 1px,
              #2C2C2C 2px,
              transparent 2px,
              transparent 6px
            )`,
          }}
        />

        <div className="flex items-center gap-4 mb-12">
          {user.avatarUrl ? (
            <Image
              src={user.avatarUrl}
              alt={user.name || user.username}
              width={96}
              height={96}
              className="border border-border"
            />
          ) : (
            <div className="size-24 border border-border bg-muted flex items-center justify-center text-2xl font-mono">
              {(user.name || user.username)[0].toUpperCase()}
            </div>
          )}
          <div className="flex flex-col">
            <h1 className="text-xl font-mono">{user.name || user.username}</h1>
            <span className="text-sm font-mono text-[#878787]">@{user.username}</span>
            <div className="flex gap-6 mt-2">
              <span className="text-xs font-mono text-[#878787]">
                {user._count.generations} {user._count.generations === 1 ? "Prompt" : "Prompts"}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <h2 className="text-sm font-mono text-[#878787] mb-6">Prompts</h2>

          {generations.length === 0 ? (
            <p className="text-sm text-[#878787]">No prompts generated yet</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {generations.map((generation) => (
                <GenerationCard key={generation.id} generation={generation} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
