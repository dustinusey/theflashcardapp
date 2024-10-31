"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiHome, FiMoon, FiSettings, FiSun } from "react-icons/fi";

export default function SettingsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.replace("/");
      }
    };

    checkUser();
  }, [router, supabase.auth]);

  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    }
    setIsDarkMode(!isDarkMode);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-zinc-50 dark:bg-zinc-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              <FiHome className="h-4 w-4" />
              Home
            </Link>
            <span>/</span>
            <span className="flex items-center gap-1 text-zinc-900 dark:text-white">
              <FiSettings className="h-4 w-4" />
              Settings
            </span>
          </div>

          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
              Settings
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400">
              Manage your account preferences and app settings
            </p>
          </div>

          {/* Settings Card */}
          <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700/50">
            <div className="p-6">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-6">
                Theme Preferences
              </h2>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-zinc-900 dark:text-white mb-1">
                    Dark Mode
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Toggle between light and dark themes
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isDarkMode}
                    onChange={toggleDarkMode}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-zinc-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-zinc-600 peer-checked:bg-blue-500"></div>
                  <span className="ml-3 text-sm font-medium text-zinc-900 dark:text-white">
                    {isDarkMode ? (
                      <FiMoon className="h-4 w-4" />
                    ) : (
                      <FiSun className="h-4 w-4" />
                    )}
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
