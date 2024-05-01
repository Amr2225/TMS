import { useNavigate } from "react-router-dom";

const NavLinks = ({ children, name }) => {
  const navigate = useNavigate();

  return (
    <a
      onClick={() => navigate("/tdashboard")}
      href='#'
      className='flex p-1 rounded cursor-pointer  hover:stroke-neutral-100 stroke-neutral-400 text-neutral-400 hover:text-neutral-400 place-items-center gap-3 hover:bg-neutral-700/30 transition-colors duration-100'
    >
      {children}
      <p className='overflow-clip whitespace-nowrap tracking-wide'>{name}</p>
    </a>
  );
};

export default NavLinks;
