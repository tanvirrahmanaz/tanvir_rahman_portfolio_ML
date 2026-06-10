"use client";

import { useEffect, useState } from "react";
import { Trash2, MailOpen, Mail } from "lucide-react";
import { Button } from "@/components/admin/ui";
import { formatDate, cn } from "@/lib/utils";
import type { MessageData } from "@/types";

export default function MessagesAdminPage() {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/messages").then((r) => r.json()).then((d) => { setMessages(d); setLoading(false); });
  }, []);

  async function toggleRead(m: MessageData) {
    const next = { ...m, read: !m.read };
    setMessages(messages.map((x) => (x.id === m.id ? next : x)));
    await fetch(`/api/messages/${m.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: next.read }),
    });
  }

  async function remove(id: string) {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/messages/${id}`, { method: "DELETE" });
    setMessages(messages.filter((m) => m.id !== id));
  }

  if (loading) return <p className="text-sm text-muted">Loading…</p>;

  return (
    <div>
      <h1 className="font-display font-semibold text-2xl mb-6">Messages</h1>
      <div className="space-y-3">
        {messages.map((m) => (
          <div key={m.id} className={cn("surface rounded-xl p-4", !m.read && "ring-1 ring-ink-950 dark:ring-ink-50")}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">
                  {m.name} <a href={`mailto:${m.email}`} className="text-muted text-sm underline underline-offset-4 ml-1">{m.email}</a>
                </p>
                {m.subject && <p className="text-sm font-medium mt-1">{m.subject}</p>}
                <p className="text-xs text-muted mt-0.5">{formatDate(m.createdAt)}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="ghost" onClick={() => toggleRead(m)} title={m.read ? "Mark unread" : "Mark read"}>
                  {m.read ? <Mail size={14} /> : <MailOpen size={14} />}
                </Button>
                <Button variant="danger" onClick={() => remove(m.id)} aria-label="Delete message"><Trash2 size={14} /></Button>
              </div>
            </div>
            <p className="text-sm mt-3 whitespace-pre-wrap leading-relaxed">{m.body}</p>
          </div>
        ))}
        {messages.length === 0 && <p className="text-sm text-muted">Your inbox is empty.</p>}
      </div>
    </div>
  );
}
