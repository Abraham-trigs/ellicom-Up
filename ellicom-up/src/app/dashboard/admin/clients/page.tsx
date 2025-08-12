"use client";

import { useEffect, useState, useMemo } from "react";
import { useClientStore } from "../../../../lib/store/ClientStore";

const ROLES = ["CLIENT"] as const;

export default function ClientsPage() {
  const { clients, fetchClients, addClient, updateClient, deleteClient } =
    useClientStore();

  type Tab = (typeof ROLES)[number] | "addClient";
  const [activeTab, setActiveTab] = useState<Tab>("All");

  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const filteredClients = useMemo(() => {
    if (activeTab === "addClient" || activeTab === "All") return clients;
    return clients.filter((client) => client.role === activeTab);
  }, [activeTab, clients]);

  const handleSubmit = async () => {
    if (!form.name || !form.email) return alert("Name and Email are required");

    if (editingId) {
      await updateClient(editingId, form);
      setEditingId(null);
    } else {
      await addClient(form);
    }

    setForm({ name: "", email: "", phone: "" });
    setActiveTab("All");
  };

  const startEdit = (client: (typeof clients)[number]) => {
    setEditingId(client.id);
    setForm({
      name: client.name,
      email: client.email,
      phone: client.phone || "",
    });
    setActiveTab("addClient");
  };

  return (
    <div className="p-6 bg-ground dark:bg-surface text-ground dark:text-textPrimary min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Clients</h1>

      {/* Tabs */}
      <nav className="border-b border-border mb-6">
        <ul className="flex space-x-6 text-sm font-medium flex-wrap">
          {ROLES.map((role) => (
            <li key={role}>
              <button
                type="button"
                onClick={() => {
                  setActiveTab(role);
                  setEditingId(null);
                  setForm({ name: "", email: "", phone: "" });
                }}
                className={`pb-2 ${
                  activeTab === role
                    ? "border-b-2 border-gold text-gold dark:border-highGold dark:text-highGold"
                    : "text-inactive dark:text-textSecondary hover:text-gold dark:hover:text-highGold"
                }`}
              >
                {role}
              </button>
            </li>
          ))}

          <li>
            <button
              type="button"
              onClick={() => {
                setActiveTab("addClient");
                setEditingId(null);
                setForm({ name: "", email: "", phone: "" });
              }}
              className={`pb-2 ${
                activeTab === "addClient"
                  ? "border-b-2 border-gold text-gold dark:border-highGold dark:text-highGold"
                  : "text-inactive dark:text-textSecondary hover:text-gold dark:hover:text-highGold"
              }`}
            >
              {editingId ? "Edit Client" : "Add Client"}
            </button>
          </li>
        </ul>
      </nav>

      {/* Add/Edit Client Form */}
      {activeTab === "addClient" && (
        <div className="mb-6 max-w-md space-y-2">
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
                setActiveTab("All");
              }}
              className="ml-4 text-sm text-gray-600 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      )}

      {/* Client List */}
      {activeTab !== "addClient" && (
        <>
          {filteredClients.length === 0 ? (
            <p className="text-inactive dark:text-textMuted italic">
              No clients found for role "{activeTab}".
            </p>
          ) : (
            <ul className="space-y-4 max-w-3xl">
              {filteredClients.map((client) => (
                <li
                  key={client.id}
                  className="bg-ground dark:bg-surface rounded-lg p-4 shadow-sm
                             hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-head dark:text-textPrimary truncate">
                      {client.name}
                    </h3>

                    <div className="flex space-x-3">
                      <button
                        onClick={() => startEdit(client)}
                        className="text-sm px-3 py-1 rounded-full bg-sea text-power
                                   hover:bg-neonSea transition-colors duration-150"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteClient(client.id)}
                        className="text-sm px-3 py-1 rounded-full bg-red-600 text-white
                                   hover:bg-red-700 transition-colors duration-150"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1 text-sm text-inactive dark:text-textMuted">
                    <p>
                      <span className="font-semibold">Email: </span>
                      <span className="truncate">{client.email}</span>
                    </p>
                    <p>
                      <span className="font-semibold">Phone: </span>
                      <span>{client.phone || "-"}</span>
                    </p>
                    <p>
                      <span className="font-semibold">Role: </span>
                      <span className="text-gold dark:text-highGold">
                        {client.role}
                      </span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
