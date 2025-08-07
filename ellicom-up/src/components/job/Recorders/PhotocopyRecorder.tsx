"use client";

import React, { useEffect } from "react";
import useJobCardStore from "@/lib/store/JobCardStore";

export default function PhotocopyRecorder() {
  const { jobType, paperSize, quantity, colorType, sideType } =
    useJobCardStore();

  const displayedSide = sideType === "Front & Back" ? "Front & Back" : "Front";

  useEffect(() => {
    console.log("🔁 sideType updated in PhotocopyRecorder:", sideType);
  }, [sideType]);

  return (
    <div className="mb-2 w-contain ml-1 mr-1 w-70 h-contain bg-darkSea border-2 border-sea rounded-2xl">
      <div>
        {/* Job Type Display */}
        <div className="text-center text-coHead font-bold">
          {jobType}
          <span className="text-gold">
            <span className="text-coHead"> (</span>
            {displayedSide}
            <span className="text-coHead">)</span>
          </span>
        </div>

        <div className="flex flex-row justify-center items-center scale-90">
          {/* Left Block: Price & Paper Size */}
          <div className="flex flex-col justify-center items-center w-20 h-18 mt-2 bg-container rounded-bl-2xl">
            <div className="scale-90">
              <div className="text-center scale-130 mb-1 text-high font-bold">
                2.00
              </div>
              <div className="font-extrabold text-4xl text-center text-sea scale-90">
                {paperSize}
              </div>
            </div>
          </div>

          {/* Right Block: Qty & Total */}
          <div>
            <div className="w-60 h-9 flex justify-between items-center px-4 mr-2 mt-2 bg-sea rounded-tr-md">
              <div className="text-ground font-bold w-auto">
                {colorType || "—"}
              </div>
              <div className="flex flex-row text-ground w-auto text-right">
                QTY: <div className="text-container font-bold">{quantity}</div>
              </div>
            </div>

            <div className="w-60 h-9 flex justify-between items-center px-4 mr-2 bg-container rounded-br-md">
              <div className="text-sea font-bold text-xl">Ghc:</div>
              <div className="text-high font-bold text-2xl">7,000.00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
