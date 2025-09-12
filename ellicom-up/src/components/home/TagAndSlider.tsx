"use client";

import BackgroundVideo from "@/components/home/Background-Video";
import EllicomTag from "@/components/home/ellicom-tag";
import VerticalStackSlider from "@/components/home/VerticalStackSlider";
import SameDay from "./sameday/sameday";

export default function TagAndSlider() {
  return (
    <div className="relative w-full">
      {/* Section 1: Background + Tags + Slider */}
      <div className="relative w-full">
        <BackgroundVideo
          src="background-video.mp4"
          poster="/Video-fallback-image.jpg"
        />

        {/* Absolute overlay for tags + slider */}
        <div className="absolute inset-0 flex flex-col lg:flex-row lg:items-center lg:gap-4 lg:mr-72 p-8">
          <EllicomTag />
          <div className="mt-6 lg:mt-0">
            <VerticalStackSlider />
          </div>
        </div>
      </div>

      {/* Section 2: SameDay in its own container */}
      <div className="relative z-20 flex justify-center mt-8">
        <SameDay className="w-72 h-auto" />
      </div>
    </div>
  );
}
