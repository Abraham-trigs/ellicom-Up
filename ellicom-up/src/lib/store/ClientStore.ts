import { create } from "zustand";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  createdAt: string;
}

interface ClientStore {
  clients: Client[];
  fetchClients: () => Promise<void>;
  addClient: (data: {
    name: string;
    email: string;
    phone?: string;
    password: string;
  }) => Promise<void>;
  deleteClient: (id: string) => Promise<void>;
}

export const useClientStore = create<ClientStore>((set) => ({
  clients: [],

  fetchClients: async () => {
    try {
      const res = await fetch("/api/clients");
      if (!res.ok) throw new Error("Failed to fetch clients");
      const data = await res.json();
      set({ clients: data });
    } catch (err) {
      console.error("[ClientStore.fetchClients]", err);
    }
  },

  addClient: async (clientData) => {
    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clientData),
      });

      if (!res.ok) throw new Error("Failed to create client");
      const newClient = await res.json();
      set((state) => ({ clients: [...state.clients, newClient] }));
    } catch (err) {
      console.error("[ClientStore.addClient] Error:", err);
      throw err;
    }
  },

  deleteClient: async (id) => {
    try {
      const res = await fetch(`/api/clients/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete client");
      set((state) => ({
        clients: state.clients.filter((c) => c.id !== id),
      }));
    } catch (err) {
      console.error("[ClientStore.deleteClient] Error:", err);
    }
  },
}));
