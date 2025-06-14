"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Sparkles, Star, Users, Zap } from "lucide-react";
import { useRef, useMemo } from "react";
import Link from "next/link";

export function CTASection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Simplified scroll transforms
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Memoized animation variants for better performance
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }), []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
    >
      {/* Simplified gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600" />

      {/* Simplified floating orbs with subtle animation */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/8 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/8 rounded-full blur-2xl"
        animate={{
          scale: [1.05, 1, 1.05],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <motion.div
        className="container mx-auto max-w-5xl px-6 relative"
        style={{ y, opacity, willChange: 'transform' }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center text-white"
        >
          {/* Optimized stats badges */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            {[
              { icon: Users, value: "10,000+", label: "Happy Learners" },
              { icon: Star, value: "4.9/5", label: "Rating" },
              { icon: Zap, value: "1M+", label: "Cards Created" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20"
                whileHover={{ 
                  scale: 1.02, 
                  y: -2,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                style={{ willChange: 'transform' }}
              >
                <motion.div
                  className="p-2 bg-white/20 rounded-lg"
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{ willChange: 'transform' }}
                >
                  <stat.icon className="h-4 w-4" />
                </motion.div>
                <div className="text-left">
                  <div className="font-bold text-lg">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Simplified main content */}
          <motion.div variants={itemVariants} className="mb-8">
            <motion.div
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{ willChange: 'transform' }}
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Limited Time Offer</span>
            </motion.div>
          </motion.div>

          <motion.h2 
            className="text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            variants={itemVariants}
          >
            Start remembering{" "}
            <motion.span
              className="relative"
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              style={{ willChange: 'transform' }}
            >
              what you learn
            </motion.span>
          </motion.h2>

          <motion.p 
            className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Join thousands of learners who are building lasting knowledge with Recallr. 
            Transform your reading into permanent memories with AI-powered flashcards.
          </motion.p>

          {/* Optimized CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
            variants={itemVariants}
          >
            <AnimatedButton
              size="lg"
              animation="slide"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl border-0"
              asChild
            >
              <Link href="/signup">
                Get Started Free
              </Link>
            </AnimatedButton>

            <AnimatedButton
              variant="outline"
              size="lg"
              animation="hover"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold bg-transparent"
              asChild
            >
              <Link href="/demo">
                Watch Demo
              </Link>
            </AnimatedButton>
          </motion.div>

          {/* Simplified trust indicators */}
          <motion.div
            variants={itemVariants}
            className="space-y-4"
          >
            <p className="text-white/80">
              ✓ No credit card required • ✓ Free forever plan • ✓ Setup in 60 seconds
            </p>
            
            <motion.div
              className="flex justify-center items-center gap-2"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{ willChange: 'transform' }}
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-sm text-white/80 ml-2">
                Rated 4.9/5 by 10,000+ learners
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Simplified bottom wave effect */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent opacity-60" />
    </section>
  );
} 