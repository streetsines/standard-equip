import waterTruck from "@/assets/water-truck.jpg";
import skidSteer from "@/assets/skid-steer.jpg";
import miniExcavator from "@/assets/mini-excavator.jpg";

export type Equipment = {
  id: string;
  slug: string;
  /** Specific model or spec (e.g. Kubota SVL75-2) */
  name: string;
  /** Plain-language label for renters who do not know model codes */
  commonName: string;
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
    name: "4,000-Gal Water Truck",
    commonName: "Water truck (tanker)",
    category: "Site Support",
    tagline: "Dust suppression & compaction water",
    focus: "Dust Control",
    metaTitle: "4,000 Gallon Water Truck Rental Hudson OH | Dust Suppression | Standard Rents",
    metaDescription:
      "Rent a 4,000-gallon water truck for EPA-minded dust suppression and compaction water. Spray bars, pumps, and chassis vary by unit, but tank capacity is always 4,000 gallons. Dispatch from Hudson to Twinsburg and Streetsboro.",
    description:
      "This rental is defined by a 4,000-gallon tank — the size crews ask for on road jobs, demolition, and large pads. Spray hardware (front/rear bars, pumps, and valves) and truck chassis can differ by availability, but you always get 4,000 gallons of on-site water for dust control, compaction passes, and hydro-seeding support.",
    imageAlt:
      "4,000-gallon construction water truck for dust suppression and compaction water rental from Standard Rents in Hudson Ohio",
    image: waterTruck,
    rateDay: 685,
    rateWeek: 2740,
    rateMonth: 8220,
    unitCode: "SR-WT-4K",
    specs: [
      { label: "Tank", value: "4,000 GAL" },
      { label: "Spray", value: "Front + rear bars" },
      { label: "Typical use", value: "Dust + compaction" },
      { label: "CDL", value: "Usually Class B" },
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
    name: "Kubota SVL75-2",
    commonName: "Skid steer / compact track loader",
    category: "Earthmoving",
    tagline: "Compact track loader · rental workhorse",
    focus: "Versatility",
    metaTitle: "Kubota SVL75-2 Track Loader Rental Hudson OH | SVL75-2 CTL | Standard Rents",
    metaDescription:
      "Rent the Kubota SVL75-2 compact track loader for grading, site prep, and material handling. ~74 HP class, high ROC for clay and stone, universal attachments. Dispatch from Hudson to Stow and Akron.",
    description:
      "When contractors ask for a Kubota SVL75-2, they want the machine that balances everyday rental demand with real capability: stable tracks on Northeast Ohio clay and stone, strong breakout for land clearing and pads, and universal skid-attach compatibility for buckets, forks, grapples, and more. This is the specific model we quote for SVL compact track loader rentals.",
    imageAlt:
      "Kubota SVL75-2 compact track loader for rent in Hudson Ohio — grading and site prep in Summit County",
    image: skidSteer,
    rateDay: 385,
    rateWeek: 1450,
    rateMonth: 4150,
    unitCode: "SR-SS-SVL75-2",
    specs: [
      { label: "Make / model", value: "Kubota SVL75-2" },
      { label: "ROC (35%)", value: "2,640 LB" },
      { label: "Engine", value: "~74 HP" },
      { label: "Op. weight", value: "~10,460 LB" },
      { label: "Attach", value: "Universal skid" },
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
    name: "Kubota KX057-4",
    commonName: "Mini excavator",
    category: "Trenching & Digging",
    tagline: "6-ton class · tight jobsites",
    focus: "Precision",
    metaTitle: "Kubota KX057-4 Mini Excavator Rental Hudson OH | KX057-4 Digging | Standard Rents",
    metaDescription:
      "Rent the Kubota KX057-4 mini excavator for trenching, septic, utilities, and footers. ~13 ft dig depth class, tight-radius tail swing for alleys and back yards. Hudson dispatch to Macedonia and Summit County.",
    description:
      "The Kubota KX057-4 is the mini most crews request when they outgrow a 3-ton but do not want a full-size hoe: enough stick and power for utility trenching, septic runs, footers, and pool digs, with a tight tail swing for working along foundations and fence lines. This is the specific model we quote for KX mini-excavator rentals.",
    imageAlt:
      "Kubota KX057-4 class mini excavator digging a trench on a Northeast Ohio construction site — utility and septic rental from Hudson Ohio",
    image: miniExcavator,
    rateDay: 425,
    rateWeek: 1620,
    rateMonth: 4680,
    unitCode: "SR-EX-KX057-4",
    specs: [
      { label: "Make / model", value: "Kubota KX057-4" },
      { label: "Op. weight", value: "~12,565 LB" },
      { label: "Max dig depth", value: "~13' 1\"" },
      { label: "Tail swing", value: "Tight-radius" },
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
      "Same-day transport for tight-access digs in Macedonia, Twinsburg, and residential streets around Hudson.",
  },
];

export function getEquipmentBySlug(slug: string) {
  return equipment.find((e) => e.slug === slug);
}
