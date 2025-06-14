"use client";

import { motion, useInView } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/section-header";
import { 
  Check, 
  Star, 
  Zap, 
  Crown, 
  Users, 
  Sparkles,
  Brain,
  Target,
  TrendingUp
} from "lucide-react";
import { useRef, useState, useMemo, useCallback } from "react";
import Link from "next/link";

const pricingPlans = [
  {
    name: "Free",
    price: { monthly: 0, annual: 0 },
    description: "Perfect for getting started with spaced repetition",
    icon: Brain,
    color: "from-gray-500 to-gray-600",
    bgColor: "from-gray-50 to-gray-100",
    popular: false,
    features: [
      "50 flashcards per month",
      "Basic spaced repetition",
      "PDF import",
      "Web article saving",
      "Mobile app access",
      "Basic analytics"
    ],
    limitations: [
      "Limited AI generation",
      "No advanced features"
    ],
    cta: "Get Started Free",
    subtitle: "No credit card required"
  },
  {
    name: "Pro",
    price: { monthly: 12, annual: 8 },
    description: "Unlock the full power of AI-enhanced learning",
    icon: Zap,
    color: "from-blue-500 to-purple-600",
    bgColor: "from-blue-50 to-purple-100",
    popular: true,
    features: [
      "Unlimited flashcards",
      "Advanced AI generation",
      "Custom spaced repetition",
      "All file formats supported",
      "Priority support",
      "Advanced analytics",
      "Export capabilities",
      "Team collaboration",
      "API access"
    ],
    limitations: [],
    cta: "Start Pro Trial",
    subtitle: "7-day free trial"
  },
  {
    name: "Enterprise",
    price: { monthly: 49, annual: 39 },
    description: "Built for teams and organizations",
    icon: Crown,
    color: "from-purple-500 to-pink-600",
    bgColor: "from-purple-50 to-pink-100",
    popular: false,
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "Advanced admin controls",
      "Custom integrations",
      "Dedicated support",
      "SLA guarantee",
      "Custom branding",
      "Advanced security",
      "Training & onboarding"
    ],
    limitations: [],
    cta: "Contact Sales",
    subtitle: "Custom pricing available"
  }
];

