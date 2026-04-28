/** Calendar days inclusive for rental line (out → return). */
export function computeQuoteDays(start: string, end: string) {
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  if (Number.isNaN(s) || Number.isNaN(e) || e < s) return 1;
  return Math.max(1, Math.ceil((e - s) / 86400000));
}
