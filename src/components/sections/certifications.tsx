import { Award, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { FadeIn } from "@/components/fade-in";
import type { CertificationData } from "@/types";

export function CertificationsSection({ items }: { items: CertificationData[] }) {
  if (!items.length) return null;
  return (
    <section className="max-w-5xl mx-auto px-5 py-20" id="certifications">
      <SectionHeading eyebrow="Credentials" title="Certifications" />
      <div className="grid sm:grid-cols-2 gap-5">
        {items.map((c, i) => (
          <FadeIn key={c.id} delay={i * 0.06}>
            <div className="surface rounded-2xl p-5 flex gap-4 items-start hover:-translate-y-1 transition-transform">
              <div className="w-11 h-11 rounded-xl border border-line grid place-items-center shrink-0 overflow-hidden">
                {c.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.imageUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  <Award size={18} />
                )}
              </div>
              <div className="min-w-0">
                <h3 className="font-display font-semibold leading-snug">{c.title}</h3>
                <p className="text-sm text-muted mt-0.5">
                  {c.issuer}
                  {c.date && ` · ${c.date}`}
                </p>
                {c.credentialUrl && (
                  <a
                    href={c.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs mt-2 underline underline-offset-4"
                  >
                    View credential <ArrowUpRight size={12} />
                  </a>
                )}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
