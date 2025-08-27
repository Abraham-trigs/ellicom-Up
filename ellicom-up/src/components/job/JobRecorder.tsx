"use client";

import React from "react";
import { useJobStore } from "@/lib/store/JobStore";

export default function JobRecorder() {
  const { currentJob } = useJobStore();

  if (!currentJob) {
    return <p className="text-secondary mx-2">No job selected.</p>;
  }

  return (
    <div className="mx-2 w-full max-w-2xl space-y-4">
      <div>
        {/* Job Type */}
        <div className="border-2 border-coHead bg-darkSea rounded-2xl p-4">
          <span className="text-secondary">Job Type:</span>
          <h3 className="text-primary font-semibold">
            {currentJob.jobType || "-"}
          </h3>
        </div>

        {/* Material / Option */}
        {currentJob.material && (
          <div className="border-2 border-coHead bg-darkSea rounded-2xl p-4">
            <span className="text-secondary">Material </span>
            <h3 className="text-primary font-semibold">
              {currentJob.material}
            </h3>
          </div>
        )}

        {/* Details */}
        {currentJob.details && (
          <div className="border-2 border-coHead bg-darkSea rounded-2xl p-4">
            <span className="text-secondary">Details:</span>
            <p className="text-primary">{currentJob.details}</p>
          </div>
        )}

        {/* Quantity */}
        {currentJob.quantity && (
          <div className="border-2 border-coHead bg-darkSea rounded-2xl p-4">
            <span className="text-secondary">Quantity:</span>
            <h3 className="text-primary font-semibold">
              {currentJob.quantity}
            </h3>
          </div>
        )}

        {/* Unit Price */}
        {currentJob.unitPrice && (
          <div className="border-2 border-coHead bg-darkSea rounded-2xl p-4">
            <span className="text-secondary">Unit Price:</span>
            <h3 className="text-gold font-semibold">${currentJob.unitPrice}</h3>
          </div>
        )}
      </div>
    </div>
  );
}
