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
  colorOptions?: string[];
  sideOptions?: string[];
}

export interface JobWithUsers {
  id: string;
  jobType: string;
  material?: string;
  paperSize?: string;
  quantity?: number;
  colorType?: string;
  sideType?: string;
  colorOptions?: string[];
  sideOptions?: string[];
  fileAttached?: boolean;
  details?: string;
  unitPrice?: number;
  totalPrice?: number;
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
  updateJob: (jobId: string, updatedData: Partial<JobWithUsers>) => void;
  startNewJob: () => void;
  editJob: (jobId: string) => void;
  cancelEdit: () => void;
  resetCurrentJob: () => void;
  clearSavedJobs: () => void;

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
        material: undefined,
        paperSize: undefined,
        quantity: undefined,
        colorType: "Color",
        sideType: "Front",
        colorOptions: ["Color", "Black"],
        sideOptions: ["Front", "Front & Back"],
        fileAttached: false,
        details: "",
        unitPrice: 0,
        totalPrice: 0,
      },
      savedJobs: [],
      jobPricings: [],
      loading: false,
      error: undefined,

      setCurrentJob: (job) => {
        let price = 0;
        let colorOptions: string[] = [];
        let sideOptions: string[] = [];

        if (job.jobType && job.material) {
          const pricing = get().jobPricings.find(
            (p) =>
              p.jobType === job.jobType &&
              p.variable.toLowerCase() === job.material?.toLowerCase()
          );

          if (pricing) {
            price = pricing.unitPrice;
            colorOptions = pricing.colorOptions || [];
            sideOptions = pricing.sideOptions || [];
          }
        }

        const colorType =
          job.colorType && colorOptions.includes(job.colorType)
            ? job.colorType
            : colorOptions[0];
        const sideType =
          job.sideType && sideOptions.includes(job.sideType)
            ? job.sideType
            : sideOptions[0];

        const totalPrice = price * (job.quantity || 1);

        set({
          currentJob: {
            ...job,
            unitPrice: price,
            totalPrice,
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

      updateJob: (jobId, updatedData) => {
        const updatedJobs = get().savedJobs.map((job) => {
          if (job.id === jobId) {
            const updatedJob = { ...job, ...updatedData };
            const pricing = get().jobPricings.find(
              (p) =>
                p.jobType === updatedJob.jobType &&
                p.variable.toLowerCase() === (updatedJob.material || "").toLowerCase()
            );
            const unitPrice = pricing?.unitPrice || 0;
            const totalPrice = unitPrice * (updatedJob.quantity || 1);
            return { ...updatedJob, unitPrice, totalPrice };
          }
          return job;
        });
        set({ savedJobs: updatedJobs });
      },

      startNewJob: () => {
        set({
          currentJob: {
            id: crypto.randomUUID(),
            jobType: "",
            material: undefined,
            paperSize: undefined,
            quantity: undefined,
            colorType: "Color",
            sideType: "Front",
            colorOptions: ["Color", "Black"],
            sideOptions: ["Front", "Front & Back"],
            fileAttached: false,
            details: "",
            unitPrice: 0,
            totalPrice: 0,
          },
        });
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
            material: undefined,
            paperSize: undefined,
            quantity: undefined,
            colorType: "Color",
            sideType: "Front",
            colorOptions: ["Color", "Black"],
            sideOptions: ["Front", "Front & Back"],
            fileAttached: false,
            details: "",
            unitPrice: 0,
            totalPrice: 0,
          },
        });
      },

      clearSavedJobs: () => set({ savedJobs: [] }),

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
