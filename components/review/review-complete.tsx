"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button, LinkButton } from "@/components/ui/button";

interface ReviewCompleteProps {
  totalCards: number;
  totalQuizzes?: number;
  topicsCount: number;
  onBackToDashboard: () => void;
}

export function ReviewComplete({ 
  totalCards, 
  totalQuizzes = 0,
  topicsCount, 
  onBackToDashboard 
}: ReviewCompleteProps) {
  
  // Mock stats - replace with real calculated stats
  const mockStats = {
    streak: 6, // Updated streak
    avgRecallScore: 3.7,
    xpGained: 42,
    timeSpent: "12 min",
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-lg mx-auto rounded-2xl shadow-lg border-0 bg-white">
        <CardContent className="p-8 text-center space-y-8">
          {/* Congratulations Header */}
          <div className="space-y-4">
            <div className="text-4xl mb-4">🎉</div>
            <h1 className="text-2xl font-bold text-gray-900">
              You're done for today!
            </h1>
            <p className="text-muted-foreground">
              You reviewed {totalCards} flashcard{totalCards !== 1 ? 's' : ''}{totalQuizzes > 0 ? ` and ${totalQuizzes} quiz${totalQuizzes !== 1 ? 'ze' : ''}` : ''} across {topicsCount} topic{topicsCount !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
              <div className="text-2xl mb-1">🔥</div>
              <div className="text-sm text-muted-foreground">Streak</div>
              <div className="text-lg font-bold text-gray-900">
                {mockStats.streak} days
              </div>
            </div>

            <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
              <div className="text-2xl mb-1">🧠</div>
              <div className="text-sm text-muted-foreground">XP Gained</div>
              <div className="text-lg font-bold text-gray-900">
                +{mockStats.xpGained} XP
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded-xl border border-green-100">
              <div className="text-2xl mb-1">📈</div>
              <div className="text-sm text-muted-foreground">Avg Recall</div>
              <div className="text-lg font-bold text-gray-900">
                {mockStats.avgRecallScore}/5
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="text-2xl mb-1">⏱️</div>
              <div className="text-sm text-muted-foreground">Time Spent</div>
              <div className="text-lg font-bold text-gray-900">
                {mockStats.timeSpent}
              </div>
            </div>
          </div>

          {/* Achievement Message */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-700">
              <span className="font-semibold">Great work!</span> You maintained your streak and gained valuable XP. 
              Your next review session will be optimized based on today's performance.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={onBackToDashboard}
              size="lg"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium"
            >
              Back to Dashboard
            </Button>
            
            <LinkButton 
              variant="outline"
              size="lg"
              className="w-full h-12 rounded-xl font-medium border-slate-200 hover:bg-slate-50"
              href="/library"
            >
              Browse My Library
            </LinkButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 