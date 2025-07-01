"use client";

import * as React from "react";
import { 
  User, 
  Bell, 
  Shield, 
  BookOpen, 
  Palette 
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { AccountSettings } from "@/components/settings/account-settings";
import { NotificationSettings } from "@/components/settings/notification-settings";
import { PrivacySettings } from "@/components/settings/privacy-settings";
import { StudySettings } from "@/components/settings/study-settings";
import { AppearanceSettings } from "@/components/settings/appearance-settings";

const tabs = [
  {
    id: "account",
    label: "Account",
    icon: User,
    component: AccountSettings,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    component: NotificationSettings,
  },
  {
    id: "privacy",
    label: "Privacy",
    icon: Shield,
    component: PrivacySettings,
  },
  {
    id: "study",
    label: "Study",
    icon: BookOpen,
    component: StudySettings,
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: Palette,
    component: AppearanceSettings,
  },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState("account");

  const activeComponent = tabs.find(tab => tab.id === activeTab)?.component;
  const ActiveComponent = activeComponent || AccountSettings;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">
            Manage your account preferences and study settings
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors
                      ${activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }
                    `}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <div className="p-8">
            <ActiveComponent />
          </div>
        </Card>
      </div>
    </div>
  );
} 