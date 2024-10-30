"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";

export default function AuthProvider({ children, serverSession }) {
  const [session, setSession] = useState(serverSession);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      router.refresh();
    });

    return () => subscription.unsubscribe();
  }, [router, supabase]);

  if (!session) {
    return <LoginForm />;
  }

  return children;
}
