"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FlashcardEditor, Flashcard } from "./flashcard-editor";
import { QuizEditor, QuizQuestion } from "./quiz-editor";
import { 
  BookOpen, 
  Brain, 
  Plus, 
  Save, 
  FileText,
  CheckCircle,
  AlertCircle,
  Sparkles
} from "lucide-react";

interface ContentPreviewProps {
  flashcards: Flashcard[];
  quizQuestions: QuizQuestion[];
  onFlashcardSave: (flashcard: Flashcard) => void;
  onFlashcardDelete: (id: string) => void;
  onQuizQuestionSave: (question: QuizQuestion) => void;
  onQuizQuestionDelete: (id: string) => void;
  onAddFlashcard: () => void;
  onAddQuizQuestion: () => void;
  onSaveAsDraft: () => void;
  onPublish: () => void;
  resourceTitle: string;
}

export function ContentPreview({
  flashcards,
  quizQuestions,
  onFlashcardSave,
  onFlashcardDelete,
  onQuizQuestionSave,
  onQuizQuestionDelete,
  onAddFlashcard,
  onAddQuizQuestion,
  onSaveAsDraft,
  onPublish,
  resourceTitle
}: ContentPreviewProps) {
  const [activeTab, setActiveTab] = React.useState<"flashcards" | "quizzes">("flashcards");

  const totalContent = flashcards.length + quizQuestions.length;
  const isContentReady = totalContent > 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="p-6 rounded-2xl border-0 shadow-sm bg-gradient-to-r from-green-50 to-blue-50">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-full shadow-sm">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Content Generated Successfully!
            </h3>
            <p className="text-sm text-muted-foreground">
              Review and edit your AI-generated content for "{resourceTitle}"
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              {flashcards.length} flashcards
            </div>
            <div className="flex items-center gap-1">
              <Brain className="h-4 w-4" />
              {quizQuestions.length} quiz questions
            </div>
          </div>
        </div>
      </Card>

      {/* Content Navigation */}
      <Card className="p-1 rounded-2xl border-0 shadow-sm">
        <div className="flex bg-gray-50 rounded-xl p-1">
          <button
            onClick={() => setActiveTab("flashcards")}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === "flashcards"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            Flashcards ({flashcards.length})
          </button>
          <button
            onClick={() => setActiveTab("quizzes")}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === "quizzes"
                ? "bg-white text-purple-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Brain className="h-4 w-4" />
            Quiz Questions ({quizQuestions.length})
          </button>
        </div>
      </Card>

      {/* Content Grid */}
      {activeTab === "flashcards" && (
        <div className="space-y-6">
          {flashcards.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {flashcards.map((flashcard) => (
                <FlashcardEditor
                  key={flashcard.id}
                  flashcard={flashcard}
                  onSave={onFlashcardSave}
                  onDelete={onFlashcardDelete}
                  onCancel={() => {}}
                />
              ))}
            </div>
          )}

          {/* Add Flashcard */}
          <Card className="p-8 rounded-2xl border-2 border-dashed border-gray-200 hover:border-blue-300 transition-colors">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-3 bg-blue-50 rounded-full">
                  <Plus className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Add Another Flashcard</h4>
                <p className="text-sm text-gray-600">
                  Create additional flashcards for key concepts
                </p>
              </div>
              <Button
                onClick={onAddFlashcard}
                variant="outline"
                className="rounded-xl border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Flashcard
              </Button>
            </div>
          </Card>
        </div>
      )}

      {activeTab === "quizzes" && (
        <div className="space-y-6">
          {quizQuestions.length > 0 && (
            <div className="grid grid-cols-1 gap-6">
              {quizQuestions.map((question) => (
                <QuizEditor
                  key={question.id}
                  question={question}
                  onSave={onQuizQuestionSave}
                  onDelete={onQuizQuestionDelete}
                  onCancel={() => {}}
                />
              ))}
            </div>
          )}

          {/* Add Quiz Question */}
          <Card className="p-8 rounded-2xl border-2 border-dashed border-gray-200 hover:border-purple-300 transition-colors">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-3 bg-purple-50 rounded-full">
                  <Plus className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Add Another Question</h4>
                <p className="text-sm text-gray-600">
                  Create additional quiz questions to test knowledge
                </p>
              </div>
              <Button
                onClick={onAddQuizQuestion}
                variant="outline"
                className="rounded-xl border-purple-200 text-purple-600 hover:bg-purple-50"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Question
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Empty State */}
      {!isContentReady && (
        <Card className="p-8 rounded-2xl border-0 shadow-sm text-center">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No content generated</h3>
          <p className="text-gray-600 mb-4">
            It looks like the AI generation didn't produce any content. Try generating again or add content manually.
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              onClick={onAddFlashcard}
              variant="outline"
              className="rounded-xl"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Flashcard
            </Button>
            <Button
              onClick={onAddQuizQuestion}
              variant="outline"
              className="rounded-xl"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Quiz Question
            </Button>
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      {isContentReady && (
        <Card className="p-6 rounded-2xl border-0 shadow-sm bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-600" />
                {totalContent} learning items ready
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={onSaveAsDraft}
                variant="outline"
                className="rounded-xl"
              >
                <FileText className="h-4 w-4 mr-2" />
                Save as Draft
              </Button>
              <Button
                onClick={onPublish}
                className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Publish to Library
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
} 