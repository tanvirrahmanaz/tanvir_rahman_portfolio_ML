"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Trash2, Pencil, Star } from "lucide-react";
import { Button } from "@/components/admin/ui";
import type { ProjectData } from "@/types";

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects").then((r) => r.json()).then((d) => { setProjects(d); setLoading(false); });
  }, []);

  async function remove(id: string) {
    if (!confirm("Delete this project? This can't be undone.")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    setProjects(projects.filter((p) => p.id !== id));
  }

  async function toggleFeatured(p: ProjectData) {
    const next = { ...p, featured: !p.featured };
    setProjects(projects.map((x) => (x.id === p.id ? next : x)));
    await fetch(`/api/projects/${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured: next.featured }),
    });
  }

  if (loading) return <p className="text-sm text-muted">Loading…</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-semibold text-2xl">Projects</h1>
        <Link href="/admin/projects/new"><Button><Plus size={14} /> New project</Button></Link>
      </div>
      <div className="space-y-3">
        {projects.map((p) => (
          <div key={p.id} className="surface rounded-xl p-4 flex items-center gap-4">
            <div className="w-16 h-12 rounded-lg overflow-hidden border border-line shrink-0 bg-ink-100 dark:bg-ink-900">
              {p.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.imageUrl} alt="" className="w-full h-full object-cover" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium truncate">{p.title}</p>
              <p className="text-xs text-muted truncate">/{p.slug}</p>
            </div>
            <button
              onClick={() => toggleFeatured(p)}
              title={p.featured ? "Featured on homepage" : "Not featured"}
              className={p.featured ? "text-amber-500" : "text-muted hover:text-[rgb(var(--fg))]"}
            >
              <Star size={16} fill={p.featured ? "currentColor" : "none"} />
            </button>
            <Link href={`/admin/projects/${p.id}`}><Button variant="ghost"><Pencil size={14} /> Edit</Button></Link>
            <Button variant="danger" onClick={() => remove(p.id)} aria-label="Delete project"><Trash2 size={14} /></Button>
          </div>
        ))}
        {projects.length === 0 && <p className="text-sm text-muted">No projects yet — create your first one.</p>}
      </div>
    </div>
  );
}
