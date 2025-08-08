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
    materialType: "",
    variable: "",
    unitPrice: 0,
    modifiers: [],
    notes: "",
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchJobPricing();
  }, [fetchJobPricing]);

  const filteredList = useMemo(() => {
    return jobPricingList.filter((item) =>
      filterJobType === "All" ? true : item.jobType === filterJobType
    );
  }, [jobPricingList, filterJobType]);

  const handleSubmit = async () => {
    if (editingId) {
      await updateJobPricing(editingId, formData);
    } else {
      await createJobPricing(formData);
    }

    setFormData({
      jobType: "",
      materialType: "",
      variable: "",
      unitPrice: 0,
      modifiers: [],
      notes: "",
    });
    setEditingId(null);
  };

  const handleEdit = (item: JobPricing) => {
    setFormData({
      jobType: item.jobType,
      materialType: item.materialType ?? "",
      variable: item.variable,
      unitPrice: item.unitPrice,
      modifiers: item.modifiers,
      notes: item.notes ?? "",
    });
    setEditingId(item.id);
  };

  const handleDelete = async (id: string) => {
    await deleteJobPricing(id);
  };

  return (
    <div className="p-6 space-y-6 bg-background text-textPrimary transition-colors duration-300">
      <h1 className="text-2xl font-bold text-sea dark:text-textPrimary">
        Job Pricing Manager
      </h1>

      {/* Filter Dropdown */}
      <div className="flex items-center gap-4">
        <Label className="text-textSecondary">Filter by Job Type:</Label>
        <select
          className="border border-border rounded-md px-3 py-1 text-sm bg-surface text-textPrimary"
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

      {/* Form */}
      <Card className="bg-surface border border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-gold dark:text-textPrimary">
            {editingId ? "Edit Pricing" : "Add New Pricing"}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Job Type</Label>
            <Input
              className="bg-background text-textPrimary border-border"
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
              className="bg-background text-textPrimary border-border"
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
              className="bg-background text-textPrimary border-border"
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
              className="bg-background text-textPrimary border-border"
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
              className="bg-background text-textPrimary border-border"
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
              className="bg-background text-textPrimary border-border"
              value={formData.notes || ""}
              onChange={(e) =>
                setFormData((f) => ({ ...f, notes: e.target.value }))
              }
              placeholder="Optional notes..."
            />
          </div>

          <Button
            className="w-full md:col-span-2 bg-sea hover:bg-neonSea text-power dark:bg-gold dark:hover:bg-highGold dark:text-power"
            onClick={handleSubmit}
          >
            {editingId ? "Update Pricing" : "Create Pricing"}
          </Button>
        </CardContent>
      </Card>

      {/* Table */}
      <div className="overflow-auto border border-border rounded-lg shadow-sm">
        <table className="min-w-full table-auto border-collapse text-sm text-left">
          <thead className="bg-surface text-textPrimary">
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
                  className="p-3 border border-border font-semibold"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-textSecondary">
            {filteredList.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-sea/20 dark:hover:bg-muted/50 transition-colors duration-150"
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
                <td className="p-3 border border-border italic text-xs text-muted-foreground">
                  {item.notes || "-"}
                </td>
                <td className="p-3 border border-border text-center">
                  <div className="flex justify-center gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-sea text-power hover:bg-neonSea dark:bg-gold dark:text-power dark:hover:bg-highGold"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(item.id)}
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
                  className="text-center p-6 border border-border text-muted-foreground italic"
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
