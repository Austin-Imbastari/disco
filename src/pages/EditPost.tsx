/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';

const EditPost = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [postTitle, setPostTitle] = useState<string>(state.title);
  const [valueHtml, setValueHtml] = useState<string>(state.body);

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

    const productionUrl = `${import.meta.env.VITE_PRODUCTION_URL}`;

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

    try {
      if (postTitle.length >= 100 || postTitle.length <= 5) {
        alert('Title can only have 100 characters and more than 5 characters');
        setPostTitle('');
      } else {
        const postCreateResponse = await fetch(
          `${import.meta.env.VITE_PRODUCTION_URL}/api/posts/${state.postId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('auth')}`,
            },
            body: JSON.stringify(newPost),
          },
        );
        if (!postCreateResponse.ok) {
          throw new Error(
            `Failed to update post: ${postCreateResponse.statusText}`,
          );
        }
        navigate(`/post/${state.postId}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="mt-20"></div>
      <div
        style={{
          border: '2.5px solid #E8F2FE',
          borderRadius: '10px',
          marginTop: '10px',
        }}
        className="container mx-auto px-8 py-8"
      >
        <div>
          <div className="flex items-center justify-between">
            <h1 className="mb-2 font-bold text-xl dark:text-white">Title</h1>
            <span className="font-thin text-sm text-gray-600 dark:text-white">
              {postTitle.length}/100
            </span>
          </div>
          <textarea
            onChange={handleTitleChange}
            style={{ resize: 'none', outline: 'none' }}
            className="block mb-4 p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border h-10 dark:bg-darkA dark:text-white"
            value={postTitle}
            disabled={postTitle.length >= 100}
          ></textarea>
        </div>
        <div>
          <ReactQuill
            className="dark:text-white dark:bg-[#1d202362]"
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
                <button className="bg-mint text-black px-2 py-2 rounded-md border-solid border-2 border-azure hover:bg-azure tracking-wide transition-colors duration-200 dark:bg-darkP dark:border-black">
                  Update Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
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

export default EditPost;

/*
!TODO
![] should be able to see the previous title and text from post
![] should be able to see the previous comment in the comments
*/
