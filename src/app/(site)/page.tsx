import { prisma } from "@/lib/prisma";
import { Hero } from "@/components/sections/hero";
import { SkillsSection } from "@/components/sections/skills";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { GithubSection } from "@/components/sections/github";
import { EducationSection } from "@/components/sections/education";
import { CertificationsSection } from "@/components/sections/certifications";
import { ContactSection } from "@/components/sections/contact";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [profile, links, skills, projects, education, certifications] = await Promise.all([
    prisma.profile.findUnique({ where: { id: 1 } }),
    prisma.socialLink.findMany({ orderBy: { order: "asc" } }),
    prisma.skill.findMany({ orderBy: { order: "asc" } }),
    prisma.project.findMany({ where: { featured: true }, orderBy: { order: "asc" }, take: 6 }),
    prisma.education.findMany({ orderBy: { order: "asc" } }),
    prisma.certification.findMany({ orderBy: { order: "asc" } }),
  ]);

  if (!profile) return null;

  return (
    <>
      <Hero profile={JSON.parse(JSON.stringify(profile))} links={links} />
      <SkillsSection skills={skills} />
      <FeaturedProjects projects={JSON.parse(JSON.stringify(projects))} />
      <GithubSection username={profile.githubUsername} />
      <EducationSection items={education} />
      <CertificationsSection items={certifications} />
      <ContactSection email={profile.email} />
    </>
  );
}
