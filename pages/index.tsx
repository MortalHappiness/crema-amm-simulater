import type { NextPage } from "next";
import Header from '../core/components/Header'


import { tick2PriceTest } from "../core/crema";

const Home: NextPage = () => {
  console.log(tick2PriceTest());
  return (
    <div>
      <Header />      
    </div>
  );
};

export default Home;
