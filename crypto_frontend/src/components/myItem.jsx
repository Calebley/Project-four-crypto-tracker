import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router"
import { useGetCryptoDetailsQuery } from "../reducers/cryptoApi"
import millify from "millify"
import urlcat from "urlcat"

const BACKEND = "http://localhost:3001"

const MyItem = (coinUuid) => {
    const navigate = useNavigate()
    const { data } = useGetCryptoDetailsQuery(coinUuid.coinUuid)
    const [coinData, setCoinData] = useState(data)


    //This method will delete a coin off watchlist
    const handleDelete = async (id) => {
        const url = urlcat(BACKEND, `/coin/delete/${id}`)
        const response = await fetch(url, { method: "DELETE", credentials: "include" })

        if (response.status === 200) {
            navigate("/")

        }
    }

    return (
        <div>

            <div class="card card-compact w-96 h-80 shadow" >
                <div class="card-actions justify-end">
                    <button class="btn btn-square btn-xs" onClick={() => handleDelete(coinUuid.watchlistId)}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="x" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <figure class="px-10 pt-10">
                    <img src={data?.data?.coin.iconUrl} alt="Shoes" class="h-24 w-96" />
                </figure>
                <div class="card-body items-center text-center">
                    <h2 class="card-title">${data?.data?.coin.name}</h2>
                    <p class="text-sm">Price (USD): {millify(data?.data?.coin.price)}</p>
                    <p class="text-sm">Market Cap (USD): {millify(data?.data?.coin.marketCap)}</p>
                    <p class="text-sm">Daily Change: {millify(data?.data?.coin.change)}%</p>

                </div>
            </div>


        </div>
    )
}

export default MyItem