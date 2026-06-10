"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { inputCls } from "./ui";

type Props = {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
};

/** Comma/Enter-separated chip input for tags and tech stacks. */
export function TagInput({ value, onChange, placeholder = "Type and press Enter" }: Props) {
  const [draft, setDraft] = useState("");

  function commit() {
    const t = draft.trim().replace(/,$/, "");
    if (t && !value.includes(t)) onChange([...value, t]);
    setDraft("");
  }

  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {value.map((tag) => (
          <span key={tag} className="inline-flex items-center gap-1 text-xs font-mono px-2 py-1 rounded-full border border-line">
            {tag}
            <button type="button" onClick={() => onChange(value.filter((t) => t !== tag))} aria-label={`Remove ${tag}`}>
              <X size={11} />
            </button>
          </span>
        ))}
      </div>
      <input
        className={inputCls}
        value={draft}
        placeholder={placeholder}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            commit();
          }
        }}
        onBlur={commit}
      />
    </div>
  );
}
