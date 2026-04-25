import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Standard Rents · Northeast Ohio Dispatch" },
      {
        name: "description",
        content:
          "Reach Standard Rents dispatch 24/7 for heavy equipment rental in Hudson, Stow, Tallmadge and beyond.",
      },
      { property: "og:title", content: "Contact — Standard Rents" },
      {
        property: "og:description",
        content: "Reach dispatch 24/7. We answer the phone.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="bg-[color:var(--pitch)] py-24 text-[color:var(--linen)]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="font-mono-tag text-xs text-[color:var(--amber-brand)]">
          ── DISPATCH · 24/7
        </div>
        <h1 className="mt-4 font-display text-7xl font-extrabold uppercase leading-[0.82] md:text-9xl">
          Get in <br />
          <span className="text-[color:var(--amber-brand)]">touch.</span>
        </h1>
        <p className="mt-8 max-w-xl text-lg text-[color:var(--linen)]/70">
          Phones answered by humans, not bots. Most quotes returned within the
          hour.
        </p>

        <div className="mt-16 grid gap-px bg-[color:var(--linen)]/10 md:grid-cols-2">
          {[
            {
              Icon: Phone,
              k: "Call Dispatch",
              v: "1-800-STANDARD",
              s: "24/7 — we answer the phone",
              href: "tel:18007826327",
            },
            {
              Icon: Mail,
              k: "Email",
              v: "jake@standardrents.com",
              s: "Replies within 1 business hour",
              href: "mailto:jake@standardrents.com",
            },
            {
              Icon: MapPin,
              k: "The Yard",
              v: "Hudson, Ohio",
              s: "Open Mon–Sat · 6a–7p",
            },
            {
              Icon: Clock,
              k: "After Hours",
              v: "Emergency Line",
              s: "Same number · select option 9",
            },
          ].map(({ Icon, k, v, s, href }) => {
            const Inner = (
              <>
                <Icon className="h-6 w-6 text-[color:var(--amber-brand)]" />
                <div className="mt-6 font-mono-tag text-[10px] uppercase text-[color:var(--linen)]/50">
                  {k}
                </div>
                <div className="mt-2 font-display text-3xl font-extrabold uppercase leading-none">
                  {v}
                </div>
                <div className="mt-2 text-sm text-[color:var(--linen)]/60">{s}</div>
              </>
            );
            return href ? (
              <a key={k} href={href} className="block bg-[color:var(--pitch)] p-10 transition-colors hover:bg-[color:var(--pitch-elevated)]">
                {Inner}
              </a>
            ) : (
              <div key={k} className="bg-[color:var(--pitch)] p-10">{Inner}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
