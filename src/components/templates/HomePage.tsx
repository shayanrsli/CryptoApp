import { useEffect, useState } from "react";
import Tablecoin from "../modules/TableCoin";
import { getCoinList } from "../services/CryptoApi";
import Pagination from "../modules/Pagination";


export type coin = {
    id: string;
    name:string;
    image:string;
    current_price: number;
    symbol: string;
    price_change_percentage_24h: number;
    total_volume: string;
}

export default function HomePage () {
    const [coins , setCoins ] = useState<coin[]>([]);
    const [isLoading , setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const getData = async () => {
            const res = await fetch(getCoinList());
            const json = await res.json();
            setCoins(json);
            setIsLoading(false);
        }

        getData();
    }, [])
  return (
    <div>
        <Pagination />
          <Tablecoin coins={coins} isLoading={isLoading}/>
    </div>
  );
}
