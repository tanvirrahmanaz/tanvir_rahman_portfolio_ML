import { SocialIcons } from "@/components/social-icons";
import type { SocialLinkData } from "@/types";

export function Footer({ name, links }: { name: string; links: SocialLinkData[] }) {
  return (
    <footer className="border-t border-line mt-24">
      <div className="max-w-5xl mx-auto px-5 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {name}. Built with Next.js.
        </p>
        <SocialIcons links={links} size={16} />
      </div>
    </footer>
  );
}
