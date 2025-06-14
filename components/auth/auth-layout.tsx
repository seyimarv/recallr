"use client";

import * as React from "react";
import { Brain } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  description?: string;
}

export function AuthLayout({
  title,
  children,
  footer,
  description,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.5) 2px, transparent 2px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.5) 2px, transparent 2px)
            `,
            backgroundSize: "120px 120px",
          }}
        />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        <div className="w-full max-w-md space-y-4">
          <div className="flex items-center justify-center">
            <div className="relative group">
              <div className="relative flex items-center gap-3 px-6 py-3">
                <Brain className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Recallr
                </span>
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          </div>
          {description && (
            <div className="text-center">
              <p className="text-gray-600">{description}</p>
            </div>
          )}

          {/* Auth Form Card */}
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-md ring-1 ring-white/40">
            <CardContent className="p-8">{children}</CardContent>
          </Card>
          {footer && (
            <div className="text-center">
              <div className="p-4 rounded-lg bg-white/60 backdrop-blur-sm border border-white/30">
                {footer}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
