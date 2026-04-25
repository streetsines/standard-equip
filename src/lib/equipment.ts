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
  image: string;
  rateDay: number;
  rateWeek: number;
  rateMonth: number;
  specs: { label: string; value: string }[];
  bestFor: string[];
  unitCode: string;
};

export const equipment: Equipment[] = [
  {
    id: "water-truck-4k",
    slug: "water-trucks",
    name: "Water Trucks",
    category: "Site Support",
    tagline: "Dust Control & Site Support",
    focus: "Dust Control",
    description:
      "4,000-gallon tank capacity with front and rear spray bars. EPA-compliant dust suppression for road work, demolition, and earthmoving operations.",
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
    bestFor: ["Dust suppression", "Compaction water", "Road work", "Demolition"],
  },
  {
    id: "skid-steer-s76",
    slug: "skid-steers",
    name: "Skid Steers",
    category: "Earthmoving",
    tagline: "Versatile Earthmoving",
    focus: "Versatility",
    description:
      "Bobcat-class compact loaders with universal quick-attach. From grading and grappling to snow and trenching — one machine, twenty jobs.",
    image: skidSteer,
    rateDay: 385,
    rateWeek: 1450,
    rateMonth: 4150,
    unitCode: "SR-SS-S76",
    specs: [
      { label: "Lift", value: "3,400 LB" },
      { label: "HP", value: "74 HP" },
      { label: "Bucket", value: "72\"" },
      { label: "Attach", value: "Universal" },
    ],
    bestFor: ["Grading", "Material handling", "Demo cleanup", "Snow removal"],
  },
  {
    id: "mini-ex-35z",
    slug: "mini-excavators",
    name: "Mini Excavators",
    category: "Trenching & Digging",
    tagline: "Precise Trenching & Digging",
    focus: "Precision",
    description:
      "3.5-ton zero-tail-swing excavators. Tight access, surgical precision. Perfect for utilities, landscaping, and tight residential lots.",
    image: miniExcavator,
    rateDay: 425,
    rateWeek: 1620,
    rateMonth: 4680,
    unitCode: "SR-EX-35Z",
    specs: [
      { label: "Weight", value: "7,700 LB" },
      { label: "Dig Depth", value: "10' 6\"" },
      { label: "Reach", value: "16' 4\"" },
      { label: "Tail", value: "Zero Swing" },
    ],
    bestFor: ["Utility trenching", "Foundations", "Landscaping", "Stump removal"],
  },
];

export function getEquipmentBySlug(slug: string) {
  return equipment.find((e) => e.slug === slug);
}
