"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award } from "lucide-react";

interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
}

interface AchievementsSectionProps {
  achievements: Achievement[];
}

export function AchievementsSection({ achievements }: AchievementsSectionProps) {
  return (
    <Card className="rounded-2xl border-0 bg-white shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3">
          <Trophy className="h-5 w-5 text-yellow-600" />
          Achievements
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {achievements.map((achievement) => (
          <div 
            key={achievement.id}
            className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
              achievement.earned 
                ? 'bg-yellow-50 border border-yellow-200' 
                : 'bg-gray-50 border border-gray-200 opacity-60'
            }`}
          >
            <div className="text-2xl">{achievement.icon}</div>
            <div className="flex-1">
              <h4 className="font-medium text-sm">{achievement.name}</h4>
              <p className="text-xs text-muted-foreground">{achievement.description}</p>
            </div>
            {achievement.earned && (
              <Badge variant="secondary" className="text-xs">
                <Award className="h-3 w-3 mr-1" />
                Earned
              </Badge>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
} 