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
  const [coins, setCoins] = useState<coinType[]>([])  // <-- دیگه پیش فرض نخوابون
  const [loading , setLoading ] = useState<boolean>(false)

  useEffect(() => {
    const controller = new AbortController()

    if (!text) {
      setCoins([])   // <-- وقتی سرچ خالیه لیست خالی باشه
      setLoading(false)
      return
    }

    const search = async () => {
      try {
        const res = await fetch(searchCoin(text), { signal: controller.signal })
        const json = await res.json()
        if (json.coins){
          setCoins(json.coins)
        } else {
          setCoins([])  // وقتی هیچ کوینی پیدا نشد لیست خالی باشه
        }
        setLoading(false)
      } catch (error) {
        console.log(error)
        setCoins([])
        setLoading(false)
      }
    }

    setLoading(true)
    search()
    return () => controller.abort()
  }, [text])

  return (
    <div className="bg-black text-white flex flex-col items-center py-10 px-4">
      
      {/* سرچ بار */}
      <div className="flex flex-col sm:flex-row gap-3 items-center w-full max-w-xl mb-4">
        <input 
          type="text" 
          placeholder="Search coins..." 
          value={text} 
          onChange={(e) => setText(e.target.value)}
          className="w-full sm:flex-1 px-4 py-2 rounded-lg bg-gray-800 
                     border border-gray-700 focus:border-blue-500 
                     focus:ring-2 focus:ring-blue-500 outline-none 
                     text-sm transition"
        />
        <select 
          value={currency}  
          onChange={(e) => setCurrency(e.target.value as exchangeType)}
          className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 
                     focus:border-blue-500 focus:ring-2 focus:ring-blue-500 
                     outline-none text-sm"
        >
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="jpy">JPY</option>
        </select> 
      </div>

      {/* لودر */}
      {loading && (
        <div className="flex justify-center my-6">
          <RotatingLines width="40px" strokeWidth="3" strokeColor="#3b82f6"/>
        </div>
      )}

      {/* نتایج */}
      {coins.length > 0 && (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-4xl">
          {coins.map((coin) => (
            <li 
              key={coin.id} 
              className="bg-gray-800 border border-gray-700 rounded-xl 
                         p-4 flex items-center gap-3 hover:border-blue-500 
                         transition cursor-pointer"
            >
              <img src={coin.thumb} alt={coin.name} className="w-10 h-10 rounded-full" />
              <p className="text-base">{coin.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
