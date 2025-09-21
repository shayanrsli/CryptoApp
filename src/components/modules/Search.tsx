import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { exchangeType } from "../templates/HomePage";
import { searchCoin } from "../services/CryptoApi";


type currencyProps = {
    currency : exchangeType; 
    setCurrency : Dispatch<SetStateAction<exchangeType>>
}

export default function Search ({setCurrency , currency} : currencyProps) {

    const [text , setText] = useState<string>("")
    const [coins , setCoins] = useState<object[]>([])

    useEffect(() => {
        const  controller = new AbortController()

        if (!text) return;

        const search = async () => {
            try {
                const res = await fetch(searchCoin(text), {signal : controller.signal})
                const json = await res.json();
                console.log(json);                
                if (json.coins){
                    setCoins(json.coins);
                }  else{
                    alert(json.status)
                }
           } catch (error) {
                console.log(error);
            }


        }

        search();
        return () => controller.abort();
    }, [text])

  return (
    <div>
      <input type="text" placeholder="search" value={text} onChange={(e) => setText(e.target.value)} />
      <select   value={currency}  onChange={(e) => setCurrency(e.target.value as exchangeType)}>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select> 
    </div>
  );
}