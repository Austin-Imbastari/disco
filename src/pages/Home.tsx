import React from "react";
import { Route, Routes } from "react-router-dom";
// Components
import Navbar from "../components/Navbar/Navbar";
import AboutUs from "../components/AboutUs/AboutUs";
import SignIn from "../components/SignIn/SignIn";
import Board from "../components/Board/Board";

const Home = () => {
    return (
        <>
            <>
                <Navbar />
            </>

            <Routes>
                <Route path='/aboutus' element={<AboutUs />} />
                <Route path='/signin' element={<SignIn />} />
                <Route path='*' element={<Board />} />
            </Routes>
        </>
    );
};

export default Home;
