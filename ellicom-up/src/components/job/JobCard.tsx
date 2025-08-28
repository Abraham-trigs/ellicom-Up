"use client";

import React from "react";
import { useJobStore } from "@/lib/store/JobStore";

import JobTypeModal from "@/components/job/modals/JobTypeModal";
import PaperSizeModal from "@/components/job/modals/PaperSizeModal";
import QuantityModal from "@/components/job/modals/QuantityModal";
import SelectorModal from "@/components/job/modals/SelectorModal";

export default function JobCard() {
  const { currentJob, setCurrentJob, saveCurrentJob, savedJobs, jobPricings } =
    useJobStore();

  const [isJobTypeModalOpen, setJobTypeModalOpen] = React.useState(false);
  const [isPaperSizeModalOpen, setPaperSizeModalOpen] = React.useState(false);
  const [isQuantityModalOpen, setQuantityModalOpen] = React.useState(false);
  const [isMaterialModalOpen, setMaterialModalOpen] = React.useState(false);

  const openModal = () => setJobTypeModalOpen(true);
  const closeModal = () => setJobTypeModalOpen(false);
  const openPaperSizeModal = () => setPaperSizeModalOpen(true);
  const closePaperSizeModal = () => setPaperSizeModalOpen(false);
  const openQuantityModal = () => setQuantityModalOpen(true);
  const closeQuantityModal = () => setQuantityModalOpen(false);
  const openMaterialModal = () => setMaterialModalOpen(true);
  const closeMaterialModal = () => setMaterialModalOpen(false);

  const updateJob = (field: keyof typeof currentJob, value: any) => {
    setCurrentJob({ ...currentJob, [field]: value });
  };

  const setJobType = (type: string) => updateJob("jobType", type);
  const setMaterial = (material: string) => updateJob("material", material);
  const setPaperSize = (size: string) => updateJob("paperSize", size);
  const setQuantity = (qty: number) => updateJob("quantity", qty);
  const setColorType = (type: "Color" | "Black") =>
    updateJob("colorType", type);
  const toggleSideType = () =>
    updateJob(
      "sideType",
      currentJob?.sideType === "Front & Back" ? "Front" : "Front & Back"
    );

  const isJobSelected = Boolean(currentJob?.jobType);

  const handleSaveOrder = () => {
    if (!isJobSelected) return;
    saveCurrentJob();
  };

  return (
    <>
      <div className="w-full flex flex-col items-center">
        <div className="w-full sm:max-w-md md:max-w-lg border-2 border-sea bg-darkSea rounded-3xl mt-2 p-4 flex flex-col gap-4">
          {/* Job Type */}
          <div className="flex justify-center">
            <div
              onClick={openModal}
              className="bg-sea rounded-b-2xl px-5 py-2 -m-4 mb-2 font-bold text-ground text-sm sm:text-base cursor-pointer hover:bg-coHead hover:text-ground transition"
            >
              {currentJob?.jobType || "Job Type"}
            </div>
          </div>

          {/* Material / Paper / Quantity */}
          <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:justify-between">
            <div className="flex-1 min-w-[220px] flex items-center justify-between gap-2 bg-high rounded-xl p-2 shadow-md">
              <div
                onClick={isJobSelected ? openMaterialModal : undefined}
                className={`flex flex-col justify-center items-center w-20 h-20 sm:w-24 sm:h-24 bg-ground rounded-md border shadow cursor-pointer ${
                  !isJobSelected && "opacity-50 cursor-not-allowed"
                }`}
              >
                <div className="text-center font-semibold text-coHead text-sm border-b-2 border-coHead">
                  Material
                </div>
                <span className="text-xs mt-1">
                  {currentJob?.material || "--"}
                </span>
              </div>

              <div className="flex flex-col gap-2 justify-center">
                <div
                  className={`w-24 h-8 rounded-md bg-ground text-coHead flex justify-center items-center text-sm font-semibold`}
                >
                  {currentJob?.paperSize || "Size"}
                </div>

                <div
                  onClick={isJobSelected ? openQuantityModal : undefined}
                  className={`w-24 h-10 rounded-md flex items-center justify-center ${
                    isJobSelected
                      ? "bg-coHead cursor-pointer"
                      : "bg-coHead opacity-50 cursor-not-allowed"
                  }`}
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-ground rounded-md text-coHead text-xs font-bold">
                    {currentJob?.quantity || "QTY"}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 min-w-[220px] flex flex-col items-center bg-high p-3 rounded-2xl shadow-md">
              <div className="flex gap-2 mb-2">
                {["Color", "Black"].map((type) => (
                  <div
                    key={type}
                    onClick={() => setColorType(type as "Color" | "Black")}
                    className={`w-16 h-8 text-sm rounded-md flex items-center justify-center font-semibold cursor-pointer ${
                      currentJob?.colorType === type
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
                    currentJob?.sideType === "Front & Back"
                      ? "bg-green-500 text-container"
                      : "bg-coHead text-ground"
                  }`}
                >
                  F/B
                </div>
                <div
                  className={`w-16 h-8 rounded-md flex items-center justify-center font-bold text-sm ${
                    currentJob?.fileAttached
                      ? "bg-green-500 text-container"
                      : "bg-coHead text-ground"
                  }`}
                >
                  {currentJob?.fileAttached ? "File +" : "-"}
                </div>
              </div>
            </div>
          </div>

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
        jobType={currentJob?.jobType || ""}
      />
    </>
  );
}
