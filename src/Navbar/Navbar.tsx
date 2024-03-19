/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import AboutUsLink from './AboutUsButton';
import DiscoLogo from './DiscoLogo';
import HomeLink from './HomeButton';
import LogOutButton from './LogOutButton';
import MenuButton from './MenuButton';
import SignInButton from './SignInButton';
import SignUpButton from './SignUpButton';

import { UserProps } from './types';

const Navbar = () => {
  const [user, setUser] = useState<UserProps>();

  const fetchUsers = async () => {
    try {
      const productionUrl = 'https://disco-app-7sxty.ondigitalocean.app';
      const response = await fetch(`${productionUrl}/api/users/current`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth')}`,
        },
      });
      const responseData = await response.json();
      if (!responseData) {
        throw new Error('Failed to retrieve current user information.');
      }
      const {
        data: { user },
      } = responseData;
      setUser(user);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="border-b-[2.5px] border-b-[#e9f7e6]">
      <div className="mx-auto container">
        <div className="relative pt-8 pb-8 ">
          <nav className="relative flex items-center justify-between sm:h-10 md:justify-center">
            <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
              <div className="flex items-center justify-between w-full md:w-auto">
                <NavLink to="/">
                  <DiscoLogo />
                </NavLink>
                <div className="flex items-center -mr-2 md:hidden">
                  <MenuButton />
                </div>
              </div>
            </div>
            <div className="hidden md:flex md:space-x-10 list-none">
              <HomeLink />
              <AboutUsLink />
            </div>
            <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
              <div className="rounded-full shadow">
                <div className="bg-red inline-flex items-center px-4 py-2 text-base text-gray-900  border border-white rounded-full   ">
                  {user && (
                    <div className="flex gap-4 items-center">
                      <span>Welcome, {user.username}</span>
                      <LogOutButton />
                    </div>
                  )}
                  {!user && (
                    <>
                      <SignUpButton />
                      <SignInButton />
                    </>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
