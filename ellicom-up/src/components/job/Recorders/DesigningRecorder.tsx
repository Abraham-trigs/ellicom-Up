import React from "react";

interface DesigningRecorderProps {
  jobType: string | null;
  variable: string | null; // material equivalent
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
  if (jobType !== "Designing") return null;

  return (
    <div className="w-full max-w-sm p-4 bg-high rounded-xl shadow-md text-ground">
      <h2 className="text-xl font-bold mb-4">Designing Info</h2>

      {isEditing ? (
        <div className="space-y-3">
          <div>
            <label className="block font-semibold mb-1">Job Type</label>
            <select
              value={jobType}
              onChange={(e) => onChange.setJobType(e.target.value)}
              className="w-full rounded border border-gray-300 p-2"
            >
              <option value="Designing">Designing</option>
              {/* Add other job types if you want */}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Design Type</label>
            <input
              type="text"
              value={variable || ""}
              onChange={(e) => onChange.setMaterial(e.target.value)}
              placeholder="Enter design type"
              className="w-full rounded border border-gray-300 p-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Unit Price</label>
            <p>₵{unitPrice.toFixed(2)}</p>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <p>
            <span className="font-bold">Job Type:</span> {jobType}
          </p>
          <p>
            <span className="font-bold">Design Type:</span> {variable || "-"}
          </p>
          <p>
            <span className="font-bold">Unit Price:</span> ₵
            {unitPrice.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
}