function PricingCard({ plan, index, isAnnual }: { plan: typeof pricingPlans[0], index: number, isAnnual: boolean }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  const price = isAnnual ? plan.price.annual : plan.price.monthly;
  const originalPrice = plan.price.monthly;
  const savings = plan.price.monthly > 0 ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  // Memoized animation variants for better performance
  const cardVariants = useMemo(() => ({
    initial: { opacity: 0, y: 50 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, delay: index * 0.1, ease: "easeOut" }
    },
    hover: {
      y: -8,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  }), [index]);

  const glowVariants = useMemo(() => ({
    inactive: { opacity: 0, scale: 0.9 },
    active: { 
      opacity: plan.popular ? 0.15 : 0.1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  }), [plan.popular]);

  const iconVariants = useMemo(() => ({
    inactive: { 
      scale: 1,
      rotateY: 0
    },
    active: { 
      scale: 1.05,
      rotateY: 5,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  }), []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <motion.div
      ref={cardRef}
      className={`relative h-full ${plan.popular ? 'scale-105 z-10' : ''}`}
      variants={cardVariants}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      whileHover="hover"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ willChange: 'transform' }}
    >
      {/* Popular badge */}
      {plan.popular && (
        <motion.div
          className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
        >
          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 text-sm font-semibold shadow-lg border-0">
            <Star className="w-4 h-4 mr-1" />
            Most Popular
          </Badge>
        </motion.div>
      )}

      {/* Optimized glow effect */}
      <motion.div
        className={`absolute -inset-3 bg-gradient-to-r ${plan.color} rounded-2xl blur-lg`}
        variants={glowVariants}
        animate={isHovered || plan.popular ? "active" : "inactive"}
      />

      <Card 
        className={`relative h-full border-0 shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden ${
          plan.popular ? 'ring-2 ring-blue-400 ring-opacity-60' : ''
        }`}
      >
        {/* Simplified background gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${plan.bgColor}`}
          animate={{
            opacity: isHovered || plan.popular ? 0.08 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />

        {/* Minimal particle effect */}
        {isHovered && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(2)].map((_, i) => (
            <motion.div
              key={i}
                className={`absolute w-0.5 h-0.5 bg-gradient-to-r ${plan.color} rounded-full`}
              style={{
                  left: `${30 + i * 25}%`,
                  top: `${30 + i * 15}%`,
              }}
                initial={{ opacity: 0, scale: 0, y: 0 }}
                animate={{
                  opacity: [0, 0.4, 0],
                scale: [0, 1, 0],
                  y: [-15, -35],
                }}
              transition={{
                  duration: 1.2,
                  delay: i * 0.2,
                  ease: "easeOut"
              }}
            />
          ))}
        </div>
        )}

        <CardHeader className="relative text-center pb-8">
          {/* Optimized icon */}
          <motion.div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${plan.color} text-white shadow-md mb-6 mx-auto`}
            variants={iconVariants}
            animate={isHovered ? "active" : "inactive"}
            style={{ willChange: 'transform' }}
          >
            <plan.icon className="h-8 w-8" />
          </motion.div>

          {/* Plan name */}
          <motion.h3 
            className="text-2xl font-bold text-gray-900 mb-2"
            animate={isHovered ? { scale: 1.02 } : { scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ willChange: 'transform' }}
          >
            {plan.name}
          </motion.h3>

          <p className="text-gray-600 mb-6">{plan.description}</p>

          {/* Simplified pricing */}
          <div className="mb-6">
            {plan.price.monthly === 0 ? (
              <div className="text-4xl font-bold text-gray-900">
                Free
              </div>
            ) : (
              <div className="space-y-2">
                <motion.div 
                  className="flex items-baseline justify-center gap-2"
                  animate={isHovered ? { scale: 1.02 } : { scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{ willChange: 'transform' }}
                >
                  <span className="text-4xl font-bold text-gray-900">${price}</span>
                  <span className="text-gray-600">/month</span>
                </motion.div>
                
                {isAnnual && savings > 0 && (
                  <motion.div
                    className="flex items-center justify-center gap-2"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                  >
                    <span className="text-sm text-gray-500 line-through">${originalPrice}/month</span>
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      Save {savings}%
                    </Badge>
                  </motion.div>
                )}
              </div>
            )}
          </div>

          {/* CTA Button */}
          <AnimatedButton
            animation="slide"
            className={`w-full py-3 text-lg font-semibold shadow-md ${
              plan.popular 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0' 
                : 'bg-white text-gray-900 border-2 border-gray-200 hover:bg-gray-50'
            }`}
            asChild
          >
                        <Link href={plan.name === 'Enterprise' ? '/contact' : '/signup'}>
              {plan.cta}
            </Link>
          </AnimatedButton>

          <p className="text-sm text-gray-500 mt-3">{plan.subtitle}</p>
        </CardHeader>

        <CardContent className="relative">
          {/* Features list */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 mb-4">What&apos;s included:</h4>
            <ul className="space-y-3">
              {plan.features.map((feature, featureIndex) => (
                <motion.li
                  key={feature}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.4, delay: index * 0.1 + featureIndex * 0.05 }}
                >
                  <motion.div
                    className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Check className="w-3 h-3 text-green-600" />
                  </motion.div>
                  <span className="text-gray-700">{feature}</span>
                </motion.li>
              ))}
            </ul>

            {/* Limitations */}
            {plan.limitations.length > 0 && (
              <div className="pt-4 border-t border-gray-100">
                <ul className="space-y-2">
                  {plan.limitations.map((limitation, limitIndex) => (
                    <motion.li
                      key={limitation}
                      className="flex items-center gap-3 text-sm text-gray-500"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: index * 0.1 + limitIndex * 0.05 + 0.3, duration: 0.3 }}
                    >
                      <div className="w-4 h-4 border border-gray-300 rounded flex-shrink-0" />
                      {limitation}
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);
  const sectionRef = useRef(null);

  // Memoized animation variants
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }), []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden"
      id="pricing"
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

      <div className="container mx-auto max-w-7xl px-6 relative">
        <SectionHeader
          subtitle="Simple Pricing"
          title="Choose your"
          highlightedText="learning plan"
          description="Start free and upgrade as you grow. All plans include our core features with no hidden fees."
          className="mb-4"
        />

        {/* Optimized billing toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-16"
        >
            <span className={`text-lg font-medium transition-colors ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <motion.button
              className="relative w-16 h-8 bg-gray-200 rounded-full p-1 transition-colors duration-300"
              style={{
                backgroundColor: isAnnual ? '#3B82F6' : '#E5E7EB',
              }}
              onClick={() => setIsAnnual(!isAnnual)}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-6 h-6 bg-white rounded-full shadow-sm"
                animate={{
                  x: isAnnual ? 32 : 0,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            </motion.button>
            <span className={`text-lg font-medium transition-colors ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Annual
            </span>
            {isAnnual && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="ml-2"
              >
                <Badge className="bg-green-100 text-green-800">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Save up to 33%
                </Badge>
              </motion.div>
            )}
        </motion.div>

        {/* Pricing cards */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 auto-rows-fr"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              index={index}
              isAnnual={isAnnual}
            />
          ))}
        </motion.div>

        {/* Simplified bottom section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-600 mb-8">
            All plans include 24/7 support and a 30-day money-back guarantee
          </p>
          
          <motion.div className="flex flex-wrap justify-center gap-6">
            {[
              { icon: Target, text: "30-day free trial" },
              { icon: TrendingUp, text: "Cancel anytime" },
              { icon: Users, text: "24/7 support" },
            ].map((item, index) => (
              <motion.div
                key={item.text}
                className="flex items-center gap-3 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-200"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -1 }}
                style={{ willChange: 'transform' }}
              >
                <div className="p-2 bg-blue-100 rounded-lg">
                  <item.icon className="h-4 w-4 text-blue-600" />
                </div>
                <span className="font-medium text-gray-700">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 