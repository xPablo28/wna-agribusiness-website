import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Handshake, Mail, MapPin, PackageSearch, Phone, Sprout } from "lucide-react";
import { useState, type FormEvent } from "react";
import { WnaLogo } from "../components/Logo";
import { EASE, GhostCta, PrimaryCta, Reveal, Tag, Words } from "../components/ui";
import { COMPANY, NAV_LINKS, isPlaceholder } from "../data";
import { routeHref, type PagePath } from "../router";
import { cn } from "../utils/cn";

/* ============================== 17 · PARTNERS ==============================
   Three clear doors into the network. The form composes a real e-mail to the
   address configured in src/data.ts — nothing is "submitted" to a backend
   that does not exist. */

type Path = "producers" | "buyers" | "strategic";

const PATHS: Record<Path, {
  icon: typeof Sprout; title: string; q: string; cta: string; subject: string;
  fields: [string, string, string]; placeholder: string;
}> = {
  producers: {
    icon: Sprout,
    title: "Producers",
    q: "Have agricultural surplus?",
    cta: "Tell WNA what you have",
    subject: "Surplus availability",
    fields: ["Name", "Farm / organization", "Phone or email"],
    placeholder: "e.g. Mango — quantity range, region, when it comes in…",
  },
  buyers: {
    icon: PackageSearch,
    title: "Buyers",
    q: "Looking for agricultural ingredients or feed inputs?",
    cta: "Tell WNA what you need",
    subject: "Ingredient / feed demand",
    fields: ["Name", "Company", "Phone or email"],
    placeholder: "e.g. Ingredient, volume per month, delivery region…",
  },
  strategic: {
    icon: Handshake,
    title: "Strategic partners",
    q: "Want to help build a stronger agricultural utilization ecosystem?",
    cta: "Start a conversation",
    subject: "Strategic partnership",
    fields: ["Name", "Organization", "Phone or email"],
    placeholder: "e.g. Processing, logistics, investment, research — tell us more…",
  },
};

function PartnerForm({ path }: { path: Path }) {
  const cfg = PATHS[path];
  const [values, setValues] = useState<Record<string, string>>({});
  const contactReady = !isPlaceholder(COMPANY.contact.email);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactReady) return;
    const lines = [...cfg.fields.map((f) => `${f}: ${values[f] ?? ""}`), "", "Details", values["Details"] ?? ""].join("\n");
    const subject = `WNA enquiry — ${cfg.title}: ${cfg.subject}`;
    window.location.href = `mailto:${COMPANY.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.trim())}`;
  };

  return (
    <form onSubmit={submit} aria-label={`${cfg.title} enquiry`} className="rounded-sm bg-ink p-6 text-cream sm:p-8">
      <div className="grid gap-4 sm:grid-cols-3">
        {cfg.fields.map((f) => (
          <label key={f} className="block">
            <span className="font-mono text-[10px] tracking-[0.2em] text-cream/45 uppercase">{f}</span>
            <input
              required
              type={f.toLowerCase().includes("email") ? "email" : "text"}
              placeholder={f}
              value={values[f] ?? ""}
              onChange={(e) => setValues((v) => ({ ...v, [f]: e.target.value }))}
              className="mt-2 w-full rounded-sm border border-cream/15 bg-cream/[0.05] px-4 py-3.5 text-[14px] text-cream placeholder:text-cream/25 focus:border-mango focus:outline-none"
            />
          </label>
        ))}
      </div>
      <label className="mt-4 block">
        <span className="font-mono text-[10px] tracking-[0.2em] text-cream/45 uppercase">Details</span>
        <textarea
          required
          rows={4}
          placeholder={cfg.placeholder}
          value={values["Details"] ?? ""}
          onChange={(e) => setValues((v) => ({ ...v, Details: e.target.value }))}
          className="mt-2 w-full resize-y rounded-sm border border-cream/15 bg-cream/[0.05] px-4 py-3.5 text-[14px] text-cream placeholder:text-cream/25 focus:border-mango focus:outline-none"
        />
      </label>

      {contactReady ? (
        <button
          type="submit"
          className="group mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-mango py-4 text-[13px] font-semibold tracking-[0.14em] text-ink uppercase transition-colors duration-300 hover:bg-cream sm:w-auto sm:px-10"
        >
          {cfg.cta}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      ) : (
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md font-mono text-[10.5px] leading-relaxed tracking-[0.06em] text-cream/45">
            ⚠ ENQUIRY LINE NOT CONFIGURED YET — this form will open a pre-filled e-mail once
            the contact address is set in <span className="text-mango">src/data.ts → COMPANY.contact.email</span>.
            Until then, use <a href="#contact" className="text-mango underline underline-offset-2">the contact details below</a>.
          </p>
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full border border-cream/20 py-4 text-[13px] font-semibold tracking-[0.14em] text-cream/40 uppercase sm:w-auto sm:px-10"
          >
            {cfg.cta} (coming soon)
          </button>
        </div>
      )}
    </form>
  );
}

