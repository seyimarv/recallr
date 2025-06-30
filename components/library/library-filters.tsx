"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dropdown } from "@/components/ui/dropdown";
import { Search } from "lucide-react";

interface LibraryFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedDifficulty: string;
  onDifficultyChange: (difficulty: string) => void;
  selectedTag: string;
  onTagChange: (tag: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  availableTags: string[];
}

export function LibraryFilters({
  searchQuery,
  onSearchChange,
  selectedDifficulty,
  onDifficultyChange,
  selectedTag,
  onTagChange,
  sortBy,
  onSortChange,
  availableTags
}: LibraryFiltersProps) {
  // Sort options configuration
  const sortOptions = [
    { value: "date-added", label: "Date Added" },
    { value: "flashcards-count", label: "Flashcards Count" },
    { value: "mastery-level", label: "Mastery Level" },
    { value: "difficulty", label: "Difficulty" },
    { value: "next-review", label: "Next Review" },
  ];

  // Topic options configuration
  const topicOptions = [
    { value: "all", label: "All Topics" },
    ...availableTags.map(tag => ({
      value: tag,
      label: tag
    }))
  ];

  // Show buttons for topics if 5 or fewer, dropdown if more
  const showTopicButtons = availableTags.length <= 5;

  return (
    <Card className="p-6 rounded-2xl border-0 shadow-sm">
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search resources by title, description, or tags..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 rounded-xl"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-4 items-center">
          {/* Difficulty Filter - Always buttons since only 4 options */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Difficulty:</span>
            <div className="flex gap-1">
              {["all", "beginner", "intermediate", "advanced"].map((difficulty) => (
                <Button
                  key={difficulty}
                  variant={selectedDifficulty === difficulty ? "default" : "outline"}
                  size="sm"
                  onClick={() => onDifficultyChange(difficulty)}
                  className="rounded-full text-xs"
                >
                  {difficulty === "all" ? "All" : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Topic Filter - Buttons for few options, dropdown for many */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Topic:</span>
            {showTopicButtons ? (
              <div className="flex gap-1 flex-wrap">
                <Button
                  variant={selectedTag === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => onTagChange("all")}
                  className="rounded-full text-xs"
                >
                  All
                </Button>
                {availableTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    size="sm"
                    onClick={() => onTagChange(tag)}
                    className="rounded-full text-xs"
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            ) : (
              <Dropdown
                value={selectedTag}
                onValueChange={onTagChange}
                options={topicOptions}
                placeholder="Select topic..."
                className="w-48"
              />
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <Dropdown
              value={sortBy}
              onValueChange={onSortChange}
              options={sortOptions}
              placeholder="Sort by..."
              className="w-40"
            />
          </div>
        </div>
      </div>
    </Card>
  );
} 