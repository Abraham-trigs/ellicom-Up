"use client";

import React from "react";
import useJobCardStore from "@/lib/store/JobCardStore";
import JobTypeModal from "@/components/job/modals/JobTypeModal";
import PaperSizeModal from "@/components/job/modals/PaperSizeModal";
import QuantityModal from "@/components/job/modals/QuantityModal";

export default function JobType() {
  const {
    jobType,
    isJobTypeModalOpen,
    openModal,
    closeModal,
    setJobType,
    paperSize,
    isPaperSizeModalOpen,
    openPaperSizeModal,
    closePaperSizeModal,
    setPaperSize,
    quantity,
    isQuantityModalOpen,
    openQuantityModal,
    closeQuantityModal,
    setQuantity,
    colorType,
    setColorType,
    sideType,
    toggleSideType,
    fileAttached,
  } = useJobCardStore();

  const isJobSelected = Boolean(jobType);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full sm:max-w-md md:max-w-lg border-2 border-sea bg-darkSea rounded-3xl mt-2 p-4 flex flex-col gap-4">
        {/* Header inside box — now shows selected job type */}
        <div className="flex justify-center">
          <div
            onClick={openModal}
            className="bg-sea rounded-b-2xl px-5 py-2 -m-4 mb-2 font-bold text-ground text-sm sm:text-base cursor-pointer hover:bg-coHead hover:text-ground transition"
          >
            {jobType || "Job Type"}
          </div>
        </div>

        {/* Top Row */}
        <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:justify-between">
          {/* Paper Size + Job Info */}
          <div className="flex-1 min-w-[220px] flex items-center justify-between gap-2 bg-high rounded-xl p-2 shadow-md">
            {/* Size */}
            <div
              onClick={isJobSelected ? openPaperSizeModal : undefined}
              className={`flex flex-col justify-center items-center w-20 h-20 sm:w-24 sm:h-24 bg-ground rounded-md border shadow cursor-pointer ${
                !isJobSelected && "opacity-50 cursor-not-allowed"
              }`}
            >
              <div className="text-center font-semibold text-coHead text-sm border-b-2 border-coHead">
                Size
              </div>
              <span className="text-xs mt-1">{paperSize || "--"}</span>
            </div>

            {/* Material + QTY */}
            <div className="flex flex-col gap-2 justify-center">
              {/* Material (now disabled when no job selected) */}
              <div
                className={`w-24 h-8 rounded-md bg-ground text-coHead flex justify-center items-center text-sm font-semibold ${
                  !isJobSelected ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Material
              </div>

              {/* QTY */}
              <div
                onClick={isJobSelected ? openQuantityModal : undefined}
                className={`w-24 h-10 rounded-md flex items-center justify-center ${
                  isJobSelected
                    ? "bg-coHead cursor-pointer"
                    : "bg-coHead opacity-50 cursor-not-allowed"
                }`}
              >
                <div className="w-10 h-10 flex items-center justify-center bg-ground rounded-md text-coHead text-xs font-bold">
                  {quantity || "QTY"}
                </div>
              </div>
            </div>
          </div>

          {/* Color + Side + File */}
          <div className="flex-1 min-w-[220px] flex flex-col items-center bg-high p-3 rounded-2xl shadow-md">
            <div className="flex gap-2 mb-2">
              {["Color", "Black"].map((type) => (
                <div
                  key={type}
                  onClick={() => setColorType(type)}
                  className={`w-16 h-8 text-sm rounded-md flex items-center justify-center font-semibold cursor-pointer ${
                    colorType === type
                      ? "bg-green-500 text-container"
                      : "bg-coHead text-ground"
                  }`}
                >
                  {type}
                </div>
              ))}
            </div>

            <div className="flex gap-2">
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
              <div
                className={`w-16 h-8 rounded-md flex items-center justify-center font-bold text-sm ${
                  fileAttached && isJobSelected
                    ? "bg-green-500 text-container"
                    : "bg-coHead text-ground"
                }`}
              >
                {fileAttached && isJobSelected ? "File +" : "-"}
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="w-full flex justify-center">
          <button
            className="bg-coHead hover:bg-high hover:text-container text-container px-6 py-2 font-bold rounded-md shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isJobSelected}
          >
            Save order
          </button>
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
