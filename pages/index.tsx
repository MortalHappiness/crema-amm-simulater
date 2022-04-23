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
        <Chart />
      </div>
    </div>
  );
};

export default Home;
