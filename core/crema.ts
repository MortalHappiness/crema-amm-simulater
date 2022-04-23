import { Decimal } from "decimal.js";
import {
  price2Tick,
  calculateLiquity,
  calculateTokenAmount,
  MIN_PRICE,
  MAX_PRICE,
  tick2SqrtPrice,
} from "@cremafinance/crema-sdk";

import { linspace } from "../utils/linspace";
import { N_POINTS } from "./constants";

export function calculateTokenAmountPoints(
  ticks: number[],
  liquidities: Decimal[],
  currentSqrtPrice: Decimal
) {
  const X: Decimal[] = [];
  const Y: Decimal[] = [];
  const price: Decimal[] = ticks.map((x) => tick2SqrtPrice(x));
  for (let i = 0; i < liquidities.length - 1; ++i) {
    const { amountA, amountB } = calculateTokenAmount(
      ticks[i],
      ticks[i + 1],
      liquidities[i],
      tick2SqrtPrice(Math.floor(ticks[i] + ticks[i + 1]) / 2)
    );
    X.push(amountA);
    Y.push(amountB);
  }
  return { X, Y };
}

export function calculateDesiredAmountDst(
  currentPrice: number,
  minPrice: number,
  maxPrice: number,
  desiredAmountSrc: number
) {
  const tickLower = price2Tick(new Decimal(minPrice));
  const tickUpper = price2Tick(new Decimal(maxPrice));
  const { desiredAmountDst } = calculateLiquity(
    tickLower,
    tickUpper,
    new Decimal(desiredAmountSrc),
    new Decimal(currentPrice).sqrt(),
    0
  );
  return desiredAmountDst;
}

export function getConstantLiquidityAssetValuePoints(
  currentPrice: number,
  minPrice: number,
  maxPrice: number,
  desiredAmountSrc: number
): {
  X: number[];
  Y: number[];
} {
  const tickLower = price2Tick(new Decimal(minPrice));
  const tickUpper = price2Tick(new Decimal(maxPrice));
  const { desiredAmountDst, deltaLiquity } = calculateLiquity(
    tickLower,
    tickUpper,
    new Decimal(desiredAmountSrc),
    new Decimal(currentPrice).sqrt(),
    0
  );
  const X = linspace(minPrice, maxPrice, N_POINTS);
  const Y = X.map((price) => {
    const { amountA, amountB } = calculateTokenAmount(
      tickLower,
      tickUpper,
      deltaLiquity,
      new Decimal(price).sqrt()
    );
    return amountA.mul(price).add(amountB).toNumber();
  });
  return { X, Y };
}
