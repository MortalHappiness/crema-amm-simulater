import { Decimal } from "decimal.js";
import {
  price2Tick,
  calculateLiquity,
  calculateTokenAmount,
} from "@cremafinance/crema-sdk";

import { linspace } from "../utils/linspace";

const N_POINTS = 1000;

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

export function getCremaCLMMPoints(
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
