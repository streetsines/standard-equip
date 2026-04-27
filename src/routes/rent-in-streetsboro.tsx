import { createFileRoute } from "@tanstack/react-router";
import { LocalRentCityPage } from "@/components/LocalRentCityPage";

const desc =
  "Equipment rental near Streetsboro, OH: Kubota loaders, KX mini excavators & industrial water trucks. Typical 45-minute lead time direct via Rt 303 from our Hudson yard to Portage County jobsites.";

export const Route = createFileRoute("/rent-in-streetsboro")({
  head: () => ({
    meta: [
      { title: "Equipment Rental Streetsboro OH | Kubota & Water Trucks — Standard Rents" },
      { name: "description", content: desc },
      { property: "og:title", content: "Rent Equipment in Streetsboro OH | Standard Rents" },
      { property: "og:description", content: desc },
    ],
  }),
  component: Page,
});

function Page() {
  return <LocalRentCityPage cityDisplay="Streetsboro" />;
}
