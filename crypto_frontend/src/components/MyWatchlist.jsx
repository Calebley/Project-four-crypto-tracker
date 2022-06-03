import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import PropTypes from 'prop-types';
import urlcat from "urlcat";
import MyWatchlistItems from "./MyWatchlistItems";

const BACKEND = "http://localhost:3001"

const MyWatchlist = ({authUser: {id}}) => {
    
    const [favouriteCoins, setFavouriteCoins] = useState([])
    
    const handleDelete = async (id) => {
        console.log("delete",id)
        const url = urlcat(BACKEND, `/coin/delete/${id}`)
        const response = await fetch(url, { method: "DELETE", credentials: "include" })

        if (response.status === 200) {
            const newFavouriteCoins = favouriteCoins.filter((e) => e.watchlistId !== id)
            setFavouriteCoins(newFavouriteCoins)
        }
    }
    

    useEffect(() => {
        console.log("id",id)
        fetch(urlcat(BACKEND, `/coin/${id}`))
        .then((response) => response.json())
        .then((data) => setFavouriteCoins(data))
    }, [favouriteCoins.length])

    console.log(favouriteCoins)
    return (
        <div className="watchlist-container">
            <div className="text-xl font-bold">My Watchlist</div>
            <div className="watchlist-details">
                <br />
                {favouriteCoins !== null && favouriteCoins.length !== 0 ? (
                    <MyWatchlistItems watchlist={favouriteCoins} handleDelete={handleDelete}/>
                ) : (
                    <h4>No coins followed</h4>
                    )
            }
                
            </div>
            
        </div>
    )

}

MyWatchlist.propTypes = {
    authUser: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    authUser: state.authUser
})

export default connect(mapStateToProps) (MyWatchlist)