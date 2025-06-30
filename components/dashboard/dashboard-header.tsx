"use client";

import * as React from "react";

interface DashboardHeaderProps {
  mockUser: {
    name: string;
    level: number;
    currentStreak: number;
  };
  dashboardStats: {
    totalResources: number;
    totalFlashcards: number;
    totalQuizzes: number;
  };
}

export function DashboardHeader({ mockUser, dashboardStats }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Hello, {mockUser.name} 👋
        </h1>
        <p className="text-muted-foreground">Welcome back to your learning hub</p>
        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
          <span>📚 {dashboardStats.totalResources} resources</span>
          <span>🔄 {dashboardStats.totalFlashcards} flashcards</span>
          <span>🧠 {dashboardStats.totalQuizzes} quizzes</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-2xl border border-blue-100">
          <span className="text-xl">⚡</span>
          <span className="text-base font-semibold text-blue-600">
            Level {mockUser.level}
          </span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 rounded-2xl border border-orange-100">
          <span className="text-xl">🔥</span>
          <span className="text-base font-semibold text-orange-600">
            {mockUser.currentStreak}-day streak
          </span>
        </div>
      </div>
    </div>
  );
} 