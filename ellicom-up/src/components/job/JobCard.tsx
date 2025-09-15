"use client";

import React, { useMemo } from "react";
import { useJobStore, JobWithUsers } from "@/lib/store/JobStore";

import JobTypeModal from "@/components/job/modals/JobTypeModal";
import MaterialTypeModal from "./modals/MaterialType";
import PaperSizeModal from "@/components/job/modals/PaperSizeModal";
import QuantityModal from "@/components/job/modals/QuantityModal";

export default function JobCard() {
  const { currentJob, setCurrentJob, saveCurrentJob, getJobOptions } =
    useJobStore();

  const [isJobTypeModalOpen, setJobTypeModalOpen] = React.useState(false);
  const [isPaperSizeModalOpen, setPaperSizeModalOpen] = React.useState(false);
  const [isQuantityModalOpen, setQuantityModalOpen] = React.useState(false);
  const [isMaterialModalOpen, setMaterialModalOpen] = React.useState(false);

  const { colorOptions = [], sideOptions = [] } =
    getJobOptions?.(currentJob?.jobType) || {};

  const updateJob = (field: keyof JobWithUsers, value: any) => {
    if (!currentJob) return;
    setCurrentJob({ ...currentJob, [field]: value });
  };

  const setJobType = (type: string) => updateJob("jobType", type);
  const setMaterial = (material: string) => updateJob("material", material);
  const setPaperSize = (size: string) => updateJob("paperSize", size);
  const setQuantity = (qty: number) => updateJob("quantity", qty);
  const setColorType = (type: string) => updateJob("colorType", type);
  const toggleSideType = () => {
    if (!sideOptions.length) return;
    const currentIndex = sideOptions.indexOf(currentJob?.sideType || "");
    const nextIndex = (currentIndex + 1) % sideOptions.length;
    updateJob("sideType", sideOptions[nextIndex]);
  };

  const isJobSelected = Boolean(currentJob?.jobType);

  return (
    <>
      <div className="w-full flex flex-col items-center">
        <div className="w-full sm:max-w-md md:max-w-lg border-2 border-sea bg-darkSea rounded-3xl mt-2 p-4 flex flex-col gap-4">
          {/* Job Type */}
          <div className="flex justify-center">
            <div
              onClick={() => setJobTypeModalOpen(true)}
              className="bg-sea rounded-b-2xl px-5 py-2 -m-4 mb-2 font-bold text-ground text-sm sm:text-base cursor-pointer hover:bg-coHead hover:text-ground transition"
            >
              {currentJob?.jobType || "Job Type"}
            </div>
          </div>

          {/* Material / Paper / Quantity */}
          <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:justify-between">
            <div className="flex-1 min-w-[220px] flex items-center justify-between gap-2 bg-high rounded-xl p-2 shadow-md">
              <div
                onClick={
                  isJobSelected ? () => setMaterialModalOpen(true) : undefined
                }
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
                  onClick={
                    isJobSelected
                      ? () => setPaperSizeModalOpen(true)
                      : undefined
                  }
                  className={`w-24 h-8 rounded-md bg-ground text-coHead flex justify-center items-center text-sm font-semibold cursor-pointer ${
                    !isJobSelected && "opacity-50 cursor-not-allowed"
                  }`}
                >
                  {currentJob?.paperSize || "Size"}
                </div>

                <div
                  onClick={
                    isJobSelected ? () => setQuantityModalOpen(true) : undefined
                  }
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

            {/* Color & Side */}
            <div className="flex-1 min-w-[220px] flex flex-col items-center bg-high p-3 rounded-2xl shadow-md">
              <div className="flex gap-2 mb-2">
                {(colorOptions.length > 0
                  ? colorOptions
                  : ["Color", "Black"]
                ).map((type) => {
                  const isActive =
                    colorOptions.length > 0 && currentJob?.colorType === type;
                  return (
                    <div
                      key={type}
                      onClick={() =>
                        colorOptions.length > 0 && setColorType(type)
                      }
                      className={`w-16 h-8 text-sm rounded-md flex items-center justify-center font-semibold 
                        ${
                          colorOptions.length === 0
                            ? "bg-inactive text-ground opacity-50 cursor-not-allowed"
                            : isActive
                            ? "bg-green-500 text-container"
                            : "bg-coHead text-ground cursor-pointer"
                        }`}
                    >
                      {type}
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-2">
                {(sideOptions.length > 0
                  ? sideOptions
                  : ["Front", "Front & Back"]
                ).map((side) => {
                  const isActive =
                    sideOptions.length > 0 && currentJob?.sideType === side;
                  return (
                    <div
                      key={side}
                      onClick={() =>
                        sideOptions.length > 0 && updateJob("sideType", side)
                      }
                      className={`w-16 h-8 text-sm rounded-md flex items-center justify-center font-bold 
                        ${
                          sideOptions.length === 0
                            ? "bg-inactive text-ground opacity-50 cursor-not-allowed"
                            : isActive
                            ? "bg-green-500 text-container"
                            : "bg-coHead text-ground cursor-pointer"
                        }`}
                    >
                      {side === "Front & Back" ? "F/B" : side}
                    </div>
                  );
                })}

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
              onClick={() => currentJob && saveCurrentJob()}
              className="bg-coHead hover:bg-high hover:text-container text-container px-6 py-2 font-bold rounded-md shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isJobSelected}
            >
              Save order
            </button>
          </div>
        </div>
      </div>

      <JobTypeModal
        open={isJobTypeModalOpen}
        onClose={() => setJobTypeModalOpen(false)}
        onSelect={setJobType}
      />
      <PaperSizeModal
        open={isPaperSizeModalOpen}
        onClose={() => setPaperSizeModalOpen(false)}
        onSelect={setPaperSize}
        jobType={currentJob?.jobType}
        materialType={currentJob?.material} // ← must pass materialType
      />
      <QuantityModal
        open={isQuantityModalOpen}
        onClose={() => setQuantityModalOpen(false)}
        onSelect={setQuantity}
      />
      <MaterialTypeModal
        open={isMaterialModalOpen}
        onClose={() => setMaterialModalOpen(false)}
        onSelect={setMaterial}
        jobType={currentJob?.jobType}
      />
    </>
  );
}
