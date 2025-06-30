"use client";
import * as React from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardStatsCards } from "@/components/dashboard/dashboard-stats-cards";
import { DailyReviewCard } from "@/components/dashboard/daily-review-card";
import { StreakSummary } from "@/components/dashboard/streak-summary";
import { RecentResources } from "@/components/dashboard/recent-resources";
import { RetentionChart } from "@/components/dashboard/retention-chart";
import { WeeklyGoal } from "@/components/dashboard/weekly-goal";
import { TopicMastery } from "@/components/dashboard/topic-mastery";

export default function DashboardPage() {
  const mockUser = {
    name: "Alex",
    currentStreak: 5,
    longestStreak: 12,
    xp: 2450,
    level: 8,
  };

  // Mock dashboard stats - replace with real data from your API
  const dashboardStats = {
    totalResources: 12,
    totalFlashcards: 156,
    totalQuizzes: 8,
    todayReview: {
      flashcards: 23,
      quizzes: 2,
      topics: 5
    },
    weeklyProgress: {
      studiedDays: 5,
      targetDays: 7,
      minutesStudied: 180,
      targetMinutes: 300
    },
    topTopics: [
      { name: "Cardiovascular Physiology", mastery: 85, resources: 3 },
      { name: "Neuroscience", mastery: 92, resources: 2 },
      { name: "Cell Biology", mastery: 78, resources: 4 }
    ],
    recentActivity: {
      lastStudied: "2 hours ago",
      recentQuizScore: 88,
      improvedTopics: 2
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header with enhanced greeting */}
      <DashboardHeader mockUser={mockUser} dashboardStats={dashboardStats} />

      {/* Main dashboard grid */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left column - Main content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Daily review - most important */}
          <DailyReviewCard />

          {/* Quick stats cards */}
          <DashboardStatsCards dashboardStats={dashboardStats} />

          {/* Recent resources */}
          <RecentResources />
        </div>

        {/* Right column - Secondary content */}
        <div className="lg:col-span-4 space-y-6">
          {/* Streak and XP */}
          <StreakSummary 
            currentStreak={mockUser.currentStreak}
            longestStreak={mockUser.longestStreak}
            xp={mockUser.xp}
            level={mockUser.level}
          />

          {/* Topic Mastery */}
          <TopicMastery topTopics={dashboardStats.topTopics} />

          {/* Weekly Goal component */}
          <WeeklyGoal />
        </div>

        {/* Full width retention chart */}
        <div className="lg:col-span-12">
          <RetentionChart />
        </div>
      </div>
    </div>
  );
} 