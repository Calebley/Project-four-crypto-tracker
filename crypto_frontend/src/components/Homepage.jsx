import React from "react"
import { Link } from "react-router-dom"
import millify from "millify"
import { useGetCryptosQuery } from "../reducers/cryptoApi"
import { Cryptocurrencies, News } from "."


const Homepage = () => {

    const { data, isFetching } = useGetCryptosQuery(10)
    const globalStats = data?.data?.stats
    console.log("data", data)

    if (isFetching) return "Loading..."
    return (
        <div class="flex flex-col space-y-4">
            <div class="stats shadow grid gap-4 content-center">

                <div class="stat place-items-center">
                <div class="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path></svg>
                    </div>
                    <div class="stat-title">Total Cryptocurrencies</div>
                    <div class="stat-value">{millify(globalStats.total)}</div>
                </div>

                <div class="stat place-items-center">
                    <div class="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                    </div>
                    <div class="stat-title">Total Exchanges</div>
                    <div class="stat-value">{millify(globalStats.totalExchanges)}</div>
                </div>

                <div class="stat place-items-center">
                    <div class="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                    </div>
                    <div class="stat-title">Total Market Cap (USD)</div>
                    <div class="stat-value">{millify(globalStats.totalMarketCap)}</div>

                </div>

                <div class="stat place-items-center">
                    <div class="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                    </div>
                    <div class="stat-title">Total 24h volume</div>
                    <div class="stat-value">{millify(globalStats.total24hVolume)}</div>

                </div>

                <div class="stat place-items-center">
                    <div class="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    </div>
                    <div class="stat-title">Total Markets</div>
                    <div class="stat-value">{millify(globalStats.totalMarkets)}</div>

                </div>

            </div>
            <div className="home-heading-container grid grid-cols-2 content-end">
                <div class="text-2xl">Top 10 Cryptocurrencies</div>
                <div class="text-right text-xl text-green-500 font-bold"><Link to="/cryptocurrencies">Show more</Link></div>
            </div>
            <Cryptocurrencies simplified />
            <div className="home-heading-container grid grid-cols-2 content-end">
            <div class="text-2xl">Latest Crypto News</div>
                <div class="text-right text-xl text-green-500 font-bold"><Link to="/news">Show more</Link></div>
            </div>
            <News simplified />
        </div>
    )
}

export default Homepage



