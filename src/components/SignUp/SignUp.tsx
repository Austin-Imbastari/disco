import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState<{
        username: string;
        password: string;
    }>({
        username: "",
        password: "",
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

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const productionUrl = "https://disco-app-7sxty.ondigitalocean.app";
            //   const developmentUrl = 'http://localhost:8000';
            const response = await fetch(`${productionUrl}/api/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: credentials.username,
                    password: credentials.password,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to sign in");
            }

            const { data } = await response.json();

            console.log("Sign up successful:", data);

            const token = data.token;
            console.log("this is token:", token);
            if (!token) {
                throw new Error("Token not found in response data");
            }

            localStorage.setItem("auth", token);

            setCredentials({
                username: "",
                password: "",
            });
            navigate("/*");
            window.location.reload();
        } catch (error) {
            console.error("Error signing in:", error);
        }
    };

    return (
        <>
            <form onSubmit={handleOnSubmit}>
                <div className='bg-[#F9FAFB] h-screen w-screen flex items-center'>
                    <div className='h-max mx-auto flex flex-col items-center'>
                        <h1 className='text-xl font-bold text-center pb-10'>Sign Up</h1>
                        <div className='bg-white shadow-xl p-10 flex flex-col gap-4 text-sm'>
                            <div>
                                <label className='text-gray-600 font-bold inline-block pb-2' htmlFor='username'>
                                    Username
                                </label>
                                <input
                                    className='border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2'
                                    type='username'
                                    name='username'
                                    placeholder='jiggy'
                                    value={credentials.username}
                                    onChange={handleUsernameChange}
                                />
                            </div>
                            <div>
                                <label className='text-gray-600 font-bold inline-block pb-2' htmlFor='password'>
                                    Password
                                </label>
                                <input
                                    className='border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2'
                                    type='password'
                                    name='password'
                                    value={credentials.password}
                                    onChange={handlePasswordChange}
                                    placeholder='******'
                                    autoComplete='on'
                                />
                            </div>
                            <div className='flex'>
                                <div className='w-full'>
                                    <a className='font-bold text-blue-600' href=''>
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div>
                                <input
                                    className='bg-[#E9F7E6] w-full py-2 rounded-md text-black font-bold cursor-pointer hover:bg-[#E8F2FE]'
                                    type='submit'
                                    value='Login'
                                />
                            </div>
                            <div>
                                <p className='text-center'>Or continue with</p>
                            </div>
                            <div className='flex gap-4'>
                                <button className='bg-[#E8F2FE] w-1/2 py-1 rounded-md text-black font-bold cursor-pointer hover:bg-[#E9F7E6]'>
                                    Demo User
                                </button>
                                <button className='bg-[#E8F2FE] w-1/2 py-1 rounded-md text-black font-bold cursor-pointer hover:bg-[#E9F7E6]'>
                                    Admin User
                                </button>
                            </div>
                        </div>
                        <p className='text-sm text-gray-500 mt-10'>
                            Not a member?{" "}
                            <a href='#' className='text-[black] font-bold'>
                                create account
                            </a>
                        </p>
                    </div>
                </div>
            </form>
        </>
    );
};

export default SignUp;
