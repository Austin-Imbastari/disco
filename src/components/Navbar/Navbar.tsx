/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <nav className='flex justify-between items-center w-[92%] mx-auto mt-5'>
                <div>
                    <NavLink to='*' className='text-3xl w-16 tracking-wider'>
                        Disco
                    </NavLink>
                </div>
                <div>
                    <ul className='flex items-center gap-10'>
                        <NavLink to='*' className='tracking-wide'>
                            Home
                        </NavLink>
                        <NavLink to='/aboutus' className='tracking-wide'>
                            About Us
                        </NavLink>
                    </ul>
                </div>
                <div>
                    <NavLink to='/signin'>
                        <button className='bg-mint text-black px-5 py-2 rounded-md border-solid border-2  hover:bg-azure tracking-wide transition-colors duration-200'>
                            Sign In
                        </button>
                    </NavLink>
                </div>
            </nav>
            <div style={{ borderBottom: "2.5px solid #E9F7E6", marginTop: "20px" }}></div>
        </>
    );
};

export default Navbar;
