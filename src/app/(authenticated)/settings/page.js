"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  FiAlertTriangle,
  FiCheck,
  FiEdit2,
  FiMoon,
  FiStar,
  FiSun,
  FiTrash2,
  FiX,
  FiZap,
} from "react-icons/fi";

function ConfirmationModal({ isOpen, onClose, onConfirm, title, message }) {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  // Reset animation state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsAnimatingOut(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimatingOut(true);
    setTimeout(onClose, 150);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-150
      ${isAnimatingOut ? "opacity-0" : "opacity-100"}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-lg bg-white dark:bg-zinc-950 rounded-2xl shadow-2xl border border-zinc-300 dark:border-zinc-800 transition-all duration-150
          ${isAnimatingOut ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
      >
        <div className="flex flex-col divide-y divide-zinc-200 dark:divide-zinc-800/50">
          {/* Header */}
          <div className="px-6 py-5">
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
              {title}
            </h3>
          </div>

          {/* Content */}
          <div className="px-6 py-8">
            <p className="text-zinc-700 dark:text-zinc-200 text-base">
              {message}
            </p>
          </div>

          {/* Actions */}
          <div className="px-6 py-4 bg-zinc-100 dark:bg-black/40 rounded-b-2xl flex gap-3 justify-end">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setIsAnimatingOut(true);
                setTimeout(onConfirm, 200);
              }}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DangerousConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
}) {
  const [inputValue, setInputValue] = useState("");
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  // Reset animation state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsAnimatingOut(false);
      setInputValue(""); // Also reset input when modal opens
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimatingOut(true);
    setTimeout(onClose, 150);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/60 dark:bg-white/20 backdrop-blur-[2px] transition-opacity duration-200
          ${isAnimatingOut ? "animate-out fade-out" : "animate-in fade-in"}`}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-lg bg-white dark:bg-zinc-950 rounded-2xl shadow-2xl border border-zinc-300 dark:border-zinc-800 transition-all duration-200 origin-center
          ${
            isAnimatingOut
              ? "animate-out fade-out zoom-out-95 duration-200"
              : "animate-in fade-in zoom-in-95 duration-300"
          }`}
      >
        <div className="flex flex-col divide-y divide-zinc-200 dark:divide-zinc-800/50">
          {/* Header */}
          <div className="px-6 py-5 flex items-center gap-3">
            <div className="p-2 rounded-full bg-red-100 dark:bg-red-500/10">
              <FiAlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
              {title}
            </h3>
          </div>

          {/* Content */}
          <div className="px-6 py-8 space-y-6">
            <p className="text-zinc-700 dark:text-zinc-200 text-base">
              {message}
            </p>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
                Type{" "}
                <span className="font-mono text-red-600 dark:text-red-400 font-semibold">
                  {confirmText}
                </span>{" "}
                to confirm
              </label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full px-3 py-2 text-base rounded-lg border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-shadow"
                placeholder={`Type ${confirmText} to confirm`}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 py-4 bg-zinc-100 dark:bg-black/40 rounded-b-2xl flex gap-3 justify-end">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setIsAnimatingOut(true);
                setTimeout(onConfirm, 200);
              }}
              disabled={inputValue !== confirmText}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-red-600 dark:bg-red-500 text-white hover:bg-red-700 dark:hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState(null);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [username, setUsername] = useState("");
  const [originalUsername, setOriginalUsername] = useState("");
  const supabase = createClientComponentClient();
  const [activeSection, setActiveSection] = useState("appearance");
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
    type: "normal",
    confirmText: "",
  });

  useEffect(() => {
    setMounted(true);
    // Fetch user data
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        // First try to get username from user_metadata
        // If not found, try to get it from the GitHub identity
        const githubUsername = user.identities?.find(
          (identity) => identity.provider === "github"
        )?.identity_data?.preferred_username;

        const currentUsername =
          user.user_metadata?.username || githubUsername || "";

        setUser(user);
        setUsername(currentUsername);
        setOriginalUsername(currentUsername);
      }
    };
    getUser();
  }, [supabase.auth]);

  // Simplified scroll to section handler
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();

    // Update active state immediately
    setActiveSection(sectionId);

    // Scroll to section
    const element = document.getElementById(sectionId);
    const offset = 120;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + 200;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleUsernameUpdate = async () => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: { username: username },
      });
      if (error) throw error;
      setOriginalUsername(username);
      setIsEditingUsername(false);
    } catch (error) {
      console.error("Error updating username:", error);
      setUsername(originalUsername); // Reset to original on error
    }
  };

  const cancelUsernameEdit = () => {
    setUsername(originalUsername);
    setIsEditingUsername(false);
  };

  const handleReset = (type) => {
    const configs = {
      streak: {
        title: "Reset Streak",
        message:
          "Are you sure you want to reset your streak? This action cannot be undone.",
      },
      points: {
        title: "Reset Total Points",
        message:
          "Are you sure you want to reset your total points? This action cannot be undone.",
      },
      accuracy: {
        title: "Reset Accuracy",
        message:
          "Are you sure you want to reset your accuracy statistics? This action cannot be undone.",
      },
      unfinished: {
        title: "Reset Unfinished Decks",
        message:
          "Are you sure you want to reset all progress on unfinished decks? This action cannot be undone.",
      },
      mastered: {
        title: "Reset Mastered Decks",
        message:
          "Are you sure you want to remove all decks from your mastered list? This action cannot be undone.",
      },
    };

    setModalConfig({
      isOpen: true,
      ...configs[type],
      onConfirm: () => {
        // Handle the reset action here
        console.log(`Resetting ${type}`);
        setModalConfig((prev) => ({ ...prev, isOpen: false }));
      },
      type: "normal",
    });
  };

  const handleResetAll = () => {
    setModalConfig({
      isOpen: true,
      title: "Reset Everything",
      message:
        "This will reset ALL your progress. This action cannot be undone.",
      onConfirm: () => {
        // Handle the reset all action here
        console.log("Resetting everything");
        setModalConfig((prev) => ({ ...prev, isOpen: false }));
      },
      type: "dangerous",
      confirmText: "RESET",
    });
  };

  const handleDeleteAccount = () => {
    setModalConfig({
      isOpen: true,
      title: "Delete Account",
      message:
        "This will permanently delete your account and all associated data. This action cannot be undone.",
      onConfirm: () => {
        // Handle the account deletion here
        console.log("Deleting account");
        setModalConfig((prev) => ({ ...prev, isOpen: false }));
      },
      type: "dangerous",
      confirmText: "DELETE",
    });
  };

  if (!mounted) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-xl font-semibold text-zinc-900 dark:text-white mb-8">
        Settings
      </h1>

      <div className="space-y-12">
        <section
          id="appearance"
          className="space-y-6 bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/50 p-6"
        >
          <div>
            <h2 className="text-lg font-medium text-zinc-900 dark:text-white">
              Appearance
            </h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Customize how Flashcard AI looks on your device
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white/50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200/50 dark:border-zinc-700/50">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800">
                      {theme === "dark" ? (
                        <FiMoon className="h-5 w-5 text-zinc-500" />
                      ) : (
                        <FiSun className="h-5 w-5 text-zinc-500" />
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-zinc-900 dark:text-white">
                        Dark Mode
                      </div>
                      <div className="text-xs text-zinc-500">
                        {theme === "dark"
                          ? "Currently dark theme"
                          : "Currently light theme"}
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                        theme === "dark"
                          ? "bg-cyan-500"
                          : "bg-zinc-200 dark:bg-zinc-700"
                      }`}
                    >
                      <span
                        className={`${
                          theme === "dark" ? "translate-x-6" : "translate-x-1"
                        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="account"
          className="space-y-6 bg-white dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700/50 p-6"
        >
          <div>
            <h2 className="text-lg font-medium text-zinc-900 dark:text-white">
              Account
            </h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Manage your account information
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white/50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200/50 dark:border-zinc-700/50">
              <div className="divide-y divide-zinc-200/50 dark:divide-zinc-700/50">
                {/* Name */}
                <div className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400">
                        Name
                      </label>
                      <div className="mt-1 text-sm text-zinc-900 dark:text-white">
                        {user?.user_metadata?.full_name || "Not set"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Username */}
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400">
                        Username
                      </label>
                      {isEditingUsername ? (
                        <div className="mt-1 flex items-center gap-2">
                          <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="px-2 py-1 text-sm rounded-md border border-zinc-200/50 dark:border-zinc-700/50 bg-white/50 dark:bg-zinc-800/50 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                          />
                          <button
                            onClick={handleUsernameUpdate}
                            className="p-1 text-cyan-500 hover:text-cyan-600"
                          >
                            <FiCheck className="h-4 w-4" />
                          </button>
                          <button
                            onClick={cancelUsernameEdit}
                            className="p-1 text-zinc-500 hover:text-zinc-600"
                          >
                            <FiX className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-sm text-zinc-900 dark:text-white">
                            {username || "Not set"}
                          </span>
                          <button
                            onClick={() => setIsEditingUsername(true)}
                            className="p-1 text-zinc-500 hover:text-zinc-600"
                          >
                            <FiEdit2 className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400">
                        Email
                      </label>
                      <div className="mt-1 text-sm text-zinc-900 dark:text-white">
                        {user?.email || "Not set"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="subscription" className="space-y-6">
          <div>
            <h2 className="text-lg font-medium text-zinc-900 dark:text-white">
              Subscription
            </h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Manage your subscription and billing
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Free Tier */}
            <div className="rounded-3xl border border-zinc-200/50 dark:border-zinc-700/50 p-8 bg-white/50 dark:bg-zinc-800/50 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-1">
                    Free
                  </h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Get started with the basics
                  </p>
                </div>
                <span className="text-2xl font-semibold text-zinc-900 dark:text-white">
                  $0
                </span>
              </div>

              <div className="space-y-4 flex-1">
                {[
                  "Up to 5 flashcard decks",
                  "Basic statistics",
                  "Community sharing",
                  "Standard spaced repetition",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <FiCheck className="h-5 w-5 text-cyan-500" />
                    <span className="text-zinc-600 dark:text-zinc-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <button
                disabled
                className="w-full mt-8 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-zinc-600 dark:text-zinc-400  transition-colors font-medium"
              >
                Current Plan
              </button>
            </div>

            {/* Pro Tier */}
            <div className="rounded-3xl border border-cyan-500/20 p-8 bg-white/50 dark:bg-zinc-800/50 relative flex flex-col">
              <div className="absolute -top-3 left-4">
                <div className="px-3 py-1 rounded-full bg-white dark:bg-zinc-900 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-sm font-medium flex items-center gap-1 shadow-sm">
                  <FiStar className="h-4 w-4" />
                  Recommended
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-1">
                    Pro
                  </h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    For serious learners
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-semibold text-zinc-900 dark:text-cyan-500">
                    $9
                  </span>
                  <span className="text-zinc-500 dark:text-zinc-400 text-sm">
                    /month
                  </span>
                </div>
              </div>

              <div className="space-y-4 flex-1">
                {[
                  "Everything in Free, plus:",
                  "Unlimited flashcard decks",
                  "Advanced analytics & insights",
                  "AI-powered learning suggestions",
                  "Custom study schedules",
                  "Priority support",
                  "Offline access",
                  "Export & backup options",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <FiCheck className="h-5 w-5 text-cyan-500" />
                    <span className="text-zinc-600 dark:text-zinc-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/upgrade"
                className="w-full mt-8 flex items-center justify-center gap-2 bg-cyan-500 text-white dark:text-white px-6 py-3 rounded-xl  hover:bg-cyan-600 transition-colors font-medium"
              >
                <FiZap className="h-5 w-5" />
                Upgrade to Pro
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-3 bg-white/50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200/50 dark:border-zinc-700/50">
            <div className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
            <span className="text-sm text-zinc-500">
              View detailed plan comparison and FAQ on the{" "}
              <Link href="/upgrade" className="text-cyan-500 hover:underline">
                upgrade page
              </Link>
            </span>
          </div>
        </section>

        <section id="danger" className="space-y-6">
          <div>
            <h2 className="text-lg font-medium text-zinc-900 dark:text-white">
              Danger Zone
            </h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Reset your progress and data
            </p>
          </div>

          <div className="space-y-4 rounded-xl border border-zinc-200 dark:border-zinc-700/50 p-6 bg-white dark:bg-zinc-800/50">
            <div className="space-y-6">
              {[
                {
                  id: "streak",
                  label: "Reset Streak",
                  description: "This will reset your current streak to 0",
                },
                {
                  id: "points",
                  label: "Reset Total Points",
                  description: "This will reset your total points to 0",
                },
                {
                  id: "accuracy",
                  label: "Reset Accuracy",
                  description: "This will reset your accuracy statistics",
                },
                {
                  id: "unfinished",
                  label: "Reset Unfinished Decks",
                  description:
                    "This will reset progress on all unfinished decks",
                },
                {
                  id: "mastered",
                  label: "Reset Mastered Decks",
                  description:
                    "This will remove all decks from your mastered list",
                },
              ].map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-3"
                >
                  <div>
                    <div className="font-medium text-zinc-900 dark:text-white">
                      {item.label}
                    </div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">
                      {item.description}
                    </div>
                  </div>
                  <button
                    onClick={() => handleReset(item.id)}
                    className="px-4 py-2 text-sm font-medium rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors border border-zinc-200 dark:border-zinc-700"
                  >
                    Reset
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-6 space-y-6 border-t border-zinc-200 dark:border-zinc-700/50">
              <div className="p-4 rounded-lg bg-red-50 dark:bg-red-500/5 border border-red-200 dark:border-red-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-zinc-900 dark:text-white">
                      Reset Everything
                    </div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
                      This will reset all your progress and data
                    </div>
                  </div>
                  <button
                    onClick={() => handleResetAll()}
                    className="px-4 py-2 text-sm font-medium rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                  >
                    Reset All
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-red-50 dark:bg-red-500/5 border border-red-200 dark:border-red-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-zinc-900 dark:text-white">
                      Delete Account
                    </div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
                      Permanently delete your account and all associated data
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteAccount()}
                    className="px-4 py-2 text-sm font-medium rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <ConfirmationModal
        isOpen={modalConfig.isOpen && modalConfig.type === "normal"}
        onClose={() => setModalConfig((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={modalConfig.onConfirm}
        title={modalConfig.title}
        message={modalConfig.message}
      />

      <DangerousConfirmationModal
        isOpen={modalConfig.isOpen && modalConfig.type === "dangerous"}
        onClose={() => setModalConfig((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={modalConfig.onConfirm}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
      />
    </div>
  );
}

// Throttle function
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
