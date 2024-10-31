"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiAward,
  FiHome,
  FiPlus,
  FiSettings,
  FiUser,
  FiZap,
} from "react-icons/fi";

export default function AuthenticatedLayout({ children }) {
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const supabase = createClientComponentClient();

  useEffect(() => {
    setMounted(true);
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    }
    getUser();
  }, [supabase.auth]);

  if (!mounted) return null;
  if (!user) return children;

  return (
    <div className="flex min-h-screen bg-zinc-100 dark:bg-zinc-900">
      {/* Side Navigation */}
      <div className="w-20 fixed h-screen  bg-zinc-100 dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800/50 z-30 backdrop-blur-xl">
        <div className="flex flex-col h-full py-3">
          {/* Main Navigation */}
          <nav className="space-y-1.5">
            <div className="px-3">
              {/* Home/Dashboard */}
              <Link
                href="/dashboard"
                className={`flex items-center justify-center p-2.5 rounded-2xl   w-full transition-colors ${
                  pathname === "/dashboard"
                    ? "text-zinc-900 dark:text-zinc-100  dark:bg-zinc-800/50 hover:bg-zic-400 bg-zinc-200"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-200 hover:bg-zic-400 hover:bg-zinc-200"
                }`}
                title="Dashboard"
              >
                <FiHome className="h-5 w-5" />
              </Link>
            </div>

            {/* Create Set */}
            <div className="px-3">
              <Link
                href="/new-flashcard-set"
                className={`flex items-center justify-center p-2.5 rounded-2xl   w-full transition-colors ${
                  pathname === "/new-flashcard-set"
                    ? "text-zinc-900 dark:text-zinc-100  dark:bg-zinc-800/50 hover:bg-zic-400 bg-zinc-200"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-200 hover:bg-zic-400 hover:bg-zinc-200"
                }`}
                title="Create Flashcard Set"
              >
                <FiPlus className="h-5 w-5" />
              </Link>
            </div>

            {/* Highscores */}
            <div className="px-3">
              <Link
                href="/highscores"
                className={`flex items-center justify-center p-2.5 rounded-2xl   w-full transition-colors ${
                  pathname === "/highscores"
                    ? "text-zinc-900 dark:text-zinc-100  dark:bg-zinc-800/50 hover:bg-zic-400 bg-zinc-200"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-200 hover:bg-zic-400 hover:bg-zinc-200"
                }`}
                title="Highscores"
              >
                <FiAward className="h-5 w-5" />
              </Link>
            </div>

            {/* Upgrade */}
            <div className="px-3">
              <Link
                href="/upgrade"
                className={`flex items-center justify-center p-2.5 rounded-2xl   w-full transition-colors ${
                  pathname === "/upgrade"
                    ? "text-zinc-900 dark:text-zinc-100  dark:bg-zinc-800/50 hover:bg-zic-400 bg-zinc-200"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-200 hover:bg-zic-400 hover:bg-zinc-200"
                }`}
                title="Upgrade"
              >
                <FiZap className="h-5 w-5" />
              </Link>
            </div>
          </nav>

          {/* Bottom Section - Profile & Settings */}
          <div className="mt-auto px-3 space-y-1.5 mb-3">
            {/* Settings */}
            <Link
              href="/settings"
              className={`flex items-center justify-center p-2.5 rounded-2xl   w-full transition-colors ${
                pathname === "/settings"
                  ? "text-zinc-900 dark:text-zinc-100  dark:bg-zinc-800/50 hover:bg-zic-400 bg-zinc-200"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-200 hover:bg-zic-400 hover:bg-zinc-200"
              }`}
              title="Settings"
            >
              <FiSettings className="h-5 w-5" />
            </Link>

            {/* Profile */}
            <Link
              href="/profile"
              className={`flex items-center justify-center p-2.5 rounded-2xl   w-full transition-colors ${
                pathname === "/profile"
                  ? "text-zinc-900 dark:text-zinc-100  dark:bg-zinc-800/50 hover:bg-zic-400 bg-zinc-200"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-200 hover:bg-zic-400 hover:bg-zinc-200"
              }`}
              title="Profile"
            >
              <FiUser className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-20 bg-zinc-50 dark:bg-zinc-900">{children}</div>
    </div>
  );
}
