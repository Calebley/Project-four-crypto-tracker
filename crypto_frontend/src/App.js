import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import "./index.css"
import { Loginpage, Registerpage } from "./components"

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/login" element={<Loginpage />}></Route>
    <Route path="/register" element={<Registerpage />}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
