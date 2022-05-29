import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import PropTypes from 'prop-types';
import urlcat from "urlcat";
import MyWatchlistItems from "./MyWatchlistItems";

const BACKEND = "http://localhost:3001"

const MyWatchlist = ({authUser: {id}}) => {
    
    const [favouriteCoins, setFavouriteCoins] = useState([])

    useEffect(() => {
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
                    <MyWatchlistItems watchlist={favouriteCoins}/>
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