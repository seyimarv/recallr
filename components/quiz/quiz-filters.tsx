"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dropdown } from "@/components/ui/dropdown";
import { Search, Filter } from "lucide-react";

interface QuizFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedDifficulty: string;
  onDifficultyChange: (difficulty: string) => void;
  selectedTopic: string;
  onTopicChange: (topic: string) => void;
  availableTopics: string[];
}

export function QuizFilters({
  searchQuery,
  onSearchChange,
  selectedDifficulty,
  onDifficultyChange,
  selectedTopic,
  onTopicChange,
  availableTopics
}: QuizFiltersProps) {
  // Difficulty options
  const difficultyOptions = [
    { value: "all", label: "All Levels" },
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
  ];

  // Topic options
  const topicOptions = [
    { value: "all", label: "All Topics" },
    ...availableTopics.map(topic => ({
      value: topic,
      label: topic
    }))
  ];

  // Show buttons for topics if 4 or fewer, dropdown if more
  const showTopicButtons = availableTopics.length <= 4;

  return (
    <Card className="p-6 rounded-2xl border-0 shadow-sm">
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search quizzes..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 rounded-xl"
            />
          </div>
          <Button variant="outline" size="sm" className="rounded-xl">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-4 items-center">
          {/* Difficulty Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Difficulty:</span>
            <div className="flex gap-1">
              {difficultyOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={selectedDifficulty === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => onDifficultyChange(option.value)}
                  className="rounded-full text-xs"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Topic Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Topic:</span>
            {showTopicButtons ? (
              <div className="flex gap-1 flex-wrap">
                <Button
                  variant={selectedTopic === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => onTopicChange("all")}
                  className="rounded-full text-xs"
                >
                  All
                </Button>
                {availableTopics.map((topic) => (
                  <Button
                    key={topic}
                    variant={selectedTopic === topic ? "default" : "outline"}
                    size="sm"
                    onClick={() => onTopicChange(topic)}
                    className="rounded-full text-xs"
                  >
                    {topic}
                  </Button>
                ))}
              </div>
            ) : (
              <Dropdown
                value={selectedTopic}
                onValueChange={onTopicChange}
                options={topicOptions}
                placeholder="Select topic..."
                className="w-48"
              />
            )}
          </div>
        </div>
      </div>
    </Card>
  );
} 