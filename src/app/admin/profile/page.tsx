"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import { inputCls, Field, Button, Toast } from "@/components/admin/ui";
import { ImageInput } from "@/components/admin/image-input";
import { TagInput } from "@/components/admin/tag-input";
import type { ProfileData, SocialLinkData } from "@/types";

const PLATFORMS = ["github", "linkedin", "youtube", "twitter", "facebook", "instagram", "email", "custom"];

export default function ProfileAdminPage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [links, setLinks] = useState<SocialLinkData[]>([]);
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/profile").then((r) => r.json()).then(setProfile);
    fetch("/api/social-links").then((r) => r.json()).then(setLinks);
  }, []);

  if (!profile) return <p className="text-sm text-muted">Loading…</p>;

  function set<K extends keyof ProfileData>(key: K, value: ProfileData[K]) {
    setProfile((p) => (p ? { ...p, [key]: value } : p));
  }

  async function saveProfile() {
    setSaving(true);
    setMsg("");
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    setSaving(false);
    setMsg(res.ok ? "Profile saved." : "Save failed.");
  }

  async function addLink() {
    const res = await fetch("/api/social-links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ platform: "custom", label: "New link", url: "https://", order: links.length }),
    });
    if (res.ok) setLinks([...links, await res.json()]);
  }

  async function updateLink(link: SocialLinkData) {
    setLinks(links.map((l) => (l.id === link.id ? link : l)));
  }

  async function persistLink(link: SocialLinkData) {
    await fetch(`/api/social-links/${link.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(link),
    });
  }

  async function deleteLink(id: string) {
    await fetch(`/api/social-links/${id}`, { method: "DELETE" });
    setLinks(links.filter((l) => l.id !== id));
  }

  return (
    <div className="space-y-10">
      <section>
        <h1 className="font-display font-semibold text-2xl mb-1">Profile</h1>
        <p className="text-sm text-muted mb-6">This powers the hero section and site metadata.</p>
        <div className="surface rounded-2xl p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Name"><input className={inputCls} value={profile.name} onChange={(e) => set("name", e.target.value)} /></Field>
            <Field label="Title"><input className={inputCls} value={profile.title} onChange={(e) => set("title", e.target.value)} /></Field>
          </div>
          <Field label="Typing animation lines" hint="Each chip becomes one line in the hero typing effect.">
            <TagInput value={profile.typingLines} onChange={(v) => set("typingLines", v)} placeholder="e.g. I build neural networks" />
          </Field>
          <Field label="Bio">
            <textarea className={inputCls} rows={4} value={profile.bio} onChange={(e) => set("bio", e.target.value)} />
          </Field>
          <ImageInput label="Avatar (leave empty to show initials)" value={profile.avatarUrl} onChange={(v) => set("avatarUrl", v)} />
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Resume URL" hint="Google Drive / any public PDF link.">
              <input className={inputCls} value={profile.resumeUrl} onChange={(e) => set("resumeUrl", e.target.value)} />
            </Field>
            <Field label="CV URL">
              <input className={inputCls} value={profile.cvUrl} onChange={(e) => set("cvUrl", e.target.value)} />
            </Field>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Email"><input className={inputCls} value={profile.email} onChange={(e) => set("email", e.target.value)} /></Field>
            <Field label="GitHub username" hint="Drives the GitHub stats section.">
              <input className={inputCls} value={profile.githubUsername} onChange={(e) => set("githubUsername", e.target.value)} />
            </Field>
            <Field label="Location"><input className={inputCls} value={profile.location} onChange={(e) => set("location", e.target.value)} /></Field>
          </div>
          <Button onClick={saveProfile} disabled={saving}><Save size={14} /> {saving ? "Saving…" : "Save profile"}</Button>
          <Toast message={msg} error={msg.includes("failed")} />
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-xl">Social links</h2>
          <Button variant="ghost" onClick={addLink}><Plus size={14} /> Add link</Button>
        </div>
        <div className="space-y-3">
          {links.map((link) => (
            <div key={link.id} className="surface rounded-xl p-4 grid sm:grid-cols-[140px_1fr_2fr_auto] gap-3 items-center">
              <select
                className={inputCls}
                value={link.platform}
                onChange={(e) => updateLink({ ...link, platform: e.target.value })}
                onBlur={() => persistLink(link)}
              >
                {PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
              <input className={inputCls} value={link.label} placeholder="Label" onChange={(e) => updateLink({ ...link, label: e.target.value })} onBlur={() => persistLink(link)} />
              <input className={inputCls} value={link.url} placeholder="https://" onChange={(e) => updateLink({ ...link, url: e.target.value })} onBlur={() => persistLink(link)} />
              <Button variant="danger" onClick={() => deleteLink(link.id)} aria-label="Delete link"><Trash2 size={14} /></Button>
            </div>
          ))}
          {links.length === 0 && <p className="text-sm text-muted">No social links yet — add your first one.</p>}
        </div>
      </section>
    </div>
  );
}
