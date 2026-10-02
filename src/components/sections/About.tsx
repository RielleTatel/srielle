import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";

const experience = [
  {
    year: "2026",
    title: "System Developer",
    organization: "CITS, Ateneo de Zamboanga University",
    period: "July 2026 - Present",
    description:
      "Selected for the CITS ALP program to develop production software for AdZU. I'm building a thesis inventory system that centralizes 500+ records, with approval workflows and faculty teaching load scheduling.",
  },
  {
    year: "2026",
    title: "Founder & Full-Stack Developer",
    organization: "Debately",
    period: "April 2026",
    description:
      "I built a free-to-use debate tournament platform for registration, participant management, finance tracking, and event operations. It supports 80+ teams and 240+ participants, with a configurable three-phase registration sync system.",
  },
  {
    year: "2024-25",
    title: "President",
    organization: "GDG on Campus Blue Eagle",
    period: "Academic year 2024-2025",
    description:
      "I led a 60+ member developer community and coordinated 30 officers. Alongside BlueCode, I organized hackathon preparation, AI workshops, and digital literacy initiatives including Ready, Set, Hack!, AIEnhance, and ClickStart.",
  },
  {
    year: "2024-25",
    title: "Internal Vice-President",
    organization: "Ateneo Informatics Computing Guild",
    period: "Academic year 2024-2025",
    description:
      "I managed internal operations for an academic organization serving 300+ students in computing and new media programs, improving coordination, governance, and internal communications.",
  },
];

const affiliations = [
  { name: "GDG on Campus Blue Eagle", role: "Member, former President" },
  { name: "Ateneo Informatics Computing Guild", role: "Member, former Internal Vice-President" },
  { name: "Ateneo Debate Union", role: "Member" },
  { name: "Rotaract Club of Zamboanga City West", role: "Member" },
  { name: "El Consejo Atenista Judicial Council", role: "Senior Associate Justice" },
];

