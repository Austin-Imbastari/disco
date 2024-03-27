/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import AboutUsLink from './AboutUsLink';
import DiscoLogo from './DiscoLogo';
import HomeLink from './HomeLink';
import LogOutButton from './LogOutButton';
import MenuButton from './MenuButton';
import SignInButton from './SignInButton';
import SignUpButton from './SignUpButton';

import { UserProps } from './types';

function DarkThemeIcon() {
  return (
    <svg
      height={20}
      viewBox="0 0 0.875 0.875"
      width={20}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{'Switch to dark mode.'}</title>
      <path
        style={{
          strokeWidth: 0.0255237,
        }}
        d="M.465.875A.466.464 0 0 1 .39.869.465.463 0 0 1 .006.338a.462.46 0 0 1 .233-.33.062.062 0 0 1 .066.004.061.06 0 0 1 .026.061L.298.071l.031.005a.4.399 0 0 0 .261.45.405.403 0 0 0 .217.014.062.062 0 0 1 .068.088.465.463 0 0 1-.41.247ZM.266.065a.4.4 0 0 0-.128.58.4.399 0 0 0 .678-.042A.473.47 0 0 1 .57.587.465.463 0 0 1 .266.065Z"
      />
    </svg>
  );
}

function LightThemeIcon() {
  return (
    <svg
      height={20}
      viewBox="-5.5 0 0.8 0.8"
      width={20}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{'Switch to light mode.'}</title>
      <path
        style={{
          strokeWidth: 0.0364701,
        }}
        d="M-5.057.044v.088c0 .03-.014.044-.043.044-.03 0-.043-.014-.043-.044V.044c0-.03.014-.044.043-.044.029 0 .043.014.043.044zm.087.116.054-.073c.017-.022.04-.027.061-.011.022.015.025.036.007.06L-4.9.208c-.018.024-.039.026-.062.01C-4.985.204-4.987.185-4.97.16zm-.314-.072.054.072c.018.024.016.043-.008.059-.022.016-.043.013-.06-.011l-.055-.072c-.017-.024-.015-.043.008-.059.022-.017.043-.013.06.011Zm.184.139c.1 0 .181.078.181.174A.177.177 0 0 1-5.1.572a.177.177 0 0 1-.182-.171c0-.096.082-.174.182-.174zm-.34.024.088.027c.03.009.04.026.03.052-.008.027-.027.035-.058.026l-.086-.027c-.029-.009-.04-.027-.031-.053.009-.026.028-.034.057-.025zm.592.027L-4.76.25c.03-.009.049-.001.057.025.009.026-.001.044-.032.052l-.086.028c-.029.009-.048.001-.057-.026-.008-.026.001-.043.03-.052zM-5.1.497A.1.1 0 0 0-5 .4.1.1 0 0 0-5.1.303c-.056 0-.1.044-.1.098 0 .052.044.096.1.096zM-5.466.47l.087-.027c.03-.009.05-.002.057.025.01.026 0 .043-.03.052L-5.44.55c-.03.009-.048.001-.057-.026-.008-.026.002-.043.031-.052zm.645-.027.087.027c.03.009.04.026.03.052C-4.71.55-4.73.558-4.76.55l-.088-.028c-.03-.009-.038-.026-.03-.052.01-.027.028-.034.057-.025zm-.532.219.055-.07c.017-.025.038-.028.06-.012.024.016.026.035.008.06l-.054.07c-.018.024-.039.029-.062.013-.022-.016-.024-.037-.007-.061zm.452-.07.053.07c.018.024.015.045-.007.061s-.044.01-.061-.012L-4.97.64c-.017-.024-.015-.043.007-.059.023-.015.044-.013.062.011zm-.156.074v.088c0 .03-.014.045-.043.045-.03 0-.043-.014-.043-.045V.667c0-.03.014-.044.043-.044.029 0 .043.014.043.044z"
      />
    </svg>
  );
}

const Navbar = ({
  handleThemeSwitch,
  theme,
}: {
  handleThemeSwitch: () => void;
  theme: string;
}) => {
  const [user, setUser] = useState<UserProps>();

  const fetchUsers = async () => {
    try {
      const productionUrl = `${import.meta.env.VITE_PRODUCTION_URL}`;
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
    <div className="border-b-[2.5px] border-b-[#e9f7e6] dark:border-b-darkP dark:bg-darkBg">
      <div className="mx-auto container">
        <div className="relative pt-8 pb-8 ">
          <nav className="relative flex items-center justify-between sm:h-10 md:justify-center">
            <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
              <div className="flex items-center justify-between w-full md:w-auto ">
                <NavLink to="/">
                  <DiscoLogo />
                </NavLink>
                <div className="flex items-center -mr-2 md:hidden ">
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
                      <span className="dark:text-white">
                        Welcome, {user.username}
                      </span>
                      <LogOutButton />
                    </div>
                  )}
                  {!user && (
                    <>
                      <SignUpButton />
                      <SignInButton />
                    </>
                  )}
                  <button
                    onClick={handleThemeSwitch}
                    className="bg-mint text-black px-5 py-2 rounded-full border-solid border-2  hover:bg-azure tracking-wide transition-colors duration-200 dark:text-black dark:bg-darkP "
                  >
                    <span>
                      {theme === 'dark' ? (
                        <LightThemeIcon />
                      ) : (
                        <DarkThemeIcon />
                      )}
                    </span>
                  </button>
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
