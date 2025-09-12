"use client";

import BackgroundVideo from "@/components/home/background-video";
import EllicomTag from "@/components/home/ellicom-tag";
import VerticalStackSlider from "@/components/home/VerticalStackSlider";

export default function TagAndSlider() {
  return (
    <div>
      <div>
        <BackgroundVideo
          src="background-video.mp4"
          poster="/Video-fallback-image.jpg"
        />
      </div>

      <div
        className="
        -mt-[700px]
        flex flex-col      /* default: stacked */
        lg:flex-row        /* desktop and up: side-by-side */
        lg:items-center
        lg:gap-4
        lg:mr-72
        transition-all duration-500 ease-in-out
      "
      >
        <EllicomTag />
        <div className="mt-6 lg:mt-0 transition-all duration-500 ease-in-out">
          <VerticalStackSlider />
        </div>
      </div>
    </div>
  );
}
