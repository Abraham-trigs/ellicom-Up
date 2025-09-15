"use client";

import Navbar from "@/components/home/Navbar";
import TagAndSlider from "@/components/home/TagAndSlider";
import ImageDisplay from "@/components/home/ImageDisplay";
import SendJobButton from "@/components/SendJobButton";
import ServiceGrid from "@/components/home/ServiceGrid";

export default function Home() {
  const bannerImages = [
    { src: "/largeformat-640.webp", width: 640 },
    { src: "/largeformat-1024.webp", width: 1024 },
    { src: "/largeformat-1440.webp", width: 1440 },
    // { src: "/largeformat-1920.webp", width: 1920 },
    // { src: "/largeformat-2560.webp", width: 2560 },
  ];

  const clothImages = [
    { src: "/cloth-640.webp", width: 640 },
    { src: "/cloth-1024.webp", width: 1024 },
    { src: "/cloth-1440.webp", width: 1440 },
    // { src: "/cloth-1920.webp", width: 1920 },
    // { src: "/cloth-2560.webp", width: 2560 },
  ];

  return (
    <>
      <Navbar />

      <main className="relative z-10 flex flex-col gap-12 min-h-screen p-8 dark:bg-opacity-60 text-sea dark:text-textPrimary transition-colors">
        {/* Section 1: Tag & Slider + SameDay */}
        <TagAndSlider />

        {/* Section 2: Content below SameDay */}
        <div className="-mt-20 flex flex-col items-center gap-4 text-center">
          <h1 className="font-bold text-5xl">Large Format Printing</h1>
          <p className="text-gold text-5xl">All sizes Available</p>
        </div>

        {/* Section 3: Image below text */}
        <ImageDisplay
          images={bannerImages}
          alt="Large Format Printing Banner"
        />
        <div className="flex justify-center -mt-20 mb-16">
          <SendJobButton
            label="Send Print / Designs Now"
            onClick={() => alert("Send Print / Designs Now clicked")}
          />
        </div>
        <ImageDisplay images={clothImages} alt="Cloth Banner" />
        <ServiceGrid />
      </main>
    </>
  );
}
