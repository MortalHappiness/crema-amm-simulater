import type { NextPage } from "next";
import Header from "../core/components/Header";
import Chart from "../core/components/Chart";
import HandleCard from "../core/components/HandleCard";

import { Decimal } from "decimal.js";
import {
  calculateLiquity,
  MAX_PRICE,
  MAX_TICK,
  MIN_PRICE,
  MIN_TICK,
  price2Tick,
} from "@cremafinance/crema-sdk";
import {
  calculateTokenAmountPoints,
  getConstantLiquidityAssetValuePoints,
} from "../core/crema";
import { linspace } from "../utils/linspace";
import { N_POINTS } from "../core/constants";
import { balancer, uniSwapV2 } from "../core/amm";

const currentPrice = new Decimal(2958);
const minPrice = new Decimal(1183);
const maxPrice = new Decimal(7395);
const desiredAmountSrc = new Decimal(16.9243);
const tickLower = price2Tick(minPrice);
const tickUpper = price2Tick(maxPrice);
const { desiredAmountDst } = calculateLiquity(
  tickLower,
  tickUpper,
  desiredAmountSrc,
  currentPrice.sqrt(),
  0
);

const lower = 10;
const upper = 1000;

const { X: X1, Y: Y1 } = uniSwapV2(
  lower,
  upper,
  desiredAmountSrc,
  desiredAmountDst
);

const { X: X2, Y: Y2 } = balancer(
  lower,
  upper,
  desiredAmountSrc,
  desiredAmountDst,
  { wx: 0.25, wy: 0.75 }
);

const Home: NextPage = () => {
  return (
    <div className="min-h-screen">
      <Header title={"CREMA AMM SIMULATER"} subtitle={"HACKATHON 3.0"} />
      <div className="grid grid-cols-2 gap-4 p-4 min-h-100">
        <HandleCard />

        {/* TODO: replace x and y */}
        {/*
        <Chart
          title={"Asset Value"}
          x={ticks}
          y={liquidities.map((l) => l.toNumber())}
          xtitle={"Price (Y/X)"}
          ytitle={"Asset Value (Y)"}
        />
        */}
        <Chart
          title={"AMM Curve (uniSwapv2)"}
          x={X1}
          y={Y1}
          xtitle={"X Reserves"}
          ytitle={"Y Reserves"}
        />
        <Chart
          title={"Liqudity Distribution"}
          x={X1}
          y={Y1}
          xtitle={"Tick"}
          ytitle={"Liquidity"}
        />
        <Chart
          title={"AMM Curve (balancer)"}
          x={X2}
          y={Y2}
          xtitle={"X Reserves"}
          ytitle={"Y Reserves"}
        />
      </div>
    </div>
  );
};

export default Home;
