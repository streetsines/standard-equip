import { createFileRoute, Link } from "@tanstack/react-router";
import { FleetSection } from "@/components/FleetSection";
import { CommercialAccounts, CtaStrip, ServiceArea } from "@/components/HomeMarketingSections";
import { quoteApi } from "@/lib/quoteStore";
import heroImg from "@/assets/marketing-hero-concrete-yard.jpg";
import { ArrowRight } from "lucide-react";

const homeDescription =
  "Kubota SVL75-2 compact track loaders, KX057-4 mini excavators, and 4,000-gallon water trucks for rent in Hudson, OH. Same-day dispatch across Summit, Portage, and Cuyahoga counties — Twinsburg, Streetsboro, Macedonia & beyond.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Standard Rents — Kubota & Water Truck Rental | Hudson OH | Summit & Portage" },
      { name: "description", content: homeDescription },
      { property: "og:title", content: "Standard Rents — Kubota & Water Truck Rental | Hudson OH" },
      { property: "og:description", content: homeDescription },
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
        alt="Standard Rents industrial yard — logo on a concrete wall with orange Kubota mini excavators parked under an open shed"
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover opacity-55"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--pitch)]/40 via-[color:var(--pitch)]/70 to-[color:var(--pitch)]" />

      <div className="hex-pattern absolute inset-0 opacity-40 mix-blend-screen" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[color:var(--pitch)]/92 via-[color:var(--pitch)]/45 via-[42%] to-transparent to-[72%]"
      />

      <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-between px-6 pb-16 pt-20">
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

        <div className="max-w-5xl">
          <div className="mb-6 inline-flex items-center gap-3 border border-[color:var(--amber-brand)]/40 bg-[color:var(--amber-brand)]/10 px-4 py-2">
            <span className="h-1.5 w-1.5 bg-[color:var(--amber-brand)]" />
            <span className="font-mono-tag text-[10px] uppercase tracking-[0.2em] text-[color:var(--amber-brand)]">
              SVL75-2 · KX057-4 · 4,000-gal water · Hudson OH 44236
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
            Kubota SVL75-2 track loaders, KX057-4 mini excavators, and 4,000-gallon water trucks for{" "}
            <strong className="text-[color:var(--linen)]">same-day dispatch</strong> from Hudson to
            Twinsburg, Streetsboro, Macedonia, and across Summit, Portage &amp; Cuyahoga counties.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={quoteApi.open}
              className="group inline-flex items-center justify-center gap-3 bg-[color:var(--amber-brand)] px-8 py-5 font-display text-sm font-extrabold uppercase tracking-[0.22em] text-[color:var(--pitch)] transition-all hover:bg-[color:var(--linen)]"
            >
              Build a Quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <Link
              to="/fleet"
              className="group inline-flex items-center justify-center gap-3 border border-[color:var(--linen)]/30 px-8 py-5 font-display text-sm font-extrabold uppercase tracking-[0.22em] text-[color:var(--linen)] transition-all hover:border-[color:var(--amber-brand)] hover:text-[color:var(--amber-brand)]"
            >
              View Fleet
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

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
