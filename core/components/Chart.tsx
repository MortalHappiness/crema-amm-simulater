import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface IChartSession {
  x: number[];
  y: number[];
}

/** */
const ChartSession = ({ x, y }: IChartSession) => {
  const label_1 = "Moderate Range Strategy";
  const fiftyStrategy = "50:50 HODL Strategy";
  const hundredStadge = "100:0 HODL Strategy";

  // TODO: get data
  const fifData: number[] = [];
  const hunData: number[] = [];

  const data = {
    labels: x || [],
    datasets: [
      {
        label: label_1 || "",
        data: y || [],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
      // TODO: 50:50 strategy
      {
        label: fiftyStrategy || "",
        data: fifData || [],
        fill: true,
        borderColor: "#742774",
      },
      // TODO: 100 strategy
      {
        label: hundredStadge || "",
        data: hunData || [],
        fill: true,
        borderColor: "#1fb6ff",
      },
    ],
  };

  return (
    <div className="site-layout-background bg-white p-4 min-h-full">
      <p className="text-lg">Analysis</p>

      <Line data={data} />
    </div>
  );
};

export default ChartSession;