"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { FaGithub } from "react-icons/fa";
import {
  FiInfo,
  FiShare2,
  FiTrendingUp,
  FiUsers,
  FiX,
  FiZap,
} from "react-icons/fi";
import Dots from "./Dots";

export default function LoginForm() {
  const supabase = createClientComponentClient();
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Clear any stale auth states on mount
  useEffect(() => {
    localStorage.removeItem("isAuthenticating");
    setIsAuthenticating(false);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const checkAuthStatus = () => {
      const authenticating =
        localStorage.getItem("isAuthenticating") === "true";
      setIsAuthenticating(authenticating);
    };

    checkAuthStatus();
    window.addEventListener("storage", checkAuthStatus);

    return () => {
      window.removeEventListener("storage", checkAuthStatus);
    };
  }, []);

  const handleGitHubLogin = async () => {
    try {
      setIsLoading(true);
      setIsAuthenticating(true);
      localStorage.setItem("isAuthenticating", "true");
      setError(null);

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
      setIsLoading(false);
      setIsAuthenticating(false);
      localStorage.removeItem("isAuthenticating");
    }
  };

  const showLoading = isLoading || isAuthenticating;

  return (
    <div className="relative min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-cyan-50 via-zinc-50 to-cyan-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-cyan-950">
      <Dots />

      <div className="w-full max-w-sm relative z-10">
        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700/50 p-8 animate-in fade-in slide-in-from-bottom-8 duration-500 fill-mode-forwards">
          <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
              Welcome back
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Sign in to continue to your dashboard
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 text-sm rounded-xl animate-in fade-in slide-in-from-right-4 duration-300">
              {error}
            </div>
          )}

          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
            <button
              onClick={handleGitHubLogin}
              disabled={showLoading}
              className="w-full flex items-center justify-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-6 py-3 rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 font-medium"
            >
              {showLoading ? (
                <BiLoaderAlt className="animate-spin h-5 w-5" />
              ) : (
                <FaGithub className="h-5 w-5" />
              )}
              <span>
                {showLoading ? "Signing in..." : "Continue with GitHub"}
              </span>
            </button>

            <button
              onClick={() => setShowModal(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all hover:scale-[1.02] active:scale-[0.98] text-sm text-zinc-600 dark:text-zinc-400"
            >
              <FiInfo className="h-4 w-4" />
              <span>About The Flashcard App</span>
            </button>
          </div>
        </div>
      </div>

      {/* Info Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-in fade-in duration-200">
          <div
            className="absolute inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-white dark:bg-zinc-800 rounded-3xl shadow-lg max-w-lg w-full p-8 z-10 border border-zinc-200/50 dark:border-zinc-700/50 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Close Button */}
            <div className="absolute right-6 top-6">
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-700/50 transition-colors"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-2  slide-in-from-bottom-4 duration-500 delay-200">
                <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white">
                  About The Flashcard App
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400">
                  Master any subject with effective learning techniques
                </p>
              </div>

              {/* Content */}
              <div className="space-y-6 text-zinc-600 dark:text-zinc-300">
                {/* Description */}
                <p className="text-lg">
                  The Flashcard App is a modern learning platform designed to
                  help you master any subject through effective spaced
                  repetition and active recall.
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {[
                    {
                      icon: FiZap,
                      title: "Spaced Repetition",
                      desc: "Learn efficiently with proven algorithms",
                      delay: "delay-300",
                    },
                    {
                      icon: FiShare2,
                      title: "Share & Collaborate",
                      desc: "Create and share flashcard sets",
                      delay: "delay-400",
                    },
                    {
                      icon: FiTrendingUp,
                      title: "Track Progress",
                      desc: "Monitor your learning journey",
                      delay: "delay-500",
                    },
                    {
                      icon: FiUsers,
                      title: "Community",
                      desc: "Learn together with friends",
                      delay: "delay-600",
                    },
                  ].map((feature) => (
                    <div
                      key={feature.title}
                      className={`p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/50 dark:border-zinc-700/50  slide-in-from-bottom-4 duration-500 ${feature.delay}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-white dark:bg-zinc-700/50">
                          <feature.icon className="h-5 w-5 text-cyan-500" />
                        </div>
                        <div>
                          <h4 className="font-medium text-zinc-900 dark:text-white mb-1">
                            {feature.title}
                          </h4>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            {feature.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Call to Action */}
                <div className="mt-6 bg-gradient-to-b from-cyan-500/10 to-cyan-500/5 border border-cyan-500/10 rounded-2xl p-6 text-center slide-in-from-bottom-4 duration-500 delay-700">
                  <p className="text-zinc-900 dark:text-white font-medium mb-2">
                    Ready to improve your learning?
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Join thousands of students and professionals who are already
                    using The Flashcard App.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
