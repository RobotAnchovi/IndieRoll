import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);
  const isAuthenticated = Boolean(sessionUser);
  return (
    <nav className="navigation">
     <a href="/content" className="logo-link">
      <img className="logo" src="/indieroll-01.png" />
      </a>
      <ul className="nav-buttons">
        {!isAuthenticated && (
          <>
            <li>
              <NavLink className="log-in" to="/login" activeClassName="active">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                className="sign-up"
                to="/signup"
                activeClassName="active">
                Sign Up
              </NavLink>
            </li>
          </>
        )}
        {isAuthenticated && (
          <li>
            <ProfileButton />
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
