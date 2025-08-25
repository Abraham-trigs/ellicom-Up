"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type JobStatus = "DRAFT" | "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

export interface Job {
  id: string;
  jobType: string;
  details?: string;
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
  createdById: string;
  handledById?: string;
  jobPricingId?: string;
}

export interface JobPricing {
  id: string;
  jobType: string;
  materialType?: string;
  variable: string;
  unitPrice: number;
  modifiers: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface JobStore {
  jobs: Job[];
  jobPricings: JobPricing[];
  loading: boolean;
  error?: string;

  // Actions
  fetchJobs: () => Promise<void>;
  fetchJobPricings: () => Promise<void>;
  createJob: (job: Partial<Job>) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
  createJobPricing: (pricing: Partial<JobPricing>) => Promise<void>;
  deleteJobPricing: (id: string) => Promise<void>;
}

export const useJobStore = create<JobStore>()(
  persist(
    (set, get) => ({
      jobs: [],
      jobPricings: [],
      loading: false,
      error: undefined,

      fetchJobs: async () => {
        set({ loading: true, error: undefined });
        try {
          const res = await fetch("/api/jobs");
          if (!res.ok) throw new Error("Failed to fetch jobs");
          const data = await res.json();
          set({ jobs: data, loading: false });
        } catch (err: any) {
          set({ error: err.message, loading: false });
        }
      },

      fetchJobPricings: async () => {
        set({ loading: true, error: undefined });
        try {
          const res = await fetch("/api/jobpricing");
          if (!res.ok) throw new Error("Failed to fetch job pricings");
          const data = await res.json();
          set({ jobPricings: data, loading: false });
        } catch (err: any) {
          set({ error: err.message, loading: false });
        }
      },

      createJob: async (job) => {
        try {
          const res = await fetch("/api/jobs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(job),
          });
          if (!res.ok) throw new Error("Failed to create job");
          const newJob = await res.json();
          set({ jobs: [...get().jobs, newJob] });
        } catch (err: any) {
          set({ error: err.message });
        }
      },

      deleteJob: async (id) => {
        try {
          const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
          if (!res.ok) throw new Error("Failed to delete job");
          set({ jobs: get().jobs.filter((j) => j.id !== id) });
        } catch (err: any) {
          set({ error: err.message });
        }
      },

      createJobPricing: async (pricing) => {
        try {
          const res = await fetch("/api/jobpricing", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pricing),
          });
          if (!res.ok) throw new Error("Failed to create job pricing");
          const newPricing = await res.json();
          set({ jobPricings: [...get().jobPricings, newPricing] });
        } catch (err: any) {
          set({ error: err.message });
        }
      },

      deleteJobPricing: async (id) => {
        try {
          const res = await fetch(`/api/jobpricing/${id}`, { method: "DELETE" });
          if (!res.ok) throw new Error("Failed to delete job pricing");
          set({ jobPricings: get().jobPricings.filter((p) => p.id !== id) });
        } catch (err: any) {
          set({ error: err.message });
        }
      },
    }),
    { name: "job-store" }
  )
);
