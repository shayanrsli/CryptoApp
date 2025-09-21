import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { exchangeType } from "../templates/HomePage";
import { searchCoin } from "../services/CryptoApi";
import { RotatingLines } from "react-loader-spinner";


type currencyProps = {
    currency : exchangeType; 
    setCurrency : Dispatch<SetStateAction<exchangeType>>
}

type coinType  = {
    thumb:string;
    name : string;
    id: number;
}

export default function Search ({setCurrency , currency} : currencyProps) {
  const [text , setText] = useState<string>("")
  const [coins, setCoins] = useState<coinType[]>([{
    thumb: "",
    name: "",
    id: 0
  }]);
  const [loading , setLoading ] = useState<boolean>(false)

  useEffect(() => {
    const  controller = new AbortController()
    setCoins([{
      thumb: "",
      name: "",
      id: 0
    }])
    if (!text) {
      setLoading(false);
      return;
    }

    const search = async () => {
      try {
        const res = await fetch(searchCoin(text), {signal : controller.signal})
        const json = await res.json();
        if (json.coins){
          setLoading(false)
          setCoins(json.coins);
        }  else{
          alert(json.status)
        }
      } catch (error) {
        console.log(error);
      }
    }

    setLoading(true)
    search();
    return () => controller.abort();
  }, [text])

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-10 px-4">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center w-full max-w-2xl mb-8">
        <input 
          type="text" 
          placeholder="Search coins..." 
          value={text} 
          onChange={(e) => setText(e.target.value)}
          className="flex-1 px-4 py-2 rounded-xl bg-gray-900 border border-gray-700 
                     text-white placeholder-gray-500 focus:outline-none 
                     focus:border-blue-500 transition-all"
        />
        <select 
          value={currency}  
          onChange={(e) => setCurrency(e.target.value as exchangeType)}
          className="px-4 py-2 rounded-xl bg-gray-900 border border-gray-700 
                     text-white focus:outline-none focus:border-blue-500"
        >
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="jpy">JPY</option>
        </select> 
      </div>

      {/* Loader */}
      {loading && (
        <div className="flex justify-center my-6">
          <RotatingLines width="50px" strokeWidth="2" strokeColor="#3874ff"/>
        </div>
      )}

      {/* Results */}
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        {coins.map((coin) => (
          <li 
            key={coin.id} 
            className="bg-gray-900 border border-gray-700 rounded-2xl p-4 
                       flex items-center gap-4 hover:border-blue-500 hover:shadow-lg 
                       transition-all cursor-pointer"
          >
            <img src={coin.thumb} alt={coin.name} className="w-10 h-10 rounded-full" />
            <p className="text-lg font-medium">{coin.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
