import React from "react";
import Comments from "../../model";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

type PostComment = {
    postComment: Comments[];
    handleDeleteComment: (id: string) => void;
};
const CommentList = ({ postComment, handleDeleteComment }: PostComment) => {
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
                                            Jiggy
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
                                <div onClick={() => handleDeleteComment(comment.postId)} className='ml-2'>
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
