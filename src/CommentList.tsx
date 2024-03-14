import { MdDelete } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import { CommentType } from './PostPage';

const CommentList = ({
  comments,
  onCommentDeleted,
}: {
  comments: CommentType[];
  onCommentDeleted: () => void;
}) => {
  const handleDeleteComment = async (commentId: number) => {
    try {
      const url = `http://localhost:8000/api/comments/${commentId}`;
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

  return (
    <>
      {comments?.map((comment) => (
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
              <p className="-mt-4 text-gray-500">
                {comment.commentId} - {comment.text}
              </p>
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
