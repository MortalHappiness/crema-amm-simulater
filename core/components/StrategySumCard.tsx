import Card from "antd/lib/card";
import Tag from "antd/lib/tag";
import { srategyNameMp } from "../constants";

interface IStrategySumCard {
  srategyName?: string;
  onClick?(): void;
}

const StrategySumCard = ({ srategyName, onClick }: IStrategySumCard) => {
  return (
    <Card
      className="border border-[#3f434e] bg-[#23262b] rounded-xl shadow-sm shadow-[0_0_2px_0_#535966,0_2px_3px_1px_#1a1c1f] space-y-4"
      onClick={onClick}
    >
      <div className="flex justify-between text-[#f1f1f2] w-100">
        <div className="text-lg">{srategyName + " Strategy"}</div>
        <div>ETH/USDC</div>
      </div>

      <div className="flex space-x-4">
        <div className="flex text-[#f1f1f2] flex-col">
          <div>Asset Value</div>
          <div className="text-lg">${"100,000"}</div>
        </div>
        <div className="flex text-[#f1f1f2] flex-col">
          <div>Position</div>
          <Tag
            color={
              srategyName === srategyNameMp?.fifty ||
              srategyName === srategyNameMp?.hundred
                ? "green"
                : "geekblue"
            }
            className="p-1"
          >
            {srategyName}
          </Tag>
        </div>
      </div>
    </Card>
  );
};

export default StrategySumCard;
