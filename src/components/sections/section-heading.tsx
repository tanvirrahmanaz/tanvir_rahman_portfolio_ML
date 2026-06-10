import { FadeIn } from "@/components/fade-in";

export function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <FadeIn>
      <p className="font-mono text-xs tracking-[0.25em] uppercase text-muted mb-2">{eyebrow}</p>
      <h2 className="font-display font-semibold tracking-tight text-2xl sm:text-3xl mb-10">{title}</h2>
    </FadeIn>
  );
}
