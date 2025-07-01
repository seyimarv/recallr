"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target } from "lucide-react";

interface WeeklyGoalProgressProps {
  weeklyProgress: number;
  weeklyGoal: number;
}

export function WeeklyGoalProgress({ weeklyProgress, weeklyGoal }: WeeklyGoalProgressProps) {
  const progressPercentage = (weeklyProgress / weeklyGoal) * 100;
  const remainingDays = weeklyGoal - weeklyProgress;

  return (
    <Card className="rounded-2xl border-0 bg-white shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3">
          <Target className="h-5 w-5 text-green-600" />
          Weekly Study Goal
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Progress this week</span>
          <span className="text-sm text-muted-foreground">
            {weeklyProgress}/{weeklyGoal} days
          </span>
        </div>
        <Progress 
          value={progressPercentage} 
          className="h-3 rounded-full"
        />
        <p className="text-xs text-muted-foreground">
          {remainingDays > 0 
            ? `${remainingDays} more days to reach your goal!`
            : "🎉 Goal achieved! Keep up the great work!"
          }
        </p>
      </CardContent>
    </Card>
  );
} 