export function Partners() {
  const [path, setPath] = useState<Path>("producers");

  return (
    <section id="partners" aria-labelledby="partners-title" className="relative overflow-hidden bg-cream py-28 text-ink sm:py-40">
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8">
        <Tag index="01" label="Partners" dark />
        <h2 id="partners-title" className="display mt-8 max-w-4xl text-[clamp(2.2rem,6vw,5rem)]">
          <Words text="Three ways in." />{" "}
          <Words text="One network." delay={0.25} accentWords={["network."]} accentClass="text-ember" />
        </h2>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-2xl text-[15.5px] leading-relaxed text-ink/60 sm:text-base">
            Choose the door that fits you. WNA does not claim partnerships that
            don't exist yet — every relationship on this page starts the same way:
            a conversation.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:mt-16 lg:grid-cols-3">
          {(Object.keys(PATHS) as Path[]).map((p, i) => {
            const cfg = PATHS[p];
            const isActive = path === p;
            return (
              <motion.button
                key={p}
                type="button"
                onClick={() => setPath(p)}
                aria-pressed={isActive}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                className={cn(
                  "cursor-pointer rounded-sm border p-7 text-left transition-all duration-300",
                  isActive ? "border-ink bg-ink text-cream" : "border-ink/15 bg-cream hover:border-ink/40",
                )}
              >
                <cfg.icon className={cn("h-7 w-7", isActive ? "text-mango" : "text-wna")} strokeWidth={1.5} />
                <p className={cn("mt-6 font-mono text-[10.5px] tracking-[0.22em] uppercase", isActive ? "text-mango" : "text-ember")}>
                  {cfg.title}
                </p>
                <p className="display-tight mt-3 text-[1.45rem] leading-tight">{cfg.q}</p>
                <p className={cn("mt-5 inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.14em] uppercase", isActive ? "text-cream" : "text-ink/60")}>
                  {cfg.cta} <ArrowUpRight className="h-4 w-4" />
                </p>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={path}
            id="enquiry"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="mt-6 scroll-mt-28"
          >
            <PartnerForm path={path} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ============================== 18 · ABOUT ============================== */

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-hidden bg-cream py-24 text-ink sm:py-36">
      <div className="relative mx-auto max-w-[1440px] px-5 text-center sm:px-8">
        <Reveal>
          <p className="eyebrow text-ink/50">The company</p>
        </Reveal>
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mt-10 flex justify-center"
        >
          <WnaLogo eager imgClassName="h-28 w-auto sm:h-40" />
        </motion.div>
        <h2 id="about-title" className="display mx-auto mt-10 max-w-5xl text-[clamp(2rem,6vw,4.8rem)] text-ink">
          <Words text="Waste Not Agro Solutions" />
        </h2>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-8 max-w-2xl text-[15.5px] leading-relaxed text-ink/65 sm:text-lg">
            {COMPANY.description}
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="display-tight mx-auto mt-10 max-w-2xl text-[clamp(1.4rem,3.4vw,2.2rem)] text-ink">
            Our starting point is <span className="text-mango">mango.</span>
            <br />
            Our ambition is <span className="text-ember">much bigger.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================== FINAL CTA (shared band) =========================
   Full size closes the homepage; compact closes every other page.               */

export function Final({ variant = "full", ctaHref = "#/partners" }: { variant?: "full" | "compact"; ctaHref?: string }) {
  const compact = variant === "compact";
  return (
    <section id="final" aria-labelledby="final-title" className={compact ? "grain relative overflow-hidden bg-[#040604] px-5 py-24 text-center sm:px-8 sm:py-32" : "grain vignette relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[#040604] px-5 py-32 text-center sm:px-8"}>
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[40vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/[0.07] blur-[120px]" aria-hidden />
      {!compact && <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#040604]" aria-hidden />}

      <h2 id="final-title" className="sr-only">Partner with WNA</h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2 }}
        className="display relative text-[clamp(1.7rem,5vw,3.8rem)] text-cream/90"
      >
        <Words text="Agricultural surplus will always exist." />
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-140px" }}
        transition={{ duration: 1, ease: EASE, delay: 0.35 }}
        className="display relative mt-6 text-[clamp(1.7rem,5vw,3.8rem)] text-cream"
      >
        <Words text="The question is what" delay={0.4} />{" "}
        <Words text="we do with it." delay={0.7} accentWords={["it."]} />
      </motion.p>

      <motion.p
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
        className="display-tight relative mt-14 text-[clamp(1.3rem,3.6vw,2.4rem)] text-mango sm:mt-20"
      >
        Let's give surplus its next best use.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: EASE }}
        className="relative mt-14 flex flex-col items-center sm:mt-20"
      >
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <PrimaryCta href={ctaHref}>Partner With WNA</PrimaryCta>
          <GhostCta href="#contact">Talk to WNA</GhostCta>
        </div>
      </motion.div>
    </section>
  );
}

/* ============================== FOOTER ==============================
   Professional WNA footer — real links to real sections; contact/social
   entries render only when configured (see src/data.ts). */

const FOOTER_NAV = NAV_LINKS.map((l) => ({ label: l.label, href: routeHref(l.path as PagePath) }));

const SOCIAL_LABELS: Record<string, string> = {
  linkedin: "LinkedIn",
  instagram: "Instagram",
  x: "X",
  facebook: "Facebook",
};

export function Footer() {
  const socials = Object.entries(COMPANY.social).filter(([, url]) => !isPlaceholder(url as string));
  const emailReady = !isPlaceholder(COMPANY.contact.email);

  return (
    <footer id="contact" aria-label="Site footer" className="border-t border-cream/10 bg-ink">
      <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <WnaLogo tile />
            <p className="display-tight mt-6 text-lg text-cream">
              WNA — {COMPANY.fullName}
            </p>
            <p className="mt-3 text-[13.5px] leading-relaxed text-cream/55">
              {COMPANY.tagline}
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] tracking-[0.24em] text-cream/40 uppercase">Explore</p>
              <ul className="mt-3 space-y-0.5 text-[13.5px]">
                {FOOTER_NAV.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="inline-block py-1.5 text-cream/65 transition-colors hover:text-mango">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-[0.24em] text-cream/40 uppercase">Contact</p>
              <ul className="mt-4 space-y-2.5 text-[13.5px]">
                <li className="flex items-center gap-2.5 text-cream/65">
                  <Mail className="h-4 w-4 shrink-0 text-mango/80" aria-hidden />
                  {emailReady ? (
                    <a href={`mailto:${COMPANY.contact.email}`} className="transition-colors hover:text-mango">
                      {COMPANY.contact.email}
                    </a>
                  ) : (
                    <span className="font-mono text-[11px] tracking-[0.08em] text-cream/45">[CONTACT EMAIL]</span>
                  )}
                </li>
                <li className="flex items-center gap-2.5 text-cream/65">
                  <Phone className="h-4 w-4 shrink-0 text-mango/80" aria-hidden />
                  <span className="font-mono text-[11px] tracking-[0.08em] text-cream/45">
                    {isPlaceholder(COMPANY.contact.phone) ? "[PHONE NUMBER]" : COMPANY.contact.phone}
                  </span>
                </li>
                <li className="flex items-center gap-2.5 text-cream/65">
                  <MapPin className="h-4 w-4 shrink-0 text-mango/80" aria-hidden />
                  <span className="font-mono text-[11px] tracking-[0.08em] text-cream/45">
                    {isPlaceholder(COMPANY.contact.location) ? "[LOCATION]" : COMPANY.contact.location}
                  </span>
                </li>
              </ul>
              {socials.length > 0 && (
                <div className="mt-5 flex gap-3">
                  {socials.map(([key, url]) => (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-cream/20 px-4 py-1.5 font-mono text-[10px] tracking-[0.18em] text-cream/60 uppercase transition-colors hover:border-mango hover:text-mango"
                    >
                      {SOCIAL_LABELS[key] ?? key}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-cream/10 pt-7 text-[12px] text-cream/35 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</span>
          <span className="font-mono text-[10.5px] tracking-[0.2em] uppercase">
            {COMPANY.origin} · Grade → Match → Utilize
          </span>
        </div>
      </div>
    </footer>
  );
}
