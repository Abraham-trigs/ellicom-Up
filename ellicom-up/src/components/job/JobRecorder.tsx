"use client";

import React, { useMemo, useState } from "react";
import { useJobStore, JobWithUsers } from "@/lib/store/JobStore";
import EditJobModal from "@/components/job/modals/EditJobModal";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function JobRecorder() {
  const { savedJobs, updateJob } = useJobStore();
  const [editingJob, setEditingJob] = useState<JobWithUsers | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const jobsToRender = useMemo(() => [...savedJobs].reverse(), [savedJobs]);

  const totalPrice = useMemo(() => {
    return jobsToRender.reduce((acc, job) => {
      const price = job.unitPrice || 0;
      const qty = job.quantity || 1;
      return acc + price * qty;
    }, 0);
  }, [jobsToRender]);

  if (jobsToRender.length === 0) {
    return <p className="text-secondary mx-2">No jobs saved yet.</p>;
  }

  return (
    <div className="mx-2 w-full max-w-3xl bg-surface rounded-3xl shadow-lg flex flex-col max-h-[500px]">
      {/* Scrollable job list */}
      <div className="flex-1 overflow-y-auto p-4">
        <h2 className="text-xl font-bold mb-4 text-head">Job Session</h2>
        <div className="space-y-4">
          {jobsToRender.map((job) => (
            <div
              key={job.id}
              className="relative border-2 rounded-2xl p-4 bg-darkSea text-primary border-coHead"
            >
              {/* Job Number */}
              <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-gold text-darkSea">
                {savedJobs.findIndex((j) => j.id === job.id) + 1}
              </div>

              <div className="mb-2">
                <span className="text-secondary">Job Type:</span>{" "}
                <strong>{job.jobType || "-"}</strong>
              </div>
              {job.material && (
                <div className="mb-2">
                  <span className="text-secondary">
                    {job.jobType === "Designing" ? "Type" : "Material"}:
                  </span>{" "}
                  <strong>{job.material}</strong>
                </div>
              )}
              {job.paperSize && (
                <div className="mb-2">
                  <span className="text-secondary">Paper Size:</span>{" "}
                  <strong>{job.paperSize}</strong>
                </div>
              )}
              {job.quantity && (
                <div className="mb-2">
                  <span className="text-secondary">Quantity:</span>{" "}
                  <strong>{job.quantity}</strong>
                </div>
              )}
              {job.colorType && (
                <div className="mb-2">
                  <span className="text-secondary">Color Type:</span>{" "}
                  <strong>{job.colorType}</strong>
                </div>
              )}
              {job.sideType && (
                <div className="mb-2">
                  <span className="text-secondary">Side Type:</span>{" "}
                  <strong>{job.sideType}</strong>
                </div>
              )}
              {job.details && (
                <div className="mb-2">
                  <span className="text-secondary">Details:</span>{" "}
                  <strong>{job.details}</strong>
                </div>
              )}
              {job.unitPrice && (
                <div className="mb-2">
                  <span className="text-secondary">Unit Price:</span>{" "}
                  <strong>₵{job.unitPrice.toFixed(2)}</strong>
                </div>
              )}
              {job.unitPrice && job.quantity && (
                <div className="mb-2 text-right font-bold text-green-400">
                  Subtotal: ₵{(job.unitPrice * job.quantity).toFixed(2)}
                </div>
              )}

              <button
                onClick={() => setEditingJob(job)}
                className="absolute top-2 right-2 px-2 py-1 text-xs bg-gold text-darkSea rounded hover:bg-highGold"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed footer: Total + Checkout */}
      <div className="border-t-2 border-coHead p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-surface rounded-b-3xl">
        <div className="text-right font-bold text-lg text-gold">
          Total: ₵{totalPrice.toFixed(2)}
        </div>
        <button
          onClick={() => router.push("/app/payment")}
          className="px-4 py-2 bg-sea text-white font-semibold rounded-lg hover:bg-darkSea transition"
        >
          Checkout
        </button>
      </div>

      {/* Edit Modal */}
      {editingJob && (
        <EditJobModal
          job={editingJob}
          onClose={() => setEditingJob(null)}
          onSave={(updatedJob) => {
            try {
              if (!updatedJob.jobType || !updatedJob.quantity) {
                toast({
                  title: "⚠️ Missing fields",
                  description: "Job type and quantity are required.",
                  variant: "destructive",
                  duration: 3000,
                });
                return;
              }

              updateJob(updatedJob);

              toast({
                title: "✅ Job updated",
                description: `${updatedJob.jobType} job saved successfully.`,
                duration: 2500,
              });
            } catch (err) {
              console.error("Update job error:", err);
              toast({
                title: "❌ Update failed",
                description: "Something went wrong while saving the job.",
                variant: "destructive",
                duration: 3000,
              });
            }
          }}
        />
      )}
    </div>
  );
}
