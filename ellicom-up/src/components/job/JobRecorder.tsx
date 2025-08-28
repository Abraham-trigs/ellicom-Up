"use client";

import React, { useMemo, useState } from "react";
import { useJobStore, JobWithUsers } from "@/lib/store/JobStore";

export default function JobRecorder() {
  const { savedJobs, jobPricings, updateJob } = useJobStore();
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<JobWithUsers>>({});

  const jobsToRender = useMemo(() => [...savedJobs].reverse(), [savedJobs]);

  const totalPrice = useMemo(() => {
    return jobsToRender.reduce((acc, job) => {
      const price = job.unitPrice || 0;
      const qty = job.quantity || 1;
      return acc + price * qty;
    }, 0);
  }, [jobsToRender]);

  const handleEditClick = (job: JobWithUsers) => {
    setEditingJobId(job.id);
    setEditValues(job);
  };

  const handleSave = () => {
    if (!editingJobId) return;

    // Calculate unit price dynamically
    let price = 0;
    if (editValues.jobType && (editValues.material || editValues.paperSize)) {
      const pricing = jobPricings.find(
        (p) =>
          p.jobType === editValues.jobType &&
          p.variable.toLowerCase() ===
            (editValues.material || editValues.paperSize)?.toLowerCase()
      );
      if (pricing) price = pricing.unitPrice;
    }

    updateJob({ ...(editValues as JobWithUsers), unitPrice: price });
    setEditingJobId(null);
  };

  const handleCancel = () => setEditingJobId(null);

  const paperSizes = ["A4", "A3", "Letter"];
  const colorTypes = ["Color", "Black"];
  const sideTypes = ["Front", "Front & Back"];

  if (jobsToRender.length === 0) {
    return <p className="text-secondary mx-2">No jobs saved yet.</p>;
  }

  return (
    <div className="mx-2 w-full max-w-3xl bg-surface rounded-3xl p-4 shadow-lg overflow-y-auto max-h-[500px]">
      <h2 className="text-xl font-bold mb-4 text-head">Job Session</h2>
      <div className="space-y-4">
        {jobsToRender.map((job) => {
          const isEditing = job.id === editingJobId;
          const jobNumber = savedJobs.findIndex((j) => j.id === job.id) + 1;

          return (
            <div
              key={job.id}
              className={`relative border-2 rounded-2xl p-4 transition-all ${
                isEditing
                  ? "bg-coHead text-ground border-sea ring-2 ring-gold"
                  : "bg-darkSea text-primary border-coHead"
              }`}
            >
              {/* Job Number */}
              <div
                className={`absolute -top-3 -left-3 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  isEditing
                    ? "bg-green-500 text-container"
                    : "bg-gold text-darkSea"
                }`}
              >
                {jobNumber}
              </div>

              {isEditing ? (
                <div className="space-y-2">
                  {/* Job Type */}
                  <div>
                    <span className="text-secondary">Job Type:</span>{" "}
                    <input
                      value={editValues.jobType || ""}
                      onChange={(e) =>
                        setEditValues({
                          ...editValues,
                          jobType: e.target.value,
                        })
                      }
                      className="ml-2 px-2 py-1 rounded border"
                    />
                  </div>

                  {/* Material / Type */}
                  <div>
                    <span className="text-secondary">
                      {editValues.jobType === "Designing" ? "Type" : "Material"}
                      :
                    </span>{" "}
                    <input
                      value={editValues.material || ""}
                      onChange={(e) =>
                        setEditValues({
                          ...editValues,
                          material: e.target.value,
                        })
                      }
                      className="ml-2 px-2 py-1 rounded border"
                    />
                  </div>

                  {/* Paper Size */}
                  <div>
                    <span className="text-secondary">Paper Size:</span>{" "}
                    <select
                      value={editValues.paperSize || ""}
                      onChange={(e) =>
                        setEditValues({
                          ...editValues,
                          paperSize: e.target.value,
                        })
                      }
                      className="ml-2 px-2 py-1 rounded border"
                    >
                      <option value="">Select</option>
                      {paperSizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Quantity */}
                  <div>
                    <span className="text-secondary">Quantity:</span>{" "}
                    <input
                      type="number"
                      value={editValues.quantity || ""}
                      onChange={(e) =>
                        setEditValues({
                          ...editValues,
                          quantity: Number(e.target.value),
                        })
                      }
                      className="ml-2 px-2 py-1 rounded border w-20"
                    />
                  </div>

                  {/* Color Type */}
                  <div>
                    <span className="text-secondary">Color Type:</span>{" "}
                    <select
                      value={editValues.colorType || ""}
                      onChange={(e) =>
                        setEditValues({
                          ...editValues,
                          colorType: e.target.value as "Color" | "Black",
                        })
                      }
                      className="ml-2 px-2 py-1 rounded border"
                    >
                      {colorTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Side Type */}
                  <div>
                    <span className="text-secondary">Side Type:</span>{" "}
                    <select
                      value={editValues.sideType || ""}
                      onChange={(e) =>
                        setEditValues({
                          ...editValues,
                          sideType: e.target.value as "Front" | "Front & Back",
                        })
                      }
                      className="ml-2 px-2 py-1 rounded border"
                    >
                      {sideTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* File Attached */}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={editValues.fileAttached || false}
                      onChange={(e) =>
                        setEditValues({
                          ...editValues,
                          fileAttached: e.target.checked,
                        })
                      }
                    />
                    <span className="text-secondary">File Attached</span>
                  </div>

                  {/* Details */}
                  <div>
                    <span className="text-secondary">Details:</span>
                    <textarea
                      value={editValues.details || ""}
                      onChange={(e) =>
                        setEditValues({
                          ...editValues,
                          details: e.target.value,
                        })
                      }
                      className="ml-2 px-2 py-1 rounded border w-full"
                      rows={2}
                    />
                  </div>

                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={handleSave}
                      className="px-3 py-1 rounded bg-gold text-darkSea font-semibold hover:bg-highGold"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-3 py-1 rounded bg-gray-300 text-darkSea font-semibold hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-2">
                    <span className="text-secondary">Job Type:</span>{" "}
                    <strong>{job.jobType || "-"}</strong>
                  </div>

                  {job.material && (
                    <div className="mb-2">
                      <span className="text-secondary">
                        {job.jobType === "Designing" ? "Type" : "Material"}:
                      </span>{" "}
                      <strong>{job.material}</strong>
                    </div>
                  )}

                  {job.paperSize && (
                    <div className="mb-2">
                      <span className="text-secondary">Paper Size:</span>{" "}
                      <strong>{job.paperSize}</strong>
                    </div>
                  )}

                  {job.quantity && (
                    <div className="mb-2">
                      <span className="text-secondary">Quantity:</span>{" "}
                      <strong>{job.quantity}</strong>
                    </div>
                  )}

                  {job.colorType && (
                    <div className="mb-2">
                      <span className="text-secondary">Color Type:</span>{" "}
                      <strong>{job.colorType}</strong>
                    </div>
                  )}

                  {job.sideType && (
                    <div className="mb-2">
                      <span className="text-secondary">Side Type:</span>{" "}
                      <strong>{job.sideType}</strong>
                    </div>
                  )}

                  {job.fileAttached && (
                    <div className="mb-2">
                      <span className="text-secondary">File Attached</span>
                    </div>
                  )}

                  {job.details && (
                    <div className="mb-2">
                      <span className="text-secondary">Details:</span>{" "}
                      <strong>{job.details}</strong>
                    </div>
                  )}

                  {job.unitPrice && (
                    <div className="mb-2">
                      <span className="text-secondary">Unit Price:</span>{" "}
                      <strong>₵{job.unitPrice.toFixed(2)}</strong>
                    </div>
                  )}

                  {job.unitPrice && job.quantity && (
                    <div className="mb-2 text-right font-bold text-green-400">
                      Subtotal: ₵{(job.unitPrice * job.quantity).toFixed(2)}
                    </div>
                  )}

                  <button
                    onClick={() => handleEditClick(job)}
                    className="absolute top-2 right-2 px-2 py-1 text-xs bg-gold text-darkSea rounded hover:bg-highGold"
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          );
        })}

        {/* Total Price */}
        <div className="border-t-2 border-coHead pt-4 text-right font-bold text-lg text-gold">
          Total: ₵{totalPrice.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
