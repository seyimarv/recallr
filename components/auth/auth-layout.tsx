"use client";

import * as React from "react";
import { Brain } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthLayout({ title, description, children, footer }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="relative">
              <Brain className="h-12 w-12" />
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl" />
            </div>
            <span className="text-3xl font-bold">Recallr</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            Transform your reading into lasting knowledge
          </h1>
          
          <p className="text-xl text-white/90 leading-relaxed">
            Join thousands of learners who are building permanent memories with AI-powered flashcards and spaced repetition.
          </p>

          <div className="mt-12 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span className="text-white/90">AI-powered flashcard generation</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span className="text-white/90">Scientifically-proven spaced repetition</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span className="text-white/90">Works with any content format</span>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl" />
        <div className="absolute bottom-32 left-16 w-24 h-24 bg-white/10 rounded-full blur-xl" />
        <div className="absolute top-1/2 right-8 w-16 h-16 bg-white/10 rounded-full blur-xl" />
      </div>

      {/* Right side - Auth form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Recallr
            </span>
          </div>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold text-gray-900">
                {title}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {children}
            </CardContent>
          </Card>

          {footer && (
            <div className="mt-6 text-center">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 