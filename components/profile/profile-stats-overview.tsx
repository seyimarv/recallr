"use client";

import * as React from "react";
import { ProfileStatCard } from "./profile-stat-card";
import { Brain, Flame, BookOpen, TrendingUp } from "lucide-react";

interface ProfileStatsOverviewProps {
  stats: {
    totalStudyTime: number;
    currentStreak: number;
    longestStreak: number;
    cardsReviewed: number;
    quizzesCompleted: number;
    topicsStudied: number;
    averageScore: number;
  };
}

export function ProfileStatsOverview({ stats }: ProfileStatsOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <ProfileStatCard
        icon={Brain}
        iconColor="text-blue-600"
        bgGradient="bg-gradient-to-br from-blue-50 to-blue-100"
        borderColor="border-blue-200"
        title="Study Time"
        value={stats.totalStudyTime}
        subtitle="hours this month"
        badge={{ text: `${stats.totalStudyTime}h total` }}
      />

      <ProfileStatCard
        icon={Flame}
        iconColor="text-orange-600"
        bgGradient="bg-gradient-to-br from-orange-50 to-orange-100"
        borderColor="border-orange-200"
        title="Current Streak"
        value={stats.currentStreak}
        subtitle="days in a row"
        badge={{ text: `Best: ${stats.longestStreak}` }}
      />

      <ProfileStatCard
        icon={BookOpen}
        iconColor="text-green-600"
        bgGradient="bg-gradient-to-br from-green-50 to-green-100"
        borderColor="border-green-200"
        title="Cards Reviewed"
        value={stats.cardsReviewed.toLocaleString()}
        subtitle="total flashcards"
        badge={{ text: `${stats.quizzesCompleted} quizzes` }}
      />

      <ProfileStatCard
        icon={TrendingUp}
        iconColor="text-purple-600"
        bgGradient="bg-gradient-to-br from-purple-50 to-purple-100"
        borderColor="border-purple-200"
        title="Avg. Score"
        value={`${stats.averageScore}%`}
        subtitle="across all quizzes"
        badge={{ text: `${stats.topicsStudied} topics` }}
      />
    </div>
  );
} 