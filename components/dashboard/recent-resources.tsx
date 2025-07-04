"use client";

import * as React from "react";
import { BookOpen, Eye, Plus, Brain, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface LearningResource {
  id: string;
  title: string;
  description: string;
  topic: string;
  tags: string[];
  flashcardCount: number;
  hasQuiz: boolean;
  lastStudied?: string;
  accuracy?: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  masteryLevel: number;
}

export function RecentResources() {
  // Mock data - updated to match our current learning resource structure
  const mockResources: LearningResource[] = [
    {
      id: "1",
      title: "Cardiovascular System Fundamentals",
      description: "Heart anatomy, blood circulation, and cardiac cycle",
      topic: "Cardiovascular Physiology",
      flashcardCount: 24,
      hasQuiz: true,
      tags: ["Heart", "Blood", "Circulation"],
      lastStudied: "2 hours ago",
      accuracy: 87,
      difficulty: "intermediate",
      masteryLevel: 85,
    },
    {
      id: "2", 
      title: "Nervous System Basics",
      description: "Neurons, synapses, and neural transmission",
      topic: "Neuroscience",
      flashcardCount: 18,
      hasQuiz: true,
      tags: ["Neurons", "Brain", "Nervous System"],
      lastStudied: "1 day ago",
      accuracy: 92,
      difficulty: "beginner",
      masteryLevel: 92,
    },
    {
      id: "3",
      title: "Cell Biology Essentials",
      description: "Cell structure, organelles, and cellular processes",
      topic: "Cell Biology",
      flashcardCount: 31,
      hasQuiz: false,
      tags: ["Cells", "Organelles", "Mitosis"],
      lastStudied: "3 days ago",
      accuracy: 78,
      difficulty: "intermediate",
      masteryLevel: 78,
    },
    {
      id: "4",
      title: "Respiratory System Deep Dive",
      description: "Breathing mechanics, gas exchange, and lung function",
      topic: "Respiratory Physiology",
      flashcardCount: 22,
      hasQuiz: true,
      tags: ["Lungs", "Breathing", "Gas Exchange"],
      lastStudied: "5 days ago",
      accuracy: 95,
      difficulty: "advanced",
      masteryLevel: 88,
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-green-50 text-green-700 border-green-200";
      case "intermediate": return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "advanced": return "bg-red-50 text-red-700 border-red-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <Card className="rounded-2xl border-0 bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-lg font-semibold">
            <div className="p-2 bg-emerald-50 rounded-xl">
              <BookOpen className="h-5 w-5 text-emerald-600" />
            </div>
            Recent Resources
          </CardTitle>
          <LinkButton 
            variant="outline" 
            size="sm" 
            className="rounded-xl border-slate-200 hover:bg-slate-50"
            href="/library/new"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </LinkButton>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {mockResources.map((resource) => (
            <div
              key={resource.id}
              className="p-4 border border-slate-100 rounded-xl hover:border-slate-200 hover:shadow-sm transition-all bg-slate-50/50"
            >
              <div className="space-y-3">
                {/* Resource Header */}
                <div>
                  <h3 className="font-semibold text-gray-900 line-clamp-1 mb-1">
                    {resource.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-1 mb-2">
                    {resource.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-medium">{resource.flashcardCount} cards</span>
                    {resource.hasQuiz && (
                      <>
                        <span>•</span>
                        <span className="font-medium">1 quiz</span>
                      </>
                    )}
                    {resource.lastStudied && (
                      <>
                        <span>•</span>
                        <span>{resource.lastStudied}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Topic and Difficulty */}
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                    📚 {resource.topic}
                  </Badge>
                  <Badge variant="outline" className={`text-xs ${getDifficultyColor(resource.difficulty)}`}>
                    {resource.difficulty}
                  </Badge>
                </div>

                {/* Mastery Level */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">Mastery Level</span>
                    <span className="font-medium">{resource.masteryLevel}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full transition-all ${
                        resource.masteryLevel >= 90 ? 'bg-green-500' :
                        resource.masteryLevel >= 75 ? 'bg-blue-500' :
                        resource.masteryLevel >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${resource.masteryLevel}%` }}
                    ></div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    {resource.accuracy && (
                      <div className="text-xs">
                        <span className="text-muted-foreground">Accuracy: </span>
                        <span 
                          className={`font-semibold ${
                            resource.accuracy >= 90 
                              ? 'text-emerald-600' 
                              : resource.accuracy >= 80 
                              ? 'text-amber-600' 
                              : 'text-red-500'
                          }`}
                        >
                          {resource.accuracy}%
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-1">
                    <LinkButton 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 hover:bg-blue-100 rounded-lg" 
                      href={`/flashcards?resource=${resource.id}`}
                      title="Study Flashcards"
                    >
                      <RefreshCw className="h-4 w-4 text-blue-600" />
                    </LinkButton>
                    {resource.hasQuiz && (
                      <LinkButton 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 hover:bg-green-100 rounded-lg"
                        href={`/quiz?resource=${resource.id}`}
                        title="Take Quiz"
                      >
                        <Brain className="h-4 w-4 text-green-600" />
                      </LinkButton>
                    )}
                    <LinkButton 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 hover:bg-slate-100 rounded-lg"
                      href={`/library?view=${resource.id}`}
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </LinkButton>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-4 text-center">
          <LinkButton 
            variant="outline" 
            className="w-full sm:w-auto rounded-xl border-slate-200 hover:bg-slate-50"
            href="/library"
          >
            View All Resources
          </LinkButton>
        </div>
      </CardContent>
    </Card>
  );
} 