import { type Equipment } from "@/lib/equipment";
import { quoteApi } from "@/lib/quoteStore";
import { ArrowUpRight, Plus } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function EquipmentCard({ item, index }: { item: Equipment; index: number }) {
  return (
    <article className="group relative flex flex-col overflow-hidden border border-[color:var(--pitch)]/10 bg-[color:var(--pitch)] text-[color:var(--linen)]">
      {/* index strip */}
      <div className="absolute left-0 top-0 z-10 flex items-center gap-3 bg-[color:var(--amber-brand)] px-4 py-2 text-[color:var(--pitch)]">
        <span className="font-mono-tag text-[10px] font-bold">
          {String(index + 1).padStart(2, "0")} / 03
        </span>
        <span className="font-display text-[10px] font-extralight uppercase tracking-[0.3em]">
          {item.category}
        </span>
      </div>

      {/* image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[color:var(--pitch-elevated)]">
        <img
          src={item.image}
          alt={item.imageAlt}
          loading="lazy"
          width={1024}
          height={768}
          className="h-full w-full object-cover opacity-85 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--pitch)] via-[color:var(--pitch)]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="font-mono-tag text-[10px] text-[color:var(--amber-brand)]">
            {item.unitCode}
          </div>
          <h3 className="mt-1 font-display text-5xl font-extrabold uppercase leading-[0.85] tracking-wide text-[color:var(--linen)] md:text-6xl">
            {item.name}
          </h3>
          <p className="mt-2 font-display text-sm font-extralight uppercase tracking-[0.3em] text-[color:var(--amber-brand)]">
            {item.tagline}
          </p>
        </div>
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col gap-6 p-6">
        <p className="text-sm leading-relaxed text-[color:var(--linen)]/70">
          {item.description}
        </p>

        {/* specs grid */}
        <div className="grid grid-cols-2 gap-px bg-[color:var(--linen)]/10">
          {item.specs.map((s) => (
            <div key={s.label} className="bg-[color:var(--pitch)] p-3">
              <div className="font-mono-tag text-[9px] uppercase text-[color:var(--linen)]/40">
                {s.label}
              </div>
              <div className="mt-1 font-display text-lg font-extrabold text-[color:var(--linen)]">
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {/* rate */}
        <div className="flex items-end justify-between border-t border-[color:var(--linen)]/10 pt-5">
          <div>
            <div className="font-mono-tag text-[10px] uppercase text-[color:var(--linen)]/50">
              Day Rate
            </div>
            <div className="mt-1 font-display text-4xl font-extrabold text-[color:var(--amber-brand)]">
              ${item.rateDay}
              <span className="ml-1 text-base font-extralight text-[color:var(--linen)]/40">
                /day
              </span>
            </div>
          </div>
          <div className="text-right text-xs text-[color:var(--linen)]/50">
            <div>${item.rateWeek.toLocaleString()}/wk</div>
            <div>${item.rateMonth.toLocaleString()}/mo</div>
          </div>
        </div>

        {/* actions */}
        <div className="mt-auto grid grid-cols-[1fr_auto] gap-px bg-[color:var(--linen)]/10">
          <button
            onClick={() =>
              quoteApi.add({
                id: item.id,
                name: item.name,
                category: item.category,
                rateDay: item.rateDay,
              })
            }
            className="group/btn flex items-center justify-center gap-2 bg-[color:var(--amber-brand)] px-6 py-4 font-display text-sm font-extrabold uppercase tracking-[0.18em] text-[color:var(--pitch)] transition-all hover:bg-[color:var(--linen)]"
          >
            <Plus className="h-4 w-4" /> Add to Quote
          </button>
          <Link
            to="/equipment/$slug"
            params={{ slug: item.slug }}
            className="flex items-center justify-center bg-[color:var(--pitch-elevated)] px-5 text-[color:var(--linen)] transition-colors hover:bg-[color:var(--linen)] hover:text-[color:var(--pitch)]"
            aria-label={`View ${item.name} details`}
          >
            <ArrowUpRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
