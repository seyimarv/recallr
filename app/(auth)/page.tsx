import Link from "next/link";
import { Brain } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AuthIndexPage() {
  const authScreens = [
    {
      title: "Login",
      description: "Sign in to existing account",
      href: "/login",
    },
    {
      title: "Register",
      description: "Create a new account",
      href: "/register",
    },
    {
      title: "Forgot Password",
      description: "Reset your password",
      href: "/forgot-password",
    },
    {
      title: "Reset Password",
      description: "Set a new password",
      href: "/reset-password",
    },
    {
      title: "Verify Email",
      description: "Email verification flow",
      href: "/verify-email",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-8">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Brain className="h-12 w-12 text-blue-600" />
            <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Recallr Auth
            </span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Authentication Screens
          </h1>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Complete authentication system with modern design, form validation, and smooth user experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authScreens.map((screen) => (
            <Card key={screen.href} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {screen.title}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {screen.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link href={screen.href}>
                    View {screen.title}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-500 font-medium transition-colors"
          >
            ← Back to landing page
          </Link>
        </div>
      </div>
    </div>
  );
} 