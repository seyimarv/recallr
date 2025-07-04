"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { User, Download, Trash2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { PasswordInput } from "@/components/ui/password-input";

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type PasswordForm = z.infer<typeof passwordSchema>;

export function AccountSettings() {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: PasswordForm) {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
    form.reset();
    setIsLoading(false);
  }

  const handleDataDownload = () => {
    // Simulate data download
    console.log("Downloading user data...");
  };

  const handleAccountDeletion = () => {
    // Show confirmation dialog
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      console.log("Deleting account...");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <User className="h-5 w-5" />
          Account Settings
        </h2>
        <p className="text-gray-600 mt-1">
          Manage your account information and security settings
        </p>
      </div>

      {/* Profile Information */}
      <Card className="p-6 border border-gray-200">
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Profile Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Name</label>
              <p className="text-gray-900">Alex Johnson</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <p className="text-gray-900">alex.johnson@email.com</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Member Since</label>
              <p className="text-gray-900">January 15, 2024</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Account Type</label>
              <p className="text-gray-900">Premium</p>
            </div>
          </div>

          <div className="pt-4">
            <Link href="/profile/edit">
              <Button variant="outline">
                Edit Profile Information
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* Change Password */}
      <Card className="p-6 border border-gray-200">
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Change Password</h3>
          <p className="text-sm text-gray-600">
            Keep your account secure by using a strong password
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Enter your current password"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Enter your new password"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Confirm your new password"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Update Password"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </Card>

      {/* Account Actions */}
      <Card className="p-6 border border-gray-200">
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Account Actions</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Download Your Data</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Download a copy of all your study data and progress
                </p>
              </div>
              <Button
                variant="outline"
                onClick={handleDataDownload}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
              <div className="flex-1">
                <h4 className="font-medium text-red-900">Delete Account</h4>
                <p className="text-sm text-red-700 mt-1">
                  Permanently delete your account and all associated data
                </p>
              </div>
              <Button
                variant="outline"
                onClick={handleAccountDeletion}
                className="flex items-center gap-2 border-red-300 text-red-700 hover:bg-red-100"
              >
                <Trash2 className="h-4 w-4" />
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
} 