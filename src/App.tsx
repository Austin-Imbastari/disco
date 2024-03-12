import React from "react";
import Home from "./pages/Home";
import "./App.css";
import { Route, Routes } from "react-router";
import { UserProvider } from "./context/UserContext";

function App() {
    return (
        <>
            <UserProvider>
                <Routes>
                    <Route path='*' element={<Home />} />
                </Routes>
            </UserProvider>
        </>
    );
}

export default App;
