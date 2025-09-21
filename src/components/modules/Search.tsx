import type { Dispatch, SetStateAction } from "react";
import type { exchangeType } from "../templates/HomePage";


type currencyProps = {
    currency : exchangeType; 
    setCurrency : Dispatch<SetStateAction<exchangeType>>
}

export default function Search ({setCurrency , currency} : currencyProps) {
  return (
    <div>
      <input type="text"/>
      <select   value={currency}  onChange={(e) => setCurrency(e.target.value as exchangeType)}>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select> 
    </div>
  );
}