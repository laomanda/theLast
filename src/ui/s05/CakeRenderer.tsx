import type { CakeConfiguration } from "../../runtime/contracts";

const ASSET_ROOT = "/assets/svg/cake";

export const CAKE_CANDLE_POSITIONS: Record<string, { x: number; y: number; rotation: number }> = {
  "candle-outer-left": { x: 118, y: 44, rotation: -3 },
  "candle-left": { x: 151, y: 37, rotation: -2 },
  "candle-center": { x: 190, y: 31, rotation: 0 },
  "candle-right": { x: 229, y: 37, rotation: 2 },
  "candle-outer-right": { x: 262, y: 44, rotation: 3 },
};

export function CakeRenderer({
  configuration,
  testId = "s05-cake-renderer",
}: {
  configuration: CakeConfiguration;
  testId?: string;
}) {
  const cool = configuration.frosting === "cfg-B-periwinkle-warm";
  const hasPearls = configuration.accents.includes("accent-pearls");
  const hasRibbon = configuration.accents.includes("accent-ribbon");
  const frostingTop = cool ? "#8794CC" : "#E67A6B";
  const frostingShade = cool ? "#6774B8" : "#C65E58";

  return (
    <svg
      data-testid={testId}
      data-frosting={configuration.frosting}
      viewBox="0 0 400 300"
      role="img"
      aria-label={`Kue ulang tahun dengan ${configuration.candles.length} lilin${configuration.flowers.length ? ", bunga" : ""}${configuration.topper ? ", dan topper" : ""}.`}
      className="s05-cake-svg"
    >
      <defs>
        <linearGradient id="s05-cake-body" x1="0" y1="0" x2="1" y2=".85"><stop stopColor="#FFF8EA"/><stop offset=".52" stopColor="#F2DCC7"/><stop offset="1" stopColor="#DDB99F"/></linearGradient>
        <linearGradient id="s05-cake-side-shade" x1="0" y1="0" x2="1"><stop stopColor="#fff" stopOpacity=".55"/><stop offset=".72" stopColor="#fff" stopOpacity="0"/><stop offset="1" stopColor="#9C6C58" stopOpacity=".24"/></linearGradient>
        <linearGradient id="s05-frosting-material" x1="0" y1="0" x2="0" y2="1"><stop stopColor={frostingTop}/><stop offset="1" stopColor={frostingShade}/></linearGradient>
        <linearGradient id="s05-ceramic" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#FFFDF6"/><stop offset="1" stopColor="#D9CCBD"/></linearGradient>
        <radialGradient id="s05-pearl" cx="32%" cy="28%"><stop stopColor="#fff"/><stop offset=".35" stopColor="#F6F1E8"/><stop offset="1" stopColor="#BFB4A6"/></radialGradient>
      </defs>

      <ellipse cx="201" cy="278" rx="139" ry="13" fill="#2C282A" opacity=".12" />
      <path d="M154 239h94l18 35c-35 13-97 13-130 0Z" fill="url(#s05-ceramic)" stroke="#2C282A" strokeOpacity=".22" />
      <ellipse cx="201" cy="239" rx="145" ry="20" fill="#F6F1E8" stroke="#2C282A" strokeOpacity=".24" />
      <ellipse cx="201" cy="235" rx="128" ry="13" fill="#D8D2C9" opacity=".52" />
      <path d="M74 112Q200 84 326 112v103c-8 31-238 31-252 0Z" fill="url(#s05-cake-body)" stroke="#2C282A" strokeOpacity=".28" strokeWidth="1.5" />
      <path d="M77 119Q200 96 323 119v95c-38 24-208 25-246 0Z" fill="url(#s05-cake-side-shade)" />
      <ellipse cx="200" cy="112" rx="126" ry="31" fill="#F7E6D2" stroke="#2C282A" strokeOpacity=".25" strokeWidth="1.5" />
      {hasRibbon && <image data-testid="s05-accent-ribbon" href={`${ASSET_ROOT}/cake-accent-ribbon.svg`} width="400" height="300" />}
      <g data-testid="s05-frosting">
        <path d="M74 111Q200 77 326 111v31c-11 10-24 6-27-8-3-17-18-16-21 2-5 31-28 31-33 3-3-19-20-17-24 1-6 28-29 25-31 0-2-20-20-21-25-2-7 29-31 29-35 0-3-20-19-18-23 1-5 23-24 25-33 8Z" fill="url(#s05-frosting-material)" stroke="#2C282A" strokeOpacity=".22" strokeWidth="1.2" />
        <ellipse cx="200" cy="109" rx="126" ry="30" fill={frostingTop} stroke="#2C282A" strokeOpacity=".22" strokeWidth="1.4" />
        <path d="M100 103c52-17 142-18 205 2" fill="none" stroke="#FFF9ED" strokeOpacity=".48" strokeWidth="5" strokeLinecap="round" />
      </g>

      {configuration.flowers.includes("flower-left") && (
        <g data-testid="s05-flower-left" transform="translate(116 104) rotate(-12)">
          <ellipse cx="0" cy="17" rx="27" ry="6" fill="#2C282A" opacity="0.1" />
          <image href={`${ASSET_ROOT}/flower-leaf.svg`} x="-33" y="-2" width="48" height="29" />
          <image href={`${ASSET_ROOT}/flower-bloom.svg`} x="-20" y="-20" width="43" height="43" />
        </g>
      )}
      {configuration.flowers.includes("flower-right") && (
        <g data-testid="s05-flower-right" transform="translate(284 108) rotate(14)">
          <ellipse cx="0" cy="15" rx="25" ry="6" fill="#2C282A" opacity="0.1" />
          <image href={`${ASSET_ROOT}/flower-leaf.svg`} x="-12" y="-3" width="46" height="28" transform="scale(-1 1) translate(-22 0)" />
          <image href={`${ASSET_ROOT}/flower-bloom.svg`} x="-20" y="-20" width="41" height="41" />
        </g>
      )}

      {configuration.topper === "topper-loop" && (
        <g data-testid="s05-topper" transform="translate(159 25)">
          <ellipse cx="41" cy="88" rx="23" ry="4" fill="#2C282A" opacity="0.1" />
          <image href={`${ASSET_ROOT}/cake-topper.svg`} width="82" height="96" />
        </g>
      )}

      {configuration.candles.map((id) => {
        const position = CAKE_CANDLE_POSITIONS[id];
        if (!position) return null;
        return (
          <g key={id} data-testid={`s05-${id}`} transform={`translate(${position.x} ${position.y}) rotate(${position.rotation})`}>
            <ellipse cx="10" cy="84" rx="8.2" ry="2.8" fill="#2C282A" opacity="0.18" />
            <image href={`${ASSET_ROOT}/candle-wick.svg`} width="20" height="12" y="18" />
            <image href={`${ASSET_ROOT}/candle-body.svg`} width="20" height="63" y="20" />
          </g>
        );
      })}

      {hasPearls && (
        <g data-testid="s05-accent-pearls">
          {[112, 142, 172, 202, 232, 262, 292].map((x, index) => (
            <circle key={x} cx={x} cy={190 + Math.abs(3 - index) * 1.8} r="6.4" fill="url(#s05-pearl)" stroke="#2C282A" strokeOpacity=".14" />
          ))}
        </g>
      )}
    </svg>
  );
}
