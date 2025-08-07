"use client";

import React from "react";
import useJobCardStore from "@/lib/store/JobCardStore";
import JobTypeModal from "@/components/job/modals/JobTypeModal";
import PaperSizeModal from "@/components/job/modals/PaperSizeModal";
import QuantityModal from "@/components/job/modals/QuantityModal";

export default function JobCard() {
  const {
    jobType,
    openModal,
    closeModal,
    isJobTypeModalOpen,
    setJobType,
    paperSize,
    quantity,
    color,
    side,
    fileAttached,
    isPaperSizeModalOpen,
    openPaperSizeModal,
    closePaperSizeModal,
    setPaperSize,
    isQuantityModalOpen,
    openQuantityModal,
    closeQuantityModal,
    setQuantity,
    colorType,
    setColorType,
    sideType,
    toggleSideType,
  } = useJobCardStore();

  const isJobSelected = Boolean(jobType);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Header */}
      <div className="mt-2 flex flex-col items-center">
        <button className="bg-sea rounded-b-2xl px-5 py-2 font-bold text-ground text-sm sm:text-base">
          Job Card
        </button>

        {/* Card Body */}
        {/* Card Body */}
        <div className="w-full sm:max-w-md md:max-w-lg border-2 border-sea bg-darkSea rounded-3xl mt-2 p-4 flex flex-col justify-between gap-4">
          {/* Top Row: PaperSize + JobType + Quantity + Color + Side + File */}
          <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:justify-between">
            {/* Paper Size + Job Info */}
            <div className="flex-1 min-w-[220px] flex flex-row items-center justify-between gap-2 bg-high rounded-xl p-2 shadow-md">
              {/* Paper Size */}
              <div
                onClick={isJobSelected ? openPaperSizeModal : undefined}
                className="flex flex-col justify-center items-center w-20 h-20 sm:w-24 sm:h-24 bg-ground rounded-md border shadow cursor-pointer shrink-0"
              >
                <div className="text-center font-semibold text-coHead text-sm border-b-2 border-coHead">
                  Size
                </div>
              </div>

              {/* Job Type + Quantity */}
              <div className="flex flex-col gap-2 justify-center">
                {/* Job Type */}
                <div
                  onClick={openModal}
                  className="w-24 h-8 rounded-md bg-ground text-coHead flex justify-center items-center text-sm font-semibold cursor-pointer hover:bg-coHead hover:text-ground transition"
                >
                  {isJobSelected ? "Selected" : "Job Type"}
                </div>

                {/* Quantity */}
                <div
                  onClick={isJobSelected ? openQuantityModal : undefined}
                  className="w-24 h-10 rounded-md bg-coHead flex items-center justify-center"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-ground rounded-md text-coHead text-xs font-bold cursor-pointer">
                    QTY
                  </div>
                </div>
              </div>
            </div>

            {/* Color + Side + File */}
            <div className="flex-1 min-w-[220px] flex flex-col items-center bg-high p-3 rounded-2xl shadow-md">
              <div className="flex flex-row gap-2 mb-2">
                <div
                  onClick={() => setColorType("Color")}
                  className={`w-16 h-8 text-sm rounded-md flex items-center justify-center font-semibold cursor-pointer ${
                    colorType === "Color"
                      ? "bg-green-500 text-container"
                      : "bg-coHead text-ground"
                  }`}
                >
                  Color
                </div>
                <div
                  onClick={() => setColorType("Black")}
                  className={`w-16 h-8 text-sm rounded-md flex items-center justify-center font-semibold cursor-pointer ${
                    colorType === "Black"
                      ? "bg-green-500 text-container"
                      : "bg-coHead text-ground"
                  }`}
                >
                  Black
                </div>
              </div>

              <div className="flex flex-row gap-2">
                <div
                  onClick={toggleSideType}
                  className={`w-16 h-8 text-sm rounded-md flex items-center justify-center font-bold cursor-pointer ${
                    sideType === "Front & Back"
                      ? "bg-green-500 text-container"
                      : "bg-coHead text-ground"
                  }`}
                >
                  F/B
                </div>
                <div className="w-16 h-8 rounded-md bg-green-500 text-container flex items-center justify-center font-bold text-sm">
                  {isJobSelected && fileAttached ? "File +" : "-"}
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="w-full flex justify-center mt-2">
            <button
              className="bg-coHead hover:bg-high hover:text-container text-container px-6 py-2 font-bold rounded-md shadow-md transition-all"
              disabled={!isJobSelected}
            >
              Save order
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <JobTypeModal
        open={isJobTypeModalOpen}
        onClose={closeModal}
        onSelect={setJobType}
      />
      <PaperSizeModal
        open={isPaperSizeModalOpen}
        onClose={closePaperSizeModal}
        onSelect={setPaperSize}
      />
      <QuantityModal
        open={isQuantityModalOpen}
        onClose={closeQuantityModal}
        onSelect={setQuantity}
      />
    </div>
  );
}
