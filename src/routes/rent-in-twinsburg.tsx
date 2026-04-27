import { createFileRoute } from "@tanstack/react-router";
import { LocalRentCityPage } from "@/components/LocalRentCityPage";

const desc =
  "Equipment rental near Twinsburg, OH: Kubota skid steers, mini excavators & 4,000 gallon water trucks. ~15-minute dispatch from our Hudson 44236 yard. Serving Summit & Portage counties.";

export const Route = createFileRoute("/rent-in-twinsburg")({
  head: () => ({
    meta: [
      { title: "Equipment Rental Twinsburg OH | Kubota & Water Trucks — Standard Rents" },
      { name: "description", content: desc },
      { property: "og:title", content: "Rent Equipment in Twinsburg OH | Standard Rents" },
      { property: "og:description", content: desc },
    ],
  }),
  component: Page,
});

function Page() {
  return <LocalRentCityPage cityDisplay="Twinsburg" />;
}
