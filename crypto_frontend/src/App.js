import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import "./index.css"
import { Loginpage, Registerpage } from "./components"

//Redux
import { Provider } from "react-redux"
import store from "./store";

function App() {
  
  return (
    <BrowserRouter>
    <Provider store={store}>
    <Routes>
    <Route path="/login" element={<Loginpage />}></Route>
    <Route path="/register" element={<Registerpage />}></Route>
    </Routes>
    </Provider>
    </BrowserRouter>
  );
}

export default App;
