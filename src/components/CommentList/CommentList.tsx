/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { ExtendedComments, Comments } from "../../model";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

//state management
import { UserContext } from "../../context/UserContext";

type PostComment = {
    postComment: ExtendedComments[];
    setPostComment: React.Dispatch<React.SetStateAction<Comments[]>>;
    id: string | undefined;
};

const CommentList = ({ id, setPostComment, postComment }: PostComment) => {
    const value = useContext(UserContext);

    const fetchComments = async () => {
        try {
            const url = `https://disco-app-7sxty.ondigitalocean.app/api/posts/${id}/comments`;
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("auth")}`,
                },
            });

            const {
                data: { post },
            } = await response.json();
            setPostComment(post.comments);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteComment = async (id: number) => {
        // console.log("commentId", id);
        // console.log("userId", value?.id);

        try {
            const url = `https://disco-app-7sxty.ondigitalocean.app/api/comments/${id}`;

            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("auth")}`,
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            // setPostComment(postComment.filter((comment) => comment.userId !== value?.id));
            if (response.ok) {
                console.log("Resource deleted successfully");
            } else {
                const errorData = data;
                console.error("Error:", errorData);
            }
        } catch (err) {
            console.log("error", err);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    return (
        <>
            {postComment.map((comment) => (
                <div key={comment.text}>
                    <div className='mt-10 flex justify-center'>
                        <div className='relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg'>
                            <div className='relative flex gap-4'>
                                <div className='flex flex-col w-full'>
                                    <div className='flex flex-row justify-between'>
                                        <p className='relative text-xl whitespace-nowrap truncate overflow-hidden'>
                                            {comment.author?.username}
                                        </p>
                                        <a className='text-gray-500 text-xl' href='#'>
                                            <i className='fa-solid fa-trash'></i>
                                        </a>
                                    </div>
                                    <p className='text-gray-400 text-sm'>20 April 2022, at 14:88 PM</p>
                                </div>
                            </div>
                            <p className='-mt-4 text-gray-500'>{comment.text}</p>
                            <div className='flex flex-row-reverse'>
                                <div onClick={() => handleDeleteComment(comment.id)} className='ml-2'>
                                    <MdDelete />
                                </div>
                                <div>
                                    <MdEdit />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default CommentList;

/// update the state
//
