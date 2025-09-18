"use client";
import "./globals.css";
import ThemeProviderWrapper from "../components/ThemeProviderWrapper";
import SessionProviderWrapper from "../components/SessionProviderWrapper";
// import Foot from "@/components/home/foot";
import AnimatedBranding from "@/components/home/AnimatedBranding";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SessionProviderWrapper>
          <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
        </SessionProviderWrapper>

        <footer>
          <AnimatedBranding />
        </footer>
      </body>
    </html>
  );
}
