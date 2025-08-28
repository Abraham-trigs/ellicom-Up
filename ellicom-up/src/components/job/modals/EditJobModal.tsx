"use client";

import React, { useState } from "react";
import { JobWithUsers, useJobStore } from "@/lib/store/JobStore";
import JobTypeModal from "./JobTypeModal";
import SelectorModal from "./SelectorModal";
import PaperSizeModal from "./PaperSizeModal";
import QuantityModal from "./QuantityModal";

interface EditJobModalProps {
  job: JobWithUsers;
  onClose: () => void;
  onSave: (updatedJob: JobWithUsers) => void;
}

export default function EditJobModal({
  job,
  onClose,
  onSave,
}: EditJobModalProps) {
  const { jobPricings } = useJobStore();
  const [localJob, setLocalJob] = useState<JobWithUsers>({ ...job });

  const [showJobTypeModal, setShowJobTypeModal] = useState(false);
  const [showSelectorModal, setShowSelectorModal] = useState(false);
  const [showPaperModal, setShowPaperModal] = useState(false);
  const [showQuantityModal, setShowQuantityModal] = useState(false);

  // Unit price calculation
  const calculateUnitPrice = (job: JobWithUsers) => {
    const pricing = jobPricings.find(
      (p) =>
        p.jobType === job.jobType &&
        p.variable.toLowerCase() === (job.material || "").toLowerCase()
    );
    return pricing?.unitPrice || 0;
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-surface text-coHead rounded-2xl p-6 w-[95%] max-w-lg shadow-2xl border border-sea overflow-y-auto max-h-[90vh]">
          <h2 className="text-xl font-bold mb-4 text-head text-center">
            Edit Job
          </h2>

          {/* Job Type */}
          <button
            className="w-full mb-2 p-2 border border-coHead rounded-lg bg-darkSea text-primary font-semibold hover:bg-coHead hover:text-ground"
            onClick={() => setShowJobTypeModal(true)}
          >
            Job Type: {localJob.jobType || "-"}
          </button>

          {/* Material / Variable */}
          {localJob.jobType && (
            <button
              className="w-full mb-2 p-2 border border-coHead rounded-lg bg-darkSea text-primary font-semibold hover:bg-coHead hover:text-ground"
              onClick={() => setShowSelectorModal(true)}
            >
              {localJob.jobType === "Designing" ? "Type" : "Material"}:{" "}
              {localJob.material || "-"}
            </button>
          )}

          {/* Paper Size */}
          <button
            className="w-full mb-2 p-2 border border-coHead rounded-lg bg-darkSea text-primary font-semibold hover:bg-coHead hover:text-ground"
            onClick={() => setShowPaperModal(true)}
          >
            Paper Size: {localJob.paperSize || "-"}
          </button>

          {/* Quantity */}
          <button
            className="w-full mb-2 p-2 border border-coHead rounded-lg bg-darkSea text-primary font-semibold hover:bg-coHead hover:text-ground"
            onClick={() => setShowQuantityModal(true)}
          >
            Quantity: {localJob.quantity || "-"}
          </button>

          {/* Color Type */}
          <div className="mb-2">
            <label className="text-secondary mr-2">Color:</label>
            <select
              className="bg-darkSea text-primary border border-coHead p-1 rounded"
              value={localJob.colorType}
              onChange={(e) =>
                setLocalJob({
                  ...localJob,
                  colorType: e.target.value as "Color" | "Black",
                })
              }
            >
              <option value="Color">Color</option>
              <option value="Black">Black</option>
            </select>
          </div>

          {/* Side Type */}
          <div className="mb-2">
            <label className="text-secondary mr-2">Side:</label>
            <select
              className="bg-darkSea text-primary border border-coHead p-1 rounded"
              value={localJob.sideType}
              onChange={(e) =>
                setLocalJob({
                  ...localJob,
                  sideType: e.target.value as "Front" | "Front & Back",
                })
              }
            >
              <option value="Front">Front</option>
              <option value="Front & Back">Front & Back</option>
            </select>
          </div>

          {/* Details */}
          <div className="mb-2">
            <label className="text-secondary block mb-1">Details:</label>
            <textarea
              className="w-full p-2 border border-coHead rounded bg-darkSea text-primary"
              value={localJob.details || ""}
              onChange={(e) =>
                setLocalJob({ ...localJob, details: e.target.value })
              }
            />
          </div>

          {/* Save / Cancel */}
          <div className="flex gap-2 mt-4">
            <button
              className="flex-1 py-2 bg-gold text-darkSea font-semibold rounded hover:bg-highGold"
              onClick={() => {
                // Calculate unit price
                const updatedJob = {
                  ...localJob,
                  unitPrice: calculateUnitPrice(localJob),
                };
                onSave(updatedJob);
              }}
            >
              Save Changes
            </button>
            <button
              className="flex-1 py-2 bg-ground text-coHead border border-coHead rounded hover:bg-coHead hover:text-ground"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Nested modals */}
      {showJobTypeModal && (
        <JobTypeModal
          open={showJobTypeModal}
          onClose={() => setShowJobTypeModal(false)}
          onSelect={(type) =>
            setLocalJob({ ...localJob, jobType: type, material: "" })
          }
        />
      )}

      {showSelectorModal && (
        <SelectorModal
          open={showSelectorModal}
          onClose={() => setShowSelectorModal(false)}
          onSelect={(selection) =>
            setLocalJob({ ...localJob, material: selection })
          }
          jobType={localJob.jobType}
        />
      )}

      {showPaperModal && (
        <PaperSizeModal
          open={showPaperModal}
          onClose={() => setShowPaperModal(false)}
          onSelect={(size) => setLocalJob({ ...localJob, paperSize: size })}
        />
      )}

      {showQuantityModal && (
        <QuantityModal
          open={showQuantityModal}
          onClose={() => setShowQuantityModal(false)}
          onSelect={(qty) => setLocalJob({ ...localJob, quantity: qty })}
        />
      )}
    </>
  );
}
