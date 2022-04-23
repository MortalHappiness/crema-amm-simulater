interface IChart {
  data?: any[];
}

const Chart = ({ data }: IChart) => {
  return (
    <div className="site-layout-background bg-white p-4 min-h-full">Chart</div>
  );
};

export default Chart;
