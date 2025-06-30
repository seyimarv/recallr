"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { FlashcardReview } from "@/components/review/flashcard-review";
import { ReviewComplete } from "@/components/review/review-complete";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface Flashcard {
  id: string;
  front: string;
  back: string;
  topic: string;
  difficulty?: number;
}

interface Quiz {
  id: string;
  title: string;
  topic: string;
  questionCount: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  resourceId: string;
}



export default function ReviewPage() {
  const router = useRouter();
  
  // Separate flashcards and quizzes scheduled for today
  const mockFlashcards: Flashcard[] = [
    {
      id: "fc1",
      front: "What is the primary function of the left ventricle?",
      back: "The left ventricle pumps oxygenated blood to the entire body through the aorta, providing systemic circulation.",
      topic: "Cardiovascular Physiology",
    },
    {
      id: "fc2",
      front: "What are the phases of mitosis?",
      back: "The phases of mitosis are: Prophase, Metaphase, Anaphase, and Telophase (PMAT).",
      topic: "Cell Biology",
    },
    {
      id: "fc3",
      front: "Explain the difference between osmosis and diffusion.",
      back: "Osmosis is the movement of water across a semipermeable membrane, while diffusion is the movement of particles from high to low concentration.",
      topic: "Cell Biology",
    },
  ];

  const mockQuizzes: Quiz[] = [
    {
      id: "quiz1",
      title: "Cardiovascular System Quiz",
      topic: "Cardiovascular Physiology",
      questionCount: 5,
      difficulty: "intermediate",
      resourceId: "cardio-resource-1"
    },
    {
      id: "quiz2",
      title: "Biochemistry Fundamentals",
      topic: "Biochemistry", 
      questionCount: 8,
      difficulty: "advanced",
      resourceId: "biochem-resource-1"
    }
  ];

  const [currentFlashcardIndex, setCurrentFlashcardIndex] = React.useState(0);
  const [completedQuizzes, setCompletedQuizzes] = React.useState<string[]>([]);
  const [flashcardsComplete, setFlashcardsComplete] = React.useState(false);
  const [allComplete, setAllComplete] = React.useState(false);
  const [showAnswer, setShowAnswer] = React.useState(false);

  const totalItems = mockFlashcards.length + mockQuizzes.length;
  const completedItems = (flashcardsComplete ? mockFlashcards.length : currentFlashcardIndex) + completedQuizzes.length;
  const progress = (completedItems / totalItems) * 100;
  
  const topicsCount = new Set([...mockFlashcards.map(card => card.topic), ...mockQuizzes.map(quiz => quiz.topic)]).size;
  const flashcardCount = mockFlashcards.length;
  const quizCount = mockQuizzes.length;

  const handleRating = (rating: number) => {
    // Here you would save the rating and handle spaced repetition logic
    const currentCard = mockFlashcards[currentFlashcardIndex];
    console.log(`Flashcard ${currentCard.id} rated: ${rating}`);
    
    if (currentFlashcardIndex < mockFlashcards.length - 1) {
      setCurrentFlashcardIndex(currentFlashcardIndex + 1);
      setShowAnswer(false);
    } else {
      setFlashcardsComplete(true);
      setShowAnswer(false);
    }
  };

  const handleQuizComplete = (quizId: string) => {
    const newCompletedQuizzes = [...completedQuizzes, quizId];
    setCompletedQuizzes(newCompletedQuizzes);
    
    if (newCompletedQuizzes.length === mockQuizzes.length && flashcardsComplete) {
      setAllComplete(true);
    }
  };

  const handleQuizStart = (resourceId: string) => {
    router.push(`/quiz?resource=${resourceId}`);
  };

  // Check if we should complete when returning from quiz
  React.useEffect(() => {
    if (flashcardsComplete && completedQuizzes.length === mockQuizzes.length) {
      setAllComplete(true);
    }
  }, [flashcardsComplete, completedQuizzes.length, mockQuizzes.length]);

  if (allComplete) {
    return (
      <ReviewComplete 
        totalCards={flashcardCount}
        totalQuizzes={quizCount}
        topicsCount={topicsCount}
        onBackToDashboard={() => router.push('/dashboard')}
      />
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-4">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              Review Today
            </h1>
            <p className="text-muted-foreground text-sm mt-2">
              {topicsCount} topics — {flashcardCount} flashcards & {quizCount} quizzes due
            </p>
          </div>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>Progress: {completedItems} of {totalItems} completed</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Section: Flashcards */}
        {!flashcardsComplete && (
          <>
            <div className="flex justify-center">
              <Badge 
                variant="secondary" 
                className="bg-blue-50 text-blue-700 border-blue-200 px-4 py-2 rounded-full text-sm font-medium"
              >
                📚 Flashcards: {mockFlashcards[currentFlashcardIndex].topic}
              </Badge>
            </div>

            <FlashcardReview
              flashcard={mockFlashcards[currentFlashcardIndex]}
              showAnswer={showAnswer}
              onShowAnswer={() => setShowAnswer(true)}
              onRate={handleRating}
            />
          </>
        )}

        {/* Section: Quizzes */}
        {flashcardsComplete && !allComplete && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Great! Now let's complete your quizzes
              </h2>
              <p className="text-muted-foreground">
                {quizCount - completedQuizzes.length} quiz{quizCount - completedQuizzes.length !== 1 ? 'zes' : ''} remaining
              </p>
            </div>

            <div className="grid gap-4 max-w-2xl mx-auto">
              {mockQuizzes.map((quiz) => (
                <div 
                  key={quiz.id}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    completedQuizzes.includes(quiz.id) 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-white border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {quiz.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {quiz.questionCount} questions • {quiz.difficulty}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        📚 {quiz.topic}
                      </Badge>
                    </div>
                    <div className="ml-4">
                      {completedQuizzes.includes(quiz.id) ? (
                        <div className="flex items-center text-green-600">
                          <span className="text-2xl mr-2">✅</span>
                          <span className="font-medium">Completed</span>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleQuizStart(quiz.resourceId)}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
                          >
                            Start Quiz
                          </button>
                          <button
                            onClick={() => handleQuizComplete(quiz.id)}
                            className="px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors"
                            title="Mark as completed"
                          >
                            ✓
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 