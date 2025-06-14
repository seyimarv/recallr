"use client";

import { motion, useInView, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/section-header";
import { 
  Brain, 
  Target, 
  BookOpen, 
  TrendingUp, 
  Lightbulb, 
  CheckCircle,
  Sparkles
} from "lucide-react";
import { useRef, useState, useMemo, useCallback } from "react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Flashcards",
    description: "Automatically generate intelligent flashcards from any content using advanced natural language processing",
    details: "Our AI understands context and creates questions that test true comprehension, not just memorization",
    color: "from-blue-500 to-blue-600",
    bgGradient: "from-blue-50 to-blue-100",
    badge: "AI-Powered",
    stats: "99% accuracy"
  },
  {
    icon: Target,
    title: "Adaptive Spaced Repetition",
    description: "Review at scientifically optimized intervals that adapt to your learning patterns",
    details: "Algorithm adjusts based on your performance, focusing on cards you find challenging",
    color: "from-purple-500 to-purple-600",
    bgGradient: "from-purple-50 to-purple-100",
    badge: "Science-Based",
    stats: "3x faster learning"
  },
  {
    icon: BookOpen,
    title: "Multi-Format Support",
    description: "Works with PDFs, web articles, notes, videos, and more content types",
    details: "Drag and drop any file or paste URLs to instantly create study materials",
    color: "from-green-500 to-green-600",
    bgGradient: "from-green-50 to-green-100",
    badge: "Universal",
    stats: "20+ formats"
  },
  {
    icon: TrendingUp,
    title: "Progress Analytics",
    description: "Detailed insights into your learning patterns, retention rates, and improvement areas",
    details: "Beautiful charts and statistics help you optimize your study sessions",
    color: "from-orange-500 to-orange-600",
    bgGradient: "from-orange-50 to-orange-100",
    badge: "Data-Driven",
    stats: "Real-time tracking"
  },
  {
    icon: Lightbulb,
    title: "Smart Reminders",
    description: "Intelligent notifications that respect your schedule and learning preferences",
    details: "Never miss a review session with personalized, non-intrusive reminders",
    color: "from-yellow-500 to-yellow-600",
    bgGradient: "from-yellow-50 to-yellow-100",
    badge: "Personalized",
    stats: "95% engagement"
  },
  {
    icon: CheckCircle,
    title: "Active Recall Testing",
    description: "Self-quiz features that strengthen memory retrieval pathways",
    details: "Multiple testing modes including fill-in-the-blank, multiple choice, and essay questions",
    color: "from-indigo-500 to-indigo-600",
    bgGradient: "from-indigo-50 to-indigo-100",
    badge: "Proven Method",
    stats: "4x retention boost"
  }
];

