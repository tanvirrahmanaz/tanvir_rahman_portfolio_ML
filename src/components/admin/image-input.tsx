"use client";

import { useRef, useState } from "react";
import { Upload, Link2 } from "lucide-react";
import { inputCls, Button } from "./ui";

/** Converts a Google Drive share link to a direct image link automatically. */
function normalizeUrl(url: string): string {
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (driveMatch) return `https://drive.google.com/uc?export=view&id=${driveMatch[1]}`;
  const driveOpen = url.match(/drive\.google\.com\/open\?id=([^&]+)/);
  if (driveOpen) return `https://drive.google.com/uc?export=view&id=${driveOpen[1]}`;
  return url;
}

type Props = {
  value: string;
  onChange: (url: string) => void;
  label?: string;
};

/** Image field: paste any URL (Google Drive links auto-converted) or upload via imgbb. */
export function ImageInput({ value, onChange, label = "Image" }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    const fd = new FormData();
    fd.append("image", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const json = await res.json();
    setUploading(false);
    if (res.ok) onChange(json.url);
    else setError(json.error || "Upload failed");
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <div>
      <span className="block text-xs font-medium mb-1.5">{label}</span>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Link2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            className={`${inputCls} pl-9`}
            placeholder="Paste image URL (imgbb / Google Drive link works)"
            value={value}
            onChange={(e) => onChange(normalizeUrl(e.target.value.trim()))}
          />
        </div>
        <Button type="button" variant="ghost" onClick={() => fileRef.current?.click()} disabled={uploading}>
          <Upload size={14} /> {uploading ? "Uploading…" : "Upload"}
        </Button>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleFile} />
      </div>
      {error && <p className="text-[11px] text-red-500 mt-1">{error}</p>}
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="Preview" className="mt-2 h-20 rounded-lg border border-line object-cover" />
      )}
    </div>
  );
}
