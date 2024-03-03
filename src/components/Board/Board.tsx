import { Link } from 'react-router-dom';
import { BoardPostItem } from './BoardPostItem';

const Board = () => {
  return (
    <>
      <div className="container mt-10 mx-auto px-8 relative h-16">
        <div className="absolute bottom-0 right-0 ">
          <Link to="/createpost">
            <button className="bg-mint text-black px-2 py-2 rounded-md border-solid border-2 border-azure hover:bg-azure tracking-wide transition-colors duration-200">
              Create Post
            </button>
          </Link>
        </div>
      </div>
      <div
        style={{
          border: '2px solid #E9F7E6',
          borderRadius: '10px',
          marginTop: '10px',
        }}
        className="container mx-auto px-8 py-8"
      >
        <BoardPostItem
          author="JAVASCRIPT"
          subject="Future Hendrix"
          createdDate="April 15, 2024"
        />
        <BoardPostItem
          author="JAVASCRIPT"
          subject="Future Hendrix"
          createdDate="April 15, 2024"
        />
        <BoardPostItem
          author="JAVASCRIPT"
          subject="Future Hendrix"
          createdDate="April 15, 2024"
        />
        <BoardPostItem
          author="JAVASCRIPT"
          subject="Future Hendrix"
          createdDate="April 15, 2024"
        />
      </div>
    </>
  );
};

export default Board;

// CSS Helper
// style={{ border: "2px solid red" }}

// Dynamic create post

// import React from "react";
// const PostGrid = ({ posts }) => {
//   return (
//     <div className="grid grid-cols-3 gap-4">
//       {posts.map((post, index) => (
//         <div key={index} className="bg-gray-200 p-4">
//           {post.title}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PostGrid;
