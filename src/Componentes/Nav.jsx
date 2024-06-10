// Nav.js

import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logoutUser } from "../Store/Actions/authActions";


const Nav = ({ className, links }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Despacha la acción de logout
    dispatch(logoutUser());
  };

  return (
    <nav className={className}>
      {links?.map(link => (
        link.href === 'logout' ? (
          <a href="#" key={link.id} onClick={handleLogout}>{link.title}</a>
        ) : (
          <Link to={link.href} key={link.id}>{link.title}</Link>
        )
      ))}
    </nav>
  );
};

export default Nav;
