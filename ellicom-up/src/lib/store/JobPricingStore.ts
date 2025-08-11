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

type JobPricing = {
  id: string;
  jobType: string;
  materialType?: string | null;
  variable: string;
  unitPrice: number;
  modifiers: string[];
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
};

type State = {
  jobPricingList: JobPricing[];
  isLoading: boolean;
  error: string | null;

  jobTypes: string[];

  fetchJobPricing: () => Promise<void>;
  addJobPricing: (
    data: Omit<JobPricing, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  updateJobPricing: (
    id: string,
    data: Partial<JobPricing>
  ) => Promise<void>;
  deleteJobPricing: (id: string) => Promise<void>;
};

export const useJobPricingStore = create<State>()(
  devtools(
    persist(
      (set, get) => {
        const debouncedFetch = debounce(async () => {
          const currentData = get().jobPricingList;
          const isFirstLoad = currentData.length === 0;

          if (isFirstLoad) {
            set({ isLoading: true, error: null });
          } else {
            set({ error: null });
          }

          try {
            const res = await fetch("/api/job-pricing");
            if (!res.ok) throw new Error("Failed to fetch pricing data");
            const freshData: JobPricing[] = await res.json();

            const isDifferent =
              JSON.stringify(freshData) !== JSON.stringify(get().jobPricingList);

            if (isDifferent) {
              set({ jobPricingList: freshData });
            }
          } catch (err: any) {
            set({ error: "Failed to fetch pricing data" });
          } finally {
            set({ isLoading: false });
          }
        }, 500);

        return {
          jobPricingList: [],
          isLoading: false,
          error: null,

          get jobTypes() {
            return Array.from(new Set(get().jobPricingList.map((j) => j.jobType)));
          },

          fetchJobPricing: async () => {
            debouncedFetch();
          },

          addJobPricing: async (payload) => {
            set({ isLoading: true, error: null });
            try {
              const res = await fetch("/api/job-pricing", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              });
              if (!res.ok) throw new Error("Failed to add pricing");
              const newEntry = await res.json();
              set((state) => ({
                jobPricingList: [newEntry, ...state.jobPricingList],
                isLoading: false,
              }));
            } catch (err) {
              set({ error: "Failed to add pricing", isLoading: false });
            }
          },

          updateJobPricing: async (id, payload) => {
            set({ isLoading: true, error: null });
            try {
              const res = await fetch(`/api/job-pricing/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              });
              if (!res.ok) throw new Error("Failed to update pricing");
              const updated = await res.json();
              set((state) => ({
                jobPricingList: state.jobPricingList.map((item) =>
                  item.id === id ? updated : item
                ),
                isLoading: false,
              }));
            } catch (err) {
              set({ error: "Failed to update pricing", isLoading: false });
            }
          },

          deleteJobPricing: async (id) => {
            set({ isLoading: true, error: null });
            try {
              const res = await fetch(`/api/job-pricing/${id}`, {
                method: "DELETE",
              });
              if (!res.ok) throw new Error("Failed to delete pricing");
              set((state) => ({
                jobPricingList: state.jobPricingList.filter(
                  (item) => item.id !== id
                ),
                isLoading: false,
              }));
            } catch (err) {
              set({ error: "Failed to delete pricing", isLoading: false });
            }
          },
        };
      },
      {
        name: "jobPricingStore",
        partialize: (state) => ({
          jobPricingList: state.jobPricingList,
        }),
      }
    )
  )
);
