"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  FiAward,
  FiBookmark,
  FiChevronDown,
  FiLogOut,
  FiSearch,
  FiSettings,
  FiUser,
  FiZap,
} from "react-icons/fi";

export default function Header() {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, [supabase.auth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const UserAvatar = () => {
    if (!user) return null;

    if (user.user_metadata?.avatar_url) {
      return (
        <Image
          src={user.user_metadata.avatar_url}
          alt="Profile"
          width={32}
          height={32}
          className="rounded-full w-8 h-8 object-cover"
        />
      );
    }

    return (
      <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-medium">
        {user.email?.[0].toUpperCase() || "U"}
      </div>
    );
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* App Logo and Title */}
          <div className="flex items-center">
            <div className="w-[78px] px-3">
              <Link
                href="/dashboard"
                className="flex items-center justify-center p-3.5 rounded-2xl text-white bg-indigo-500 hover:bg-indigo-600 transition-colors"
              >
                <FiZap className="h-5 w-5" />
              </Link>
            </div>
            <div className="flex items-center pl-1">
              <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                The Flashcard App
              </span>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 px-4">
            <button className="p-2 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <FiBookmark className="h-5 w-5" />
            </button>
            <button className="p-2 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <FiAward className="h-5 w-5" />
            </button>

            {/* User Dropdown */}
            {user && (
              <div className="relative ml-2">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  <UserAvatar />
                  <FiChevronDown className="h-4 w-4" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-lg overflow-hidden">
                    <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-700">
                      <div className="flex items-center gap-3">
                        <UserAvatar />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">
                            {user.user_metadata?.name || user.email}
                          </p>
                          {user.user_metadata?.name && (
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                              {user.email}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg transition-colors"
                      >
                        <FiUser className="h-4 w-4" />
                        Profile
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg transition-colors"
                      >
                        <FiSettings className="h-4 w-4" />
                        Settings
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg transition-colors"
                      >
                        <FiLogOut className="h-4 w-4" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}