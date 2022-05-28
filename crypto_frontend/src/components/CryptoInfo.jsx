import React, { useState } from "react";
import millify from "millify";
import HTMLReactParser from "html-react-parser"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import { useParams } from "react-router";
import { useGetCryptoDetailsQuery } from "../reducers/cryptoApi";
import urlcat from "urlcat";
import axios from "axios";
import store from "../store";

const BACKEND = "http://localhost:3001"

const CryptoInfo = ({authUser: {id}}) => {
    const { coinId } = useParams()
    const { data, isFetching } = useGetCryptoDetailsQuery(coinId)
    const cryptoInfo = data?.data?.coin

    if (isFetching) return "Loading..."
    console.log(data)
    console.log(store.getState())

    const stats = [
        { title: "Price to USD:", value: `$${cryptoInfo.price && millify(cryptoInfo.price)}` },
        { title: "Rank:", value: `${cryptoInfo.rank}` },
        { title: "24h Volume:", value: `${cryptoInfo && millify(cryptoInfo["24hVolume"])}` },
        { title: 'Market Cap:', value: `$ ${cryptoInfo?.marketCap && millify(cryptoInfo?.marketCap)}` },
        { title: 'All-time-high(daily avg.):', value: `$ ${cryptoInfo?.allTimeHigh?.price && millify(cryptoInfo?.allTimeHigh?.price)}` }
    ]


    const handleClick = async (e) => {
        const url = urlcat(BACKEND, `/coin/${cryptoInfo.uuid}/${id}`)

        await fetch(url, {
            method: "POST",
            body: JSON.stringify([cryptoInfo.uuid,id]),
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .catch(error => {
            console.log(error)
        })
        alert("Following coin")
    }


    return (
        <div>
            <div className="flex flex-row p-1 items-center ">
                <img class="object-scale-down h-10 w-10" src={cryptoInfo.iconUrl}></img>
                <p class="text-xl font-bold">{cryptoInfo.name}</p>
                <button class="btn btn-outline btn-xs ml-1" onClick={handleClick}>Follow</button>
            </div>
            <p class="text-sm ml-10">({cryptoInfo.symbol} / USD)</p>
            <div className="graph-container"></div>
            <div className="stats-table-container pt-2">
                
                    <table class="table w-full ">
                        <thead>
                            <tr>
                                <th>POPULARITY</th>
                                <th>ALL TIME HIGH</th>
                                <th>MARKET CAP</th>
                                <th>VOLUME(24H)</th>
                                <th>CIRCULATING SUPPLY</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>#{cryptoInfo.rank}</td>
                                <td>{millify(cryptoInfo.allTimeHigh.price)}</td>
                                <td>{millify(cryptoInfo.marketCap)}</td>
                                <td>{millify(cryptoInfo["24hVolume"])}</td>
                                <td>{millify(cryptoInfo.supply.circulating)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="coin-desc-container ml-2">
                        <div class="font-bold">What is {cryptoInfo.name}?</div>
                        <div class="pt-2">{HTMLReactParser(cryptoInfo.description)}</div>
                    </div>
            </div>
        </div>
    )
}

CryptoInfo.propTypes = {
    authUser: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    authUser: state.authUser
})

export default connect(mapStateToProps) (CryptoInfo)