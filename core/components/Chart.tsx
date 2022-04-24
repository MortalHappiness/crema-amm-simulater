import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface IChartSession {
  title?: string;
  x: number[];
  ys: number[][];
  labels: string[];
  xtitle: string;
  ytitle: string;
  type?: "bar" | "line";
}

/** */
const ChartSession = ({
  title,
  x,
  ys,
  labels,
  xtitle,
  ytitle,
  type = "line",
}: IChartSession) => {
  const options = {
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: xtitle,
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: ytitle,
        },
      },
    },
    radius: 0,
  };

  const backgroundColors = ["rgba(75,192,192,0.2)"];
  const borderColors = ["rgba(75,192,192,1)", "#742774", "#1fb6ff"];

  const data = {
    labels: x,
    datasets: ys.map((y, idx) => {
      return {
        label: labels[idx] || "",
        data: ys[idx] || [],
        fill: true,
        backgroundColor: backgroundColors[idx],
        borderColor: borderColors[idx],
      };
    }),
  };

  return (
    <div className=" bg-[linear-gradient(214deg,#3e434e,#23262b)] p-4 min-h-full rounded-xl text-white">
      <p className="text-lg">{title || "Analysis"}</p>

      {type === "line" && <Line data={data} options={options} />}
      {type === "bar" && <Bar data={data} options={options} />}
    </div>
  );
};

export default ChartSession;
