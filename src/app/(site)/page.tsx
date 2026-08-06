import { prisma } from "@/lib/prisma";
import { Hero } from "@/components/sections/hero";
import { SkillsSection } from "@/components/sections/skills";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { GithubSection } from "@/components/sections/github";
import { EducationSection } from "@/components/sections/education";
import { CertificationsSection } from "@/components/sections/certifications";
import { ContactSection } from "@/components/sections/contact";
import {
  fallbackCertifications,
  fallbackEducation,
  fallbackProfile,
  fallbackProjects,
  fallbackSkills,
  fallbackSocialLinks,
} from "@/lib/fallback-portfolio";

export const dynamic = "force-dynamic";

async function loadPortfolioData() {
  try {
    const [profile, links, skills, projects, education, certifications] = await Promise.all([
      prisma.profile.findUnique({ where: { id: 1 } }),
      prisma.socialLink.findMany({ orderBy: { order: "asc" } }),
      prisma.skill.findMany({ orderBy: { order: "asc" } }),
      prisma.project.findMany({ where: { featured: true }, orderBy: { order: "asc" }, take: 6 }),
      prisma.education.findMany({ orderBy: { order: "asc" } }),
      prisma.certification.findMany({ orderBy: { order: "asc" } }),
    ]);

    if (!profile) {
      throw new Error("Portfolio profile has not been seeded yet.");
    }

    return {
      profile: JSON.parse(JSON.stringify(profile)),
      links,
      skills,
      projects: JSON.parse(JSON.stringify(projects)),
      education,
      certifications,
    };
  } catch (error) {
    console.error("[portfolio/home] Database unavailable; using fallback data.", error);

    return {
      profile: fallbackProfile,
      links: fallbackSocialLinks,
      skills: fallbackSkills,
      projects: fallbackProjects,
      education: fallbackEducation,
      certifications: fallbackCertifications,
    };
  }
}

export default async function HomePage() {
  const { profile, links, skills, projects, education, certifications } = await loadPortfolioData();

  return (
    <>
      <Hero profile={profile} links={links} />
      <SkillsSection skills={skills} />
      <FeaturedProjects projects={projects} />
      <GithubSection username={profile.githubUsername} />
      <EducationSection items={education} />
      <CertificationsSection items={certifications} />
      <ContactSection email={profile.email} />
    </>
  );
}
