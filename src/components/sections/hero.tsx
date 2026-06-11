import { FileDown, FileText } from "lucide-react";
import { TypingEffect } from "@/components/typing-effect";
import { SocialIcons } from "@/components/social-icons";
import { FadeIn } from "@/components/fade-in";
import type { ProfileData, SocialLinkData } from "@/types";

export function Hero({ profile, links }: { profile: ProfileData; links: SocialLinkData[] }) {
  const initials = profile.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const isInlineResume = profile.resumeUrl.startsWith("data:");

  return (
    <section className="dot-grid border-b border-line">
      <div className="max-w-5xl mx-auto px-5 py-20 sm:py-28 grid md:grid-cols-[1fr_auto] gap-12 items-center">
        <div>
          <FadeIn>
            <p className="font-mono text-xs tracking-[0.25em] uppercase text-muted mb-4">
              {profile.location} · Open to opportunities
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="font-display font-bold tracking-tight text-4xl sm:text-6xl leading-[1.05]">
              {profile.name}
            </h1>
          </FadeIn>
          <FadeIn delay={0.16}>
            <p className="font-display text-xl sm:text-2xl mt-3 font-medium">{profile.title}</p>
          </FadeIn>
          <FadeIn delay={0.24}>
            <p className="mt-3 text-sm sm:text-base h-6">
              <TypingEffect lines={profile.typingLines} />
            </p>
          </FadeIn>
          <FadeIn delay={0.32}>
            <p className="mt-6 text-muted leading-relaxed max-w-xl">{profile.bio}</p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {profile.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  target={isInlineResume ? undefined : "_blank"}
                  rel={isInlineResume ? undefined : "noopener noreferrer"}
                  download="Tanvir-Rahman-Resume.pdf"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink-950 text-ink-50 dark:bg-ink-50 dark:text-ink-950 text-sm font-medium hover:opacity-85 hover:-translate-y-0.5 transition-all"
                >
                  <FileDown size={15} /> Resume
                </a>
              )}
              {profile.cvUrl && (
                <a
                  href={profile.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-line surface text-sm font-medium hover:-translate-y-0.5 transition-transform"
                >
                  <FileText size={15} /> CV
                </a>
              )}
              <SocialIcons links={links} />
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.2} className="justify-self-center">
          <div className="relative">
            <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-full surface grid place-items-center overflow-hidden">
              {profile.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
              ) : (
                <span className="font-display font-bold text-5xl sm:text-6xl tracking-tight">{initials}</span>
              )}
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-ink-950 text-ink-50 dark:bg-ink-50 dark:text-ink-950 text-[11px] font-mono whitespace-nowrap">
              {profile.heroBadgeText}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
