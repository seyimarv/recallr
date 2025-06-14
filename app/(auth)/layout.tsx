import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Recallr Auth",
    default: "Authentication | Recallr",
  },
  description: "Sign in to your Recallr account to continue learning with AI-powered flashcards and spaced repetition.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
} 