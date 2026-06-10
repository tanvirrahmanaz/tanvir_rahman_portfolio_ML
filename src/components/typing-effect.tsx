"use client";

import { useEffect, useState } from "react";

export function TypingEffect({ lines }: { lines: string[] }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!lines.length) return;
    const current = lines[lineIndex % lines.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && text === "") {
      setDeleting(false);
      setLineIndex((i) => (i + 1) % lines.length);
    } else {
      timeout = setTimeout(
        () => setText(current.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? 35 : 70
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, lineIndex, lines]);

  return (
    <span className="font-mono text-muted">
      {text}
      <span className="inline-block w-[2px] h-[1.1em] bg-current align-middle ml-0.5 animate-blink" />
    </span>
  );
}
