import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");

    if (code) {
      const supabase = createRouteHandlerClient({ cookies });

      // Exchange the code for a session
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("Auth error:", error);
        return NextResponse.redirect(new URL("/login", requestUrl.origin));
      }
    }

    // Successful authentication, redirect to dashboard
    return NextResponse.redirect(new URL("/dashboard", requestUrl.origin));
  } catch (error) {
    console.error("Callback error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
