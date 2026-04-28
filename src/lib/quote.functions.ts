import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { quoteSubmissionSchema } from "./quoteSchema";
import { computeQuoteDays } from "./quoteMath";
import { sendQuoteRequestNotificationEmail } from "./quoteRequestEmail";

export const submitQuoteRequest = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => quoteSubmissionSchema.parse(input))
  .handler(async ({ data }) => {
    try {
      const SUPABASE_URL = process.env.SUPABASE_URL;
      const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
      if (!SUPABASE_URL || !SERVICE_KEY) {
        console.error(
          "[submitQuoteRequest] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY — set both in Amplify (or .env) for the SSR/compute environment.",
        );
        return {
          ok: false as const,
          error:
            "Online quotes are not configured on this server yet. Please call dispatch—we can take your rental request by phone.",
        };
      }

      const supabase = createClient<Database>(SUPABASE_URL, SERVICE_KEY, {
        auth: { persistSession: false, autoRefreshToken: false },
      });

      const estimatedTotal = data.items.reduce((sum, item) => {
        return sum + item.rateDay * computeQuoteDays(item.startDate, item.endDate);
      }, 0);

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
        console.error("Quote insert failed:", error);
        return {
          ok: false as const,
          error: "Could not save your request. Please try again or call dispatch.",
        };
      }

      await sendQuoteRequestNotificationEmail({
        quoteId: row.id,
        data,
        estimatedTotal,
      });

      return { ok: true as const, id: row.id };
    } catch (e) {
      console.error("[submitQuoteRequest] Unexpected error:", e);
      return {
        ok: false as const,
        error: "Something went wrong saving your quote. Please try again or call dispatch.",
      };
    }
  });
