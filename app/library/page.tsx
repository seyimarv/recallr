"use client";

import * as React from "react";
import { LinkButton } from "@/components/ui/button";
import { BookOpen, Plus } from "lucide-react";
import { ResourceCard } from "@/components/library/resource-card";
import { LibraryFilters } from "@/components/library/library-filters";
import { LibraryEmptyState } from "@/components/library/library-empty-state";
import { mockResources, filterAndSortResources, extractUniqueTags } from "@/lib/library-utils";

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<string>("all");
  const [selectedTag, setSelectedTag] = React.useState<string>("all");
  const [sortBy, setSortBy] = React.useState<string>("date-added");

  // Extract unique tags from resources
  const availableTags = extractUniqueTags(mockResources);

  // Filter and sort resources
  const filteredResources = filterAndSortResources(
    mockResources,
    searchQuery,
    selectedDifficulty,
    selectedTag,
    sortBy
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <BookOpen className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Your Library</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          All your saved notes, PDFs, and links — with flashcards and quizzes grouped by topic.
        </p>
      </div>

      {/* Filters */}
      <LibraryFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={setSelectedDifficulty}
        selectedTag={selectedTag}
        onTagChange={setSelectedTag}
        sortBy={sortBy}
        onSortChange={setSortBy}
        availableTags={availableTags}
      />

      {/* Resources Grid */}
      {filteredResources.length > 0 ? (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''} found
            </p>
            <LinkButton 
              variant="outline" 
              size="sm" 
              className="rounded-xl"
              href="/library/new"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Resource
            </LinkButton>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </>
      ) : (
        <LibraryEmptyState />
      )}
    </div>
  );
} 