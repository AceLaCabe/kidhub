// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { LowStimProvider } from "@/components/low-stim-provider";
import TopBar from "@/components/top-bar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kids Hub",
  description: "Gentle routine and regulation support for families.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <LowStimProvider>
          <div className="min-h-screen px-4 py-3 sm:py-8">
            <div className="mx-auto w-full max-w-[420px]">
              <TopBar />
              <main id="main-content" className="pb-8 pt-2">
                {children}
              </main>
            </div>
          </div>
        </LowStimProvider>
      </body>
    </html>
  );
}