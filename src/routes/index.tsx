import { createFileRoute, Link } from "@tanstack/react-router";
import { equipment } from "@/lib/equipment";
import { EquipmentCard } from "@/components/EquipmentCard";
import { quoteApi } from "@/lib/quoteStore";
import heroImg from "@/assets/hero.jpg";
import { ArrowDown, ArrowRight, MapPin, ShieldCheck, Truck, Zap } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Standard Rents — The Standard in Heavy Equipment" },
      {
        name: "description",
        content:
          "Precision-ready water trucks, skid steers, and mini excavators available for immediate dispatch in Northeast Ohio.",
      },
      { property: "og:title", content: "Standard Rents — The Standard in Heavy Equipment" },
      {
        property: "og:description",
        content:
          "Precision-ready water trucks, skid steers, and mini excavators available for immediate dispatch in Northeast Ohio.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <FleetSection />
      <ServiceArea />
      <CommercialAccounts />
      <CtaStrip />
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[color:var(--pitch)] text-[color:var(--linen)]">
      <img
        src={heroImg}
        alt="Heavy equipment yard at dusk"
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover opacity-55"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--pitch)]/40 via-[color:var(--pitch)]/70 to-[color:var(--pitch)]" />

      {/* hex pattern overlay */}
      <div className="hex-pattern absolute inset-0 opacity-40 mix-blend-screen" />

      <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-between px-6 pb-16 pt-20">
        {/* status bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--amber-brand)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--amber-brand)]" />
            </span>
            <span className="font-mono-tag text-[10px] uppercase text-[color:var(--linen)]/70">
              Dispatch Online · NE Ohio
            </span>
          </div>
          <div className="hidden items-center gap-4 font-mono-tag text-[10px] uppercase text-[color:var(--linen)]/40 md:flex">
            <span>EST. 2024</span>
            <span>·</span>
            <span>FLEET 047</span>
            <span>·</span>
            <span>UTIL 86%</span>
          </div>
        </div>

        {/* headline */}
        <div className="max-w-5xl">
          <div className="mb-6 inline-flex items-center gap-3 border border-[color:var(--amber-brand)]/40 bg-[color:var(--amber-brand)]/10 px-4 py-2">
            <span className="h-1.5 w-1.5 bg-[color:var(--amber-brand)]" />
            <span className="font-mono-tag text-[10px] uppercase tracking-[0.2em] text-[color:var(--amber-brand)]">
              Heavy Equipment Rental · Northeast Ohio
            </span>
          </div>
          <h1 className="font-display text-[clamp(3.5rem,11vw,11rem)] font-extrabold uppercase leading-[0.82] tracking-[0.01em]">
            <span className="block">The Standard</span>
            <span className="block">
              in <span className="text-[color:var(--amber-brand)]">Heavy</span>
            </span>
            <span className="block font-extralight italic">Equipment.</span>
          </h1>

          <p className="mt-10 max-w-xl text-base leading-relaxed text-[color:var(--linen)]/80 md:text-lg">
            Precision-ready water trucks, skid steers, and mini excavators
            available for <strong className="text-[color:var(--linen)]">immediate dispatch</strong> in
            Northeast Ohio.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              onClick={quoteApi.open}
              className="group inline-flex items-center justify-center gap-3 bg-[color:var(--amber-brand)] px-8 py-5 font-display text-sm font-extrabold uppercase tracking-[0.22em] text-[color:var(--pitch)] transition-all hover:bg-[color:var(--linen)]"
            >
              Build a Quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="#fleet"
              className="group inline-flex items-center justify-center gap-3 border border-[color:var(--linen)]/30 px-8 py-5 font-display text-sm font-extrabold uppercase tracking-[0.22em] text-[color:var(--linen)] transition-all hover:border-[color:var(--amber-brand)] hover:text-[color:var(--amber-brand)]"
            >
              View Fleet
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
            </a>
          </div>
        </div>

        {/* metric strip */}
        <div className="mt-16 grid grid-cols-2 gap-px border-t border-[color:var(--linen)]/10 pt-10 md:grid-cols-4">
          {[
            { k: "1H", l: "Avg. dispatch" },
            { k: "47", l: "Units in fleet" },
            { k: "3", l: "Cities served" },
            { k: "24/7", l: "Field support" },
          ].map((m) => (
            <div key={m.l} className="px-4">
              <div className="font-display text-5xl font-extrabold text-[color:var(--amber-brand)]">
                {m.k}
              </div>
              <div className="mt-1 font-mono-tag text-[10px] uppercase text-[color:var(--linen)]/50">
                {m.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FleetSection() {
  return (
    <section id="fleet" className="bg-[color:var(--linen)] py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="eyebrow text-[color:var(--amber-deep)]">
              ── The Fleet · 03 Categories
            </div>
            <h2 className="mt-4 font-display text-6xl font-extrabold uppercase leading-[0.85] text-[color:var(--pitch)] md:text-8xl">
              Pick your <br />
              <span className="font-extralight italic">weapon.</span>
            </h2>
          </div>
          <p className="max-w-md text-base text-[color:var(--muted-foreground)]">
            Every machine in our yard is inspected, fueled, and ready to roll.
            No excuses. No downtime. Just <strong>uptime</strong>.
          </p>
        </div>

        {/* grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {equipment.map((item, i) => (
            <EquipmentCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* trust strip */}
        <div className="mt-16 grid gap-px overflow-hidden bg-[color:var(--pitch)]/10 md:grid-cols-3">
          {[
            { Icon: Zap, k: "Same-Day Dispatch", v: "Order by 2pm, work by 5." },
            { Icon: ShieldCheck, k: "Inspected & Insured", v: "DOT compliant. Worry-free." },
            { Icon: Truck, k: "Local Delivery", v: "We deliver to your jobsite." },
          ].map(({ Icon, k, v }) => (
            <div key={k} className="flex items-start gap-4 bg-[color:var(--linen)] p-6">
              <div className="grid h-12 w-12 shrink-0 place-items-center bg-[color:var(--pitch)] text-[color:var(--amber-brand)]">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display text-lg font-extrabold uppercase text-[color:var(--pitch)]">
                  {k}
                </div>
                <div className="text-sm text-[color:var(--muted-foreground)]">{v}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceArea() {
  const cities = [
    { name: "Hudson", code: "44236", distance: "Yard", lead: "30 min" },
    { name: "Stow", code: "44224", distance: "8 mi", lead: "45 min" },
    { name: "Tallmadge", code: "44278", distance: "12 mi", lead: "60 min" },
  ];

  return (
    <section className="bg-[color:var(--pitch)] py-24 text-[color:var(--linen)]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <div className="eyebrow text-[color:var(--amber-brand)]">
              ── Local Delivery
            </div>
            <h2 className="mt-4 font-display text-6xl font-extrabold uppercase leading-[0.85] md:text-7xl">
              We deliver where <br />
              <span className="text-[color:var(--amber-brand)]">you build.</span>
            </h2>
            <p className="mt-6 max-w-md text-[color:var(--linen)]/70">
              Free same-day delivery across our core service area. Beyond it?
              We'll quote a flat haul rate — no hidden fees.
            </p>

            <Link
              to="/service-area"
              className="mt-8 inline-flex items-center gap-2 font-display text-sm font-extrabold uppercase tracking-[0.2em] text-[color:var(--amber-brand)] hover:text-[color:var(--linen)]"
            >
              Full coverage map
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* city tiles */}
          <div className="grid gap-px bg-[color:var(--linen)]/10">
            {cities.map((c, i) => (
              <div
                key={c.name}
                className="group flex items-center justify-between bg-[color:var(--pitch)] p-6 transition-colors hover:bg-[color:var(--pitch-elevated)] md:p-8"
              >
                <div className="flex items-center gap-6">
                  <div className="font-mono-tag text-[10px] text-[color:var(--linen)]/40">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <MapPin className="h-5 w-5 text-[color:var(--amber-brand)]" />
                  <div>
                    <div className="font-display text-4xl font-extrabold uppercase leading-none md:text-5xl">
                      {c.name}, OH
                    </div>
                    <div className="mt-1 font-mono-tag text-xs text-[color:var(--linen)]/50">
                      {c.code} · {c.distance} from yard
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono-tag text-[10px] uppercase text-[color:var(--linen)]/40">
                    Lead Time
                  </div>
                  <div className="mt-1 font-display text-2xl font-extrabold text-[color:var(--amber-brand)]">
                    {c.lead}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CommercialAccounts() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--linen)] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative grid overflow-hidden border border-[color:var(--pitch)]/10 lg:grid-cols-[1.4fr_1fr]">
          {/* Left: amber slab */}
          <div className="relative bg-[color:var(--amber-brand)] p-10 text-[color:var(--pitch)] md:p-16">
            <div className="absolute right-0 top-0 opacity-10">
              <svg viewBox="0 0 100 100" width="280" height="280" aria-hidden>
                <path
                  fillRule="evenodd"
                  fill="#120F08"
                  d="M50,12 L84,31 L84,69 L50,88 L16,69 L16,31 Z M16,44 L84,44 L84,56 L16,56 Z"
                />
              </svg>
            </div>

            <div className="relative">
              <div className="font-mono-tag text-[10px] uppercase text-[color:var(--amber-deep)]">
                ── B2B · Commercial Account Program
              </div>
              <h2 className="mt-4 font-display text-5xl font-extrabold uppercase leading-[0.85] md:text-7xl">
                Built for <br />
                <span className="font-extralight italic">contractors.</span>
              </h2>
              <p className="mt-6 max-w-md text-[color:var(--pitch)]/80">
                Open a Commercial Account and unlock preferred rates, priority
                dispatch, and net-30 billing. Designed for crews running multiple
                jobs, multiple machines, every week.
              </p>

              <ul className="mt-8 space-y-3">
                {[
                  "Up to 22% off published day rates",
                  "Priority dispatch — your jobs jump the queue",
                  "Net-30 billing with consolidated invoicing",
                  "Dedicated account manager · direct line",
                ].map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[color:var(--pitch)]" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/commercial"
                className="mt-10 inline-flex items-center gap-3 bg-[color:var(--pitch)] px-8 py-4 font-display text-sm font-extrabold uppercase tracking-[0.2em] text-[color:var(--amber-brand)] transition-colors hover:bg-[color:var(--linen)] hover:text-[color:var(--pitch)]"
              >
                Apply for Account
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right: dark stat panel */}
          <div className="bg-[color:var(--pitch)] p-10 text-[color:var(--linen)] md:p-12">
            <div className="font-mono-tag text-[10px] uppercase text-[color:var(--linen)]/50">
              By the Numbers
            </div>

            <div className="mt-6 grid gap-6 divide-y divide-[color:var(--linen)]/10">
              {[
                { k: "22%", l: "Avg. account savings", s: "vs. street rate" },
                { k: "Net 30", l: "Standard terms", s: "extendable to 60" },
                { k: "<1H", l: "Account dispatch SLA", s: "24/7 hotline" },
              ].map((item, i) => (
                <div key={item.l} className={i === 0 ? "" : "pt-6"}>
                  <div className="font-display text-6xl font-extrabold leading-none text-[color:var(--amber-brand)]">
                    {item.k}
                  </div>
                  <div className="mt-2 font-display text-base font-extrabold uppercase tracking-wide">
                    {item.l}
                  </div>
                  <div className="mt-1 font-mono-tag text-[10px] uppercase text-[color:var(--linen)]/40">
                    {item.s}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaStrip() {
  return (
    <section className="stripe-warning py-2">
      <div className="bg-[color:var(--pitch)] py-16">
        <div className="mx-auto max-w-7xl px-6 text-center text-[color:var(--linen)]">
          <div className="font-mono-tag text-[10px] uppercase text-[color:var(--amber-brand)]">
            ── Brand Voice
          </div>
          <h2 className="mt-4 font-display text-6xl font-extrabold uppercase leading-[0.85] md:text-8xl">
            Built to work
          </h2>
          <h2 className="font-display text-6xl font-extralight uppercase leading-[0.85] md:text-8xl">
            as hard as you do.
          </h2>
          <button
            onClick={quoteApi.open}
            className="mt-12 inline-flex items-center gap-3 bg-[color:var(--amber-brand)] px-10 py-5 font-display text-sm font-extrabold uppercase tracking-[0.22em] text-[color:var(--pitch)] hover:bg-[color:var(--linen)]"
          >
            Start Your Quote
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
