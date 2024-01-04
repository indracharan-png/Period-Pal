import { Link } from "react-router-dom";
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from "../hooks/useAuthContext";



const NavBar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = (e) => {
    logout();
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Period Pal</h1>
        </Link>
        <nav>
          {user && <div>
            <span>{user.email}</span>
            <Link to="/predict">Predict</Link>
            <Link to="/blog">Blog</Link>
            <button onClick={handleClick}>Log out</button>
          </div>}
          {!user && <div><Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>}

        </nav>
      </div>
    </header>
  );
};

export default NavBar;
