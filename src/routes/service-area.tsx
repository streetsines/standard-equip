import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Truck, Clock } from "lucide-react";
import { SERVICE_AREA_CITIES, SERVICE_AREA_PROXIMITY_HOOK } from "@/lib/serviceArea";

export const Route = createFileRoute("/service-area")({
  head: () => ({
    meta: [
      { title: "Service Area — Standard Rents · Hudson, Rt 303 & 91 corridors" },
      {
        name: "description",
        content:
          "Competitive equipment delivery lead times from Hudson, OH: Streetsboro & Twinsburg under 45 minutes via Rt 303 & 91. Full Northeast Ohio coverage map.",
      },
      { property: "og:title", content: "Service Area — Standard Rents" },
      {
        property: "og:description",
        content: SERVICE_AREA_PROXIMITY_HOOK,
      },
    ],
  }),
  component: ServiceAreaPage,
});

const cities = SERVICE_AREA_CITIES;

function ServiceAreaPage() {
  return (
    <>
      <section className="bg-[color:var(--pitch)] py-24 text-[color:var(--linen)]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="font-mono-tag text-xs text-[color:var(--amber-brand)]">
            ── COVERAGE · NORTHEAST OHIO
          </div>
          <h1 className="mt-4 font-display text-7xl font-extrabold uppercase leading-[0.85] md:text-9xl">
            Where we <br />
            <span className="text-[color:var(--amber-brand)]">deliver.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-[color:var(--linen)]/70">
            {SERVICE_AREA_PROXIMITY_HOOK} Same-day dispatch to the cities below — outside
            the list? Call for a commercial haul quote.
          </p>
        </div>
      </section>

      <section className="bg-[color:var(--linen)] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-px bg-[color:var(--pitch)]/15">
            {cities.map((c, i) => (
              <div
                key={c.name}
                className={`group grid grid-cols-[auto_1fr_auto] items-center gap-6 p-6 md:grid-cols-[auto_1fr_auto_auto] md:p-8 ${
                  c.primary ? "bg-[color:var(--amber-brand)]" : "bg-[color:var(--linen)]"
                }`}
              >
                <div
                  className={`font-mono-tag text-xs ${
                    c.primary ? "text-[color:var(--pitch)]/60" : "text-[color:var(--muted-foreground)]"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <MapPin
                      className={`h-5 w-5 ${
                        c.primary ? "text-[color:var(--pitch)]" : "text-[color:var(--amber-brand)]"
                      }`}
                    />
                    <div className="font-display text-3xl font-extrabold uppercase leading-none md:text-5xl">
                      {c.name}, OH
                    </div>
                    <span className="font-mono-tag text-xs opacity-60">{c.code}</span>
                  </div>
                  <div
                    className={`mt-2 text-sm ${
                      c.primary ? "text-[color:var(--pitch)]/80" : "text-[color:var(--muted-foreground)]"
                    }`}
                  >
                    {c.note}
                  </div>
                </div>
                <div className="hidden text-right md:block">
                  <div className="font-mono-tag text-[10px] uppercase opacity-60">
                    Lead Time
                  </div>
                  <div className="mt-1 font-display text-2xl font-extrabold">{c.lead}</div>
                </div>
                {c.primary && (
                  <span className="bg-[color:var(--pitch)] px-3 py-1 font-display text-[10px] font-extrabold uppercase tracking-[0.2em] text-[color:var(--amber-brand)]">
                    HQ
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-px bg-[color:var(--pitch)]/15 md:grid-cols-3">
            {[
              {
                Icon: Truck,
                k: "303 & 91 corridors",
                v: "Fastest transit in the county from our Hudson yard — competitive lead times, not guesswork.",
              },
              { Icon: Clock, k: "Same-Day", v: "Order by 2pm for same-day dispatch when equipment is available." },
              { Icon: MapPin, k: "Beyond?", v: "We'll quote a flat haul rate, no markup." },
            ].map(({ Icon, k, v }) => (
              <div key={k} className="flex items-start gap-4 bg-[color:var(--linen)] p-8">
                <Icon className="h-6 w-6 shrink-0 text-[color:var(--amber-deep)]" />
                <div>
                  <div className="font-display text-xl font-extrabold uppercase">{k}</div>
                  <div className="mt-1 text-sm text-[color:var(--muted-foreground)]">{v}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
