import { FadeText } from "@/components/ui/FadeText";

export function StatementHeading() {
  return (
    <section id="statement" className="px-6 py-20 sm:px-10 sm:py-32 lg:px-15">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
          <FadeText>A note</FadeText>
        </p>
        <h2
          className="mt-4 text-foreground"
          style={{
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            fontSize: "clamp(1.75rem, 6vw, 5rem)",
          }}
        >
          <FadeText>Designing with intent.</FadeText>
          <br />
          <span className="text-[#82A079]">
            <FadeText delay={0.2}>Building with purpose.</FadeText>
          </span>
        </h2>
      </div>
    </section>
  );
}
