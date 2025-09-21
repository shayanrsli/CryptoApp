import type { exchangeType } from "../templates/HomePage"

const BASE_URL = 'https://api.coingecko.com/api/v3'
const APIKEY = "CG-82PuhEzZjzEJf52WEXW7YJ7j"
export const getCoinList = (page : number , currency: exchangeType) => 
         `${BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=${page}&x_cg_demo_api_key=${APIKEY}`



export const searchCoin = (query : string) => 
    `${BASE_URL}/search?query=${query}&x_cg_demo_api_key=${APIKEY}`

