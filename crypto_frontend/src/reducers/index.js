import { combineReducers } from "redux";
import authUser from "./authUser";
import { cryptoApi } from "./cryptoApi";

export default combineReducers({
    authUser,
    cryptoApi: cryptoApi.reducer
})