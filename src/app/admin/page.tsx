import Link from "next/link";
import { FolderKanban, PenSquare, Wrench, Inbox } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [projects, posts, skills, unread] = await Promise.all([
    prisma.project.count(),
    prisma.blogPost.count(),
    prisma.skill.count(),
    prisma.message.count({ where: { read: false } }),
  ]);

  const cards = [
    { label: "Projects", value: projects, icon: FolderKanban, href: "/admin/projects" },
    { label: "Blog posts", value: posts, icon: PenSquare, href: "/admin/blogs" },
    { label: "Skills", value: skills, icon: Wrench, href: "/admin/skills" },
    { label: "Unread messages", value: unread, icon: Inbox, href: "/admin/messages" },
  ];

  return (
    <div>
      <h1 className="font-display font-semibold text-2xl mb-1">Dashboard</h1>
      <p className="text-sm text-muted mb-8">Everything on your site is editable from here.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ label, value, icon: Icon, href }) => (
          <Link key={label} href={href} className="surface rounded-2xl p-5 hover:-translate-y-1 transition-transform">
            <Icon size={18} className="text-muted" />
            <p className="font-display font-bold text-3xl mt-3">{value}</p>
            <p className="text-sm text-muted mt-0.5">{label}</p>
          </Link>
        ))}
      </div>
      <div className="surface rounded-2xl p-5 mt-6">
        <h2 className="font-display font-semibold mb-2">Quick actions</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/admin/projects/new" className="underline underline-offset-4">Add a project</Link>
          <Link href="/admin/blogs/new" className="underline underline-offset-4">Write a blog post</Link>
          <Link href="/admin/profile" className="underline underline-offset-4">Edit profile</Link>
        </div>
      </div>
    </div>
  );
}
