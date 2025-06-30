"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface QuizQuestionData {
  id: string;
  type: "multiple-choice" | "true-false" | "fill-blank";
  question: string;
  options?: QuizOption[];
  correctAnswer?: string;
  explanation?: string;
  topic: string;
}

interface QuizQuestionProps {
  question: QuizQuestionData;
  answer?: string;
  onAnswer: (answer: string) => void;
  onNext: () => void;
  onPrevious?: () => void;
  isLastQuestion: boolean;
  canProceed: boolean;
}

export function QuizQuestion({
  question,
  answer,
  onAnswer,
  onNext,
  onPrevious,
  isLastQuestion,
  canProceed
}: QuizQuestionProps) {
  const [inputValue, setInputValue] = React.useState(answer || "");

  React.useEffect(() => {
    setInputValue(answer || "");
  }, [answer, question.id]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    onAnswer(value);
  };

  const renderQuestionContent = () => {
    switch (question.type) {
      case "multiple-choice":
        return (
          <div className="space-y-3">
            {question.options?.map((option) => (
              <Card
                key={option.id}
                className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
                  answer === option.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => onAnswer(option.id)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    answer === option.id
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300"
                  }`}>
                    {answer === option.id && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="text-gray-900">{option.text}</span>
                </div>
              </Card>
            ))}
          </div>
        );

      case "true-false":
        return (
          <div className="space-y-3">
            {[
              { id: "true", label: "True", emoji: "✅" },
              { id: "false", label: "False", emoji: "❌" }
            ].map((option) => (
              <Card
                key={option.id}
                className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
                  answer === option.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => onAnswer(option.id)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    answer === option.id
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300"
                  }`}>
                    {answer === option.id && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="text-xl mr-2">{option.emoji}</span>
                  <span className="text-gray-900 font-medium">{option.label}</span>
                </div>
              </Card>
            ))}
          </div>
        );

      case "fill-blank":
        return (
          <div className="space-y-4">
            <div className="text-gray-700 text-lg leading-relaxed">
              {question.question.includes("_____") ? (
                question.question.split("_____").map((part, index, array) => (
                  <React.Fragment key={index}>
                    {part}
                    {index < array.length - 1 && (
                      <span className="inline-block mx-2">
                        <Input
                          value={inputValue}
                          onChange={(e) => handleInputChange(e.target.value)}
                          className="inline-block w-32 text-center border-b-2 border-t-0 border-l-0 border-r-0 border-blue-500 rounded-none bg-transparent focus:ring-0 focus:border-blue-600"
                          placeholder="your answer"
                        />
                      </span>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <div className="space-y-3">
                  <p>{question.question}</p>
                  <Input
                    value={inputValue}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className="max-w-md"
                    placeholder="Type your answer here..."
                  />
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="p-6 md:p-8 rounded-2xl border-0 shadow-lg">
      <div className="space-y-6">
        {/* Question */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
            <span className="uppercase tracking-wide font-medium">
              {question.type.replace("-", " ")} Question
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 leading-tight">
            {question.type === "fill-blank" ? "" : question.question}
          </h2>
        </div>

        {/* Question Content */}
        <div className="pt-2">
          {renderQuestionContent()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-100">
          <Button
            variant="ghost"
            onClick={onPrevious}
            disabled={!onPrevious}
            className="flex items-center gap-2 rounded-xl"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="text-sm text-muted-foreground">
            {canProceed ? "Ready to continue" : "Please select an answer"}
          </div>

          <Button
            onClick={onNext}
            disabled={!canProceed}
            className="flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700"
          >
            {isLastQuestion ? "Finish Quiz" : "Next"}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
} 