import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { useQuoteStore } from "@/lib/quoteStore";
import { SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from "@/lib/site";
import { Phone } from "lucide-react";

const nav = [
  { to: "/fleet", label: "Fleet", exact: true },
  { to: "/service-area", label: "Service Area", exact: true },
  { to: "/commercial", label: "Commercial", exact: true },
  { to: "/contact", label: "Contact", exact: true },
] as const;

export function Header() {
  const count = useQuoteStore((s) => s.items.length);
  const open = useQuoteStore((s) => s.open);

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--pitch)]/10 bg-[color:var(--linen)]/90 backdrop-blur-md">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:px-6 sm:py-3 md:h-20 md:py-0">
        <Link
          to="/"
          className="shrink-0 outline-none ring-[color:var(--amber-brand)]/40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--linen)]"
          aria-label="Standard Rents — Home"
        >
          <Logo size={42} variant="pitch" className="max-sm:gap-2" />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {nav.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="font-display text-sm font-medium uppercase tracking-[0.22em] text-[color:var(--pitch)] transition-colors hover:text-[color:var(--amber-deep)]"
              activeProps={{ className: "text-[color:var(--amber-deep)]" }}
              activeOptions={{ exact: l.exact }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href={`tel:${SITE_PHONE_TEL}`}
            className="inline-flex items-center gap-1.5 rounded-sm border border-[color:var(--pitch)]/15 bg-[color:var(--pitch)]/5 px-2.5 py-2 font-mono-tag text-[10px] font-bold uppercase tracking-wide text-[color:var(--pitch)] transition-colors hover:border-[color:var(--amber-brand)] hover:text-[color:var(--amber-brand)] md:hidden"
          >
            <Phone className="h-3.5 w-3.5" />
            Call
          </a>
          <a
            href={`tel:${SITE_PHONE_TEL}`}
            className="hidden items-center gap-2 font-mono-tag text-xs text-[color:var(--pitch)] md:inline-flex"
          >
            <Phone className="h-3.5 w-3.5" /> {SITE_PHONE_DISPLAY}
          </a>
          <button
            type="button"
            onClick={open}
            className="group relative inline-flex min-h-11 min-w-[7.5rem] items-center justify-center gap-2 bg-[color:var(--amber-brand)] px-4 py-2.5 text-[color:var(--pitch)] shadow-md ring-2 ring-[color:var(--amber-brand)]/30 transition-all hover:bg-[color:var(--pitch)] hover:text-[color:var(--linen)] hover:ring-[color:var(--pitch)]/20 sm:min-h-12 sm:gap-3 sm:px-5 sm:py-3 md:min-h-0 md:shadow-none md:ring-0"
          >
            <span className="font-display text-xs font-extrabold uppercase tracking-[0.16em] sm:text-sm sm:tracking-[0.18em]">
              Quote
            </span>
            <span className="flex h-6 min-w-6 items-center justify-center bg-[color:var(--pitch)] px-1.5 font-mono-tag text-[10px] font-bold text-[color:var(--amber-brand)] group-hover:bg-[color:var(--amber-brand)] group-hover:text-[color:var(--pitch)]">
              {count.toString().padStart(2, "0")}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
