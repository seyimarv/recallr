"use client";

import * as React from "react";
import { Flame } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StreakSummaryProps {
  currentStreak: number;
  longestStreak: number;
  xp: number;
  level: number;
}

export function StreakSummary({ 
  currentStreak, 
  longestStreak, 
  xp, 
  level 
}: StreakSummaryProps) {
  // Calculate XP progress for current level (mock calculation)
  const xpProgress = (xp % 500) / 500 * 100;

  return (
    <Card className="rounded-2xl border-0 bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-lg font-semibold">
          <div className="p-2 bg-orange-50 rounded-xl">
            <Flame className="h-5 w-5 text-orange-600" />
          </div>
          Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Streak */}
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="text-xl">🔥</div>
            <span className="font-medium text-gray-900">Current Streak</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">
            {currentStreak}
          </span>
        </div>

        {/* Longest Streak */}
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="text-xl">🏆</div>
            <span className="font-medium text-gray-900">Best Streak</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">
            {longestStreak}
          </span>
        </div>

        {/* Level & XP */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-xl">⭐</div>
              <span className="font-medium text-gray-900">Level {level}</span>
            </div>
            <span className="text-sm text-muted-foreground font-medium">{xp.toLocaleString()} XP</span>
          </div>
          
          {/* XP Progress Bar */}
          <div className="space-y-1.5">
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
            <div className="text-xs text-muted-foreground text-center">
              {Math.round(xpProgress)}% to Level {level + 1}
            </div>
          </div>
        </div>

        {/* XP Breakdown */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-slate-50 rounded-xl">
            <div className="text-xl mb-1">⚡</div>
            <div className="text-xs text-muted-foreground mb-1">Daily XP</div>
            <div className="text-sm font-bold text-gray-900">+150</div>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-xl">
            <div className="text-xl mb-1">🎯</div>
            <div className="text-xs text-muted-foreground mb-1">Bonus XP</div>
            <div className="text-sm font-bold text-gray-900">+75</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 