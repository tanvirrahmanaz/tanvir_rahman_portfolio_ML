import { prisma } from "@/lib/prisma";
import { ProjectCard } from "@/components/project-card";
import { FadeIn } from "@/components/fade-in";

export const dynamic = "force-dynamic";

export const metadata = { title: "Projects — Tanvir Rahman" };

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: [{ order: "asc" }, { createdAt: "desc" }] });

  return (
    <div className="max-w-5xl mx-auto px-5 py-16">
      <FadeIn>
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-muted mb-2">Archive</p>
        <h1 className="font-display font-bold tracking-tight text-3xl sm:text-4xl mb-12">All projects</h1>
      </FadeIn>
      {projects.length === 0 ? (
        <p className="text-muted">No projects yet — check back soon.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <FadeIn key={p.id} delay={(i % 3) * 0.08}>
              <ProjectCard project={JSON.parse(JSON.stringify(p))} />
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
}
