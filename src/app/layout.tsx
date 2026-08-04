import type { Metadata } from "next";

import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const geistSans = { variable: "font-sans" };
const geistMono = { variable: "font-mono" };

export const metadata: Metadata = {
  title: "EcoSave",
  description: "AI-powered ESG platform for restaurants to forecast demand, reduce food waste, and sell surplus meals.",
  icons: {
    icon: "/new-favicon.png",
    shortcut: "/new-favicon.png",
    apple: "/new-favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
