import { NavLink } from 'react-router-dom';

const HomeLink = () => {
  return (
    <NavLink
      to="/"
      className="font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out tracking-wide dark:text-white"
    >
      Home
    </NavLink>
  );
};

export default HomeLink;
