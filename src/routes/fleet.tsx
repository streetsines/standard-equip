import { createFileRoute } from "@tanstack/react-router";
import { equipment } from "@/lib/equipment";
import { EquipmentCard } from "@/components/EquipmentCard";
import { FleetTrustStrip } from "@/components/FleetSection";
import fleetBannerImg from "@/assets/marketing-site-fog.jpg";

const fleetDescription =
  "Northeast Ohio's premium fleet: 4,000-gallon water trucks, Kubota SVL75-2 compact track loaders, and Kubota KX057-4 mini excavators. Same-day dispatch from Hudson, OH 44236 to Twinsburg, Streetsboro, Summit & Portage counties.";

export const Route = createFileRoute("/fleet")({
  head: () => ({
    meta: [
      {
        title:
          "Equipment Fleet — Water Trucks, Kubota Loaders & Mini Excavators | Standard Rents Hudson OH",
      },
      { name: "description", content: fleetDescription },
      {
        property: "og:title",
        content: "Premium Equipment Fleet — Standard Rents | Northeast Ohio",
      },
      { property: "og:description", content: fleetDescription },
    ],
  }),
  component: FleetPage,
});

function FleetPage() {
  return (
    <div className="bg-[color:var(--linen)]">
      <section className="border-b border-[color:var(--linen)]/10 bg-[color:var(--pitch)] py-16 text-[color:var(--linen)] md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="eyebrow text-[color:var(--amber-brand)]">── Standard Rents · Hudson yard</div>
          <h1 className="mt-4 max-w-4xl font-display text-5xl font-extrabold uppercase leading-[0.88] md:text-7xl">
            Northeast Ohio&apos;s Premium Equipment Fleet
          </h1>
          <p className="mt-6 max-w-2xl text-base text-[color:var(--linen)]/75 md:text-lg">
            Available for same-day dispatch from our Hudson yard to Twinsburg, Streetsboro, and
            beyond.
          </p>
        </div>
      </section>

      <div className="relative h-56 w-full overflow-hidden md:h-72 lg:h-80">
        <img
          src={fleetBannerImg}
          alt="Standard Rents jobsite — branded trailer and Kubota loader in early fog"
          width={1920}
          height={1080}
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[color:var(--pitch)]/25" />
      </div>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {equipment.map((item, i) => (
              <EquipmentCard key={item.id} item={item} index={i} />
            ))}
          </div>
          <FleetTrustStrip className="mt-16" />
        </div>
      </section>
    </div>
  );
}
