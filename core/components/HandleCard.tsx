import Card from "antd/lib/card";
import Tag from "antd/lib/tag";

interface IHandleCard {
  onChange?(): void;
}

const HandleCard = ({ onChange }: IHandleCard) => {
  const srategyName = "Moderate Range";

  return (
    <div className=" bg-[linear-gradient(214deg,#3e434e,#23262b)] p-4 min-h-full rounded-xl text-white">
      <p className="text-lg">Strategies</p>
      <Card className="border border-[#3f434e] bg-[#23262b] rounded-xl shadow-sm shadow-[0_0_2px_0_#535966,0_2px_3px_1px_#1a1c1f] space-y-4">
        <div className="flex justify-between text-[#f1f1f2] w-100">
          <div className="text-lg">{srategyName + "Strategy"}</div>
          <div>ETH/USDC</div>
        </div>

        <div className="flex space-x-4">
          <div className="flex text-[#f1f1f2] flex-col">
            <div>Asset Value</div>
            <div className="text-lg">${"100,000"}</div>
          </div>
          <div className="flex text-[#f1f1f2] flex-col">
            <div>Position</div>
            <Tag color="green" className="p-1">
              {srategyName}
            </Tag>
          </div>
        </div>
      </Card>
    </div>
  );
};
//0 0 2px 0 #535966,0 2px 3px 1px #1a1c1f
export default HandleCard;
