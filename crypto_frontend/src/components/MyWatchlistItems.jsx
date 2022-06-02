import React, { useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { useParams } from "react-router";
import MyItem from "./myItem"
import urlcat from "urlcat"

const BACKEND = "http://localhost:3001"

const MyWatchlistItems = (props ) => {

    console.log(props)

    // const [favouriteCoins, setFavouriteCoins] = useState([data?.data?.coin])
    // console.log(favouriteCoins)
    return (

        <div class="crypto-card-container grid grid-cols-5 gap-5">

            {props.watchlist.map((item) => {

                return (
                    <div key={item.watchlistId}>

                        <MyItem coinUuid={item.coinUuid} watchlistId={item.watchlistId} handleDelete={props.handleDelete}/>
                    </div>

                )
            })}

        </div>
    )
}

MyWatchlistItems.propTypes = {
    authUser: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    authUser: state.authUser
})

export default connect(mapStateToProps) (MyWatchlistItems)