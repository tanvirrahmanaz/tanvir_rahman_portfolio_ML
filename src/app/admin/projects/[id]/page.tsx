import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProjectForm } from "@/components/admin/project-form";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const project = await prisma.project.findUnique({ where: { id: params.id } });
  if (!project) notFound();
  return (
    <div>
      <h1 className="font-display font-semibold text-2xl mb-6">Edit project</h1>
      <ProjectForm initial={JSON.parse(JSON.stringify(project))} />
    </div>
  );
}
