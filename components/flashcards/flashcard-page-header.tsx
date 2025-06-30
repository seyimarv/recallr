"use client";

import * as React from "react";
import { LinkButton } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface FlashcardPageHeaderProps {
  resourceTitle: string;
  topicsCount: number;
  totalCards: number;
}

export function FlashcardPageHeader({ 
  resourceTitle, 
  topicsCount, 
  totalCards 
}: FlashcardPageHeaderProps) {

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <div className="flex items-center gap-4">
        <LinkButton
          variant="ghost"
          size="sm"
          href="/library"
          className="rounded-xl"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Library
        </LinkButton>
      </div>

      {/* Page Header */}
      <div className="text-center space-y-4">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            {resourceTitle}
          </h1>
          <p className="text-muted-foreground text-sm mt-2">
            {topicsCount} topic{topicsCount !== 1 ? 's' : ''} — {totalCards} flashcards
          </p>
        </div>
      </div>
    </div>
  );
} 