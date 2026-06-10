"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { inputCls, Button } from "@/components/admin/ui";
import type { EducationData } from "@/types";

export default function EducationAdminPage() {
  const [items, setItems] = useState<EducationData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/education").then((r) => r.json()).then((d) => { setItems(d); setLoading(false); });
  }, []);

  async function add() {
    const res = await fetch("/api/education", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ institution: "Institution", degree: "Degree", field: "", startYear: "2024", endYear: "Present", description: "", order: items.length }),
    });
    if (res.ok) setItems([...items, await res.json()]);
  }

  function patch(item: EducationData) {
    setItems(items.map((i) => (i.id === item.id ? item : i)));
  }

  async function persist(item: EducationData) {
    await fetch(`/api/education/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
  }

  async function remove(id: string) {
    await fetch(`/api/education/${id}`, { method: "DELETE" });
    setItems(items.filter((i) => i.id !== id));
  }

  if (loading) return <p className="text-sm text-muted">Loading…</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-semibold text-2xl">Education</h1>
        <Button onClick={add}><Plus size={14} /> Add entry</Button>
      </div>
      <div className="space-y-3">
        {items.map((ed) => (
          <div key={ed.id} className="surface rounded-xl p-4 space-y-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <input className={inputCls} value={ed.institution} placeholder="Institution" onChange={(e) => patch({ ...ed, institution: e.target.value })} onBlur={() => persist(ed)} />
              <input className={inputCls} value={ed.degree} placeholder="Degree" onChange={(e) => patch({ ...ed, degree: e.target.value })} onBlur={() => persist(ed)} />
            </div>
            <div className="grid sm:grid-cols-[1fr_110px_110px_80px_auto] gap-3 items-center">
              <input className={inputCls} value={ed.field} placeholder="Field (optional)" onChange={(e) => patch({ ...ed, field: e.target.value })} onBlur={() => persist(ed)} />
              <input className={inputCls} value={ed.startYear} placeholder="Start" onChange={(e) => patch({ ...ed, startYear: e.target.value })} onBlur={() => persist(ed)} />
              <input className={inputCls} value={ed.endYear} placeholder="End" onChange={(e) => patch({ ...ed, endYear: e.target.value })} onBlur={() => persist(ed)} />
              <input type="number" className={inputCls} value={ed.order} onChange={(e) => patch({ ...ed, order: Number(e.target.value) })} onBlur={() => persist(ed)} />
              <Button variant="danger" onClick={() => remove(ed.id)} aria-label="Delete entry"><Trash2 size={14} /></Button>
            </div>
            <textarea className={inputCls} rows={2} value={ed.description} placeholder="Description (optional)" onChange={(e) => patch({ ...ed, description: e.target.value })} onBlur={() => persist(ed)} />
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-muted">No education entries yet.</p>}
      </div>
    </div>
  );
}
