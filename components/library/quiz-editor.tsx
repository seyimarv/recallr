"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dropdown } from "@/components/ui/dropdown";
import { 
  Edit3, 
  Check, 
  X, 
  Trash2, 
  Plus, 
  Minus,
  CircleDot,
  Square,
  Type
} from "lucide-react";

export interface QuizQuestion {
  id: string;
  type: "multiple-choice" | "true-false" | "fill-in-blank";
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
  isEditing?: boolean;
}

interface QuizEditorProps {
  question: QuizQuestion;
  onSave: (question: QuizQuestion) => void;
  onDelete: (id: string) => void;
  onCancel: () => void;
}

export function QuizEditor({ question, onSave, onDelete, onCancel }: QuizEditorProps) {
  const [isEditing, setIsEditing] = React.useState(question.isEditing || false);
  const [questionText, setQuestionText] = React.useState(question.question);
  const [questionType, setQuestionType] = React.useState(question.type);
  const [options, setOptions] = React.useState(question.options || []);
  const [correctAnswer, setCorrectAnswer] = React.useState(question.correctAnswer);
  const [explanation, setExplanation] = React.useState(question.explanation || "");
  const [difficulty, setDifficulty] = React.useState(question.difficulty);

  const handleSave = () => {
    onSave({
      ...question,
      question: questionText,
      type: questionType,
      options: questionType === "multiple-choice" ? options : undefined,
      correctAnswer,
      explanation,
      difficulty,
      isEditing: false
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setQuestionText(question.question);
    setQuestionType(question.type);
    setOptions(question.options || []);
    setCorrectAnswer(question.correctAnswer);
    setExplanation(question.explanation || "");
    setDifficulty(question.difficulty);
    setIsEditing(false);
    onCancel();
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
    if (correctAnswer === index) {
      setCorrectAnswer(0);
    } else if (typeof correctAnswer === "number" && correctAnswer > index) {
      setCorrectAnswer(correctAnswer - 1);
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const getQuestionTypeIcon = (type: string) => {
    switch (type) {
      case "multiple-choice": return <CircleDot className="h-4 w-4" />;
      case "true-false": return <Square className="h-4 w-4" />;
      case "fill-in-blank": return <Type className="h-4 w-4" />;
      default: return <CircleDot className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "easy": return "text-green-700 bg-green-50 border-green-200";
      case "medium": return "text-yellow-700 bg-yellow-50 border-yellow-200";
      case "hard": return "text-red-700 bg-red-50 border-red-200";
      default: return "text-gray-700 bg-gray-50 border-gray-200";
    }
  };

  const questionTypeOptions = [
    { value: "multiple-choice", label: "Multiple Choice" },
    { value: "true-false", label: "True/False" },
    { value: "fill-in-blank", label: "Fill in the Blank" }
  ];

  if (isEditing) {
    return (
      <Card className="p-6 rounded-2xl border-0 shadow-sm border-purple-200 bg-purple-50/30">
        <div className="space-y-4">
          {/* Editing Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Edit3 className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">Editing Quiz Question</span>
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
                disabled={!questionText.trim()}
                className="rounded-xl text-xs bg-purple-600 hover:bg-purple-700"
              >
                <Check className="h-3 w-3 mr-1" />
                Save
              </Button>
            </div>
          </div>

          {/* Question Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Question Type</label>
            <Dropdown
              value={questionType}
              onValueChange={(value) => {
                setQuestionType(value as any);
                if (value === "true-false") {
                  setOptions(["True", "False"]);
                  setCorrectAnswer(0);
                } else if (value === "multiple-choice" && options.length === 0) {
                  setOptions(["", "", "", ""]);
                  setCorrectAnswer(0);
                } else if (value === "fill-in-blank") {
                  setOptions([]);
                  setCorrectAnswer("");
                }
              }}
              options={questionTypeOptions}
              className="w-full"
            />
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Question</label>
            <textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Enter your question..."
              className="w-full p-3 border border-gray-200 rounded-xl resize-none h-20 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Options (for multiple choice and true/false) */}
          {(questionType === "multiple-choice" || questionType === "true-false") && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Options</label>
              <div className="space-y-2">
                {options.map((option, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <input
                      type="radio"
                      name="correct-answer"
                      checked={correctAnswer === index}
                      onChange={() => setCorrectAnswer(index)}
                      className="text-purple-600"
                    />
                    <Input
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      className="flex-1 rounded-xl"
                      disabled={questionType === "true-false"}
                    />
                    {questionType === "multiple-choice" && options.length > 2 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeOption(index)}
                        className="rounded-xl text-red-600 hover:text-red-700"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                ))}
                {questionType === "multiple-choice" && options.length < 6 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addOption}
                    className="rounded-xl"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add Option
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Correct Answer (for fill-in-blank) */}
          {questionType === "fill-in-blank" && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Correct Answer</label>
              <Input
                value={correctAnswer as string}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                placeholder="Enter the correct answer..."
                className="rounded-xl"
              />
            </div>
          )}

          {/* Explanation */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Explanation (Optional)</label>
            <textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="Explain why this is the correct answer..."
              className="w-full p-3 border border-gray-200 rounded-xl resize-none h-16 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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

  const renderPreview = () => {
    switch (question.type) {
      case "multiple-choice":
        return (
          <div className="space-y-3">
            <p className="font-medium text-gray-900">{question.question}</p>
            <div className="space-y-2">
              {question.options?.map((option, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-xl border transition-colors ${
                    index === question.correctAnswer 
                      ? 'bg-green-50 border-green-200 text-green-800' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      index === question.correctAnswer ? 'border-green-500 bg-green-500' : 'border-gray-300'
                    }`}>
                      {index === question.correctAnswer && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                      )}
                    </div>
                    <span className="text-sm">{option}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "true-false":
        return (
          <div className="space-y-3">
            <p className="font-medium text-gray-900">{question.question}</p>
            <div className="flex gap-4">
              {["True", "False"].map((option, index) => (
                <div 
                  key={option}
                  className={`px-4 py-2 rounded-xl border text-center min-w-20 ${
                    index === question.correctAnswer 
                      ? 'bg-green-50 border-green-200 text-green-800' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <span className="text-sm font-medium">{option}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case "fill-in-blank":
        return (
          <div className="space-y-3">
            <p className="font-medium text-gray-900">{question.question}</p>
            <div className="p-3 bg-green-50 border border-green-200 rounded-xl">
              <span className="text-sm text-green-800">
                <strong>Answer:</strong> {question.correctAnswer}
              </span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

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
            onClick={() => onDelete(question.id)}
            className="rounded-xl text-xs bg-white/90 backdrop-blur-sm text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Question Content */}
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getQuestionTypeIcon(question.type)}
            <Badge 
              variant="outline" 
              className="rounded-full text-xs bg-purple-50 text-purple-700 border-purple-200"
            >
              {question.type.replace("-", " ")}
            </Badge>
          </div>
          <Badge 
            variant="outline" 
            className={`rounded-full text-xs ${getDifficultyColor(question.difficulty)}`}
          >
            {question.difficulty}
          </Badge>
        </div>

        {/* Question Preview */}
        {renderPreview()}

        {/* Explanation */}
        {question.explanation && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-sm text-blue-800">
              <strong>Explanation:</strong> {question.explanation}
            </p>
          </div>
        )}

        {/* Tags */}
        {question.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-2">
            {question.tags.map((tag) => (
              <Badge 
                key={tag}
                variant="secondary" 
                className="text-xs rounded-full bg-gray-100 text-gray-700 border-gray-200"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
} 