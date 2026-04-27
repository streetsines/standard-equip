import { Link } from "@tanstack/react-router";
import { quoteApi } from "@/lib/quoteStore";
import {
  SERVICE_AREA_CITIES,
  SERVICE_AREA_HOME_PREVIEW_COUNT,
  SERVICE_AREA_PROXIMITY_HOOK,
} from "@/lib/serviceArea";
import { ArrowRight, MapPin } from "lucide-react";

export function ServiceArea() {
  const cities = SERVICE_AREA_CITIES.slice(0, SERVICE_AREA_HOME_PREVIEW_COUNT);

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
              {SERVICE_AREA_PROXIMITY_HOOK} Same-day dispatch across our core corridors; beyond
              that, we quote flat hauls — no hidden fees.
            </p>

            <Link
              to="/service-area"
              className="mt-8 inline-flex items-center gap-2 font-display text-sm font-extrabold uppercase tracking-[0.2em] text-[color:var(--amber-brand)] hover:text-[color:var(--linen)]"
            >
              Full coverage map
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

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
                      {c.code} · {c.note}
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

export function CommercialAccounts() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--linen)] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative grid overflow-hidden border border-[color:var(--pitch)]/10 lg:grid-cols-[1.4fr_1fr]">
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

export function CtaStrip() {
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
