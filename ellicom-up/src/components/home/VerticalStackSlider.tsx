"use client";

import React, { useState, useEffect, useRef } from "react";

const images = [
  "https://picsum.photos/id/1015/400/600",
  "https://picsum.photos/id/1016/400/600",
  "https://picsum.photos/id/1018/400/600",
  "https://picsum.photos/id/1019/400/600",
  "https://picsum.photos/id/1020/400/600",
  "https://picsum.photos/id/1024/400/600",
  "https://picsum.photos/id/1027/400/600",
];

export default function CenteredPeekSlider() {
  const [topIndex, setTopIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTopIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const maxTilt = 15;
    setTilt({
      x: -(y / (rect.height / 2)) * maxTilt,
      y: (x / (rect.width / 2)) * maxTilt,
    });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
  }

  function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    touchEndX.current = e.touches[0].clientX;
  }

  function handleTouchEnd() {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const swipeThreshold = 50;
    if (diff > swipeThreshold) {
      setTopIndex((prev) => (prev + 1) % images.length);
    } else if (diff < -swipeThreshold) {
      setTopIndex((prev) => (prev - 1 + images.length) % images.length);
    }
    touchStartX.current = null;
    touchEndX.current = null;
  }

  function goPrev() {
    setTopIndex((prev) => (prev - 1 + images.length) % images.length);
  }
  function goNext() {
    setTopIndex((prev) => (prev + 1) % images.length);
  }

  return (
    <div className="relative w-[90vw] max-w-[450px] h-[80vh] max-h-[600px] mx-auto mt-12 select-none flex sm:mb-30 flex-col items-center animate-slideUp">
      {/* Slider */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative w-full h-full rounded-xl bg-purple-900/20"
        style={{ perspective: 1000 }}
      >
        {/* Left arrow */}
        <button
          onClick={goPrev}
          aria-label="Previous card"
          className="absolute left-0 top-[50%] transform -translate-y-1/2 bg-high hover:bg-high/90 text-ground font-black text-3xl text-center rounded-full w-10 h-10 flex items-center justify-center shadow-lg z-30"
        >
          ‹
        </button>

        {/* Right arrow */}
        <button
          onClick={goNext}
          aria-label="Next card"
          className="absolute right-0 top-[50%] transform -translate-y-1/2 bg-high hover:bg-high/90 text-ground font-black text-3xl rounded-full w-10 h-10 flex items-center justify-center shadow-lg z-30"
        >
          ›
        </button>

        {images.map((src, i) => {
          const prevIndex = (topIndex - 1 + images.length) % images.length;
          const nextIndex = (topIndex + 1) % images.length;

          let style: React.CSSProperties = {
            opacity: 0,
            transform: "translateX(0) scale(0.8)",
            zIndex: 0,
            left: "50%",
            top: "50%",
            position: "absolute",
            borderRadius: "1rem",
            transition: "transform 0.5s ease, opacity 0.5s ease",
            width: "90%",
            height: "100%",
            maxHeight: "600px",
            objectFit: "cover",
          };

          if (i === topIndex) {
            style = {
              ...style,
              opacity: 1,
              transform: `translateX(-50%) translateY(-50%) scale(1) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              zIndex: 20,
              boxShadow: "0 20px 40px rgba(128, 0, 128, 0.15)",
            };
          } else if (i === prevIndex) {
            style = {
              ...style,
              opacity: 0.8,
              transform:
                "translateX(calc(-50% - 140px)) translateY(-50%) scale(0.85) rotateY(15deg)",
              zIndex: 15,
            };
          } else if (i === nextIndex) {
            style = {
              ...style,
              opacity: 0.8,
              transform:
                "translateX(calc(-50% + 140px)) translateY(-50%) scale(0.85) rotateY(-15deg)",
              zIndex: 15,
            };
          }

          return (
            <img
              key={src}
              src={src}
              alt={`Card ${i}`}
              draggable={false}
              style={style}
              className="rounded-xl shadow-none"
            />
          );
        })}
      </div>

      {/* Button spaced further down */}
      <button
        className="mt-10 bg-high text-ground font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-high/90 transition"
        onClick={() => alert("Send Print / Designs Now clicked")}
      >
        Send Print / Designs Now
      </button>
    </div>
  );
}
