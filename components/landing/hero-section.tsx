"use client";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sparkles,
  Brain,
  Zap,
  TrendingUp,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
          style={{
            left: `${20 + i * 10}%`,
            top: `${20 + i * 8}%`,
          }}
          animate={{
            y: [-10, -20, -10],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function InteractiveDemo() {
  const [currentCard, setCurrentCard] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  const cards = [
    {
      front: "What is spaced repetition?",
      back: "A learning technique that incorporates increasing intervals of time between subsequent review of previously learned material.",
      difficulty: "Easy",
    },
    {
      front: "What are the benefits of active recall?",
      back: "Active recall strengthens memory retrieval pathways and improves long-term retention significantly.",
      difficulty: "Good",
    },
    {
      front: "How does the forgetting curve work?",
      back: "The forgetting curve shows how information is lost over time when there is no attempt to retain it.",
      difficulty: "Hard",
    },
  ];

  useEffect(() => {
    if (isRevealed) return;

    const interval = setInterval(() => {
      setIsRevealed(false);
      setTimeout(() => {
        setCurrentCard((prev) => (prev + 1) % cards.length);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, [isRevealed]);

  return (
    <motion.div
      className="relative w-full max-w-full mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <motion.div
        className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur-xl opacity-20"
        animate={{
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <Card className="relative bg-white/90 backdrop-blur-lg shadow-2xl border-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <CardContent className="relative p-6 space-y-6">
          <div className="flex items-center justify-between">
            <motion.h3
              className="font-semibold text-lg text-gray-900"
              animate={{ scale: [1, 1.01, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Today&apos;s Review
            </motion.h3>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {cards.length} cards
              </motion.span>
            </Badge>
          </div>

          <motion.div
            className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 space-y-4 min-h-[140px]"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 font-medium">
                Card {currentCard + 1}
              </p>
              <Brain className="h-4 w-4 text-blue-600" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentCard}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="min-h-[60px] flex flex-col justify-center"
              >
                <p className="font-medium text-gray-900 mb-3">
                  {cards[currentCard].front}
                </p>

                <AnimatePresence>
                  {isRevealed && (
                    <motion.div
                      className="bg-blue-50 border border-blue-200 rounded-lg p-3"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="text-sm text-blue-800">
                        {cards[currentCard].back}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>

            <motion.button
              className="w-full py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              onClick={() => setIsRevealed(!isRevealed)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {isRevealed ? "Hide Answer" : "Show Answer"}
            </motion.button>
          </motion.div>

          {isRevealed && (
            <motion.div
              className="grid grid-cols-4 gap-2 h-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {["Again", "Hard", "Good", "Easy"].map((label, index) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <AnimatedButton
                    size="lg"
                    variant={index === 2 ? "default" : "outline"}
                    animation="none"
                    className={`w-full text-xs h-8 ${
                      index === 2
                        ? "bg-green-600 hover:bg-green-700"
                        : index === 3
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : ""
                    }`}
                  >
                    {label}
                  </AnimatedButton>
                </motion.div>
              ))}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <FloatingParticles />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
      <motion.div
        className="absolute top-1/4 -right-1/4 w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-3xl opacity-10"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full blur-3xl opacity-10"
        animate={{
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="container mx-auto max-w-7xl px-6 pt-32 pb-20"
        style={{ y, opacity }}
      >
        <motion.div
          className="grid lg:grid-cols-2 gap-16 items-center"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {/* Left Content */}
          <motion.div className="space-y-8">
            <motion.div variants={itemVariants}>
              <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 hover:from-blue-200 hover:to-purple-200 border-0 shadow-lg">
                <Sparkles className="w-4 h-4 mr-2" />
                Smart Knowledge Retention Platform
              </Badge>
            </motion.div>

            <motion.h1
              className="text-6xl lg:text-7xl font-bold leading-tight"
              variants={itemVariants}
            >
              <span className="text-gray-900">Don&apos;t just</span>{" "}
              <motion.span
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                read it.
              </motion.span>
              <br />
              <motion.span
                className="text-gray-900"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Remember it.
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 leading-relaxed max-w-lg"
              variants={itemVariants}
            >
              Transform any content into lasting knowledge with{" "}
              <motion.span
                className="font-semibold text-blue-600"
                whileHover={{ scale: 1.02 }}
              >
                AI-powered flashcards
              </motion.span>{" "}
              and scientifically-proven{" "}
              <motion.span
                className="font-semibold text-purple-600"
                whileHover={{ scale: 1.02 }}
              >
                spaced repetition
              </motion.span>
              .
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <AnimatedButton variant="primary" size="lg" animation="slide" asChild>
                <Link href="/signup">
                  Get Started Free
                </Link>
              </AnimatedButton>

              <AnimatedButton variant="outline" size="lg" animation="hover" asChild>
                <Link href="/demo">
                  Watch Demo
                </Link>
              </AnimatedButton>
            </motion.div>

            {/* Simplified Stats */}
            <motion.div
              className="flex items-center gap-8 pt-8"
              variants={itemVariants}
            >
              {[
                { icon: Brain, value: "10K+", label: "Active Learners" },
                { icon: Zap, value: "1M+", label: "Cards Created" },
                { icon: TrendingUp, value: "95%", label: "Retention Rate" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="flex items-center gap-3 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <stat.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <motion.div
                      className="text-lg font-bold text-gray-900"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div className="w-full" variants={itemVariants}>
            <InteractiveDemo />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
