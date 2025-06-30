"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Edit3, Check, X, Trash2, RotateCcw } from "lucide-react";

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
  isEditing?: boolean;
}

interface FlashcardEditorProps {
  flashcard: Flashcard;
  onSave: (flashcard: Flashcard) => void;
  onDelete: (id: string) => void;
  onCancel: () => void;
}

export function FlashcardEditor({ flashcard, onSave, onDelete, onCancel }: FlashcardEditorProps) {
  const [isEditing, setIsEditing] = React.useState(flashcard.isEditing || false);
  const [front, setFront] = React.useState(flashcard.front);
  const [back, setBack] = React.useState(flashcard.back);
  const [difficulty, setDifficulty] = React.useState(flashcard.difficulty);
  const [isFlipped, setIsFlipped] = React.useState(false);

  const handleSave = () => {
    onSave({
      ...flashcard,
      front,
      back,
      difficulty,
      isEditing: false
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFront(flashcard.front);
    setBack(flashcard.back);
    setDifficulty(flashcard.difficulty);
    setIsEditing(false);
    onCancel();
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "easy": return "text-green-700 bg-green-50 border-green-200";
      case "medium": return "text-yellow-700 bg-yellow-50 border-yellow-200";
      case "hard": return "text-red-700 bg-red-50 border-red-200";
      default: return "text-gray-700 bg-gray-50 border-gray-200";
    }
  };

  if (isEditing) {
    return (
      <Card className="p-6 rounded-2xl border-0 shadow-sm border-blue-200 bg-blue-50/30">
        <div className="space-y-4">
          {/* Editing Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Edit3 className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Editing Flashcard</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                className="rounded-xl text-xs"
              >
                <X className="h-3 w-3 mr-1" />
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={!front.trim() || !back.trim()}
                className="rounded-xl text-xs bg-blue-600 hover:bg-blue-700"
              >
                <Check className="h-3 w-3 mr-1" />
                Save
              </Button>
            </div>
          </div>

          {/* Front Side */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Front (Question/Term)</label>
            <Input
              value={front}
              onChange={(e) => setFront(e.target.value)}
              placeholder="Enter the question or term..."
              className="rounded-xl"
            />
          </div>

          {/* Back Side */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Back (Answer/Definition)</label>
            <textarea
              value={back}
              onChange={(e) => setBack(e.target.value)}
              placeholder="Enter the answer or definition..."
              className="w-full p-3 border border-gray-200 rounded-xl resize-none h-20 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Difficulty */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Difficulty</label>
            <div className="flex gap-2">
              {["easy", "medium", "hard"].map((level) => (
                <Button
                  key={level}
                  variant={difficulty === level ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDifficulty(level as any)}
                  className={`rounded-full text-xs ${
                    difficulty === level ? "" : getDifficultyColor(level)
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="group relative rounded-2xl border-0 shadow-sm hover:shadow-md transition-all duration-300">
      {/* Card Actions */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="rounded-xl text-xs bg-white/90 backdrop-blur-sm"
          >
            <Edit3 className="h-3 w-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(flashcard.id)}
            className="rounded-xl text-xs bg-white/90 backdrop-blur-sm text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Flashcard Content */}
      <div 
        className="relative h-48 cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`absolute inset-0 preserve-3d transition-transform-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          {/* Front Side */}
          <div className="absolute inset-0 backface-hidden p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge 
                  variant="outline" 
                  className={`rounded-full text-xs ${getDifficultyColor(flashcard.difficulty)}`}
                >
                  {flashcard.difficulty}
                </Badge>
                <span className="text-xs text-gray-400">Front</span>
              </div>
              
              <div className="flex-1 flex items-center justify-center">
                <p className="text-center text-gray-900 font-medium leading-relaxed">
                  {flashcard.front}
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-center pt-4">
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <RotateCcw className="h-3 w-3" />
                Click to flip
              </div>
            </div>
          </div>

          {/* Back Side */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 p-6 flex flex-col justify-between bg-blue-50">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge 
                  variant="outline" 
                  className="rounded-full text-xs text-blue-700 bg-blue-100 border-blue-200"
                >
                  Answer
                </Badge>
                <span className="text-xs text-blue-400">Back</span>
              </div>
              
              <div className="flex-1 flex items-center justify-center">
                <p className="text-center text-blue-900 leading-relaxed">
                  {flashcard.back}
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-center pt-4">
              <div className="flex items-center gap-1 text-xs text-blue-400">
                <RotateCcw className="h-3 w-3" />
                Click to flip
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tags */}
      {flashcard.tags.length > 0 && (
        <div className="px-6 pb-4">
          <div className="flex flex-wrap gap-1">
            {flashcard.tags.map((tag) => (
              <Badge 
                key={tag}
                variant="secondary" 
                className="text-xs rounded-full bg-purple-50 text-purple-700 border-purple-200"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}

// Custom CSS for 3D flip effect (would go in global CSS)
const flipStyles = `
.preserve-3d {
  transform-style: preserve-3d;
}
.backface-hidden {
  backface-visibility: hidden;
}
.rotate-y-180 {
  transform: rotateY(180deg);
}
`; 