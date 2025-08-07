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
    <div className="ml-2 mr-2 w-73 h-70 border-2 border-coHead bg-darkSea rounded-2xl">
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-row items-center">
          {/* Total Amount here — placeholder */}
          <button className="text flex items-center -mt-1 bg-sea rounded-b-2xl p-2 px-5 font-bold scale-90 text-ground mb-3 object-contain">
            GHc 1,200
          </button>
        </div>
      </div>

      {/* 🎯 Render only the active recorder */}
      <div>{renderRecorder()}</div>
    </div>
  );
}
