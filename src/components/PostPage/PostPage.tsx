import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type PostDetail = {
    id: number;
    createdAt: string;
    subject: string;
    text: string;
}[];

const PostPage = () => {
    const [postDetail, setPostDetail] = useState<PostDetail>();
    const { id } = useParams();

    const handleFetchPageId = async (id: string | undefined) => {
        try {
            const url = `https://disco-app-7sxty.ondigitalocean.app/posts/${id}`;
            const res = await fetch(url);
            const data = await res.json();
            setPostDetail([data]);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        handleFetchPageId(id);
    }, [id]);

    const dateFormatter = (date: string) => {
        const dateString = date;
        const newDate = new Date(dateString);
        newDate.setFullYear(2024, 3 - 1, 15);
        const formattedDate = newDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
        return formattedDate;
    };

    return (
        <>
            <div className='mt-20'></div>
            <div
                style={{ border: "2px solid #E8F2FE", borderRadius: "10px", marginTop: "10px" }}
                className='container mx-auto px-8 py-8'
            >
                <div>
                    {postDetail?.map((post) => (
                        <div key={post.id}>
                            <h1 className='mb-1 font-bold text-xl'>{post.subject}</h1>
                            <h4>{dateFormatter(post.createdAt)}</h4>

                            <div className='mt-5'>
                                <p className='leading-8 ' dangerouslySetInnerHTML={{ __html: post.text }} />
                            </div>
                        </div>
                    ))}

                    <div className='mt-10 flex justify-center'>
                        <div className='w-1/2 flex flex-col justify-center items-center'>
                            <textarea
                                style={{ resize: "none", outline: "none" }}
                                className='block mb-4 p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border h-40'
                                placeholder='Add a comment here... '
                            ></textarea>
                            <form>
                                <div className='container mt-1 mx-auto px-8  h-16'>
                                    <div className=' '>
                                        <button className='bg-mint text-black px-2 py-2 rounded-md border-solid border-2 border-azure hover:bg-azure tracking-wide transition-colors duration-200'>
                                            Comment
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostPage;
