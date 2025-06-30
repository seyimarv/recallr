"use client";

import * as React from "react";
import { Sidebar } from "./sidebar";

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto lg:ml-0">
        <div className="lg:hidden h-16" /> {/* Spacer for mobile menu button */}
        {children}
      </main>
    </div>
  );
}

// Keep the old name for backward compatibility
export const DashboardLayout = AuthenticatedLayout; 