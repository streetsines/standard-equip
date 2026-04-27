import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { equipment, getEquipmentBySlug } from "@/lib/equipment";
import { quoteApi } from "@/lib/quoteStore";
import { ArrowLeft, Plus, Phone } from "lucide-react";
import { SITE_PHONE_TEL } from "@/lib/site";

export const Route = createFileRoute("/equipment/$slug")({
  loader: ({ params }) => {
    const item = getEquipmentBySlug(params.slug);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [] };
    const i = loaderData.item;
    const title = i.metaTitle ?? `${i.name} Rental — Standard Rents`;
    const desc = i.metaDescription ?? i.description;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:image", content: i.image },
        { name: "twitter:image", content: i.image },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="font-display text-6xl font-extrabold uppercase">Unit not found</h1>
      <Link
        to="/fleet"
        className="mt-8 inline-flex items-center gap-2 bg-[color:var(--pitch)] px-6 py-3 font-display text-sm font-extrabold uppercase tracking-wider text-[color:var(--linen)]"
      >
        Back to Fleet
      </Link>
    </div>
  ),
  component: EquipmentDetailPage,
});

function EquipmentDetailPage() {
  const { item } = Route.useLoaderData();
  const others = equipment.filter((e) => e.id !== item.id);

  return (
    <article>
      <section className="relative isolate overflow-hidden bg-[color:var(--pitch)] text-[color:var(--linen)]">
        <img
          src={item.image}
          alt={item.imageAlt}
          width={1280}
          height={960}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--pitch)] via-[color:var(--pitch)]/80 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
          <Link
            to="/fleet"
            className="inline-flex items-center gap-2 font-mono-tag text-xs uppercase text-[color:var(--linen)]/60 hover:text-[color:var(--amber-brand)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Fleet
          </Link>

          <div className="mt-6 font-mono-tag text-xs text-[color:var(--amber-brand)]">
            {item.unitCode} · {item.category}
          </div>
          <h1 className="mt-3 font-display text-7xl font-extrabold uppercase leading-[0.82] md:text-9xl">
            {item.name}
          </h1>
          <p className="mt-4 max-w-2xl font-display text-xl font-extralight uppercase tracking-[0.18em] text-[color:var(--amber-brand)]">
            {item.tagline}
          </p>
          <p className="mt-8 max-w-2xl text-lg text-[color:var(--linen)]/80">
            {item.description}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <button
              onClick={() =>
                quoteApi.add({
                  id: item.id,
                  name: item.name,
                  category: item.category,
                  rateDay: item.rateDay,
                })
              }
              className="inline-flex items-center gap-3 bg-[color:var(--amber-brand)] px-8 py-4 font-display text-sm font-extrabold uppercase tracking-[0.22em] text-[color:var(--pitch)] hover:bg-[color:var(--linen)]"
            >
              <Plus className="h-4 w-4" /> Add to Quote
            </button>
            <a
              href={`tel:${SITE_PHONE_TEL}`}
              className="inline-flex items-center gap-3 border border-[color:var(--linen)]/30 px-8 py-4 font-display text-sm font-extrabold uppercase tracking-[0.22em] text-[color:var(--linen)] hover:border-[color:var(--amber-brand)] hover:text-[color:var(--amber-brand)]"
            >
              <Phone className="h-4 w-4" /> Call Dispatch
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--linen)] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <div className="eyebrow text-[color:var(--amber-deep)]">── Rates</div>
              <div className="mt-6 grid gap-px bg-[color:var(--pitch)]/10">
                {[
                  { l: "Day", v: item.rateDay },
                  { l: "Week", v: item.rateWeek },
                  { l: "Month", v: item.rateMonth },
                ].map((r) => (
                  <div key={r.l} className="flex items-baseline justify-between bg-[color:var(--linen)] p-5">
                    <span className="font-display text-sm font-extrabold uppercase tracking-wider">
                      {r.l}
                    </span>
                    <span className="font-display text-3xl font-extrabold text-[color:var(--pitch)]">
                      ${r.v.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 font-mono-tag text-[10px] uppercase text-[color:var(--muted-foreground)]">
                Commercial accounts save up to 22%.
              </p>
            </div>

            <div>
              <div className="eyebrow text-[color:var(--amber-deep)]">── Specifications</div>
              <div className="mt-6 grid grid-cols-2 gap-px bg-[color:var(--pitch)]/10">
                {item.specs.map((s: { label: string; value: string }) => (
                  <div key={s.label} className="bg-[color:var(--linen)] p-6">
                    <div className="font-mono-tag text-[10px] uppercase text-[color:var(--muted-foreground)]">
                      {s.label}
                    </div>
                    <div className="mt-2 font-display text-3xl font-extrabold text-[color:var(--pitch)]">
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>

              {item.detailCallout ? (
                <p className="mt-8 max-w-xl border-l-2 border-[color:var(--amber-brand)] py-3 pl-4 text-sm leading-relaxed text-[color:var(--pitch)]/85">
                  {item.detailCallout}
                </p>
              ) : null}

              <div className="eyebrow mt-12 text-[color:var(--amber-deep)]">── Best For</div>
              <div className="mt-6 flex flex-wrap gap-2">
                {item.bestFor.map((b: string) => (
                  <span
                    key={b}
                    className="border border-[color:var(--pitch)]/20 px-4 py-2 font-display text-xs font-extrabold uppercase tracking-[0.18em]"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--pitch-elevated)] py-20 text-[color:var(--linen)]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="eyebrow text-[color:var(--amber-brand)]">── Also in the Fleet</div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {others.map((o) => (
              <Link
                key={o.id}
                to="/equipment/$slug"
                params={{ slug: o.slug }}
                className="group flex items-center gap-6 border border-[color:var(--linen)]/10 bg-[color:var(--pitch)] p-6 transition-colors hover:border-[color:var(--amber-brand)]"
              >
                <img
                  src={o.image}
                  alt={o.imageAlt}
                  loading="lazy"
                  width={160}
                  height={160}
                  className="h-24 w-24 shrink-0 object-cover"
                />
                <div>
                  <div className="font-mono-tag text-[10px] text-[color:var(--amber-brand)]">
                    {o.category}
                  </div>
                  <div className="mt-1 font-display text-2xl font-extrabold uppercase">
                    {o.name}
                  </div>
                  <div className="mt-2 font-mono-tag text-xs text-[color:var(--linen)]/50">
                    From ${o.rateDay}/day
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
