"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/admin/ui";
import { formatDate, cn } from "@/lib/utils";
import type { BlogPostData } from "@/types";

export default function BlogsAdminPage() {
  const [posts, setPosts] = useState<BlogPostData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blogs").then((r) => r.json()).then((d) => { setPosts(d); setLoading(false); });
  }, []);

  async function remove(id: string) {
    if (!confirm("Delete this post? This can't be undone.")) return;
    await fetch(`/api/blogs/${id}`, { method: "DELETE" });
    setPosts(posts.filter((p) => p.id !== id));
  }

  async function togglePublish(p: BlogPostData) {
    const next = { ...p, published: !p.published };
    setPosts(posts.map((x) => (x.id === p.id ? next : x)));
    await fetch(`/api/blogs/${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: next.published }),
    });
  }

  if (loading) return <p className="text-sm text-muted">Loading…</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-semibold text-2xl">Blog</h1>
        <Link href="/admin/blogs/new"><Button><Plus size={14} /> New post</Button></Link>
      </div>
      <div className="space-y-3">
        {posts.map((p) => (
          <div key={p.id} className="surface rounded-xl p-4 flex items-center gap-4">
            <div className="min-w-0 flex-1">
              <p className="font-medium truncate">{p.title}</p>
              <p className="text-xs text-muted">{formatDate(p.createdAt)} · {p.category}</p>
            </div>
            <button
              onClick={() => togglePublish(p)}
              className={cn(
                "text-xs px-2.5 py-1 rounded-full border transition-colors",
                p.published
                  ? "border-green-400 text-green-700 dark:text-green-400"
                  : "border-line text-muted"
              )}
            >
              {p.published ? "Published" : "Draft"}
            </button>
            <Link href={`/admin/blogs/${p.id}`}><Button variant="ghost"><Pencil size={14} /> Edit</Button></Link>
            <Button variant="danger" onClick={() => remove(p.id)} aria-label="Delete post"><Trash2 size={14} /></Button>
          </div>
        ))}
        {posts.length === 0 && <p className="text-sm text-muted">No posts yet — write your first one.</p>}
      </div>
    </div>
  );
}
