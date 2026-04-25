import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { quoteSubmissionSchema } from "./quoteSchema";

function computeDays(start: string, end: string) {
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  if (Number.isNaN(s) || Number.isNaN(e) || e < s) return 1;
  return Math.max(1, Math.ceil((e - s) / 86400000));
}

export const submitQuoteRequest = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => quoteSubmissionSchema.parse(input))
  .handler(async ({ data }) => {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!SUPABASE_URL || !SERVICE_KEY) {
      throw new Error("Supabase environment is not configured.");
    }

    const supabase = createClient<Database>(SUPABASE_URL, SERVICE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const estimatedTotal = data.items.reduce((sum, item) => {
      return sum + item.rateDay * computeDays(item.startDate, item.endDate);
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
      return { ok: false as const, error: "Could not save your request. Please try again or call dispatch." };
    }

    return { ok: true as const, id: row.id };
  });
