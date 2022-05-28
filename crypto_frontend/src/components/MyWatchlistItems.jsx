import React, { useState } from "react"
import { useGetCryptoDetailsQuery } from "../reducers/cryptoApi"
import millify from "millify"

const MyWatchlistItems = ({ watchlist }) => {

    const { data, isFetching } = useGetCryptoDetailsQuery(watchlist.coinUuid)
    const [favouriteCoins, setFavouriteCoins] = useState([data])
    console.log(favouriteCoins)
    return (
        <div class="overflow-x-auto">
            <table class="table w-full">

                <thead>
                    <tr>

                        <th>COIN</th>
                        <th>CURRENT PRICE</th>
                        <th>MARKET CAP</th>
                        <th>VOLUME(24H)</th>
                        <th>L30D</th>
                    </tr>
                </thead>
                <tbody>
                    {favouriteCoins[0]?.data.coin.map((currency) => {
                        <tr>

                            <td>{currency.name}</td>
                            <td>{millify(currency.price)}</td>
                            <td>Blue</td>
                        </tr>
                    })}


                </tbody>
            </table>
        </div>
    )
}

export default MyWatchlistItems