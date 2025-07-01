"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Calendar, Camera, Edit3 } from "lucide-react";
import Link from "next/link";

interface ProfileHeaderProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
    bio: string;
    joinDate: string;
    location: string;
  };
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <Card className="rounded-2xl border-0 bg-white shadow-sm">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar Section */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
                <User className="h-12 w-12 md:h-16 md:w-16 text-blue-600" />
              </div>
              <Link href="/profile/edit">
                <Button 
                  size="sm" 
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-white border-2 border-background shadow-sm"
                  variant="outline"
                >
                  <Camera className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 space-y-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                  <Link href="/profile/edit">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Edit3 className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
                <p className="text-muted-foreground mb-1">{user.email}</p>
                <p className="text-sm text-muted-foreground mb-3">{user.location}</p>
              </div>
              <Badge variant="secondary" className="rounded-xl">
                <Calendar className="h-3 w-3 mr-1" />
                Joined {user.joinDate}
              </Badge>
            </div>
            
            <p className="text-gray-700 leading-relaxed">{user.bio}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 