export function About() {
  return (
    <>
      <section id="about-intro" className="about-intro" aria-labelledby="about-name">
        <figure className="about-portrait">
          <Image
            src="/aboutSection/portrait-monochrome.webp"
            alt="Portrait of Gabrielle Tatel"
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 1280px) 316px, (min-width: 768px) 301px, 218px"
            className="object-contain object-bottom"
          />
        </figure>
        <div className="about-intro-copy">
          <h1 id="about-name">Gabrielle Tatel</h1>
          <p>I&apos;m a full-stack developer building products and the communities around them.</p>
          <div className="about-intro-links">
            <Link href="/#projects" className="about-link">
              View projects <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden />
            </Link>
            <Link href="/#contact" className="about-link">
              Get in touch <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <dl className="about-highlights" aria-label="Community and startup highlights">
        <div><dt>Community members</dt><dd>60+</dd></div>
        <div><dt>Hackathon participants</dt><dd>100+</dd></div>
        <div><dt>Startup funding</dt><dd>₱250k</dd></div>
      </dl>

      <section id="about-stories" className="about-section" aria-labelledby="about-stories-title">
        <header className="about-section-heading">
          <h2 id="about-stories-title">Beyond the code.</h2>
        </header>
        <p className="about-overview">
          My work also moves through student leadership, entrepreneurship, debate, and technology education. Each part shapes how I solve problems and work with people.
        </p>
        <div id="community" className="about-story-grid">
          <article>
            <figure>
              <div className="about-story-image">
                <Image
                  src="/aboutSection/blueCode.jpg"
                  alt="Participants and organizers at BlueCode: Zamboanga Hackathon 2025"
                  fill
                  sizes="(min-width: 1280px) 480px, (min-width: 768px) 42vw, calc(100vw - 48px)"
                  className="object-cover"
                />
              </div>
              <figcaption>BlueCode: Zamboanga Hackathon 2025</figcaption>
            </figure>
            <h3>Building developer communities</h3>
            <p className="about-role">President, GDG on Campus Blue Eagle</p>
            <p className="about-period">2024-2025</p>
            <p className="about-story-body">
              I led a 60+ member technology community through hackathons, AI workshops, and developer programs. I also spearheaded BlueCode: Zamboanga Hackathon 2025, bringing together 100+ participants and helping revive the local tech community after the pandemic.
            </p>
          </article>
          <article id="entrepreneurship">
            <figure>
              <div className="about-story-image">
                <Image
                  src="/awards/awards2.jpg"
                  alt="The Anyam team receiving recognition at the Tourism Startup Challenge"
                  fill
                  sizes="(min-width: 1280px) 420px, (min-width: 768px) 37vw, calc(100vw - 48px)"
                  className="object-cover"
                />
              </div>
              <figcaption>Anyam at the Tourism Startup Challenge</figcaption>
            </figure>
            <h3>Starting Anyam</h3>
            <p className="about-role">Lead Founder & Product Lead</p>
            <p className="about-period">May 2026 - Present</p>
            <p className="about-story-body">
              I founded Anyam to help underrepresented destinations tell their stories through technology. The team won the regional championship and became a national finalist in the CHED Tourism Startup Challenge, securing ₱250,000 in implementation funding.
            </p>
          </article>
        </div>
      </section>

      <section id="experience" className="about-section" aria-labelledby="about-experience-title">
        <header className="about-section-heading">
          <h2 id="about-experience-title">Experience</h2>
        </header>
        <div className="about-experience-list">
          {experience.map((role) => (
            <details key={role.title} className="about-experience-row">
              <summary>
                <span className="about-experience-year">{role.year}</span>
                <h3>{role.title}</h3>
                <span className="about-experience-org">{role.organization}</span>
                <ChevronDown size={16} strokeWidth={1.5} className="about-disclosure-icon" aria-hidden />
              </summary>
              <div className="about-experience-detail">
                <p className="about-period">{role.period}</p>
                <p>{role.description}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section id="speaking" className="about-section" aria-labelledby="about-speaking-title">
        <header className="about-section-heading">
          <h2 id="about-speaking-title">Speaking & sharing</h2>
        </header>
        <figure>
          <div className="about-speaking-image">
            <Image
              src="/speaker/speaker2.jpeg"
              alt="Gabrielle speaking during a Build with AI community event"
              fill
              sizes="(min-width: 1036px) 940px, (min-width: 1024px) calc(100vw - 96px), (min-width: 640px) calc(100vw - 80px), calc(100vw - 48px)"
              className="object-cover object-[center_42%]"
            />
          </div>
          <figcaption>Build with AI in Zamboanga</figcaption>
        </figure>
        <div className="about-speaking-copy">
          <h3>Sharing what I learn</h3>
          <p className="about-role">Technical Speaker and Community Volunteer</p>
          <p className="about-story-body">
            I speak at community technology events, including Build with AI and BuildLabs, to share practical ideas about AI and software development. These sessions make technical topics more approachable and help more people start building.
          </p>
        </div>
        <div className="about-talks">
          <article>
            <h4>BuildLabs: Snap-in</h4>
            <p>Frontend modular design and component breakdown.</p>
            <time dateTime="2026-04-11">11 April 2026</time>
          </article>
          <article>
            <h4>BuildLabs: Stack-Up</h4>
            <p>Full-stack integration, APIs, and database connections.</p>
            <time dateTime="2026-04-14">14-15 April 2026</time>
          </article>
        </div>
      </section>

      <section id="recognition" className="about-section" aria-labelledby="about-recognition-title">
        <header className="about-section-heading">
          <h2 id="about-recognition-title">Recognition</h2>
        </header>
        <div className="about-recognition-grid">
          <article>
            <span className="about-award-result">Regional winner / National finalist</span>
            <h3>CHED Tourism Startup Challenge</h3>
            <p>₱250,000 in implementation funding for Anyam.</p>
            <time dateTime="2026-05">May 2026</time>
          </article>
          <article>
            <span className="about-award-result">2nd place</span>
            <h3>Build with AI Hackathon</h3>
            <p>An AI application for fast fashion sustainability.</p>
            <time dateTime="2026-05">May 2026</time>
          </article>
        </div>
        <article className="about-debate">
          <figure className="about-debate-image">
            <Image
              src="/debate/debate2.jpeg"
              alt="Gabrielle speaking at a debate event"
              fill
              sizes="(min-width: 768px) 180px, 130px"
              className="object-cover object-[center_40%]"
            />
          </figure>
          <div>
            <h3>Making a case for ideas</h3>
            <p className="about-role">Competitive Debater, Ateneo Debate Union</p>
            <p className="about-story-body">
              I represented Ateneo de Zamboanga University in regional and national British Parliamentary debate tournaments. Debate sharpened how I analyze a problem, listen under pressure, and make a clear case. At the 24th National Debate Championship, my team reached Open Pre-octofinals and broke 36th overall.
            </p>
          </div>
        </article>
      </section>

      <section id="affiliations" className="about-section" aria-labelledby="about-affiliations-title">
        <header className="about-section-heading">
          <h2 id="about-affiliations-title">Affiliations</h2>
        </header>
        <dl className="about-affiliations">
          {affiliations.map((affiliation) => (
            <div key={affiliation.name}>
              <dt>{affiliation.name}</dt>
              <dd>{affiliation.role}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
