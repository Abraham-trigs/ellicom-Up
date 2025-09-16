"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function DTFImageDisplay({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 7000); // change every 7s
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full max-w-xl rounded-md overflow-hidden">
      <Image
        key={images[index]}
        src={images[index]}
        alt={alt}
        width={1440}
        height={960} // adjust to your aspect ratio
        sizes="(max-width: 640px) 100vw,
               (max-width: 1024px) 100vw,
               100vw"
        className="w-full h-auto object-cover"
      />
    </div>
  );
}
