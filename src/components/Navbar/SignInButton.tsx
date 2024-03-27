import { NavLink } from 'react-router-dom';

const SignInButton = () => {
  return (
    <NavLink to="/signin">
      <button className="bg-mint text-black px-5 py-2 rounded-full border-solid border-2  hover:bg-azure tracking-wide transition-colors duration-200 dark:text-black dark:bg-darkP ">
        <span>Login</span>
      </button>
    </NavLink>
  );
};

export default SignInButton;
