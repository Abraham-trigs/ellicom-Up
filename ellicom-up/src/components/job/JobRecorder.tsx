"use client";

import React from "react";
import useJobCardStore from "@/lib/store/JobCardStore";

import LargeFormatRecorder from "@/components/job/Recorders/LargeFormatRecorder";
import PapperPrintingRecorder from "@/components/job/Recorders/PapperPrintingRecorder";
import ScanningRecorder from "@/components/job/Recorders/ScanningRecorder";
import PhotocopyRecorder from "@/components/job/Recorders/PhotocopyRecorder";

export default function JobRecorder() {
  const { jobType } = useJobCardStore();

  const renderRecorder = () => {
    switch (jobType) {
      case "Photocopy":
        return <PhotocopyRecorder />;
      case "Printing":
        return <PapperPrintingRecorder />;
      case "Large Format":
        return <LargeFormatRecorder />;
      case "Scanning":
        return <ScanningRecorder />;
      default:
        return null;
    }
  };

  return (
    <div className="mx-2 w-full max-w-md sm:max-w-lg lg:max-w-xl border-2 border-coHead bg-darkSea rounded-2xl p-4">
      {/* Sticky total amount bar */}
      <div className="sticky top-0 z-10 bg-darkSea flex justify-center">
        <button className="bg-sea rounded-b-2xl py-2 px-6 font-bold text-ground mb-4">
          GHc 1,200
        </button>
      </div>

      {/* Recorder wrapper for strict width containment */}
      <div className="w-full max-w-full overflow-x-hidden">
        <div className="w-full max-w-full overflow-hidden break-words">
          {renderRecorder()}
        </div>
      </div>
    </div>
  );
}
