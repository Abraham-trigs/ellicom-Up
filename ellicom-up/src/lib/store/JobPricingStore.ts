import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// Simple debounce utility
function debounce<F extends (...args: any[]) => void>(func: F, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<F>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export type JobPricing = {
  id: string;
  jobType: string;
  materialType?: string | null;
  variable: string;
  unitPrice: number;
  modifiers: string[];
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type State = {
  jobPricingList: JobPricing[];
  isLoading: boolean;
  error: string | null;

  jobTypes: string[];

  fetchJobPricing: () => Promise<void>;
  addJobPricing: (data: Omit<JobPricing, "id" | "createdAt" | "updatedAt">) => Promise<void>;
  updateJobPricing: (id: string, data: Partial<JobPricing>) => Promise<void>;
  deleteJobPricing: (id: string) => Promise<void>;
};

export const useJobPricingStore = create<State>()(
  devtools(
    persist(
      (set, get) => {
        const debouncedFetch = debounce(async () => {
          set({ isLoading: true, error: null });

          try {
            const res = await fetch("/api/jobpricing"); // make sure this matches your API
            if (!res.ok) throw new Error("Failed to fetch pricing data");

            const freshDataRaw: JobPricing[] = await res.json();
            const freshData = freshDataRaw.map(item => ({
              ...item,
              createdAt: new Date(item.createdAt),
              updatedAt: new Date(item.updatedAt),
            }));

            set({ jobPricingList: freshData, isLoading: false });
          } catch (err) {
            set({ error: "Failed to fetch pricing data", isLoading: false });
          }
        }, 300);

        return {
          jobPricingList: [],
          isLoading: false,
          error: null,

          get jobTypes() {
            // return all job types in DB, no duplicates
            return Array.from(new Set(get().jobPricingList.map(j => j.jobType?.trim()).filter(Boolean)));
          },

          fetchJobPricing: async () => {
            debouncedFetch();
          },

          addJobPricing: async (payload) => {
            set({ isLoading: true, error: null });
            try {
              const res = await fetch("/api/jobpricing", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              });
              if (!res.ok) throw new Error("Failed to add pricing");

              const newEntryRaw = await res.json();
              const newEntry = { ...newEntryRaw, createdAt: new Date(newEntryRaw.createdAt), updatedAt: new Date(newEntryRaw.updatedAt) };

              set(state => ({ jobPricingList: [newEntry, ...state.jobPricingList], isLoading: false }));
            } catch (err) {
              set({ error: "Failed to add pricing", isLoading: false });
            }
          },

          updateJobPricing: async (id, payload) => {
            set({ isLoading: true, error: null });
            try {
              const res = await fetch(`/api/jobpricing/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              });
              if (!res.ok) throw new Error("Failed to update pricing");

              const updatedRaw = await res.json();
              const updated = { ...updatedRaw, createdAt: new Date(updatedRaw.createdAt), updatedAt: new Date(updatedRaw.updatedAt) };

              set(state => ({
                jobPricingList: state.jobPricingList.map(item => item.id === id ? updated : item),
                isLoading: false,
              }));
            } catch (err) {
              set({ error: "Failed to update pricing", isLoading: false });
            }
          },

          deleteJobPricing: async (id) => {
            set({ isLoading: true, error: null });
            try {
              const res = await fetch(`/api/jobpricing/${id}`, { method: "DELETE" });
              if (!res.ok) throw new Error("Failed to delete pricing");

              set(state => ({ jobPricingList: state.jobPricingList.filter(item => item.id !== id), isLoading: false }));
            } catch (err) {
              set({ error: "Failed to delete pricing", isLoading: false });
            }
          },
        };
      },
      { name: "jobPricingStore", partialize: (state) => ({ jobPricingList: state.jobPricingList }) }
    )
  )
);
