import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

//components
import PostComment from '../Comment/Comment';
import CommentList from '../CommentList/CommentList';

// Types
import { PostCommentType } from '../../model';

export type PostDetail = {
  id: number;
  createdAt: string;
  subject: string;
  text: string;
}[];

const PostPage = () => {
  const [postDetail, setPostDetail] = useState<PostDetail>();
  const [postComments, setPostComments] = useState<PostCommentType[]>();
  const { id: postId } = useParams();

  const handleFetchPageId = async (id: string | undefined) => {
    try {
      const url = `https://disco-app-7sxty.ondigitalocean.app/api/posts/${id}`;
      const res = await fetch(url);
      const { data: postData } = await res.json();
      const post = postData.post;
      setPostDetail([post]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleFetchPageId(postId);
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
          {postDetail?.map((post) => (
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
      <PostComment postDetail={postDetail} />
      <CommentList
        postId={postId}
        setPostComments={setPostComments}
        postComments={postComments}
      />
    </>
  );
};

export default PostPage;
