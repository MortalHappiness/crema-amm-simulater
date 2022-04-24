import { Decimal } from "decimal.js";

export interface AMM {
  calculateS(
    desiredAmountSrc: Decimal,
    desiredAmountDst: Decimal,
    params?: any
  ): Decimal;
  reserves(X: number[], s: Decimal, params?: any): number[];
  liquidities(X: number[], params?: any): number[];
}

export class UniSwapV2 implements AMM {
  calculateS(desiredAmountSrc: Decimal, desiredAmountDst: Decimal): Decimal {
    return desiredAmountSrc.mul(desiredAmountDst).sqrt();
  }

  reserves(X: number[], s: Decimal): number[] {
    const Y = X.map((x) => s.toPower(2).div(new Decimal(x)).toNumber());
    return Y;
  }

  liquidities(X: number[], params: { s: Decimal }): number[] {
    const { s } = params;
    const Y = X.map((x) => s.toNumber());
    return Y;
  }
}

export class Balancer implements AMM {
  calculateS(
    desiredAmountSrc: Decimal,
    desiredAmountDst: Decimal,
    params: { wx: number }
  ): Decimal {
    const { wx } = params;
    const wy = 1 - wx;
    return desiredAmountSrc.toPower(wx).mul(desiredAmountDst.toPower(wy));
  }

  reserves(X: number[], s: Decimal, params: { wx: number }): number[] {
    const { wx } = params;
    const wy = 1 - wx;
    const Y = X.map((x) =>
      s.div(Decimal.pow(x, wx)).toPower(Decimal.div(1, wy)).toNumber()
    );
    return Y;
  }

  liquidities(X: number[], params: { wx: number; s: Decimal }): number[] {
    const { s, wx } = params;
    const wy = 1 - wx;
    const Y = X.map((x) =>
      s
        .mul(2)
        .mul(Decimal.pow(wx, wy))
        .mul(Decimal.pow(wy, wx))
        .mul(Decimal.exp((wx - 0.5) * x))
        .toNumber()
    );
    return Y;
  }
}
