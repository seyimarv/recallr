"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { AuthenticatedLayout } from "./dashboard-layout";

interface AppLayoutProps {
  children: React.ReactNode;
}

// Define public routes that should not have the sidebar
const publicRoutes = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
];

// Define auth routes that should not have the sidebar
const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
];

export function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  
  // Mock authentication check - replace with real auth logic
  const isAuthenticated = true; // This should come from your auth provider/context
  
  // Check if current route is public (landing page, auth pages, etc.)
  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);
  
  // Show sidebar only for authenticated users on non-public routes
  const shouldShowSidebar = isAuthenticated && !isPublicRoute && !isAuthRoute;
  
  if (shouldShowSidebar) {
    return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
  }
  
  // For public routes and non-authenticated users, render without sidebar
  return <>{children}</>;
} 