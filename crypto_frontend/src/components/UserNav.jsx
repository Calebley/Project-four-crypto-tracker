import React, { useEffect } from "react"
import { Link, Outlet } from "react-router-dom"
import store from "../store"
import { useNavigate } from "react-router"

const UserNav = () => {

    let navigate = useNavigate()
    const Store = { authenticated: store.getState() }
    const isLoggedIn = Store.authenticated.authUser.isUserAuthenticated
    console.log(isLoggedIn)

    useEffect(() => {
        if(!isLoggedIn) { navigate("/login") }
    }, [isLoggedIn])

    return (
        <div>
        <div className="bg-indigo-700 shadow-lg">
        <div className="container mx-auto">
            <div className="sm: flex justify-center">

                <a className="text-white text-3x1 font-bold p-3">CryptoTracker</a>

                <ul className="ml-2 text-gray-400 sm:self-center text-x1 border-t sm:border-none">
                    <li className="sm:inline-block"><Link to="/"><a class="p-3 hover:text-white">Home</a></Link></li>
                    <li className="sm:inline-block"><Link to="/cryptocurrencies"><a class="p-3 hover:text-white">Cryptocurrencies</a></Link></li>
                    <li className="sm:inline-block"><Link to="news"><a class="p-3 hover:text-white">News</a></Link></li>
                    <li className="sm:inline-block"><Link to="myportfolio"><a class="p-3 hover:text-white">My Portfolio</a></Link></li>
                </ul>
            </div>
        </div>
        </div>
        <Outlet />
        </div>
       
    )
}

export default UserNav