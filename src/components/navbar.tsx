"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, FileDown } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar({ resumeUrl, brandText }: { resumeUrl: string; brandText: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isInlineResume = resumeUrl.startsWith("data:");

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[rgb(var(--bg)/0.8)] border-b border-line">
      <nav className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link href="/" className="font-display font-semibold tracking-tight text-lg">
          {brandText}
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-sm transition-colors hover:opacity-100",
                pathname === l.href ? "font-medium" : "text-muted hover:text-[rgb(var(--fg))]"
              )}
            >
              {l.label}
            </Link>
          ))}
          {resumeUrl && (
            <a
              href={resumeUrl}
              target={isInlineResume ? undefined : "_blank"}
              rel={isInlineResume ? undefined : "noopener noreferrer"}
              download="Tanvir-Rahman-Resume.pdf"
              className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-full bg-ink-950 text-ink-50 dark:bg-ink-50 dark:text-ink-950 hover:opacity-85 transition-opacity"
            >
              <FileDown size={14} /> Resume
            </a>
          )}
          <ThemeToggle />
        </div>

        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button aria-label="Menu" onClick={() => setOpen(!open)} className="w-9 h-9 grid place-items-center">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-line px-5 py-4 flex flex-col gap-4 bg-[rgb(var(--bg))]">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm">
              {l.label}
            </Link>
          ))}
          {resumeUrl && (
            <a
              href={resumeUrl}
              target={isInlineResume ? undefined : "_blank"}
              rel={isInlineResume ? undefined : "noopener noreferrer"}
              download="Tanvir-Rahman-Resume.pdf"
              className="text-sm inline-flex items-center gap-1.5"
            >
              <FileDown size={14} /> Resume
            </a>
          )}
        </div>
      )}
    </header>
  );
}
