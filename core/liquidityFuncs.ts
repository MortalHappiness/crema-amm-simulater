import { Decimal } from "decimal.js";
import { calculateLiquity, MAX_TICK, MIN_TICK } from "@cremafinance/crema-sdk";
import { linspace } from "../utils/linspace";

export function constantLiquidity(
  ticks: number[],
  desiredAmountSrc: Decimal,
  currentSqrtPrice: Decimal
) {
  const { deltaLiquity } = calculateLiquity(
    MIN_TICK,
    MAX_TICK,
    desiredAmountSrc,
    currentSqrtPrice,
    0
  );
  const liquity = deltaLiquity;
  return ticks.map((_) => liquity);
}
