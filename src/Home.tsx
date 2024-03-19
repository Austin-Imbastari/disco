import { Route, Routes } from 'react-router-dom';
// Components
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
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="*" element={<Board />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/post/:id/edit" element={<EditPost />} />
      </Routes>
    </>
  );
};

export default Home;
