import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="navigation">
      <img className="logo" src="/indieroll-01.png" />
      <ul className="nav-links">
        <li>
          <NavLink to="/" exact activeClassName="active">
            Home
          </NavLink>
        </li>
        {/* Add additional nav items here */}
      </ul>
      <ul className="nav-buttons">
        <li>
          <NavLink className="log-in" to="/login" activeClassName="active">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink className="sign-up" to="/signup" activeClassName="active">
            Sign Up
          </NavLink>
        </li>
        <li>
          <ProfileButton />
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
