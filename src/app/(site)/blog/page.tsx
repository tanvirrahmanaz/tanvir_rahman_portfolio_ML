import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { FadeIn } from "@/components/fade-in";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata = { title: "Blog — Tanvir Rahman" };

export default async function BlogPage({ searchParams }: { searchParams: { category?: string; tag?: string } }) {
  const where: Record<string, unknown> = { published: true };
  if (searchParams.category) where.category = searchParams.category;
  if (searchParams.tag) where.tags = { has: searchParams.tag };

  const [posts, allPosts] = await Promise.all([
    prisma.blogPost.findMany({ where, orderBy: { createdAt: "desc" } }),
    prisma.blogPost.findMany({ where: { published: true }, select: { category: true } }),
  ]);
  const categories = Array.from(new Set(allPosts.map((p) => p.category)));

  return (
    <div className="max-w-3xl mx-auto px-5 py-16">
      <FadeIn>
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-muted mb-2">Writing</p>
        <h1 className="font-display font-bold tracking-tight text-3xl sm:text-4xl mb-8">Blog</h1>
      </FadeIn>

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          <Link
            href="/blog"
            className={`text-xs px-3 py-1.5 rounded-full border border-line transition-colors ${!searchParams.category ? "bg-ink-950 text-ink-50 dark:bg-ink-50 dark:text-ink-950" : "hover:bg-ink-100 dark:hover:bg-ink-900"}`}
          >
            All
          </Link>
          {categories.map((c) => (
            <Link
              key={c}
              href={`/blog?category=${encodeURIComponent(c)}`}
              className={`text-xs px-3 py-1.5 rounded-full border border-line transition-colors ${searchParams.category === c ? "bg-ink-950 text-ink-50 dark:bg-ink-50 dark:text-ink-950" : "hover:bg-ink-100 dark:hover:bg-ink-900"}`}
            >
              {c}
            </Link>
          ))}
        </div>
      )}

      {posts.length === 0 ? (
        <p className="text-muted">No posts yet — the first one is coming soon.</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post, i) => (
            <FadeIn key={post.id} delay={i * 0.06}>
              <Link href={`/blog/${post.slug}`} className="group block surface rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform">
                {post.coverImage && (
                  <div className="aspect-[21/9] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.coverImage} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </div>
                )}
                <div className="p-6">
                  <p className="font-mono text-xs text-muted">
                    {formatDate(post.createdAt)} · {post.category}
                  </p>
                  <h2 className="font-display font-semibold text-xl mt-2 group-hover:underline underline-offset-4">{post.title}</h2>
                  <p className="text-sm text-muted mt-2 leading-relaxed">{post.excerpt}</p>
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {post.tags.map((t) => (
                        <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded-full border border-line text-muted">#{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
}
