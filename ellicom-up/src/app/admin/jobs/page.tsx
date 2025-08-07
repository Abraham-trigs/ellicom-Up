"use client";

import { useEffect } from "react";
import { useJobStore } from "../../../lib/store/JobStore";

export default function JobsPage() {
  const { jobs, fetchJobs } = useJobStore();

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Jobs</h1>

      {jobs.length === 0 ? (
        <p className="text-gray-600">No jobs found.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="border p-4 rounded shadow-sm bg-white flex flex-col gap-2"
            >
              <div>
                <h2 className="text-lg font-semibold">{job.title}</h2>
                <p className="text-sm text-gray-700">
                  {job.details || "No details"}
                </p>
              </div>

              <div className="flex justify-between text-sm text-gray-600">
                <span>
                  <strong>Type:</strong> {job.type}
                </span>
                <span>
                  <strong>Status:</strong> {job.status}
                </span>
              </div>

              <div className="flex justify-between text-xs text-gray-500">
                <span>
                  <strong>Created By:</strong>{" "}
                  {job.createdBy?.name || "Unknown"}
                </span>
                <span>
                  <strong>Handled By:</strong>{" "}
                  {job.handledBy?.name || "Unassigned"}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
