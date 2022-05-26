import millify from "millify";
import React from "react";
import { useParams } from "react-router";
import { useGetCryptoDetailsQuery } from "../reducers/cryptoApi";

const CryptoInfo = () => {
    const { coinId } = useParams()
    const { data, isFetching } = useGetCryptoDetailsQuery(coinId)
    const cryptoInfo = data?.data?.coin

    if (isFetching) return "Loading..."
    console.log(data)

    const stats = [
        { title: "Price to USD:", value: `$${cryptoInfo.price && millify(cryptoInfo.price)}` },
        { title: "Rank:", value: `${cryptoInfo.rank}` },
        { title: "24h Volume:", value: `${cryptoInfo && millify(cryptoInfo["24hVolume"])}` },
        { title: 'Market Cap:', value: `$ ${cryptoInfo?.marketCap && millify(cryptoInfo?.marketCap)}` },
        { title: 'All-time-high(daily avg.):', value: `$ ${cryptoInfo?.allTimeHigh?.price && millify(cryptoInfo?.allTimeHigh?.price)}` }
    ]

    return (
        <div>
            <div className="flex flex-row p-1 items-center ">
                <img class="object-scale-down h-10 w-10"src={cryptoInfo.iconUrl}></img>
                <p class="text-xl font-bold">{cryptoInfo.name}</p>
            </div>
        </div>
    )
}

export default CryptoInfo