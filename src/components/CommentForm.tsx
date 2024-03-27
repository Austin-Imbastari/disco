import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { motion } from 'framer-motion';

const CommentForm = ({
  postId,
  onCommentSubmitted,
}: {
  postId: number;
  onCommentSubmitted: () => void;
}) => {
  const [comment, setComment] = useState('');
  const currentUser = useContext(UserContext);

  const submitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newComment = {
      text: comment,
      postId: postId,
      authorId: currentUser?.id ?? 0,
    };

    if (comment.length >= 350 || comment.length === 0) {
      alert(
        'Please enter a comment with less than 350 characters and more than 0 characters',
      );
      setComment('');
    } else {
      try {
        const url = `${import.meta.env.VITE_PRODUCTION_URL}/api/comments`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('auth')}`,
          },
          body: JSON.stringify(newComment),
        });
        if (response.ok) {
          const data = await response.json();
          console.log('Comment submitted successfully:', data);
          onCommentSubmitted();
          setComment('');
        } else {
          console.error('Failed to submit comment:', response.statusText);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onChangeHandler = (e: React.FormEvent<HTMLTextAreaElement>): void => {
    setComment(e.currentTarget.value);
  };

  return (
    <>
      <div className="mt-10 flex justify-center">
        <div className="w-1/2 flex flex-col justify-center items-center">
          <div className="flex flex-row-reverse w-1/2">
            <span className="font-thin text-sm text-gray-600">
              {comment.length}/350
            </span>
          </div>
          <textarea
            onChange={onChangeHandler}
            value={comment}
            style={{ resize: 'none', outline: 'none' }}
            className="block mb-4 p-2.5 w-1/2 text-md text-gray-900 bg-gray-50 rounded-lg border h-40 dark:bg-[#1D2023] dark:text-white"
            placeholder="Add a comment here... "
            disabled={comment.length >= 350}
          ></textarea>

          <form onSubmit={(e) => submitComment(e)}>
            <div className="container mt-1 mx-auto px-8  h-16">
              <div className="">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-mint text-black px-2 py-2 rounded-md border-solid border-2 border-azure hover:bg-azure tracking-wide transition-colors duration-200 dark:border-black dark:text-black dark:bg-darkP"
                >
                  Comment
                </motion.button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CommentForm;
