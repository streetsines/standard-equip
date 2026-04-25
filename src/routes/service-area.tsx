import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Truck, Clock } from "lucide-react";

export const Route = createFileRoute("/service-area")({
  head: () => ({
    meta: [
      { title: "Service Area — Standard Rents · Hudson, Stow, Tallmadge" },
      {
        name: "description",
        content:
          "Free same-day equipment delivery to Hudson, Stow, Tallmadge and the greater Akron area. View our full Northeast Ohio service map.",
      },
      { property: "og:title", content: "Service Area — Standard Rents" },
      {
        property: "og:description",
        content:
          "Free same-day equipment delivery across Northeast Ohio.",
      },
    ],
  }),
  component: ServiceAreaPage,
});

const cities = [
  { name: "Hudson", code: "44236", lead: "30 min", note: "Yard location · same-hour dispatch", primary: true },
  { name: "Stow", code: "44224", lead: "45 min", note: "Free delivery · 8 mi from yard" },
  { name: "Tallmadge", code: "44278", lead: "60 min", note: "Free delivery · 12 mi from yard" },
  { name: "Cuyahoga Falls", code: "44221", lead: "60 min", note: "Free delivery · 10 mi" },
  { name: "Macedonia", code: "44056", lead: "75 min", note: "Free delivery · 9 mi" },
  { name: "Akron", code: "44308", lead: "75 min", note: "$45 haul · 16 mi" },
  { name: "Twinsburg", code: "44087", lead: "75 min", note: "Free delivery · 7 mi" },
  { name: "Streetsboro", code: "44241", lead: "90 min", note: "$35 haul · 11 mi" },
];

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
            Our yard is in Hudson. Free same-day delivery to the cities below.
            Outside the zone? Call for a flat-rate haul quote.
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
                    Yard
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-px bg-[color:var(--pitch)]/15 md:grid-cols-3">
            {[
              { Icon: Truck, k: "Free Delivery", v: "Within our 15-mile core zone." },
              { Icon: Clock, k: "Same-Day", v: "Order by 2pm for same-day dispatch." },
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
