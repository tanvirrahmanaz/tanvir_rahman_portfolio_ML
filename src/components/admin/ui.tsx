"use client";

import { cn } from "@/lib/utils";

export const inputCls =
  "w-full surface rounded-lg px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ink-950 dark:focus:ring-ink-50 transition-shadow placeholder:text-muted bg-transparent";

export function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium mb-1.5">{label}</span>
      {children}
      {hint && <span className="block text-[11px] text-muted mt-1">{hint}</span>}
    </label>
  );
}

export function Button({
  children,
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "danger" }) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed",
        variant === "primary" && "bg-ink-950 text-ink-50 dark:bg-ink-50 dark:text-ink-950 hover:opacity-85",
        variant === "ghost" && "border border-line surface hover:bg-ink-100 dark:hover:bg-ink-900",
        variant === "danger" && "border border-red-300 dark:border-red-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40",
        className
      )}
    >
      {children}
    </button>
  );
}

export function Toast({ message, error }: { message: string; error?: boolean }) {
  if (!message) return null;
  return (
    <p className={cn("text-sm mt-3", error ? "text-red-600 dark:text-red-400" : "text-green-700 dark:text-green-400")}>
      {message}
    </p>
  );
}
