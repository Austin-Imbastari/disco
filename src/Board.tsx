import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BoardPostItem } from './BoardPostItem';
import { motion } from 'framer-motion';
import { boardItemAnimation, itemsBoard } from './animations';
import { useFetch } from './useFetch';

type PostData = {
  id: number;
  subject: string;
  createdAt: string;
  author: {
    id: number;
    username: string;
  };
};

type BoardData = {
  data: {
    board: {
      id: number;
      name: string;
      posts: PostData[];
    };
  };
};

const Board = () => {
  // const [items, setItems] = useState<PostData>();
  const [shouldShow, setShouldShow] = useState(false);

  const boardData = useFetch<BoardData, null>({
    options: {
      url: 'https://disco-app-7sxty.ondigitalocean.app/api/boards/1/posts',
      method: 'GET',
      token: localStorage.getItem('auth'),
      onSuccess: () => {
        setTimeout(() => {
          setShouldShow(true);
        }, 500);
      },
    },
  });
  console.log(boardData);
  const items = boardData.data.board.posts.sort(
    (a: { id: number }, b: { id: number }) => b.id - a.id,
  );

  // const handleFetchItems = async () => {
  //   try {
  //     const url =
  //       'https://disco-app-7sxty.ondigitalocean.app/api/boards/1/posts';
  //     const res = await fetch(url, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('auth')}`,
  //       },
  //     });
  //     const { data: data } = await res.json();
  //     const acendedPosts = data.board.posts.sort(
  //       (a: { id: number }, b: { id: number }) => b.id - a.id,
  //     );
  //     setItems(acendedPosts);
  //     setTimeout(() => {
  //       setShouldShow(true);
  //     }, 500);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   handleFetchItems();
  // }, []);

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

  return (
    <>
      <div className="container mt-10 mx-auto px-8 relative h-16 ">
        <div className="absolute bottom-0 right-0">
          <Link to="/createpost">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-mint text-black px-2 py-2 rounded-md border-solid border-2 border-azure hover:bg-azure tracking-wide transition-colors duration-200"
            >
              Create Post
            </motion.button>
          </Link>
        </div>
      </div>
      <motion.div
        variants={boardItemAnimation}
        initial={false}
        animate={shouldShow ? 'show' : 'hidden'}
        style={{
          border: '2.5px solid #E9F7E6',
          borderRadius: '10px',
          marginTop: '10px',
          overflow: 'hidden',
        }}
        className="container mx-auto px-8 py-8"
      >
        {items?.map((item) => (
          <motion.div variants={itemsBoard} key={item.id}>
            <Link to={'/post/' + item.id}>
              <BoardPostItem
                author={item.author.username}
                subject={item.subject}
                createdDate={dateFormatter(item.createdAt)}
              />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default Board;
