"use client";

import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedButton } from "@/components/ui/animated-button";
import { SectionHeader } from "@/components/ui/section-header";
import { 
  Upload,
  Sparkles,
  RotateCcw,
  BarChart3
} from "lucide-react";
import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";

const steps = [
  {
    icon: Upload,
    title: "Save Content",
    description: "Upload PDFs, paste articles, or add web links you want to remember",
    details: "Supports multiple formats including PDF, text, URLs, and direct input",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    demo: {
      type: "upload",
      content: "Uploading: 'The Science of Learning.pdf'"
    }
  },
  {
    icon: Sparkles,
    title: "AI Processing",
    description: "Our AI instantly generates summaries and intelligent flashcards",
    details: "Advanced NLP extracts key concepts and creates optimal study materials",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    demo: {
      type: "processing",
      content: "Generating 12 flashcards from key concepts..."
    }
  },
  {
    icon: RotateCcw,
    title: "Spaced Review",
    description: "Review cards at scientifically optimized intervals",
    details: "Adaptive algorithm adjusts timing based on your performance",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    demo: {
      type: "review",
      content: "Next review: Tomorrow at 2:00 PM"
    }
  },
  {
    icon: BarChart3,
    title: "Track Progress",
    description: "Monitor your retention and build knowledge streaks",
    details: "Detailed analytics show your learning patterns and improvements",
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    demo: {
      type: "stats",
      content: "95% retention rate this week!"
    }
  }
];

function StepCard({ step, index, isActive }: { step: typeof steps[0], index: number, isActive: boolean }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  // Memoize animation variants for better performance
  const cardVariants = useMemo(() => ({
    inactive: { 
      scale: 1,
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
    },
    active: { 
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
    }
  }), []);

  const glowVariants = useMemo(() => ({
    inactive: { opacity: 0 },
    active: { 
      opacity: [0, 0.3, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }), []);

  return (
    <motion.div
      ref={cardRef}
      className="relative"
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      style={{ willChange: 'transform' }}
    >
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${step.color} blur-xl`}
        variants={glowVariants}
        animate={isActive ? "active" : "inactive"}
      />
      
      <motion.div
        variants={cardVariants}
        animate={isActive ? "active" : "inactive"}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ willChange: 'transform' }}
        className="rounded-xl h-full"
      >
        <Card 
          className={`relative h-full border-0 shadow-lg hover:shadow-2xl transition-shadow duration-300 ${
            isActive ? 'ring-2 ring-blue-400 ring-opacity-60' : ''
          }`}
        >
          <motion.div
            className={`absolute inset-0 ${step.bgColor}`}
            animate={{
              opacity: isActive ? 0.1 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
          
          <CardContent className="relative p-8 text-center space-y-6">
            <motion.div
              className={`inline-flex items-center justify-center rounded-xl  w-20 h-20 bg-gradient-to-r ${step.color} text-white shadow-lg ${
                isActive ? 'animate-pulse' : ''
              }`}
              whileHover={{ 
                scale: 1.1,
                transition: { duration: 0.2 }
              }}
              animate={isActive ? { 
                y: [0, -8, 0],
              } : { y: 0 }}
              transition={{ 
                duration: 2,
                repeat: isActive ? Infinity : 0,
                ease: "easeInOut"
              }}
              style={{ willChange: 'transform' }}
            >
              <step.icon className="h-10 w-10" />
            </motion.div>
            <div className="space-y-4">
              <motion.h3 
                className="text-2xl font-bold text-gray-900"
                animate={isActive ? { scale: 1.05 } : { scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{ willChange: 'transform' }}
              >
                {step.title}
              </motion.h3>
              
              <p className="text-gray-600 text-lg leading-relaxed">
                {step.description}
              </p>
              
              <motion.p 
                className="text-sm text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 1 : 0 }}
                transition={{ delay: 0.5 + index * 0.2 }}
              >
                {step.details}
              </motion.p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}


export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.3 });

  const nextStep = useCallback(() => {
    setActiveStep((prev) => (prev + 1) % steps.length);
  }, []);

  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(nextStep, 3000);
    return () => clearInterval(interval);
  }, [isInView, nextStep]);



  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden"
      id="how-it-works"
    >
      <div
        className="absolute top-20 right-10 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse"
        style={{ 
          animationDuration: '4s',
          willChange: 'opacity'
        }}
      />
      <div
        className="absolute bottom-20 left-10 w-40 h-40 bg-purple-200 rounded-full blur-3xl opacity-20 animate-pulse"
        style={{ 
          animationDuration: '5s',
          animationDelay: '1s',
          willChange: 'opacity'
        }}
      />

      <div className="container mx-auto max-w-7xl px-6">
        <SectionHeader
          subtitle="How It Works"
          title="Turn reading into"
          highlightedText="lasting knowledge"
          description="Our AI-powered system makes it effortless to remember what you learn with a scientifically-proven approach"
        />
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 auto-rows-fr"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, staggerChildren: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {steps.map((step, index) => (
            <StepCard
              key={index}
              step={step}
              index={index}
              isActive={index === activeStep}
            />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <AnimatedButton
            variant="primary"
            size="lg"
            animation="slide"
            asChild
          >
            <Link href="/signup">
              Start Learning Now
            </Link>
          </AnimatedButton>
          <p className="text-gray-600 mt-4 animate-pulse" style={{ animationDuration: '3s' }}>
            No credit card required • Free forever plan available
          </p>
        </motion.div>
      </div>
    </section>
  );
} 