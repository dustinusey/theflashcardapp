"use client";
import { useState } from "react";
import {
  FiAward,
  FiCheck,
  FiChevronDown,
  FiClock,
  FiShield,
  FiStar,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";

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

export default function UpgradePage() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12 pt-28 min-h-screen">
      {/* Hero Section */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-sm font-medium inline-block mb-4">
          Upgrade to Pro
        </span>
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
          Take your learning to the next level
        </h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400">
          Unlock advanced features and maximize your learning potential with our
          Pro plan
        </p>
      </div>

      {/* Features Grid - Above Pricing */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              icon: FiZap,
              title: "Advanced Analytics",
              description:
                "Get detailed insights into your learning patterns and progress",
            },
            {
              icon: FiAward,
              title: "Unlimited Decks",
              description:
                "Create and manage as many flashcard decks as you need",
            },
            {
              icon: FiTrendingUp,
              title: "AI-Powered Learning",
              description:
                "Personalized study schedules based on your performance",
            },
            {
              icon: FiClock,
              title: "Offline Access",
              description:
                "Study anywhere, even without an internet connection",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700/50"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-500">
                  <feature.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Grid */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
        {/* Free Tier */}
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-700/50 p-8 bg-white dark:bg-zinc-900">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-1">
                Free
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Get started with the basics
              </p>
            </div>
            <span className="text-2xl font-semibold text-zinc-900 dark:text-white">
              $0
            </span>
          </div>

          <div className="space-y-4 mb-8">
            {[
              "Up to 5 flashcard decks",
              "Basic statistics",
              "Community sharing",
              "Standard spaced repetition",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <FiCheck className="h-5 w-5 text-cyan-500" />
                <span className="text-zinc-600 dark:text-zinc-300">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <button className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors font-medium">
            Current Plan
          </button>
        </div>

        {/* Pro Tier */}
        <div className="rounded-3xl border border-cyan-500/20 p-8 bg-white dark:bg-zinc-900 relative">
          <div className="absolute -top-3 left-4">
            <div className="px-3 py-1 rounded-full bg-white dark:bg-zinc-900 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-sm font-medium flex items-center gap-1 shadow-sm">
              <FiStar className="h-4 w-4" />
              Recommended
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-1">
                Pro
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                For serious learners
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-semibold text-zinc-900 dark:text-white">
                $9
              </span>
              <span className="text-zinc-500 dark:text-zinc-400 text-sm">
                /month
              </span>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            {[
              "Everything in Free, plus:",
              "Unlimited flashcard decks",
              "Advanced analytics & insights",
              "AI-powered learning suggestions",
              "Custom study schedules",
              "Priority support",
              "Offline access",
              "Export & backup options",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <FiCheck className="h-5 w-5 text-cyan-500" />
                <span className="text-zinc-600 dark:text-zinc-300">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <button className="w-full flex items-center justify-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-6 py-3 rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors font-medium">
            <FiZap className="h-5 w-5" />
            Upgrade to Pro
          </button>
        </div>
      </div>

      {/* Trust Section */}
      <div className="max-w-4xl mx-auto mb-16 text-center">
        <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/50 dark:border-zinc-700/50">
          <div className="flex items-center justify-center gap-2 text-zinc-900 dark:text-white mb-4">
            <FiShield className="h-5 w-5" />
            <span className="font-medium">30-day money-back guarantee</span>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Try Pro risk-free. If you're not satisfied, get a full refund within
            the first 30 days.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {[
            {
              q: "Can I cancel anytime?",
              a: "Yes, you can cancel your subscription at any time. You'll continue to have access to Pro features until the end of your billing period.",
            },
            {
              q: "What payment methods do you accept?",
              a: "We accept all major credit cards, PayPal, and Apple Pay.",
            },
            {
              q: "Is there a student discount?",
              a: "Yes! Students get 50% off Pro with a valid student email.",
            },
            {
              q: "What happens to my decks if I downgrade?",
              a: "Your decks and data are safely stored. You'll maintain access to your first 5 decks, but won't be able to create new ones until upgrading again.",
            },
          ].map((faq, index) => (
            <FAQ key={index} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>
    </div>
  );
}
