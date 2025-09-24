import type { coin } from "../templates/HomePage";
import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";
import { RotatingLines } from "react-loader-spinner";
import type { Dispatch, SetStateAction } from "react";
import { marketChart } from "../services/CryptoApi";

type TableCoinsProps = {
  coins: coin[];
  isLoading: any;
  setChart: Dispatch<SetStateAction<any>>
};

type TableCoinProps = {
  coin: coin;
  setChart: Dispatch<SetStateAction<any>>
};

export default function Tablecoin({ coins, isLoading ,setChart }: TableCoinsProps) {
  return (
    <div className="overflow-x-auto rounded-xl bg-black p-4">
      {isLoading ? (
        <div className="flex justify-center py-20">
          <RotatingLines strokeColor="#3874ff" strokeWidth="4" />
        </div>
      ) : (
        <table className="min-w-full divide-y divide-gray-700 bg-black">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Coin
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Price
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                24h %
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Total Volume
              </th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {coins?.map((coin) => (
              <TableRow key={coin.id} coin={coin}  setChart={setChart} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export const TableRow = ({ coin , setChart }: TableCoinProps) => {

  const showHandler = async () => {
     try {
        const res = await fetch(marketChart(coin.id))
        const json = await  res.json()
        console.log(json);
        setChart(json)
     } catch (error) {
        setChart(null)
     }
  }
  return (
    <tr className="hover:bg-gray-900 transition-colors duration-150 cursor-pointer">
      <td className="px-4 py-3 flex items-center gap-3" onClick={showHandler}>
        <img
          src={coin.image}
          alt={coin.name}
          className="w-7 h-7 rounded-full"
          style={{width: "45px" }}
        />
        <span className="font-semibold text-white">{coin.symbol.toUpperCase()}</span>
      </td>
      <td className="px-4 py-3 text-gray-300 font-medium">{coin.name}</td>
      <td className="px-4 py-3 text-white font-semibold">
        ${coin.current_price.toLocaleString()}
      </td>
      <td
        className={`px-4 py-3 font-semibold ${
          coin.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"
        }`}
      >
        {coin.price_change_percentage_24h.toFixed(2)}%
      </td>
      <td className="px-4 py-3 text-gray-300">
        ${coin.total_volume.toLocaleString()}
      </td>
      <td className="px-4 py-3">
        <img
          alt={coin.name}
          src={coin.price_change_percentage_24h > 0 ? chartUp : chartDown}
          className="w-5 h-5"
        />
      </td>
    </tr>
  );
};
