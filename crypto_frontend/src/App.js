import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import "./index.css"
import { Loginpage, Registerpage, UserNav, Homepage, Cryptocurrencies, News, MyPortfolio, CryptoInfo } from "./components"

//Redux
import { Provider } from "react-redux"
import store from "./store";

function App() {

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<UserNav />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
            <Route path="/crypto/:coinId" element={<CryptoInfo />} />
            <Route path="/news" element={<News />} />
            <Route path="/myportfolio" element={<MyPortfolio />} />
          </Route>
          <Route path="/login" element={<Loginpage />}></Route>
          <Route path="/register" element={<Registerpage />}></Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
