"use client";

import * as React from "react";
import { Button, LinkButton } from "@/components/ui/button";

interface FlashcardCompletionProps {
  totalCards: number;
  topicsCount: number;
  resourceId: string | null;
  resourceTitle: string;
  onStudyAgain: () => void;
}

export function FlashcardCompletion({ 
  totalCards, 
  topicsCount, 
  resourceId, 
  resourceTitle, 
  onStudyAgain 
}: FlashcardCompletionProps) {

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="mx-auto max-w-2xl text-center space-y-8">
        {/* Success Header */}
        <div className="space-y-4">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-4xl">🎉</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Great Job Studying!
          </h1>
          <p className="text-lg text-muted-foreground">
            You've completed all {totalCards} flashcards from{" "}
            <span className="font-medium text-gray-900">{resourceTitle}</span>
          </p>
        </div>

        {/* Study Stats */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Study Session Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalCards}</div>
              <div className="text-sm text-muted-foreground">Cards Studied</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{topicsCount}</div>
              <div className="text-sm text-muted-foreground">Topic{topicsCount !== 1 ? 's' : ''} Covered</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={onStudyAgain}
            size="lg"
            className="w-full rounded-xl bg-blue-600 hover:bg-blue-700"
          >
            Study Again
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <LinkButton 
              variant="outline"
              href={`/quiz?resource=${resourceId}`}
              className="rounded-xl"
            >
              Take Quiz
            </LinkButton>
            <LinkButton 
              variant="outline"
              href="/library"
              className="rounded-xl"
            >
              Back to Library
            </LinkButton>
          </div>
          
          <LinkButton 
            variant="ghost"
            href="/review"
            className="w-full rounded-xl text-muted-foreground"
          >
            Go to Scheduled Reviews
          </LinkButton>
        </div>

        {/* Tip */}
        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-sm text-blue-800">
            💡 <strong>Tip:</strong> Regular practice helps with long-term retention. 
            Consider taking the quiz or checking your scheduled reviews!
          </p>
        </div>
      </div>
    </div>
  );
} 