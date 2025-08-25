"use client";

import React from "react";
import useJobCardStore from "@/lib/store/JobCardStore";
import { useJobStore } from "@/lib/store/JobStore";

import LargeFormatRecorder from "@/components/job/Recorders/LargeFormatRecorder";
import PapperPrintingRecorder from "@/components/job/Recorders/PapperPrintingRecorder";
import ScanningRecorder from "@/components/job/Recorders/ScanningRecorder";
import PhotocopyRecorder from "@/components/job/Recorders/PhotocopyRecorder";
import DesigningRecorder from "@/components/job/Recorders/DesigningRecorder";

export default function JobRecorder() {
  const {
    jobType,
    paperSize,
    quantity,
    colorType,
    sideType,
    fileAttached,
    material,
    savedJobs,
    editingJobId,
    editedJob,

    setJobType,
    setPaperSize,
    setQuantity,
    setColorType,
    toggleSideType,
    setMaterial,
    setFileAttached,

    startEditJob,
    cancelEditJob,
    saveEditedJob,
    setEditedJobField,
    saveJob,
  } = useJobCardStore();

  const jobPricingList = useJobStore((state) => state.jobPricings);

  const findUnitPrice = (type: string | null, variable: string | null) => {
    if (!type) return 0;
    const pricing = jobPricingList.find(
      (p) =>
        p.jobType === type &&
        (p.variable === variable || p.variable === null || p.variable === "")
    );
    return pricing ? pricing.unitPrice : 0;
  };

  const liveJob = {
    id: "live",
    jobType,
    paperSize,
    quantity,
    colorType,
    sideType,
    fileAttached,
    material,
  };

  const jobsToRender = [liveJob, ...savedJobs];

  if (jobsToRender.length === 0) {
    return (
      <div className="mx-2 w-full max-w-md sm:max-w-lg lg:max-w-xl border-2 border-coHead bg-darkSea rounded-2xl p-4">
        <p className="text-center text-coHead">No jobs to display.</p>
      </div>
    );
  }

  const renderJob = (job: typeof liveJob | typeof editedJob | any) => {
    const isLive = job.id === "live";
    const isEditing = !isLive && editingJobId === job.id;
    const currentJob = isEditing ? editedJob : job;

    const commonProps = {
      key: job.id,
      jobType: currentJob.jobType,
      paperSize: currentJob.paperSize,
      quantity: currentJob.quantity,
      colorType: currentJob.colorType,
      sideType: currentJob.sideType,
      fileAttached: currentJob.fileAttached,
      material: currentJob.material,
      isEditing: isEditing, // Only true for saved jobs being edited
      onChange: isLive
        ? {
            setJobType,
            setPaperSize,
            setQuantity,
            setColorType,
            toggleSideType,
            setMaterial,
            setFileAttached,
          }
        : {
            setJobType: (v: string) => setEditedJobField("jobType", v),
            setPaperSize: (v: string) => setEditedJobField("paperSize", v),
            setQuantity: (v: number) => setEditedJobField("quantity", v),
            setColorType: (v: string) => setEditedJobField("colorType", v),
            toggleSideType: () => {
              setEditedJobField(
                "sideType",
                currentJob.sideType === "Front" ? "Front & Back" : "Front"
              );
            },
            setMaterial: (v: string) => setEditedJobField("material", v),
            setFileAttached: (v: boolean) =>
              setEditedJobField("fileAttached", v),
          },
    };

    const renderRecorderByType = () => {
      switch (currentJob.jobType) {
        case "Photocopy":
          return <PhotocopyRecorder {...commonProps} />;
        case "Printing":
          return <PapperPrintingRecorder {...commonProps} />;
        case "Large Format":
          return <LargeFormatRecorder {...commonProps} />;
        case "Scanning":
          return <ScanningRecorder {...commonProps} />;
        case "Designing":
          return (
            <DesigningRecorder
              {...commonProps}
              variable={currentJob.material || ""}
              unitPrice={findUnitPrice("Designing", currentJob.material)}
            />
          );
        default:
          return null;
      }
    };

    return (
      <div key={job.id} className="relative border p-4 rounded-lg bg-surface">
        {renderRecorderByType()}

        {/* Only show edit/save buttons for saved jobs */}
        {!isLive && (
          <div className="mt-2 flex justify-end gap-2">
            {!isEditing && (
              <button
                className="bg-sea text-white px-3 py-1 rounded hover:bg-high transition"
                onClick={() => startEditJob(job.id)}
              >
                Edit
              </button>
            )}
            {isEditing && (
              <>
                <button
                  className="bg-gold text-black px-3 py-1 rounded hover:bg-highGold transition"
                  onClick={() => {
                    saveEditedJob(editedJob!);
                  }}
                >
                  Save Changes
                </button>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  onClick={() => cancelEditJob()}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mx-2 w-full max-w-md sm:max-w-lg lg:max-w-xl border-2 border-coHead bg-darkSea rounded-2xl p-4 space-y-6">
      {jobsToRender.map((job) => {
        if (job.id === "live" && !job.jobType) return null;
        return renderJob(job);
      })}
    </div>
  );
}
