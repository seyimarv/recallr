"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  RefreshCw, 
  BookOpen, 
  Plus, 
  User, 
  Settings,
  Menu,
  X,
  Brain
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

const navigationItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Review Today",
    href: "/review",
    icon: RefreshCw,
  },
  {
    name: "Take Quiz",
    href: "/quizzes",
    icon: Brain,
  },
  {
    name: "My Library",
    href: "/library",
    icon: BookOpen,
  },
  {
    name: "Add Content",
    href: "/library/new",
    icon: Plus,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Mock user stats - replace with real data
  const userStats = {
    streak: 5,
    level: 3,
    xp: 128,
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "w-64 bg-white border-r border-slate-200 h-screen flex flex-col",
        "fixed lg:static z-50",
        "transition-transform duration-300 ease-in-out",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        className
      )}>
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-100">
        <Link href="/dashboard" className="flex items-center gap-3">
          <span className="text-2xl">🧠</span>
          <span className="text-xl font-bold text-gray-900">Recallr</span>
        </Link>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 p-4 space-y-1">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors",
                isActive
                  ? "bg-slate-100 text-gray-900 font-semibold"
                  : "text-slate-600 hover:text-gray-900 hover:bg-slate-50"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User Stats Section */}
      <div className="p-4">
        <Card className="bg-slate-50 border-slate-200">
          <CardContent className="p-4 space-y-3">
            <div className="text-center">
              <div className="text-sm text-slate-600 mb-2">Your Progress</div>
              
              {/* Streak */}
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-lg">🔥</span>
                <span className="text-sm font-medium text-gray-900">
                  {userStats.streak}-day streak
                </span>
              </div>
              
              {/* Level & XP */}
              <div className="flex items-center justify-center gap-2">
                <span className="text-lg">🧠</span>
                <span className="text-sm font-medium text-gray-900">
                  Level {userStats.level} — {userStats.xp} XP
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
} 