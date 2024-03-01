import React from "react";
import Home from "./pages/Home";
import "./App.css";
import { Route, Routes } from "react-router";

function App() {
    return (
        <>
            <Routes>
                <Route path='*' element={<Home />} />
            </Routes>
        </>
    );
}

export default App;
