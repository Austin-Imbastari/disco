import { useState, useContext } from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { CommentType } from "./PostPage";
import { UserContext } from "./UserContext";
import { useParams } from "react-router-dom";

const CommentList = ({
    comments,
    onCommentDeleted,
    dateFormatter,
}: {
    comments: CommentType[];
    onCommentDeleted: () => void;
    dateFormatter: (date: string) => string;
}) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [edittedComment, setEdittedComment] = useState<string>("");
    const currentUser = useContext(UserContext);
    const { id: postId } = useParams();

    const handleDeleteComment = async (commentId: number) => {
        try {
            const url = `https://disco-app-7sxty.ondigitalocean.app/api/comments/${commentId}`;
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("auth")}`,
                },
            });
            if (response.status === 202) {
                console.log("Resource deleted successfully");
                onCommentDeleted();
            }
        } catch (err) {
            console.error("error", err);
        }
    };

    const handleEditComment = async (commentId: number) => {
        setEdit((prevState) => !prevState);

        const newComment = {
            text: edittedComment,
            postId: postId,
            authorId: currentUser?.id,
        };

        try {
            const url = `https://disco-app-7sxty.ondigitalocean.app/api/comments/${commentId}`;
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("auth")}`,
                },
                body: JSON.stringify(newComment),
            });

            if (response.ok) {
                console.log("Comment updated successfully");
                setEdittedComment("");
                onCommentDeleted();
            }
        } catch (err) {
            console.log("Failed to update comment", err);
        }
    };

    return (
        <>
            {comments?.map((comment) => (
                <div key={comment.commentId}>
                    <div className='mt-10 flex justify-center'>
                        <div className='relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg'>
                            <div className='relative flex gap-4'>
                                <div className='flex flex-col w-full'>
                                    <div className='flex flex-row justify-between'>
                                        <p className='relative text-xl whitespace-nowrap truncate overflow-hidden'>
                                            {comment.author}
                                        </p>
                                        <a className='text-gray-500 text-xl' href='#'>
                                            <i className='fa-solid fa-trash'></i>
                                        </a>
                                    </div>
                                    <p className='text-gray-400 text-sm'>{dateFormatter(comment.createdAt)}</p>
                                </div>
                            </div>
                            <p className='-mt-4 text-gray-500'>
                                {comment.commentId} - {comment.text}
                            </p>
                            <div className='flex flex-row-reverse'>
                                <div
                                    onClick={() => handleDeleteComment(comment.commentId)}
                                    className='ml-2 hover:cursor-pointer'
                                >
                                    {currentUser?.username === comment.author ? <MdDelete /> : ""}
                                </div>
                                <div onClick={() => setEdit((prev) => !prev)} className='ml-2 hover:cursor-pointer'>
                                    {currentUser?.username === comment.author ? <MdEdit /> : ""}
                                </div>
                                {edit && currentUser?.username === comment.author ? (
                                    <div>
                                        <div
                                            onClick={() => handleEditComment(comment.commentId)}
                                            className='ml-2 hover:cursor-pointer'
                                        >
                                            <FaCheck />
                                        </div>
                                        <input
                                            onChange={(e) => setEdittedComment(e.target.value)}
                                            value={edittedComment}
                                            type='text'
                                        />
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default CommentList;
