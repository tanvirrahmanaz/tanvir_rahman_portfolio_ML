"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./section-heading";
import { FadeIn } from "@/components/fade-in";
import type { SkillData } from "@/types";

export function SkillsSection({ skills }: { skills: SkillData[] }) {
  if (!skills.length) return null;
  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <section className="max-w-5xl mx-auto px-5 py-20" id="skills">
      <SectionHeading eyebrow="Toolkit" title="Skills & technologies" />
      <div className="space-y-8">
        {categories.map((cat) => (
          <FadeIn key={cat}>
            <h3 className="font-mono text-xs text-muted uppercase tracking-widest mb-3">{cat}</h3>
            <div className="flex flex-wrap gap-3">
              {skills
                .filter((s) => s.category === cat)
                .map((skill) => (
                  <motion.div
                    key={skill.id}
                    whileHover={{ y: -3, scale: 1.02 }}
                    className="surface rounded-xl px-4 py-2.5 flex items-center gap-2.5 text-sm font-medium"
                  >
                    {skill.logoUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={skill.logoUrl} alt="" className="w-5 h-5 object-contain" />
                    )}
                    {skill.name}
                  </motion.div>
                ))}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
