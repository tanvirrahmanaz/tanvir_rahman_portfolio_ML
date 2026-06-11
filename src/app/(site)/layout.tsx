import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [profile, links] = await Promise.all([
    prisma.profile.findUnique({ where: { id: 1 } }),
    prisma.socialLink.findMany({ orderBy: { order: "asc" } }),
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar resumeUrl={profile?.resumeUrl ?? ""} brandText={profile?.brandText ?? "Tanvir Rahman"} />
      <main className="flex-1">{children}</main>
      <Footer name={profile?.name ?? "Tanvir Rahman"} links={links} />
    </div>
  );
}
