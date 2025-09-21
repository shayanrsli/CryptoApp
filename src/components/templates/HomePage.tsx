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
    const [page , setPage ] = useState<number>(1);

    useEffect(() => {
        setIsLoading(true);
        const getData = async () => {
            const res = await fetch(getCoinList(page));
            const json = await res.json();
            setCoins(json);
            setIsLoading(false);
        }

        getData();
    }, [page])
  return (
    <div>
        <Pagination page={page} setPage={setPage} />
        <Tablecoin coins={coins} isLoading={isLoading}/>
    </div>
  );
}
