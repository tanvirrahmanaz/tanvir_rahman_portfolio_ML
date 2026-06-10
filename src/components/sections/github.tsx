import { SectionHeading } from "./section-heading";
import { FadeIn } from "@/components/fade-in";

export function GithubSection({ username }: { username: string }) {
  if (!username) return null;
  return (
    <section className="max-w-5xl mx-auto px-5 py-20" id="github">
      <SectionHeading eyebrow="Open source" title="GitHub activity" />
      <div className="grid gap-5">
        <FadeIn>
          <div className="surface rounded-2xl p-4 sm:p-6 overflow-x-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://ghchart.rshah.org/22c55e/${username}`}
              alt={`${username}'s GitHub contribution graph`}
              className="w-full min-w-[640px]"
            />
          </div>
        </FadeIn>
        <div className="grid sm:grid-cols-2 gap-5">
          <FadeIn delay={0.08}>
            <div className="surface rounded-2xl p-4 grid place-items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=default&hide_border=true&background=00000000`}
                alt="GitHub streak"
                className="w-full max-w-md"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.16}>
            <div className="surface rounded-2xl p-4 grid place-items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&hide_border=true&bg_color=00000000&icon_color=22c55e`}
                alt="GitHub stats"
                className="w-full max-w-md"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
