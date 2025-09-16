// components/home/DigitalPrintingImage.tsx
import Image from "next/image";

export default function DigitalPrintingImage() {
  return (
    <Image
      src="/digital-printing-1040.webp"
      alt="Digital Printing Banner"
      width={1440}
      height={960}
      sizes="(max-width: 640px) 100vw, 
         (max-width: 1024px) 50vw, 
         100vw"
      className="w-full h-auto rounded-md"
    />
  );
}
