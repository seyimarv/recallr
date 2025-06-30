"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, RotateCcw, Home, Clock, Target, BookOpen, Zap } from "lucide-react";

interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface QuizQuestionData {
  id: string;
  type: "multiple-choice" | "true-false" | "fill-blank";
  question: string;
  options?: QuizOption[];
  correctAnswer?: string;
  explanation?: string;
  topic: string;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  topic: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  questions: QuizQuestionData[];
  timeLimit?: number;
}

interface QuizCompleteProps {
  quiz: Quiz;
  score: {
    correct: number;
    total: number;
    percentage: number;
  };
  answers: Record<string, string>;
  timeSpent: number | null;
  onRetakeQuiz: () => void;
  onBackToDashboard: () => void;
}

export function QuizComplete({
  quiz,
  score,
  answers,
  timeSpent,
  onRetakeQuiz,
  onBackToDashboard
}: QuizCompleteProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 80) return "text-blue-600";
    if (percentage >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return "Excellent work! 🎉";
    if (percentage >= 80) return "Great job! 👏";
    if (percentage >= 70) return "Good effort! 👍";
    return "Keep practicing! 💪";
  };

  const getScoreEmoji = (percentage: number) => {
    if (percentage >= 90) return "🎯";
    if (percentage >= 80) return "🌟";
    if (percentage >= 70) return "⭐";
    return "📚";
  };

  // Calculate XP earned (example logic)
  const xpEarned = Math.floor((score.percentage / 100) * 50) + (score.percentage >= 80 ? 20 : 0);

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Trophy className="h-10 w-10 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Quiz Complete! {getScoreEmoji(score.percentage)}
            </h1>
            <p className="text-xl text-muted-foreground">
              {getScoreMessage(score.percentage)}
            </p>
          </div>
        </div>

        {/* Score Overview */}
        <Card className="p-6 md:p-8 rounded-2xl border-0 shadow-lg">
          <div className="text-center space-y-6">
            <div>
              <div className={`text-6xl font-bold ${getScoreColor(score.percentage)} mb-2`}>
                {score.percentage}%
              </div>
              <p className="text-lg text-muted-foreground">
                {score.correct} out of {score.total} questions correct
              </p>
            </div>
            
            <div className="max-w-md mx-auto">
              <Progress 
                value={score.percentage} 
                className={`h-3 ${
                  score.percentage >= 80 ? 'bg-green-100' : 
                  score.percentage >= 70 ? 'bg-blue-100' : 'bg-gray-100'
                }`}
              />
            </div>

            <div className="flex items-center justify-center gap-3">
              <Badge 
                variant="secondary" 
                className="bg-purple-50 text-purple-700 border-purple-200 px-3 py-1 rounded-full"
              >
                🧠 {quiz.topic}
              </Badge>
              <Badge 
                variant="outline"
                className={`px-3 py-1 rounded-full ${
                  quiz.difficulty === 'beginner' ? 'border-green-200 text-green-700' :
                  quiz.difficulty === 'intermediate' ? 'border-yellow-200 text-yellow-700' :
                  'border-red-200 text-red-700'
                }`}
              >
                {quiz.difficulty}
              </Badge>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 rounded-2xl border-0 shadow-sm text-center">
            <div className="flex flex-col items-center gap-2">
              <Target className="h-8 w-8 text-blue-600" />
              <div className="text-2xl font-bold text-gray-900">{score.correct}/{score.total}</div>
              <div className="text-sm text-muted-foreground">Correct</div>
            </div>
          </Card>

          <Card className="p-4 rounded-2xl border-0 shadow-sm text-center">
            <div className="flex flex-col items-center gap-2">
              <Clock className="h-8 w-8 text-purple-600" />
              <div className="text-2xl font-bold text-gray-900">
                {timeSpent ? formatTime(timeSpent) : "N/A"}
              </div>
              <div className="text-sm text-muted-foreground">Time Spent</div>
            </div>
          </Card>

          <Card className="p-4 rounded-2xl border-0 shadow-sm text-center">
            <div className="flex flex-col items-center gap-2">
              <Zap className="h-8 w-8 text-yellow-600" />
              <div className="text-2xl font-bold text-gray-900">+{xpEarned}</div>
              <div className="text-sm text-muted-foreground">XP Earned</div>
            </div>
          </Card>

          <Card className="p-4 rounded-2xl border-0 shadow-sm text-center">
            <div className="flex flex-col items-center gap-2">
              <BookOpen className="h-8 w-8 text-green-600" />
              <div className="text-2xl font-bold text-gray-900">{quiz.questions.length}</div>
              <div className="text-sm text-muted-foreground">Questions</div>
            </div>
          </Card>
        </div>

        {/* Review Answers (Optional - can be expanded) */}
        <Card className="p-6 rounded-2xl border-0 shadow-sm">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Quiz Summary
            </h3>
            <div className="space-y-3">
              {quiz.questions.map((question, index) => {
                const userAnswer = answers[question.id];
                let isCorrect = false;

                if (question.type === "multiple-choice") {
                  const correctOption = question.options?.find(opt => opt.isCorrect);
                  isCorrect = userAnswer === correctOption?.id;
                } else if (question.type === "true-false") {
                  isCorrect = userAnswer === question.correctAnswer;
                } else if (question.type === "fill-blank") {
                  isCorrect = userAnswer?.toLowerCase().trim() === question.correctAnswer?.toLowerCase();
                }

                return (
                  <div key={question.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                        isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {index + 1}
                      </div>
                      <span className="text-sm text-gray-900 line-clamp-1">
                        {question.question.length > 60 
                          ? `${question.question.substring(0, 60)}...` 
                          : question.question
                        }
                      </span>
                    </div>
                    <Badge 
                      variant={isCorrect ? "default" : "destructive"}
                      className="rounded-full"
                    >
                      {isCorrect ? "✓" : "✗"}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={onRetakeQuiz}
            variant="outline"
            className="rounded-xl flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Retake Quiz
          </Button>
          <Button
            onClick={onBackToDashboard}
            className="rounded-xl bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        {/* Next Review Info */}
        <Card className="p-4 rounded-2xl border-0 bg-blue-50">
          <div className="text-center">
            <p className="text-sm text-blue-800">
              <strong>Great work!</strong> This quiz will be scheduled for review again based on your performance.
            </p>
            <p className="text-xs text-blue-600 mt-1">
              High scores = longer intervals • Lower scores = more frequent reviews
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
} 