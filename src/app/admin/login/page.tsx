"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { inputCls, Field, Button, Toast } from "@/components/admin/ui";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      email: fd.get("email"),
      password: fd.get("password"),
      redirect: false,
    });
    setLoading(false);
    if (res?.error) setError("Wrong email or password.");
    else router.push("/admin");
  }

  return (
    <div className="min-h-screen grid place-items-center px-5 dot-grid">
      <form onSubmit={handleSubmit} className="surface rounded-2xl p-8 w-full max-w-sm space-y-4">
        <div className="w-11 h-11 rounded-xl bg-ink-950 text-ink-50 dark:bg-ink-50 dark:text-ink-950 grid place-items-center">
          <Lock size={18} />
        </div>
        <div>
          <h1 className="font-display font-semibold text-xl">Admin login</h1>
          <p className="text-sm text-muted mt-1">Sign in to manage your portfolio.</p>
        </div>
        <Field label="Email">
          <input name="email" type="email" required className={inputCls} placeholder="you@example.com" />
        </Field>
        <Field label="Password">
          <input name="password" type="password" required className={inputCls} placeholder="••••••••" />
        </Field>
        <Button type="submit" disabled={loading} className="w-full justify-center">
          {loading ? "Signing in…" : "Sign in"}
        </Button>
        <Toast message={error} error />
      </form>
    </div>
  );
}
