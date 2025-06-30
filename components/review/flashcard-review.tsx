"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Flashcard {
  id: string;
  front: string;
  back: string;
  topic: string;
}

interface FlashcardReviewProps {
  flashcard: Flashcard;
  showAnswer: boolean;
  onShowAnswer: () => void;
  onRate: (rating: number) => void;
}

const ratingOptions = [
  { value: 0, emoji: "❌", label: "Total blackout", description: "Couldn't recall at all" },
  { value: 1, emoji: "😬", label: "Wrong answer", description: "Incorrect response" },
  { value: 2, emoji: "🤔", label: "Almost correct", description: "Close but not quite" },
  { value: 3, emoji: "🙂", label: "Correct with effort", description: "Got it but took time" },
  { value: 4, emoji: "😎", label: "Easy recall", description: "Remembered easily" },
  { value: 5, emoji: "🧠", label: "Instant recall", description: "Knew it immediately" },
];

export function FlashcardReview({ 
  flashcard, 
  showAnswer, 
  onShowAnswer, 
  onRate 
}: FlashcardReviewProps) {
  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-xl mx-auto rounded-2xl shadow-md border-0 bg-white transition-all duration-300 hover:shadow-lg">
        <CardContent className="p-8">
          {!showAnswer ? (
            // Question State
            <div className="space-y-8 text-center">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-medium">
                  Question
                </div>
                <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">
                  {flashcard.front}
                </h2>
              </div>
              
              <Button 
                onClick={onShowAnswer}
                size="lg"
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
              >
                Show Answer
              </Button>
            </div>
          ) : (
            // Answer State with Rating
            <div className="space-y-6">
              {/* Question (smaller) */}
              <div className="text-center pb-4 border-b border-slate-100">
                <div className="text-sm text-muted-foreground mb-2">Question</div>
                <p className="text-base font-medium text-gray-700">
                  {flashcard.front}
                </p>
              </div>

              {/* Answer */}
              <div className="text-center space-y-4">
                <div className="text-sm text-muted-foreground font-medium">
                  Answer
                </div>
                <p className="text-lg text-gray-900 leading-relaxed">
                  {flashcard.back}
                </p>
              </div>

              <Separator className="my-6" />

              {/* Rating Section */}
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    How well did you recall this?
                  </p>
                </div>

                {/* Rating Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ratingOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant="outline"
                      onClick={() => onRate(option.value)}
                      className="h-auto p-3 text-left hover:bg-slate-50 hover:border-slate-300 transition-colors rounded-xl"
                    >
                      <div className="flex items-center gap-3 w-full">
                        <span className="text-lg">{option.emoji}</span>
                        <div className="flex-1">
                          <div className="font-medium text-sm text-gray-900">
                            {option.value} – {option.label}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {option.description}
                          </div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 