import { Decimal } from "decimal.js";
import {
  price2Tick,
  calculateLiquity,
  calculateTokenAmount,
  MIN_PRICE,
  MAX_PRICE,
  tick2SqrtPrice,
  tick2Price,
} from "@cremafinance/crema-sdk";

import { linspace } from "../utils/linspace";
import { N_POINTS } from "./constants";
import { min } from "lodash";
import { balancerOption } from "./amm";

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

export function getConcentrateLiquidityAssetValuePoints(
  currentPrice: Decimal,
  minPrice: Decimal,
  maxPrice: Decimal,
  desiredAmountSrc: Decimal
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
  const X = linspace(minPrice.toNumber(), maxPrice.toNumber(), N_POINTS);
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

export function getBalancerAssetValuePoints(
  minPrice: Decimal,
  maxPrice: Decimal,
  desiredAmountSrc: Decimal,
  desiredAmountDst: Decimal,
  option: balancerOption
) {
  const { wx } = option;
  const wy = 1 - wx;
  const s = desiredAmountSrc.toPower(wx).mul(desiredAmountDst.toPower(wy));
  const X = linspace(minPrice.toNumber(), maxPrice.toNumber(), N_POINTS);
  const Y = X.map((price) => {
    const { amountA, amountB } = calculateTokenAmount(
      price2Tick(minPrice),
      price2Tick(maxPrice),
      s,
      new Decimal(price).sqrt()
    );
    return amountA.mul(price).add(amountB).toNumber();
  });

  return { X, Y };
}