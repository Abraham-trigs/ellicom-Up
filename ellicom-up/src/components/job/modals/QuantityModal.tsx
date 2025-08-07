"use client";

import React, { useState, useEffect } from "react";
import useJobCardStore from "@/lib/store/JobCardStore";

interface QuantityModalProps {
  open: boolean;
  onClose: () => void;
}

export default function QuantityModal({ open, onClose }: QuantityModalProps) {
  const setQuantity = useJobCardStore((state) => state.setQuantity);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    if (open) setInputValue(""); // Reset input on open
  }, [open]);

  const handleSave = () => {
    const num = parseInt(inputValue);
    if (!isNaN(num) && num > 0 && num <= 10000) {
      setQuantity(num);
      onClose();
    } else {
      alert("Please enter a valid quantity (1–10000)");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-container border border-sea rounded-xl p-6 w-80 shadow-lg text-coHead">
        <div className="text-xl font-bold mb-4 text-center">Enter Quantity</div>

        <input
          type="number"
          autoFocus
          className="w-full px-4 py-2 rounded-md bg-ground text-head text-center text-2xl font-bold outline-none border border-high"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          min={1}
          max={10000}
        />

        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-sea hover:bg-neonSea text-ground font-bold px-4 py-2 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
