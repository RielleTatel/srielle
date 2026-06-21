import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section id="about" className="py-32">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="About"
            title="A developer and community builder, in equal measure."
          />
        </FadeIn>

        <div className="grid gap-10 sm:grid-cols-12">
          <FadeIn className="sm:col-span-7" delay={0.05}>
            <div className="flex flex-col gap-6 text-base leading-relaxed text-muted sm:text-lg">
              <p>
                I&apos;m a full-stack developer focused on shipping scalable
                software and AI-powered products. My work sits at the
                intersection of clean engineering, thoughtful design, and the
                people the product is built for.
              </p>
              <p>
                Outside of code, I speak at developer events, lead student
                organizations, and represent my community as an ASEAN delegate
                — because the best software is built alongside the people it
                serves.
              </p>
            </div>
          </FadeIn>

          <FadeIn className="sm:col-span-5 sm:col-start-8" delay={0.1}>
            <dl className="flex flex-col gap-6 border-l border-border pl-6">
              <div>
                <dt className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                  Currently
                </dt>
                <dd className="mt-1 text-base text-foreground">
                  Building full-stack &amp; AI products.
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                  Based in
                </dt>
                <dd className="mt-1 text-base text-foreground">Philippines</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                  Open to
                </dt>
                <dd className="mt-1 text-base text-foreground">
                  Collaboration, speaking, and mentorship.
                </dd>
              </div>
            </dl>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
