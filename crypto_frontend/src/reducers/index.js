import { combineReducers } from "redux";
import authUser from "./authUser";
import { cryptoApi } from "./cryptoApi";
import { cryptoNewsApi } from "./cryptoNewsApi";

export default combineReducers({
    authUser,
    cryptoApi: cryptoApi.reducer,
    cryptoNewsApi: cryptoNewsApi.reducer
    
})