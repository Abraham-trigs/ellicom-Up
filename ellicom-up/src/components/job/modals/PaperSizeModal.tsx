"use client";

import React from "react";
import useJobCardStore from "@/lib/store/JobCardStore"; // update path if needed

interface PaperSizeModalProps {
  open: boolean;
  onClose: () => void;
}

const sizes = ["A4", "A3", "A5", "Letter", "Legal"] as const;
type PaperSize = (typeof sizes)[number];

export default function PaperSizeModal({ open, onClose }: PaperSizeModalProps) {
  const setPaperSize = useJobCardStore((state) => state.setPaperSize);

  const handleSelect = (size: PaperSize) => {
    setPaperSize(size);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-container p-5 rounded-2xl w-64 border border-sea shadow-lg">
        <h2 className="text-lg font-bold text-coHead mb-4 text-center">
          Select Paper Size
        </h2>

        <div className="flex flex-col gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => handleSelect(size)}
              className="py-2 px-4 bg-sea text-ground font-semibold rounded-lg hover:bg-high transition"
            >
              {size}
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full py-2 bg-coHead text-container font-bold rounded-lg hover:bg-high"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
