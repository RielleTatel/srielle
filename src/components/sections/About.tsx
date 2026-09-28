import Image from "next/image";

type AboutStory = {
  theme: string;
  title: string;
  position: string;
  organization: string;
  description: string;
  image: { src: string; alt: string; position?: string };
  caption: string;
};

const stories: AboutStory[] = [
  {
    theme: "Community leadership",
    title: "Building developer communities",
    position: "President",
    organization: "Google Developer Groups on Campus, Ateneo de Zamboanga University (2024–2025)",
    description:
      "I led a 60+ member technology community through hackathons, AI workshops, and developer programs. I also spearheaded BlueCode: Zamboanga Hackathon 2025, the first citywide hackathon in Zamboanga after the pandemic, helping revive the local tech community.",
    image: {
      src: "/aboutSection/blueCode.jpg",
      alt: "Participants and organizers at BlueCode: Zamboanga Hackathon 2025",
    },
    caption: "BlueCode: Zamboanga Hackathon 2025",
  },
  {
    theme: "Entrepreneurship",
    title: "Starting Anyam",
    position: "Lead Founder",
    organization: "Anyam (2025–Present)",
    description:
      "I founded Anyam to help underrepresented destinations tell their stories through technology. The team won the regional championship and later became a national winning team in the CHED Tourism Startup Challenge, securing ₱250,000 in implementation funding.",
    image: {
      src: "/awards/awards2.jpg",
      alt: "The Anyam team receiving recognition at the Tourism Startup Challenge",
    },
    caption: "Anyam at the Tourism Startup Challenge",
  },
  {
    theme: "Debate and advocacy",
    title: "Making a case for ideas",
    position: "Competitive Debater",
    organization: "Ateneo Debate Union",
    description:
      "I represented Ateneo de Zamboanga University in regional and national British Parliamentary debate tournaments. Debate sharpened how I analyze a problem, listen under pressure, and make a clear case. I was recognized as a National Breaking Debater at the 36th National Debate Championship.",
    image: {
      src: "/debate/debate2.jpeg",
      alt: "Gabrielle speaking at a debate event",
      position: "center 40%",
    },
    caption: "Speaking with the Ateneo Debate Union",
  },
  {
    theme: "Technology education",
    title: "Sharing what I learn",
    position: "Technical Speaker and Community Volunteer",
    organization: "GDG on Campus, GDG Zamboanga, and community events",
    description:
      "I speak at community technology events, including Build with AI and BuildLabs, to share practical ideas about AI and software development. These sessions are a way to make technical topics more approachable and help more people start building.",
    image: {
      src: "/speaker/speaker2.jpeg",
      alt: "Gabrielle speaking during a Build with AI community event",
      position: "center 42%",
    },
    caption: "Build with AI in Zamboanga",
  },
];

export function About() {
  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-20 pt-10 sm:px-10 sm:pt-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-stretch lg:gap-16 lg:px-15 lg:pb-28 lg:pt-20">
        <div className="flex flex-col justify-between py-2 lg:py-8">
          <div>
            <p className="mb-8 text-sm font-medium text-accent">Gabrielle Tatel · Zamboanga City</p>
            <h1 className="max-w-2xl text-[clamp(4rem,8.5vw,8.5rem)] font-bold leading-[0.88] tracking-[-0.07em] text-foreground">
              About me<span className="text-accent">.</span>
            </h1>
          </div>
          <div className="mt-14 max-w-xl border-t border-border pt-7 lg:mt-10">
            <p className="text-[clamp(1.5rem,2.6vw,2.25rem)] font-medium leading-tight tracking-[-0.035em] text-foreground">
              I build products and the communities around them.
            </p>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
              I&apos;m a full-stack developer whose work also moves through student leadership, entrepreneurship, debate, and technology education. Each part shapes how I solve problems and work with people.
            </p>
          </div>
        </div>

        <figure className="relative min-h-[420px] overflow-hidden rounded-[2rem] bg-[#181714] sm:min-h-[560px] lg:min-h-[680px]">
          <Image
            src="/contact/portrait.png"
            alt="Portrait of Gabrielle Tatel"
            fill
            priority
            sizes="(min-width: 1024px) 520px, (min-width: 640px) 80vw, 100vw"
            className="object-cover object-[center_30%]"
          />
        </figure>
      </section>

      <section id="about-stories" className="border-t border-border bg-background/80">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-16 sm:px-10 lg:px-15 lg:pb-28 lg:pt-24">
          <header className="mb-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.6fr)] lg:items-end lg:gap-12">
            <h2 className="max-w-2xl text-[clamp(2.75rem,5vw,5rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-foreground">
              Beyond the code.
            </h2>
            <p className="max-w-md text-base leading-relaxed text-muted sm:text-lg">
              The experiences that shape how I lead, think, and share what I know.
            </p>
          </header>

          <div>
            {stories.map((story, index) => (
              <article
                key={story.theme}
                className="grid gap-8 border-t border-border py-12 sm:py-16 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-center lg:gap-16 lg:py-20"
              >
                <figure className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-foreground/[0.05]">
                    <Image
                      src={story.image.src}
                      alt={story.image.alt}
                      fill
                      sizes="(min-width: 1024px) 560px, 100vw"
                      className="object-cover"
                      style={{ objectPosition: story.image.position ?? "center" }}
                    />
                  </div>
                  <figcaption className="mt-3 text-sm text-muted">
                    {story.caption}
                  </figcaption>
                </figure>

                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <p className="mb-4 text-sm font-medium text-accent">{story.theme}</p>
                  <h3 className="max-w-xl text-[clamp(2.1rem,4vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.05em] text-foreground">
                    {story.title}
                  </h3>
                  <div className="mt-7 border-l-2 border-accent pl-4">
                    <p className="font-medium text-foreground">{story.position}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{story.organization}</p>
                  </div>
                  <p className="mt-7 max-w-xl text-base leading-relaxed text-foreground/85 sm:text-lg">
                    {story.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
