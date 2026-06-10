import { Github, Linkedin, Youtube, Twitter, Facebook, Instagram, Globe, Mail, type LucideIcon } from "lucide-react";
import type { SocialLinkData } from "@/types";

const ICONS: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  youtube: Youtube,
  twitter: Twitter,
  x: Twitter,
  facebook: Facebook,
  instagram: Instagram,
  email: Mail,
};

export function SocialIcons({ links, size = 18 }: { links: SocialLinkData[]; size?: number }) {
  return (
    <div className="flex items-center gap-3">
      {links.map((link) => {
        const Icon = ICONS[link.platform.toLowerCase()] ?? Globe;
        return (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            title={link.label}
            className="w-10 h-10 grid place-items-center rounded-full border border-line hover:bg-ink-950 hover:text-ink-50 dark:hover:bg-ink-50 dark:hover:text-ink-950 transition-colors"
          >
            <Icon size={size} />
          </a>
        );
      })}
    </div>
  );
}
