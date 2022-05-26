import React, { useEffect, useState } from "react"
import millify from "millify"
import { Outlet, Link } from "react-router-dom"
import { useGetCryptosQuery } from "../reducers/cryptoApi"


const Cryptocurrencies = ({ simplified }) => {
    const count = simplified ? 10 : 100
    const { data: cryptoList, isFetching } = useGetCryptosQuery(count)
    const [cryptos, setCryptos] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        const filteredData = cryptoList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
        setCryptos(filteredData)
    }, [cryptoList, searchTerm])

    if (isFetching) return "Loading..."

    return (
        <div class="flex flex-col space-y-4">
            {!simplified && (
                <div className="search-crypto flex flex-col justify-center items-center">
                    <input type="text" placeholder="Search coins" class="input input-bordered input-primary w-full max-w-xs" onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
            )}
            <div className="crypto-card-container grid grid-cols-5 gap-5">
                {cryptos?.map((currency) => (

                    <Link to={`/crypto/${currency.uuid}`}>
                        <div class="card card-compact w-96 h-80 shadow" key={currency.uuid}>
                            <figure class="px-10 pt-10">
                                <img src={currency.iconUrl} alt="Shoes" class="h-24 w-96" />
                            </figure>
                            <div class="card-body items-center text-center">
                                <h2 class="card-title">${currency.name}</h2>
                                <p class="text-sm">Price (USD): {millify(currency.price)}</p>
                                <p class="text-sm">Market Cap (USD): {millify(currency.marketCap)}</p>
                                <p class="text-sm">Daily Change: {millify(currency.change)}%</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <Outlet />
        </div>
    )
}

export default Cryptocurrencies