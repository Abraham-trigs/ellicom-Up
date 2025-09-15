"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useJobPricingStore } from "@/lib/store/JobPricingStore";

interface PaperSizeModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (variable: string) => void;
  jobType: string;
  materialType: string;
}

const backdropStyle = `fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50`;
const modalStyle = `bg-container text-coHead rounded-2xl p-6 w-[90%] max-w-md shadow-2xl border border-sea`;

export default function PaperSizeModal({
  open,
  onClose,
  onSelect,
  jobType,
  materialType,
}: PaperSizeModalProps) {
  const { jobPricingList, fetchJobPricing, isLoading, error } =
    useJobPricingStore();
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Fetch job pricing when modal opens
  useEffect(() => {
    if (open) fetchJobPricing();
  }, [open, fetchJobPricing]);

  // Pull `variable` options from the store based on jobType + materialType
  const options = useMemo(() => {
    if (!jobType || !materialType) return [];
    const filtered = jobPricingList.filter(
      (jp) => jp.jobType === jobType && jp.materialType === materialType
    );

    const seen = new Set<string>();
    return filtered
      .map((jp) => jp.variable)
      .filter((v) => v && !seen.has(v) && seen.add(v));
  }, [jobPricingList, jobType, materialType]);

  useEffect(() => {
    if (open) setHighlightIndex(options.length > 0 ? 0 : -1);
  }, [options, open]);

  useEffect(() => {
    if (highlightIndex >= 0 && itemRefs.current[highlightIndex]) {
      itemRefs.current[highlightIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [highlightIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (options.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected =
        highlightIndex >= 0 ? options[highlightIndex] : options[0];
      if (selected) {
        onSelect(selected);
        onClose();
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className={backdropStyle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={modalStyle}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
          >
            <h2 className="text-xl font-bold mb-4 text-head text-center">
              Select Variable
            </h2>

            {isLoading && (
              <div className="text-center text-sm text-gray-400">
                Loading...
              </div>
            )}
            {error && (
              <div className="text-center text-sm text-red-400">{error}</div>
            )}

            {!isLoading && !error && (
              <div className="max-h-60 overflow-y-auto space-y-2">
                {options.length > 0 ? (
                  options.map((variable, idx) => (
                    <button
                      key={variable}
                      ref={(el) => (itemRefs.current[idx] = el)}
                      onClick={() => {
                        onSelect(variable);
                        onClose();
                      }}
                      className={`w-full text-left px-4 py-2 rounded-xl font-semibold transition ${
                        idx === highlightIndex
                          ? "bg-high text-ground ring-2 ring-gold"
                          : "bg-sea text-ground hover:bg-high"
                      }`}
                    >
                      {variable}
                    </button>
                  ))
                ) : (
                  <div className="text-center text-sm text-gray-400">
                    No variables found.
                  </div>
                )}
              </div>
            )}

            <button
              onClick={onClose}
              className="mt-6 w-full bg-ground text-coHead border border-coHead py-2 rounded-xl hover:bg-coHead hover:text-ground"
            >
              Cancel
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
