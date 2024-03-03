import React from "react";
import { Route, Routes } from "react-router-dom";
// Components
import Navbar from "../components/Navbar/Navbar";
import AboutUs from "../components/AboutUs/AboutUs";
import SignIn from "../components/SignIn/SignIn";
import Board from "../components/Board/Board";
import CreatePost from "../components/CreatePost/CreatePost";
import PostPage from "../components/PostPage/PostPage";

const Home = () => {
    return (
        <>
            <>
                <Navbar />
            </>

            <Routes>
                <Route path='*' element={<Board />} />
                <Route path='/aboutus' element={<AboutUs />} />
                <Route path='/signin' element={<SignIn />} />
                <Route path='/createpost' element={<CreatePost />} />
                <Route path='/post/:id' element={<PostPage />} />
            </Routes>
        </>
    );
};

export default Home;
