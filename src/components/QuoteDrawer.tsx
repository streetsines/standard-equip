import { useEffect, useId, useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { quoteApi, useQuoteStore } from "@/lib/quoteStore";
import { equipment } from "@/lib/equipment";
import { Logo } from "./Logo";
import { Trash2, X, Calendar, ArrowRight, Loader2, Plus } from "lucide-react";
import { quoteSubmissionSchema } from "@/lib/quoteSchema";
import { submitQuoteRequest } from "@/lib/quote.functions";
import { SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from "@/lib/site";

type FormState = {
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  company: string;
  deliveryCity: string;
  notes: string;
};

const EMPTY_FORM: FormState = {
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  company: "",
  deliveryCity: "",
  notes: "",
};

export function QuoteDrawer() {
  const isOpen = useQuoteStore((s) => s.isOpen);
  const items = useQuoteStore((s) => s.items);
  const navigate = useNavigate();
  const submitFn = useServerFn(submitQuoteRequest);

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && quoteApi.close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const total = useMemo(() => {
    return items.reduce((sum, item) => {
      const days = computeDays(item.startDate, item.endDate) || 1;
      return sum + item.rateDay * days;
    }, 0);
  }, [items]);

  const updateField = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => {
      if (!e[key]) return e;
      const { [key]: _, ...rest } = e;
      return rest;
    });
  };

  async function handleSubmit() {
    setServerError(null);
    const payload = {
      contactName: form.contactName,
      contactEmail: form.contactEmail,
      contactPhone: form.contactPhone,
      company: form.company,
      deliveryCity: form.deliveryCity,
      notes: form.notes,
      items: items.map((i) => ({
        id: i.id,
        name: i.name,
        commonName: i.commonName,
        category: i.category,
        rateDay: i.rateDay,
        startDate: i.startDate ?? "",
        endDate: i.endDate ?? "",
      })),
    };

    const parsed = quoteSubmissionSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path.join(".");
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      // Surface item-level date issues globally too
      const itemDateIssue = parsed.error.issues.find((i) => i.path[0] === "items");
      if (itemDateIssue) {
        setServerError("Please add valid out and return dates for every unit.");
      }
      return;
    }

    setErrors({});
    setSubmitting(true);
    try {
      const result = await submitFn({ data: parsed.data });
      if (result.ok) {
        quoteApi.clear();
        quoteApi.close();
        setForm(EMPTY_FORM);
        navigate({ to: "/quote/confirmation/$id", params: { id: result.id } });
      } else {
        setServerError(result.error);
      }
    } catch (err) {
      console.error(err);
      const message =
        err instanceof Error ? err.message : typeof err === "string" ? err : "";
      const looksLikeTransport =
        /fetch|network|failed to load|load failed|aborted|timeout/i.test(message);
      setServerError(
        looksLikeTransport || !message
          ? "Can't reach the booking server. Check your connection, try again, or call dispatch."
          : message,
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* backdrop */}
      <div
        onClick={quoteApi.close}
        className={`fixed inset-0 z-50 bg-[color:var(--pitch)]/70 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-[color:var(--pitch)] text-[color:var(--linen)] shadow-2xl transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        {/* header */}
        <div className="flex items-center justify-between border-b border-[color:var(--linen)]/10 bg-[color:var(--amber-brand)] px-6 py-5 text-[color:var(--pitch)]">
          <div className="flex items-center gap-3">
            <Logo size={28} variant="pitch" showWordmark={false} />
            <div>
              <div className="font-mono-tag text-[10px] uppercase opacity-70">
                Quote Builder
              </div>
              <div className="font-display text-xl font-extrabold uppercase leading-none">
                Your Rental
              </div>
            </div>
          </div>
          <button
            onClick={quoteApi.close}
            className="grid h-9 w-9 place-items-center bg-[color:var(--pitch)] text-[color:var(--linen)] transition-colors hover:bg-[color:var(--linen)] hover:text-[color:var(--pitch)]"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* body */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <EmptyQuoteFleetPicker />
          ) : (
            <>
              <ul>
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="border-b border-[color:var(--linen)]/10 last:border-b-0"
                  >
                    <div className="bg-[color:var(--linen)] px-6 py-5 text-[color:var(--pitch)]">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-mono-tag text-[10px] text-[color:var(--amber-brand)]">
                            {item.category}
                          </div>
                          <div className="mt-1 font-display text-2xl font-extrabold uppercase leading-none">
                            {item.name}
                          </div>
                          {item.commonName ? (
                            <div className="mt-1 font-display text-[10px] font-medium uppercase tracking-wide text-[color:var(--pitch)]/45">
                              {item.commonName}
                            </div>
                          ) : null}
                          <div className="mt-2 font-mono-tag text-xs text-[color:var(--pitch)]/55">
                            ${item.rateDay}/day
                          </div>
                        </div>
                        <button
                          onClick={() => quoteApi.remove(item.id)}
                          className="text-[color:var(--pitch)]/35 transition-colors hover:text-[color:var(--amber-brand)]"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-5 border-t border-[color:var(--pitch)]/10 pt-4">
                        <div className="font-mono-tag text-[10px] uppercase tracking-wide text-[color:var(--pitch)]/50">
                          Rental dates
                        </div>
                        <p
                          id={`rental-dates-hint-${item.id}`}
                          className="mt-2 flex flex-wrap items-baseline gap-x-1.5 gap-y-1.5 text-[13px] leading-snug text-[color:var(--pitch)]/65"
                        >
                          <span className="shrink-0">Choose each date in your calendar — use the</span>
                          <span className="inline-flex shrink-0 items-center rounded-sm border border-[color:var(--pitch)]/20 bg-[color:var(--pitch)]/[0.07] px-2 py-0.5 font-display text-[11px] font-extrabold uppercase tracking-[0.12em] text-[color:var(--pitch)] shadow-sm">
                            Out
                          </span>
                          <span className="shrink-0">and</span>
                          <span className="inline-flex shrink-0 items-center rounded-sm border border-[color:var(--pitch)]/20 bg-[color:var(--pitch)]/[0.07] px-2 py-0.5 font-display text-[11px] font-extrabold uppercase tracking-[0.12em] text-[color:var(--pitch)] shadow-sm">
                            Return
                          </span>
                          <span className="min-w-0">fields below (entire card is tappable).</span>
                        </p>

                        <div
                          className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-md bg-[color:var(--pitch)]/12 ring-1 ring-[color:var(--pitch)]/12"
                          role="group"
                          aria-labelledby={`rental-dates-hint-${item.id}`}
                        >
                          <DateField
                            label="Out"
                            value={item.startDate ?? ""}
                            onChange={(v) => quoteApi.updateDates(item.id, v, item.endDate)}
                            variant="light"
                          />
                          <DateField
                            label="Return"
                            value={item.endDate ?? ""}
                            onChange={(v) => quoteApi.updateDates(item.id, item.startDate, v)}
                            variant="light"
                          />
                        </div>
                      </div>

                      {item.startDate && item.endDate && (
                        <div className="mt-4 flex items-center justify-between border-t border-[color:var(--pitch)]/10 pt-4 text-sm">
                          <span className="font-mono-tag text-xs text-[color:var(--pitch)]/55">
                            {computeDays(item.startDate, item.endDate)} day
                            {computeDays(item.startDate, item.endDate) === 1 ? "" : "s"}
                          </span>
                          <span className="font-display text-lg font-extrabold text-[color:var(--amber-brand)]">
                            $
                            {(
                              item.rateDay * (computeDays(item.startDate, item.endDate) || 0)
                            ).toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {/* contact form */}
              <div className="border-t border-[color:var(--linen)]/10 bg-[color:var(--pitch-elevated)] p-6">
                <div className="font-mono-tag text-[10px] uppercase text-[color:var(--amber-brand)]">
                  ── Your Info
                </div>
                <h4 className="mt-2 font-display text-2xl font-extrabold uppercase">
                  Where do we send the quote?
                </h4>

                <div className="mt-5 space-y-4">
                  <TextField
                    label="Full Name *"
                    value={form.contactName}
                    onChange={(v) => updateField("contactName", v)}
                    error={errors.contactName}
                    autoComplete="name"
                  />
                  <TextField
                    label="Email *"
                    type="email"
                    value={form.contactEmail}
                    onChange={(v) => updateField("contactEmail", v)}
                    error={errors.contactEmail}
                    autoComplete="email"
                  />
                  <TextField
                    label="Phone *"
                    type="tel"
                    value={form.contactPhone}
                    onChange={(v) => updateField("contactPhone", v)}
                    error={errors.contactPhone}
                    autoComplete="tel"
                  />
                  <TextField
                    label="Company"
                    value={form.company}
                    onChange={(v) => updateField("company", v)}
                    error={errors.company}
                    autoComplete="organization"
                  />
                  <TextField
                    label="Delivery City"
                    value={form.deliveryCity}
                    onChange={(v) => updateField("deliveryCity", v)}
                    error={errors.deliveryCity}
                    placeholder="Hudson, Stow, Tallmadge…"
                  />
                  <label className="block">
                    <div className="font-mono-tag text-[10px] uppercase text-[color:var(--linen)]/60">
                      Job Notes
                    </div>
                    <textarea
                      value={form.notes}
                      onChange={(e) => updateField("notes", e.target.value)}
                      rows={3}
                      placeholder="Site access, attachments needed, hours…"
                      className="mt-1 w-full resize-none border-b border-[color:var(--linen)]/20 bg-transparent py-2 text-sm text-[color:var(--linen)] placeholder:text-[color:var(--linen)]/30 outline-none focus:border-[color:var(--amber-brand)]"
                    />
                    {errors.notes && (
                      <div className="mt-1 font-mono-tag text-[10px] text-[color:var(--amber-brand)]">
                        {errors.notes}
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </>
          )}
        </div>

        {/* footer */}
        {items.length > 0 && (
          <div className="border-t border-[color:var(--linen)]/10 bg-[color:var(--pitch-elevated)] p-6">
            <div className="flex items-baseline justify-between">
              <div className="font-mono-tag text-[10px] uppercase text-[color:var(--linen)]/50">
                Estimated Total
              </div>
              <div className="font-display text-4xl font-extrabold text-[color:var(--amber-brand)]">
                ${total.toLocaleString()}
              </div>
            </div>
            <div className="mt-1 text-right font-mono-tag text-[10px] text-[color:var(--linen)]/40">
              + delivery · taxes · damage waiver
            </div>

            {serverError && (
              <div className="mt-4 border-l-2 border-[color:var(--amber-brand)] bg-[color:var(--pitch)] px-3 py-2 font-mono-tag text-[11px] text-[color:var(--amber-brand)]">
                {serverError}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="mt-5 flex w-full items-center justify-center gap-3 bg-[color:var(--amber-brand)] py-4 font-display text-sm font-extrabold uppercase tracking-[0.2em] text-[color:var(--pitch)] transition-all hover:bg-[color:var(--linen)] disabled:cursor-wait disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
                </>
              ) : (
                <>
                  Submit Quote Request <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
            <a
              href={`tel:${SITE_PHONE_TEL}`}
              className="mt-3 block text-center font-mono-tag text-xs text-[color:var(--linen)]/60 hover:text-[color:var(--amber-brand)]"
            >
              Or call dispatch · {SITE_PHONE_DISPLAY}
            </a>
          </div>
        )}
      </aside>
    </>
  );
}

function EmptyQuoteFleetPicker() {
  return (
    <div className="px-6 pb-10 pt-8">
      <div className="font-mono-tag text-[10px] uppercase tracking-[0.2em] text-[color:var(--amber-brand)]">
        Start your quote
      </div>
      <h3 className="mt-2 font-display text-2xl font-extrabold uppercase leading-tight text-[color:var(--linen)]">
        What are you renting?
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[color:var(--linen)]/60">
        Add one or more units below. You&apos;ll set out and return dates on the next
        step—then send your request to dispatch.
      </p>

      <ul className="mt-8 space-y-3">
        {equipment.map((item) => (
          <li key={item.id}>
            <div className="flex gap-3 border border-[color:var(--linen)]/12 bg-[color:var(--pitch-elevated)] p-3">
              <img
                src={item.image}
                alt={item.imageAlt}
                width={80}
                height={64}
                className="h-16 w-20 shrink-0 rounded-sm object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="font-mono-tag text-[9px] uppercase tracking-wide text-[color:var(--amber-brand)]">
                  {item.category}
                </div>
                <div className="mt-0.5 font-display text-[10px] font-medium uppercase leading-snug tracking-[0.08em] text-[color:var(--linen)]/55">
                  {item.commonName}
                </div>
                <div className="truncate font-display text-base font-extrabold uppercase leading-tight text-[color:var(--linen)]">
                  {item.name}
                </div>
                <div className="mt-0.5 font-mono-tag text-[11px] text-[color:var(--linen)]/45">
                  ${item.rateDay.toLocaleString()}/day
                </div>
              </div>
              <div className="flex shrink-0 flex-col gap-1.5 self-center">
                <button
                  type="button"
                  onClick={() =>
                    quoteApi.add({
                      id: item.id,
                      name: item.name,
                      commonName: item.commonName,
                      category: item.category,
                      rateDay: item.rateDay,
                    })
                  }
                  className="inline-flex items-center justify-center gap-1.5 bg-[color:var(--amber-brand)] px-3 py-2 font-display text-[10px] font-extrabold uppercase tracking-[0.14em] text-[color:var(--pitch)] transition-colors hover:bg-[color:var(--linen)]"
                >
                  <Plus className="h-3.5 w-3.5" aria-hidden />
                  Add
                </button>
                <Link
                  to="/equipment/$slug"
                  params={{ slug: item.slug }}
                  className="text-center font-mono-tag text-[9px] uppercase tracking-wide text-[color:var(--linen)]/45 underline-offset-2 hover:text-[color:var(--amber-brand)] hover:underline"
                >
                  Specs
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Link
        to="/fleet"
        className="mt-8 flex items-center justify-center gap-2 border border-[color:var(--linen)]/20 py-3 font-display text-xs font-extrabold uppercase tracking-[0.18em] text-[color:var(--linen)] transition-colors hover:border-[color:var(--amber-brand)] hover:text-[color:var(--amber-brand)]"
      >
        Browse full fleet
        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
      </Link>
    </div>
  );
}

function DateField({
  label,
  value,
  onChange,
  variant = "dark",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  variant?: "dark" | "light";
}) {
  const isLight = variant === "light";
  const id = useId();
  return (
    <label
      htmlFor={id}
      className={`group block min-h-[5.5rem] cursor-pointer px-3.5 pb-3 pt-3 transition-[box-shadow,background-color] duration-150 ${
        isLight
          ? "bg-[color:var(--linen-muted)]/55 hover:bg-[color:var(--linen-muted)] focus-within:bg-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-[color:var(--amber-brand)]"
          : "bg-[color:var(--pitch)] focus-within:ring-2 focus-within:ring-inset focus-within:ring-[color:var(--amber-brand)]"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={`font-display text-[11px] font-extrabold uppercase tracking-[0.14em] ${
            isLight ? "text-[color:var(--pitch)]" : "text-[color:var(--linen)]/85"
          }`}
        >
          {label}
        </span>
        <Calendar
          className="h-3.5 w-3.5 shrink-0 text-[color:var(--amber-brand)] opacity-55 transition-opacity group-hover:opacity-90"
          aria-hidden
        />
      </div>
      <input
        id={id}
        type="date"
        value={value}
        min={new Date().toISOString().split("T")[0]}
        onChange={(e) => onChange(e.target.value)}
        onClick={(e) => e.currentTarget.showPicker?.()}
        className={`mt-2 w-full cursor-pointer bg-transparent font-display text-base font-extrabold uppercase outline-none ${
          isLight
            ? "text-[color:var(--pitch)] [color-scheme:light]"
            : "text-[color:var(--linen)] [color-scheme:dark]"
        }`}
      />
    </label>
  );
}

function TextField({
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <div className="font-mono-tag text-[10px] uppercase text-[color:var(--linen)]/60">
        {label}
      </div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={`mt-1 w-full border-b bg-transparent py-2 font-display text-base font-bold text-[color:var(--linen)] placeholder:font-display placeholder:text-[color:var(--linen)]/30 outline-none transition-colors ${
          error
            ? "border-[color:var(--amber-brand)]"
            : "border-[color:var(--linen)]/20 focus:border-[color:var(--amber-brand)]"
        }`}
      />
      {error && (
        <div className="mt-1 font-mono-tag text-[10px] text-[color:var(--amber-brand)]">
          {error}
        </div>
      )}
    </label>
  );
}

function computeDays(start?: string, end?: string) {
  if (!start || !end) return 0;
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  if (Number.isNaN(s) || Number.isNaN(e) || e < s) return 0;
  return Math.max(1, Math.ceil((e - s) / 86400000));
}
