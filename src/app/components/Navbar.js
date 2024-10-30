"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
    }

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <Link href="/">The Flashcard App</Link>
          <div className="flex items-center gap-4">
            {user && (
              <>
                <Link href="/settings">Settings</Link>
                {user.user_metadata?.avatar_url && (
                  <div className="flex items-center gap-2">
                    <span>
                      {user.user_metadata.preferred_username || user.email}
                    </span>
                    <Image
                      src={user.user_metadata.avatar_url}
                      alt="User avatar"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
