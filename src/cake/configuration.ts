import type { CakeConfiguration } from "../runtime/contracts";

export const CAKE_FROSTING_OPTIONS = ["cfg-A-coral-garden", "cfg-B-periwinkle-warm"] as const;
export const CAKE_CANDLE_OPTIONS = ["candles-three", "candles-five"] as const;
export const CAKE_FLOWER_OPTIONS = ["flowers-none", "flowers-garden"] as const;
export const CAKE_TOPPER_OPTIONS = ["topper-none", "topper-loop"] as const;
export const CAKE_ACCENT_OPTIONS = ["accent-none", "accent-pearls", "accent-ribbon"] as const;

export type CakeOptionCategory = "frosting" | "candles" | "flowers" | "topper" | "accents";

const CANDLE_THREE = ["candle-left", "candle-center", "candle-right"] as const;
const CANDLE_FIVE = ["candle-outer-left", ...CANDLE_THREE, "candle-outer-right"] as const;
const FLOWER_GARDEN = ["flower-left", "flower-right"] as const;

const PLACEMENT_BY_ID = Object.freeze({
  "candle-outer-left": "top-outer-left",
  "candle-left": "top-left",
  "candle-center": "top-center",
  "candle-right": "top-right",
  "candle-outer-right": "top-outer-right",
  "flower-left": "top-front-left",
  "flower-right": "top-front-right",
  "topper-loop": "top-back-center",
  "accent-pearls": "rim-front",
  "accent-ribbon": "side-front",
} as const);

export const S05_DEFAULT_CAKE_CONFIGURATION: CakeConfiguration = Object.freeze({
  frosting: "cfg-A-coral-garden",
  candles: Object.freeze([...CANDLE_THREE]),
  flowers: Object.freeze([...FLOWER_GARDEN]),
  topper: null,
  accents: Object.freeze(["accent-pearls"]),
  placements: Object.freeze({
    "candle-left": PLACEMENT_BY_ID["candle-left"],
    "candle-center": PLACEMENT_BY_ID["candle-center"],
    "candle-right": PLACEMENT_BY_ID["candle-right"],
    "flower-left": PLACEMENT_BY_ID["flower-left"],
    "flower-right": PLACEMENT_BY_ID["flower-right"],
    "accent-pearls": PLACEMENT_BY_ID["accent-pearls"],
  }),
});

function sameMembers(value: readonly string[], allowed: readonly string[]): boolean {
  return value.length === allowed.length && value.every((item, index) => item === allowed[index]);
}

export function isSupportedCakeConfiguration(configuration: CakeConfiguration): boolean {
  const candlesValid = sameMembers(configuration.candles, CANDLE_THREE) || sameMembers(configuration.candles, CANDLE_FIVE);
  const flowersValid = configuration.flowers.length === 0 || sameMembers(configuration.flowers, FLOWER_GARDEN);
  const topperValid = configuration.topper === null || configuration.topper === "topper-loop";
  const accentsValid = configuration.accents.length === 0 || sameMembers(configuration.accents, ["accent-pearls"]) || sameMembers(configuration.accents, ["accent-ribbon"]);
  if (!CAKE_FROSTING_OPTIONS.includes(configuration.frosting as (typeof CAKE_FROSTING_OPTIONS)[number]) || !candlesValid || !flowersValid || !topperValid || !accentsValid) return false;

  const selected = [...configuration.candles, ...configuration.flowers, ...configuration.accents];
  if (configuration.topper) selected.push(configuration.topper);
  const placements = Object.entries(configuration.placements);
  return placements.length === selected.length && selected.every((id) => {
    const expected = PLACEMENT_BY_ID[id as keyof typeof PLACEMENT_BY_ID];
    return expected !== undefined && configuration.placements[id] === expected;
  });
}

export function applyCakeOption(
  current: CakeConfiguration,
  category: CakeOptionCategory,
  option: string,
): CakeConfiguration | null {
  if (!isSupportedCakeConfiguration(current)) return null;
  const next: CakeConfiguration = {
    frosting: current.frosting,
    candles: [...current.candles],
    flowers: [...current.flowers],
    topper: current.topper,
    accents: [...current.accents],
    placements: { ...current.placements },
  };

  const remove = (ids: readonly string[]) => ids.forEach((id) => { delete (next.placements as Record<string, string>)[id]; });
  const place = (ids: readonly string[]) => ids.forEach((id) => { (next.placements as Record<string, string>)[id] = PLACEMENT_BY_ID[id as keyof typeof PLACEMENT_BY_ID]; });

  switch (category) {
    case "frosting":
      if (!CAKE_FROSTING_OPTIONS.includes(option as (typeof CAKE_FROSTING_OPTIONS)[number])) return null;
      next.frosting = option;
      break;
    case "candles": {
      if (!CAKE_CANDLE_OPTIONS.includes(option as (typeof CAKE_CANDLE_OPTIONS)[number])) return null;
      remove(next.candles);
      next.candles = option === "candles-five" ? [...CANDLE_FIVE] : [...CANDLE_THREE];
      place(next.candles);
      break;
    }
    case "flowers":
      if (!CAKE_FLOWER_OPTIONS.includes(option as (typeof CAKE_FLOWER_OPTIONS)[number])) return null;
      remove(next.flowers);
      next.flowers = option === "flowers-garden" ? [...FLOWER_GARDEN] : [];
      place(next.flowers);
      break;
    case "topper":
      if (!CAKE_TOPPER_OPTIONS.includes(option as (typeof CAKE_TOPPER_OPTIONS)[number])) return null;
      if (next.topper) remove([next.topper]);
      next.topper = option === "topper-loop" ? "topper-loop" : null;
      if (next.topper) place([next.topper]);
      break;
    case "accents":
      if (!CAKE_ACCENT_OPTIONS.includes(option as (typeof CAKE_ACCENT_OPTIONS)[number])) return null;
      remove(next.accents);
      next.accents = option === "accent-none" ? [] : [option];
      place(next.accents);
      break;
  }
  return isSupportedCakeConfiguration(next) ? next : null;
}

export function cakeOptionFor(configuration: CakeConfiguration, category: CakeOptionCategory): string {
  if (category === "frosting") return configuration.frosting;
  if (category === "candles") return configuration.candles.length === 5 ? "candles-five" : "candles-three";
  if (category === "flowers") return configuration.flowers.length ? "flowers-garden" : "flowers-none";
  if (category === "topper") return configuration.topper ?? "topper-none";
  return configuration.accents[0] ?? "accent-none";
}
