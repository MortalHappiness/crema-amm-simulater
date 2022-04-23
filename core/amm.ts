import { Decimal } from "decimal.js";
import { linspace } from "../utils/linspace";
import { N_POINTS } from "./constants";
import { balancerParams, uniSwapV2Params } from "./liquidity";

export interface balancerOption {
  wx: number;
}

export function uniSwapV2(
  lower: number,
  upper: number,
  desiredAmountSrc: Decimal,
  desiredAmountDst: Decimal
) {
  const s_2 = desiredAmountSrc.mul(desiredAmountDst);
  const X = linspace(lower, upper, N_POINTS);
  const Y = X.map((x) => s_2.div(new Decimal(x)).toNumber());
  const params: uniSwapV2Params = { s: s_2.sqrt() };
  return { X, Y, params };
}

export function balancer(
  lower: number,
  upper: number,
  desiredAmountSrc: Decimal,
  desiredAmountDst: Decimal,
  option: balancerOption
) {
  const { wx } = option;
  const wy = 1 - wx;
  const s = desiredAmountSrc.toPower(wx).mul(desiredAmountDst.toPower(wy));
  const X = linspace(lower, upper, N_POINTS);
  const Y = X.map((x) =>
    s.div(Decimal.pow(x, wx)).toPower(Decimal.div(1, wy)).toNumber()
  );
  const params: balancerParams = { wx, s };
  return { X, Y, params };
}
