import { Outlet, createRootRoute, HeadContent, Scripts, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuoteDrawer } from "@/components/QuoteDrawer";
import { buildSeoJsonLdScriptInnerHtml } from "@/lib/jsonLd";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[color:var(--pitch)] px-4 text-[color:var(--linen)]">
      <div className="max-w-md text-center">
        <div className="flex justify-center">
          <Logo size={48} variant="amber" className="opacity-95" />
        </div>
        <div className="mt-8 font-mono-tag text-xs text-[color:var(--amber-brand)]">ERROR · 404</div>
        <h1 className="mt-3 font-display text-7xl font-extrabold uppercase">Off Route</h1>
        <p className="mt-3 text-sm text-[color:var(--linen)]/60">
          The page you're looking for isn't on the manifest.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center bg-[color:var(--amber-brand)] px-6 py-3 font-display text-sm font-extrabold uppercase tracking-[0.2em] text-[color:var(--pitch)] hover:bg-[color:var(--linen)]"
        >
          Back to Yard
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Standard Rents — Heavy Equipment Rental in Northeast Ohio" },
      {
        name: "description",
        content:
          "Water trucks, skid steers, and mini excavators. Built to work as hard as you do. Fast dispatch in Hudson, Stow, and Tallmadge, OH.",
      },
      { name: "author", content: "Standard Rents" },
      { property: "og:title", content: "Standard Rents — Heavy Equipment Rental in Northeast Ohio" },
      {
        property: "og:description",
        content:
          "Precision-ready water trucks, skid steers, and mini excavators for immediate dispatch in Northeast Ohio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Standard Rents — Heavy Equipment Rental in Northeast Ohio" },
      {
        name: "twitter:description",
        content:
          "Kubota & water truck rental from Hudson, OH. Dispatch to Summit, Portage & Cuyahoga counties.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/favicon.svg" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: buildSeoJsonLdScriptInnerHtml() }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="flex min-h-screen flex-col bg-[color:var(--linen)]">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <QuoteDrawer />
    </div>
  );
}
