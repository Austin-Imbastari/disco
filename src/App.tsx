import Home from './Home';
import './App.css';
import { Route, Routes } from 'react-router';
import { UserProvider } from './UserContext';

function App() {
  return (
    <>
      <UserProvider>
        <Routes>
          <Route
            path="*"
            element={<Home />}
          />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
