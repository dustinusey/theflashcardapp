"use client";
import { useEffect, useState } from "react";

export default function Dots() {
  const [dots, setDots] = useState([]);

  useEffect(() => {
    const newDots = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 20 + 10}s`,
      size: Math.random() * 6 + 3,
      opacity: Math.random() * 0.4 + 0.2,
      colorClass: [
        "text-zinc-300 dark:text-cyan-400",
        "text-zinc-400 dark:text-zinc-100/30",
        "text-zinc-500 dark:text-zinc-600",
      ][Math.floor(Math.random() * 3)],
    }));
    setDots(newDots);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {dots.map((dot) => (
        <div
          key={dot.id}
          className={`absolute rounded-full animate-float ${dot.colorClass}`}
          style={{
            left: dot.left,
            top: dot.top,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            opacity: dot.opacity,
            animationDuration: dot.animationDuration,
            backgroundColor: "currentColor",
          }}
        />
      ))}
    </div>
  );
}
