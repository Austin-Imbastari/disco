import ReactDOM from 'react-dom/client';

import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import { UserProvider } from './contexts/UserContext';

import Home from './pages/Home';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <UserProvider>
      <Routes>
        <Route path="*" element={<Home />} />
      </Routes>
    </UserProvider>
  </BrowserRouter>,
);

window.addEventListener('blur', () => {
  document.title = 'We miss you...';
});

window.addEventListener('focus', () => {
  document.title = 'Lets Disco';
});
