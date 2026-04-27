import { equipment } from "@/lib/equipment";
import { EquipmentCard } from "@/components/EquipmentCard";
import { ShieldCheck, Truck, Zap } from "lucide-react";

export function FleetTrustStrip({ className = "" }: { className?: string }) {
  return (
    <div
      className={`grid gap-px overflow-hidden bg-[color:var(--pitch)]/10 md:grid-cols-3 ${className}`}
    >
      {[
        { Icon: Zap, k: "Same-Day Dispatch", v: "Order by 2pm, work by 5." },
        { Icon: ShieldCheck, k: "Inspected & Insured", v: "DOT compliant. Worry-free." },
        { Icon: Truck, k: "Local Delivery", v: "We deliver to your jobsite." },
      ].map(({ Icon, k, v }) => (
        <div key={k} className="flex items-start gap-4 bg-[color:var(--linen)] p-6">
          <div className="grid h-12 w-12 shrink-0 place-items-center bg-[color:var(--pitch)] text-[color:var(--amber-brand)]">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <div className="font-display text-lg font-extrabold uppercase text-[color:var(--pitch)]">
              {k}
            </div>
            <div className="text-sm text-[color:var(--muted-foreground)]">{v}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function FleetSection() {
  return (
    <section id="fleet" className="bg-[color:var(--linen)] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="eyebrow text-[color:var(--amber-deep)]">
              ── The Fleet · 03 Categories
            </div>
            <h2 className="mt-4 font-display text-6xl font-extrabold uppercase leading-[0.85] text-[color:var(--pitch)] md:text-8xl">
              Pick your <br />
              <span className="font-extralight italic">weapon.</span>
            </h2>
          </div>
          <p className="max-w-md text-base text-[color:var(--muted-foreground)]">
            Every machine in our yard is inspected, fueled, and ready to roll.
            No excuses. No downtime. Just <strong>uptime</strong>.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {equipment.map((item, i) => (
            <EquipmentCard key={item.id} item={item} index={i} />
          ))}
        </div>

        <FleetTrustStrip className="mt-16" />
      </div>
    </section>
  );
}
