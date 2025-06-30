"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, User, Bell, Shield, Palette } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-4 md:p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and app settings</p>
        </div>

        {/* Settings Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Account Settings */}
          <Card className="rounded-2xl border-0 bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-lg font-semibold">
                <div className="p-2 bg-blue-50 rounded-xl">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                Account
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Manage your profile, email, and password settings.
              </p>
              <Button variant="outline" className="w-full rounded-xl">
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="rounded-2xl border-0 bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-lg font-semibold">
                <div className="p-2 bg-green-50 rounded-xl">
                  <Bell className="h-5 w-5 text-green-600" />
                </div>
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Configure how you receive study reminders and updates.
              </p>
              <Button variant="outline" className="w-full rounded-xl">
                Manage Alerts
              </Button>
            </CardContent>
          </Card>

          {/* Privacy */}
          <Card className="rounded-2xl border-0 bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-lg font-semibold">
                <div className="p-2 bg-purple-50 rounded-xl">
                  <Shield className="h-5 w-5 text-purple-600" />
                </div>
                Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Control your data privacy and sharing preferences.
              </p>
              <Button variant="outline" className="w-full rounded-xl">
                Privacy Settings
              </Button>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card className="rounded-2xl border-0 bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-lg font-semibold">
                <div className="p-2 bg-orange-50 rounded-xl">
                  <Palette className="h-5 w-5 text-orange-600" />
                </div>
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Customize the app's theme and display preferences.
              </p>
              <Button variant="outline" className="w-full rounded-xl">
                Theme Options
              </Button>
            </CardContent>
          </Card>

          {/* Study Settings */}
          <Card className="rounded-2xl border-0 bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-lg font-semibold">
                <div className="p-2 bg-emerald-50 rounded-xl">
                  <Settings className="h-5 w-5 text-emerald-600" />
                </div>
                Study Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Adjust review intervals, difficulty settings, and goals.
              </p>
              <Button variant="outline" className="w-full rounded-xl">
                Configure
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
  );
} 