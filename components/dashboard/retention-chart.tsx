"use client";

import * as React from "react";
import { BarChart3, TrendingUp, RefreshCw, Brain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StudyData {
  day: string;
  date: string;
  flashcardsReviewed: number;
  quizzesCompleted: number;
  flashcardAccuracy: number;
  quizAccuracy: number;
  studyTimeMinutes: number;
}

export function RetentionChart() {
  // Mock data for the last 7 days - updated to include both flashcards and quizzes
  const mockData: StudyData[] = [
    { 
      day: "Mon", date: "Dec 16", 
      flashcardsReviewed: 25, quizzesCompleted: 1, 
      flashcardAccuracy: 85, quizAccuracy: 80, 
      studyTimeMinutes: 35 
    },
    { 
      day: "Tue", date: "Dec 17", 
      flashcardsReviewed: 32, quizzesCompleted: 2, 
      flashcardAccuracy: 92, quizAccuracy: 95, 
      studyTimeMinutes: 45 
    },
    { 
      day: "Wed", date: "Dec 18", 
      flashcardsReviewed: 18, quizzesCompleted: 0, 
      flashcardAccuracy: 78, quizAccuracy: 0, 
      studyTimeMinutes: 25 
    },
    { 
      day: "Thu", date: "Dec 19", 
      flashcardsReviewed: 41, quizzesCompleted: 3, 
      flashcardAccuracy: 88, quizAccuracy: 87, 
      studyTimeMinutes: 55 
    },
    { 
      day: "Fri", date: "Dec 20", 
      flashcardsReviewed: 29, quizzesCompleted: 1, 
      flashcardAccuracy: 95, quizAccuracy: 90, 
      studyTimeMinutes: 40 
    },
    { 
      day: "Sat", date: "Dec 21", 
      flashcardsReviewed: 35, quizzesCompleted: 2, 
      flashcardAccuracy: 87, quizAccuracy: 85, 
      studyTimeMinutes: 50 
    },
    { 
      day: "Sun", date: "Dec 22", 
      flashcardsReviewed: 23, quizzesCompleted: 1, 
      flashcardAccuracy: 90, quizAccuracy: 92, 
      studyTimeMinutes: 30 
    },
  ];

  const totalFlashcards = mockData.reduce((sum, d) => sum + d.flashcardsReviewed, 0);
  const totalQuizzes = mockData.reduce((sum, d) => sum + d.quizzesCompleted, 0);
  const totalStudyTime = mockData.reduce((sum, d) => sum + d.studyTimeMinutes, 0);
  
  const avgFlashcardAccuracy = Math.round(
    mockData.reduce((sum, d) => sum + d.flashcardAccuracy, 0) / mockData.length
  );
  const avgQuizAccuracy = Math.round(
    mockData.filter(d => d.quizzesCompleted > 0)
      .reduce((sum, d) => sum + d.quizAccuracy, 0) / 
    mockData.filter(d => d.quizzesCompleted > 0).length
  );

  const maxActivity = Math.max(...mockData.map(d => d.flashcardsReviewed + (d.quizzesCompleted * 10)));

  return (
    <Card className="rounded-2xl border-0 bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="flex items-center gap-3 text-lg font-semibold">
            <div className="p-2 bg-purple-50 rounded-xl">
              <BarChart3 className="h-5 w-5 text-purple-600" />
            </div>
            7-Day Learning Activity
          </CardTitle>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              <RefreshCw className="h-3 w-3 mr-1" />
              {avgFlashcardAccuracy}% flashcard accuracy
            </Badge>
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              <Brain className="h-3 w-3 mr-1" />
              {avgQuizAccuracy}% quiz accuracy
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Chart */}
        <div className="h-48 flex items-end justify-between gap-2">
          {mockData.map((data, index) => {
            const flashcardHeight = (data.flashcardsReviewed / maxActivity) * 100;
            const quizHeight = ((data.quizzesCompleted * 10) / maxActivity) * 100;
            const isToday = index === mockData.length - 1;
            
            return (
              <div key={data.day} className="flex-1 flex flex-col items-center gap-3">
                {/* Stacked Bar */}
                <div className="w-full flex flex-col justify-end h-36 relative group">
                  {/* Quiz bar (on top) */}
                  {data.quizzesCompleted > 0 && (
                    <div
                      className={`w-full rounded-t-xl transition-all duration-300 ${
                        isToday
                          ? 'bg-gradient-to-t from-purple-500 to-purple-400'
                          : 'bg-gradient-to-t from-purple-300 to-purple-200'
                      }`}
                      style={{ height: `${quizHeight}%` }}
                    />
                  )}
                  
                  {/* Flashcard bar (bottom) */}
                  <div
                    className={`w-full transition-all duration-300 ${
                      data.quizzesCompleted > 0 ? '' : 'rounded-t-xl'
                    } ${
                      isToday
                        ? 'bg-gradient-to-t from-blue-500 to-blue-400'
                        : 'bg-gradient-to-t from-blue-300 to-blue-200'
                    }`}
                    style={{ height: `${flashcardHeight}%` }}
                  />
                  
                  {/* Tooltip on hover */}
                  <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded-lg py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-lg">
                    <div className="font-medium">{data.date}</div>
                    <div className="flex items-center gap-1 text-blue-300">
                      <RefreshCw className="h-3 w-3" />
                      {data.flashcardsReviewed} cards ({data.flashcardAccuracy}%)
                    </div>
                    {data.quizzesCompleted > 0 && (
                      <div className="flex items-center gap-1 text-purple-300">
                        <Brain className="h-3 w-3" />
                        {data.quizzesCompleted} quiz{data.quizzesCompleted !== 1 ? 'zes' : ''} ({data.quizAccuracy}%)
                      </div>
                    )}
                    <div className="text-gray-400">{data.studyTimeMinutes} minutes</div>
                  </div>
                </div>
                
                {/* Labels */}
                <div className="text-center">
                  <div className={`text-sm font-medium ${isToday ? 'text-purple-600' : 'text-gray-900'}`}>
                    {data.day}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {data.flashcardsReviewed}c{data.quizzesCompleted > 0 ? ` ${data.quizzesCompleted}q` : ''}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{totalFlashcards}</div>
            <div className="text-sm text-muted-foreground">Flashcards</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{totalQuizzes}</div>
            <div className="text-sm text-muted-foreground">Quizzes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{Math.round(totalStudyTime / 60)}h {totalStudyTime % 60}m</div>
            <div className="text-sm text-muted-foreground">Study Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{Math.round((totalFlashcards + totalQuizzes * 5) / 7)}</div>
            <div className="text-sm text-muted-foreground">Daily Avg</div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-t from-blue-500 to-blue-400 rounded-full"></div>
            <span className="text-muted-foreground">Flashcards</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-to-t from-purple-500 to-purple-400 rounded-full"></div>
            <span className="text-muted-foreground">Quizzes</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-3 w-3 text-emerald-600" />
            <span className="text-muted-foreground">
              {totalFlashcards > mockData[0].flashcardsReviewed ? 'Improving' : 'Consistent'} trend
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 