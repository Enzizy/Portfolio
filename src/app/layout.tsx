import type { Metadata } from "next";
import { Outfit, Space_Mono } from "next/font/google";
import ThemeToggle from "@/components/theme-toggle";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rolex | Portfolio",
  description:
    "Portfolio of Rolex (Enzizy) - aspiring mobile app developer building Flutter, Android, and web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeInitScript = `
    (() => {
      try {
        const storedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const theme = storedTheme === "dark" || storedTheme === "light"
          ? storedTheme
          : (prefersDark ? "dark" : "light");
        document.documentElement.setAttribute("data-theme", theme);
      } catch {
        document.documentElement.setAttribute("data-theme", "light");
      }
    })();
  `;

  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${outfit.variable} ${spaceMono.variable} antialiased`}>
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
