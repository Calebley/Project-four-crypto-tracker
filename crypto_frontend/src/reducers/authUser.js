import {
    REGISTER_USER_FAIL,
    REGISTER_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER_SUCCESS,
    USER_LOADED,
    AUTH_USER_ERROR,
    LOGOUT_USER,
    DELETE_USER_ACCOUNT
} from "../actions/types"

const initialState = {
    isUserAuthenticated: null,
    loadingUser: true,
    user: null
}

const authUser = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isUserAuthenticated: true,
                loadingUser: false,
                user: payload
            }
        case REGISTER_USER_SUCCESS:
        case LOGIN_USER_SUCCESS:
            sessionStorage.setItem("token", payload.token)
            return {
                ...state,
                ...payload,
                isUserAuthenticated: true,
                loadingUser: false
            }
        case REGISTER_USER_FAIL:
        case LOGIN_USER_FAIL:    
            sessionStorage.removeItem("token")
            return {
                ...state,
                token: null,
                isUserAuthenticated: false,
                loadingUser: false
            }
        case AUTH_USER_ERROR:
            sessionStorage.removeItem("token")
            return {
                ...state,
                token: null,
                isUserAuthenticated: false,
                loadingUser: false
            }
        default:
            return state
    }
}

export default authUser