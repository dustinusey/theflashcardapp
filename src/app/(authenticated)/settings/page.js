"use client";
import ThemeToggle from "@/components/theme-toggle";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiAlertTriangle,
  FiCheck,
  FiHome,
  FiMoon,
  FiSettings,
  FiSun,
  FiTrash2,
  FiX,
} from "react-icons/fi";

// Add these plan constants
const PLANS = {
  FREE: {
    name: "Free",
    features: ["5 decks", "Basic statistics", "Standard support"],
  },
  PRO: {
    name: "Pro",
    features: [
      "Unlimited decks",
      "Advanced analytics",
      "Priority support",
      "Custom deck themes",
      "AI-powered study insights",
    ],
    price: "$9/month",
  },
};

export default function SettingsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [showModal, setShowModal] = useState(false);
  const [showMasterConfirm, setShowMasterConfirm] = useState(false);
  const [resetType, setResetType] = useState(null);
  const [currentPlan, setCurrentPlan] = useState("FREE"); // Replace with actual user plan
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [username, setUsername] = useState("");
  const [isSaving, setIsSaving] = useState(false);

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

  useEffect(() => {
    async function getUser() {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error) throw error;
        setUser(user);
        // You could also fetch the user's plan here
        // setCurrentPlan(user.plan || 'FREE');
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    }

    getUser();
  }, []);

  useEffect(() => {
    if (
      user?.user_metadata?.user_name ||
      user?.user_metadata?.preferred_username
    ) {
      setUsername(
        user.user_metadata.preferred_username || user.user_metadata.user_name
      );
    }
  }, [user]);

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

  const handleDeleteAccount = async () => {
    // Add your delete account logic here
    // This is a placeholder and should be replaced with actual delete account functionality
    console.log("Account deleted");
    setShowDeleteConfirm(false);
  };

  const handleUsernameUpdate = async () => {
    try {
      setIsSaving(true);
      const { data, error } = await supabase.auth.updateUser({
        data: { preferred_username: username },
      });

      if (error) throw error;
      setIsEditingUsername(false);
    } catch (error) {
      console.error("Error updating username:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
          <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded"></div>
        </div>
      </div>
    );
  }

  if (!mounted) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 pt-28 pb-20">
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

        {/* Account Section */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200 dark:border-zinc-800 pb-2">
            <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
              Account
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Manage your account settings and subscription
            </p>
          </div>

          <div className="pl-1 space-y-6">
            {/* Account Info */}
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-700/50 bg-white/50 dark:bg-zinc-800/50 p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                      Account Details
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-200 dark:border-zinc-700/50">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <label
                        htmlFor="username"
                        className="text-sm text-zinc-500 dark:text-zinc-400"
                      >
                        Username
                      </label>
                      {isEditingUsername ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="px-2 py-1 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 focus:border-transparent"
                            placeholder="Enter username"
                          />
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setIsEditingUsername(false)}
                              className="text-sm text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleUsernameUpdate}
                              disabled={isSaving}
                              className="px-3 py-1 text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isSaving ? "Saving..." : "Save"}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-4">
                          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                            {username || "No username set"}
                          </p>
                          <button
                            onClick={() => setIsEditingUsername(true)}
                            className="text-sm text-cyan-500 hover:text-cyan-600 dark:text-cyan-400 dark:hover:text-cyan-300"
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-200 dark:border-zinc-700/50">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        GitHub Account
                      </p>
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                        {user?.user_metadata?.user_name || "Not connected"}
                      </p>
                    </div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
                      Connected
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subscription Plan */}
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-700/50 bg-white/50 dark:bg-zinc-800/50 p-4">
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                      Subscription Plan
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      You are currently on the {PLANS[currentPlan].name} plan
                    </p>
                  </div>
                  {currentPlan === "PRO" && (
                    <span className="px-2.5 py-0.5 text-xs font-medium bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400 rounded-full">
                      PRO
                    </span>
                  )}
                </div>

                {/* Plan Details */}
                <div className="flex gap-4">
                  {/* Free Plan */}
                  <div
                    className={`flex-1 rounded-lg border ${
                      currentPlan === "FREE"
                        ? "border-cyan-500 dark:border-cyan-500/30"
                        : "border-zinc-200 dark:border-zinc-700/50"
                    } p-4`}
                  >
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                          Free Plan
                        </h4>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                          Basic features for getting started
                        </p>
                      </div>
                      <div className="space-y-2">
                        {PLANS.FREE.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                          >
                            <FiCheck className="h-4 w-4 text-cyan-500" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pro Plan */}
                  <div
                    className={`flex-1 rounded-lg border ${
                      currentPlan === "PRO"
                        ? "border-cyan-500 dark:border-cyan-500/30"
                        : "border-zinc-200 dark:border-zinc-700/50"
                    } p-4`}
                  >
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                            Pro Plan
                          </h4>
                          <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400">
                            {PLANS.PRO.price}
                          </p>
                        </div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                          Advanced features for power users
                        </p>
                      </div>
                      <div className="space-y-2">
                        {PLANS.PRO.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                          >
                            <FiCheck
                              className={`h-4 w-4 ${
                                PLANS.FREE.features.includes(feature)
                                  ? "text-cyan-500"
                                  : "text-cyan-500"
                              }`}
                            />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end pt-2">
                  {currentPlan === "FREE" ? (
                    <button className="px-4 py-2 text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-700 rounded-lg transition-colors">
                      Upgrade to Pro
                    </button>
                  ) : (
                    <div className="space-x-3">
                      <button className="px-4 py-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors">
                        Cancel Subscription
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-700 rounded-lg transition-colors">
                        Manage Billing
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Danger Zone Section */}
        <section className="space-y-6">
          <div className="border-b border-red-200 dark:border-red-800/50 pb-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-red-600 dark:text-red-500">
                  Danger Zone
                </h2>
                <p className="text-sm text-red-500 dark:text-red-400 mt-1">
                  Irreversible actions that affect your account and data
                </p>
              </div>
              <FiAlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400" />
            </div>
          </div>

          <div className="pl-1 space-y-6">
            {/* Reset Options Group */}
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

            {/* Account Deletion */}
            <div className="p-4 rounded-xl border border-red-200 dark:border-red-800/50 bg-red-50/50 dark:bg-red-900/20 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-red-900 dark:text-red-400">
                    Delete Account
                  </h3>
                  <p className="text-sm text-red-600 dark:text-red-500">
                    Permanently delete your account and all associated data.
                    This action cannot be undone.
                  </p>
                </div>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="ml-8 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                >
                  Delete Account
                </button>
              </div>
            </div>

            {/* Master Reset */}
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

      {showDeleteConfirm && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
          onClick={() => setShowDeleteConfirm(false)}
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
            style={{
              opacity: showDeleteConfirm ? 1 : 0,
            }}
          />

          <div
            className="relative bg-white dark:bg-zinc-900 rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl transform transition-all duration-300 ease-out"
            style={{
              opacity: showDeleteConfirm ? 1 : 0,
              transform: showDeleteConfirm
                ? "scale(1) translateY(0)"
                : "scale(0.95) translateY(-10px)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                Delete Account
              </h3>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="p-2 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-500">
              <FiAlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <p className="text-sm">
                This will permanently delete your account and all associated
                data. This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteAccount()}
                className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
