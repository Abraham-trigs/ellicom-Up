import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type JobPricing = {
  id: string
  jobType: string
  materialType?: string | null
  variable: string
  unitPrice: number
  modifiers: string[]
  notes?: string | null
  createdAt: string
  updatedAt: string
}

type State = {
  jobPricingList: JobPricing[]
  isLoading: boolean
  error: string | null

  fetchJobPricing: () => Promise<void>
  addJobPricing: (data: Omit<JobPricing, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateJobPricing: (id: string, data: Partial<JobPricing>) => Promise<void>
  deleteJobPricing: (id: string) => Promise<void>
}

export const useJobPricingStore = create<State>()(
  devtools((set) => ({
    jobPricingList: [],
    isLoading: false,
    error: null,

    fetchJobPricing: async () => {
      set({ isLoading: true, error: null })
      try {
        const res = await fetch('/api/job-pricing')
        const data = await res.json()
        set({ jobPricingList: data, isLoading: false })
      } catch (err: any) {
        set({ error: 'Failed to fetch pricing data', isLoading: false })
      }
    },

    addJobPricing: async (payload) => {
      set({ isLoading: true, error: null })
      try {
        const res = await fetch('/api/job-pricing', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        const newEntry = await res.json()
        set((state) => ({
          jobPricingList: [newEntry, ...state.jobPricingList],
          isLoading: false,
        }))
      } catch (err) {
        set({ error: 'Failed to add pricing', isLoading: false })
      }
    },

    updateJobPricing: async (id, payload) => {
      set({ isLoading: true, error: null })
      try {
        const res = await fetch(`/api/job-pricing/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        const updated = await res.json()
        set((state) => ({
          jobPricingList: state.jobPricingList.map((item) =>
            item.id === id ? updated : item
          ),
          isLoading: false,
        }))
      } catch (err) {
        set({ error: 'Failed to update pricing', isLoading: false })
      }
    },

    deleteJobPricing: async (id) => {
      set({ isLoading: true, error: null })
      try {
        await fetch(`/api/job-pricing/${id}`, {
          method: 'DELETE',
        })
        set((state) => ({
          jobPricingList: state.jobPricingList.filter((item) => item.id !== id),
          isLoading: false,
        }))
      } catch (err) {
        set({ error: 'Failed to delete pricing', isLoading: false })
      }
    },
  }))
)
