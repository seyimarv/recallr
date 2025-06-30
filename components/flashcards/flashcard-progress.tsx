"use client";

import * as React from "react";
import { Progress } from "@/components/ui/progress";

interface FlashcardProgressProps {
  currentIndex: number;
  totalCards: number;
  progress: number;
}

export function FlashcardProgress({ 
  currentIndex, 
  totalCards, 
  progress 
}: FlashcardProgressProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <span>Card {currentIndex + 1} of {totalCards}</span>
        <span>{Math.round(progress)}% complete</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
} 