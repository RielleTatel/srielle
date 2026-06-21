import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section id="projects" className="py-32">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Selected Work"
            title="Projects."
            description="A short list of things I've shipped — from full-stack products to community platforms."
          />
        </FadeIn>

        <ul className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, index) => (
            <FadeIn key={project.slug} delay={index * 0.08}>
              <li className="group flex h-full flex-col justify-between gap-10 rounded-2xl border border-border bg-background/60 p-8 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-foreground/20">
                <div className="flex flex-col gap-3">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-xl font-semibold tracking-tight text-foreground">
                      {project.title}
                    </h3>
                    <span className="text-xs text-muted">{project.year}</span>
                  </div>
                  <p className="text-base leading-relaxed text-muted">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-3 py-1 text-xs text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </li>
            </FadeIn>
          ))}
        </ul>
      </Container>
    </section>
  );
}
