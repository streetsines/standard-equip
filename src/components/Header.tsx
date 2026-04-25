import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { useQuoteStore } from "@/lib/quoteStore";
import { Phone } from "lucide-react";

export function Header() {
  const count = useQuoteStore((s) => s.items.length);
  const open = useQuoteStore((s) => s.open);

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--pitch)]/10 bg-[color:var(--linen)]/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="shrink-0">
          <Logo size={36} variant="pitch" />
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {[
            { to: "/", label: "Fleet" },
            { to: "/service-area", label: "Service Area" },
            { to: "/commercial", label: "Commercial" },
            { to: "/contact", label: "Contact" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="font-display text-sm font-medium uppercase tracking-[0.22em] text-[color:var(--pitch)] transition-colors hover:text-[color:var(--amber-deep)]"
              activeProps={{ className: "text-[color:var(--amber-deep)]" }}
              activeOptions={{ exact: true }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:18007826327"
            className="hidden items-center gap-2 font-mono-tag text-xs text-[color:var(--pitch)] lg:flex"
          >
            <Phone className="h-3.5 w-3.5" /> 1-800-STANDARD
          </a>
          <button
            onClick={open}
            className="group relative inline-flex items-center gap-3 bg-[color:var(--pitch)] px-5 py-3 text-[color:var(--linen)] transition-all hover:bg-[color:var(--amber-brand)] hover:text-[color:var(--pitch)]"
          >
            <span className="font-display text-sm font-extrabold uppercase tracking-[0.18em]">
              Quote
            </span>
            <span className="flex h-6 min-w-6 items-center justify-center bg-[color:var(--amber-brand)] px-1.5 font-mono-tag text-[10px] font-bold text-[color:var(--pitch)] group-hover:bg-[color:var(--pitch)] group-hover:text-[color:var(--amber-brand)]">
              {count.toString().padStart(2, "0")}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
