"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { inputCls, Button } from "@/components/admin/ui";
import { ImageInput } from "@/components/admin/image-input";
import type { CertificationData } from "@/types";

export default function CertificationsAdminPage() {
  const [items, setItems] = useState<CertificationData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/certifications").then((r) => r.json()).then((d) => { setItems(d); setLoading(false); });
  }, []);

  async function add() {
    const res = await fetch("/api/certifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "New certification", issuer: "Issuer", date: "", credentialUrl: "", imageUrl: "", order: items.length }),
    });
    if (res.ok) setItems([...items, await res.json()]);
  }

  function patch(item: CertificationData) {
    setItems(items.map((i) => (i.id === item.id ? item : i)));
  }

  async function persist(item: CertificationData) {
    await fetch(`/api/certifications/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
  }

  async function remove(id: string) {
    await fetch(`/api/certifications/${id}`, { method: "DELETE" });
    setItems(items.filter((i) => i.id !== id));
  }

  if (loading) return <p className="text-sm text-muted">Loading…</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-semibold text-2xl">Certifications</h1>
        <Button onClick={add}><Plus size={14} /> Add certification</Button>
      </div>
      <div className="space-y-3">
        {items.map((c) => (
          <div key={c.id} className="surface rounded-xl p-4 space-y-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <input className={inputCls} value={c.title} placeholder="Title" onChange={(e) => patch({ ...c, title: e.target.value })} onBlur={() => persist(c)} />
              <input className={inputCls} value={c.issuer} placeholder="Issuer" onChange={(e) => patch({ ...c, issuer: e.target.value })} onBlur={() => persist(c)} />
            </div>
            <div className="grid sm:grid-cols-[120px_1fr_80px_auto] gap-3 items-center">
              <input className={inputCls} value={c.date} placeholder="2025" onChange={(e) => patch({ ...c, date: e.target.value })} onBlur={() => persist(c)} />
              <input className={inputCls} value={c.credentialUrl} placeholder="Credential URL (optional)" onChange={(e) => patch({ ...c, credentialUrl: e.target.value })} onBlur={() => persist(c)} />
              <input type="number" className={inputCls} value={c.order} onChange={(e) => patch({ ...c, order: Number(e.target.value) })} onBlur={() => persist(c)} />
              <Button variant="danger" onClick={() => remove(c.id)} aria-label="Delete certification"><Trash2 size={14} /></Button>
            </div>
            <ImageInput label="Badge image (optional)" value={c.imageUrl} onChange={(v) => { const next = { ...c, imageUrl: v }; patch(next); persist(next); }} />
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-muted">No certifications yet.</p>}
      </div>
    </div>
  );
}
