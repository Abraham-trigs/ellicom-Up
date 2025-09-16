"use client";
import BrandingSVG from "./BrandingSVG";

export default function AnimatedBranding() {
  return (
    <div className="relative w-full h-[700px] bg-sea flex flex-col items-center justify-start px-4 pt-32 overflow-hidden">
      {/* Waves container */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        {/* Main background wave (static white) */}
        <svg
          className="absolute top-0 w-[200%] h-full"
          viewBox="0 0 1440 700"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            d="M0,350 C120,450 240,250 360,400 C480,550 600,300 720,450 C840,600 960,350 1080,500 C1200,650 1320,400 1440,550 L1440,700 L0,700 Z"
          />
        </svg>

        {/* Back overlay wave */}
        <svg
          className="absolute top-0 w-[200%] h-full opacity-50 animate-[waveBack_10s_linear_infinite]"
          viewBox="0 0 1440 700"
          preserveAspectRatio="none"
        >
          <path
            fill="#002029"
            d="M0,350 C120,430 240,270 360,380 C480,490 600,310 720,420 C840,530 960,350 1080,460 C1200,570 1320,380 1440,490 L1440,700 L0,700 Z"
          />
        </svg>

        {/* Middle overlay wave */}
        <svg
          className="absolute top-0 w-[200%] h-full opacity-40 animate-[waveMiddle_8s_linear_infinite]"
          viewBox="0 0 1440 700"
          preserveAspectRatio="none"
        >
          <path
            fill="#004d59"
            d="M0,350 C120,420 240,280 360,370 C480,460 600,320 720,410 C840,500 960,340 1080,430 C1200,520 1320,300 1440,390 L1440,700 L0,700 Z"
          />
        </svg>

        {/* Front overlay wave */}
        <svg
          className="absolute top-0 w-[200%] h-full opacity-30 animate-[waveFront_6s_linear_infinite]"
          viewBox="0 0 1440 700"
          preserveAspectRatio="none"
        >
          <path
            fill="#00607a"
            d="M0,350 C120,400 240,260 360,340 C480,420 600,280 720,360 C840,440 960,300 1080,380 C1200,460 1320,280 1440,360 L1440,700 L0,700 Z"
          />
        </svg>
      </div>

      {/* Stable Branding SVG */}
      <div className="relative z-20 mb-12">
        <BrandingSVG />
      </div>

      {/* Contact Details */}
      <div className="relative z-20 text-center text-head space-y-4">
        <p>Email: contact@company.com</p>
        <p>Phone: +233 123 456 789</p>
        <p>Address: 123 Ocean Drive, Accra, Ghana</p>
        <button className="mt-4 px-6 py-3 bg-sea hover:bg-high transition rounded text-black font-semibold">
          Contact Us
        </button>
      </div>

      <div className="bg-ground"></div>

      <style jsx>{`
        @keyframes waveBack {
          0% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-20%);
          }
          100% {
            transform: translateX(0);
          }
        }
        @keyframes waveMiddle {
          0% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-25%);
          }
          100% {
            transform: translateX(0);
          }
        }
        @keyframes waveFront {
          0% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-30%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
