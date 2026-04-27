import { createFileRoute } from "@tanstack/react-router";
import { LocalRentCityPage } from "@/components/LocalRentCityPage";

const desc =
  "Heavy equipment rental near Macedonia, OH — Kubota SVL track loaders, KX-Series excavators, and EPA-compliant water trucks. Typical 60-minute lead time via Rt 303 / I-271 from our Hudson yard.";

export const Route = createFileRoute("/rent-in-macedonia")({
  head: () => ({
    meta: [
      { title: "Equipment Rental Macedonia OH | Kubota & Water Trucks — Standard Rents" },
      { name: "description", content: desc },
      { property: "og:title", content: "Rent Equipment in Macedonia OH | Standard Rents" },
      { property: "og:description", content: desc },
    ],
  }),
  component: Page,
});

function Page() {
  return <LocalRentCityPage cityDisplay="Macedonia" />;
}
