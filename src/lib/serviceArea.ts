/** Shared service grid + logistics copy (service-area route, homepage teaser, SEO). */

export type ServiceAreaCity = {
  name: string;
  code: string;
  lead: string;
  note: string;
  /** Hudson HQ row styling */
  primary?: boolean;
};

/**
 * Competitive lead times — order matters (Hudson HQ, then 303/91 corridor cities first).
 */
export const SERVICE_AREA_CITIES: ServiceAreaCity[] = [
  { name: "Hudson", code: "44236", lead: "30 min", note: "HQ · Yard priority dispatch", primary: true },
  { name: "Streetsboro", code: "44241", lead: "45 min", note: "Direct via Rt 303" },
  { name: "Twinsburg", code: "44087", lead: "45 min", note: "Direct via Rt 91" },
  { name: "Stow", code: "44224", lead: "45 min", note: "Direct via Rt 91" },
  { name: "Macedonia", code: "44056", lead: "60 min", note: "via Rt 303 / I-271" },
  { name: "Cuyahoga Falls", code: "44221", lead: "60 min", note: "via Rt 8" },
  { name: "Tallmadge", code: "44278", lead: "60 min", note: "South on Rt 91" },
  { name: "Akron", code: "44308", lead: "75 min", note: "Commercial haul via Rt 8" },
];

/** First N rows for homepage “Local Delivery” grid (corridor + core). */
export const SERVICE_AREA_HOME_PREVIEW_COUNT = 5;

export const SERVICE_AREA_PROXIMITY_HOOK =
  "Based in Hudson, we offer the fastest transit in the county via the 303 and 91 corridors, reaching Streetsboro and Twinsburg jobsites in under 45 minutes.";

export function serviceAreaCityByName(name: string): ServiceAreaCity | undefined {
  return SERVICE_AREA_CITIES.find((c) => c.name === name);
}
