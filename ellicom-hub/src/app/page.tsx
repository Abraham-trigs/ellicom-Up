import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="flex-1 min-h-screen p-8 bg-ground dark:bg-background text-sea dark:text-textPrimary transition-colors">
      <h1 className="text-4xl font-bold mb-4 text-gold dark:text-head">
        Ellicom Home Page
      </h1>

      <p className="mb-4 text-sea dark:text-textSecondary">
        Welcome to the hub. Let's build it right.
      </p>

      <div className="p-4 rounded border border-inactive dark:border-border bg-container dark:bg-surface">
        <p className="mb-2 text-high dark:text-textPrimary">
          This is a sample container card.
        </p>
        <p className="text-inactive dark:text-textMuted">Subtext inside.</p>
      </div>

      <div className="mt-6">
        <ThemeToggle />
      </div>
    </main>
  );
}
