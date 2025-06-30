"use client";

import * as React from "react";

interface DashboardStatsCardsProps {
  dashboardStats: {
    todayReview: {
      flashcards: number;
      quizzes: number;
      topics: number;
    };
    weeklyProgress: {
      studiedDays: number;
      targetDays: number;
      minutesStudied: number;
      targetMinutes: number;
    };
    recentActivity: {
      lastStudied: string;
      recentQuizScore: number;
      improvedTopics: number;
    };
  };
}

export function DashboardStatsCards({ dashboardStats }: DashboardStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Today's Progress */}
      <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
        <div className="text-2xl mb-2">📈</div>
        <h3 className="font-semibold text-gray-900 mb-1">Today's Focus</h3>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Flashcards due</span>
            <span className="font-medium">{dashboardStats.todayReview.flashcards}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Quizzes scheduled</span>
            <span className="font-medium">{dashboardStats.todayReview.quizzes}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Topics to review</span>
            <span className="font-medium">{dashboardStats.todayReview.topics}</span>
          </div>
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200">
        <div className="text-2xl mb-2">🎯</div>
        <h3 className="font-semibold text-gray-900 mb-1">Weekly Goal</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Study days</span>
            <span className="font-medium">{dashboardStats.weeklyProgress.studiedDays}/{dashboardStats.weeklyProgress.targetDays}</span>
          </div>
          <div className="w-full bg-green-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all" 
              style={{ width: `${(dashboardStats.weeklyProgress.studiedDays / dashboardStats.weeklyProgress.targetDays) * 100}%` }}
            ></div>
          </div>
          <div className="text-xs text-muted-foreground">
            {dashboardStats.weeklyProgress.minutesStudied} min studied this week
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200">
        <div className="text-2xl mb-2">⚡</div>
        <h3 className="font-semibold text-gray-900 mb-1">Recent Activity</h3>
        <div className="space-y-1 text-sm">
          <div className="text-muted-foreground">Last studied {dashboardStats.recentActivity.lastStudied}</div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Latest quiz score</span>
            <span className="font-medium text-green-600">{dashboardStats.recentActivity.recentQuizScore}%</span>
          </div>
          <div className="text-xs text-purple-600 font-medium">
            +{dashboardStats.recentActivity.improvedTopics} topics improved
          </div>
        </div>
      </div>
    </div>
  );
} 