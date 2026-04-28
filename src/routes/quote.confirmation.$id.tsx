import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { CheckCircle2, Phone, Mail, ArrowLeft, Calendar } from "lucide-react";
import { SITE_PHONE_TEL } from "@/lib/site";

type QuoteItemRow = {
  id: string;
  name: string;
  commonName?: string;
  category: string;
  rateDay: number;
  startDate: string;
  endDate: string;
};

const fetchQuote = createServerFn({ method: "GET" })
  .inputValidator((input: { id: string }) => {
    if (!/^[0-9a-f-]{36}$/i.test(input.id)) {
      throw new Error("Invalid quote id");
    }
    return input;
  })
  .handler(async ({ data }) => {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!SUPABASE_URL || !SERVICE_KEY) {
      throw new Error("Supabase environment is not configured.");
    }
    const supabase = createClient<Database>(SUPABASE_URL, SERVICE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data: row, error } = await supabase
      .from("quote_requests")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();

    if (error) {
      console.error("Confirmation fetch error:", error);
      return null;
    }
    return row;
  });

export const Route = createFileRoute("/quote/confirmation/$id")({
  loader: async ({ params }) => {
    const quote = await fetchQuote({ data: { id: params.id } });
    if (!quote) throw notFound();
    return { quote };
  },
  head: () => ({
    meta: [
      { title: "Quote Submitted — Standard Rents" },
      { name: "description", content: "Your rental quote request has been received. Our dispatch team will be in touch shortly." },
      { name: "robots", content: "noindex" },
    ],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="font-display text-6xl font-extrabold uppercase">Quote not found</h1>
      <p className="mt-4 text-[color:var(--muted-foreground)]">
        We couldn't locate that quote reference.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 bg-[color:var(--pitch)] px-6 py-3 font-display text-sm font-extrabold uppercase tracking-wider text-[color:var(--linen)]"
      >
        <ArrowLeft className="h-4 w-4" /> Back home
      </Link>
    </div>
  ),
  component: ConfirmationPage,
});

function computeDays(start: string, end: string) {
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  if (Number.isNaN(s) || Number.isNaN(e) || e < s) return 1;
  return Math.max(1, Math.ceil((e - s) / 86400000));
}

function formatDate(d: string) {
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return d;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function ConfirmationPage() {
  const { quote } = Route.useLoaderData();
  const items = (quote.items as unknown as QuoteItemRow[]) ?? [];
  const reference = quote.id.slice(0, 8).toUpperCase();

  return (
    <div className="bg-[color:var(--linen)]">
      {/* Hero confirmation */}
      <section className="bg-[color:var(--pitch)] text-[color:var(--linen)]">
        <div className="mx-auto max-w-5xl px-6 py-20 lg:py-28">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-7 w-7 text-[color:var(--amber-brand)]" />
            <div className="font-mono-tag text-xs uppercase tracking-[0.3em] text-[color:var(--amber-brand)]">
              Quote Received · {reference}
            </div>
          </div>
          <h1 className="mt-6 font-display text-5xl font-extrabold uppercase leading-[0.95] md:text-7xl">
            We've got your<br />request, {quote.contact_name.split(" ")[0]}.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[color:var(--linen)]/70">
            Dispatch will review your specs and send a firm quote to{" "}
            <span className="font-bold text-[color:var(--linen)]">{quote.contact_email}</span>{" "}
            within <span className="font-bold text-[color:var(--amber-brand)]">1 business hour</span>.
            Need it sooner? Call the number below and reference quote{" "}
            <span className="font-mono-tag text-[color:var(--amber-brand)]">{reference}</span>.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={`tel:${SITE_PHONE_TEL}`}
              className="inline-flex items-center gap-3 bg-[color:var(--amber-brand)] px-6 py-4 font-display text-sm font-extrabold uppercase tracking-[0.2em] text-[color:var(--pitch)] hover:bg-[color:var(--linen)]"
            >
              <Phone className="h-4 w-4" /> Call Dispatch
            </a>
            <Link
              to="/"
              className="inline-flex items-center gap-3 border border-[color:var(--linen)]/30 px-6 py-4 font-display text-sm font-extrabold uppercase tracking-[0.2em] text-[color:var(--linen)] hover:bg-[color:var(--linen)]/10"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Fleet
            </Link>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Items */}
          <div className="lg:col-span-2">
            <div className="font-mono-tag text-xs uppercase tracking-[0.2em] text-[color:var(--amber-deep)]">
              ── Equipment Requested
            </div>
            <ul className="mt-6 divide-y divide-[color:var(--pitch)]/10 border-y border-[color:var(--pitch)]/10">
              {items.map((it) => {
                const days = computeDays(it.startDate, it.endDate);
                return (
                  <li key={it.id} className="grid gap-3 py-6 md:grid-cols-[1fr_auto] md:items-center">
                    <div>
                      <div className="font-mono-tag text-[10px] uppercase text-[color:var(--amber-deep)]">
                        {it.category}
                      </div>
                      <div className="mt-1 font-display text-3xl font-extrabold uppercase text-[color:var(--pitch)]">
                        {it.name}
                      </div>
                      {it.commonName ? (
                        <div className="mt-1 font-display text-xs font-medium uppercase tracking-wide text-[color:var(--pitch)]/50">
                          {it.commonName}
                        </div>
                      ) : null}
                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono-tag text-xs text-[color:var(--muted-foreground)]">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(it.startDate)} → {formatDate(it.endDate)}
                        </span>
                        <span>· {days} day{days === 1 ? "" : "s"}</span>
                        <span>· ${it.rateDay}/day</span>
                      </div>
                    </div>
                    <div className="font-display text-3xl font-extrabold text-[color:var(--pitch)] md:text-right">
                      ${(it.rateDay * days).toLocaleString()}
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 flex items-baseline justify-between border-t-2 border-[color:var(--pitch)] pt-6">
              <div className="font-mono-tag text-xs uppercase text-[color:var(--muted-foreground)]">
                Estimated Total
              </div>
              <div className="font-display text-5xl font-extrabold text-[color:var(--amber-deep)]">
                ${Number(quote.estimated_total).toLocaleString()}
              </div>
            </div>
            <div className="mt-2 text-right font-mono-tag text-[10px] text-[color:var(--muted-foreground)]">
              + delivery · taxes · damage waiver
            </div>
          </div>

          {/* Contact summary */}
          <aside className="bg-[color:var(--pitch)] p-8 text-[color:var(--linen)]">
            <div className="font-mono-tag text-[10px] uppercase tracking-[0.2em] text-[color:var(--amber-brand)]">
              ── On File
            </div>
            <h3 className="mt-3 font-display text-2xl font-extrabold uppercase">
              Contact
            </h3>
            <dl className="mt-6 space-y-4 text-sm">
              <SummaryRow label="Name" value={quote.contact_name} />
              <SummaryRow label="Email" value={quote.contact_email} icon={<Mail className="h-3 w-3" />} />
              <SummaryRow label="Phone" value={quote.contact_phone} icon={<Phone className="h-3 w-3" />} />
              {quote.company && <SummaryRow label="Company" value={quote.company} />}
              {quote.delivery_city && <SummaryRow label="Delivery" value={quote.delivery_city} />}
            </dl>
            {quote.notes && (
              <>
                <div className="mt-8 font-mono-tag text-[10px] uppercase text-[color:var(--amber-brand)]">
                  Job Notes
                </div>
                <p className="mt-2 whitespace-pre-wrap text-sm text-[color:var(--linen)]/80">
                  {quote.notes}
                </p>
              </>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}

function SummaryRow({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div>
      <dt className="font-mono-tag text-[10px] uppercase text-[color:var(--linen)]/50">{label}</dt>
      <dd className="mt-1 flex items-center gap-2 font-display text-base font-bold uppercase">
        {icon}
        {value}
      </dd>
    </div>
  );
}
