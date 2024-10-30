import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "../components/LoginForm";

export default async function LoginPage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If user is already logged in, redirect to home page
  if (session) {
    redirect("/");
  }

  return (
    <main>
      <LoginForm />
    </main>
  );
}
