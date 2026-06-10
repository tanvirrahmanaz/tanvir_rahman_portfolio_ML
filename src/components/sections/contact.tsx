import { Mail } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { ContactForm } from "@/components/contact-form";
import { FadeIn } from "@/components/fade-in";

export function ContactSection({ email }: { email: string }) {
  return (
    <section className="border-t border-line bg-[rgb(var(--card)/0.5)]">
      <div className="max-w-5xl mx-auto px-5 py-20" id="contact">
        <SectionHeading eyebrow="Say hello" title="Get in touch" />
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-10">
          <FadeIn>
            <p className="text-muted leading-relaxed">
              Have a project in mind, a role to discuss, or just want to talk about AI? My inbox is open.
            </p>
            <a href={`mailto:${email}`} className="inline-flex items-center gap-2 mt-5 text-sm font-medium underline underline-offset-4">
              <Mail size={15} /> {email}
            </a>
          </FadeIn>
          <FadeIn delay={0.1}>
            <ContactForm />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
