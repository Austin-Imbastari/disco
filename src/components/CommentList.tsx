import { useState, useContext } from 'react';
import { MdDelete } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';
import { CommentType } from '../pages/Post';
import { UserContext } from '../contexts/UserContext';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { boardItemAnimation, itemsBoard } from '../utils/animations';

const CommentList = ({
  comments,
  onCommentDeleted,
  dateFormatter,
}: {
  comments: CommentType[];
  onCommentDeleted: () => void;
  dateFormatter: (date: string) => string;
}) => {
  const [editedCommentId, setEditedCommentId] = useState<number | null>(null);
  const [edittedComment, setEdittedComment] = useState<string>('');
  const currentUser = useContext(UserContext);
  const { id: postId } = useParams();

  const handleDeleteComment = async (commentId: number) => {
    try {
      const url = `${
        import.meta.env.VITE_PRODUCTION_URL
      }/api/comments/${commentId}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth')}`,
        },
      });
      if (response.status === 202) {
        console.log('Resource deleted successfully');
        onCommentDeleted();
      }
    } catch (err) {
      console.error('error', err);
    }
  };

  const handleEditComment = async (commentId: number) => {
    if (editedCommentId === commentId) {
      setEditedCommentId(null);
    } else {
      setEditedCommentId(commentId);
    }

    const newComment = {
      text: edittedComment,
      postId: postId,
      authorId: currentUser?.id,
    };

    try {
      if (edittedComment.length === 0) {
        return;
      }
      const url = `${
        import.meta.env.VITE_PRODUCTION_URL
      }/api/comments/${commentId}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('auth')}`,
        },
        body: JSON.stringify(newComment),
      });

      if (response.ok) {
        console.log('Comment updated successfully');
        setEdittedComment('');
        onCommentDeleted();
      }
    } catch (err) {
      console.log('Failed to update comment', err);
    }
  };
  return (
    <>
      {comments?.map((comment) => (
        <motion.div
          variants={boardItemAnimation}
          initial={false}
          key={comment.commentId}
        >
          <motion.div
            variants={itemsBoard}
            className="mt-10 flex justify-center"
          >
            <div className="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg w-2/12 dark:bg-[#1d232a] dark:text-white">
              <div className="relative flex gap-4">
                <div className="flex flex-col w-full">
                  <div className="flex flex-row justify-between items-center">
                    <p className="relative text-xl whitespace-nowrap truncate ">
                      {comment.author}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {dateFormatter(comment.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <p
                  style={{ wordBreak: 'break-all' }}
                  className="-mt-2 text-gray-500"
                >
                  {comment.text}
                </p>
              </div>
              <div>
                <div className="flex flex-row-reverse">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={() => handleDeleteComment(comment.commentId)}
                    className="ml-2 hover:cursor-pointer dark:text-darkP"
                  >
                    {currentUser?.username === comment.author ||
                    currentUser?.role === 'ADMIN' ? (
                      <MdDelete />
                    ) : (
                      ''
                    )}
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={() => handleEditComment(comment.commentId)}
                    className="ml-2 hover:cursor-pointer dark:text-darkP"
                  >
                    {currentUser?.username === comment.author ? <MdEdit /> : ''}
                  </motion.div>
                </div>
                {editedCommentId === comment.commentId ? (
                  <div className="mt-2">
                    <div className="w-full  md:w-full px-3 mb-2 mt-2">
                      <textarea
                        onChange={(e) => setEdittedComment(e.target.value)}
                        value={edittedComment}
                        className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 dark:bg-[#1D2023] dark:text-white outline:none"
                        name="body"
                        placeholder="comment..."
                        required
                      ></textarea>
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                        onClick={() => handleEditComment(comment.commentId)}
                        className="mt-2 flex justify-center hover:cursor-pointer dark:text-darkP"
                      >
                        <FaCheck />
                      </motion.div>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </>
  );
};

export default CommentList;
