"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Mail, CheckCircle, XCircle, RefreshCw } from "lucide-react";

import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [verificationStatus, setVerificationStatus] = React.useState<'pending' | 'success' | 'error'>('pending');
  const email = searchParams.get('email') || 'your email';

  React.useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      verifyToken(token);
    }
  }, [searchParams]);

  async function verifyToken(token: string) {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Simulate random success/failure for demo (using token for validation)
    const isSuccess = token.length > 10 ? Math.random() > 0.3 : false;
    setVerificationStatus(isSuccess ? 'success' : 'error');
    setIsLoading(false);
  }

  async function resendVerification() {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    // Show success message or handle resend logic
  }

  if (isLoading) {
    return (
      <AuthLayout
        title="Verifying your email"
        description="Please wait while we verify your email address"
      >
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
          <p className="text-gray-600">Verifying your email address...</p>
        </div>
      </AuthLayout>
    );
  }

  if (verificationStatus === 'success') {
    return (
      <AuthLayout
        title="Email verified!"
        description="Your email has been successfully verified"
        footer={
          <Link
            href="/login"
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
          >
            Continue to sign in
          </Link>
        }
      >
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          
          <div className="space-y-2">
            <p className="text-gray-600">
              Welcome to Recallr! Your account is now ready to use.
            </p>
          </div>
        </div>
      </AuthLayout>
    );
  }

  if (verificationStatus === 'error') {
    return (
      <AuthLayout
        title="Verification failed"
        description="We couldn't verify your email address"
        footer={
          <Link
            href="/register"
            className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
          >
            Try creating an account again
          </Link>
        }
      >
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          
          <div className="space-y-2">
            <p className="text-gray-600">
              The verification link may have expired or is invalid.
            </p>
          </div>
          
          <Button
            onClick={resendVerification}
            variant="outline"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Sending..." : "Send new verification email"}
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Check your email"
      description="We've sent a verification link to your email address"
      footer={
        <Link
          href="/login"
          className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
        >
          Back to sign in
        </Link>
      }
    >
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
          <Mail className="w-8 h-8 text-blue-600" />
        </div>
        
        <div className="space-y-2">
          <p className="text-gray-600">
            We've sent a verification link to <strong>{email}</strong>
          </p>
          <p className="text-sm text-gray-500">
            Click the link in the email to verify your account.
          </p>
        </div>
        
        <div className="space-y-3">
          <Button
            onClick={resendVerification}
            variant="outline"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Sending..." : "Resend verification email"}
          </Button>
          
          <p className="text-xs text-gray-500">
            Didn't receive the email? Check your spam folder.
          </p>
        </div>
      </div>
    </AuthLayout>
  );
} 