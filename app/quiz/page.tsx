"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { QuizQuestion } from "@/components/quiz/quiz-question";
import { QuizComplete } from "@/components/quiz/quiz-complete";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

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
  timeLimit?: number; // in minutes
}

export default function QuizPage() {
  const router = useRouter();
  
  // Mock quiz data - replace with real data from your API
  const mockQuiz: Quiz = {
    id: "cardio-quiz-1",
    title: "Cardiovascular System Fundamentals",
    description: "Test your knowledge of basic cardiovascular anatomy and physiology",
    topic: "Cardiovascular Physiology",
    difficulty: "intermediate",
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        type: "multiple-choice",
        question: "Which chamber of the heart pumps oxygenated blood to the body?",
        topic: "Cardiovascular Physiology",
        options: [
          { id: "a", text: "Right atrium", isCorrect: false },
          { id: "b", text: "Right ventricle", isCorrect: false },
          { id: "c", text: "Left atrium", isCorrect: false },
          { id: "d", text: "Left ventricle", isCorrect: true },
        ],
        explanation: "The left ventricle is the strongest chamber and pumps oxygenated blood through the aorta to the entire body."
      },
      {
        id: "q2",
        type: "true-false",
        question: "The sinoatrial (SA) node is known as the natural pacemaker of the heart.",
        topic: "Cardiovascular Physiology",
        correctAnswer: "true",
        explanation: "The SA node initiates electrical impulses that regulate the heart's rhythm, making it the natural pacemaker."
      },
      {
        id: "q3",
        type: "multiple-choice",
        question: "What is the normal resting heart rate range for adults?",
        topic: "Cardiovascular Physiology",
        options: [
          { id: "a", text: "40-60 bpm", isCorrect: false },
          { id: "b", text: "60-100 bpm", isCorrect: true },
          { id: "c", text: "100-120 bpm", isCorrect: false },
          { id: "d", text: "120-140 bpm", isCorrect: false },
        ],
        explanation: "The normal resting heart rate for adults is 60-100 beats per minute."
      },
      {
        id: "q4",
        type: "fill-blank",
        question: "Blood pressure is measured as systolic over _____ pressure.",
        topic: "Cardiovascular Physiology",
        correctAnswer: "diastolic",
        explanation: "Blood pressure is expressed as systolic pressure over diastolic pressure (e.g., 120/80 mmHg)."
      },
      {
        id: "q5",
        type: "true-false",
        question: "Arteries carry blood away from the heart, while veins carry blood toward the heart.",
        topic: "Cardiovascular Physiology",
        correctAnswer: "true",
        explanation: "This is correct. Arteries transport blood away from the heart, and veins return blood to the heart."
      }
    ]
  };

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = React.useState(false);
  const [timeRemaining, setTimeRemaining] = React.useState(mockQuiz.timeLimit ? mockQuiz.timeLimit * 60 : null);

  const currentQuestion = mockQuiz.questions[currentIndex];
  const progress = ((currentIndex + 1) / mockQuiz.questions.length) * 100;
  const isLastQuestion = currentIndex === mockQuiz.questions.length - 1;

  // Timer logic
  React.useEffect(() => {
    if (timeRemaining === null || timeRemaining <= 0 || isComplete) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev === null || prev <= 1) {
          setIsComplete(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, isComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setIsComplete(true);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    mockQuiz.questions.forEach(question => {
      const userAnswer = answers[question.id];
      if (question.type === "multiple-choice") {
        const correctOption = question.options?.find(opt => opt.isCorrect);
        if (userAnswer === correctOption?.id) correct++;
      } else if (question.type === "true-false") {
        if (userAnswer === question.correctAnswer) correct++;
      } else if (question.type === "fill-blank") {
        if (userAnswer?.toLowerCase().trim() === question.correctAnswer?.toLowerCase()) correct++;
      }
    });
    return { correct, total: mockQuiz.questions.length, percentage: Math.round((correct / mockQuiz.questions.length) * 100) };
  };

  if (isComplete) {
    const score = calculateScore();
    return (
      <QuizComplete 
        quiz={mockQuiz}
        score={score}
        answers={answers}
        timeSpent={mockQuiz.timeLimit ? (mockQuiz.timeLimit * 60) - (timeRemaining || 0) : null}
        onRetakeQuiz={() => {
          setCurrentIndex(0);
          setAnswers({});
          setIsComplete(false);
          setTimeRemaining(mockQuiz.timeLimit ? mockQuiz.timeLimit * 60 : null);
        }}
        onBackToDashboard={() => router.push('/dashboard')}
      />
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <LinkButton
            variant="ghost"
            size="sm"
            href="/dashboard"
            className="rounded-xl"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </LinkButton>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-gray-900">
              {mockQuiz.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {mockQuiz.description}
            </p>
          </div>
        </div>

        {/* Quiz Info & Progress */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <Badge 
                variant="secondary" 
                className="bg-purple-50 text-purple-700 border-purple-200 px-3 py-1 rounded-full"
              >
                🧠 {mockQuiz.topic}
              </Badge>
              <Badge 
                variant="outline"
                className={`px-3 py-1 rounded-full ${
                  mockQuiz.difficulty === 'beginner' ? 'border-green-200 text-green-700' :
                  mockQuiz.difficulty === 'intermediate' ? 'border-yellow-200 text-yellow-700' :
                  'border-red-200 text-red-700'
                }`}
              >
                {mockQuiz.difficulty}
              </Badge>
            </div>
            
            {timeRemaining !== null && (
              <div className={`text-sm font-medium ${
                timeRemaining < 120 ? 'text-red-600' : 'text-muted-foreground'
              }`}>
                ⏱️ {formatTime(timeRemaining)} remaining
              </div>
            )}
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>Question {currentIndex + 1} of {mockQuiz.questions.length}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Question Component */}
        <QuizQuestion
          question={currentQuestion}
          answer={answers[currentQuestion.id]}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onPrevious={currentIndex > 0 ? handlePrevious : undefined}
          isLastQuestion={isLastQuestion}
          canProceed={!!answers[currentQuestion.id]}
        />
      </div>
    </div>
  );
} 