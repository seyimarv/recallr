"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  User, 
  ArrowLeft,
  Save,
  Camera,
  Mail,
  MapPin,
  FileText
} from "lucide-react";
import Link from "next/link";

export default function EditProfilePage() {
  const [formData, setFormData] = React.useState({
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    location: "San Francisco, CA",
    bio: "Passionate learner focused on technology and languages. Currently studying JavaScript, Python, and French."
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    // Redirect back to profile page
    window.location.href = "/profile";
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/profile">
          <Button variant="outline" size="sm" className="rounded-xl">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Profile
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
          <p className="text-muted-foreground">Update your personal information and preferences</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Picture Section */}
        <Card className="rounded-2xl border-0 bg-white shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3">
              <Camera className="h-5 w-5 text-blue-600" />
              Profile Picture
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
                <User className="h-10 w-10 text-blue-600" />
              </div>
              <div className="space-y-2">
                <Button type="button" variant="outline" className="rounded-xl">
                  Upload New Photo
                </Button>
                <p className="text-xs text-muted-foreground">
                  JPG, PNG or GIF. Max size 2MB. Square images work best.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="rounded-2xl border-0 bg-white shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3">
              <User className="h-5 w-5 text-green-600" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="rounded-xl"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="rounded-xl"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location
              </Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="rounded-xl"
                placeholder="City, Country"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Bio
              </Label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="flex min-h-[120px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                placeholder="Tell us about yourself, your learning goals, or interests..."
              />
              <p className="text-xs text-muted-foreground">
                {formData.bio.length}/500 characters
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Study Preferences */}
        <Card className="rounded-2xl border-0 bg-white shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-purple-600" />
              Study Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="dailyGoal">Daily Study Goal (minutes)</Label>
                <Input
                  id="dailyGoal"
                  name="dailyGoal"
                  type="number"
                  defaultValue="30"
                  className="rounded-xl"
                  min="5"
                  max="300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weeklyGoal">Weekly Study Days Goal</Label>
                <Input
                  id="weeklyGoal"
                  name="weeklyGoal"
                  type="number"
                  defaultValue="5"
                  className="rounded-xl"
                  min="1"
                  max="7"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Reminder Preferences</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="dailyReminder" className="rounded" defaultChecked />
                  <Label htmlFor="dailyReminder" className="text-sm font-normal">
                    Send daily study reminders
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="streakReminder" className="rounded" defaultChecked />
                  <Label htmlFor="streakReminder" className="text-sm font-normal">
                    Notify me when my streak is at risk
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="achievementNotif" className="rounded" defaultChecked />
                  <Label htmlFor="achievementNotif" className="text-sm font-normal">
                    Achievement notifications
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button 
            type="submit" 
            disabled={isLoading}
            className="rounded-xl bg-blue-600 hover:bg-blue-700 flex-1 sm:flex-none"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
          
          <Link href="/profile" className="flex-1 sm:flex-none">
            <Button type="button" variant="outline" className="w-full rounded-xl">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
} 