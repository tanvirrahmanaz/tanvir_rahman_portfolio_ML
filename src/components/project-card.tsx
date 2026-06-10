"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import type { ProjectData } from "@/types";

export function ProjectCard({ project }: { project: ProjectData }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="surface rounded-2xl overflow-hidden flex flex-col group"
    >
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="aspect-[16/9] overflow-hidden bg-ink-100 dark:bg-ink-900">
          {project.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-500"
            />
          ) : (
            <div className="w-full h-full grid place-items-center font-mono text-muted text-sm">
              {project.title}
            </div>
          )}
        </div>
      </Link>
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/projects/${project.slug}`}>
            <h3 className="font-display font-semibold text-lg leading-snug hover:underline underline-offset-4">
              {project.title}
            </h3>
          </Link>
          <ArrowUpRight size={18} className="shrink-0 text-muted group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
        <p className="text-sm text-muted leading-relaxed flex-1">{project.summary}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((t) => (
            <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded-full border border-line text-muted">
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4 pt-1 text-sm">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline underline-offset-4">
              Live <ArrowUpRight size={13} />
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-muted hover:text-[rgb(var(--fg))] transition-colors">
              <Github size={14} /> Code
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
