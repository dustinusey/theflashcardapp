"use client";
import { useState } from "react";
import {
  FiAward,
  FiBook,
  FiChevronDown,
  FiPlus,
  FiTarget,
  FiZap,
} from "react-icons/fi";

const DIFFICULTY_CONFIG = {
  easy: {
    color: "emerald",
    icon: FiTarget,
    description: "Basic concepts and fundamentals",
  },
  intermediate: {
    color: "cyan",
    icon: FiAward,
    description: "Advanced topics and patterns",
  },
  hard: {
    color: "cyan",
    icon: FiZap,
    description: "Expert-level challenges",
  },
};

const PRESET_TOPICS = {
  "Frontend Development": [
    "JavaScript Fundamentals",
    "React Hooks",
    "CSS Grid & Flexbox",
    "TypeScript Basics",
  ],
  // ... other categories
};

export default function NewFlashcards() {
  const [isCustomTopic, setIsCustomTopic] = useState(false);
  const [category, setCategory] = useState(Object.keys(PRESET_TOPICS)[0]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [customTopic, setCustomTopic] = useState("");
  const [difficulty, setDifficulty] = useState("easy");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const topicToUse = isCustomTopic ? customTopic : selectedTopic;
    // ... handle submission
  };

  return (
    <div className="max-w-xl min-h-screen mx-auto px-4 py-8 pt-20">
      <div className="mb-6 pt-10">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          Create New Flashcard Set
        </h1>
      </div>
    </div>
  );
}
