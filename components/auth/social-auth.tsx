"use client";

import * as React from "react";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface SocialAuthProps {
  isLoading?: boolean;
  text?: string;
}

export function SocialAuth({ isLoading = false, text = "Or continue with" }: SocialAuthProps) {
  const handleGoogleAuth = () => {
    // TODO: Implement Google authentication
    console.log("Google auth clicked");
  };

  const handleFacebookAuth = () => {
    // TODO: Implement Facebook authentication
    console.log("Facebook auth clicked");
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">{text}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button 
          variant="outline" 
          type="button" 
          disabled={isLoading}
          onClick={handleGoogleAuth}
        >
          <FaGoogle className="w-4 h-4 mr-2" />
          Google
        </Button>
        <Button 
          variant="outline" 
          type="button" 
          disabled={isLoading}
          onClick={handleFacebookAuth}
        >
          <FaFacebookF className="w-4 h-4 mr-2" />
          Facebook
        </Button>
      </div>
    </div>
  );
} 