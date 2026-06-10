"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { inputCls, Field, Button, Toast } from "@/components/admin/ui";
import { ImageInput } from "@/components/admin/image-input";
import { TagInput } from "@/components/admin/tag-input";
import { MarkdownEditor } from "@/components/admin/markdown-editor";
import { slugify } from "@/lib/utils";
import type { ProjectData } from "@/types";

const EMPTY: Omit<ProjectData, "id" | "createdAt" | "updatedAt"> = {
  title: "", slug: "", summary: "", content: "", imageUrl: "",
  liveUrl: "", githubUrl: "", techStack: [], featured: false, order: 0,
};

export function ProjectForm({ initial }: { initial?: ProjectData }) {
  const router = useRouter();
  const [data, setData] = useState({ ...EMPTY, ...initial });
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);

  function set<K extends keyof typeof data>(key: K, value: (typeof data)[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  async function save() {
    setSaving(true);
    setMsg("");
    const payload = { ...data, slug: data.slug || slugify(data.title) };
    const res = await fetch(initial ? `/api/projects/${initial.id}` : "/api/projects", {
      method: initial ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (res.ok) {
      setMsg("Saved.");
      router.push("/admin/projects");
      router.refresh();
    } else {
      const j = await res.json().catch(() => ({}));
      setMsg(j.error || "Save failed — slug might already exist.");
    }
  }

  return (
    <div className="space-y-4">
      <div className="surface rounded-2xl p-6 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Title">
            <input
              className={inputCls}
              value={data.title}
              onChange={(e) => {
                set("title", e.target.value);
                if (!initial) set("slug", slugify(e.target.value));
              }}
            />
          </Field>
          <Field label="Slug" hint="URL: /projects/your-slug">
            <input className={inputCls} value={data.slug} onChange={(e) => set("slug", slugify(e.target.value))} />
          </Field>
        </div>
        <Field label="Summary" hint="One or two lines shown on cards.">
          <textarea className={inputCls} rows={2} value={data.summary} onChange={(e) => set("summary", e.target.value)} />
        </Field>
        <ImageInput label="Cover image" value={data.imageUrl} onChange={(v) => set("imageUrl", v)} />
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Live URL"><input className={inputCls} value={data.liveUrl} onChange={(e) => set("liveUrl", e.target.value)} placeholder="https://" /></Field>
          <Field label="GitHub URL"><input className={inputCls} value={data.githubUrl} onChange={(e) => set("githubUrl", e.target.value)} placeholder="https://github.com/…" /></Field>
        </div>
        <Field label="Tech stack">
          <TagInput value={data.techStack} onChange={(v) => set("techStack", v)} placeholder="e.g. PyTorch — press Enter" />
        </Field>
        <div className="flex items-center gap-6">
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={data.featured} onChange={(e) => set("featured", e.target.checked)} className="accent-current" />
            Featured on homepage
          </label>
          <label className="inline-flex items-center gap-2 text-sm">
            Order
            <input type="number" className={`${inputCls} w-20`} value={data.order} onChange={(e) => set("order", Number(e.target.value))} />
          </label>
        </div>
      </div>

      <Field label="Details (markdown)" hint="Shown on the project detail page.">
        <MarkdownEditor value={data.content} onChange={(v) => set("content", v)} rows={14} />
      </Field>

      <Button onClick={save} disabled={saving || !data.title}>
        <Save size={14} /> {saving ? "Saving…" : initial ? "Save changes" : "Create project"}
      </Button>
      <Toast message={msg} error={msg.includes("failed")} />
    </div>
  );
}
