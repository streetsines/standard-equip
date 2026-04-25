import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { quoteApi, useQuoteStore } from "@/lib/quoteStore";
import { Logo } from "./Logo";
import { Trash2, X, Calendar, ArrowRight, Loader2 } from "lucide-react";
import { quoteSubmissionSchema } from "@/lib/quoteSchema";
import { submitQuoteRequest } from "@/lib/quote.functions";

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
      setServerError("Network error. Please try again or call dispatch.");
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
            <EmptyState />
          ) : (
            <>
              <ul className="divide-y divide-[color:var(--linen)]/10">
                {items.map((item) => (
                  <li key={item.id} className="p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-mono-tag text-[10px] text-[color:var(--amber-brand)]">
                          {item.category}
                        </div>
                        <div className="mt-1 font-display text-2xl font-extrabold uppercase leading-none">
                          {item.name}
                        </div>
                        <div className="mt-2 font-mono-tag text-xs text-[color:var(--linen)]/60">
                          ${item.rateDay}/day
                        </div>
                      </div>
                      <button
                        onClick={() => quoteApi.remove(item.id)}
                        className="text-[color:var(--linen)]/40 transition-colors hover:text-[color:var(--amber-brand)]"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* date pickers */}
                    <div className="mt-4 grid grid-cols-2 gap-px bg-[color:var(--linen)]/10">
                      <DateField
                        label="Out"
                        value={item.startDate ?? ""}
                        onChange={(v) => quoteApi.updateDates(item.id, v, item.endDate)}
                      />
                      <DateField
                        label="Return"
                        value={item.endDate ?? ""}
                        onChange={(v) => quoteApi.updateDates(item.id, item.startDate, v)}
                      />
                    </div>

                    {item.startDate && item.endDate && (
                      <div className="mt-3 flex items-center justify-between border-t border-[color:var(--linen)]/10 pt-3 text-sm">
                        <span className="font-mono-tag text-xs text-[color:var(--linen)]/60">
                          {computeDays(item.startDate, item.endDate)} day
                          {computeDays(item.startDate, item.endDate) === 1 ? "" : "s"}
                        </span>
                        <span className="font-display text-lg font-extrabold text-[color:var(--amber-brand)]">
                          ${(item.rateDay * (computeDays(item.startDate, item.endDate) || 0)).toLocaleString()}
                        </span>
                      </div>
                    )}
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
              href="tel:18007826327"
              className="mt-3 block text-center font-mono-tag text-xs text-[color:var(--linen)]/60 hover:text-[color:var(--amber-brand)]"
            >
              Or call dispatch · 1-800-STANDARD
            </a>
          </div>
        )}
      </aside>
    </>
  );
}

function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 py-20 text-center">
      <Calendar className="h-10 w-10 text-[color:var(--linen)]/20" />
      <h3 className="mt-6 font-display text-2xl font-extrabold uppercase">
        Empty Quote
      </h3>
      <p className="mt-2 max-w-xs text-sm text-[color:var(--linen)]/50">
        Add equipment from the fleet, pick your dates, and we'll dispatch within
        the hour.
      </p>
    </div>
  );
}

function DateField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block bg-[color:var(--pitch)] p-3">
      <div className="font-mono-tag text-[9px] uppercase text-[color:var(--linen)]/50">
        {label}
      </div>
      <input
        type="date"
        value={value}
        min={new Date().toISOString().split("T")[0]}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full bg-transparent font-display text-base font-extrabold uppercase text-[color:var(--linen)] outline-none [color-scheme:dark]"
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
