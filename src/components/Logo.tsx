type LogoProps = {
  size?: number;
  variant?: "amber" | "pitch" | "linen";
  showWordmark?: boolean;
  className?: string;
};

export function Logo({ size = 40, variant = "amber", showWordmark = true, className }: LogoProps) {
  const fill =
    variant === "amber" ? "#FF5F00" : variant === "pitch" ? "#120F08" : "#FAF6EE";
  const wordColor =
    variant === "amber" ? "var(--linen)" : variant === "pitch" ? "var(--pitch)" : "var(--linen)";
  const subColor = variant === "pitch" ? "var(--amber-deep)" : "var(--amber-brand)";

  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`}>
      <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden>
        <path
          fillRule="evenodd"
          fill={fill}
          d="M50,12 L84,31 L84,69 L50,88 L16,69 L16,31 Z M16,44 L84,44 L84,56 L16,56 Z"
        />
      </svg>
      {showWordmark && (
        <div className="leading-none">
          <div
            className="font-display font-extrabold"
            style={{
              color: wordColor,
              fontSize: size * 0.58,
              letterSpacing: "0.06em",
              lineHeight: 0.82,
            }}
          >
            STANDARD
          </div>
          <div
            className="font-display font-extralight mt-1"
            style={{
              color: subColor,
              fontSize: size * 0.18,
              letterSpacing: "0.55em",
              fontWeight: 200,
            }}
          >
            RENTS
          </div>
        </div>
      )}
    </div>
  );
}
