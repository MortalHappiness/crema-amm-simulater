import type { NextPage } from "next";
import Header from "../core/components/Header";
import Chart from "../core/components/Chart";
import HandleCard from "../core/components/HandleCard";

import { getCremaCLMMPoints } from "../core/crema";
const currentPrice = 2958;
const minPrice = 1183;
const maxPrice = 7395;
const desiredAmountSrc = 16.9243;
const { X, Y } = getCremaCLMMPoints(
  currentPrice,
  minPrice,
  maxPrice,
  desiredAmountSrc
);

const Home: NextPage = () => {
  return (
    <div className="min-h-screen">
      <Header title={"CREMA AMM SIMULATER"} subtitle={"HACKATHON 3.0"} />
      <div className="grid grid-cols-2 gap-4 p-4 min-h-100">
        <HandleCard />

        {/* TODO: replace x and y */}
        <Chart x={X} y={Y} />
      </div>
    </div>
  );
};

export default Home;
