import React, { useState } from "react"
import { useGetCryptoDetailsQuery } from "../reducers/cryptoApi"
import millify from "millify"

const MyWatchlistItems = ({ watchlist }) => {
    console.log("watchlist", watchlist)
    console.log(Object.values(watchlist))
    const { data, isFetching } = useGetCryptoDetailsQuery(watchlist[0].coinUuid)
    const [favouriteCoins, setFavouriteCoins] = useState([data?.data?.coin])
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
                    
                        <tr>

                            <td>{favouriteCoins.name}</td>
                            <td>test</td>
                            <td>Blue</td>
                        </tr>
            


                </tbody>
            </table>
        </div>
    )
}

export default MyWatchlistItems