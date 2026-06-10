import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { ProjectCard } from "@/components/project-card";
import { FadeIn } from "@/components/fade-in";
import type { ProjectData } from "@/types";

export function FeaturedProjects({ projects }: { projects: ProjectData[] }) {
  if (!projects.length) return null;
  return (
    <section className="border-y border-line bg-[rgb(var(--card)/0.5)]">
      <div className="max-w-5xl mx-auto px-5 py-20" id="projects">
        <SectionHeading eyebrow="Selected work" title="Featured projects" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.08}>
              <ProjectCard project={p} />
            </FadeIn>
          ))}
        </div>
        <FadeIn className="mt-10">
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all underline-offset-4 hover:underline">
            View all projects <ArrowRight size={15} />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
