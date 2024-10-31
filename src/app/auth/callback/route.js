import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    // Exchange code for session
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.exchangeCodeForSession(code);

    if (!sessionError && session) {
      // Check if user already exists in leaderboard
      const { data: existingEntry } = await supabase
        .from("leaderboards")
        .select("id")
        .eq("user_id", session.user.id)
        .single();

      // If no entry exists, create one
      if (!existingEntry) {
        const { error: insertError } = await supabase
          .from("leaderboards")
          .insert({
            user_id: session.user.id,
            username:
              session.user.user_metadata.preferred_username ||
              session.user.email,
            avatar_url: session.user.user_metadata.avatar_url,
            total_games: 0,
            games_won: 0,
            total_points: 0,
            average_score: 0,
          });

        if (insertError) {
          console.error("Error creating leaderboard entry:", insertError);
        }
      }
    }
  }

  // Redirect to the dashboard
  return NextResponse.redirect(new URL("/dashboard", request.url));
}
