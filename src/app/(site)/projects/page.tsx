import { prisma } from "@/lib/prisma";
import { ProjectCard } from "@/components/project-card";
import { FadeIn } from "@/components/fade-in";
import { fallbackProjects } from "@/lib/fallback-portfolio";
import type { ProjectData } from "@/types";

export const dynamic = "force-dynamic";

export const metadata = { title: "Projects — Tanvir Rahman" };

async function loadProjects(): Promise<ProjectData[]> {
  try {
    const projects = await prisma.project.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    if (projects.length === 0) {
      return fallbackProjects;
    }

    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    console.error("[portfolio/projects] Database unavailable; using fallback data.", error);
    return fallbackProjects;
  }
}

export default async function ProjectsPage() {
  const projects = await loadProjects();

  return (
    <div className="max-w-5xl mx-auto px-5 py-16">
      <FadeIn>
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-muted mb-2">Archive</p>
        <h1 className="font-display font-bold tracking-tight text-3xl sm:text-4xl mb-12">All projects</h1>
      </FadeIn>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project, index) => (
          <FadeIn key={project.id} delay={(index % 3) * 0.08}>
            <ProjectCard project={project} />
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
