// app/layout.tsx
"use client";

import "./globals.css";
import ThemeProviderWrapper from "../components/ThemeProviderWrapper";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SessionProvider>
          <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}
