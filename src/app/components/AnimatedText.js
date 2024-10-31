"use client";
import { useEffect, useState } from "react";

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const AnimatedLetter = ({ targetLetter, delay, isAnimating }) => {
  const [currentLetter, setCurrentLetter] = useState(targetLetter);

  useEffect(() => {
    if (!isAnimating) {
      setCurrentLetter(targetLetter);
      return;
    }

    let iterations = 0;
    const maxIterations = 20; // Number of letters to cycle through

    const interval = setInterval(() => {
      if (iterations >= maxIterations) {
        setCurrentLetter(targetLetter);
        clearInterval(interval);
        return;
      }

      setCurrentLetter(
        CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
      );
      iterations++;
    }, 50); // Speed of letter changes

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setCurrentLetter(targetLetter);
    }, delay + 500); // Total animation duration for this letter

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [targetLetter, delay, isAnimating]);

  return (
    <span
      className={`inline-block transition-transform ${
        isAnimating ? "animate-flipLetter" : ""
      }`}
    >
      {currentLetter}
    </span>
  );
};

export default function AnimatedText({ text, isAnimating }) {
  return (
    <span className="inline-flex">
      {text.split("").map((letter, index) => (
        <AnimatedLetter
          key={index}
          targetLetter={letter}
          delay={index * 50} // Stagger the animation
          isAnimating={isAnimating}
        />
      ))}
    </span>
  );
}
