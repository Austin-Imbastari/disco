/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';

import { motion } from 'framer-motion';
import { createPostAnimation } from '../utils/animations';

const CreatePost = () => {
  const navigate = useNavigate();
  const [postTitle, setPostTitle] = useState<string>('');
  const [valueHtml, setValueHtml] = useState<string>('');

  const handleEditorChange = (value: string) => {
    const clean = DOMPurify.sanitize(value);
    setValueHtml(clean);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const clean = DOMPurify.sanitize(value);
    setPostTitle(clean);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (postTitle.length <= 0 && valueHtml.length <= 0) {
      alert('You must enter a post!');
      return;
    }

    const productionUrl = 'https://disco-app-7sxty.ondigitalocean.app';

    const currentUserGetResponse = await fetch(
      `${productionUrl}/api/users/current`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth')}`,
        },
      },
    );

    const { data: currentUserData } = await currentUserGetResponse.json();
    const currentUser = currentUserData.user;

    const newPost = {
      subject: postTitle,
      text: valueHtml,
      boardId: 1,
      authorId: currentUser.id,
    };

    if (postTitle.length >= 100 || postTitle.length <= 5) {
      alert('Title can only have 100 characters and more than 5 characters');
      setPostTitle('');
    } else {
      const postCreateResponse = await fetch(
        'https://disco-app-7sxty.ondigitalocean.app/api/posts',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('auth')}`,
          },
          body: JSON.stringify(newPost),
        },
      );

      const { data: createdPostData } = await postCreateResponse.json();
      const post = createdPostData.post;
      if (post) {
        navigate(`/post/${post.id}`);
      }
    }
  };

  return (
    <>
      <div className="mt-20"></div>
      <motion.div
        variants={createPostAnimation}
        initial="hidden"
        animate="show"
        style={{
          border: '2.5px solid #E8F2FE',
          borderRadius: '10px',
          marginTop: '10px',
        }}
        className="container mx-auto px-8 py-8"
      >
        <div>
          <div className="flex items-center justify-between">
            <h1 className="mb-2 font-bold text-xl">Title</h1>
            <span className="font-thin text-sm text-gray-600">
              {postTitle.length}/100
            </span>
          </div>
          <textarea
            onChange={handleTitleChange}
            style={{ resize: 'none', outline: 'none' }}
            className="block mb-4 p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border h-10"
            value={postTitle}
            disabled={postTitle.length >= 100}
          ></textarea>
        </div>
        <div>
          <ReactQuill
            onChange={handleEditorChange}
            value={valueHtml}
            formats={formats}
            modules={modules}
            theme="snow"
          />
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="container mt-1 mx-auto px-8 relative h-16">
              <div className="absolute bottom-0 right-0 ">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-mint text-black px-2 py-2 rounded-md border-solid border-2 border-azure hover:bg-azure tracking-wide transition-colors duration-200"
                >
                  Submit Post
                </motion.button>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </>
  );
};

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];

export default CreatePost;
