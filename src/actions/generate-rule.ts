"use server";

import { createClient } from "@/utils/supabase/server";
import { checkRateLimit, RateLimitError } from "@/lib/rate-limit";
import { getModel, SYSTEM_PROMPT } from "@/lib/ai";
import { streamText } from "ai";

export async function generateRule(input: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to generate rules");
  }

  const rateLimitResult = await checkRateLimit(user.id);
  if (!rateLimitResult.success) {
    throw new RateLimitError(
      "Rate limit exceeded. Please wait before generating again.",
      rateLimitResult.reset,
    );
  }

  async function* streamResponse(): AsyncGenerator<string> {
    const result = streamText({
      model: getModel(),
      system: SYSTEM_PROMPT,
      prompt: `Create a Claude Code sub-agent prompt based on this project configuration:\n\n${input}`,
      temperature: 0.7,
      maxOutputTokens: 2000,
    });

    for await (const delta of result.textStream) {
      yield delta;
    }
  }

  return {
    stream: streamResponse(),
  };
}

export async function getSession() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { user };
}
