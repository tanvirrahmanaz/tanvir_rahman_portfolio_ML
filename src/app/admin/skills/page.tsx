"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { inputCls, Button } from "@/components/admin/ui";
import { ImageInput } from "@/components/admin/image-input";
import type { SkillData } from "@/types";

export default function SkillsAdminPage() {
  const [skills, setSkills] = useState<SkillData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/skills").then((r) => r.json()).then((d) => { setSkills(d); setLoading(false); });
  }, []);

  async function addSkill() {
    const res = await fetch("/api/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "New skill", category: "General", logoUrl: "", order: skills.length }),
    });
    if (res.ok) setSkills([...skills, await res.json()]);
  }

  function patch(skill: SkillData) {
    setSkills(skills.map((s) => (s.id === skill.id ? skill : s)));
  }

  async function persist(skill: SkillData) {
    await fetch(`/api/skills/${skill.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(skill),
    });
  }

  async function remove(id: string) {
    await fetch(`/api/skills/${id}`, { method: "DELETE" });
    setSkills(skills.filter((s) => s.id !== id));
  }

  if (loading) return <p className="text-sm text-muted">Loading…</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h1 className="font-display font-semibold text-2xl">Skills</h1>
        <Button onClick={addSkill}><Plus size={14} /> Add skill</Button>
      </div>
      <p className="text-sm text-muted mb-6">Logo: upload an image or paste a URL — devicon CDN links work great. Same category names group together on the site.</p>
      <div className="space-y-3">
        {skills.map((skill) => (
          <div key={skill.id} className="surface rounded-xl p-4 space-y-3">
            <div className="grid sm:grid-cols-[1fr_1fr_90px_auto] gap-3 items-end">
              <label className="block">
                <span className="block text-xs font-medium mb-1.5">Name</span>
                <input className={inputCls} value={skill.name} onChange={(e) => patch({ ...skill, name: e.target.value })} onBlur={() => persist(skill)} />
              </label>
              <label className="block">
                <span className="block text-xs font-medium mb-1.5">Category</span>
                <input className={inputCls} value={skill.category} placeholder="ML / AI" onChange={(e) => patch({ ...skill, category: e.target.value })} onBlur={() => persist(skill)} />
              </label>
              <label className="block">
                <span className="block text-xs font-medium mb-1.5">Order</span>
                <input type="number" className={inputCls} value={skill.order} onChange={(e) => patch({ ...skill, order: Number(e.target.value) })} onBlur={() => persist(skill)} />
              </label>
              <Button variant="danger" onClick={() => remove(skill.id)} aria-label="Delete skill"><Trash2 size={14} /></Button>
            </div>
            <ImageInput label="Logo" value={skill.logoUrl} onChange={(v) => { const next = { ...skill, logoUrl: v }; patch(next); persist(next); }} />
          </div>
        ))}
        {skills.length === 0 && <p className="text-sm text-muted">No skills yet — add your first one.</p>}
      </div>
    </div>
  );
}
