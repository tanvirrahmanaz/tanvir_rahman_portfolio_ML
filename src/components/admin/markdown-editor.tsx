"use client";

import { useState } from "react";
import { Bold, Italic, Heading2, List, Code, Link2, Image as ImageIcon, Eye, Pencil } from "lucide-react";
import { Markdown } from "@/components/markdown";
import { cn } from "@/lib/utils";

type Props = {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
};

/** Markdown editor with a formatting toolbar and live preview tab. */
export function MarkdownEditor({ value, onChange, rows = 16 }: Props) {
  const [tab, setTab] = useState<"write" | "preview">("write");

  function insert(before: string, after = "") {
    const ta = document.getElementById("md-editor") as HTMLTextAreaElement | null;
    if (!ta) return;
    const { selectionStart: s, selectionEnd: e } = ta;
    const selected = value.slice(s, e) || "text";
    const next = value.slice(0, s) + before + selected + after + value.slice(e);
    onChange(next);
    requestAnimationFrame(() => {
      ta.focus();
      ta.setSelectionRange(s + before.length, s + before.length + selected.length);
    });
  }

  const tools = [
    { icon: Bold, action: () => insert("**", "**"), title: "Bold" },
    { icon: Italic, action: () => insert("*", "*"), title: "Italic" },
    { icon: Heading2, action: () => insert("\n## ", "\n"), title: "Heading" },
    { icon: List, action: () => insert("\n- ", ""), title: "List" },
    { icon: Code, action: () => insert("\n```python\n", "\n```\n"), title: "Code block" },
    { icon: Link2, action: () => insert("[", "](https://)"), title: "Link" },
    { icon: ImageIcon, action: () => insert("![alt](", ")"), title: "Image" },
  ];

  return (
    <div className="surface rounded-xl overflow-hidden">
      <div className="flex items-center justify-between border-b border-line px-2 py-1.5">
        <div className="flex gap-0.5">
          {tools.map(({ icon: Icon, action, title }) => (
            <button
              key={title}
              type="button"
              title={title}
              onClick={action}
              className="w-8 h-8 grid place-items-center rounded-md hover:bg-ink-100 dark:hover:bg-ink-900 transition-colors"
            >
              <Icon size={14} />
            </button>
          ))}
        </div>
        <div className="flex gap-0.5">
          {(["write", "preview"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "px-3 h-8 rounded-md text-xs font-medium inline-flex items-center gap-1.5 transition-colors",
                tab === t ? "bg-ink-950 text-ink-50 dark:bg-ink-50 dark:text-ink-950" : "hover:bg-ink-100 dark:hover:bg-ink-900"
              )}
            >
              {t === "write" ? <Pencil size={12} /> : <Eye size={12} />}
              {t === "write" ? "Write" : "Preview"}
            </button>
          ))}
        </div>
      </div>
      {tab === "write" ? (
        <textarea
          id="md-editor"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder="Write in markdown…"
          className="w-full bg-transparent px-4 py-3 text-sm font-mono outline-none resize-y"
        />
      ) : (
        <div className="px-5 py-4 min-h-[200px]">
          {value ? <Markdown content={value} /> : <p className="text-muted text-sm">Nothing to preview yet.</p>}
        </div>
      )}
    </div>
  );
}
