import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { quoteSubmissionSchema } from "./quoteSchema";
import { computeQuoteDays } from "./quoteMath";
import { sendQuoteRequestNotificationEmail } from "./quoteRequestEmail";

type QuoteConfirmationPayload = {
  id: string;
  createdAt: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  company?: string;
  deliveryCity?: string;
  notes?: string;
  estimatedTotal: number;
  items: Array<{
    id: string;
    name: string;
    commonName?: string;
    category: string;
    rateDay: number;
    startDate: string;
    endDate: string;
  }>;
};

export const submitQuoteRequest = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => quoteSubmissionSchema.parse(input))
  .handler(async ({ data }) => {
    try {
      const SUPABASE_URL = process.env.SUPABASE_URL;
      const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

      const estimatedTotal = data.items.reduce((sum, item) => {
        return sum + item.rateDay * computeQuoteDays(item.startDate, item.endDate);
      }, 0);

      let quoteId = crypto.randomUUID();
      let persisted = false;

      if (SUPABASE_URL && SERVICE_KEY) {
        const supabase = createClient<Database>(SUPABASE_URL, SERVICE_KEY, {
          auth: { persistSession: false, autoRefreshToken: false },
        });
        const { data: row, error } = await supabase
          .from("quote_requests")
          .insert({
            contact_name: data.contactName,
            contact_email: data.contactEmail,
            contact_phone: data.contactPhone,
            company: data.company || null,
            delivery_city: data.deliveryCity || null,
            notes: data.notes || null,
            items: data.items,
            estimated_total: estimatedTotal,
            status: "new",
          })
          .select("id")
          .single();

        if (error || !row) {
          console.warn("[submitQuoteRequest] DB insert failed, continuing in email-only mode:", error);
        } else {
          quoteId = row.id;
          persisted = true;
        }
      } else {
        console.warn(
          "[submitQuoteRequest] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY — using email-only quote mode.",
        );
      }

      await sendQuoteRequestNotificationEmail({
        quoteId,
        data,
        estimatedTotal,
      });

      if (!persisted && !process.env.RESEND_API_KEY) {
        return {
          ok: false as const,
          error:
            "Online quote storage and email dispatch are not configured yet. Please call dispatch and we'll book your rental by phone.",
        };
      }

      const confirmation: QuoteConfirmationPayload = {
        id: quoteId,
        createdAt: new Date().toISOString(),
        contactName: data.contactName,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
        company: data.company || undefined,
        deliveryCity: data.deliveryCity || undefined,
        notes: data.notes || undefined,
        estimatedTotal,
        items: data.items,
      };

      return { ok: true as const, id: quoteId, persisted, confirmation };
    } catch (e) {
      console.error("[submitQuoteRequest] Unexpected error:", e);
      return {
        ok: false as const,
        error: "Something went wrong saving your quote. Please try again or call dispatch.",
      };
    }
  });
