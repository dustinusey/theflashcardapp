"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";

function Dots() {
  const [dots, setDots] = useState([]);

  useEffect(() => {
    // Create 50 dots with random positions and animations
    const newDots = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 20 + 10}s`,
      size: Math.random() * 4 + 2,
      opacity: Math.random() * 0.5 + 0.1,
    }));
    setDots(newDots);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="absolute rounded-full animate-float"
          style={{
            left: dot.left,
            top: dot.top,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            opacity: dot.opacity,
            animationDuration: dot.animationDuration,
            backgroundColor: "currentColor",
            color: "rgb(161 161 170)",
          }}
        />
      ))}
    </div>
  );
}

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white dark:bg-zinc-900">
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
