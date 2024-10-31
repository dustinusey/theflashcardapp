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
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800/50 z-40"></header>

      {/* Side Navigation */}
      <div className="w-20 fixed h-screen bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800/50 z-30 backdrop-blur-xl">
        <div className="flex flex-col h-full pt-6">
          {/* Main Navigation */}
          <nav className="space-y-4 px-3">
            {/* Home/Dashboard */}
            <Link
              href="/dashboard"
              className={`flex items-center justify-center p-3.5 rounded-2xl text-sm transition-colors
                ${
                  pathname === "/dashboard"
                    ? "text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800/50"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              title="Dashboard"
            >
              <FiHome className="h-5 w-5" />
            </Link>

            {/* Create Set */}
            <Link
              href="/new-flashcard-set"
              className={`flex items-center justify-center p-3.5 rounded-full transition-colors
                ${
                  pathname === "/new-flashcard-set"
                    ? "text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800/50"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              title="Create Flashcard Set"
            >
              <FiPlus className="h-5 w-5" />
            </Link>

            {/* Highscores */}
            <Link
              href="/highscores"
              className={`flex items-center justify-center p-3.5 rounded-full transition-colors
                ${
                  pathname === "/highscores"
                    ? "text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800/50"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              title="Highscores"
            >
              <FiAward className="h-5 w-5" />
            </Link>

            {/* Upgrade */}
            <Link
              href="/upgrade"
              className={`flex items-center justify-center p-3.5 rounded-full transition-colors
                ${
                  pathname === "/upgrade"
                    ? "text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800/50"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              title="Upgrade"
            >
              <FiZap className="h-5 w-5" />
            </Link>
          </nav>

          {/* Bottom Section - Profile & Settings */}
          <div className="mt-auto px-3 space-y-4 mb-8">
            {/* Settings */}
            <Link
              href="/settings"
              className={`flex items-center justify-center p-3.5 rounded-full transition-colors
                ${
                  pathname === "/settings"
                    ? "text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800/50"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              title="Settings"
            >
              <FiSettings className="h-5 w-5" />
            </Link>

            {/* Profile */}
            <Link
              href="/profile"
              className={`flex items-center justify-center p-3.5 rounded-full transition-colors
                ${
                  pathname === "/profile"
                    ? "text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800/50"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
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
