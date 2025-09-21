import { useEffect, useState } from "react";
import Tablecoin from "../modules/TableCoin";


export type coin = {
    id: string;
    name:string;
    image:string;
    current_price: number;
}

export default function HomePage () {
    const [coins , setCoins ] = useState<coin[]>([]);

    useEffect(() => {
            fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&x_cg_demo_api_key=CG-82PuhEzZjzEJf52WEXW7YJ7j")
            .then(res => res.json())
            .then(json => setCoins(json))
    }, [])
  return (
    <div>
          <Tablecoin coins={coins}/>
    </div>
  );
}
