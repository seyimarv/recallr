"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, RefreshCw, Brain, ArrowRight, Calendar } from "lucide-react";

export function DailyReviewCard() {
  
  // Mock data - replace with real data from your API
  const flashcardsData = {
    dueToday: 23,
    nextReviewTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
  };

  const quizzesData = {
    dueToday: 2,
    scheduledQuizzes: [
      { id: "1", title: "Cardiovascular System", topic: "Cardiology", dueIn: "1 hour" },
      { id: "2", title: "Nervous System Basics", topic: "Neuroscience", dueIn: "3 hours" }
    ]
  };

  const [timeUntilNext, setTimeUntilNext] = React.useState("");

  React.useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const timeDiff = flashcardsData.nextReviewTime.getTime() - now.getTime();
      
      if (timeDiff > 0) {
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeUntilNext(`${hours}h ${minutes}m`);
      } else {
        setTimeUntilNext("Due now");
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [flashcardsData.nextReviewTime]);

  return (
    <Card className="p-6 rounded-2xl border-0 shadow-sm">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              Daily Review
            </h2>
            <p className="text-sm text-muted-foreground">
              Keep your knowledge fresh with spaced repetition
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Next review in</div>
            <div className="text-lg font-semibold text-blue-600">{timeUntilNext}</div>
          </div>
        </div>

        {/* Content Cards */}
        <div className="space-y-4">
          {/* Flashcards */}
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-gray-900">Flashcards</span>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200 rounded-full">
                {flashcardsData.dueToday} due
              </Badge>
            </div>
            <p className="text-sm text-blue-800 mb-3">
              Review your spaced repetition flashcards to strengthen retention
            </p>
            <LinkButton 
              size="sm" 
              className="w-full rounded-xl bg-blue-600 hover:bg-blue-700"
              href="/review"
            >
              Start Flashcard Review
              <ArrowRight className="h-4 w-4 ml-2" />
            </LinkButton>
          </div>

          {/* Quizzes */}
          <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-gray-900">Quizzes</span>
              </div>
              <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200 rounded-full">
                {quizzesData.dueToday} scheduled
              </Badge>
            </div>
            <p className="text-sm text-purple-800 mb-3">
              Test your knowledge with comprehensive topic quizzes
            </p>
            
            {/* Scheduled Quiz List */}
            {quizzesData.scheduledQuizzes.length > 0 && (
              <div className="space-y-2 mb-3">
                {quizzesData.scheduledQuizzes.slice(0, 2).map((quiz) => (
                  <div key={quiz.id} className="flex items-center justify-between text-xs">
                    <span className="text-purple-900 font-medium">{quiz.title}</span>
                    <span className="text-purple-600">{quiz.dueIn}</span>
                  </div>
                ))}
              </div>
            )}
            
            <LinkButton 
              size="sm" 
              variant="outline"
              className="w-full rounded-xl border-purple-200 text-purple-700 hover:bg-purple-100"
              href="/quizzes"
            >
              View All Quizzes
              <ArrowRight className="h-4 w-4 ml-2" />
            </LinkButton>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Today's goal</span>
            </div>
            <div className="text-gray-900 font-medium">
              {flashcardsData.dueToday + quizzesData.dueToday} items
            </div>
          </div>
          <div className="text-xs">
            <span className="text-green-600">●</span> On track
          </div>
        </div>
      </div>
    </Card>
  );
} 