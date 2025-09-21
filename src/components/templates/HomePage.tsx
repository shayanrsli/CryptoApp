import { useEffect, useState } from "react";
import Tablecoin from "../modules/TableCoin";
import { getCoinList } from "../services/CryptoApi";


export type coin = {
    id: string;
    name:string;
    image:string;
    current_price: number;
}

export default function HomePage () {
    const [coins , setCoins ] = useState<coin[]>([]);

    useEffect(() => {
        const getData = async () => {
            const res = await fetch(getCoinList());
            const json = await res.json();
            setCoins(json)
        }

        getData()
    }, [])
  return (
    <div>
          <Tablecoin coins={coins}/>
    </div>
  );
}
