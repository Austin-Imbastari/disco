import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import CommentForm from './CommentForm';
import CommentList from './CommentList';

export type PostType = {
  id: number;
  createdAt: string;
  subject: string;
  text: string;
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

const PostPage = () => {
  const { id: postId } = useParams();
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
        }
      );
      setComments(responseComments);
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
    newDate.setFullYear(2024, 3 - 1, 15);
    const formattedDate = newDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    return formattedDate;
  };

  return (
    <>
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
            comments={comments}
            onCommentDeleted={() => setTriggerCommentsUpdate((prev) => !prev)}
          />
        </>
      )}
    </>
  );
};

export default PostPage;
