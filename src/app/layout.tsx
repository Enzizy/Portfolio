import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import ThemeToggle from "@/components/theme-toggle";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rolex Zhyronne Batican | Developer Portfolio",
  description:
    "Portfolio of Rolex Zhyronne Batican, a BSIT student and developer focused on Flutter, Android, Vue, backend systems, and practical software delivery.",
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
      <body className={`${spaceGrotesk.variable} ${spaceMono.variable}`}>
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
