"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import Link from "next/link";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileStatsOverview } from "@/components/profile/profile-stats-overview";
import { WeeklyGoalProgress } from "@/components/profile/weekly-goal-progress";
import { AchievementsSection } from "@/components/profile/achievements-section";
import { RecentActivitySection } from "@/components/profile/recent-activity-section";

// Mock data - in real app this would come from API/database
const profileData = {
  user: {
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    avatar: "/api/placeholder/120/120",
    bio: "Passionate learner focused on technology and languages. Currently studying JavaScript, Python, and French.",
    joinDate: "March 2024",
    location: "San Francisco, CA"
  },
  stats: {
    totalStudyTime: 127,
    currentStreak: 12,
    longestStreak: 28,
    cardsReviewed: 2847,
    quizzesCompleted: 156,
    topicsStudied: 24,
    averageScore: 87,
    weeklyGoal: 5,
    weeklyProgress: 4
  },
  achievements: [
    { id: 1, name: "First Steps", description: "Completed your first review", icon: "🎯", earned: true },
    { id: 2, name: "Week Warrior", description: "7-day study streak", icon: "🔥", earned: true },
    { id: 3, name: "Quiz Master", description: "Scored 100% on 10 quizzes", icon: "🏆", earned: true },
    { id: 4, name: "Consistent Learner", description: "30-day study streak", icon: "⭐", earned: false },
    { id: 5, name: "Topic Explorer", description: "Study 50 different topics", icon: "🗺️", earned: false }
  ],
  recentActivity: [
    { type: "quiz" as const, title: "JavaScript Fundamentals", score: 92, date: "2 hours ago" },
    { type: "flashcard" as const, title: "French Vocabulary Set 3", progress: 85, date: "5 hours ago" },
    { type: "achievement" as const, title: "Earned 'Quiz Master' badge", date: "Yesterday" },
    { type: "study" as const, title: "Python Data Structures", time: 45, date: "Yesterday" }
  ]
};

export default function ProfilePage() {
  return (
    <div className="p-4 md:p-6 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-muted-foreground">Track your learning journey and achievements</p>
        </div>
        <Link href="/settings">
          <Button variant="outline" className="rounded-xl">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </Link>
      </div>

      {/* Profile Header */}
      <ProfileHeader user={profileData.user} />

      {/* Stats Overview */}
      <ProfileStatsOverview stats={profileData.stats} />

      {/* Weekly Goal Progress */}
      <WeeklyGoalProgress 
        weeklyProgress={profileData.stats.weeklyProgress}
        weeklyGoal={profileData.stats.weeklyGoal}
      />

      {/* Achievements & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AchievementsSection achievements={profileData.achievements} />
        <RecentActivitySection activities={profileData.recentActivity} />
      </div>
    </div>
  );
} 