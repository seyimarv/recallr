"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button, LinkButton } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Brain,
  RefreshCw,
  Calendar,
  ArrowRight,
  MoreHorizontal
} from "lucide-react";

interface LearningResource {
  id: string;
  title: string;
  description: string;
  topic: string;
  tags: string[];
  flashcardCount: number;
  hasQuiz: boolean;
  nextReview?: string;
  createdAt: string;
  lastStudied?: string;
  accuracy?: number;
  sourceType?: "note" | "pdf" | "link";
  sourceUrl?: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  masteryLevel: number;
}

interface ResourceCardProps {
  resource: LearningResource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  
  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return <Brain className="h-4 w-4" />;
      case "intermediate": return <Brain className="h-4 w-4" />;
      case "advanced": return <Brain className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-green-50 text-green-700 border-green-200";
      case "intermediate": return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "advanced": return "bg-red-50 text-red-700 border-red-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <Card className="p-6 rounded-2xl border-0 shadow-sm hover:shadow-md transition-shadow">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
              {resource.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {resource.description}
            </p>
          </div>
          <Button variant="ghost" size="sm" className="rounded-xl shrink-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Difficulty and Topic */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className={`rounded-full flex items-center gap-1 ${getDifficultyColor(resource.difficulty)}`}>
            {getDifficultyIcon(resource.difficulty)}
            {resource.difficulty.toUpperCase()}
          </Badge>
          <Badge variant="outline" className="rounded-full text-xs bg-blue-50 text-blue-700 border-blue-200">
            📚 {resource.topic}
          </Badge>
          {resource.tags.slice(0, 2).map((tag: string) => (
            <Badge key={tag} variant="secondary" className="rounded-full text-xs bg-purple-50 text-purple-700 border-purple-200">
              {tag}
            </Badge>
          ))}
          {resource.tags.length > 2 && (
            <Badge variant="secondary" className="rounded-full text-xs bg-gray-50 text-gray-600">
              +{resource.tags.length - 2}
            </Badge>
          )}
        </div>

        {/* Content Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <RefreshCw className="h-4 w-4" />
            {resource.flashcardCount} flashcards
          </div>
          <div className="flex items-center gap-1">
            <Brain className="h-4 w-4" />
            {resource.hasQuiz ? "1 quiz" : "No quiz"}
          </div>
          {resource.accuracy && (
            <div className="flex items-center gap-1">
              <span className="text-green-600">●</span>
              {resource.accuracy}% accuracy
            </div>
          )}
        </div>

        {/* Review Info */}
        {resource.nextReview && (
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl">
            <Calendar className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-blue-800">
              Next review: <strong>{resource.nextReview}</strong>
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <LinkButton 
            size="sm" 
            variant="outline"
            className="flex-1 rounded-xl"
            href={`/flashcards?resource=${resource.id}`}
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Flashcards
          </LinkButton>
          <LinkButton 
            size="sm" 
            variant="outline"
            className="flex-1 rounded-xl"
            href={`/quiz?resource=${resource.id}`}
          >
            <Brain className="h-4 w-4 mr-1" />
            Quiz
          </LinkButton>
          <LinkButton 
            size="sm" 
            className="rounded-xl bg-blue-600 hover:bg-blue-700"
            href={`/flashcards?resource=${resource.id}`}
          >
            <ArrowRight className="h-4 w-4" />
          </LinkButton>
        </div>

        {/* Footer Info */}
        <div className="flex justify-between items-center text-xs text-muted-foreground pt-2 border-t border-gray-100">
          <span>Created {formatDate(resource.createdAt)}</span>
          {resource.lastStudied && (
            <span>Last studied {formatDate(resource.lastStudied)}</span>
          )}
        </div>
      </div>
    </Card>
  );
} 