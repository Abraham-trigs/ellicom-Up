// app/clients/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useClientStore } from "../../../lib/store/ClientStore";

export default function ClientsPage() {
  const { clients, fetchClients, addClient } = useClientStore();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const handleAdd = async () => {
    await addClient(form);
    setForm({ name: "", email: "", phone: "" });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Clients</h1>

      <div className="mb-6 space-y-2">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="border p-2 w-full"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Client
        </button>
      </div>

      <ul>
        {clients.map((client) => (
          <li key={client.id} className="border-b py-2">
            <strong>{client.name}</strong> – {client.email} – {client.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}
