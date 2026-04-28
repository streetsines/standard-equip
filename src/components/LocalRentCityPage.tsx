import { Link } from "@tanstack/react-router";
import { FleetSection } from "@/components/FleetSection";
import { CommercialAccounts, CtaStrip, ServiceArea } from "@/components/HomeMarketingSections";
import { quoteApi } from "@/lib/quoteStore";
import { serviceAreaCityByName } from "@/lib/serviceArea";
import heroImg from "@/assets/marketing-site-fog.jpg";
import { ArrowRight } from "lucide-react";

type LocalRentCityPageProps = {
  /** City name for headings and copy, e.g. "Twinsburg" */
  cityDisplay: string;
};

export function LocalRentCityPage({ cityDisplay }: LocalRentCityPageProps) {
  const area = serviceAreaCityByName(cityDisplay);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[color:var(--pitch)] text-[color:var(--linen)]">
        <img
          src={heroImg}
          alt={`Standard Rents equipment yard — foggy morning scene with Kubota machinery; dispatch serving ${cityDisplay}, Ohio from Hudson`}
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--pitch)]/40 via-[color:var(--pitch)]/70 to-[color:var(--pitch)]" />
        <div className="hex-pattern absolute inset-0 opacity-40 mix-blend-screen" />

        <div className="relative mx-auto flex min-h-[72vh] max-w-7xl flex-col justify-center px-6 py-24">
          <div className="mb-6 inline-flex items-center gap-3 border border-[color:var(--amber-brand)]/40 bg-[color:var(--amber-brand)]/10 px-4 py-2">
            <span className="h-1.5 w-1.5 bg-[color:var(--amber-brand)]" />
            <span className="font-mono-tag text-[10px] uppercase tracking-[0.2em] text-[color:var(--amber-brand)]">
              Hudson yard dispatch · {cityDisplay}, OH
            </span>
          </div>
          <h1 className="max-w-4xl font-display text-[clamp(2.5rem,8vw,6rem)] font-extrabold uppercase leading-[0.88] tracking-[0.01em]">
            Heavy equipment rental in{" "}
            <span className="text-[color:var(--amber-brand)]">{cityDisplay}</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-[color:var(--linen)]/85 md:text-lg">
            Same-day Kubota skid steers, mini excavators, and industrial water trucks — typical{" "}
            <strong className="text-[color:var(--linen)]">
              {area?.lead ?? "45–60 min"} yard-to-jobsite lead time
            </strong>{" "}
            from our Hudson, OH 44236 yard
            {area?.note ? (
              <>
                {" "}
                ({area.note}) to jobsites near {cityDisplay} and across Summit & Portage counties.
              </>
            ) : (
              <> to jobsites near {cityDisplay} and across Summit & Portage counties.</>
            )}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={quoteApi.open}
              className="group inline-flex items-center justify-center gap-3 bg-[color:var(--amber-brand)] px-8 py-5 font-display text-sm font-extrabold uppercase tracking-[0.22em] text-[color:var(--pitch)] transition-all hover:bg-[color:var(--linen)]"
            >
              Build a Quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <Link
              to="/fleet"
              className="group inline-flex items-center justify-center gap-3 border border-[color:var(--linen)]/30 px-8 py-5 font-display text-sm font-extrabold uppercase tracking-[0.22em] text-[color:var(--linen)] transition-all hover:border-[color:var(--amber-brand)] hover:text-[color:var(--amber-brand)]"
            >
              View Fleet
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <FleetSection />
      <ServiceArea />
      <CommercialAccounts />
      <CtaStrip />
    </>
  );
}
