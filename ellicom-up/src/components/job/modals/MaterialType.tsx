"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useJobPricingStore } from "@/lib/store/JobPricingStore";

interface MaterialTypeModalModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (material: string) => void;
  jobType: string;
}

const backdropStyle = `fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50`;
const modalStyle = `bg-container text-coHead rounded-2xl p-6 w-[90%] max-w-md shadow-2xl border border-sea`;

export default function MaterialTypeModal({
  open,
  onClose,
  onSelect,
  jobType,
}: MaterialTypeModalModalProps) {
  const { jobPricingList, fetchJobPricing, isLoading, error } =
    useJobPricingStore();

  const [search, setSearch] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Fetch job pricing when modal opens
  useEffect(() => {
    if (open) {
      fetchJobPricing();
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearch("");
      setHighlightIndex(-1);
    }
  }, [open, fetchJobPricing]);

  // Filter materials for the selected jobType
  const options = useMemo(() => {
    if (!jobType) return [];
    const filtered = jobPricingList.filter((jp) => jp.jobType === jobType);

    const seen = new Set<string>();
    return filtered
      .map((jp) => jp.materialType)
      .filter((mat): mat is string => !!mat)
      .filter((mat) => !seen.has(mat) && seen.add(mat))
      .filter((mat) =>
        search ? mat.toLowerCase().includes(search.toLowerCase()) : true
      );
  }, [jobPricingList, jobType, search]);

  // Highlight first item when options change
  useEffect(() => {
    if (open) setHighlightIndex(options.length > 0 ? 0 : -1);
  }, [options, open]);

  // Scroll highlighted item into view
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
          >
            <h2 className="text-xl font-bold mb-4 text-head text-center">
              Select Material
            </h2>

            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search materials..."
              className="w-full mb-4 px-3 py-2 border border-sea rounded-lg outline-none focus:ring-2 focus:ring-sea"
            />

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
                  options.map((mat, idx) => (
                    <button
                      key={mat}
                      ref={(el) => (itemRefs.current[idx] = el)}
                      onClick={() => {
                        onSelect(mat);
                        onClose();
                      }}
                      className={`w-full text-left px-4 py-2 rounded-xl font-semibold transition ${
                        idx === highlightIndex
                          ? "bg-high text-ground ring-2 ring-gold"
                          : "bg-sea text-ground hover:bg-high"
                      }`}
                    >
                      {mat}
                    </button>
                  ))
                ) : (
                  <div className="text-center text-sm text-gray-400">
                    No materials found.
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
