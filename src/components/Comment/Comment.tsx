/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';

type CommentProps = {
  handleAddTodo: (e: React.FormEvent<HTMLFormElement>, comment: string) => void;
};

const Comment = ({ handleAddTodo }: CommentProps) => {
  const [comment, setComment] = useState('');

  const onChangeHandler = (e: React.FormEvent<HTMLTextAreaElement>): void => {
    setComment(e.currentTarget.value);
  };

  return (
    <>
      <div className="mt-10 flex justify-center">
        <div className="w-1/2 flex flex-col justify-center items-center">
          <textarea
            onChange={onChangeHandler}
            value={comment}
            style={{ resize: 'none', outline: 'none' }}
            className="block mb-4 p-2.5 w-1/2 text-md text-gray-900 bg-gray-50 rounded-lg border h-40"
            placeholder="Add a comment here... "
          ></textarea>
          <form
            onSubmit={(e) => {
              handleAddTodo(e, comment);
              setComment('');
            }}
          >
            <div className="container mt-1 mx-auto px-8  h-16">
              <div className=" ">
                <button className="bg-mint text-black px-2 py-2 rounded-md border-solid border-2 border-azure hover:bg-azure tracking-wide transition-colors duration-200">
                  Comment
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Comment;
