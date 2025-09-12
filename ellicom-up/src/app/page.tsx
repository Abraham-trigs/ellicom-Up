"use client";
import Navbar from "@/components/home/Navbar";
import ImageDisplay from "@/components/home/ImageDisplay";
// import BackgroundVideo from "@/components/home/Background-Video";

// 🆕 Grouped Tag & Slider import
import TagAndSlider from "@/components/home/TagAndSlider";
import SameDay from "@/components/home/sameday/sameday";

export default function Home() {
  const bannerImages = [
    { src: "/banner-640.jpg", width: 640 },
    { src: "/banner-1024.jpg", width: 1024 },
    { src: "/banner-1440.jpg", width: 1440 },
    { src: "/banner-1920.jpg", width: 1920 },
    { src: "/banner-2560.jpg", width: 2560 },
  ];

  return (
    <>
      {/* <AuthGuard> */}
      <Navbar />

      {/* Background Video */}
      {/* <BackgroundVideo
        src="background-video.mp4"
        poster="/Video-fallback-image.jpg"
      /> */}

      <main className="relative z-10 flex-1 min-h-screen p-8 dark:bg-opacity-60 text-sea dark:text-textPrimary transition-colors">
        {/* 🆕 Clean, reusable Tag & Slider block */}
        <TagAndSlider />

        {/* <h1 className="text-4xl font-bold my-6 text-gold dark:text-head">
          Welcome to Ellicom Hub
        </h1> */}

        {/* <p className="mb-4 text-sea dark:text-textSecondary">
          Let’s build it right, one pixel at a time.
        </p> */}

        {/* Other content */}
        <div className="-mt-[1400px] scale-[0.23]   transform">
          <SameDay />
        </div>

        <ImageDisplay images={bannerImages} alt="Ellicom Hub Banner" />
      </main>
      {/* </AuthGuard> */}
    </>
  );
}
