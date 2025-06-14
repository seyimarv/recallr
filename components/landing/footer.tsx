"use client";

import { motion } from "framer-motion";
import { Brain, Github, X, Linkedin, Mail } from "lucide-react";
import { useMemo } from "react";
import Link from "next/link";

export function Footer() {
  // Memoized animation variants for better performance
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

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  }), []);

  const links = {
    product: [
      { name: "Features", href: "#features" },
      { name: "How it Works", href: "#how-it-works" },
      { name: "Pricing", href: "#pricing" },
      { name: "Integrations", href: "#integrations" },
    ],
    company: [
      { name: "About", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
    ],
    resources: [
      { name: "Documentation", href: "/docs" },
      { name: "Help Center", href: "/help" },
      { name: "Community", href: "/community" },
      { name: "Status", href: "/status" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "GDPR", href: "/gdpr" },
    ],
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: X, href: "https://twitter.com", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Mail, href: "mailto:hello@recallr.com", label: "Email" },
  ];

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-purple-500/5 rounded-full blur-2xl" />

      <div className="container mx-auto max-w-7xl px-6 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="pt-16 pb-8"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 space-y-6"
            >
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{ willChange: 'transform' }}
              >
                <div className="relative">
                  <Brain className="h-10 w-10 text-blue-400" />
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Recallr
                </span>
              </motion.div>
              <p className="text-gray-400 leading-relaxed max-w-sm">
                Your second brain for lasting knowledge retention. Transform any
                content into permanent memories with AI-powered flashcards and
                spaced repetition.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200 group"
                    whileHover={{ 
                      scale: 1.05, 
                      y: -1,
                      transition: { duration: 0.2, ease: "easeOut" }
                    }}
                    whileTap={{ scale: 0.95 }}
                    style={{ willChange: 'transform' }}
                  >
                    <social.icon className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors duration-200" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h4 className="font-semibold text-lg mb-6 text-white">Product</h4>
              <ul className="space-y-3">
                {links.product.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href}>
                      <motion.div
                        className="text-gray-400 hover:text-white transition-colors duration-200 group flex items-center cursor-pointer"
                        whileHover={{ x: 2 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        style={{ willChange: 'transform' }}
                      >
                        {link.name}
                        <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          →
                        </span>
                      </motion.div>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="font-semibold text-lg mb-6 text-white">Company</h4>
              <ul className="space-y-3">
                {links.company.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href}>
                      <motion.div
                        className="text-gray-400 hover:text-white transition-colors duration-200 group flex items-center cursor-pointer"
                        whileHover={{ x: 2 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        style={{ willChange: 'transform' }}
                      >
                        {link.name}
                        <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          →
                        </span>
                      </motion.div>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="font-semibold text-lg mb-6 text-white">
                Resources
              </h4>
              <ul className="space-y-3">
                {links.resources.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href}>
                      <motion.div
                        className="text-gray-400 hover:text-white transition-colors duration-200 group flex items-center cursor-pointer"
                        whileHover={{ x: 2 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        style={{ willChange: 'transform' }}
                      >
                        {link.name}
                        <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          →
                        </span>
                      </motion.div>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="font-semibold text-lg mb-6 text-white">Legal</h4>
              <ul className="space-y-3">
                {links.legal.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href}>
                      <motion.div
                        className="text-gray-400 hover:text-white transition-colors duration-200 group flex items-center cursor-pointer"
                        whileHover={{ x: 2 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        style={{ willChange: 'transform' }}
                      >
                        {link.name}
                        <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          →
                        </span>
                      </motion.div>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          <motion.div
            variants={itemVariants}
            className="border-t border-gray-800 pt-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-center md:text-left">
                © 2024 Recallr. All rights reserved. Made with ❤️ for learners
                everywhere.
              </p>

              <motion.div
                className="flex items-center gap-6 text-sm text-gray-400"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{ willChange: 'transform' }}
              >
                <span>🌍 Available worldwide</span>
                <span>•</span>
                <span>⚡ 99.9% Uptime</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
