import { ProjectForm } from "@/components/admin/project-form";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="font-display font-semibold text-2xl mb-6">New project</h1>
      <ProjectForm />
    </div>
  );
}
