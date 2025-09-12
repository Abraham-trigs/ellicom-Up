"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useJobPricingStore } from "@/lib/store/JobPricingStore"; // make sure the path matches

export type JobStatus =
  | "DRAFT"
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export interface JobWithPricing {
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
  status?: JobStatus;
  handledById?: string;
  createdById?: string;
  jobPricingId?: string;
}

interface JobStore {
  currentJob?: JobWithPricing;
  savedJobs: JobWithPricing[];
  loading: boolean;
  error?: string;

  // UI modals
  isJobTypeModalOpen: boolean;
  isPaperSizeModalOpen: boolean;
  isQuantityModalOpen: boolean;
  isMaterialModalOpen: boolean;

  // Actions
  setCurrentJob: (job: Partial<JobWithPricing>) => void;
  saveCurrentJob: () => void;
  updateJob: (jobId: string, updatedData: Partial<JobWithPricing>) => void;
  startNewJob: () => void;
  editJob: (jobId: string) => void;
  cancelEdit: () => void;
  resetCurrentJob: () => void;
  clearSavedJobs: () => void;

  // Modal actions
  openModal: (type: "jobType" | "paperSize" | "quantity" | "material") => void;
  closeModal: (type: "jobType" | "paperSize" | "quantity" | "material") => void;

  getJobOptions: (
    jobType?: string
  ) => { colorOptions: string[]; sideOptions: string[] } | null;
}

export const useJobStore = create<JobStore>()(
  persist(
    (set, get) => {
      const { jobPricingList } = useJobPricingStore.getState();

      const calculatePrice = (job: Partial<JobWithPricing>) => {
        if (!job.jobType || !job.material) return { unitPrice: 0, totalPrice: 0 };

        const pricing = jobPricingList.find(
          (p) =>
            p.jobType === job.jobType &&
            p.variable.toLowerCase() === job.material?.toLowerCase()
        );

        const unitPrice = pricing?.unitPrice || 0;
        const totalPrice = unitPrice * (job.quantity || 1);

        return { unitPrice, totalPrice, colorOptions: pricing?.colorOptions, sideOptions: pricing?.sideOptions };
      };

      return {
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
        loading: false,
        error: undefined,

        isJobTypeModalOpen: false,
        isPaperSizeModalOpen: false,
        isQuantityModalOpen: false,
        isMaterialModalOpen: false,

        setCurrentJob: (job) => {
          const pricingData = calculatePrice({ ...get().currentJob, ...job });

          set({
            currentJob: {
              ...get().currentJob,
              ...job,
              ...pricingData,
              colorType:
                job.colorType && pricingData.colorOptions?.includes(job.colorType)
                  ? job.colorType
                  : pricingData.colorOptions?.[0] || "Color",
              sideType:
                job.sideType && pricingData.sideOptions?.includes(job.sideType)
                  ? job.sideType
                  : pricingData.sideOptions?.[0] || "Front",
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

        updateJob: (jobId, updatedData) => {
          const updatedJobs = get().savedJobs.map((job) => {
            if (job.id === jobId) {
              const updatedJob = { ...job, ...updatedData };
              const pricingData = calculatePrice(updatedJob);
              return { ...updatedJob, ...pricingData };
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

        editJob: (jobId) => {
          const jobToEdit = get().savedJobs.find((j) => j.id === jobId);
          if (jobToEdit) set({ currentJob: { ...jobToEdit } });
        },

        cancelEdit: () => set({ currentJob: undefined }),

        resetCurrentJob: () => {
          get().startNewJob();
        },

        clearSavedJobs: () => set({ savedJobs: [] }),

        openModal: (type) => {
          const key = `is${type[0].toUpperCase() + type.slice(1)}ModalOpen` as
            | "isJobTypeModalOpen"
            | "isPaperSizeModalOpen"
            | "isQuantityModalOpen"
            | "isMaterialModalOpen";
          set({ [key]: true } as any);
        },

        closeModal: (type) => {
          const key = `is${type[0].toUpperCase() + type.slice(1)}ModalOpen` as
            | "isJobTypeModalOpen"
            | "isPaperSizeModalOpen"
            | "isQuantityModalOpen"
            | "isMaterialModalOpen";
          set({ [key]: false } as any);
        },

        getJobOptions: (jobType) => {
          if (!jobType) return null;
          const pricing = jobPricingList.find((p) => p.jobType === jobType);
          if (!pricing) return null;
          return {
            colorOptions: pricing.colorOptions || ["Color", "Black"],
            sideOptions: pricing.sideOptions || ["Front", "Front & Back"],
          };
        },
      };
    },
    { name: "jobStore" }
  )
);
