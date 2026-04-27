/**
 * Standard Rents lockup — matches `standard_rents_assets (1).html`
 * Dark/Primary · Light/Reversed · Kubota–accent bg · White bg
 */
const PITCH = "#120F08";
const ORANGE = "#F05217";
const WHITE = "#FFFFFF";
/** RENTS on orange field (Kubota / Accent bg) */
const RENTS_ON_ORANGE_FIELD = "#7A2000";

const RATIO_GAP = 20 / 72;
const RATIO_NAME = 56 / 72;
const RATIO_SUB = 17 / 72;
const RATIO_SUB_MT = 7 / 72;

type LogoProps = {
  size?: number;
  /** `amber` = dark bg primary · `pitch` = linen/light · `accent` = orange bar · `linen` = white card */
  variant?: "amber" | "pitch" | "accent" | "linen";
  showWordmark?: boolean;
  className?: string;
};

export function Logo({ size = 40, variant = "amber", showWordmark = true, className }: LogoProps) {
  let fill: string;
  let wordMain: string;
  let wordSub: string;

  switch (variant) {
    case "pitch":
      fill = PITCH;
      wordMain = PITCH;
      wordSub = ORANGE;
      break;
    case "accent":
      fill = PITCH;
      wordMain = PITCH;
      wordSub = RENTS_ON_ORANGE_FIELD;
      break;
    case "linen":
      fill = ORANGE;
      wordMain = PITCH;
      wordSub = ORANGE;
      break;
    default:
      fill = ORANGE;
      wordMain = WHITE;
      wordSub = ORANGE;
      break;
  }

  const gapPx = size * RATIO_GAP;
  const namePx = size * RATIO_NAME;
  const subPx = size * RATIO_SUB;
  const subMtPx = size * RATIO_SUB_MT;

  return (
    <div
      className={`flex items-center ${className ?? ""}`}
      style={{ gap: `${gapPx}px` }}
    >
      <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden className="shrink-0">
        <path fillRule="evenodd" fill={fill} d="M50,12 L84,31 L84,69 L50,88 L16,69 L16,31 Z M16,44 L84,44 L84,56 L16,56 Z" />
      </svg>
      {showWordmark && (
        <div className="min-w-0 leading-none">
          <div
            className="font-display font-extrabold uppercase"
            style={{
              color: wordMain,
              fontSize: namePx,
              letterSpacing: "0.036em",
              lineHeight: 0.82,
            }}
          >
            STANDARD
          </div>
          <div
            className="font-display uppercase"
            style={{
              color: wordSub,
              fontSize: subPx,
              letterSpacing: "0.59em",
              fontWeight: 400,
              marginTop: subMtPx,
              marginLeft: "2px",
              lineHeight: 1,
            }}
          >
            RENTS
          </div>
        </div>
      )}
    </div>
  );
}
