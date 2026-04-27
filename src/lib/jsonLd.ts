import { equipment } from "@/lib/equipment";
import { SITE_ORIGIN, SITE_PHONE_TEL } from "@/lib/site";

function absoluteAssetUrl(path: string) {
  const base = SITE_ORIGIN.replace(/\/$/, "");
  if (path.startsWith("http")) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

function localBusinessNode() {
  return {
    "@type": "LocalBusiness",
    name: "Standard Rents",
    description:
      "Heavy equipment rental — water trucks, Kubota skid steers, and mini excavators — dispatched from Hudson, OH to Summit, Portage, and Cuyahoga counties.",
    url: SITE_ORIGIN,
    telephone: SITE_PHONE_TEL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hudson",
      addressRegion: "OH",
      postalCode: "44236",
      addressCountry: "US",
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Summit County, Ohio" },
      { "@type": "AdministrativeArea", name: "Portage County, Ohio" },
      { "@type": "AdministrativeArea", name: "Cuyahoga County, Ohio" },
    ],
    priceRange: "$$$",
  };
}

function productNodes() {
  return equipment.map((item) => ({
    "@type": "Product",
    name: `${item.name} rental — Standard Rents`,
    description: item.description,
    image: absoluteAssetUrl(item.image),
    brand: {
      "@type": "Brand",
      name:
        item.slug === "skid-steers" || item.slug === "mini-excavators" ? "Kubota" : "Standard Rents",
    },
    sku: item.unitCode,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: item.rateDay,
      priceValidUntil: new Date(Date.now() + 86400000 * 90).toISOString().slice(0, 10),
      availability: "https://schema.org/InStock",
      url: `${SITE_ORIGIN.replace(/\/$/, "")}/equipment/${item.slug}`,
    },
  }));
}

/** Single JSON-LD script for LocalBusiness + Product fleet */
export function buildSeoJsonLdScriptInnerHtml() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [localBusinessNode(), ...productNodes()],
  });
}
