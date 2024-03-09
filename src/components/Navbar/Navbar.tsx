/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState<string>('');

  const fetchUsers = async () => {
    try {
      const productionUrl = 'https://disco-app-7sxty.ondigitalocean.app';
      //   const developmentUrl = 'http://localhost:8000';
      const response = await fetch(`${productionUrl}/api/users/current`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth')}`,
        },
      });
      const data = await response.json();
      setUser(data);
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  console.log(localStorage.getItem('auth'));

  console.log(user);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <nav className="flex justify-between items-center w-[92%] mx-auto mt-5">
        <div>
          <NavLink
            to="*"
            className="text-3xl w-16 tracking-wider"
          >
            Disco
          </NavLink>
        </div>
        <div>
          <ul className="flex items-center gap-10">
            <NavLink
              to="*"
              className="tracking-wide"
            >
              Home
            </NavLink>
            <NavLink
              to="/aboutus"
              className="tracking-wide"
            >
              About Us
            </NavLink>
          </ul>
        </div>
        <div>
          <NavLink to="/signup">
            <button className="bg-mint text-black px-5 py-2 rounded-md border-solid border-2  hover:bg-azure tracking-wide transition-colors duration-200">
              Sign Up
            </button>
          </NavLink>
        </div>
      </nav>
      <div
        style={{ borderBottom: '2.5px solid #E9F7E6', marginTop: '20px' }}
      ></div>
    </>
  );
};

export default Navbar;
