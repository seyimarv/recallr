"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Shield, Eye, Database, Mail } from "lucide-react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const privacySchema = z.object({
  profileVisibility: z.string(),
  shareProgress: z.boolean(),
  shareAchievements: z.boolean(),
  dataCollection: z.boolean(),
  analytics: z.boolean(),
  thirdPartySharing: z.boolean(),
  marketingEmails: z.boolean(),
});

type PrivacyForm = z.infer<typeof privacySchema>;

export function PrivacySettings() {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<PrivacyForm>({
    resolver: zodResolver(privacySchema),
    defaultValues: {
      profileVisibility: "private",
      shareProgress: false,
      shareAchievements: true,
      dataCollection: true,
      analytics: false,
      thirdPartySharing: false,
      marketingEmails: false,
    },
  });

  async function onSubmit(data: PrivacyForm) {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
    setIsLoading(false);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Privacy Settings
        </h2>
        <p className="text-gray-600 mt-1">
          Control your privacy and data sharing preferences
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Profile Visibility */}
          <Card className="p-6 border border-gray-200">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-gray-500" />
                <h3 className="font-medium text-gray-900">Profile Visibility</h3>
              </div>
              
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="profileVisibility"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Who can see your profile?</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select visibility" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">Public - Anyone can view</SelectItem>
                            <SelectItem value="friends">Friends only</SelectItem>
                            <SelectItem value="private">Private - Only you</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shareProgress"
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
                          Share study progress
                        </FormLabel>
                        <p className="text-xs text-gray-500">
                          Allow others to see your study statistics and progress
                        </p>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shareAchievements"
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
                          Share achievements
                        </FormLabel>
                        <p className="text-xs text-gray-500">
                          Show your badges and achievements to others
                        </p>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </Card>

          {/* Data Collection */}
          <Card className="p-6 border border-gray-200">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-gray-500" />
                <h3 className="font-medium text-gray-900">Data Collection</h3>
              </div>
              
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="dataCollection"
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
                          Allow data collection for app improvement
                        </FormLabel>
                        <p className="text-xs text-gray-500">
                          Help us improve Recallr by sharing anonymous usage data
                        </p>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="analytics"
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
                          Analytics and performance tracking
                        </FormLabel>
                        <p className="text-xs text-gray-500">
                          Allow tracking of app performance and crashes
                        </p>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="thirdPartySharing"
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
                          Third-party data sharing
                        </FormLabel>
                        <p className="text-xs text-gray-500">
                          Allow sharing anonymized data with research partners
                        </p>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </Card>

          {/* Marketing */}
          <Card className="p-6 border border-gray-200">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <h3 className="font-medium text-gray-900">Marketing</h3>
              </div>
              
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="marketingEmails"
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
                          Marketing communications
                        </FormLabel>
                        <p className="text-xs text-gray-500">
                          Receive emails about new features, tips, and promotional offers
                        </p>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </Card>

          {/* Privacy Policy */}
          <Card className="p-6 border border-gray-200 bg-gray-50">
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900">Privacy Policy</h3>
              <p className="text-sm text-gray-600">
                Learn more about how we collect, use, and protect your data in our{" "}
                <a href="/privacy" className="text-blue-600 hover:text-blue-500 font-medium">
                  Privacy Policy
                </a>
                .
              </p>
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