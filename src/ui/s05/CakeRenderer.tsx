import type { CakeConfiguration } from "../../runtime/contracts";

const ASSET_ROOT = "/assets/svg/cake";

export const CAKE_CANDLE_POSITIONS: Record<string, { x: number; y: number; rotation: number }> = {
  "candle-outer-left": { x: 118, y: 62, rotation: -3 },
  "candle-left": { x: 151, y: 54, rotation: -2 },
  "candle-center": { x: 190, y: 48, rotation: 0 },
  "candle-right": { x: 229, y: 54, rotation: 2 },
  "candle-outer-right": { x: 262, y: 62, rotation: 3 },
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
        <filter id="s05-cool-frosting" colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="0 0 0 0 0.529 0 0 0 0 0.580 0 0 0 0 0.800 0 0 0 1 0" />
        </filter>
      </defs>

      <image href={`${ASSET_ROOT}/cake-body-base.svg`} width="400" height="300" />
      {hasRibbon && <image data-testid="s05-accent-ribbon" href={`${ASSET_ROOT}/cake-accent-ribbon.svg`} width="400" height="300" />}
      <image
        data-testid="s05-frosting"
        href={`${ASSET_ROOT}/cake-frosting-silhouette.svg`}
        width="400"
        height="300"
        filter={cool ? "url(#s05-cool-frosting)" : undefined}
      />
      <image href={`${ASSET_ROOT}/cake-frosting-edge.svg`} width="400" height="300" />

      {configuration.flowers.includes("flower-left") && (
        <g data-testid="s05-flower-left" transform="translate(112 118) rotate(-12)">
          <ellipse cx="0" cy="17" rx="27" ry="6" fill="#2C282A" opacity="0.1" />
          <image href={`${ASSET_ROOT}/flower-leaf.svg`} x="-33" y="-2" width="48" height="29" />
          <image href={`${ASSET_ROOT}/flower-bloom.svg`} x="-20" y="-20" width="43" height="43" />
        </g>
      )}
      {configuration.flowers.includes("flower-right") && (
        <g data-testid="s05-flower-right" transform="translate(281 124) rotate(14)">
          <ellipse cx="0" cy="15" rx="25" ry="6" fill="#2C282A" opacity="0.1" />
          <image href={`${ASSET_ROOT}/flower-leaf.svg`} x="-12" y="-3" width="46" height="28" transform="scale(-1 1) translate(-22 0)" />
          <image href={`${ASSET_ROOT}/flower-bloom.svg`} x="-20" y="-20" width="41" height="41" />
        </g>
      )}

      {configuration.topper === "topper-loop" && (
        <g data-testid="s05-topper" transform="translate(169 18)">
          <ellipse cx="31" cy="114" rx="19" ry="4" fill="#2C282A" opacity="0.1" />
          <image href={`${ASSET_ROOT}/cake-topper.svg`} width="62" height="72" />
        </g>
      )}

      {configuration.candles.map((id) => {
        const position = CAKE_CANDLE_POSITIONS[id];
        if (!position) return null;
        return (
          <g key={id} data-testid={`s05-${id}`} transform={`translate(${position.x} ${position.y}) rotate(${position.rotation})`}>
            <ellipse cx="10" cy="84" rx="8.2" ry="2.8" fill="#2C282A" opacity="0.18" />
            <image href={`${ASSET_ROOT}/candle-body.svg`} width="20" height="63" y="20" />
          </g>
        );
      })}

      {hasPearls && (
        <g data-testid="s05-accent-pearls">
          {[112, 142, 172, 202, 232, 262, 292].map((x, index) => (
            <image key={x} href={`${ASSET_ROOT}/cake-accent-pearl.svg`} x={x} y={185 + Math.abs(3 - index) * 1.8} width="13" height="13" />
          ))}
        </g>
      )}
    </svg>
  );
}
