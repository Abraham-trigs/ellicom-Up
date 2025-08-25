"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

// Job statuses
export type JobStatus =
  | "DRAFT"
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

// Base models
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

// Job with relations
export interface JobWithUsers extends Job {
  createdBy?: { id: string; name: string | null; email: string };
  handledBy?: { id: string; name: string | null; email: string } | null;
  jobPricing?: { id: string; unitPrice: number; variable: string } | null;
}

// Store interface
interface JobStore {
  jobs: JobWithUsers[];
  jobPricings: JobPricing[];
  loading: boolean;
  error?: string;

  // Job actions
  fetchJobs: () => Promise<void>;
  createJob: (job: Partial<Job>) => Promise<void>;
  updateJob: (id: string, job: Partial<Job>) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;

  // JobPricing actions
  fetchJobPricings: () => Promise<void>;
  createJobPricing: (pricing: Partial<JobPricing>) => Promise<void>;
  updateJobPricing: (id: string, pricing: Partial<JobPricing>) => Promise<void>;
  deleteJobPricing: (id: string) => Promise<void>;
}

export const useJobStore = create<JobStore>()(
  persist(
    (set, get) => ({
      jobs: [],
      jobPricings: [],
      loading: false,
      error: undefined,

      // ===== JOBS =====
      fetchJobs: async () => {
        set({ loading: true, error: undefined });
        try {
          const res = await fetch("/api/jobs");
          if (!res.ok) throw new Error("Failed to fetch jobs");
          const data: JobWithUsers[] = await res.json();
          set({ jobs: data, loading: false });
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
          const newJob: JobWithUsers = await res.json();
          set({ jobs: [...get().jobs, newJob] });
        } catch (err: any) {
          set({ error: err.message });
        }
      },

      updateJob: async (id, job) => {
        try {
          const res = await fetch(`/api/jobs/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(job),
          });
          if (!res.ok) throw new Error("Failed to update job");
          const updated: JobWithUsers = await res.json();
          set({
            jobs: get().jobs.map((j) => (j.id === id ? updated : j)),
          });
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

      // ===== JOB PRICING =====
      fetchJobPricings: async () => {
        set({ loading: true, error: undefined });
        try {
          const res = await fetch("/api/jobpricing");
          if (!res.ok) throw new Error("Failed to fetch job pricings");
          const data: JobPricing[] = await res.json();
          set({ jobPricings: data, loading: false });
        } catch (err: any) {
          set({ error: err.message, loading: false });
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
          const newPricing: JobPricing = await res.json();
          set({ jobPricings: [...get().jobPricings, newPricing] });
        } catch (err: any) {
          set({ error: err.message });
        }
      },

      updateJobPricing: async (id, pricing) => {
        try {
          const res = await fetch(`/api/jobpricing/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pricing),
          });
          if (!res.ok) throw new Error("Failed to update job pricing");
          const updated: JobPricing = await res.json();
          set({
            jobPricings: get().jobPricings.map((p) => (p.id === id ? updated : p)),
          });
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
    { name: "job-store" } // persists across reloads
  )
);
