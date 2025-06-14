import { motion } from "framer-motion";
import { useMemo } from "react";

interface SectionHeaderProps {
  subtitle: string;
  title: string;
  highlightedText?: string;
  description: string;
  className?: string;
}

export function SectionHeader({ 
  subtitle, 
  title, 
  highlightedText, 
  description, 
  className = "" 
}: SectionHeaderProps) {
  // Memoized animation variants for performance
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }), []);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`text-center mb-20 ${className}`}
    >
      <motion.div variants={itemVariants}>
        <span className="inline-block text-blue-600 font-semibold text-lg mb-4">
          {subtitle}
        </span>
      </motion.div>

      <motion.h2 
        className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
        variants={itemVariants}
      >
        {title}{" "}
        {highlightedText && (
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            {highlightedText}
          </span>
        )}
      </motion.h2>

      <motion.p 
        className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
        variants={itemVariants}
      >
        {description}
      </motion.p>
    </motion.div>
  );
} 