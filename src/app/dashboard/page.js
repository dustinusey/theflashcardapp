"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignOut = async () => {
    localStorage.removeItem("isAuthenticating");
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-[#1F2328]">Dashboard</h1>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 rounded-md px-3 py-1 text-sm font-semibold text-[#1F2328] bg-[#F6F8FA] border border-[#D0D7DE] hover:bg-[#F3F4F6] focus:outline-none focus:ring-2 focus:ring-[#2C5AB8] focus:ring-offset-2 transition-colors"
          >
            Sign Out
          </button>
        </div>

        <div className="bg-white rounded-md border border-[#d0d7de] p-6">
          <p className="text-[#656D76]">Welcome to your dashboard!</p>
        </div>
      </div>
    </div>
  );
}
