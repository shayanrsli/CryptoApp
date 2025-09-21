import type { coin } from "../templates/HomePage";
import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";

type TableCoinProps = {
  coins: coin[];
};

export default function Tablecoin({ coins }: TableCoinProps) {
  return (
    <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Coin
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              24h %
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Volume
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {coins?.map((coin) => (
            <tr
              key={coin.id}
              className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
            >
              <td className="px-6 py-4 flex items-center gap-3">
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="rounded-full"
                />
                <span className="font-semibold text-gray-800">
                  {coin.symbol.toUpperCase()}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-700 font-medium">{coin.name}</td>
              <td className="px-6 py-4 text-gray-800 font-semibold">
                ${coin.current_price.toLocaleString()}
              </td>
              <td
                className={`px-6 py-4 font-semibold ${
                  coin.price_change_percentage_24h > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
              <td className="px-6 py-4 text-gray-800">
                ${coin.total_volume.toLocaleString()}
              </td>
              <td>
                <img alt={coin.name} src={coin.price_change_percentage_24h > 0 ? chartUp : chartDown } />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

