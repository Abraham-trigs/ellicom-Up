"use client";

import { useRouter } from "next/navigation";

interface SendJobButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
  href?: string; // optional override
}

export default function SendJobButton({
  label,
  onClick,
  className = "",
  href = "./job", // default destination
}: SendJobButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push(href);
    }
  };

  return (
    <button
      className={`mt-10 bg-high text-ground font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-high/90 transition ${className}`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
}
