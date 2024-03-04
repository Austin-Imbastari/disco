import React from "react";

const SignIn = () => {
    return (
        <>
            <div className='bg-[#F9FAFB] h-screen w-screen flex items-center'>
                <div className='h-max mx-auto flex flex-col items-center'>
                    <h1 className='text-xl font-bold text-center pb-10'>Sign in to your account</h1>
                    <div className='bg-white shadow-xl p-10 flex flex-col gap-4 text-sm'>
                        <div>
                            <label className='text-gray-600 font-bold inline-block pb-2' for='email'>
                                Email
                            </label>
                            <input
                                className='border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2'
                                type='email'
                                name='email'
                                placeholder='jiggy@jiggy.com'
                            />
                        </div>
                        <div>
                            <label className='text-gray-600 font-bold inline-block pb-2' for='password'>
                                Password
                            </label>
                            <input
                                className='border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2'
                                type='password'
                                name='password'
                                placeholder='******'
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
        </>
    );
};

export default SignIn;
