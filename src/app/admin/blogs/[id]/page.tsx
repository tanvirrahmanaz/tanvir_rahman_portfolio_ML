import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BlogForm } from "@/components/admin/blog-form";

export const dynamic = "force-dynamic";

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  const post = await prisma.blogPost.findUnique({ where: { id: params.id } });
  if (!post) notFound();
  return (
    <div>
      <h1 className="font-display font-semibold text-2xl mb-6">Edit post</h1>
      <BlogForm initial={JSON.parse(JSON.stringify(post))} />
    </div>
  );
}
