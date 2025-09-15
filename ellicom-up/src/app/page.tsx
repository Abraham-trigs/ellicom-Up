"use client";

import Navbar from "@/components/home/Navbar";
import TagAndSlider from "@/components/home/TagAndSlider";
import ImageDisplay from "@/components/home/ImageDisplay";
import SendJobButton from "@/components/SendJobButton";
import ServiceGrid from "@/components/home/ServiceGrid";
import TextilePrintingSVG from "@/components/home/TextilePrinting/TextilePrnting";

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

        <div
          className="flex flex-col md:flex-row items-center justify-center 
                max-w-6xl mx-auto px-4 gap-8 md:gap-12 lg:gap-16"
        >
          {/* Text Section */}
          <div className="flex-1 flex justify-center">
            <div className="max-w-2xl text-center md:text-left">
              <TextilePrintingSVG />

              <p className="mt-4 text-lg text-textSecondary">
                Our{" "}
                <span className="text-head font-bold">Textile Printing</span>{" "}
                service brings your designs to life on a wide variety of
                fabrics. Whether it’s soft cotton for t-shirts, durable
                polyester for sportswear, elegant silk for fashion pieces, or
                sturdy canvas for banners and tote bags, we ensure vibrant,
                long-lasting prints. We also work with blends, linen, jersey,
                and microfiber, giving you the flexibility to create uniforms,
                branded apparel, promotional items, or custom fashion pieces
                with unmatched quality and color accuracy.
              </p>

              <p className="mt-2 text-lg text-textSecondary">
                We serve schools looking for uniforms and branded wear, churches
                in need of choir robes or event banners, businesses requiring
                staff shirts and promotional textiles, as well as fashion
                designers and individuals seeking unique, customized prints for
                personal use.
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex-1 flex justify-center">
            <div className="max-w-xl">
              <ImageDisplay images={clothImages} alt="Cloth Banner" />
            </div>
          </div>
        </div>
        <div className="">
          <ServiceGrid />
        </div>
      </main>
    </>
  );
}
