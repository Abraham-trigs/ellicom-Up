"use client";

import React from "react";
import JobCard from "@/components/job/JobCard";
import JobRecorder from "@/components/job/JobRecorder";

export default function AddJobPage() {
  return (
    <>
      {/* JOB CARD and Job Recorder Holder */}
      <div className="w-full h-130 rounded-2xl flex flex-col justify-center items-center border border-sea -mt-4">
        <div>
          <JobCard />
          <JobRecorder />
        </div>
      </div>
    </>
  );
}
