import { ensureUserExists } from "@/actions/user";
import { getModel, SYSTEM_PROMPT } from "@/lib/ai";
import { checkRateLimit } from "@/lib/rate-limit";
import { createClient } from "@/utils/supabase/server";
import { streamText } from "ai";

export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  await ensureUserExists();

  const rateLimitResult = await checkRateLimit(user.id);
  if (!rateLimitResult.success) {
    return new Response(
      JSON.stringify({
        error: "Rate limit exceeded",
        reset: rateLimitResult.reset,
      }),
      { status: 429, headers: { "Content-Type": "application/json" } },
    );
  }

  const { input } = await req.json();

  const result = streamText({
    model: getModel(),
    system: SYSTEM_PROMPT,
    prompt: `Create a Claude Code sub-agent prompt based on this project configuration:\n\n${input}`,
    temperature: 0.7,
  });

  return result.toTextStreamResponse();
}
