import { Decimal } from "decimal.js";
import { linspace } from "../utils/linspace";
import { N_POINTS } from "./constants";

export interface uniSwapV2Params {
  s: Decimal;
}

export interface balancerParams {
  wx: number;
  s: Decimal;
}

export function uniSwapV2Liquidity(
  lower: number,
  upper: number,
  params: uniSwapV2Params
) {
  const { s } = params;
  const X = linspace(lower, upper, N_POINTS);
  const Y = X.map((x) => s.toNumber());
  return { X, Y };
}

export function balancerLiquidity(
  lower: number,
  upper: number,
  params: balancerParams
) {
  const { s, wx } = params;
  const wy = 1 - wx;
  const X = linspace(lower, upper, N_POINTS);
  console.log(s.toNumber(), wx, lower, upper);
  const Y = X.map((x) =>
    s
      .mul(2)
      .mul(Decimal.pow(wx, wy))
      .mul(Decimal.pow(wy, wx))
      .mul(Decimal.exp((wx - 0.5) * x))
      .toNumber()
  );
  return { X, Y };
}
