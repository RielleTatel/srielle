import NoirFlow from "@/components/NoirFlow";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";

const METRICS = [
  { value: "3+", label: "Years Building Software" },
  { value: "Build with AI", label: "Speaker" },
  { value: "Student", label: "Leader" },
  { value: "ASEAN", label: "Delegate" },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden py-24"
    >
      <div className="absolute inset-0">
        <NoirFlow speed={0.5} />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col items-start gap-10">
          <FadeIn immediate delay={0.05}>
            <h1
              className="text-foreground"
              style={{
                fontWeight: 700,
                letterSpacing: "-0.06em",
                lineHeight: 0.95,
                fontSize: "clamp(4rem, 10vw, 8rem)",
              }}
            >
              Building software,
              <br />
              communities,
              <br />
              and opportunities.
            </h1>
          </FadeIn>

          <FadeIn immediate delay={0.4} className="w-full">
            <dl className="mt-12 grid w-full grid-cols-2 gap-x-8 gap-y-10 border-t border-border pt-10 sm:grid-cols-4">
              {METRICS.map((metric) => (
                <div key={metric.label} className="flex flex-col gap-1">
                  <dt className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    {metric.value}
                  </dt>
                  <dd className="text-sm text-muted">{metric.label}</dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
