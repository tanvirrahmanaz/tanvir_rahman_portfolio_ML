"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard, User, Wrench, FolderKanban, PenSquare,
  GraduationCap, Award, Inbox, Settings, LogOut, ExternalLink, Menu, X,
} from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/profile", label: "Profile & Socials", icon: User },
  { href: "/admin/skills", label: "Skills", icon: Wrench },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/blogs", label: "Blog", icon: PenSquare },
  { href: "/admin/education", label: "Education", icon: GraduationCap },
  { href: "/admin/certifications", label: "Certifications", icon: Award },
  { href: "/admin/messages", label: "Messages", icon: Inbox },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Login page renders without the shell
  if (pathname === "/admin/login") return <>{children}</>;

  const nav = (
    <nav className="flex flex-col gap-1 p-3">
      {NAV.map(({ href, label, icon: Icon }) => {
        const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors",
              active
                ? "bg-ink-950 text-ink-50 dark:bg-ink-50 dark:text-ink-950 font-medium"
                : "text-muted hover:text-[rgb(var(--fg))] hover:bg-ink-100 dark:hover:bg-ink-900"
            )}
          >
            <Icon size={16} /> {label}
          </Link>
        );
      })}
      <div className="border-t border-line mt-2 pt-2 flex flex-col gap-1">
        <Link href="/" target="_blank" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted hover:text-[rgb(var(--fg))] hover:bg-ink-100 dark:hover:bg-ink-900 transition-colors">
          <ExternalLink size={16} /> View site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-muted hover:text-[rgb(var(--fg))] hover:bg-ink-100 dark:hover:bg-ink-900 transition-colors text-left"
        >
          <LogOut size={16} /> Sign out
        </button>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen md:grid md:grid-cols-[230px_1fr]">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col border-r border-line sticky top-0 h-screen">
        <div className="px-5 h-16 flex items-center justify-between border-b border-line">
          <span className="font-display font-semibold">admin<span className="text-muted">.panel</span></span>
          <ThemeToggle />
        </div>
        {nav}
      </aside>

      {/* Mobile header */}
      <div className="md:hidden border-b border-line h-14 flex items-center justify-between px-4 sticky top-0 bg-[rgb(var(--bg))] z-40">
        <span className="font-display font-semibold">admin<span className="text-muted">.panel</span></span>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button onClick={() => setOpen(!open)} aria-label="Menu" className="w-9 h-9 grid place-items-center">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && <div className="md:hidden border-b border-line bg-[rgb(var(--bg))]">{nav}</div>}

      <main className="p-5 sm:p-8 max-w-4xl w-full">{children}</main>
    </div>
  );
}
