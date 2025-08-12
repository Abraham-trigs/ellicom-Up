"use client";

import React from "react";
import JobCard from "@/components/job/JobCard";
import JobRecorder from "@/components/job/JobRecorder";

export default function AddJobPage() {
  return (
    <div className="w-full px-4 py-6 sm:px-6 md:px-8 lg:px-12">
      <div className="w-full min-h-[80vh] rounded-2xl border border-sea bg-surface shadow-md flex flex-col lg:flex-row gap-6 overflow-hidden">
        {/* Job Card */}
        <div className="w-full lg:w-1/2 p-4 lg:p-6">
          <JobCard />
        </div>

        {/* Divider (only on desktop ≥1024px) */}
        <div className="hidden lg:block w-px bg-border" />

        {/* Job Recorder */}
        <div className="w-full lg:w-1/2 p-4 lg:p-6">
          <JobRecorder />
        </div>
      </div>
    </div>
  );
}
