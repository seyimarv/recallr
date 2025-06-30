"use client";

import * as React from "react";
import { Target, Calendar, CheckCircle, Brain, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/button";

export function WeeklyGoal() {
  // Mock data - updated to include both flashcards and quizzes
  const mockGoal = {
    flashcardTarget: 150,
    flashcardProgress: 103,
    quizTarget: 5,
    quizProgress: 3,
    daysRemaining: 2,
    weeklyStreak: 3,
    studyTimeTarget: 300, // minutes
    studyTimeProgress: 225, // minutes
  };

  const flashcardPercentage = Math.min((mockGoal.flashcardProgress / mockGoal.flashcardTarget) * 100, 100);
  const quizPercentage = Math.min((mockGoal.quizProgress / mockGoal.quizTarget) * 100, 100);
  const timePercentage = Math.min((mockGoal.studyTimeProgress / mockGoal.studyTimeTarget) * 100, 100);
  
  const isFlashcardGoalCompleted = mockGoal.flashcardProgress >= mockGoal.flashcardTarget;
  const isQuizGoalCompleted = mockGoal.quizProgress >= mockGoal.quizTarget;
  const isTimeGoalCompleted = mockGoal.studyTimeProgress >= mockGoal.studyTimeTarget;
  
  const overallProgress = (flashcardPercentage + quizPercentage + timePercentage) / 3;
  const allGoalsCompleted = isFlashcardGoalCompleted && isQuizGoalCompleted && isTimeGoalCompleted;

  return (
    <Card className="rounded-2xl border-0 bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-lg font-semibold">
          <div className="p-2 bg-emerald-50 rounded-xl">
            <Target className="h-5 w-5 text-emerald-600" />
          </div>
          Weekly Goals
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">
              Overall Progress
            </span>
            <span className="text-sm text-muted-foreground font-medium">
              {Math.round(overallProgress)}%
            </span>
          </div>
          
          {/* Overall Progress Bar */}
          <div className="w-full bg-slate-100 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ${
                allGoalsCompleted 
                  ? 'bg-gradient-to-r from-emerald-500 to-green-500' 
                  : 'bg-gradient-to-r from-emerald-400 to-emerald-500'
              }`}
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        {/* Individual Goal Progress */}
        <div className="space-y-3">
          {/* Flashcards Goal */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-blue-600" />
                <span className="text-xs font-medium text-gray-900">Flashcards</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {mockGoal.flashcardProgress}/{mockGoal.flashcardTarget}
              </span>
            </div>
            <div className="w-full bg-blue-100 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${flashcardPercentage}%` }}
              />
            </div>
          </div>

          {/* Quizzes Goal */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-purple-600" />
                <span className="text-xs font-medium text-gray-900">Quizzes</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {mockGoal.quizProgress}/{mockGoal.quizTarget}
              </span>
            </div>
            <div className="w-full bg-purple-100 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all"
                style={{ width: `${quizPercentage}%` }}
              />
            </div>
          </div>

          {/* Study Time Goal */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-green-600" />
                <span className="text-xs font-medium text-gray-900">Study Time</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {mockGoal.studyTimeProgress}/{mockGoal.studyTimeTarget} min
              </span>
            </div>
            <div className="w-full bg-green-100 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all"
                style={{ width: `${timePercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Status Cards */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="text-lg">📅</div>
              <span className="text-sm font-medium text-gray-900">Days Left</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              {mockGoal.daysRemaining}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="text-lg">🔥</div>
              <span className="text-sm font-medium text-gray-900">Study Streak</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              {mockGoal.weeklyStreak}
            </span>
          </div>
        </div>

        {/* Goal Status Message */}
        {allGoalsCompleted ? (
          <div className="p-3 bg-emerald-50 rounded-xl text-center border border-emerald-100">
            <div className="text-sm text-emerald-800 font-semibold">
              🎉 Amazing! All weekly goals completed!
            </div>
            <div className="text-xs text-emerald-600 mt-1">
              You're on fire this week! Keep up the excellent work.
            </div>
          </div>
        ) : (
          <div className="p-3 bg-amber-50 rounded-xl text-center border border-amber-100">
            <div className="text-sm text-amber-800">
              <div className="font-semibold mb-1">This week's remaining goals:</div>
              <div className="space-y-1">
                {!isFlashcardGoalCompleted && (
                  <div className="text-xs">
                    📚 {mockGoal.flashcardTarget - mockGoal.flashcardProgress} flashcards
                  </div>
                )}
                {!isQuizGoalCompleted && (
                  <div className="text-xs">
                    🧠 {mockGoal.quizTarget - mockGoal.quizProgress} quizzes
                  </div>
                )}
                {!isTimeGoalCompleted && (
                  <div className="text-xs">
                    ⏱️ {mockGoal.studyTimeTarget - mockGoal.studyTimeProgress} minutes
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-2.5">
          <LinkButton 
            variant="outline" 
            className="w-full rounded-xl border-slate-200 hover:bg-slate-50" 
            size="sm"
            href="/settings"
          >
            Adjust Goals
          </LinkButton>
          
          {!allGoalsCompleted && (
            <LinkButton 
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium" 
              size="sm"
              href="/review"
            >
              Continue Studying
            </LinkButton>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 