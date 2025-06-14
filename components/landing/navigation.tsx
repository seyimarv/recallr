"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Brain, Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0.95)", "rgba(255, 255, 255, 0.6)"]
  );

  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(8px)", "blur(20px)"]
  );


  const navItems = [
    { name: "Features", href: "#features" },
    { name: "How it Works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
    { name: "About", href: "#about" }
  ];

  return (
    <motion.nav
      className="fixed top-0 w-full z-50 transition-all duration-300"
      style={{
        backgroundColor,
        backdropFilter: backdropBlur,
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Simplified Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="relative"
              whileHover={{ rotate: 5 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Brain className="h-8 w-8 text-blue-600" />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Recallr
            </span>
          </motion.div>
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <Link key={item.name} href={item.href}>
                <motion.div
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 relative cursor-pointer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -1 }}
                >
                  {item.name}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <AnimatedButton variant="ghost" animation="hover" asChild>
                <Link href="/login">
                  Sign In
                </Link>
              </AnimatedButton>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.25 }}
            >
              <AnimatedButton variant="primary" animation="hover" asChild>
                <Link href="/signup">
                  Get Started
                </Link>
              </AnimatedButton>
            </motion.div>
          </div>
          <motion.button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.div>
          </motion.button>
        </div>
        <motion.div
          className="md:hidden overflow-hidden"
          initial={false}
          animate={{
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0,
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <div className="py-4 space-y-3">
            {navItems.map((item, index) => (
              <Link key={item.name} href={item.href}>
                <motion.div
                  className="block text-gray-600 hover:text-gray-900 font-medium transition-colors py-2 px-4 rounded-lg hover:bg-gray-50 cursor-pointer"
                  initial={false}
                  animate={{ 
                    opacity: isOpen ? 1 : 0,
                    x: isOpen ? 0 : -10
                  }}
                  transition={{ 
                    duration: 0.2, 
                    delay: isOpen ? index * 0.03 : 0,
                    ease: "easeOut"
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </motion.div>
              </Link>
            ))}
            <div className="pt-2 space-y-2">
              <AnimatedButton variant="ghost" animation="hover" className="w-full" asChild>
                <Link href="/login">
                  Sign In
                </Link>
              </AnimatedButton>
              <AnimatedButton variant="primary" animation="hover" className="w-full" asChild>
                <Link href="/signup">
                  Get Started
                </Link>
              </AnimatedButton>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
} 