"use client";

import React from "react";
import useJobCardStore from "@/lib/store/JobCardStore";
import { useJobPricingStore } from "@/lib/store/JobPricingStore";

import JobTypeModal from "@/components/job/modals/JobTypeModal";
import PaperSizeModal from "@/components/job/modals/PaperSizeModal";
import QuantityModal from "@/components/job/modals/QuantityModal";
import SelectorModal from "@/components/job/modals/SelectorModal";

import DesigningRecorder from "@/components/job/Recorders/DesigningRecorder";
import LargeFormatRecorder from "@/components/job/Recorders/LargeFormatRecorder";
import PapperPrintingRecorder from "@/components/job/Recorders/PapperPrintingRecorder";
import ScanningRecorder from "@/components/job/Recorders/ScanningRecorder";
import PhotocopyRecorder from "@/components/job/Recorders/PhotocopyRecorder";

export default function JobCard() {
  const {
    jobType,
    paperSize,
    quantity,
    colorType,
    sideType,
    fileAttached,
    material,
    isJobTypeModalOpen,
    openModal,
    closeModal,
    isPaperSizeModalOpen,
    openPaperSizeModal,
    closePaperSizeModal,
    isQuantityModalOpen,
    openQuantityModal,
    closeQuantityModal,
    setJobType,
    setPaperSize,
    setQuantity,
    setColorType,
    toggleSideType,
    isMaterialModalOpen,
    openMaterialModal,
    closeMaterialModal,
    setMaterial,
    saveJob,
    resetJob,
  } = useJobCardStore();

  const { jobPricingList } = useJobPricingStore();

  const isJobSelected = Boolean(jobType);

  const selectedPricing = React.useMemo(() => {
    if (jobType !== "Designing" || !material) return null;

    return jobPricingList.find(
      (item) =>
        item.jobType === "Designing" &&
        item.variable.toLowerCase() === material.toLowerCase()
    );
  }, [jobType, material, jobPricingList]);

  const formattedPrice =
    selectedPricing?.unitPrice !== undefined
      ? `₵${selectedPricing.unitPrice.toFixed(2)}`
      : "--";

  const handleSaveOrder = () => {
    if (!isJobSelected) return;

    saveJob(); // saves current job and resets state internally
  };

  // Show recorder immediately on jobType select
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
      case "Designing":
        return (
          <DesigningRecorder
            jobType={jobType}
            variable={material || ""}
            unitPrice={selectedPricing?.unitPrice || 0}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="w-full flex flex-col items-center">
        <div className="w-full sm:max-w-md md:max-w-lg border-2 border-sea bg-darkSea rounded-3xl mt-2 p-4 flex flex-col gap-4">
          {/* Job Type Header */}
          <div className="flex justify-center">
            <div
              onClick={openModal}
              className="bg-sea rounded-b-2xl px-5 py-2 -m-4 mb-2 font-bold text-ground text-sm sm:text-base cursor-pointer hover:bg-coHead hover:text-ground transition"
            >
              {jobType || "Job Type"}
            </div>
          </div>

          {/* Top Row: Material/Type, Qty, Color, Side, File */}
          <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:justify-between">
            {/* Material/Type + QTY */}
            <div className="flex-1 min-w-[220px] flex items-center justify-between gap-2 bg-high rounded-xl p-2 shadow-md">
              <div
                onClick={isJobSelected ? openMaterialModal : undefined}
                className={`flex flex-col justify-center items-center w-20 h-20 sm:w-24 sm:h-24 bg-ground rounded-md border shadow cursor-pointer ${
                  !isJobSelected && "opacity-50 cursor-not-allowed"
                }`}
              >
                <div className="text-center font-semibold text-coHead text-sm border-b-2 border-coHead">
                  {jobType === "Designing" ? "Type" : "Material"}
                </div>
                <span className="text-xs mt-1">{material || "--"}</span>
              </div>

              <div className="flex flex-col gap-2 justify-center">
                <div
                  className={`w-24 h-8 rounded-md bg-ground text-coHead flex justify-center items-center text-sm font-semibold ${
                    !isJobSelected ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {jobType === "Designing" ? formattedPrice : "Size"}
                </div>

                {jobType !== "Designing" && paperSize && (
                  <div className="text-xs text-coHead text-center">
                    {paperSize}
                  </div>
                )}

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
                    onClick={() => setColorType(type as "Color" | "Black")}
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
                    fileAttached
                      ? "bg-green-500 text-container"
                      : "bg-coHead text-ground"
                  }`}
                >
                  {fileAttached ? "File +" : "-"}
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="w-full flex justify-center">
            <button
              onClick={handleSaveOrder}
              className="bg-coHead hover:bg-high hover:text-container text-container px-6 py-2 font-bold rounded-md shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isJobSelected}
            >
              Save order
            </button>
          </div>
        </div>

        {/* Recorder immediate display */}
        <div className="mt-6 w-full max-w-lg">{renderRecorder()}</div>
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
      <SelectorModal
        open={isMaterialModalOpen}
        onClose={closeMaterialModal}
        onSelect={setMaterial}
        jobType={jobType || ""}
      />
    </>
  );
}
