import { NavLink } from 'react-router-dom';

const AboutUsLink = () => {
  return (
    <NavLink
      to="/aboutus"
      className="font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out tracking-wide dark:text-white"
    >
      About Us
    </NavLink>
  );
};

export default AboutUsLink;
