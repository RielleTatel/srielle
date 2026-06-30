"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  Loader2,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { FadeText } from "@/components/ui/FadeText";

type Status = "idle" | "submitting" | "success" | "error";

const FIELD_BASE =
  "w-full rounded-2xl border border-border bg-background/40 px-4 py-3 text-[15px] text-foreground placeholder:text-muted/70 transition-[border-color,box-shadow,background-color] duration-200 ease-out hover:border-foreground/15 focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/25";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      subject: String(data.get("subject") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      website: String(data.get("website") ?? ""),
    };

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const body = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (!res.ok || !body.ok) {
        throw new Error(body.error ?? "Couldn't send your message. Try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    }
  }

  return (
    <section id="contact" className="border-t border-border px-6 pt-24 pb-28 sm:px-10 lg:px-15">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="mb-12 flex flex-col gap-5">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
              <FadeText>Let&apos;s stay connected</FadeText>
            </span>
            <h2
              className="max-w-3xl text-foreground"
              style={{
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
                fontSize: "clamp(2.75rem, 6.5vw, 5rem)",
              }}
            >
              <FadeText>Got an idea?</FadeText>{" "}
              <span style={{ color: "var(--accent)", fontStyle: "italic" }}>
                <FadeText delay={0.15}>let&apos;s build it.</FadeText>
              </span>
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              <FadeText delay={0.2}>
                Open to collaborations, speaking engagements, and meaningful conversations. Use the form, or reach out through one of the channels below — I read everything.
              </FadeText>
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-12">
          <FadeIn className="h-full">
            <figure className="relative h-full min-h-[520px] overflow-hidden rounded-3xl border border-border bg-foreground/[0.02]">
              <Image
                src="/contact/portrait.png"
                alt="Portrait of Gabrielle Tatel"
                fill
                sizes="(min-width: 1024px) 36vw, 90vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/55">
                    Currently available
                  </p>
                  <p className="mt-2 text-xl font-semibold tracking-tight text-white">
                    Gabrielle Tatel
                  </p>
                  <p className="text-sm text-white/70">
                    Full-Stack Developer · Speaker · Student Leader
                  </p>
                </div>
                <span
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/80 backdrop-blur-md"
                  aria-label="Status: open to opportunities"
                >
                  <span className="relative inline-flex h-1.5 w-1.5">
                    <span className="absolute inset-0 animate-ping rounded-full bg-[var(--accent)] opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  </span>
                  Open
                </span>
              </figcaption>
            </figure>
          </FadeIn>

          <FadeIn delay={0.15} className="h-full">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="relative flex h-full flex-col gap-5 rounded-3xl border border-border bg-foreground/[0.025] p-6 backdrop-blur-sm sm:p-8"
            >
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] top-[-9999px] h-0 w-0 opacity-0"
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name" required>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    autoComplete="name"
                    className={FIELD_BASE}
                  />
                </Field>
                <Field label="Email" required>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@domain.com"
                    autoComplete="email"
                    className={FIELD_BASE}
                  />
                </Field>
              </div>

              <Field label="Subject">
                <input
                  name="subject"
                  type="text"
                  placeholder="What's this about?"
                  className={FIELD_BASE}
                />
              </Field>

              <Field label="Message" required>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me what you're working on, or just say hi…"
                  className={`${FIELD_BASE} resize-none leading-relaxed`}
                />
              </Field>

              <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-xs text-xs leading-relaxed text-muted">
                  Your details are only used to reply to your message.
                </p>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-[transform,opacity] duration-200 ease-out hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send message
                      <Send
                        size={15}
                        className="transition-transform duration-200 ease-out group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                      />
                    </>
                  )}
                </button>
              </div>

              {status === "success" ? (
                <FormFlash
                  tone="success"
                  icon={<CheckCircle2 size={16} />}
                  message="Message sent — talk soon. Thank you for reaching out!"
                />
              ) : null}
              {status === "error" ? (
                <FormFlash
                  tone="error"
                  icon={<AlertCircle size={16} />}
                  message={errorMessage}
                />
              ) : null}
            </form>
          </FadeIn>
        </div>

        <FadeIn delay={0.2}>
          <ul className="mt-8 grid gap-2 sm:grid-cols-3">
            <InfoRow
              icon={<Clock3 size={16} strokeWidth={1.6} />}
              title="When I'm around"
              body="Mon — Fri · 8:00 AM – 6:00 PM PHT"
            />
            <InfoRow
              icon={<MapPin size={16} strokeWidth={1.6} />}
              title="Where to find me"
              body="Zamboanga City, Philippines"
            />
            <InfoRow
              icon={<Mail size={16} strokeWidth={1.6} />}
              title="Email me directly"
              body="tatelgabrielle19@gmail.com"
              href="mailto:tatelgabrielle19@gmail.com"
            />
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}

type InfoRowProps = {
  icon: ReactNode;
  title: string;
  body: string;
  href?: string;
};

function InfoRow({ icon, title, body, href }: InfoRowProps) {
  const inner = (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-foreground/[0.02] px-4 py-3 transition-colors duration-200 hover:border-foreground/15">
      <span
        aria-hidden
        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[var(--accent)]/25 bg-[var(--accent)]/[0.08] text-[var(--accent)]"
      >
        {icon}
      </span>
      <div className="flex flex-col">
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
          {title}
        </span>
        <span className="text-sm text-foreground/90">{body}</span>
      </div>
    </div>
  );

  return (
    <li>
      {href ? (
        <a href={href} className="block">
          {inner}
        </a>
      ) : (
        inner
      )}
    </li>
  );
}

type FieldProps = {
  label: string;
  required?: boolean;
  children: ReactNode;
};

function Field({ label, required, children }: FieldProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
        {label}
        {required ? <span className="ml-1 text-[var(--accent)]">*</span> : null}
      </span>
      {children}
    </label>
  );
}

type FormFlashProps = {
  tone: "success" | "error";
  icon: ReactNode;
  message: string;
};

function FormFlash({ tone, icon, message }: FormFlashProps) {
  const styles =
    tone === "success"
      ? "border-[var(--accent)]/30 bg-[var(--accent)]/[0.07] text-foreground/85"
      : "border-red-500/30 bg-red-500/[0.06] text-foreground/85";
  const iconColor = tone === "success" ? "text-[var(--accent)]" : "text-red-400";

  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={`flex items-start gap-3 rounded-2xl border p-4 text-sm ${styles}`}
    >
      <span className={`mt-0.5 ${iconColor}`}>{icon}</span>
      <span>{message}</span>
    </div>
  );
}
