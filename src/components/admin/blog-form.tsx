"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { inputCls, Field, Button, Toast } from "@/components/admin/ui";
import { ImageInput } from "@/components/admin/image-input";
import { TagInput } from "@/components/admin/tag-input";
import { MarkdownEditor } from "@/components/admin/markdown-editor";
import { slugify } from "@/lib/utils";
import type { BlogPostData } from "@/types";

const EMPTY: Omit<BlogPostData, "id" | "createdAt" | "updatedAt"> = {
  title: "", slug: "", excerpt: "", content: "", coverImage: "",
  category: "General", tags: [], published: false,
};

export function BlogForm({ initial }: { initial?: BlogPostData }) {
  const router = useRouter();
  const [data, setData] = useState({ ...EMPTY, ...initial });
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);

  function set<K extends keyof typeof data>(key: K, value: (typeof data)[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  async function save(publish?: boolean) {
    setSaving(true);
    setMsg("");
    const payload = {
      ...data,
      slug: data.slug || slugify(data.title),
      published: publish ?? data.published,
    };
    const res = await fetch(initial ? `/api/blogs/${initial.id}` : "/api/blogs", {
      method: initial ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (res.ok) {
      router.push("/admin/blogs");
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
          <Field label="Slug" hint="URL: /blog/your-slug">
            <input className={inputCls} value={data.slug} onChange={(e) => set("slug", slugify(e.target.value))} />
          </Field>
        </div>
        <Field label="Excerpt" hint="Short teaser shown on the blog list.">
          <textarea className={inputCls} rows={2} value={data.excerpt} onChange={(e) => set("excerpt", e.target.value)} />
        </Field>
        <ImageInput label="Cover image" value={data.coverImage} onChange={(v) => set("coverImage", v)} />
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Category"><input className={inputCls} value={data.category} onChange={(e) => set("category", e.target.value)} /></Field>
          <Field label="Tags">
            <TagInput value={data.tags} onChange={(v) => set("tags", v)} placeholder="e.g. deep-learning — press Enter" />
          </Field>
        </div>
      </div>

      <Field label="Content (markdown)">
        <MarkdownEditor value={data.content} onChange={(v) => set("content", v)} rows={20} />
      </Field>

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={() => save(false)} variant="ghost" disabled={saving || !data.title}>
          <Save size={14} /> Save as draft
        </Button>
        <Button onClick={() => save(true)} disabled={saving || !data.title}>
          {saving ? "Saving…" : "Publish"}
        </Button>
        {initial?.published && <span className="text-xs text-muted">Currently live</span>}
      </div>
      <Toast message={msg} error />
    </div>
  );
}
