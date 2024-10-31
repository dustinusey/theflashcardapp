"use client";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import Dots from "./components/Dots";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
      <Dots />

      <div className="max-w-md w-full px-4 relative z-10">
        <div className="text-center space-y-5">
          {/* 404 Number */}
          <p className="text-8xl font-bold text-zinc-900 dark:text-zinc-100 select-none">
            404
          </p>

          {/* Message */}
          <div className="space-y-2">
            <h1 className="text-xl font-medium text-zinc-900 dark:text-zinc-100">
              Page not found
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400">
              Sorry, we couldn't find the page you're looking for.
            </p>
          </div>

          {/* Back Button */}
          <div className="pt-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/10 dark:bg-zinc-800/50 backdrop-blur-sm border border-zinc-200/10 dark:border-zinc-700/50 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
            >
              <FiArrowLeft className="h-4 w-4" />
              <span>Back to dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
