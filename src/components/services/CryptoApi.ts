const BASE_URL = 'https://api.coingecko.com/api/v3'
const APIKEY = "CG-82PuhEzZjzEJf52WEXW7YJ7j"
export const getCoinList = (page : number) => {
    return `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=${page}&x_cg_demo_api_key=${APIKEY}`
}

