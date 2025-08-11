"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function LogoWithName() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center select-none px-4 sm:px-0"
    >
      {/* Logo container */}
      <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36">
        <Image
          src="/ellicom-logo.svg"
          alt="Ellicom Multimedia Group Ltd. Logo"
          fill
          style={{ objectFit: "contain" }}
          priority
          draggable={false}
        />
      </div>

      {/* Text block */}
      <div className="mt-3 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gold dark:text-highGold leading-tight tracking-wide select-text">
          Ellicom
        </h1>
        <p className="text-sm sm:text-base font-semibold text-sea dark:text-neonSea -mt-1 select-text">
          Multimedia Group Ltd.
        </p>
      </div>
    </motion.div>
  );
}
