import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section id="hero" className="py-24 sm:py-32">
      <Container>
        <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
          Hello
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
          Hero section
        </h1>
        <p className="mt-6 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
          Replace this with your tagline.
        </p>
      </Container>
    </section>
  );
}
