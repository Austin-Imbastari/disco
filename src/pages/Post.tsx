import { motion } from 'framer-motion';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { UserContext } from '../contexts/UserContext';

import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';

import { postPageAnimation } from '../utils/animations';

export type PostType = {
  id: number;
  createdAt: string;
  subject: string;
  text: string;
  author: {
    id: number;
    username: string;
  };
}[];

export type CommentType = {
  commentId: number;
  author: string;
  text: string;
  createdAt: string;
};

export type ResponseCommentType = {
  id: number;
  text: string;
  author: {
    id: number;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
};

const Post = () => {
  const { id: postId } = useParams();
  const navigate = useNavigate();
  const currentUser = useContext(UserContext);
  const [postInfo, setPostInfo] = useState<PostType>();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [triggerCommentsUpdate, setTriggerCommentsUpdate] = useState(false);

  const getComments = useCallback(async () => {
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
      const responseComments = responsePost.comments.map(
        (responseComment: ResponseCommentType) => {
          return {
            commentId: responseComment.id,
            author: responseComment.author.username,
            text: responseComment.text,
            createdAt: responseComment.createdAt,
          } as CommentType;
        },
      );
      const sortedComments = responseComments
        .sort(
          (a: { commentId: number }, b: { commentId: number }) =>
            a.commentId - b.commentId,
        )
        .reverse();
      setComments(sortedComments);
    } catch (error) {
      console.log(error);
    }
  }, [postId]);

  useEffect(() => {
    getComments();
  }, [triggerCommentsUpdate, getComments]);

  useEffect(() => {
    const getPost = async () => {
      try {
        const url = `https://disco-app-7sxty.ondigitalocean.app/api/posts/${postId}`;
        const res = await fetch(url);
        const { data: postData } = await res.json();
        const post = postData.post;
        setPostInfo([post]);
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, [postId]);

  const dateFormatter = (date: string) => {
    const dateString = date;
    const newDate = new Date(dateString);
    const formattedDate = newDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    return formattedDate;
  };

  const handleDelete = async (
    e: React.FormEvent<HTMLFormElement>,
    postId: number,
  ) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://disco-app-7sxty.ondigitalocean.app/api/posts/${postId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('auth')}`,
          },
        },
      );

      if (response.status === 202) {
        console.log('Resource deleted successfully');
        navigate('/*');
      }
    } catch (err) {
      console.log('Post was not deleted', err);
    }
  };

  return (
    <motion.div
      variants={postPageAnimation}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <div className="mt-20"></div>
      <div
        style={{
          border: '2px solid #E8F2FE',
          borderRadius: '10px',
          marginTop: '10px',
        }}
        className="container mx-auto px-8 py-8"
      >
        <div>
          {postInfo?.map((post) => (
            <div key={post.id}>
              <h1 className="mb-1 font-bold text-xl">{post.subject}</h1>
              <h4>{dateFormatter(post.createdAt)}</h4>
              <div className="mt-5">
                <p
                  className="leading-8 "
                  dangerouslySetInnerHTML={{ __html: post.text }}
                />
              </div>
              {currentUser && (
                <div className="flex flex-row-reverse">
                  {(currentUser.role === 'ADMIN' ||
                    currentUser.id === post.author.id) && (
                    <form onSubmit={(e) => handleDelete(e, post.id)}>
                      <button className="bg-mint text-black px-2 py-2 rounded-md border-solid border-2 border-azure hover:bg-azure tracking-wide transition-colors duration-200">
                        Delete
                      </button>{' '}
                    </form>
                  )}
                  {currentUser.id === post.author.id && (
                    <Link
                      to={`/post/${post.id}/edit`}
                      state={{
                        title: post.subject,
                        body: post.text,
                        postId: post.id,
                      }}
                    >
                      <button className="bg-mint text-black px-2 py-2 rounded-md border-solid border-2 border-azure hover:bg-azure tracking-wide transition-colors duration-200 mr-2">
                        Edit
                      </button>
                    </Link>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {postId && (
        <>
          <CommentForm
            postId={parseInt(postId)}
            onCommentSubmitted={() => setTriggerCommentsUpdate((prev) => !prev)}
          />
          <CommentList
            dateFormatter={dateFormatter}
            comments={comments}
            onCommentDeleted={() => setTriggerCommentsUpdate((prev) => !prev)}
          />
        </>
      )}
    </motion.div>
  );
};

export default Post;
