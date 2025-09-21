import { useEffect, useState } from "react";
import Tablecoin from "../modules/TableCoin";
import { getCoinList } from "../services/CryptoApi";
import Pagination from "../modules/Pagination";
import Search from "../modules/search";


export type coin = {
    id: string;
    name:string;
    image:string;
    current_price: number;
    symbol: string;
    price_change_percentage_24h: number;
    total_volume: string;
}

export type exchangeType = "usd" | "eur" | "jpy";


export default function HomePage () {
    const [coins , setCoins ] = useState<coin[]>([]);
    const [isLoading , setIsLoading] = useState<boolean>(true);
    const [page , setPage ] = useState<number>(1);
    const [currency , setCurrency ] = useState<exchangeType>("usd");

    useEffect(() => {
        setIsLoading(true);
        const getData = async () => {
            const res = await fetch(getCoinList(page , currency));
            const json = await res.json();
            setCoins(json);
            setIsLoading(false);
        }

        getData();
    }, [page , currency])
  return (
    <div>
        <Search currency={currency} setCurrency={setCurrency} />
        <Tablecoin coins={coins} isLoading={isLoading}/>
        <Pagination page={page} setPage={setPage} />
    </div>
  );
}
