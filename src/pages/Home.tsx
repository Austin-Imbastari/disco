import { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import AboutUs from './AboutUs';
import Board from './Board';
import CreatePost from './CreatePost';
import EditPost from './EditPost';
import LogOut from '../components/Navbar/LogOutButton';
import Navbar from '../components/Navbar/Navbar';
import Post from './Post';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Home = () => {
  const location = useLocation();
  const [theme, setTheme] = useState<string>('');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('darkMode');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('darkMode');
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <Navbar handleThemeSwitch={handleThemeSwitch} theme={theme} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="*" element={<Board />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/post/:id/edit" element={<EditPost />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default Home;
