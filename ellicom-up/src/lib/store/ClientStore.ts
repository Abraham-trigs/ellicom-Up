import { create } from 'zustand';

type Client = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
};

type ClientStore = {
  clients: Client[];
  fetchClients: () => Promise<void>;
  addClient: (client: Omit<Client, 'id'>) => Promise<void>;
  updateClient: (id: string, client: Partial<Client>) => Promise<void>;
  deleteClient: (id: string) => Promise<void>;
};

export const useClientStore = create<ClientStore>((set) => ({
  clients: [],

  fetchClients: async () => {
    try {
      const res = await fetch('/api/clients');
      if (!res.ok) throw new Error('Failed to fetch clients');
      const data = await res.json();
      set({ clients: data });
    } catch (err) {
      console.error('[ClientStore.fetchClients]', err);
    }
  },

  addClient: async (client) => {
    try {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(client),
      });
      if (!res.ok) throw new Error('Failed to create client');
      const newClient = await res.json();
      set((state) => ({
        clients: [...state.clients, newClient],
      }));
    } catch (err) {
      console.error('[ClientStore.addClient]', err);
    }
  },

  updateClient: async (id, client) => {
    try {
      const res = await fetch(`/api/clients/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(client),
      });
      if (!res.ok) throw new Error('Failed to update client');
      const updated = await res.json();
      set((state) => ({
        clients: state.clients.map((c) => (c.id === id ? updated : c)),
      }));
    } catch (err) {
      console.error('[ClientStore.updateClient]', err);
    }
  },

  deleteClient: async (id) => {
    try {
      const res = await fetch(`/api/clients/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete client');
      set((state) => ({
        clients: state.clients.filter((c) => c.id !== id),
      }));
    } catch (err) {
      console.error('[ClientStore.deleteClient]', err);
    }
  },
}));
