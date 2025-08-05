import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type Role = "ADMIN" | "SECRETARY" | "STAFF";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
}

interface TeamStore {
  team: TeamMember[];
  loading: boolean;
  error: string | null;
  fetchTeam: () => Promise<void>;
}

export const useTeamStore = create<TeamStore>()(
  devtools((set) => ({
    team: [],
    loading: false,
    error: null,

    fetchTeam: async () => {
      set({ loading: true, error: null });
      try {
        const res = await fetch("/api/team-members");
        const result = await res.json();

        if (!res.ok || !result.success) {
          throw new Error(result.message || "Failed to fetch team");
        }

        set({ team: result.data, loading: false });
      } catch (error: any) {
        console.error("FETCH TEAM ERROR:", error);
        set({ error: error.message || "Unknown error", loading: false });
      }
    },
  }))
);
