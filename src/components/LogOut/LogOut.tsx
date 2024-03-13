import React from "react";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
    const navigate = useNavigate();

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const url = "https://disco-app-7sxty.ondigitalocean.app/api/auth/signout";

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("auth")}`,
                },
            });

            if (response.ok) {
                localStorage.removeItem("auth");
                window.location.reload();
                navigate("/*");
            } else {
                console.error("POST request failed with status:", response.status);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <form onSubmit={handleOnSubmit}>
                <button className='bg-mint text-black px-5 py-2 rounded-md border-solid border-2  hover:bg-azure tracking-wide transition-colors duration-200'>
                    Log Out
                </button>
            </form>
        </>
    );
};

export default LogOut;
