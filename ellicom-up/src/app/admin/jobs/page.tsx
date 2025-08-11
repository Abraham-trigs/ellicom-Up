"use client";

import { useEffect, useState, useMemo } from "react";
import { useJobStore } from "../../../lib/store/JobStore";
import type { JobWithUsers } from "../../../lib/store/JobStore";

const JOB_STATUSES = ["All", "COMPLETED", "CANCELLED", "IN_PROGRESS"] as const;

export default function JobsPage() {
  const { jobs, fetchJobs } = useJobStore();
  const [activeTab, setActiveTab] =
    useState<(typeof JOB_STATUSES)[number]>("All");

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Filter jobs based on active tab (status)
  const filteredJobs = useMemo(() => {
    if (activeTab === "All") return jobs;
    return jobs.filter((job) => job.status === activeTab);
  }, [activeTab, jobs]);

  return (
    <div className="p-4 bg-ground dark:bg-surface text-head dark:text-textPrimary min-h-screen">
      <h1 className="text-xl font-bold mb-6">Jobs</h1>

      {/* Navbar Tabs */}
      <nav className="border-b border-border mb-6">
        <ul className="flex space-x-6 text-sm font-medium">
          {JOB_STATUSES.map((status) => (
            <li key={status}>
              <button
                className={`pb-2 ${
                  activeTab === status
                    ? "border-b-2 border-gold text-gold dark:border-highGold dark:text-highGold"
                    : "text-inactive dark:text-textSecondary hover:text-gold dark:hover:text-highGold"
                }`}
                onClick={() => setActiveTab(status)}
                type="button"
              >
                {status}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Jobs List */}
      {filteredJobs.length === 0 ? (
        <p className="text-inactive dark:text-textMuted">No jobs found.</p>
      ) : (
        <ul
          className="
            grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
            gap-4 max-h-[80vh] overflow-y-auto pr-2
          "
        >
          {filteredJobs.map((job: JobWithUsers) => (
            <li
              key={job.id}
              className="
                border border-ground rounded-md shadow-sm
                bg-sea
                p-3 flex flex-col gap-1
                hover:shadow-lg transition-shadow duration-200
                cursor-pointer
              "
              title={job.details || "No details"}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-md  text-ground font-bold truncate">
                  {job.title}
                </h2>
                <span className="text-xs text-highGold whitespace-nowrap">
                  {job.status}
                </span>
              </div>

              <p className="text-xs text-ground truncate">
                {job.details || "No details"}
              </p>

              <div className="flex justify-between text-xs text-ground mt-1">
                <span className="truncate">
                  <strong>Type:</strong> {job.type}
                </span>
                <span className="truncate">
                  <strong>Created By:</strong>{" "}
                  {job.createdBy?.name ?? "Unknown"}
                </span>
              </div>
              <div className="flex justify-between text-xs text-ground">
                <span className="truncate">
                  <strong>Handled By:</strong>{" "}
                  {job.handledBy?.name ?? "Unassigned"}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
