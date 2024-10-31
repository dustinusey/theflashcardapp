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
    color: "orange",
    icon: FiAward,
    description: "Advanced topics and patterns",
  },
  hard: {
    color: "rose",
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
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          Create New Flashcard Set
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Generate AI-powered flashcards for any topic
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Topic Selection Method */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setIsCustomTopic(false)}
            className={`flex-1 p-3 rounded-lg border transition-all ${
              !isCustomTopic
                ? "border-zinc-900/10 bg-white shadow-sm dark:border-zinc-500 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100"
                : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-white hover:border-zinc-300"
            }`}
          >
            Choose from Templates
          </button>
          <button
            type="button"
            onClick={() => setIsCustomTopic(true)}
            className={`flex-1 p-3 rounded-lg border transition-all ${
              isCustomTopic
                ? "border-zinc-400 dark:border-zinc-500 bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100"
                : "border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400"
            }`}
          >
            Create Custom Topic
          </button>
        </div>

        {/* Template Selection */}
        {!isCustomTopic && (
          <>
            {/* Categories */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-zinc-800 dark:text-zinc-100">
                Select Category
              </label>
              <div className="grid grid-cols-2 gap-3">
                {Object.keys(PRESET_TOPICS).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`p-3 text-left rounded-lg border transition-all ${
                      category === cat
                        ? "border-zinc-900/10 bg-white shadow-sm dark:border-zinc-500 dark:bg-zinc-800/50"
                        : "border-zinc-200 bg-white/50 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-md bg-zinc-50 dark:bg-zinc-800 ${
                          category === cat
                            ? "text-zinc-800 dark:text-zinc-100"
                            : "text-zinc-500 dark:text-zinc-500"
                        }`}
                      >
                        <FiBook className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                        {cat}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Topics Dropdown */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Select Topic
              </label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-900 dark:text-zinc-100 appearance-none focus:outline-none focus:ring-2 focus:ring-zinc-100 dark:focus:ring-zinc-800 focus:border-zinc-300 dark:focus:border-zinc-700 shadow-sm"
              >
                <option value="">Select a topic</option>
                {PRESET_TOPICS[category].map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {/* Custom Topic Input */}
        {isCustomTopic && (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Enter Topic
            </label>
            <input
              type="text"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder="e.g., React Context API, Python Decorators"
              className="w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-100 dark:focus:ring-zinc-800 focus:border-zinc-300 dark:focus:border-zinc-700"
            />
          </div>
        )}

        {/* Difficulty Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
            Select Difficulty
          </label>
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(DIFFICULTY_CONFIG).map(([level, config]) => {
              const Icon = config.icon;
              const activeColorClasses = {
                emerald:
                  "bg-emerald-500/10 text-emerald-500 border-emerald-500",
                orange: "bg-orange-500/10 text-orange-500 border-orange-500",
                rose: "bg-rose-500/10 text-rose-500 border-rose-500",
              };

              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => setDifficulty(level)}
                  className={`flex flex-col h-full p-3 text-left rounded-lg border transition-all hover:scale-[1.02] ${
                    difficulty === level
                      ? `${activeColorClasses[config.color]} shadow-sm`
                      : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-1.5 rounded-md ${
                        difficulty === level
                          ? activeColorClasses[config.color].split(" ")[0]
                          : "bg-zinc-100 dark:bg-zinc-800"
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 ${
                          difficulty === level
                            ? activeColorClasses[config.color].split(" ")[1]
                            : "text-zinc-400 dark:text-zinc-500"
                        }`}
                      />
                    </div>
                    <span
                      className={`text-sm font-medium capitalize ${
                        difficulty === level
                          ? activeColorClasses[config.color].split(" ")[1]
                          : "text-zinc-900 dark:text-zinc-100"
                      }`}
                    >
                      {level}
                    </span>
                  </div>
                  <span className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                    {config.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isCustomTopic ? !customTopic : !selectedTopic}
          className="w-full px-4 py-5 bg-zinc-800 hover:bg-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all"
        >
          Generate Flashcard Set
        </button>
      </form>
    </div>
  );
}
