import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { equipment } from "@/lib/equipment";
import { SITE_EMAIL, SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from "@/lib/site";
import { SERVICE_AREA_PROXIMITY_HOOK } from "@/lib/serviceArea";

const serviceAreaLinks = [
  { to: "/service-area" as const, label: "Hudson" },
  { to: "/rent-in-streetsboro" as const, label: "Streetsboro" },
  { to: "/rent-in-twinsburg" as const, label: "Twinsburg" },
  { to: "/service-area" as const, label: "Stow" },
  { to: "/rent-in-macedonia" as const, label: "Macedonia" },
  { to: "/service-area" as const, label: "Tallmadge" },
] as const;

export function Footer() {
  return (
    <footer className="hex-pattern text-[color:var(--linen)]">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo size={42} variant="amber" />
            <p className="mt-6 max-w-sm text-sm text-[color:var(--linen)]/70">
              Built to work as hard as you do. Heavy equipment rental for Northeast Ohio
              contractors and crews who can't afford downtime.
            </p>
          </div>

          <div>
            <div className="eyebrow text-[color:var(--amber-brand)]">Fleet</div>
            <ul className="mt-4 space-y-2 text-sm">
              {equipment.map((e) => (
                <li key={e.slug}>
                  <Link
                    to="/equipment/$slug"
                    params={{ slug: e.slug }}
                    className="text-[color:var(--linen)]/80 transition-colors hover:text-[color:var(--amber-brand)]"
                  >
                    {e.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/fleet"
                  className="text-[color:var(--linen)]/80 transition-colors hover:text-[color:var(--amber-brand)]"
                >
                  View all fleet
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="eyebrow text-[color:var(--amber-brand)]">Service Area</div>
            <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2 font-mono-tag text-[11px] uppercase tracking-wide">
              {serviceAreaLinks.map((l) => (
                <li key={`${l.to}-${l.label}`}>
                  <Link
                    to={l.to}
                    className="text-[color:var(--linen)]/55 underline decoration-[color:var(--linen)]/20 underline-offset-2 transition-colors hover:text-[color:var(--amber-brand)] hover:decoration-[color:var(--amber-brand)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-xs text-[11px] leading-relaxed text-[color:var(--linen)]/55">
              {SERVICE_AREA_PROXIMITY_HOOK}
            </p>
          </div>

          <div>
            <div className="eyebrow text-[color:var(--amber-brand)]">Dispatch</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={`tel:${SITE_PHONE_TEL}`}
                  className="font-display text-sm font-extrabold uppercase tracking-wide text-[color:var(--linen)] underline-offset-2 hover:text-[color:var(--amber-brand)] hover:underline"
                >
                  {SITE_PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_EMAIL}`}
                  className="underline-offset-2 hover:underline"
                >
                  {SITE_EMAIL}
                </a>
              </li>
              <li>Mon–Sat · 6a–7p</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-[color:var(--linen)]/10 pt-8 text-xs text-[color:var(--linen)]/50 md:flex-row md:items-center">
          <div className="font-mono-tag">© {new Date().getFullYear()} STANDARD RENTS · EST. 2024</div>
          <div className="font-mono-tag">SR-NE-OH · DOT 4821 · Hudson, OH 44236</div>
        </div>
      </div>
    </footer>
  );
}
