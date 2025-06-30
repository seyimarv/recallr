"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";

interface FlashcardTopicBadgeProps {
  topic: string;
}

export function FlashcardTopicBadge({ topic }: FlashcardTopicBadgeProps) {
  return (
    <div className="flex justify-center">
      <Badge 
        variant="secondary" 
        className="bg-blue-50 text-blue-700 border-blue-200 px-4 py-2 rounded-full text-sm font-medium"
      >
        📚 Topic: {topic}
      </Badge>
    </div>
  );
} 