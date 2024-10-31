"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiAward, FiBook, FiSearch, FiTrendingUp, FiZap } from "react-icons/fi";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);
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

  return (
    <div>
      {/* Hero Section - Full Width */}
      <div className="bg-gradient-to-b from-zinc-100 to-white dark:from-zinc-800 dark:to-zinc-900 w-full mb-8 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="space-y-4">
            <h1 className="text-3xl font-medium text-zinc-900 dark:text-zinc-100">
              Welcome back,{" "}
              {user?.user_metadata?.preferred_username || "Developer"}
            </h1>
            <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
              <FiZap className="h-5 w-5" />
              <p className="text-lg">
                You're on a 5-day study streak! Keep it up.
              </p>
            </div>

            {/* Quick Stats in Hero */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                {
                  label: "Study Streak",
                  value: "5 days",
                  icon: FiZap,
                },
                {
                  label: "Cards Mastered",
                  value: "142",
                  icon: FiBook,
                },
                {
                  label: "Global Rank",
                  value: "#234",
                  icon: FiAward,
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl border backdrop-blur-sm bg-cyan-500/10 border-cyan-500/20 text-cyan-600 dark:text-cyan-500"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white/80 dark:bg-white/10">
                      <stat.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-lg font-medium">{stat.value}</p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-300">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4">
        {/* Continue Learning */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-4">
            Continue Learning
          </h2>
          <div className="space-y-3">
            {[
              {
                title: "JavaScript Basics",
                progress: 60,
                cards: 24,
                lastStudied: "2h ago",
              },
              {
                title: "React Hooks",
                progress: 35,
                cards: 18,
                lastStudied: "1d ago",
              },
              {
                title: "TypeScript Types",
                progress: 80,
                cards: 30,
                lastStudied: "3h ago",
              },
            ].map((set) => (
              <Link
                href={`/study/${set.title}`}
                key={set.title}
                className="block p-4 bg-white/50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200/50 dark:border-zinc-700/50 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/80 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-zinc-100 dark:bg-zinc-700/50 rounded-xl">
                      <FiBook className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {set.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                          {set.cards} cards
                        </div>
                        <span className="text-zinc-300 dark:text-zinc-600">
                          •
                        </span>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                          {set.lastStudied}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
                      {set.progress}%
                    </div>
                    <div className="w-24 h-1 bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-cyan-500 rounded-full"
                        style={{ width: `${set.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Trending Sets */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
              Trending Sets
            </h2>
            <Link
              href="/trending"
              className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { title: "Python for Beginners", users: 1234, trend: "+12%" },
              { title: "AWS Certification", users: 892, trend: "+8%" },
              { title: "Data Structures", users: 654, trend: "+15%" },
              { title: "System Design", users: 432, trend: "+5%" },
            ].map((set) => (
              <Link
                href={`/set/${set.title}`}
                key={set.title}
                className="p-4 bg-white/50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200/50 dark:border-zinc-700/50 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-zinc-100 dark:bg-zinc-700/50 rounded-xl">
                    <FiTrendingUp className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {set.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        {set.users.toLocaleString()} studying
                      </span>
                      <span className="text-xs text-emerald-500">
                        {set.trend}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
