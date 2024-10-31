"use client";
import { useEffect, useState } from "react";

export default function Dots() {
  const [dots, setDots] = useState([]);

  useEffect(() => {
    // Create 50 dots with random positions and animations
    const newDots = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 20 + 10}s`,
      size: Math.random() * 4 + 2,
      opacity: Math.random() * 0.3 + 0.1,
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
            color: "rgb(34 211 238)",
          }}
        />
      ))}
    </div>
  );
}
