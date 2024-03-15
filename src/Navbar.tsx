/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import LogOut from "./LogOut";
import img from "./assets/img/disco.png";

type UserProps = {
    data?: {
        user: {
            id: number;
            role: string;
            username: string;
        };
    };
};

const Navbar = () => {
    const [user, setUser] = useState<UserProps>();

    const fetchUsers = async () => {
        try {
            const productionUrl = "https://disco-app-7sxty.ondigitalocean.app";
            const response = await fetch(`${productionUrl}/api/users/current`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("auth")}`,
                },
            });
            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // console.log(localStorage.getItem("auth"));
    // console.log("this is the data", user);

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <div className='px-4 mx-auto sm:px-6 w-[92%] '>
                <div className='relative pt-8 pb-8 '>
                    <nav className='relative flex items-center justify-between sm:h-10 md:justify-center'>
                        <div className='flex items-center flex-1 md:absolute md:inset-y-0 md:left-0'>
                            <div className='flex items-center justify-between w-full md:w-auto'>
                                <NavLink to='*'>
                                    <img className='w-40 h-40' src={img} alt='' />
                                </NavLink>
                                <div className='flex items-center -mr-2 md:hidden'>
                                    <button
                                        className='inline-flex items-center justify-center p-2 text-gray-400 bg-gray-50 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-50'
                                        type='button'
                                        aria-expanded='false'
                                    >
                                        <span className='sr-only'>Open main menu</span>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            stroke-width='2'
                                            stroke='currentColor'
                                            aria-hidden='true'
                                            className='w-6 h-6'
                                        >
                                            <path
                                                stroke-linecap='round'
                                                stroke-linejoin='round'
                                                d='M4 6h16M4 12h16M4 18h16'
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='hidden md:flex md:space-x-10 list-none'>
                            <NavLink
                                to='*'
                                className='font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out tracking-wide'
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to='/aboutus'
                                className='font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out tracking-wide'
                            >
                                About Us
                            </NavLink>
                        </div>
                        <div className='hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0'>
                            <div className='rounded-full shadow'>
                                <div className='bg-red inline-flex items-center px-4 py-2 text-base text-gray-900  border border-white rounded-full   '>
                                    {user?.data?.user?.username ? (
                                        <div className='flex items-center'>
                                            <NavLink to={user?.data?.user?.username ? "/*" : "/signup"}>
                                                <div className='text-xl  text-black px-5 py-2 rounded-md  hover:bg-white tracking-wide transition-colors duration-200'>
                                                    Welcome, {user?.data?.user?.username}
                                                </div>
                                            </NavLink>
                                            <LogOut />
                                        </div>
                                    ) : (
                                        <NavLink to={user?.data?.user?.username ? "/*" : "/signup"}>
                                            <button className='bg-mint text-black px-5 py-2 rounded-full border-solid border-2  hover:bg-azure tracking-wide transition-colors duration-200'>
                                                {"Sign up"}
                                            </button>
                                        </NavLink>
                                    )}
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            <div style={{ borderBottom: "2.5px solid #E9F7E6" }}></div>

            {/* <nav
                style={{ border: "1px solid purple" }}
                className='flex justify-between items-center w-[92%] mx-auto mt-5'
            >
                <div>
                    <NavLink to='*' className='text-3xl w-16 tracking-wider'>
                        Disco
                    </NavLink>
                </div>
                <div className='' style={{ border: "1px solid green" }}>
                    <ul className='flex items-center gap-10'>
                        <NavLink to='*' className='tracking-wide'>
                            Home
                        </NavLink>
                        <NavLink to='/aboutus' className='tracking-wide'>
                            About Us
                        </NavLink>
                    </ul>
                </div>
                <div style={{ border: "1px solid red" }}>
                    {user?.data?.user?.username ? (
                        <div className='flex items-center'>
                            <NavLink to={user?.data?.user?.username ? "/*" : "/signup"}>
                                <button className='text-xl  text-black px-5 py-2 rounded-md border-solid border-2  hover:bg-white tracking-wide transition-colors duration-200'>
                                    Welcome, {user?.data?.user?.username}
                                </button>
                            </NavLink>
                            <LogOut />
                        </div>
                    ) : (
                        <NavLink to={user?.data?.user?.username ? "/*" : "/signup"}>
                            <button className='bg-mint text-black px-5 py-2 rounded-md border-solid border-2  hover:bg-azure tracking-wide transition-colors duration-200'>
                                {"Sign up"}
                            </button>
                        </NavLink>
                    )}
                </div>
            </nav>
            <div style={{ borderBottom: "2.5px solid #E9F7E6", marginTop: "20px" }}></div> */}
        </>
    );
};

export default Navbar;
