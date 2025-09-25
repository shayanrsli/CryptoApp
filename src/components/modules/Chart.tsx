import { useState, type SetStateAction , type Dispatch } from "react";
import { ConverData } from "../../helpers/ConverData";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type chartProps = {
  chart: boolean;
  setChart: Dispatch<SetStateAction<boolean>>;
};

export type chartType = "prices" | "market_caps" | "";

export default function Chart({ chart, setChart }: chartProps) {
  const [type, setType] = useState<chartType>("prices");
  console.log(ConverData(chart, type));

  if (!chart) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl p-6 w-[800px] h-[500px] border border-white/30 flex flex-col gap-4">
        
        <button
          onClick={() => setChart(false)}
          className="px-4 py-2 rounded-xl bg-white/30 hover:bg-white/40 text-white transition-colors self-start"
        >
          X
        </button>
        
        {/* کانتینر چارت */}
        <div className="flex-1">
          <ChartComponent data={ConverData(chart, type)} type={type} />
        </div>

        {/* دکمه بستن */}
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
