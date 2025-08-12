import "./globals.css";
import ThemeProviderWrapper from "../components/ThemeProviderWrapper";
import SessionProviderWrapper from "../components/SessionProviderWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProviderWrapper>
          <SessionProviderWrapper>{children}</SessionProviderWrapper>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
