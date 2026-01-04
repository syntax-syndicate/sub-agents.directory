import { VideoListJsonLd } from "@/components/json-ld";
import { Menu } from "@/components/menu";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSections } from "@/data/rules";
import { videos } from "@/data/videos";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn Claude Code - Video Tutorials",
  description:
    "Watch Claude Code tutorials and learn how to use AI-assisted development. Videos from Anthropic, Kevin Stratvert, Net Ninja, and more.",
  alternates: {
    canonical: "/learn",
  },
  openGraph: {
    title: "Learn Claude Code - Video Tutorials",
    description:
      "Watch Claude Code tutorials and learn how to use AI-assisted development. Videos from Anthropic, Kevin Stratvert, Net Ninja, and more.",
    url: "/learn",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn Claude Code - Video Tutorials",
    description: "Watch Claude Code tutorials and learn how to use AI-assisted development.",
  },
};

export default function Page() {
  const sections = getSections();

  return (
    <>
      <VideoListJsonLd videos={videos} />
      <div className="flex w-full h-full">
        <div className="hidden md:flex mt-12 sticky top-12 h-[calc(100vh-3rem)] z-40">
          <Menu sections={sections} />
        </div>

        <main className="flex-1 p-6 pt-16">
          <h1 className="sr-only">Learn Claude Code - Video Tutorials</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 sm:grid-cols-1">
            {videos.map((video) => (
              <Card key={video.url}>
                <CardHeader>
                  <iframe
                    src={video.url}
                    width="100%"
                    height="auto"
                    className="aspect-video pb-4"
                    allowFullScreen
                    loading="lazy"
                    title={video.title}
                  />
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={video.author.image} className="size-6 rounded-full" />
                      <AvatarFallback className="size-6 rounded-full bg-accent flex items-center justify-center text-xs font-medium uppercase">
                        {video.author.name.charAt(0)}
                        {video.author.name.charAt(1)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-[#878787]">{video.author.name}</span>
                  </div>
                  <CardTitle className="text-md font-semibold font-mono pt-2">
                    {video.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-[#878787]">
                    {video.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
