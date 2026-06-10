import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Markdown } from "@/components/markdown";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await prisma.blogPost.findUnique({ where: { slug: params.slug } });
  if (!post || !post.published) notFound();

  return (
    <article className="max-w-3xl mx-auto px-5 py-16">
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-[rgb(var(--fg))] transition-colors mb-8">
        <ArrowLeft size={14} /> All posts
      </Link>

      <p className="font-mono text-xs text-muted mb-3">
        {formatDate(post.createdAt)} · {post.category}
      </p>
      <h1 className="font-display font-bold tracking-tight text-3xl sm:text-4xl leading-tight">{post.title}</h1>

      {post.coverImage && (
        <div className="mt-8 rounded-2xl overflow-hidden border border-line">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.coverImage} alt="" className="w-full" />
        </div>
      )}

      <div className="mt-10">
        <Markdown content={post.content} />
      </div>

      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-10 pt-8 border-t border-line">
          {post.tags.map((t) => (
            <Link key={t} href={`/blog?tag=${encodeURIComponent(t)}`} className="text-[11px] font-mono px-2 py-0.5 rounded-full border border-line text-muted hover:bg-ink-100 dark:hover:bg-ink-900 transition-colors">
              #{t}
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}
