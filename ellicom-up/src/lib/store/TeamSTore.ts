// import { create } from 'zustand';

// type TeamMember = {
//   id: string;
//   name: string;
//   email: string;
//   phone?: string;
//   role: 'STAFF' | 'ADMIN' | 'SECRETARY';
// };

// type TeamStore = {
//   members: TeamMember[];
//   fetchMembers: () => Promise<void>;
//   addMember: (member: Omit<TeamMember, 'id'>) => Promise<void>;
//   updateMember: (id: string, member: Partial<TeamMember>) => Promise<void>;
//   deleteMember: (id: string) => Promise<void>;
// };

// export const useTeamStore = create<TeamStore>((set) => ({
//   members: [],

//   fetchMembers: async () => {
//     try {
//       const res = await fetch('/api/team');
//       const data = await res.json();
//       set({ members: data });
//     } catch (err) {
//       console.error('[TeamStore.fetchMembers]', err);
//     }
//   },

  
//   addMember: async (member) => {
//     try {
//       const res = await fetch('/api/team', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(member),
//       });
//       const newMember = await res.json();
//       set((state) => ({ members: [...state.members, newMember] }));
//     } catch (err) {
//       console.error('[TeamStore.addMember]', err);
//     }
//   },

//   updateMember: async (id, member) => {
//     try {
//       const res = await fetch(`/api/team/${id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(member),
//       });
//       const updated = await res.json();
//       set((state) => ({
//         members: state.members.map((m) => (m.id === id ? updated : m)),
//       }));
//     } catch (err) {
//       console.error('[TeamStore.updateMember]', err);
//     }
//   },

//   deleteMember: async (id) => {
//     try {
//       await fetch(`/api/team/${id}`, { method: 'DELETE' });
//       set((state) => ({
//         members: state.members.filter((m) => m.id !== id),
//       }));
//     } catch (err) {
//       console.error('[TeamStore.deleteMember]', err);
//     }
//   },
// }));
