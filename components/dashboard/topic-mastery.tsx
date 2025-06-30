"use client";

import * as React from "react";

interface TopicMasteryProps {
  topTopics: Array<{
    name: string;
    mastery: number;
    resources: number;
  }>;
}

export function TopicMastery({ topTopics }: TopicMasteryProps) {
  return (
    <div className="p-6 bg-white rounded-2xl border-0 shadow-sm">
      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <span className="text-xl">🎓</span>
        Topic Mastery
      </h3>
      <div className="space-y-4">
        {topTopics.map((topic, index) => (
          <div key={topic.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium text-sm text-gray-900">{topic.name}</div>
                <div className="text-xs text-muted-foreground">{topic.resources} resources</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">{topic.mastery}%</div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all ${
                  topic.mastery >= 90 ? 'bg-green-500' :
                  topic.mastery >= 75 ? 'bg-blue-500' :
                  topic.mastery >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${topic.mastery}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 