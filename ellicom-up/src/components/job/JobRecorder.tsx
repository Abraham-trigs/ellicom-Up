"use client";

import React from "react";
import useJobCardStore from "@/lib/store/JobCardStore";

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

    // setters for live job
    setJobType,
    setPaperSize,
    setQuantity,
    setColorType,
    toggleSideType,
    setMaterial,
    setFileAttached,

    // editing saved jobs
    startEditJob,
    cancelEditJob,
    saveEditedJob,
    setEditedJobField,
  } = useJobCardStore();

  // Build liveJob object
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

  // Build list of jobs: live job + saved jobs
  const jobsToRender = [liveJob, ...savedJobs];

  if (jobsToRender.length === 0) {
    return (
      <div className="mx-2 w-full max-w-md sm:max-w-lg lg:max-w-xl border-2 border-coHead bg-darkSea rounded-2xl p-4">
        <p className="text-center text-coHead">No jobs to display.</p>
      </div>
    );
  }

  // Helper to render each job, either editable or readonly
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
      isEditing: isLive || isEditing,
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
              unitPrice={0}
            />
          );
        default:
          return null;
      }
    };

    return (
      <div key={job.id} className="relative border p-4 rounded-lg bg-surface">
        {renderRecorderByType()}

        {/* Show Edit / Save / Cancel buttons for saved jobs */}
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
        // Don't show live job if no jobType set
        if (job.id === "live" && !job.jobType) return null;
        return renderJob(job);
      })}
    </div>
  );
}
