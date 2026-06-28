import { FadeIn } from "@/components/ui/FadeIn";
import { FadeText } from "@/components/ui/FadeText";
import { TechMarquee } from "@/components/ui/TechMarquee";

export function TechStack() {
  return (
    <section id="tech-stack" className="px-15 py-3">
      <FadeIn>
        <p className="mb-3 text-center text-xs font-medium uppercase tracking-[0.18em] text-muted">
          <FadeText>Tools I work with</FadeText>
        </p>
        <div className="flex flex-col gap-3">
          <TechMarquee durationSeconds={35} />
          <TechMarquee reverse durationSeconds={40} />
        </div>
      </FadeIn>
    </section>
  );
}
