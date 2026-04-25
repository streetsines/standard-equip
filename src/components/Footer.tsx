import { Logo } from "./Logo";

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
              <li>Water Trucks</li>
              <li>Skid Steers</li>
              <li>Mini Excavators</li>
              <li>Attachments</li>
            </ul>
          </div>

          <div>
            <div className="eyebrow text-[color:var(--amber-brand)]">Service Area</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Hudson, OH</li>
              <li>Stow, OH</li>
              <li>Tallmadge, OH</li>
              <li>Greater Akron</li>
            </ul>
          </div>

          <div>
            <div className="eyebrow text-[color:var(--amber-brand)]">Dispatch</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>1-800-STANDARD</li>
              <li>jake@standardrents.com</li>
              <li>Mon–Sat · 6a–7p</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-[color:var(--linen)]/10 pt-8 text-xs text-[color:var(--linen)]/50 md:flex-row md:items-center">
          <div className="font-mono-tag">© {new Date().getFullYear()} STANDARD RENTS · EST. 2024</div>
          <div className="font-mono-tag">SR-NE-OH · DOT 4821</div>
        </div>
      </div>
    </footer>
  );
}
