"use client";
import { useEffect } from "react";

export default function ThemeProvider() {
  useEffect(() => {
    // Check localStorage and system preference
    const theme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  return null;
}
