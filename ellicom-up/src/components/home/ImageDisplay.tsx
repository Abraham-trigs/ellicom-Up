"use client";

import Image from "next/image";

interface ImageSrcSet {
  src: string;
  width: number;
}

interface ImageDisplayProps {
  alt?: string;
  images: ImageSrcSet[];
}

export default function ImageDisplay({
  alt = "Ellicom Hub banner",
  images,
}: ImageDisplayProps) {
  const largestImage = images[images.length - 1];

  return (
    <section className="relative w-full flex justify-center m-0">
      <Image
        src={largestImage.src}
        alt={alt}
        width={largestImage.width} // natural width
        height={largestImage.width / 2} // or use actual image ratio
        className="object-contain"
        priority
      />
    </section>
  );
}
