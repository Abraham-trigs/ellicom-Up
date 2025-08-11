import Image from "next/image";

export default function EllicomTag() {
  return (
    <div
      className="
        mx-auto
        relative
        mb-6
        transition-all duration-500 ease-in-out
        w-full
        max-w-screen-xl   /* caps width at ~1280px */
        sm:max-w-screen-2xl /* caps width at ~1536px on sm and above */
        aspect-[3874/1447]
      "
      style={{ willChange: "width, height" }}
    >
      <Image
        src="/ellicom-tag.png"
        alt="Ellicom Tag"
        fill
        style={{ objectFit: "contain" }}
        priority
      />
    </div>
  );
}
