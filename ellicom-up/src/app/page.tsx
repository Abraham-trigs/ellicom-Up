"use client";

import Navbar from "@/components/home/Navbar";
import TagAndSlider from "@/components/home/TagAndSlider";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="relative z-10 flex-1 min-h-screen p-8 dark:bg-opacity-60 text-sea dark:text-textPrimary transition-colors">
        {/* Tag & Slider + SameDay */}
        <TagAndSlider />

        {/* Content below SameDay */}
        <div className="mt-12">
          <h1 className="text-3xl font-bold mb-4">Large Format Printing</h1>
          <p className="text-lg text-textSecondary">
            Your content here flows naturally below SameDay without being pushed
            down.
          </p>
        </div>
      </main>
    </>
  );
}
