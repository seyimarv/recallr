"use client";

import { Card } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/button";
import { BookOpen, Plus } from "lucide-react";

export function LibraryEmptyState() {
  
  return (
    <Card className="p-12 rounded-2xl border-0 shadow-sm text-center">
      <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No resources yet</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Start learning by adding your first note, PDF, or link. We'll automatically generate flashcards and quizzes for you.
      </p>
      <LinkButton 
        className="rounded-xl bg-blue-600 hover:bg-blue-700"
        href="/library/new"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add New Resource
      </LinkButton>
    </Card>
  );
} 