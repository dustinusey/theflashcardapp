"use client";
import ThemeToggle from "@/components/theme-toggle";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiAlertTriangle,
  FiHome,
  FiMoon,
  FiSettings,
  FiSun,
  FiTrash2,
  FiX,
} from "react-icons/fi";

export default function SettingsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [showModal, setShowModal] = useState(false);
  const [showMasterConfirm, setShowMasterConfirm] = useState(false);
  const [resetType, setResetType] = useState(null);

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

  const resetOptions = [
    {
      id: "learning",
      title: "Reset Continued Learning",
      description:
        "Clear all progress on decks you haven't completed. This will reset your progress to 0% on all in-progress decks.",
      warning:
        "This will remove all progress from decks you haven't mastered yet.",
    },
    {
      id: "mastered",
      title: "Reset Mastered Decks",
      description:
        "Remove mastered status from all completed decks. These decks will return to your continued learning section.",
      warning: "This will remove completion status from all mastered decks.",
    },
    {
      id: "streak",
      title: "Reset Streak",
      description:
        "Reset your current study streak to zero. This includes your best streak record.",
      warning: "This will erase your current and best streak records.",
    },
    {
      id: "points",
      title: "Reset Total Points",
      description:
        "Set your total points back to zero. This will affect your ranking on the leaderboard.",
      warning: "This will remove all points you've earned.",
    },
  ];

  const handleReset = async (type) => {
    // Add your reset logic here based on type
    switch (type) {
      case "learning":
        // Reset continued learning decks
        break;
      case "mastered":
        // Reset mastered decks
        break;
      case "streak":
        // Reset streak
        break;
      case "points":
        // Reset points
        break;
      case "master":
        // Reset everything
        break;
    }
    setShowModal(false);
    setShowMasterConfirm(false);
  };

  if (!mounted) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-8">
        Settings
      </h1>

      <div className="space-y-16">
        {/* Appearance Section */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200 dark:border-zinc-800 pb-2">
            <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
              Appearance
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Customize how DevDecks looks on your device
            </p>
          </div>

          <div className="pl-1">
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-700/50 bg-white/50 dark:bg-zinc-800/50 hover:bg-white dark:hover:bg-zinc-800 transition-colors">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                    Dark Mode
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Toggle between light and dark themes
                  </p>
                </div>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </section>

        {/* Reset Options Section */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200 dark:border-zinc-800 pb-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                  Reset Options
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  Clear your progress and start fresh
                </p>
              </div>
              <span className="text-sm text-red-500 dark:text-red-400">
                All resets are permanent
              </span>
            </div>
          </div>

          <div className="pl-1 space-y-6">
            {/* Grouped Reset Options */}
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-700/50 bg-white/50 dark:bg-zinc-800/50 divide-y divide-zinc-200 dark:divide-zinc-700/50">
              {resetOptions.map((option, index) => (
                <div
                  key={option.id}
                  className={`p-4 ${index === 0 ? "rounded-t-xl" : ""} ${
                    index === resetOptions.length - 1 ? "rounded-b-xl" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                        {option.title}
                      </h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {option.description}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setResetType(option);
                        setShowModal(true);
                      }}
                      className="ml-8 px-3 py-2 text-sm text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Master Reset Card - Separated */}
            <div className="p-4 rounded-xl border border-red-200 dark:border-red-800/50 bg-red-50/50 dark:bg-red-900/20 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-red-900 dark:text-red-400">
                    Master Reset
                  </h3>
                  <p className="text-sm text-red-600 dark:text-red-500">
                    Reset everything to default. This will erase all your
                    progress, stats, and achievements.
                  </p>
                </div>
                <button
                  onClick={() => setShowMasterConfirm(true)}
                  className="ml-8 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                >
                  Reset All
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Account Section (if needed) */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200 dark:border-zinc-800 pb-2">
            <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
              Account
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Manage your account settings and preferences
            </p>
          </div>

          <div className="pl-1">{/* Account settings content */}</div>
        </section>
      </div>

      {/* Regular Reset Confirmation Modal */}
      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
          onClick={() => setShowModal(false)}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
            style={{
              opacity: showModal ? 1 : 0,
            }}
          />

          {/* Modal Content */}
          <div
            className="relative bg-white dark:bg-zinc-900 rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl transform transition-all duration-300 ease-out"
            style={{
              opacity: showModal ? 1 : 0,
              transform: showModal
                ? "scale(1) translateY(0)"
                : "scale(0.95) translateY(-10px)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                Confirm Reset
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-500">
              <FiAlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <p className="text-sm">{resetType?.warning}</p>
            </div>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReset(resetType?.id)}
                className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Master Reset Confirmation Modal */}
      {showMasterConfirm && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
          onClick={() => setShowMasterConfirm(false)}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
            style={{
              opacity: showMasterConfirm ? 1 : 0,
            }}
          />

          {/* Modal Content */}
          <div
            className="relative bg-white dark:bg-zinc-900 rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl transform transition-all duration-300 ease-out"
            style={{
              opacity: showMasterConfirm ? 1 : 0,
              transform: showMasterConfirm
                ? "scale(1) translateY(0)"
                : "scale(0.95) translateY(-10px)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                Master Reset
              </h3>
              <button
                onClick={() => setShowMasterConfirm(false)}
                className="p-2 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-500">
                <FiAlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div className="space-y-2">
                  <p className="text-sm font-medium">
                    This action cannot be undone
                  </p>
                  <p className="text-sm">
                    This will permanently erase all your progress
                  </p>
                  <ul className="text-sm list-disc ml-4 space-y-1">
                    <li>Learning progress</li>
                    <li>Mastered decks</li>
                    <li>Study streak</li>
                    <li>Total points</li>
                    <li>Achievement records</li>
                  </ul>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-500">
                <p className="text-sm">
                  Type <strong>RESET ALL</strong> to confirm
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowMasterConfirm(false)}
                className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReset("master")}
                className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
