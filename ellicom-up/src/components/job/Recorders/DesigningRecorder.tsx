"use client";

import React from "react";

interface DesigningRecorderProps {
  jobType: string | null;
  variable: string;
  unitPrice: number;
  isEditing: boolean;
  onChange: {
    setJobType: (jobType: string) => void;
    setMaterial: (material: string) => void;
  };
}

export default function DesigningRecorder({
  jobType,
  variable,
  unitPrice,
  isEditing,
  onChange,
}: DesigningRecorderProps) {
  // Example render — replace with your actual UI logic
  return (
    <div className="designing-recorder">
      <p>Job Type: {jobType}</p>
      <p>Material: {variable}</p>
      <p>Unit Price: {unitPrice}</p>
      <p>{isEditing ? "Editing mode" : "Read-only mode"}</p>

      {/* Example input to update jobType */}
      {isEditing && (
        <>
          <input
            type="text"
            value={jobType || ""}
            onChange={(e) => onChange.setJobType(e.target.value)}
            placeholder="Set Job Type"
          />
          <input
            type="text"
            value={variable}
            onChange={(e) => onChange.setMaterial(e.target.value)}
            placeholder="Set Material"
          />
        </>
      )}
    </div>
  );
}
