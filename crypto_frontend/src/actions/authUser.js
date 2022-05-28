import axios from "axios"
import urlcat from "urlcat"
import { USER_LOADED, AUTH_USER_ERROR, REGISTER_USER_FAIL, REGISTER_USER_SUCCESS, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL } from "./types"

const BACKEND = "http://localhost:3001"

//Load user
export const loadUser = () => async dispatch => {
    try {
        const url = urlcat(BACKEND)
        const res = await axios.get(BACKEND)

        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: AUTH_USER_ERROR
        })
    }
}

//Register user

export const register = ({ username, email, password }) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const body = JSON.stringify({ username, email, password })
    try {
        const url = urlcat(BACKEND, "/register")
        const res = await axios.post(url, body, config)

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
    } catch (err) {
        const errors = err.response.data.errors
        if (errors) {
            errors.forEach(error => dispatch(alert(error.msg, "danger")))
        }
        dispatch({
            type: REGISTER_USER_FAIL
        })
    }
}

//Login user

export const login = (email, password) => async (dispatch) => {
    const config = {
        "Content-Type": "application/json"
    }
    const body = JSON.stringify({ email, password })
    try {
        const url = urlcat(BACKEND, "/login")
        const response = await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify({ email, password })
        })

        const newResponse = await response.json()

        dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: newResponse.data
        })
        dispatch(loadUser())
    } catch (err) {
        const errors = err.response.data.errors
        if (errors) {
            errors.forEach(error => dispatch(alert(error.msg, "danger")))
        }
        dispatch({
            type: LOGIN_USER_FAIL
        })
    }
}