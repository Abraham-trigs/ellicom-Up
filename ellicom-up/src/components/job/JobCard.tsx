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
    <div>
      {/* Header */}
      <div className="-mt-5 flex flex-col justify-center items-center mb-2">
        <button className="bg-sea rounded-b-2xl p-2 px-5 font-bold scale-75 text-ground mb-3">
          Job Card
        </button>

        {/* Card Body */}
        <div className="flex flex-col justify-evenly items-center w-72 h-43 border-2 border-sea bg-darkSea rounded-3xl -mt-3">
          <div className="flex flex-row justify-between items-center ml-1 mt-3">
            {/* Left Section */}
            <div className="flex flex-row justify-between items-center gap-x-1 w-39 h-30 rounded-xl -ml-2 bg-high drop-shadow-sm shadow-md scale-95">
              {/* Paper Size */}
              <div
                onClick={isJobSelected ? openPaperSizeModal : undefined}
                className="flex flex-col justify-center items-center m-1 w-18 h-26 rounded-md bg-ground border drop-shadow-sm cursor-pointer"
              >
                <div className="text-center font-semibold scale-130 mb-1 border-b-2 border-coHead text-coHead">
                  Size
                </div>
              </div>

              {/* Job Type + Quantity */}
              <div className="flex flex-col gap-3 mr-2">
                {/* Job Type */}
                <div
                  onClick={openModal}
                  className="w-18 h-8 rounded-md bg-ground text-center text-coHead flex justify-center items-center font-semibold cursor-pointer hover:bg-coHead hover:text-ground transition"
                >
                  {isJobSelected ? "Selected" : "Job Type"}
                </div>

                {/* Quantity */}
                <div
                  onClick={isJobSelected ? openQuantityModal : undefined}
                  className="flex flex-row items-center w-18 h-10 rounded-md bg-coHead"
                >
                  <div className="flex flex-row -ml-1 items-center w-10 h-12 rounded-md scale-75 font-bold bg-ground cursor-pointer">
                    <div className="mx-auto text-coHead">QTY</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Color, Side, File */}
            <div className="flex flex-col justify-center items-center ml-1 w-30 h-25 rounded-2xl bg-high drop-shadow-sm shadow-md">
              <div className="flex flex-row gap-x-2 justify-center items-center scale-90 mb-2 mt-3">
                {/* Color */}
                <div
                  onClick={() => setColorType("Color")}
                  className={`w-14 h-8 rounded-md flex justify-center items-center font-semibold cursor-pointer ${
                    colorType === "Color"
                      ? "bg-green-500 text-container"
                      : "bg-coHead text-ground"
                  }`}
                >
                  Color
                </div>

                {/* Black */}
                <div
                  onClick={() => setColorType("Black")}
                  className={`w-14 h-8 rounded-md flex justify-center items-center font-semibold cursor-pointer ${
                    colorType === "Black"
                      ? "bg-green-500 text-container"
                      : "bg-coHead text-ground"
                  }`}
                >
                  Black
                </div>
              </div>

              {/* Side and File */}
              <div className="flex flex-row gap-x-2 justify-center items-center scale-90">
                <div
                  onClick={toggleSideType}
                  className={`w-14 h-8 rounded-md text-center flex justify-center items-center font-bold cursor-pointer ${
                    sideType === "Front & Back"
                      ? "bg-green-500 text-container"
                      : "bg-coHead text-ground"
                  }`}
                >
                  F/B
                </div>
                <div className="w-14 h-8 rounded-md bg-green-500 text-container flex justify-center items-center font-bold">
                  {isJobSelected && fileAttached ? "File +" : "-"}
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex flex-row justify-evenly gap-3 scale-90 mt-2">
            <button
              className="bg-coHead hover:bg-high hover:text-container text-container px-4 py-1 font-bold rounded-md drop-shadow-sm shadow-md"
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
