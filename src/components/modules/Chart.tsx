import { useState, type SetStateAction , type Dispatch } from "react";
import { ConverData } from "../../helpers/ConverData";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type chartProps = {
  chart: any;
  setChart: Dispatch<SetStateAction<boolean>>;
};

export type chartType = "prices" | "market_caps" | "total_volume";

export default function Chart({ chart, setChart }: chartProps) {
  const [type, setType] = useState<chartType>("prices");
  console.log(chart.coin);

  if (!chart) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl p-6 w-[800px] h-[600px] border border-white/30 flex flex-col gap-4">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-white">Coin Details</h2>
          <button
            onClick={() => setChart(false)}
            className="px-3 py-1 rounded-lg bg-red-500/80 hover:bg-red-500 text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Coin Info */}
        <div className="flex flex-col items-center gap-2">
          <img
            src={chart.coin.image}
            alt={chart.coin.name}
            className="w-16 h-16 rounded-full shadow-lg"
          />
          <p className="text-xl font-semibold text-white">{chart.coin.name}</p>
        </div>

        {/* Chart */}
        <div className="flex-1 bg-black/20 rounded-xl p-2">
          <ChartComponent data={ConverData(chart, type)} type={type} />
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-3">
          <button
            onClick={() => setType("prices")}
            className={`px-4 py-2 rounded-lg transition ${
              type === "prices"
                ? "bg-blue-500 text-white"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            Prices
          </button>
          <button
            onClick={() => setType("market_caps")}
            className={`px-4 py-2 rounded-lg transition ${
              type === "market_caps"
                ? "bg-blue-500 text-white"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            Market Caps
          </button>
          <button
            onClick={() => setType("")}
            className={`px-4 py-2 rounded-lg transition ${
              type === ""
                ? "bg-blue-500 text-white"
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
          >
            Total Volumes
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/10 rounded-lg p-3 shadow-md">
            <p className="text-sm text-gray-300">Current Price</p>
            <span className="text-lg font-bold text-white">
              ${chart.coin.current_price}
            </span>
          </div>
          <div className="bg-white/10 rounded-lg p-3 shadow-md">
            <p className="text-sm text-gray-300">ATH</p>
            <span className="text-lg font-bold text-white">
              ${chart.coin.ath}
            </span>
          </div>
          <div className="bg-white/10 rounded-lg p-3 shadow-md">
            <p className="text-sm text-gray-300">Market Cap</p>
            <span className="text-lg font-bold text-white">
              {chart.coin.market_cap}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

type chartComponentProps = {
  data: any;
  type: chartType;
};

export const ChartComponent = ({ data, type }: chartComponentProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <Line type="monotone" dataKey={type} stroke="#3874ff" strokeWidth={2} />
        <CartesianGrid stroke="#404042" />
        <YAxis dataKey={type} domain={["auto", "auto"]} />
        <XAxis dataKey="date" hide />
        <Legend />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};
