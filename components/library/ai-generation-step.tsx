"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  Brain, 
  BookOpen, 
  Zap, 
  Clock, 
  CheckCircle, 
  Loader2,
  Sparkles,
  Target
} from "lucide-react";

interface AIGenerationStepProps {
  resourceType: "note" | "file" | "direct";
  resourceData: {
    title: string;
    description: string;
    topic: string;
    content?: string;
    fileName?: string;
    fileType?: "pdf" | "ppt";
  };
  onGenerate: (options: GenerationOptions) => void;
  onSkip: () => void;
  isGenerating: boolean;
  generationProgress: {
    stage: string;
    progress: number;
    estimatedTime: string;
  } | null;
}

export interface GenerationOptions {
  generateFlashcards: boolean;
  generateQuizzes: boolean;
  flashcardCount: number;
  quizQuestionCount: number;
  quizQuestionTypes: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  focusAreas: string[];
}

export function AIGenerationStep({
  resourceType,
  resourceData,
  onGenerate,
  onSkip,
  isGenerating,
  generationProgress
}: AIGenerationStepProps) {
  const [generateFlashcards, setGenerateFlashcards] = React.useState(true);
  const [generateQuizzes, setGenerateQuizzes] = React.useState(true);
  const [flashcardCount, setFlashcardCount] = React.useState(10);
  const [quizQuestionCount, setQuizQuestionCount] = React.useState(5);
  const [quizQuestionTypes, setQuizQuestionTypes] = React.useState<string[]>(["multiple-choice"]);
  const [difficulty, setDifficulty] = React.useState<"beginner" | "intermediate" | "advanced">("intermediate");

  const handleGenerate = () => {
    onGenerate({
      generateFlashcards,
      generateQuizzes,
      flashcardCount,
      quizQuestionCount,
      quizQuestionTypes,
      difficulty,
      focusAreas: []
    });
  };

  const handleFlashcardCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    if (value >= 0 && value <= 25) {
      setFlashcardCount(value);
    }
  };

  const handleQuizQuestionCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    if (value >= 0 && value <= 25) {
      setQuizQuestionCount(value);
    }
  };

  const handleQuestionTypeToggle = (type: string) => {
    setQuizQuestionTypes(prev => {
      if (prev.includes(type)) {
        // Don't allow removing the last type
        if (prev.length === 1) return prev;
        return prev.filter(t => t !== type);
      } else {
        return [...prev, type];
      }
    });
  };

  const questionTypeOptions = [
    { 
      value: "multiple-choice", 
      label: "Multiple Choice", 
      description: "Choose the best answer from options",
      icon: "🔘"
    },
    { 
      value: "true-false", 
      label: "True/False", 
      description: "Simple true or false questions",
      icon: "✅"
    },
    { 
      value: "fill-in-blank", 
      label: "Fill in the Blank", 
      description: "Complete the missing information",
      icon: "📝"
    },
    { 
      value: "short-answer", 
      label: "Short Answer", 
      description: "Brief written responses",
      icon: "💬"
    }
  ];

  const difficultyOptions = [
    { value: "beginner", label: "Beginner", color: "text-green-700 bg-green-50 border-green-200" },
    { value: "intermediate", label: "Intermediate", color: "text-yellow-700 bg-yellow-50 border-yellow-200" },
    { value: "advanced", label: "Advanced", color: "text-red-700 bg-red-50 border-red-200" }
  ];

  const getGenerationDescription = () => {
    switch (resourceType) {
      case "note":
        return `Let AI create personalized flashcards and quizzes from your notes on "${resourceData.title}"`;
      case "file":
        return `Let AI extract content from your ${resourceData.fileType?.toUpperCase()} file and create personalized flashcards and quizzes`;
      case "direct":
        return `Let AI generate flashcards and quizzes based on the topic "${resourceData.topic}" and your learning objectives`;
      default:
        return `Let AI create personalized flashcards and quizzes from "${resourceData.title}"`;
    }
  };

  const getContentSource = () => {
    switch (resourceType) {
      case "note":
        return "your notes";
      case "file":
        return `your ${resourceData.fileType?.toUpperCase()} file`;
      case "direct":
        return `the topic "${resourceData.topic}"`;
      default:
        return "your content";
    }
  };

  if (isGenerating && generationProgress) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 rounded-2xl border-0 shadow-sm">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="p-4 bg-blue-50 rounded-full">
                <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-900">
                Generating Learning Content
              </h3>
              <p className="text-muted-foreground">
                {resourceType === "direct" 
                  ? `AI is creating study materials for "${resourceData.topic}"`
                  : `AI is analyzing ${getContentSource()} and creating personalized study materials`
                }
              </p>
            </div>

            <div className="space-y-4">
              <div className="text-left">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {generationProgress.stage}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {generationProgress.estimatedTime} remaining
                  </span>
                </div>
                <Progress 
                  value={generationProgress.progress} 
                  className="h-2 rounded-full"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <Card className="p-6 rounded-2xl border-0 shadow-sm bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-full shadow-sm">
            <Sparkles className="h-6 w-6 text-purple-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              AI-Powered Learning Generation
            </h3>
            <p className="text-sm text-muted-foreground">
              {getGenerationDescription()}
            </p>
          </div>
        </div>
      </Card>

      {/* Topic Information for Direct Creation */}
      {resourceType === "direct" && (
        <Card className="p-4 rounded-2xl border border-green-200 bg-green-50">
          <div className="flex items-center gap-3">
            <Target className="h-5 w-5 text-green-600" />
            <div className="flex-1">
              <h4 className="font-medium text-green-900">Topic: {resourceData.topic}</h4>
              <p className="text-sm text-green-700">{resourceData.description}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Generation Options */}
      <Card className="p-6 rounded-2xl border-0 shadow-sm">
        <div className="space-y-6">
          {/* Content Types */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">What would you like to generate?</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
              {/* Flashcards */}
              <div 
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  generateFlashcards 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setGenerateFlashcards(!generateFlashcards)}
              >
                <div className="flex items-center gap-3">
                  <BookOpen className={`h-5 w-5 ${generateFlashcards ? 'text-blue-600' : 'text-gray-400'}`} />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Flashcards</div>
                    <div className="text-sm text-muted-foreground">Key concepts and definitions</div>
                  </div>
                  {generateFlashcards && <CheckCircle className="h-5 w-5 text-blue-600" />}
                </div>
                
                {generateFlashcards && (
                  <div className="mt-4 pt-4 border-t border-blue-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of flashcards (1-25)
                    </label>
                    <Input
                      type="number"
                      min="1"
                      max="25"
                      value={flashcardCount}
                      onChange={handleFlashcardCountChange}
                      onClick={(e) => e.stopPropagation()}
                      className="w-full rounded-xl"
                      placeholder="Enter number of flashcards..."
                    />
                  </div>
                )}
              </div>

              {/* Quizzes */}
              <div 
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  generateQuizzes 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setGenerateQuizzes(!generateQuizzes)}
              >
                <div className="flex items-center gap-3">
                  <Brain className={`h-5 w-5 ${generateQuizzes ? 'text-purple-600' : 'text-gray-400'}`} />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Quiz Questions</div>
                    <div className="text-sm text-muted-foreground">Various question types for testing</div>
                  </div>
                  {generateQuizzes && <CheckCircle className="h-5 w-5 text-purple-600" />}
                </div>
                
                {generateQuizzes && (
                  <div className="mt-4 pt-4 border-t border-purple-200 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of questions (1-25)
                      </label>
                      <Input
                        type="number"
                        min="1"
                        max="25"
                        value={quizQuestionCount}
                        onChange={handleQuizQuestionCountChange}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full rounded-xl"
                        placeholder="Enter number of questions..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Question Types (select one or more)
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {questionTypeOptions.map((option) => (
                          <div
                            key={option.value}
                            className={`p-3 rounded-lg border cursor-pointer transition-all text-center ${
                              quizQuestionTypes.includes(option.value)
                                ? 'border-purple-500 bg-purple-100 text-purple-800'
                                : 'border-gray-200 hover:border-gray-300 text-gray-700'
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuestionTypeToggle(option.value);
                            }}
                          >
                            <div className="text-lg mb-1">{option.icon}</div>
                            <div className="text-xs font-medium">{option.label}</div>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        AI will create a mix of the selected question types
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Difficulty Level */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Difficulty Level</h4>
            <div className="grid grid-cols-3 gap-3">
              {difficultyOptions.map((option) => (
                <div
                  key={option.value}
                  className={`p-3 rounded-xl border-2 cursor-pointer transition-all text-center ${
                    difficulty === option.value
                      ? option.color
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setDifficulty(option.value as "beginner" | "intermediate" | "advanced")}
                >
                  <div className="font-medium text-sm">{option.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onSkip}
              className="flex-1 rounded-xl"
            >
              Skip AI Generation
            </Button>
            <Button
              onClick={handleGenerate}
              disabled={!generateFlashcards && !generateQuizzes}
              className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Zap className="h-4 w-4 mr-2" />
              Generate with AI
            </Button>
          </div>
        </div>
      </Card>

      {/* Skip Info */}
      <Card className="p-4 rounded-2xl border border-gray-200 bg-gray-50">
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-gray-500" />
          <div className="text-sm text-muted-foreground">
            You can also skip AI generation and create flashcards and quizzes manually in the next step.
          </div>
        </div>
      </Card>
    </div>
  );
} 