"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type JobStatus =
  | "DRAFT"
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export interface JobPricing {
  id: string;
  jobType: string;
  materialType?: string;
  variable: string;
  unitPrice: number;
  modifiers?: string[];
  notes?: string;
  colorOptions?: string[]; // ["Color", "Black"]
  sideOptions?: string[]; // ["Front", "Front & Back"]
}

export interface JobWithUsers {
  id: string;
  jobType: string;
  materialType?: string;
  paperSize?: string;
  quantity?: number;
  colorType?: string;
  sideType?: string;
  colorOptions?: string[];
  sideOptions?: string[];
  fileAttached?: boolean;
  details?: string;
  unitPrice?: number;
}

interface JobStore {
  currentJob?: JobWithUsers;
  savedJobs: JobWithUsers[];
  jobPricings: JobPricing[];
  loading: boolean;
  error?: string;

  setCurrentJob: (job: JobWithUsers) => void;
  setJobPricings: (pricing: JobPricing[]) => void;
  fetchJobPricings: () => Promise<void>;

  saveCurrentJob: () => void;
  startNewJob: () => void;
  editJob: (jobId: string) => void;
  cancelEdit: () => void;
  resetCurrentJob: () => void;
  clearSavedJobs: () => void;

  // ✅ new
  getJobOptions: (
    jobType?: string
  ) =>
    | {
        colorOptions: string[];
        sideOptions: string[];
      }
    | null;
}

export const useJobStore = create<JobStore>()(
  persist(
    (set, get) => ({
      currentJob: {
        id: crypto.randomUUID(),
        jobType: "",
        materialType: undefined,
        paperSize: undefined,
        quantity: undefined,
        colorType: "Color",
        sideType: "Front",
        colorOptions: ["Color", "Black"],
        sideOptions: ["Front", "Front & Back"],
        fileAttached: false,
        details: "",
        unitPrice: 0,
      },
      savedJobs: [],
      jobPricings: [],
      loading: false,
      error: undefined,

    setCurrentJob: (job) => {
      let price = 0;
      let colorOptions: string[] = [];
      let sideOptions: string[] = [];

      if (job.jobType && job.materialType) {
        const pricing = get().jobPricings.find(
          (p) =>
            p.jobType === job.jobType &&
            p.variable.toLowerCase() === job.materialType?.toLowerCase()
        );

        if (pricing) {
          price = pricing.unitPrice;
          colorOptions = pricing.colorOptions || [];
          sideOptions = pricing.sideOptions || [];
        }
      }

      // Keep previous selection if still valid
      const colorType =
        job.colorType && colorOptions.includes(job.colorType)
          ? job.colorType
          : colorOptions[0]; // ✅ will be undefined if no options
      const sideType =
        job.sideType && sideOptions.includes(job.sideType)
          ? job.sideType
          : sideOptions[0]; // ✅ same here

      set({
        currentJob: {
          ...job,
          unitPrice: price,
          colorOptions,
          sideOptions,
          colorType,
          sideType,
        },
      });
    },

      setJobPricings: (pricing) => set({ jobPricings: pricing }),

      fetchJobPricings: async () => {
        set({ loading: true, error: undefined });
        try {
          const res = await fetch("/api/jobpricing");
          if (!res.ok) throw new Error("Failed to fetch job pricings");
          const data: JobPricing[] = await res.json();
          set({ jobPricings: data, loading: false });
        } catch (err: any) {
          console.error("fetchJobPricings error:", err);
          set({
            error: err.message || "Failed to fetch job pricings",
            loading: false,
          });
        }
      },

      startNewJob: () => {
        set({
          currentJob: {
            id: crypto.randomUUID(),
            jobType: "",
            materialType: undefined,
            paperSize: undefined,
            quantity: undefined,
            colorType: "Color",
            sideType: "Front",
            colorOptions: ["Color", "Black"],
            sideOptions: ["Front", "Front & Back"],
            fileAttached: false,
            details: "",
            unitPrice: 0,
          },
        });
      },

      saveCurrentJob: () => {
        const job = get().currentJob;
        if (!job?.jobType) return;

        const existingIndex = get().savedJobs.findIndex((j) => j.id === job.id);
        if (existingIndex >= 0) {
          const updatedJobs = [...get().savedJobs];
          updatedJobs[existingIndex] = job;
          set({ savedJobs: updatedJobs, currentJob: undefined });
        } else {
          set({ savedJobs: [job, ...get().savedJobs], currentJob: undefined });
        }
      },

      editJob: (jobId: string) => {
        const jobToEdit = get().savedJobs.find((j) => j.id === jobId);
        if (jobToEdit) set({ currentJob: { ...jobToEdit } });
      },

      cancelEdit: () => set({ currentJob: undefined }),

      resetCurrentJob: () => {
        set({
          currentJob: {
            id: crypto.randomUUID(),
            jobType: "",
            materialType: undefined,
            paperSize: undefined,
            quantity: undefined,
            colorType: "Color",
            sideType: "Front",
            colorOptions: ["Color", "Black"],
            sideOptions: ["Front", "Front & Back"],
            fileAttached: false,
            details: "",
            unitPrice: 0,
          },
        });
      },

      clearSavedJobs: () => set({ savedJobs: [] }),

      // ✅ Implementation for JobCard
      getJobOptions: (jobType?: string) => {
        if (!jobType) return null;
        const pricing = get().jobPricings.find((p) => p.jobType === jobType);
        if (!pricing) return null;

        return {
          colorOptions: pricing.colorOptions || ["Color", "Black"],
          sideOptions: pricing.sideOptions || ["Front", "Front & Back"],
        };
      },
    }),
    { name: "job-store" }
  )
);
