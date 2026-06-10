import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Markdown } from "@/components/markdown";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await prisma.project.findUnique({ where: { slug: params.slug } });
  if (!project) notFound();

  return (
    <article className="max-w-3xl mx-auto px-5 py-16">
      <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-[rgb(var(--fg))] transition-colors mb-8">
        <ArrowLeft size={14} /> All projects
      </Link>

      <p className="font-mono text-xs text-muted mb-3">{formatDate(project.createdAt)}</p>
      <h1 className="font-display font-bold tracking-tight text-3xl sm:text-4xl">{project.title}</h1>
      <p className="text-muted mt-3 leading-relaxed">{project.summary}</p>

      <div className="flex flex-wrap items-center gap-4 mt-6">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-ink-950 text-ink-50 dark:bg-ink-50 dark:text-ink-950 text-sm font-medium hover:opacity-85 transition-opacity">
            Live demo <ArrowUpRight size={14} />
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-line surface text-sm font-medium hover:-translate-y-0.5 transition-transform">
            <Github size={14} /> Source code
          </a>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 mt-6">
        {project.techStack.map((t) => (
          <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded-full border border-line text-muted">{t}</span>
        ))}
      </div>

      {project.imageUrl && (
        <div className="mt-10 rounded-2xl overflow-hidden border border-line">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.imageUrl} alt={project.title} className="w-full" />
        </div>
      )}

      {project.content && (
        <div className="mt-10">
          <Markdown content={project.content} />
        </div>
      )}
    </article>
  );
}
