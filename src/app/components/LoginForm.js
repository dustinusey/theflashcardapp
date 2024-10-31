"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { FaGithub } from "react-icons/fa";

export default function LoginForm() {
  const supabase = createClientComponentClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGitHubLogin = async () => {
    setIsLoading(true);
    setError(null);
    localStorage.setItem("isAuthenticating", "true");

    try {
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
    } finally {
      setIsLoading(false);
      localStorage.removeItem("isAuthenticating");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12 bg-zinc-50 dark:bg-zinc-900">
      <div className="w-full max-w-sm">
        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700/50 p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
              Welcome back
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Sign in to continue to your dashboard
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-sm rounded-xl">
              {error}
            </div>
          )}

          <button
            onClick={handleGitHubLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-6 py-3 rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {isLoading ? (
              <BiLoaderAlt className="animate-spin h-5 w-5" />
            ) : (
              <FaGithub className="h-5 w-5" />
            )}
            <span>{isLoading ? "Signing in..." : "Continue with GitHub"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
