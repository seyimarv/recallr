"use client";

import * as React from "react";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/section-header";
import { QuizFilters } from "@/components/quiz/quiz-filters";
import { 
  Clock, 
  Brain, 
  Calendar,
  Trophy,
  BookOpen,
  ArrowRight
} from "lucide-react";

interface Quiz {
  id: string;
  title: string;
  description: string;
  topic: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  questionsCount: number;
  timeLimit: number; // in minutes
  averageScore: number;
  timesCompleted: number;
  lastCompleted?: string;
  nextReview?: string;
  isScheduled: boolean;
}

export default function QuizzesPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<string>("all");
  const [selectedTopic, setSelectedTopic] = React.useState<string>("all");

  // Mock quiz data - replace with real data from your API
  const quizzes: Quiz[] = [
    {
      id: "cardio-quiz-1",
      title: "Cardiovascular System Fundamentals",
      description: "Test your knowledge of basic cardiovascular anatomy and physiology",
      topic: "Cardiovascular Physiology",
      difficulty: "intermediate",
      questionsCount: 15,
      timeLimit: 20,
      averageScore: 85,
      timesCompleted: 3,
      lastCompleted: "2024-01-15",
      nextReview: "2024-01-22",
      isScheduled: true
    },
    {
      id: "neuro-quiz-1",
      title: "Nervous System Basics",
      description: "Fundamentals of nervous system structure and function",
      topic: "Neuroscience",
      difficulty: "beginner",
      questionsCount: 12,
      timeLimit: 15,
      averageScore: 92,
      timesCompleted: 5,
      lastCompleted: "2024-01-10",
      nextReview: "2024-01-20",
      isScheduled: true
    },
    {
      id: "resp-quiz-1",
      title: "Respiratory System Deep Dive",
      description: "Advanced concepts in respiratory physiology and pathology",
      topic: "Respiratory Physiology",
      difficulty: "advanced",
      questionsCount: 20,
      timeLimit: 30,
      averageScore: 78,
      timesCompleted: 2,
      lastCompleted: "2024-01-08",
      nextReview: "2024-01-23",
      isScheduled: false
    },
    {
      id: "endo-quiz-1",
      title: "Endocrine System Overview",
      description: "Hormones, glands, and regulatory mechanisms",
      topic: "Endocrinology",
      difficulty: "intermediate",
      questionsCount: 18,
      timeLimit: 25,
      averageScore: 0,
      timesCompleted: 0,
      isScheduled: false
    },
    {
      id: "immuno-quiz-1",
      title: "Immune System Functions",
      description: "Innate and adaptive immunity mechanisms",
      topic: "Immunology",
      difficulty: "advanced",
      questionsCount: 16,
      timeLimit: 22,
      averageScore: 88,
      timesCompleted: 4,
      lastCompleted: "2024-01-12",
      nextReview: "2024-01-25",
      isScheduled: true
    }
  ];

  const topics = Array.from(new Set(quizzes.map(quiz => quiz.topic)));
  
  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         quiz.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         quiz.topic.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty === "all" || quiz.difficulty === selectedDifficulty;
    const matchesTopic = selectedTopic === "all" || quiz.topic === selectedTopic;
    
    return matchesSearch && matchesDifficulty && matchesTopic;
  });

  const scheduledQuizzes = filteredQuizzes.filter(quiz => quiz.isScheduled);
  const availableQuizzes = filteredQuizzes.filter(quiz => !quiz.isScheduled);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "border-green-200 text-green-700 bg-green-50";
      case "intermediate": return "border-yellow-200 text-yellow-700 bg-yellow-50";
      case "advanced": return "border-red-200 text-red-700 bg-red-50";
      default: return "border-gray-200 text-gray-700 bg-gray-50";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays > 0) return `In ${diffDays} days`;
    if (diffDays === -1) return "Yesterday";
    return `${Math.abs(diffDays)} days ago`;
  };

  const QuizCard = ({ quiz }: { quiz: Quiz }) => (
    <Card className="p-6 rounded-2xl border-0 shadow-sm hover:shadow-md transition-shadow">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {quiz.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {quiz.description}
            </p>
          </div>
          {quiz.isScheduled && (
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 rounded-full">
              Scheduled
            </Badge>
          )}
        </div>

        {/* Topic and Difficulty */}
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 rounded-full">
            🧠 {quiz.topic}
          </Badge>
          <Badge variant="outline" className={`rounded-full ${getDifficultyColor(quiz.difficulty)}`}>
            {quiz.difficulty}
          </Badge>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            {quiz.questionsCount} questions
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {quiz.timeLimit} min
          </div>
          {quiz.timesCompleted > 0 && (
            <div className="flex items-center gap-1">
              <Trophy className="h-4 w-4" />
              {quiz.averageScore}% avg
            </div>
          )}
        </div>

        {/* Review Info */}
        {quiz.isScheduled && quiz.nextReview && (
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl">
            <Calendar className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-blue-800">
              Next review: <strong>{formatDate(quiz.nextReview)}</strong>
            </span>
          </div>
        )}

        {/* Action */}
        <div className="flex justify-between items-center pt-2">
          <div className="text-xs text-muted-foreground">
            {quiz.timesCompleted > 0 
              ? `Completed ${quiz.timesCompleted} times`
              : "Never attempted"
            }
          </div>
          <LinkButton 
            size="sm" 
            className="rounded-xl bg-blue-600 hover:bg-blue-700"
            href={`/quiz?id=${quiz.id}`}
          >
            {quiz.timesCompleted > 0 ? "Retake" : "Start Quiz"}
            <ArrowRight className="h-4 w-4 ml-1" />
          </LinkButton>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      <SectionHeader
        subtitle="Learning & Assessment"
        title="Quizzes"
        description="Test your knowledge with spaced repetition quizzes"
      />

      {/* Search and Filters */}
      <QuizFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={setSelectedDifficulty}
        selectedTopic={selectedTopic}
        onTopicChange={setSelectedTopic}
        availableTopics={topics}
      />

      {/* Scheduled Quizzes */}
      {scheduledQuizzes.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Scheduled for Review ({scheduledQuizzes.length})
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scheduledQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        </div>
      )}

      {/* Available Quizzes */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-600" />
          <h2 className="text-xl font-semibold text-gray-900">
            Available Quizzes ({availableQuizzes.length})
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableQuizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </div>

      {filteredQuizzes.length === 0 && (
        <Card className="p-8 rounded-2xl border-0 shadow-sm text-center">
          <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No quizzes found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria or filters.
          </p>
        </Card>
      )}
    </div>
  );
} 