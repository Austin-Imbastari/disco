import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BoardPostItem } from '../components/BoardPostItem';
import { motion } from 'framer-motion';
import { boardItemAnimation, itemsBoard } from '../utils/animations';

type PostData = {
  id: number;
  subject: string;
  createdAt: string;
  author: {
    id: number;
    username: string;
  };
};

const Board = () => {
  const [items, setItems] = useState<PostData[]>();
  const [shouldShow, setShouldShow] = useState(false);

  const handleFetchItems = async () => {
    try {
      const url = `${import.meta.env.VITE_PRODUCTION_URL}/api/boards/1/posts`;
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth')}`,
        },
      });
      const { data: data } = await res.json();
      const acendedPosts = data.board.posts.sort(
        (a: { id: number }, b: { id: number }) => b.id - a.id,
      );
      setItems(acendedPosts);
      setTimeout(() => {
        setShouldShow(true);
      }, 500);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleFetchItems();
  }, []);

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
        <div className="absolute bottom-0 right-0 ">
          <Link to="/createpost">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-mint text-black px-2 py-2 rounded-md border-solid border-2 border-azure hover:bg-azure tracking-wide transition-colors duration-200 dark:bg-darkP dark:border-black"
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
