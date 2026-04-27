import waterTruck from "@/assets/water-truck.jpg";
import skidSteer from "@/assets/skid-steer.jpg";
import miniExcavator from "@/assets/mini-excavator.jpg";

export type Equipment = {
  id: string;
  slug: string;
  name: string;
  category: string;
  tagline: string;
  focus: string;
  description: string;
  /** When set, used for `<title>` and `og:title` on the detail page */
  metaTitle?: string;
  /** When set, used for meta description / OG (can differ from on-page body) */
  metaDescription?: string;
  /** SEO / accessibility — include model + location */
  imageAlt: string;
  image: string;
  rateDay: number;
  rateWeek: number;
  rateMonth: number;
  specs: { label: string; value: string }[];
  bestFor: string[];
  unitCode: string;
  /** Local SEO callout shown below specs on the detail page only */
  detailCallout?: string;
};

export const equipment: Equipment[] = [
  {
    id: "water-truck-4k",
    slug: "water-trucks",
    name: "Water Trucks",
    category: "Site Support",
    tagline: "Dust Control & Site Support",
    focus: "Dust Control",
    metaTitle: "4,000 Gallon Water Truck Rental Hudson OH | Dust Suppression | Standard Rents",
    metaDescription:
      "Rent industrial-grade water trucks for EPA-compliant dust suppression and compaction water. 4,000-gallon capacity, front/rear spray bars. Same-day dispatch from Hudson to Twinsburg and Streetsboro.",
    description:
      "Our 4,000-gallon water trucks are built for the heavy demands of Northeast Ohio roadwork, demolition, and large-scale earthmoving. Equipped with front and rear spray bars, they are the local standard for EPA-compliant dust suppression and compaction water delivery.",
    imageAlt:
      "4,000 gallon water truck for dust suppression and EPA-compliant compaction water rental in Hudson, Ohio",
    image: waterTruck,
    rateDay: 685,
    rateWeek: 2740,
    rateMonth: 8220,
    unitCode: "SR-WT-4K",
    specs: [
      { label: "Capacity", value: "4,000 GAL" },
      { label: "Spray", value: "Front + Rear" },
      { label: "GVW", value: "33,000 LB" },
      { label: "CDL", value: "Class B" },
    ],
    bestFor: [
      "Road Construction",
      "Site Prep",
      "Hydro-seeding Support",
      "Dust suppression",
      "Compaction water",
      "Demolition",
    ],
    detailCallout:
      "Fast dispatch to industrial zones in Twinsburg (44087) and high-growth sites in Streetsboro (44241) from our central Hudson yard.",
  },
  {
    id: "skid-steer-s76",
    slug: "skid-steers",
    name: "Skid Steers",
    category: "Earthmoving",
    tagline: "Kubota SVL Series Track Loaders",
    focus: "Versatility",
    metaTitle: "Kubota Skid Steer Rental Hudson OH | SVL75-3 Track Loaders | Standard Rents",
    metaDescription:
      "Rent Kubota SVL series track loaders for professional grading, site prep, and material handling. Powerful, high-lift machines dispatched hourly from Hudson to Stow and Akron.",
    description:
      "Featuring the Kubota SVL75-3, our track loaders provide the stability and breakout force required for Northeast Ohio's heavy clay and rocky terrain. Ideal for site grading, land clearing, and material handling, these machines are compatible with all universal attachments.",
    imageAlt:
      "Kubota SVL75-3 track loader for rent in Hudson Ohio — site preparation and grading in Summit County",
    image: skidSteer,
    rateDay: 385,
    rateWeek: 1450,
    rateMonth: 4150,
    unitCode: "SR-SS-SVL",
    specs: [
      { label: "Series", value: "Kubota SVL" },
      { label: "Model", value: "SVL75-3" },
      { label: "Lift", value: "3,400 LB" },
      { label: "HP", value: "74 HP" },
      { label: "Attach", value: "Universal" },
    ],
    bestFor: [
      "Finish Grading",
      "Forestry Mulching",
      "Post-Hole Digging",
      "Site preparation",
      "Land clearing",
      "Material handling",
    ],
  },
  {
    id: "mini-ex-35z",
    slug: "mini-excavators",
    name: "Mini Excavators",
    category: "Trenching & Digging",
    tagline: "Precise Trenching & Digging",
    focus: "Precision",
    metaTitle: "Kubota Mini Excavator Rental Hudson OH | KX-Series Digging | Standard Rents",
    metaDescription:
      "Precision Kubota mini excavators for trenching, septic repair, and utility work. Compact design for tight-access jobsites in Hudson, Macedonia, and Aurora.",
    description:
      "Our Kubota KX-Series mini excavators deliver precision and power for tight-access jobsites. Perfect for utility trenching, septic system repair, and foundation digging, these machines offer the reach and depth needed for professional-grade site work.",
    imageAlt:
      "Kubota KX-Series mini excavator for utility trenching and septic repair rental in Hudson Ohio",
    image: miniExcavator,
    rateDay: 425,
    rateWeek: 1620,
    rateMonth: 4680,
    unitCode: "SR-EX-KX",
    specs: [
      { label: "Series", value: "KX" },
      { label: "Weight", value: "7,700 LB" },
      { label: "Dig Depth", value: "10' 6\"" },
      { label: "Tail", value: "Zero Swing" },
    ],
    bestFor: [
      "Septic Repair",
      "Utility Lines",
      "Pool Demolition",
      "Utility trenching",
      "Tight access",
      "Foundation digging",
    ],
    detailCallout:
      "Same-day transport available for residential site work in Aurora and Macedonia.",
  },
];

export function getEquipmentBySlug(slug: string) {
  return equipment.find((e) => e.slug === slug);
}
