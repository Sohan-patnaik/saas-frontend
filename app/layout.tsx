import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://howyouthink.ai"),

  title: {
    default: "HowYouThink",
    template: "%s | HowYouThink",
  },

  description:
    "Build custom AI chatbots trained on your own data and embed them into your website in minutes.",

  keywords: [
    "AI chatbot builder",
    "custom AI chatbot",
    "website AI chatbot",
    "embed chatbot",
    "train chatbot with documents",
    "AI customer support bot",
    "AI SaaS",
    "chatbot platform",
  ],

  authors: [{ name: "Sohan Patnaik" }],
  creator: "Sohan Patnaik",

  applicationName: "HowYouThink",

  openGraph: {
    title: "HowYouThink – AI Chatbots for Websites",
    description:
      "Create, train, and embed AI chatbots into your website without coding.",
    url: "https://howyouthink.ai",
    siteName: "HowYouThink",
    type: "website",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HowYouThink AI Chatbot Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "HowYouThink – AI Chatbots",
    description:
      "Create AI chatbots using your own data and embed them anywhere.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${inter.variable} ${jetbrainsMono.variable} bg-gray-50 text-gray-900 antialiased`}
        >
          <header className="sticky top-0 z-50 h-16 border-b border-gray-200 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
              
              <div className="text-lg font-semibold tracking-tight">
                HowYouThink
              </div>

              <div className="flex items-center gap-4">
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="text-sm font-medium text-gray-700 transition hover:text-black">
                      Sign In
                    </button>
                  </SignInButton>

                  <SignUpButton mode="modal">
                    <button className="rounded-lg bg-[#6c47ff] px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#5a3be0] hover:shadow-md active:scale-95">
                      Get Started
                    </button>
                  </SignUpButton>
                </SignedOut>

                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </div>
            </div>
          </header>

          <main className="min-h-[calc(100vh-64px)]">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}