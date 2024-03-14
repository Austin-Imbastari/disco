import { Route, Routes } from 'react-router-dom';
// Components
import Navbar from './Navbar';
import AboutUs from './AboutUs';
import SignUp from './SignUp';
import LogOut from './LogOut';
import Board from './Board';
import CreatePost from './CreatePost';
import PostPage from './PostPage';

const Home = () => {
  return (
    <>
      <>
        <Navbar />
      </>

      <Routes>
        <Route
          path="*"
          element={<Board />}
        />
        <Route
          path="/aboutus"
          element={<AboutUs />}
        />
        <Route
          path="/signup"
          element={<SignUp />}
        />
        <Route
          path="/logout"
          element={<LogOut />}
        />
        <Route
          path="/createpost"
          element={<CreatePost />}
        />
        <Route
          path="/post/:id"
          element={<PostPage />}
        />
      </Routes>
    </>
  );
};

export default Home;
