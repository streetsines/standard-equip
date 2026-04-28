import type { QuoteSubmission } from "./quoteSchema";
import { SITE_ORIGIN } from "./site";
import { computeQuoteDays } from "./quoteMath";

const DEFAULT_NOTIFY = "get@rentstandard.com";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatMoney(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

/** Fire-and-forget: logs on failure; never throws. */
export async function sendQuoteRequestNotificationEmail(args: {
  quoteId: string;
  data: QuoteSubmission;
  estimatedTotal: number;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(
      "[quote email] RESEND_API_KEY not set — quote was saved but no notification email was sent. Add RESEND_API_KEY (and optional RESEND_FROM) in Amplify / .env.",
    );
    return;
  }

  const to = (process.env.QUOTE_NOTIFY_EMAIL ?? DEFAULT_NOTIFY).trim() || DEFAULT_NOTIFY;
  const from =
    process.env.RESEND_FROM?.trim() ||
    "Standard Rents Quotes <onboarding@resend.dev>";

  const { quoteId, data, estimatedTotal } = args;
  const ref = quoteId.slice(0, 8).toUpperCase();
  const base = SITE_ORIGIN.replace(/\/$/, "");
  const confirmationUrl = `${base}/quote/confirmation/${quoteId}`;

  const text = formatPlainText({ data, estimatedTotal, ref, confirmationUrl });
  const html = formatHtmlEmail({ data, estimatedTotal, ref, confirmationUrl });

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `New quote ${ref} — ${data.contactName}`,
        text,
        html,
      }),
    });

    const body = await res.text();
    if (!res.ok) {
      console.error("[quote email] Resend API error:", res.status, body);
    }
  } catch (e) {
    console.error("[quote email] Request failed:", e);
  }
}

function formatPlainText(args: {
  data: QuoteSubmission;
  estimatedTotal: number;
  ref: string;
  confirmationUrl: string;
}) {
  const { data, estimatedTotal, ref, confirmationUrl } = args;
  const lines = [
    `New quote request ${ref}`,
    "",
    "CONTACT",
    `Name: ${data.contactName}`,
    `Email: ${data.contactEmail}`,
    `Phone: ${data.contactPhone}`,
    data.company ? `Company: ${data.company}` : null,
    data.deliveryCity ? `Delivery city: ${data.deliveryCity}` : null,
    data.notes ? `Notes: ${data.notes}` : null,
    "",
    "EQUIPMENT",
    ...data.items.map((item) => {
      const days = computeQuoteDays(item.startDate, item.endDate);
      const line = item.rateDay * days;
      const plain = item.commonName?.trim() ? `${item.name} (${item.commonName})` : item.name;
      return `- ${plain} · ${item.category} | ${item.startDate} → ${item.endDate} | ${days} day(s) @ ${formatMoney(item.rateDay)}/day = ${formatMoney(line)}`;
    }),
    "",
    `Estimated total: ${formatMoney(estimatedTotal)}`,
    "",
    `Customer confirmation page: ${confirmationUrl}`,
  ];
  return lines.filter((x) => x != null).join("\n");
}

function formatHtmlEmail(args: {
  data: QuoteSubmission;
  estimatedTotal: number;
  ref: string;
  confirmationUrl: string;
}) {
  const { data, estimatedTotal, ref, confirmationUrl } = args;
  const rows = data.items
    .map((item) => {
      const days = computeQuoteDays(item.startDate, item.endDate);
      const line = item.rateDay * days;
      const unitCell = item.commonName?.trim()
        ? `${escapeHtml(item.name)}<br/><span style="font-size:11px;color:#555">${escapeHtml(item.commonName)}</span>`
        : escapeHtml(item.name);
      return `<tr>
        <td style="padding:8px;border:1px solid #ddd">${unitCell}</td>
        <td style="padding:8px;border:1px solid #ddd">${escapeHtml(item.category)}</td>
        <td style="padding:8px;border:1px solid #ddd">${escapeHtml(item.startDate)}</td>
        <td style="padding:8px;border:1px solid #ddd">${escapeHtml(item.endDate)}</td>
        <td style="padding:8px;border:1px solid #ddd;text-align:right">${days}</td>
        <td style="padding:8px;border:1px solid #ddd;text-align:right">${formatMoney(item.rateDay)}</td>
        <td style="padding:8px;border:1px solid #ddd;text-align:right">${formatMoney(line)}</td>
      </tr>`;
    })
    .join("");

  return `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;line-height:1.5;color:#120F08">
    <h1 style="color:#F05217">New quote request ${escapeHtml(ref)}</h1>
    <h2>Contact</h2>
    <table style="border-collapse:collapse;margin-bottom:1.5rem">
      <tr><td style="padding:4px 12px 4px 0"><strong>Name</strong></td><td>${escapeHtml(data.contactName)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0"><strong>Email</strong></td><td>${escapeHtml(data.contactEmail)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0"><strong>Phone</strong></td><td>${escapeHtml(data.contactPhone)}</td></tr>
      ${data.company ? `<tr><td style="padding:4px 12px 4px 0"><strong>Company</strong></td><td>${escapeHtml(data.company)}</td></tr>` : ""}
      ${data.deliveryCity ? `<tr><td style="padding:4px 12px 4px 0"><strong>Delivery</strong></td><td>${escapeHtml(data.deliveryCity)}</td></tr>` : ""}
      ${data.notes ? `<tr><td style="padding:4px 12px 4px 0;vertical-align:top"><strong>Notes</strong></td><td>${escapeHtml(data.notes).replace(/\n/g, "<br/>")}</td></tr>` : ""}
    </table>
    <h2>Equipment</h2>
    <table style="border-collapse:collapse;width:100%;max-width:720px">
      <thead><tr style="background:#FAF6EE">
        <th style="padding:8px;border:1px solid #ddd;text-align:left">Unit</th>
        <th style="padding:8px;border:1px solid #ddd;text-align:left">Category</th>
        <th style="padding:8px;border:1px solid #ddd;text-align:left">Out</th>
        <th style="padding:8px;border:1px solid #ddd;text-align:left">Return</th>
        <th style="padding:8px;border:1px solid #ddd;text-align:right">Days</th>
        <th style="padding:8px;border:1px solid #ddd;text-align:right">$/day</th>
        <th style="padding:8px;border:1px solid #ddd;text-align:right">Line</th>
      </tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <p style="margin-top:1rem;font-size:1.1rem"><strong>Estimated total:</strong> ${formatMoney(estimatedTotal)}</p>
    <p><a href="${escapeHtml(confirmationUrl)}">Open confirmation page</a> (same link the customer sees)</p>
  </body></html>`;
}
