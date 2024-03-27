import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();

  const [userType, setUserType] = useState<{
    demoUser: boolean;
    adminUser: boolean;
  }>({
    demoUser: false,
    adminUser: false,
  });

  const [credentials, setCredentials] = useState<{
    username: string;
    password: string;
  }>({
    username: '',
    password: '',
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      password: e.target.value,
    });
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      username: e.target.value,
    });
  };

  const handleDemoUser = async () => {
    setUserType((prevState) => ({
      ...prevState,
      demoUser: true,
    }));
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PRODUCTION_URL}/api/auth/signin/demo-user`,
        {
          method: 'POST',
        },
      );
      if (response.ok) {
        const { data } = await response.json();
        localStorage.setItem('auth', data.token);
        navigate('/*');
        window.location.reload();
      }
    } catch (err) {
      console.log('Demo User Login was unsuccessful', err);
    }
  };

  const handleAdminUser = async () => {
    setUserType((prevState) => ({
      ...prevState,
      adminUser: true,
    }));

    try {
      const response = await fetch(
        `${import.meta.env.VITE_PRODUCTION_URL}/api/auth/signin/demo-admin`,
        {
          method: 'POST',
        },
      );
      if (response.ok) {
        const { data } = await response.json();
        localStorage.setItem('auth', data.token);
        navigate('/*');
        window.location.reload();
      }
    } catch (err) {
      console.log('Admin User login is unsuccessful', err);
    }
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const regex = /^[a-zA-Z0-9_]+$/;

    try {
      if (
        !userType.adminUser &&
        !userType.demoUser &&
        credentials.username.length <= 12 &&
        credentials.username.length >= 6 &&
        regex.test(credentials.username) &&
        credentials.password.length >= 6
      ) {
        const productionUrl = `${import.meta.env.VITE_PRODUCTION_URL}`;
        const response = await fetch(`${productionUrl}/api/auth/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to sign in');
        }
        const { data } = await response.json();
        const token = data.token;
        if (!token) {
          throw new Error('Token not found in response data');
        }
        localStorage.setItem('auth', token);
        setCredentials({
          username: '',
          password: '',
        });
        navigate('/*');
        window.location.reload();
      } else if (!userType.demoUser && !userType.adminUser) {
        alert(
          'Please only create username with no more than 12 character & if you choose special characters only use an underscore!',
        );
      }
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <div className="bg-[#F9FAFB] h-screen w-screen flex items-center dark:bg-darkBg ">
          <div className="h-max mx-auto flex flex-col items-center ">
            <h1 className="text-xl font-bold text-center pb-10 dark:text-white">
              Login
            </h1>
            <div className="bg-white shadow-xl p-10 flex flex-col gap-4 text-sm dark:bg-[#1D2023]">
              <div>
                <label
                  className="text-gray-600 font-bold inline-block pb-2 dark:text-white "
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2 dark:bg-[#1D2023] dark:text-white"
                  type="username"
                  name="username"
                  placeholder=""
                  value={credentials.username}
                  onChange={handleUsernameChange}
                />
              </div>
              <div>
                <label
                  className="text-gray-600 font-bold inline-block pb-2 dark:text-white"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2 dark:bg-[#1D2023] dark:text-white"
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handlePasswordChange}
                  placeholder=""
                  autoComplete="on"
                />
              </div>
              <div>
                <input
                  className="bg-[#E9F7E6] w-full py-2 rounded-md text-black font-bold cursor-pointer hover:bg-[#E8F2FE] dark:text-black dark:bg-darkP"
                  type="submit"
                  value="Login"
                />
              </div>
              <div>
                <p className="text-center dark:text-white">Or continue with</p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleDemoUser}
                  className="bg-[#E8F2FE] w-1/2 py-1 rounded-md text-black font-bold cursor-pointer hover:bg-[#E9F7E6] dark:text-black dark:bg-darkP"
                >
                  Demo
                </button>
                <button
                  onClick={handleAdminUser}
                  className="bg-[#E8F2FE] w-1/2 py-1 rounded-md text-black font-bold cursor-pointer hover:bg-[#E9F7E6] dark:text-black dark:bg-darkP"
                >
                  Admin
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignIn;
