import { SectionHeading } from "./section-heading";
import { FadeIn } from "@/components/fade-in";
import type { EducationData } from "@/types";

export function EducationSection({ items }: { items: EducationData[] }) {
  if (!items.length) return null;
  return (
    <section className="border-y border-line bg-[rgb(var(--card)/0.5)]">
      <div className="max-w-5xl mx-auto px-5 py-20" id="education">
        <SectionHeading eyebrow="Background" title="Education" />
        <ol className="relative border-l border-line ml-2 space-y-10">
          {items.map((ed, i) => (
            <FadeIn key={ed.id} delay={i * 0.08}>
              <li className="pl-8 relative">
                <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-ink-950 dark:bg-ink-50" />
                <p className="font-mono text-xs text-muted">
                  {ed.startYear} — {ed.endYear}
                </p>
                <h3 className="font-display font-semibold text-lg mt-1">{ed.degree}</h3>
                <p className="text-sm font-medium mt-0.5">
                  {ed.institution}
                  {ed.field && <span className="text-muted"> · {ed.field}</span>}
                </p>
                {ed.description && <p className="text-sm text-muted mt-2 leading-relaxed max-w-2xl">{ed.description}</p>}
              </li>
            </FadeIn>
          ))}
        </ol>
      </div>
    </section>
  );
}
