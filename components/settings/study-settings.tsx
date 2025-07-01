"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Target, Clock, BarChart, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const studySchema = z.object({
  dailyGoal: z.string().min(1, "Daily goal is required"),
  weeklyGoal: z.string().min(1, "Weekly goal is required"),
  difficulty: z.string(),
  reviewInterval: z.string(),
  autoAdvance: z.boolean(),
  showTimer: z.boolean(),
  audioFeedback: z.boolean(),
});

type StudyForm = z.infer<typeof studySchema>;

export function StudySettings() {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<StudyForm>({
    resolver: zodResolver(studySchema),
    defaultValues: {
      dailyGoal: "20",
      weeklyGoal: "140",
      difficulty: "medium",
      reviewInterval: "adaptive",
      autoAdvance: false,
      showTimer: true,
      audioFeedback: false,
    },
  });

  async function onSubmit(data: StudyForm) {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
    setIsLoading(false);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Study Settings
        </h2>
        <p className="text-gray-600 mt-1">
          Configure your study goals and learning preferences
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Goals */}
          <Card className="p-6 border border-gray-200">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-gray-500" />
                <h3 className="font-medium text-gray-900">Study Goals</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="dailyGoal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Daily Goal (cards)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter daily goal"
                          type="number"
                          min="1"
                          max="100"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="weeklyGoal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weekly Goal (cards)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter weekly goal"
                          type="number"
                          min="1"
                          max="1000"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </Card>

          {/* Learning Preferences */}
          <Card className="p-6 border border-gray-200">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <BarChart className="h-4 w-4 text-gray-500" />
                <h3 className="font-medium text-gray-900">Learning Preferences</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Difficulty Level</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="easy">Easy - More repetition</SelectItem>
                            <SelectItem value="medium">Medium - Balanced approach</SelectItem>
                            <SelectItem value="hard">Hard - Less repetition</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reviewInterval"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Review Interval</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select interval" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="conservative">Conservative - More reviews</SelectItem>
                            <SelectItem value="adaptive">Adaptive - Smart spacing</SelectItem>
                            <SelectItem value="aggressive">Aggressive - Fewer reviews</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </Card>

          {/* Interface Preferences */}
          <Card className="p-6 border border-gray-200">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <h3 className="font-medium text-gray-900">Interface Preferences</h3>
              </div>
              
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="autoAdvance"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal">
                          Auto-advance cards
                        </FormLabel>
                        <p className="text-xs text-gray-500">
                          Automatically move to the next card after answering
                        </p>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="showTimer"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal">
                          Show study timer
                        </FormLabel>
                        <p className="text-xs text-gray-500">
                          Display how long you've been studying
                        </p>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="audioFeedback"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal">
                          Audio feedback
                        </FormLabel>
                        <p className="text-xs text-gray-500">
                          Play sounds for correct and incorrect answers
                        </p>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </Card>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
} 