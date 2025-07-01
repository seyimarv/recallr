"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface ProfileStatCardProps {
  icon: LucideIcon;
  iconColor: string;
  bgGradient: string;
  borderColor: string;
  title: string;
  value: string | number;
  subtitle: string;
  badge?: {
    text: string;
  };
}

export function ProfileStatCard({
  icon: Icon,
  iconColor,
  bgGradient,
  borderColor,
  title,
  value,
  subtitle,
  badge
}: ProfileStatCardProps) {
  return (
    <Card className={`rounded-2xl border-0 ${bgGradient} ${borderColor}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Icon className={`h-8 w-8 ${iconColor}`} />
          {badge && (
            <Badge variant="secondary" className="text-xs">
              {badge.text}
            </Badge>
          )}
        </div>
        <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
        <p className={`text-2xl font-bold ${iconColor}`}>{value}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  );
} 