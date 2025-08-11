import { create } from "zustand";

type User = {
  id: string;
  name: string;
  email?: string;
};

type Job = {
  id: string;
  title: string;
  details?: string;
  type: string;
  status: string;
  createdById: string;
  handledById?: string;
  createdAt?: string;
  updatedAt?: string;
};

type JobWithUsers = Job & {
  createdBy?: User | null;
  handledBy?: User | null;
};

type JobStore = {
  jobs: JobWithUsers[];
  fetchJobs: () => Promise<void>;
  createJob: (job: Omit<Job, "id">) => Promise<void>;
  updateJob: (id: string, job: Partial<Job>) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
};

export const useJobStore = create<JobStore>((set) => ({
  jobs: [],

  fetchJobs: async () => {
    try {
      const res = await fetch("/api/jobs");
      if (!res.ok) throw new Error("Failed to fetch jobs");
      const data: JobWithUsers[] = await res.json();
      set({ jobs: data });
    } catch (err) {
      console.error("[JobStore.fetchJobs]", err);
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
      set((state) => ({
        jobs: [...state.jobs, newJob],
      }));
    } catch (err) {
      console.error("[JobStore.createJob]", err);
    }
  },

  updateJob: async (id, job) => {
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(job),
      });
      if (!res.ok) throw new Error("Failed to update job");
      const updated: JobWithUsers = await res.json();
      set((state) => ({
        jobs: state.jobs.map((j) => (j.id === id ? updated : j)),
      }));
    } catch (err) {
      console.error("[JobStore.updateJob]", err);
    }
  },

  deleteJob: async (id) => {
    try {
      const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete job");
      set((state) => ({
        jobs: state.jobs.filter((j) => j.id !== id),
      }));
    } catch (err) {
      console.error("[JobStore.deleteJob]", err);
    }
  },
}));
