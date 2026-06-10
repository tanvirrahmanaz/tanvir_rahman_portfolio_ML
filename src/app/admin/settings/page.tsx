"use client";

import { useState } from "react";
import { KeyRound } from "lucide-react";
import { inputCls, Field, Button, Toast } from "@/components/admin/ui";

export default function SettingsPage() {
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (fd.get("newPassword") !== fd.get("confirm")) {
      setError(true);
      setMsg("New passwords don't match.");
      return;
    }
    setSaving(true);
    setMsg("");
    const res = await fetch("/api/settings/password", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentPassword: fd.get("currentPassword"),
        newPassword: fd.get("newPassword"),
      }),
    });
    const j = await res.json().catch(() => ({}));
    setSaving(false);
    setError(!res.ok);
    setMsg(res.ok ? "Password updated." : j.error || "Update failed.");
    if (res.ok) form.reset();
  }

  return (
    <div>
      <h1 className="font-display font-semibold text-2xl mb-6">Settings</h1>
      <form onSubmit={handleSubmit} className="surface rounded-2xl p-6 max-w-md space-y-4">
        <div className="flex items-center gap-2 font-display font-semibold">
          <KeyRound size={16} /> Change password
        </div>
        <Field label="Current password">
          <input name="currentPassword" type="password" required className={inputCls} />
        </Field>
        <Field label="New password" hint="At least 8 characters.">
          <input name="newPassword" type="password" required minLength={8} className={inputCls} />
        </Field>
        <Field label="Confirm new password">
          <input name="confirm" type="password" required className={inputCls} />
        </Field>
        <Button type="submit" disabled={saving}>{saving ? "Updating…" : "Update password"}</Button>
        <Toast message={msg} error={error} />
      </form>
    </div>
  );
}
