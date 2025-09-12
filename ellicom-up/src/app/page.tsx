"use client";

import Navbar from "@/components/home/Navbar";
import TagAndSlider from "@/components/home/TagAndSlider";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="relative z-10 flex flex-col gap-12 min-h-screen p-8 dark:bg-opacity-60 text-sea dark:text-textPrimary transition-colors">
        {/* Section 1: Tag & Slider + SameDay */}
        <TagAndSlider />

        {/* Section 2: Content below SameDay */}
        {/* Section 2: Content below SameDay */}
        <div className=" -mt-20 flex flex-col items-center gap-4 text-center">
          <h1 className=" font-bold text-5xl">Large Format Printing</h1>
        </div>
      </main>
    </>
  );
}
