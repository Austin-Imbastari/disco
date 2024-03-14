/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect } from 'react';

import { MdDelete } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import { PostCommentType } from '../../model';

type ResponseCommentType = {
  id: number;
  text: string;
  author: {
    id: number;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
};

type CommentListPropTypes = {
  postComments: PostCommentType[] | undefined;
  setPostComments: React.Dispatch<
    React.SetStateAction<PostCommentType[] | undefined>
  >;
  postId: string | undefined;
};

const CommentList = ({
  postId: postId,
  setPostComments: setPostComments,
  postComments: postComments,
}: CommentListPropTypes) => {
  const handleDeleteComment = async (commentId: number) => {
    try {
      const url = `https://disco-app-7sxty.ondigitalocean.app/api/comments/${commentId}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth')}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Resource deleted successfully');
      } else {
        const errorData = data;
        console.error('Error:', errorData);
      }
    } catch (err) {
      console.log('error', err);
    }
  };

  const fetchComments = useCallback(async () => {
    try {
      const url = `https://disco-app-7sxty.ondigitalocean.app/api/posts/${postId}/comments`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth')}`,
        },
      });
      const {
        data: { post: responsePost },
      } = await response.json();
      const postComments = responsePost.comments.map(
        (responseComment: ResponseCommentType) => {
          return {
            commentId: responseComment.id,
            author: responseComment.author.username,
            text: responseComment.text,
            createdAt: responseComment.createdAt,
          } as PostCommentType;
        }
      );
      setPostComments(postComments);
    } catch (error) {
      console.log(error);
    }
  }, [postId, setPostComments]);

  useEffect(() => {
    fetchComments();
  });

  return (
    <>
      {postComments?.map((comment) => (
        <div key={comment.commentId}>
          <div className="mt-10 flex justify-center">
            <div className="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg">
              <div className="relative flex gap-4">
                <div className="flex flex-col w-full">
                  <div className="flex flex-row justify-between">
                    <p className="relative text-xl whitespace-nowrap truncate overflow-hidden">
                      {comment.author}
                    </p>
                    <a
                      className="text-gray-500 text-xl"
                      href="#"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </a>
                  </div>
                  <p className="text-gray-400 text-sm">
                    20 April 2022, at 14:88 PM
                  </p>
                </div>
              </div>
              <p className="-mt-4 text-gray-500">{comment.text}</p>
              <div className="flex flex-row-reverse">
                <div
                  onClick={() => handleDeleteComment(comment.commentId)}
                  className="ml-2 hover:cursor-pointer"
                >
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
