import type { NextPage } from "next";
import Header from "../core/components/Header";
import Chart from "../core/components/Chart";
import HandleCard from "../core/components/HandleCard";

import { Decimal } from "decimal.js";
import {
  MAX_PRICE,
  MAX_TICK,
  MIN_PRICE,
  MIN_TICK,
} from "@cremafinance/crema-sdk";
import {
  calculateTokenAmountPoints,
  getConstantLiquidityAssetValuePoints,
} from "../core/crema";
import { constantLiquidity } from "../core/liquidityFuncs";
import { linspace } from "../utils/linspace";
import { N_POINTS } from "../core/constants";

const currentPrice = new Decimal(2958);
const minPrice = 1183;
const maxPrice = 7395;
// const minPrice = MIN_PRICE.toNumber();
// const maxPrice = MAX_PRICE.toNumber();
const desiredAmountSrc = new Decimal(16.9243);
const ticks = linspace(MIN_TICK, MAX_TICK, N_POINTS);
const liquidities = constantLiquidity(
  ticks,
  desiredAmountSrc,
  currentPrice.sqrt()
);

const { X: X2, Y: Y2 } = calculateTokenAmountPoints(
  ticks,
  liquidities,
  currentPrice.sqrt()
);
// const { X, Y } = getConstantLiquidityAssetValuePoints(
//   currentPrice,
//   minPrice,
//   maxPrice,
//   desiredAmountSrc
// );

const Home: NextPage = () => {
  return (
    <div className="min-h-screen">
      <Header title={"CREMA AMM SIMULATER"} subtitle={"HACKATHON 3.0"} />
      <div className="grid grid-cols-2 gap-4 p-4 min-h-100">
        <HandleCard />

        {/* TODO: replace x and y */}
        <Chart
          title={"Asset Value"}
          x={ticks}
          y={liquidities.map((l) => l.toNumber())}
          xtitle={"Price (Y/X)"}
          ytitle={"Asset Value (Y)"}
        />
        <Chart
          title={"Liqudity Distribution"}
          x={ticks}
          y={liquidities.map((l) => l.toNumber())}
          xtitle={"Tick"}
          ytitle={"Liquidity"}
        />
        <Chart
          title={"AMM Curve"}
          x={X2.map((x) => x.toNumber())}
          y={Y2.map((y) => y.toNumber())}
          xtitle={"X Reserves"}
          ytitle={"Y Reserves"}
        />
      </div>
    </div>
  );
};

export default Home;
