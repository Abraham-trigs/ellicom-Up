// lib/store/StaffStore.ts
import { create } from 'zustand';

export type UserRole = 'ADMIN' | 'SECRETARY' | 'STAFF';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: UserRole | string; // string because API might return other roles
  createdAt: string;
  updatedAt: string;
}

interface StaffStoreState {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchStaffUsers: () => Promise<void>;
}

export const useStaffStore = create<StaffStoreState>((set) => ({
  users: [],
  loading: false,
  error: null,
  fetchStaffUsers: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch('/api/users');
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

      const allUsers: User[] = await res.json();

      // Filter only ADMIN, SECRETARY, STAFF roles
      const filteredUsers = allUsers.filter(user =>
        ['ADMIN', 'SECRETARY', 'STAFF'].includes(user.role)
      );

      set({ users: filteredUsers, loading: false });
    } catch (err: any) {
      set({ error: err.message || 'Unknown error', loading: false });
    }
  },
}));
