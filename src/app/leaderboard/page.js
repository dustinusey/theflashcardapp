"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiAward, FiTarget, FiTrendingUp } from "react-icons/fi";

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchLeaderboard() {
      const { data, error } = await supabase
        .from("leaderboards")
        .select("*")
        .order("total_points", { ascending: false });

      if (!error) {
        setLeaderboardData(data);
      }
      setIsLoading(false);
    }

    fetchLeaderboard();
  }, [supabase]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-8">
          Leaderboard
        </h1>

        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700">
          <div className="p-6">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-zinc-500 dark:text-zinc-400">
                    <th className="pb-4">Rank</th>
                    <th className="pb-4">Player</th>
                    <th className="pb-4 text-right">Games</th>
                    <th className="pb-4 text-right">Win Rate</th>
                    <th className="pb-4 text-right">Total Points</th>
                    <th className="pb-4 text-right">Avg Score</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map((player, index) => (
                    <tr
                      key={player.id}
                      className="border-t border-zinc-100 dark:border-zinc-700"
                    >
                      <td className="py-4">
                        <span
                          className={`
                          inline-flex items-center justify-center w-6 h-6 rounded-full text-sm font-medium
                          ${
                            index === 0
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-500"
                              : ""
                          }
                          ${
                            index === 1
                              ? "bg-zinc-100 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300"
                              : ""
                          }
                          ${
                            index === 2
                              ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-500"
                              : ""
                          }
                        `}
                        >
                          {index + 1}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <Image
                            src={player.avatar_url}
                            alt={player.username}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          <span className="font-medium text-zinc-900 dark:text-white">
                            {player.username}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 text-right text-zinc-900 dark:text-white">
                        {player.total_games}
                      </td>
                      <td className="py-4 text-right text-zinc-900 dark:text-white">
                        {player.total_games > 0
                          ? `${(
                              (player.games_won / player.total_games) *
                              100
                            ).toFixed(1)}%`
                          : "0%"}
                      </td>
                      <td className="py-4 text-right text-zinc-900 dark:text-white">
                        {player.total_points}
                      </td>
                      <td className="py-4 text-right text-zinc-900 dark:text-white">
                        {player.average_score}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
