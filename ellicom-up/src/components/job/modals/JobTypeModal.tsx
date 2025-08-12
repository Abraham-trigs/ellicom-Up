"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useJobPricingStore } from "@/lib/store/JobPricingStore";

interface JobTypeModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (jobType: string) => void;
}

const backdropStyle = `
  fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50
`;

const modalStyle = `
  bg-container text-coHead rounded-2xl p-6 w-[90%] max-w-md shadow-2xl border border-sea
`;

export default function JobTypeModal({
  open,
  onClose,
  onSelect,
}: JobTypeModalProps) {
  const { jobPricingList, fetchJobPricing, isLoading, error } =
    useJobPricingStore();
  const [search, setSearch] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Deduplicate job types
  const uniqueJobTypes = useMemo(() => {
    const seen = new Set<string>();
    return jobPricingList
      .map((item) => item.jobType)
      .filter((type) => {
        if (seen.has(type)) return false;
        seen.add(type);
        return true;
      })
      .sort();
  }, [jobPricingList]);

  // Filter based on search
  const filteredJobTypes = useMemo(() => {
    return uniqueJobTypes.filter((type) =>
      type.toLowerCase().includes(search.toLowerCase())
    );
  }, [uniqueJobTypes, search]);

  // Auto-focus search bar when modal opens and fetch data
  useEffect(() => {
    if (open) {
      fetchJobPricing();
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearch("");
      setHighlightIndex(-1);
    }
  }, [open, fetchJobPricing]);

  // Highlight first filtered item on filteredJobTypes or open change
  useEffect(() => {
    if (open) {
      setHighlightIndex(filteredJobTypes.length > 0 ? 0 : -1);
    }
  }, [filteredJobTypes, open]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightIndex >= 0 && itemRefs.current[highlightIndex]) {
      itemRefs.current[highlightIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [highlightIndex]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev < filteredJobTypes.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev > 0 ? prev - 1 : filteredJobTypes.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIndex >= 0 && filteredJobTypes[highlightIndex]) {
        onSelect(filteredJobTypes[highlightIndex]);
        onClose();
      } else if (filteredJobTypes.length > 0) {
        onSelect(filteredJobTypes[0]);
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
              Select Job Type
            </h2>

            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search job types..."
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
              <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                {filteredJobTypes.map((type, index) => (
                  <button
                    ref={(el) => {
                      itemRefs.current[index] = el;
                    }}
                    key={type}
                    onClick={() => {
                      onSelect(type);
                      onClose();
                    }}
                    className={`font-bold py-2 px-4 rounded-xl transition
                      ${
                        index === highlightIndex
                          ? "bg-high text-ground ring-2 ring-gold"
                          : "bg-sea text-ground hover:bg-high"
                      }
                    `}
                  >
                    {type}
                  </button>
                ))}

                {filteredJobTypes.length === 0 && (
                  <div className="col-span-2 text-center text-sm text-gray-400">
                    No job types found.
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
