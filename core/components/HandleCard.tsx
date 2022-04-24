import StrategySumCard from "./StrategySumCard";
import { useState } from "react";
import StrategyDetail from "./StrategyDetail";

interface IHandleCard {
  onChange?(): void;
}

const strategyData = [
  { id: "moderate", name: "Moderate Range" },
  { id: "fifty", name: "50:50 HODL Strategy" },
  { id: "hundred", name: "100:100 HODL Strategy" },
];

const HandleCard = ({ onChange }: IHandleCard) => {
  const [details, setDetails] = useState("");

  const handleOnClick = (id: string) => {
    console.log("crema-amm-simulater", id);
    setDetails(id);
  };

  return (
    <div className="bg-[linear-gradient(214deg,#3e434e,#23262b)] p-4 min-h-full rounded-xl text-white space-y-4">
      <p className="text-lg">Strategies</p>

      {!details &&
        strategyData?.map((item, index) => (
          <div key={index}>
            <StrategySumCard
              srategyName={item?.name}
              onClick={() => handleOnClick(item?.id)}
            />
          </div>
        ))}

      {details && (
        <>
          <div onClick={() => setDetails("")}>{`<- back`}</div>
          <StrategyDetail />
        </>
      )}
    </div>
  );
};

export default HandleCard;
