import { useNavigate } from 'react-router-dom';

const LogOutButton = () => {
  const navigate = useNavigate();

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const url = `${import.meta.env.VITE_PRODUCTION_URL}/api/auth/signout`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth')}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem('auth');
        navigate('/');
        window.location.reload();
      } else {
        console.error('POST request failed with status:', response.status);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <button className="bg-mint text-black px-5 py-2 rounded-full border-solid border-2  hover:bg-azure tracking-wide transition-colors duration-200 dark:text-black dark:bg-darkP ">
          Log Out
        </button>
      </form>
    </>
  );
};

export default LogOutButton;
