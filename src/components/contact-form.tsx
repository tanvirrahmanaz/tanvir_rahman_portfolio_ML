"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setStatus("sent");
      form.reset();
    } else {
      setStatus("error");
    }
  }

  const inputCls =
    "w-full surface rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ink-950 dark:focus:ring-ink-50 transition-shadow placeholder:text-muted bg-transparent";

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 max-w-xl">
      <div className="grid sm:grid-cols-2 gap-4">
        <input name="name" required placeholder="Your name" className={inputCls} />
        <input name="email" type="email" required placeholder="Your email" className={inputCls} />
      </div>
      <input name="subject" placeholder="Subject (optional)" className={inputCls} />
      <textarea name="body" required placeholder="Your message…" rows={5} className={inputCls} />
      <button
        type="submit"
        disabled={status === "sending"}
        className="justify-self-start inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink-950 text-ink-50 dark:bg-ink-50 dark:text-ink-950 text-sm font-medium hover:opacity-85 transition-opacity disabled:opacity-50"
      >
        <Send size={14} />
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {status === "sent" && <p className="text-sm">Message sent — I&apos;ll get back to you soon.</p>}
      {status === "error" && <p className="text-sm">Something went wrong. Try again or email me directly.</p>}
    </form>
  );
}
