import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BoardPostItem } from "./BoardPostItem";

type PostData = {
    id: number;
    author: string;
    subject: string;
    createdAt: string;
}[];

const Board = () => {
    const [items, setItems] = useState<PostData>();
    // const [userId, setUserId] = useState<number>();

    const handleFetchItems = async () => {
        try {
            const url = "https://disco-app-7sxty.ondigitalocean.app/boards/1/posts";
            const res = await fetch(url);
            const data = await res.json();
            setItems(data);
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        handleFetchItems();
    }, []);

    const dateFormatter = (date: string) => {
        const dateString = date;
        const newDate = new Date(dateString);
        newDate.setFullYear(2024, 3 - 1, 15);
        const formattedDate = newDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
        return formattedDate;
    };

    return (
        <>
            <div className='container mt-10 mx-auto px-8 relative h-16 '>
                <div className='absolute bottom-0 right-0'>
                    <Link to='/createpost'>
                        <button className='bg-mint text-black px-2 py-2 rounded-md border-solid border-2 border-azure hover:bg-azure tracking-wide transition-colors duration-200'>
                            Create Post
                        </button>
                    </Link>
                </div>
            </div>
            <div
                style={{
                    border: "2.5px solid #E9F7E6",
                    borderRadius: "10px",
                    marginTop: "10px",
                }}
                className='container mx-auto px-8 py-8'
            >
                {items?.map((item) => (
                    <div key={item.id}>
                        <Link to={"/post/" + item.id}>
                            <BoardPostItem
                                author='Future Hendrix'
                                subject={item.subject}
                                createdDate={dateFormatter(item.createdAt)}
                            />
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Board;
