import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import AboutUs from './AboutUs';
import Board from './Board';
import CreatePost from './CreatePost';
import EditPost from './EditPost';
import LogOut from './Navbar/LogOutButton';
import Navbar from './Navbar/Navbar';
import PostPage from './PostPage';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Home = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="*" element={<Board />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/post/:id/edit" element={<EditPost />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default Home;