function FeatureCard({ feature, index }: { feature: typeof features[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  // Ultra-smooth 3D effect with spring physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Use springs for smoother motion
  const springX = useSpring(mouseX, { stiffness: 150, damping: 50 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 50 });
  
  const rotateX = useTransform(springY, [-100, 100], [2, -2]);
  const rotateY = useTransform(springX, [-100, 100], [-2, 2]);

  // Optimized animation variants with reduced complexity
  const cardVariants = useMemo(() => ({
    initial: { opacity: 0, y: 50 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    hover: {
      y: -4,
      transition: { duration: 0.2, ease: "easeOut" }
    }
  }), [index]);

  const glowVariants = useMemo(() => ({
    inactive: { opacity: 0, scale: 0.8 },
    active: { 
      opacity: 0.15, 
      scale: 1,
      transition: { duration: 0.2, ease: "easeOut" }
    }
  }), []);

  const iconVariants = useMemo(() => ({
    inactive: { 
      scale: 1,
      rotateY: 0
    },
    active: { 
      scale: 1.05,
      rotateY: 5,
      transition: { duration: 0.2, ease: "easeOut" }
    }
  }), []);

  // Debounced mouse handling for ultra-smooth performance
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Further reduce sensitivity for smoother motion
    const x = (e.clientX - centerX) * 0.3;
    const y = (e.clientY - centerY) * 0.3;
    
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  }, [mouseX, mouseY]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="relative h-full"
      variants={cardVariants}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      whileHover="hover"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ 
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        perspective: 1000
      }}
    >
      <motion.div
        className="relative h-full"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          willChange: 'transform'
        }}
      >
        {/* Ultra-smooth glow effect */}
        <motion.div
          className={`absolute -inset-3 bg-gradient-to-r ${feature.color} rounded-2xl blur-lg`}
          variants={glowVariants}
          animate={isHovered ? "active" : "inactive"}
        />

        <Card className="relative h-full border-0 shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden bg-white backdrop-blur-sm">
          {/* Simplified background gradient */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient}`}
            animate={{
              opacity: isHovered ? 0.08 : 0,
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />

          {/* Minimal particle effect */}
          {isHovered && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(2)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-0.5 h-0.5 bg-gradient-to-r ${feature.color} rounded-full`}
                  style={{
                    left: `${40 + i * 20}%`,
                    top: `${40 + i * 10}%`,
                  }}
                  initial={{ opacity: 0, scale: 0, y: 0 }}
                  animate={{
                    opacity: [0, 0.4, 0],
                    scale: [0, 1, 0],
                    y: [-15, -30],
                  }}
                  transition={{
                    duration: 1,
                    delay: i * 0.2,
                    ease: "easeOut"
                  }}
                />
              ))}
            </div>
          )}

          <CardContent className="relative p-8 h-full flex flex-col">
            {/* Badge */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.08 + 0.1 }}
            >
              <Badge 
                className={`bg-gradient-to-r ${feature.color} text-white border-0 shadow-sm`}
              >
                <Sparkles className="w-3 h-3 mr-1" />
                {feature.badge}
              </Badge>
            </motion.div>

            {/* Ultra-smooth icon */}
            <motion.div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} text-white shadow-md mb-6`}
              variants={iconVariants}
              animate={isHovered ? "active" : "inactive"}
              style={{
                transformStyle: "preserve-3d",
                willChange: 'transform',
                backfaceVisibility: 'hidden'
              }}
            >
              <feature.icon className="h-8 w-8" />
            </motion.div>

            {/* Content */}
            <div className="flex-1 space-y-4">
              <motion.h3 
                className="text-xl font-bold text-gray-900"
                animate={isHovered ? { y: -1 } : { y: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{ willChange: 'transform' }}
              >
                {feature.title}
              </motion.h3>

              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {feature.details}
              </p>
            </div>
            <motion.div
              className="mt-6 pt-4 border-t border-gray-100"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 + 0.3 }}
            >
              <motion.div
                className={`text-sm font-semibold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}
                animate={isHovered ? { scale: 1.02 } : { scale: 1 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{ willChange: 'transform' }}
              >
                {feature.stats}
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

export function FeaturesSection() {
  const sectionRef = useRef(null);

  // Ultra-optimized animation variants
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }), []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden"
      id="features"
    >
      {/* Simplified background effects */}
      <motion.div
        className="absolute top-1/4 -right-1/4 w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-3xl opacity-5"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full blur-3xl opacity-5"
        animate={{
          scale: [1.05, 1, 1.05],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none opacity-50" />

      <div className="container mx-auto max-w-7xl px-6 relative">
        <SectionHeader
          subtitle="Powerful Features"
          title="Everything you need to"
          highlightedText="remember"
          description="Advanced features designed for effective learning, powered by cutting-edge AI and proven cognitive science"
        />

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              index={index}
            />
          ))}
        </motion.div>
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-600 mb-8">
            Ready to supercharge your learning?
          </p>
          
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            {[
              "🚀 Free to start",
              "⚡ Setup in 60 seconds",
              "🔒 Your data is secure",
              "📱 Works everywhere"
            ].map((text, index) => (
              <motion.div
                key={text}
                className="bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-gray-700 border border-gray-200"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -1 }}
                style={{ willChange: 'transform' }}
              >
                {text}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 