"use client";

import { useEffect, useState } from "react";
import { useClientStore } from "../../../lib/store/ClientStore";

export default function ClientsPage() {
  const {
    clients,
    fetchClients,
    addClient,
    updateClient, // <- FIXED name
    deleteClient,
  } = useClientStore();

  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const handleSubmit = async () => {
    if (!form.name || !form.email) return alert("Name and Email are required");

    if (editingId) {
      await updateClient(editingId, form); // <- FIXED usage
      setEditingId(null);
    } else {
      await addClient(form);
    }

    setForm({ name: "", email: "", phone: "" });
  };

  const startEdit = (client: (typeof clients)[number]) => {
    setEditingId(client.id);
    setForm({
      name: client.name,
      email: client.email,
      phone: client.phone || "",
    });
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
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editingId ? "Update Client" : "Add Client"}
        </button>

        {editingId && (
          <button
            onClick={() => {
              setEditingId(null);
              setForm({ name: "", email: "", phone: "" });
            }}
            className="ml-4 text-sm text-gray-600 underline"
          >
            Cancel Edit
          </button>
        )}
      </div>

      <ul>
        {clients.map((client) => (
          <li
            key={client.id}
            className="border-b py-2 flex justify-between items-center"
          >
            <div>
              <strong>{client.name}</strong> – {client.email} – {client.phone}
            </div>
            <div className="space-x-2">
              <button
                onClick={() => startEdit(client)}
                className="text-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => deleteClient(client.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
