import React, { useEffect, useState } from "react";
import Comment from "../Comment/Comment";
import { useParams } from "react-router-dom";
import Comments from "../../model";

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

    //HANDLES THE COMMENT
    const [comment, setComment] = useState<string>("");
    const [postComment, setPostComment] = useState<Comments[]>([]);
    const handleAddTodo = () => {
        if (comment) {
            setPostComment([
                ...postComment,
                {
                    userId: 0,
                    postId: id || "",
                    text: comment,
                },
            ]);
            setComment("");
        }
    };
    console.log(postComment);

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
                </div>
            </div>
            <Comment
                comment={comment}
                setComment={setComment}
                postComment={postComment}
                setPostComment={setPostComment}
                handleAddTodo={handleAddTodo}
            />
        </>
    );
};

export default PostPage;
