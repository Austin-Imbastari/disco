import { NavLink } from 'react-router-dom';

const SignUpButton = () => {
  return (
    <NavLink to="/signup">
      <button className="bg-mint text-black px-5 py-2 rounded-full border-solid border-2  hover:bg-azure tracking-wide transition-colors duration-200">
        <span>Sign Up</span>
      </button>
    </NavLink>
  );
};

export default SignUpButton;
