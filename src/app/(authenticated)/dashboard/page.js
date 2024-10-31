"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FiAward,
  FiBook,
  FiCheck,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiPlay,
  FiPlus,
  FiSearch,
  FiStar,
  FiTarget,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [masteredDeckSearch, setMasteredDeckSearch] = useState("");
  const [masteredDecks, setMasteredDecks] = useState([]);
  const [incompleteDecks, setIncompleteDecks] = useState([]);
  const [currentIncompletePage, setCurrentIncompletePage] = useState(1);
  const [currentMasteredPage, setCurrentMasteredPage] = useState(1);
  const decksPerPage = 5;
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

  useEffect(() => {
    setMasteredDecks([
      {
        id: "4",
        title: "CSS Grid & Flexbox",
        totalCards: 20,
        masteredDate: "2 days ago",
        accuracy: 95,
      },
      {
        id: "5",
        title: "Git Commands",
        totalCards: 15,
        masteredDate: "1 week ago",
        accuracy: 92,
      },
      {
        id: "6",
        title: "HTML5 Features",
        totalCards: 25,
        masteredDate: "3 days ago",
        accuracy: 88,
      },
      {
        id: "7",
        title: "REST API Concepts",
        totalCards: 30,
        masteredDate: "5 days ago",
        accuracy: 90,
      },
      {
        id: "8",
        title: "REST API Concepts",
        totalCards: 30,
        masteredDate: "5 days ago",
        accuracy: 90,
      },
      {
        id: "9",
        title: "API Concepts",
        totalCards: 30,
        masteredDate: "5 days ago",
        accuracy: 90,
      },
      {
        id: "10",
        title: "REST API Concepts",
        totalCards: 30,
        masteredDate: "5 days ago",
        accuracy: 90,
      },
    ]);

    setIncompleteDecks([
      {
        id: "1",
        title: "JavaScript Fundamentals",
        cardsCompleted: 15,
        totalCards: 30,
        lastStudied: "2h ago",
      },
      {
        id: "2",
        title: "React Hooks",
        cardsCompleted: 8,
        totalCards: 25,
        lastStudied: "1d ago",
      },
      {
        id: "3",
        title: "TypeScript Basics",
        cardsCompleted: 20,
        totalCards: 40,
        lastStudied: "3h ago",
      },
      {
        id: "8",
        title: "Node.js Basics",
        cardsCompleted: 10,
        totalCards: 35,
        lastStudied: "4h ago",
      },
      {
        id: "9",
        title: "Docker Fundamentals",
        cardsCompleted: 5,
        totalCards: 20,
        lastStudied: "5h ago",
      },
      {
        id: "9",
        title: "Docker Fundamentals",
        cardsCompleted: 5,
        totalCards: 20,
        lastStudied: "5h ago",
      },
      {
        id: "9",
        title: "Docker Fundamentals",
        cardsCompleted: 5,
        totalCards: 20,
        lastStudied: "5h ago",
      },
    ]);
  }, []);

  const paginateDecks = (decks, currentPage) => {
    const startIndex = (currentPage - 1) * decksPerPage;
    const endIndex = startIndex + decksPerPage;
    return decks.slice(startIndex, endIndex);
  };

  const filteredMasteredDecks = masteredDecks.filter((deck) =>
    deck.title.toLowerCase().includes(masteredDeckSearch.toLowerCase())
  );

  if (!mounted) return null;

  return (
    <div className="bg-gradient-to-b from-zinc-100 to-white dark:from-zinc-800 dark:to-zinc-900 w-full pb-24">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* User Profile & Welcome */}
          <div className="flex items-center gap-6">
            <div className=" w-24 h-24 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden flex-shrink-0">
              {user?.user_metadata?.avatar_url ? (
                <Image
                  src={user.user_metadata.avatar_url}
                  alt="Profile"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl text-zinc-500 dark:text-zinc-400">
                  {user?.user_metadata?.name?.[0] || "D"}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-medium text-zinc-900 dark:text-zinc-100">
                Welcome back, Developer
              </h1>
              <div className="space-y-1">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {user?.user_metadata?.name || "Anonymous Developer"}
                </p>
                {user?.email && (
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {user.email}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                label: "Daily Streak",
                value: "5 days",
                icon: FiZap,
                detail: "Rank #12 in streaks",
              },
              {
                label: "Total Points",
                value: "1,420",
                icon: FiAward,
                detail: "Top 10%",
              },
              {
                label: "Cards Mastered",
                value: "142/200",
                icon: FiBook,
                detail: "Rank #234 overall",
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
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      {stat.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="flex gap-3">
            <Link
              href="/study"
              className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl transition-colors"
            >
              <FiPlay className="h-4 w-4" />
              Continue Learning
            </Link>
            <Link
              href="/create"
              className="inline-flex items-center gap-2 px-4 py-2 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              <FiPlus className="h-4 w-4" />
              Create New Deck
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 space-y-8 mb-24">
        {/* Incomplete Decks */}
        <div>
          <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-4">
            Continue Learning
          </h2>
          <div className="space-y-3">
            {paginateDecks(incompleteDecks, currentIncompletePage).map(
              (deck) => (
                <Link
                  href={`/study/${deck.id}`}
                  key={deck.id}
                  className="block p-4 bg-white/50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200/50 dark:border-zinc-700/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 bg-zinc-100 dark:bg-zinc-700/50 rounded-xl">
                        <FiBook className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                          {deck.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="text-xs text-zinc-500 dark:text-zinc-400">
                            {deck.cardsCompleted} cards
                          </div>
                          <span className="text-zinc-300 dark:text-zinc-600">
                            •
                          </span>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400">
                            {deck.lastStudied}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-sm text-zinc-500 dark:text-zinc-400">
                        {deck.cardsCompleted}%
                      </div>
                      <div className="w-24 h-1 bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-cyan-500 rounded-full"
                          style={{ width: `${deck.cardsCompleted}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>

          {/* Pagination Controls for Incomplete Decks */}
          {incompleteDecks.length > decksPerPage && (
            <div className="flex items-center justify-between px-2 py-3 mt-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentIncompletePage(1)}
                  disabled={currentIncompletePage === 1}
                  className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="First Page"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="11 17 6 12 11 7"></polyline>
                    <polyline points="18 17 13 12 18 7"></polyline>
                  </svg>
                </button>
                <button
                  onClick={() =>
                    setCurrentIncompletePage((p) => Math.max(1, p - 1))
                  }
                  disabled={currentIncompletePage === 1}
                  className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiChevronLeft className="h-5 w-5" />
                </button>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  Page {currentIncompletePage} of{" "}
                  {Math.ceil(incompleteDecks.length / decksPerPage)}
                </span>
                <button
                  onClick={() =>
                    setCurrentIncompletePage((p) =>
                      Math.min(
                        Math.ceil(incompleteDecks.length / decksPerPage),
                        p + 1
                      )
                    )
                  }
                  disabled={
                    currentIncompletePage ===
                    Math.ceil(incompleteDecks.length / decksPerPage)
                  }
                  className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiChevronRight className="h-5 w-5" />
                </button>
                <button
                  onClick={() =>
                    setCurrentIncompletePage(
                      Math.ceil(incompleteDecks.length / decksPerPage)
                    )
                  }
                  disabled={
                    currentIncompletePage ===
                    Math.ceil(incompleteDecks.length / decksPerPage)
                  }
                  className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Last Page"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="13 17 18 12 13 7"></polyline>
                    <polyline points="6 17 11 12 6 7"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mastered Decks */}
        <div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                Mastered Decks
              </h2>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                {filteredMasteredDecks.length} decks completed
              </span>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
              </div>
              <input
                type="text"
                placeholder="Search mastered decks..."
                value={masteredDeckSearch}
                onChange={(e) => setMasteredDeckSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 rounded-xl text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>

            {/* Mastered Decks List */}
            <div className="space-y-3">
              {paginateDecks(filteredMasteredDecks, currentMasteredPage).map(
                (deck) => (
                  <div
                    key={deck.id}
                    className="p-4 bg-white/50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200/50 dark:border-zinc-700/50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-emerald-500/10 rounded-xl">
                          <FiCheck className="h-5 w-5 text-emerald-500" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                            {deck.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">
                              {deck.totalCards} cards
                            </div>
                            <span className="text-zinc-300 dark:text-zinc-600">
                              •
                            </span>
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">
                              Mastered {deck.masteredDate}
                            </div>
                            <span className="text-zinc-300 dark:text-zinc-600">
                              •
                            </span>
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">
                              {deck.accuracy}% accuracy
                            </div>
                          </div>
                        </div>
                      </div>
                      <Link
                        href={`/study/${deck.id}`}
                        className="text-xs px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                      >
                        Review Again
                      </Link>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Pagination Controls for Mastered Decks */}
            {filteredMasteredDecks.length > decksPerPage && (
              <div className="flex items-center justify-between px-2 py-3 mt-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentMasteredPage(1)}
                    disabled={currentMasteredPage === 1}
                    className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="First Page"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="11 17 6 12 11 7"></polyline>
                      <polyline points="18 17 13 12 18 7"></polyline>
                    </svg>
                  </button>
                  <button
                    onClick={() =>
                      setCurrentMasteredPage((p) => Math.max(1, p - 1))
                    }
                    disabled={currentMasteredPage === 1}
                    className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiChevronLeft className="h-5 w-5" />
                  </button>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    Page {currentMasteredPage} of{" "}
                    {Math.ceil(filteredMasteredDecks.length / decksPerPage)}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentMasteredPage((p) =>
                        Math.min(
                          Math.ceil(
                            filteredMasteredDecks.length / decksPerPage
                          ),
                          p + 1
                        )
                      )
                    }
                    disabled={
                      currentMasteredPage ===
                      Math.ceil(filteredMasteredDecks.length / decksPerPage)
                    }
                    className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiChevronRight className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentMasteredPage(
                        Math.ceil(filteredMasteredDecks.length / decksPerPage)
                      )
                    }
                    disabled={
                      currentMasteredPage ===
                      Math.ceil(filteredMasteredDecks.length / decksPerPage)
                    }
                    className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Last Page"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="13 17 18 12 13 7"></polyline>
                      <polyline points="6 17 11 12 6 7"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
