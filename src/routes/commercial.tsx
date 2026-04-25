import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/commercial")({
  head: () => ({
    meta: [
      { title: "Commercial Accounts — Standard Rents · Contractor Rates" },
      {
        name: "description",
        content:
          "Open a Commercial Account for preferred rates, priority dispatch, and net-30 billing. Built for Northeast Ohio contractors.",
      },
      { property: "og:title", content: "Commercial Accounts — Standard Rents" },
      {
        property: "og:description",
        content:
          "Up to 22% off published rates, priority dispatch, and net-30 terms for contractors.",
      },
    ],
  }),
  component: CommercialPage,
});

function CommercialPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <section className="bg-[color:var(--amber-brand)] py-24 text-[color:var(--pitch)]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="font-mono-tag text-xs text-[color:var(--amber-deep)]">
            ── COMMERCIAL ACCOUNT PROGRAM
          </div>
          <h1 className="mt-4 font-display text-7xl font-extrabold uppercase leading-[0.82] md:text-9xl">
            Run a crew? <br />
            <span className="font-extralight italic">Run an account.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-[color:var(--pitch)]/80">
            Preferred rates, priority dispatch, and net-30 billing — designed
            for contractors who keep multiple jobs and machines in motion.
          </p>
        </div>
      </section>

      <section className="bg-[color:var(--linen)] py-24">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1fr_1.1fr]">
          {/* benefits */}
          <div>
            <div className="eyebrow text-[color:var(--amber-deep)]">── Account Benefits</div>
            <ul className="mt-8 space-y-px bg-[color:var(--pitch)]/10">
              {[
                {
                  k: "Preferred Rates",
                  v: "Save up to 22% off published day, week, and month pricing.",
                },
                {
                  k: "Priority Dispatch",
                  v: "Account jobs jump the queue. Same-hour delivery is the norm, not the exception.",
                },
                {
                  k: "Net-30 Billing",
                  v: "Consolidated weekly invoicing. Net-30 standard, Net-60 available with credit history.",
                },
                {
                  k: "Account Manager",
                  v: "Direct line to a dispatcher who knows your jobs and your machines.",
                },
                {
                  k: "Reserve Ahead",
                  v: "Lock in fleet availability up to 90 days out for planned projects.",
                },
              ].map((b) => (
                <li key={b.k} className="flex items-start gap-4 bg-[color:var(--linen)] p-6">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--amber-brand)]" />
                  <div>
                    <div className="font-display text-lg font-extrabold uppercase">{b.k}</div>
                    <div className="text-sm text-[color:var(--muted-foreground)]">{b.v}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* form */}
          <div className="bg-[color:var(--pitch)] p-8 text-[color:var(--linen)] md:p-12">
            <div className="font-mono-tag text-[10px] uppercase text-[color:var(--amber-brand)]">
              ── Apply Now · 2 Minutes
            </div>
            <h2 className="mt-3 font-display text-4xl font-extrabold uppercase leading-tight">
              Open Your Account
            </h2>

            {submitted ? (
              <div className="mt-10 border border-[color:var(--amber-brand)]/40 bg-[color:var(--amber-brand)]/10 p-8 text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-[color:var(--amber-brand)]" />
                <h3 className="mt-4 font-display text-2xl font-extrabold uppercase">
                  Application Received
                </h3>
                <p className="mt-2 text-sm text-[color:var(--linen)]/70">
                  Jake will reach out within one business day to verify and
                  activate your account.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="mt-8 space-y-5"
              >
                <Field label="Company name" name="company" />
                <Field label="Contact name" name="name" />
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Email" name="email" type="email" />
                  <Field label="Phone" name="phone" type="tel" />
                </div>
                <Field label="Estimated monthly spend" name="spend" placeholder="$5,000+" />
                <label className="block">
                  <span className="font-mono-tag text-[10px] uppercase text-[color:var(--linen)]/60">
                    Notes
                  </span>
                  <textarea
                    name="notes"
                    rows={3}
                    className="mt-1.5 w-full border-b border-[color:var(--linen)]/20 bg-transparent py-2 font-display text-base text-[color:var(--linen)] outline-none focus:border-[color:var(--amber-brand)]"
                  />
                </label>

                <button
                  type="submit"
                  className="mt-4 inline-flex w-full items-center justify-center gap-3 bg-[color:var(--amber-brand)] py-4 font-display text-sm font-extrabold uppercase tracking-[0.22em] text-[color:var(--pitch)] hover:bg-[color:var(--linen)]"
                >
                  Submit Application <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="font-mono-tag text-[10px] uppercase text-[color:var(--linen)]/60">
        {label}
      </span>
      <input
        required
        type={type}
        name={name}
        placeholder={placeholder}
        className="mt-1.5 w-full border-b border-[color:var(--linen)]/20 bg-transparent py-2 font-display text-base text-[color:var(--linen)] outline-none placeholder:text-[color:var(--linen)]/30 focus:border-[color:var(--amber-brand)]"
      />
    </label>
  );
}
