import type { NextPage } from "next";
import Header from "../core/components/Header";
import Chart from "../core/components/Chart";
import HandleCard from "../core/components/HandleCard";

import { tick2PriceTest } from "../core/crema";

const Home: NextPage = () => {
  console.log(tick2PriceTest());

  return (
    <div className="min-h-screen">
      <Header title={"CREMA AMM SIMULATER"} subtitle={"HACKATHON 3.0"} />
      <div className="grid grid-cols-2 gap-4 p-4 min-h-100">
        <HandleCard />

        {/* TODO: replace x and y */}
        <Chart
          x={[1000, 1500, 2000, 2500, 3000, 3500]}
          y={[33, 25, 35, 51, 54, 76]}
        />
      </div>
    </div>
  );
};

export default Home;
