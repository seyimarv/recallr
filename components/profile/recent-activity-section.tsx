"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, BookOpen, Trophy, Clock } from "lucide-react";

interface RecentActivity {
  type: "quiz" | "flashcard" | "achievement" | "study";
  title: string;
  score?: number;
  progress?: number;
  time?: number;
  date: string;
}

interface RecentActivitySectionProps {
  activities: RecentActivity[];
}

export function RecentActivitySection({ activities }: RecentActivitySectionProps) {
  const getActivityIcon = (type: RecentActivity["type"]) => {
    switch (type) {
      case "quiz":
        return <Brain className="h-4 w-4 text-blue-600" />;
      case "flashcard":
        return <BookOpen className="h-4 w-4 text-green-600" />;
      case "achievement":
        return <Trophy className="h-4 w-4 text-yellow-600" />;
      case "study":
        return <Clock className="h-4 w-4 text-purple-600" />;
    }
  };

  const getActivityBgColor = (type: RecentActivity["type"]) => {
    switch (type) {
      case "quiz":
        return "bg-blue-100";
      case "flashcard":
        return "bg-green-100";
      case "achievement":
        return "bg-yellow-100";
      case "study":
        return "bg-purple-100";
    }
  };

  return (
    <Card className="rounded-2xl border-0 bg-white shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-blue-600" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
            <div className={`p-2 rounded-lg ${getActivityBgColor(activity.type)}`}>
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm">{activity.title}</h4>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{activity.date}</span>
                {activity.score && (
                  <>
                    <span>•</span>
                    <span className="text-green-600 font-medium">{activity.score}%</span>
                  </>
                )}
                {activity.progress && (
                  <>
                    <span>•</span>
                    <span className="text-blue-600 font-medium">{activity.progress}% complete</span>
                  </>
                )}
                {activity.time && (
                  <>
                    <span>•</span>
                    <span className="text-purple-600 font-medium">{activity.time} min</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
} 