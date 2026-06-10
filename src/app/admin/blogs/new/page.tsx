import { BlogForm } from "@/components/admin/blog-form";

export default function NewBlogPage() {
  return (
    <div>
      <h1 className="font-display font-semibold text-2xl mb-6">New blog post</h1>
      <BlogForm />
    </div>
  );
}
