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
            if (edittedComment.length === 0) {
                return;
            }
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
                        <div className='relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg w-2/12'>
                            <div className='relative flex gap-4'>
                                <div className='flex flex-col w-full'>
                                    <div className='flex flex-row justify-between items-center'>
                                        <p className='relative text-xl whitespace-nowrap truncate '>{comment.author}</p>
                                        <p className='text-gray-400 text-sm'>{dateFormatter(comment.createdAt)}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p style={{ wordBreak: "break-all" }} className='-mt-2 text-gray-500'>
                                    {comment.text}
                                </p>
                            </div>
                            <div>
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
                                </div>
                                {edit && currentUser?.username === comment.author ? (
                                    <div className='mt-2'>
                                        <div
                                            // style={{ border: "1px solid red" }}
                                            className='w-full  md:w-full px-3 mb-2 mt-2'
                                        >
                                            <textarea
                                                onChange={(e) => setEdittedComment(e.target.value)}
                                                value={edittedComment}
                                                style={{ border: "1px solid blue" }}
                                                className='bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700'
                                                name='body'
                                                placeholder='comment...'
                                                required
                                            ></textarea>
                                            <div
                                                // style={{ border: "1px solid pink" }}
                                                onClick={() => handleEditComment(comment.commentId)}
                                                className='mt-2 flex justify-center hover:cursor-pointer'
                                            >
                                                <FaCheck />
                                            </div>
                                        </div>
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
