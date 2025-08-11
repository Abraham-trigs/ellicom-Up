"use client";

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
  const smallestImage = images[0];
  const srcSet = images.map((img) => `${img.src} ${img.width}w`).join(", ");
  const sizes = "100vw";

  return (
    <section className="relative w-screen -mx-8 sm:-mx-8 md:-mx-8 lg:-mx-8 xl:-mx-8 2xl:-mx-8">
      <div className="relative w-full h-64 sm:h-96 md:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px]">
        <img
          src={smallestImage.src}
          alt={alt}
          srcSet={srcSet}
          sizes={sizes}
          className="object-cover w-full h-full"
          loading="eager"
          fetchPriority="high"
        />
      </div>
    </section>
  );
}
