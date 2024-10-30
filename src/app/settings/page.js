"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    }
    setIsDarkMode(!isDarkMode);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div>
          <div>
            <Link href="/">Home</Link>
            <span> / </span>
            <span>Settings</span>
          </div>

          <h1>Settings</h1>
          <p>Manage your account preferences</p>
        </div>

        <div className="mt-6">
          <div>
            <h2>Theme Preferences</h2>

            <div className="flex items-center justify-between">
              <div>
                <h3>Dark Mode</h3>
                <p>Toggle between light and dark themes</p>
              </div>
              <label>
                <input
                  type="checkbox"
                  checked={isDarkMode}
                  onChange={toggleDarkMode}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
