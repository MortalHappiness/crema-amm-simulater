interface IStrategyDetail {
  srategyName?: string;
  coinPair?: string;
}

const StrategyDetail = ({ srategyName, coinPair }: IStrategyDetail) => {
  return (
    <div>
      <div>
        {srategyName || "Moderate Range"}
        {coinPair || "ETH/USDC"}
      </div>
      <div>Slider</div>
      <div>input * 4</div>
      <div>summary</div>
    </div>
  );
};

export default StrategyDetail;
