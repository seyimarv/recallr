"use client";

import * as React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FlashcardReview } from "@/components/review/flashcard-review";
import { FlashcardCompletion } from "@/components/flashcards/flashcard-completion";
import { FlashcardPageHeader } from "@/components/flashcards/flashcard-page-header";
import { FlashcardProgress } from "@/components/flashcards/flashcard-progress";
import { FlashcardTopicBadge } from "@/components/flashcards/flashcard-topic-badge";

interface Flashcard {
  id: string;
  front: string;
  back: string;
  topic: string;
  difficulty?: number;
}

function FlashcardsContent() {
  const searchParams = useSearchParams();
  const resourceId = searchParams.get('resource');
  
  // Mock flashcards for the specific resource - replace with real data from your API
  const mockFlashcards: Flashcard[] = [
    {
      id: "fc1",
      front: "What is the primary function of the left ventricle?",
      back: "The left ventricle pumps oxygenated blood from the lungs to the rest of the body through the aorta. It's the strongest chamber of the heart and provides systemic circulation.",
      topic: "Cardiovascular Physiology",
    },
    {
      id: "fc2",
      front: "What is the SA node and why is it important?",
      back: "The sinoatrial (SA) node is the heart's natural pacemaker. It generates electrical impulses that initiate each heartbeat and controls the heart rate.",
      topic: "Cardiovascular Physiology",
    },
    {
      id: "fc3",
      front: "What is the normal resting heart rate for adults?",
      back: "The normal resting heart rate for healthy adults is between 60-100 beats per minute (bpm). Athletes often have lower rates due to better cardiovascular fitness.",
      topic: "Cardiovascular Physiology",
    },
    {
      id: "fc4",
      front: "Explain the difference between arteries and veins",
      back: "Arteries carry oxygenated blood away from the heart to body tissues (except pulmonary arteries). Veins carry deoxygenated blood back to the heart (except pulmonary veins). Arteries have thicker walls to handle higher pressure.",
      topic: "Cardiovascular Physiology",
    },
    {
      id: "fc5",
      front: "What does blood pressure measure and what's considered normal?",
      back: "Blood pressure measures the force of blood against artery walls. It's expressed as systolic/diastolic pressure. Normal is typically less than 120/80 mmHg.",
      topic: "Cardiovascular Physiology",
    },
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isComplete, setIsComplete] = React.useState(false);
  const [showAnswer, setShowAnswer] = React.useState(false);

  const currentCard = mockFlashcards[currentIndex];
  const progress = ((currentIndex + 1) / mockFlashcards.length) * 100;
  const topicsCount = new Set(mockFlashcards.map(card => card.topic)).size;

  // Get resource title from the resourceId parameter (in real app, fetch from API)
  const getResourceTitle = (id: string | null) => {
    if (!id) return "Flashcard Review";
    // In real app, you'd fetch this from your API
    return "Cardiovascular System Fundamentals";
  };

  const handleRating = (rating: number) => {
    // Here you would save the rating and handle spaced repetition logic
    console.log(`Card ${currentCard.id} rated: ${rating}`);
    
    if (currentIndex < mockFlashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else {
      setIsComplete(true);
    }
  };



  if (isComplete) {
    return (
      <FlashcardCompletion
        totalCards={mockFlashcards.length}
        topicsCount={topicsCount}
        resourceId={resourceId}
        resourceTitle={getResourceTitle(resourceId)}
        onStudyAgain={() => {
          setCurrentIndex(0);
          setIsComplete(false);
          setShowAnswer(false);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="mx-auto max-w-4xl space-y-8">
        <FlashcardPageHeader
          resourceTitle={getResourceTitle(resourceId)}
          topicsCount={topicsCount}
          totalCards={mockFlashcards.length}
        />

        <FlashcardProgress
          currentIndex={currentIndex}
          totalCards={mockFlashcards.length}
          progress={progress}
        />

        <FlashcardTopicBadge topic={currentCard.topic} />

        <FlashcardReview
          flashcard={currentCard}
          showAnswer={showAnswer}
          onShowAnswer={() => setShowAnswer(true)}
          onRate={handleRating}
        />
      </div>
    </div>
  );
}

export default function FlashcardsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <FlashcardsContent />
    </Suspense>
  );
} 