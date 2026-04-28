import { z } from "zod";

export const quoteItemSchema = z.object({
  id: z.string().min(1).max(120),
  name: z.string().min(1).max(120),
  commonName: z.string().trim().max(160).optional().or(z.literal("")),
  category: z.string().min(1).max(120),
  rateDay: z.number().min(0).max(100000),
  startDate: z.string().min(1, "Start date required"),
  endDate: z.string().min(1, "End date required"),
}).refine((v) => {
  const s = new Date(v.startDate).getTime();
  const e = new Date(v.endDate).getTime();
  return !Number.isNaN(s) && !Number.isNaN(e) && e >= s;
}, { message: "Return date must be on or after the out date", path: ["endDate"] });

export const quoteSubmissionSchema = z.object({
  contactName: z.string().trim().min(2, "Enter your full name").max(120),
  contactEmail: z.string().trim().email("Enter a valid email").max(255),
  contactPhone: z.string()
    .trim()
    .min(7, "Enter a valid phone")
    .max(30)
    .regex(/^[0-9 ()+\-.x]+$/i, "Phone can only contain digits and ()+-. x"),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  deliveryCity: z.string().trim().max(120).optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  items: z.array(quoteItemSchema).min(1, "Add at least one piece of equipment"),
});

export type QuoteSubmission = z.infer<typeof quoteSubmissionSchema>;
