import React, { useState } from "react"
import { useNavigate } from "react-router"
import { connect } from "react-redux"
import { register } from "../actions/authUser"
import PropTypes from "prop-types"
import store from "../store"

const Registerpage = ({ register, isUserAuthenticated }) => {

    let navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        password2: ""
    })

    const { username, email, password, password2 } = formData
    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })

    const onSubmit = async e => {
        e.preventDefault()
        if (password !== password2) {
            alert("Password does not match")
        } else {
            register({ username, email, password })
        }
        alert("Account created!")
        navigate("/")
    }

    console.log(store.getState())

    if (isUserAuthenticated) {
        navigate("/")
    }

    return (
        <div className="Registerpage-container flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
                <h1 className="text-2xl font-bold text-center">Sign Up page</h1>
                <div className="signupform mt-4">
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="signupinfo">
                            <div className="form-group mt-4">
                                <label class="block">Username</label>
                                <input type="username" className="form-control w-full px-4 py-2 mt-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-600" placeholder="Enter your username" name="username" value={username} onChange={e => onChange(e)} />
                            </div>
                            <div className="form-group mt-4">
                                <label class="block">Email</label>
                                <input type="email" className="form-control w-full px-4 py-2 mt-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-600" placeholder="Enter your email" name="email" value={email} onChange={e => onChange(e)} />
                            </div>
                            <div className="form-group mt-4">
                                <label class="block">Password</label>
                                <input type="password" className="form-control w-full px-4 py-2 mt-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-600" placeholder="Enter password" name="password" value={password} onChange={e => onChange(e)} />
                            </div>
                            <div className="form-group mt-4">
                                <label class="block">Confirm Password</label>
                                <input type="password" className="form-control w-full px-4 py-2 mt-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-600" placeholder="Enter password again" name="password2" value={password2} onChange={e => onChange(e)} />
                            </div>
                            <div class="flex">
                                <button class="w-full px-6 py-2 mt-4 text-white text-sm bg-indigo-700 rounded-lg hover:bg-indigo-900" type="submit">Create Account</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

Registerpage.propTypes = {
    register: PropTypes.func.isRequired,
    isUserAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isUserAuthenticated: state.authUser.isUserAuthenticated
})

export default connect(mapStateToProps, { register }) (Registerpage)