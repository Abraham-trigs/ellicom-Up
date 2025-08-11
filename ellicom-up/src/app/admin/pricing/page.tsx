"use client";

import { useEffect, useState, useMemo } from "react";
import { useJobPricingStore } from "@/lib/store/JobPricingStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { JobPricing } from "@prisma/client";

export default function PricingPage() {
  const {
    jobPricingList,
    fetchJobPricing,
    createJobPricing,
    updateJobPricing,
    deleteJobPricing,
  } = useJobPricingStore();

  const [filterJobType, setFilterJobType] = useState("All");
  const [formData, setFormData] = useState<
    Omit<JobPricing, "id" | "createdAt" | "updatedAt">
  >({
    jobType: "",
    materialType: null,
    variable: "",
    unitPrice: 0,
    modifiers: [],
    notes: "",
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    fetchJobPricing();
  }, [fetchJobPricing]);

  const filteredList = useMemo(() => {
    return jobPricingList.filter((item) =>
      filterJobType === "All" ? true : item.jobType === filterJobType
    );
  }, [jobPricingList, filterJobType]);

  const toggleTab = (tabName: string) => {
    setActiveTab((current) => (current === tabName ? "" : tabName));
  };

  const handleSubmit = async () => {
    if (editingId) {
      await updateJobPricing(editingId, formData);
    } else {
      await createJobPricing(formData);
    }

    setFormData({
      jobType: "",
      materialType: null,
      variable: "",
      unitPrice: 0,
      modifiers: [],
      notes: "",
    });
    setEditingId(null);
    setActiveTab("");
  };

  const handleEdit = (item: JobPricing) => {
    setFormData({
      jobType: item.jobType,
      // Fix the type issue by explicitly normalizing undefined to null
      materialType: item.materialType === undefined ? null : item.materialType,
      variable: item.variable,
      unitPrice: item.unitPrice,
      modifiers: item.modifiers ?? [],
      notes: item.notes ?? "",
    });
    setEditingId(item.id);
    setActiveTab("addPricing");
  };

  const handleDelete = async (id: string) => {
    await deleteJobPricing(id);
  };

  return (
    <div
      className="p-6 space-y-6 bg-ground text-power transition-colors duration-300 min-h-screen
                 dark:bg-background dark:text-textPrimary"
    >
      <h1 className="text-2xl font-bold text-sea dark:text-textPrimary">
        Job Pricing Manager
      </h1>

      {/* Navbar Tabs */}
      <nav className="border-b border-border mb-6">
        <ul className="flex space-x-6 text-sm font-medium">
          <li>
            <button
              className={`pb-2 ${
                activeTab === "addPricing"
                  ? "border-b-2 border-gold text-gold dark:border-highGold dark:text-highGold"
                  : "text-inactive dark:text-textSecondary hover:text-gold dark:hover:text-highGold"
              }`}
              onClick={() => toggleTab("addPricing")}
              type="button"
            >
              Add Pricing
            </button>
          </li>
        </ul>
      </nav>

      {activeTab === "addPricing" && (
        <Card
          className="bg-ground shadow-sm rounded-md text-inactive
                     dark:bg-surface dark:border-border"
        >
          <CardHeader>
            <CardTitle className="text-gold dark:text-textPrimary">
              {editingId ? "Edit Pricing" : "Add New Pricing"}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Job Type</Label>
              <Input
                className="bg-coHead text-ground font-bold
                           dark:bg-background dark:text-textPrimary dark:border-border"
                value={formData.jobType}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, jobType: e.target.value }))
                }
                placeholder="e.g. Designing"
              />
            </div>

            <div>
              <Label>Variable</Label>
              <Input
                className="bg-coHead text-ground font-bold
                           dark:bg-background dark:text-textPrimary dark:border-border"
                value={formData.variable}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, variable: e.target.value }))
                }
                placeholder="e.g. Logo, Flyer"
              />
            </div>

            <div>
              <Label>Material Type (optional)</Label>
              <Input
                className="bg-coHead text-ground font-bold
                           dark:bg-background dark:text-textPrimary dark:border-border"
                value={formData.materialType || ""}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, materialType: e.target.value }))
                }
                placeholder="e.g. Glossy, Matte"
              />
            </div>

            <div>
              <Label>Unit Price</Label>
              <Input
                className="bg-coHead text-ground font-bold
                           dark:bg-background dark:text-textPrimary dark:border-border"
                type="number"
                value={formData.unitPrice}
                onChange={(e) =>
                  setFormData((f) => ({
                    ...f,
                    unitPrice: parseFloat(e.target.value),
                  }))
                }
                placeholder="e.g. 10"
              />
            </div>

            <div className="md:col-span-2">
              <Label>Modifiers (comma separated)</Label>
              <Input
                className="bg-coHead text-ground font-bold
                           dark:bg-background dark:text-textPrimary dark:border-border"
                value={formData.modifiers.join(", ")}
                onChange={(e) =>
                  setFormData((f) => ({
                    ...f,
                    modifiers: e.target.value.split(",").map((m) => m.trim()),
                  }))
                }
                placeholder="e.g. colored, double-sided"
              />
            </div>

            <div className="md:col-span-2">
              <Label>Notes</Label>
              <Textarea
                className="bg-coHead text-ground font-bold border border-none
                           dark:bg-background dark:text-textPrimary dark:border-border"
                value={formData.notes || ""}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, notes: e.target.value }))
                }
                placeholder="Optional notes..."
              />
            </div>

            <Button
              className="w-full md:col-span-2 bg-sea hover:bg-neonSea text-power
                         dark:bg-gold dark:hover:bg-highGold dark:text-power"
              onClick={handleSubmit}
            >
              {editingId ? "Update Pricing" : "Create Pricing"}
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="flex items-center gap-4">
        <Label className="text-inactive dark:text-textSecondary">
          Filter by Job Type:
        </Label>
        <select
          className="border border-border rounded-md px-3 py-1 text-sm bg-darkSea text-coHead
                     dark:bg-surface dark:text-textPrimary"
          value={filterJobType}
          onChange={(e) => setFilterJobType(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Designing">Designing</option>
          <option value="Typing">Typing</option>
          <option value="Scanning">Scanning</option>
          <option value="Lamination">Lamination</option>
          <option value="Large Format">Large Format</option>
        </select>
      </div>

      <div
        className="overflow-auto border border-border rounded-lg shadow-sm bg-ground
                   text-power dark:bg-surface dark:text-textPrimary"
      >
        <table className="min-w-full table-auto border-collapse text-sm text-left">
          <thead className="bg-coHead text-ground dark:bg-surface dark:text-textSecondary">
            <tr>
              {[
                "Job Type",
                "Variable",
                "Material",
                "Unit Price (GHS)",
                "Modifiers",
                "Notes",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="p-3 border border-border font-semibold select-none"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-inactive dark:text-textMuted">
            {filteredList.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-sea/20 dark:hover:bg-borderAlt transition-colors duration-150 cursor-pointer"
              >
                <td className="p-3 border border-border">{item.jobType}</td>
                <td className="p-3 border border-border">{item.variable}</td>
                <td className="p-3 border border-border">
                  {item.materialType || "-"}
                </td>
                <td className="p-3 border border-border font-medium">
                  {item.unitPrice.toFixed(2)}
                </td>
                <td className="p-3 border border-border">
                  {item.modifiers?.length ? item.modifiers.join(", ") : "-"}
                </td>
                <td className="p-3 border border-border italic text-xs text-textMuted">
                  {item.notes || "-"}
                </td>
                <td className="p-3 border border-border text-center">
                  <div className="flex justify-center gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-sea text-power hover:bg-neonSea
                                 dark:bg-gold dark:text-power dark:hover:bg-highGold"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-600 text-white hover:bg-red-700
                                 dark:bg-red-800 dark:hover:bg-red-900"
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredList.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="text-center p-6 border border-border text-textMuted italic select-none"
                >
                  No job pricing entries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
