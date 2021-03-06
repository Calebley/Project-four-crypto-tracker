import { createStore, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit"
import { composeWithDevTools } from "@redux-devtools/extension"
import thunk from "redux-thunk"
import rootReducer from "./reducers"



const initialState = {}

const middleWare = [thunk]

const store = configureStore({reducer: rootReducer}, initialState, composeWithDevTools(applyMiddleware(...middleWare)))

export default store