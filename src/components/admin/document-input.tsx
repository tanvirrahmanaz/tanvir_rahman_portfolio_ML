"use client";

import { useRef, useState } from "react";
import { FileText, Upload } from "lucide-react";
import { inputCls, Button } from "./ui";

type Props = {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  hint?: string;
};

function getFileLabel(value: string) {
  if (!value) return "";
  if (value.startsWith("data:application/pdf")) return "Uploaded PDF";

  try {
    const url = new URL(value);
    const lastSegment = url.pathname.split("/").filter(Boolean).pop();
    return lastSegment || url.hostname;
  } catch {
    return value;
  }
}

export function DocumentInput({ value, onChange, label = "Document", hint }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("/api/upload/file", {
      method: "POST",
      body: fd,
    });
    const json = await res.json().catch(() => ({}));

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
          <FileText size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            className={`${inputCls} pl-9`}
            placeholder="Paste a public PDF URL or upload a PDF"
            value={value}
            onChange={(e) => onChange(e.target.value.trim())}
          />
        </div>
        <Button type="button" variant="ghost" onClick={() => fileRef.current?.click()} disabled={uploading}>
          <Upload size={14} /> {uploading ? "Uploading..." : "Upload PDF"}
        </Button>
        <input ref={fileRef} type="file" accept="application/pdf" hidden onChange={handleFile} />
      </div>
      {hint && <p className="text-[11px] text-muted mt-1">{hint}</p>}
      {error && <p className="text-[11px] text-red-500 mt-1">{error}</p>}
      {value && (
        <p className="mt-2 text-[11px] text-muted">
          Current file: <span className="text-[rgb(var(--fg))]">{getFileLabel(value)}</span>
        </p>
      )}
    </div>
  );
}
