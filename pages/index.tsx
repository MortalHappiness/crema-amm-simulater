import type { NextPage } from "next";
import Header from "../core/components/Header";
import Chart from "../core/components/Chart";
import HandleCard from "../core/components/HandleCard";

import { Decimal } from "decimal.js";
import { calculateLiquity, price2Tick } from "@cremafinance/crema-sdk";
import { linspace } from "../utils/linspace";
import { UniSwapV2, Balancer } from "../core/amm";
import { N_POINTS } from "../core/constants";

const uniSwapV2 = new UniSwapV2();
const balancer = new Balancer();

const currentPrice = new Decimal(200);
const minPrice = new Decimal(1);
const maxPrice = new Decimal(300);
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

const X1 = linspace(lower, upper, N_POINTS);
const X1L = linspace(tickLower, tickUpper, N_POINTS);

const s1 = uniSwapV2.calculateS(desiredAmountSrc, desiredAmountDst);
const Y1 = uniSwapV2.reserves(X1, s1);
const Y1L = uniSwapV2.liquidities(X1L, { s: s1 });

const wx = 0.25;
const s2 = balancer.calculateS(desiredAmountSrc, desiredAmountDst, { wx });
const Y2 = balancer.reserves(X1, s2, { wx });
const Y2L = balancer.liquidities(X1L, { s: s2, wx });

const Home: NextPage = () => {
  return (
    <div className="min-h-screen">
      <Header title={"AMM SIMULATER"} />
      <div className="grid grid-cols-2 gap-4 p-4 min-h-100">
        <HandleCard />

        <Chart
          title={"AMM Curve"}
          x={X1}
          ys={[Y1, Y2]}
          labels={["uniSwap v2", `balancer (wx = ${0.25})`]}
          xtitle={"X Reserves"}
          ytitle={"Y Reserves"}
        />
        <Chart
          title={"Liqudity Distribution"}
          x={X1L}
          ys={[Y1L, Y2L]}
          labels={["uniSwap v2", `balancer (wx = ${0.25})`]}
          xtitle={"Tick"}
          ytitle={"Liquidity"}
        />
      </div>
    </div>
  );
};

export default Home;
