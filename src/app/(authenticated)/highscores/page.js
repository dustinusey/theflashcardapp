"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FiAward,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiHelpCircle,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";

// development toggle for dummy data
const SHOW_DUMMY_DATA = false;

// FAQ Component
function FAQ({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-zinc-200 dark:border-zinc-700/50 rounded-2xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
      >
        <span className="font-medium text-left text-zinc-900 dark:text-white">
          {question}
        </span>
        <FiChevronDown
          className={`h-5 w-5 text-zinc-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-200 ease-in-out ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300 text-sm">
          {answer}
        </div>
      </div>
    </div>
  );
}

export default function HighscoresPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const supabase = createClientComponentClient();

  // Fetch users and combine with dummy data
  useEffect(() => {
    async function fetchUsers() {
      try {
        const { data: realUsers, error } = await supabase
          .from("profiles")
          .select("*")
          .order("score", { ascending: false });

        if (error) throw error;

        // Combine with dummy data only if SHOW_DUMMY_DATA is true
        const combinedUsers = SHOW_DUMMY_DATA
          ? [...(realUsers || []), ...dummyUsers]
          : realUsers || [];

        // Sort all users by score
        const sortedUsers = combinedUsers.sort(
          (a, b) => (b.score || 0) - (a.score || 0)
        );

        console.log("Total users after combining:", sortedUsers.length); // Debug log
        setUsers(sortedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [supabase]);

  // Calculate current page users
  const getCurrentPageUsers = () => {
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    return users.slice(startIndex, endIndex);
  };

  const currentUsers = getCurrentPageUsers();
  const isFirstPage = currentPage === 1;
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Debug logs
  console.log("Loading:", loading);
  console.log("Current users:", currentUsers);
  console.log("Total users:", users.length);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12  pt-28 min-h-screen">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-3">
          Leaderboard
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          Top learners in the community
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <FiZap className="h-6 w-6 text-cyan-500 animate-spin" />
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-zinc-500 dark:text-zinc-400">No users found</p>
        </div>
      ) : (
        <>
          {/* Show top 3 only on first page */}
          {isFirstPage && (
            <div className="grid md:grid-cols-3 gap-4 mb-12">
              {currentUsers.slice(0, 3).map((user, index) => (
                <div
                  key={user.id}
                  className={`flex flex-col items-center p-6 rounded-2xl border 
                    ${
                      index === 0
                        ? "bg-white dark:bg-zinc-800 border-cyan-500/30 shadow-sm shadow-cyan-500/10"
                        : "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
                    }`}
                >
                  <div className="relative mb-3">
                    <div
                      className={`relative ${
                        index === 0
                          ? "ring-2 ring-cyan-500/30 dark:ring-cyan-500/50 rounded-full"
                          : ""
                      }`}
                    >
                      {user.avatar_url ? (
                        <Image
                          src={user.avatar_url}
                          alt={user.full_name || "User"}
                          width={64}
                          height={64}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center">
                          <span className="text-2xl text-zinc-500 dark:text-zinc-300">
                            {(user.full_name || "A")[0].toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="absolute -top-2 -right-2 z-10">
                      <div
                        className={`p-1.5 rounded-full shadow-sm ${
                          index === 0
                            ? "bg-gradient-to-r from-cyan-500 to-cyan-400 shadow-cyan-500/20"
                            : index === 1
                            ? "bg-zinc-400 dark:bg-zinc-300"
                            : "bg-zinc-700 dark:bg-zinc-600"
                        }`}
                      >
                        <FiAward className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </div>

                  <h3
                    className={`font-medium text-center mb-1 ${
                      index === 0
                        ? "text-zinc-500 dark:text-white"
                        : "text-zinc-900 dark:text-white"
                    }`}
                  >
                    {user.full_name || "Anonymous"}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-300 mb-2">
                    {user.score || 0} points
                  </p>

                  <div
                    className={`w-full pt-4 mt-2 border-t ${
                      index === 0
                        ? "border-cyan-500/20 dark:border-cyan-500/20"
                        : "border-zinc-100 dark:border-zinc-700"
                    }`}
                  >
                    <div className="grid grid-cols-2 gap-2 text-center text-xs">
                      <div>
                        <div
                          className={`mb-1 ${
                            index === 0
                              ? "text-zinc-500/70 dark:text-white"
                              : "text-zinc-500 dark:text-zinc-300"
                          }`}
                        >
                          Streak
                        </div>
                        <div
                          className={`font-medium ${
                            index === 0
                              ? "text-cyan-500 dark:text-cyan-400"
                              : "text-zinc-900 dark:text-white"
                          }`}
                        >
                          {user.streak || 0} days
                        </div>
                      </div>
                      <div>
                        <div
                          className={`mb-1 ${
                            index === 0
                              ? "text-zinc-500/70 dark:text-white"
                              : "text-zinc-500 dark:text-zinc-300"
                          }`}
                        >
                          Accuracy
                        </div>
                        <div
                          className={`font-medium ${
                            index === 0
                              ? "text-cyan-500 dark:text-cyan-400"
                              : "text-zinc-900 dark:text-white"
                          }`}
                        >
                          {user.accuracy || 0}%
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* First Place Badge */}
                  {index === 0 && (
                    <div className="mt-4 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 dark:text-cyan-400 text-sm font-medium">
                      #1 This Week
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Remaining Users List */}
          <div className="space-y-2 mb-8">
            {currentUsers.slice(isFirstPage ? 3 : 0).map((user, index) => (
              <Link
                href={`/profile/${user.id}`}
                key={user.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700/50 transition-colors"
              >
                <div className="flex-shrink-0 w-12">
                  <span className="text-lg font-medium text-zinc-400">
                    #
                    {(currentPage - 1) * usersPerPage +
                      (isFirstPage ? index + 4 : index + 1)}
                  </span>
                </div>

                {user.avatar_url ? (
                  <Image
                    src={user.avatar_url}
                    alt={user.full_name || "User"}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center">
                    <span className="text-xl text-zinc-500 dark:text-zinc-300">
                      {(user.full_name || "A")[0].toUpperCase()}
                    </span>
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-zinc-900 dark:text-white truncate">
                    {user.full_name || "Anonymous"}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                    <span>{user.score || 0} points</span>
                    <span>•</span>
                    <span>{user.accuracy || 0}% accuracy</span>
                    <span>•</span>
                    <span>{user.streak || 0}d streak</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {users.length > usersPerPage && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center gap-2">
                {/* First Page Button */}
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-700/50 disabled:opacity-50 disabled:cursor-not-allowed"
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

                {/* Previous Page Button */}
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-700/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Previous Page"
                >
                  <FiChevronLeft className="h-5 w-5" />
                </button>

                {/* Page Indicator */}
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  Page {currentPage} of {totalPages}
                </span>

                {/* Next Page Button */}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-700/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Next Page"
                >
                  <FiChevronRight className="h-5 w-5" />
                </button>

                {/* Last Page Button */}
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-700/50 disabled:opacity-50 disabled:cursor-not-allowed"
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

          {/* FAQ Section */}
          <div className="mt-20">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-2 mb-4">
                <FiHelpCircle className="h-5 w-5 text-cyan-500" />
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">
                  Frequently Asked Questions
                </h2>
              </div>
              <p className="text-zinc-500 dark:text-zinc-400">
                Everything you need to know about the leaderboard system
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "How is the score calculated?",
                  a: "Your score is based on several factors including: completed flashcard sets, study streak days, correct answer percentage, and participation in the community. Each activity contributes points to your overall score.",
                },
                {
                  q: "How often is the leaderboard updated?",
                  a: "The leaderboard is updated in real-time. As soon as you complete an activity that affects your score, your position on the leaderboard will be updated accordingly.",
                },
                {
                  q: "What rewards do top performers get?",
                  a: "Top performers receive special badges, exclusive features, and recognition in our community. The top 3 users each month also get additional Pro account benefits.",
                },
                {
                  q: "Can I opt out of the leaderboard?",
                  a: "Yes, you can choose to hide your profile from the leaderboard in your account settings. Your learning progress will still be tracked for your personal reference.",
                },
                {
                  q: "Why did my score change?",
                  a: "Scores can change based on your recent activity, inactivity periods, or adjustments to maintain fair competition. You can view detailed score breakdowns in your profile.",
                },
                {
                  q: "How can I improve my ranking?",
                  a: "Focus on maintaining a consistent study schedule, completing flashcard sets accurately, and participating in community activities. The more engaged you are, the higher your score will climb.",
                },
              ].map((faq, index) => (
                <FAQ key={index} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Dummy data array
const dummyUsers = [
  {
    id: "1",
    full_name: "Sarah Chen",
    avatar_url: "https://i.pravatar.cc/150?img=1",
    score: 9850,
    streak: 42,
    accuracy: 98,
  },
  {
    id: "2",
    full_name: "Alex Rodriguez",
    avatar_url: "https://i.pravatar.cc/150?img=2",
    score: 9200,
    streak: 35,
    accuracy: 95,
  },
  {
    id: "3",
    full_name: "Emma Watson",
    avatar_url: "https://i.pravatar.cc/150?img=3",
    score: 8900,
    streak: 28,
    accuracy: 92,
  },
  {
    id: "4",
    full_name: "James Smith",
    avatar_url: "https://i.pravatar.cc/150?img=4",
    score: 8500,
    streak: 21,
    accuracy: 89,
  },
  {
    id: "5",
    full_name: "Maria Garcia",
    avatar_url: "https://i.pravatar.cc/150?img=5",
    score: 8200,
    streak: 19,
    accuracy: 91,
  },
  {
    id: "6",
    full_name: "David Kim",
    avatar_url: "https://i.pravatar.cc/150?img=6",
    score: 7900,
    streak: 25,
    accuracy: 88,
  },
  {
    id: "7",
    full_name: "Lisa Johnson",
    avatar_url: "https://i.pravatar.cc/150?img=7",
    score: 7600,
    streak: 15,
    accuracy: 86,
  },
  {
    id: "8",
    full_name: "Michael Brown",
    avatar_url: "https://i.pravatar.cc/150?img=8",
    score: 7300,
    streak: 12,
    accuracy: 85,
  },
  {
    id: "9",
    full_name: "Sophie Taylor",
    avatar_url: "https://i.pravatar.cc/150?img=9",
    score: 7000,
    streak: 18,
    accuracy: 87,
  },
  {
    id: "10",
    full_name: "Daniel Lee",
    avatar_url: "https://i.pravatar.cc/150?img=10",
    score: 6800,
    streak: 14,
    accuracy: 84,
  },
  {
    id: "11",
    full_name: "Isabella Martinez",
    avatar_url: "https://i.pravatar.cc/150?img=11",
    score: 6500,
    streak: 11,
    accuracy: 83,
  },
  {
    id: "12",
    full_name: "William Wilson",
    avatar_url: "https://i.pravatar.cc/150?img=12",
    score: 6200,
    streak: 9,
    accuracy: 82,
  },
  {
    id: "13",
    full_name: "Olivia Davis",
    avatar_url: "https://i.pravatar.cc/150?img=13",
    score: 5900,
    streak: 8,
    accuracy: 81,
  },
  {
    id: "14",
    full_name: "Lucas Anderson",
    avatar_url: "https://i.pravatar.cc/150?img=14",
    score: 5600,
    streak: 7,
    accuracy: 80,
  },
  {
    id: "15",
    full_name: "Ava Thomas",
    avatar_url: "https://i.pravatar.cc/150?img=15",
    score: 5300,
    streak: 6,
    accuracy: 79,
  },
  {
    id: "16",
    full_name: "Ethan White",
    avatar_url: "https://i.pravatar.cc/150?img=16",
    score: 5000,
    streak: 5,
    accuracy: 78,
  },
  {
    id: "17",
    full_name: "Mia Jackson",
    avatar_url: "https://i.pravatar.cc/150?img=17",
    score: 4700,
    streak: 4,
    accuracy: 77,
  },
  {
    id: "18",
    full_name: "Noah Harris",
    avatar_url: "https://i.pravatar.cc/150?img=18",
    score: 4400,
    streak: 3,
    accuracy: 76,
  },
  {
    id: "19",
    full_name: "Charlotte Clark",
    avatar_url: "https://i.pravatar.cc/150?img=19",
    score: 4100,
    streak: 2,
    accuracy: 75,
  },
  {
    id: "20",
    full_name: "Liam Lewis",
    avatar_url: "https://i.pravatar.cc/150?img=20",
    score: 3800,
    streak: 1,
    accuracy: 74,
  },
];
