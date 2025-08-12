"use client";

import React from "react";

interface PaperSizeModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (size: string) => void; // ✅ Added missing prop
}

export default function PaperSizeModal({
  open,
  onClose,
  onSelect,
}: PaperSizeModalProps) {
  if (!open) return null;

  return (
    <div className="modal-backdrop fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="modal-content bg-white p-4 rounded shadow-md w-80">
        <h2 className="text-lg font-semibold mb-4">Select Paper Size</h2>
        <div className="flex flex-col gap-2">
          <button
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            onClick={() => onSelect("A4")}
          >
            A4
          </button>
          <button
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            onClick={() => onSelect("A3")}
          >
            A3
          </button>
          <button
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            onClick={() => onSelect("Letter")}
          >
            Letter
          </button>
        </div>
        <div className="mt-4">
          <button
            className="bg-gray-300 text-black p-2 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
