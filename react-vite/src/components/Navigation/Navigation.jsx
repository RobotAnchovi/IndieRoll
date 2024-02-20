import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
  const isAuthenticated = Boolean(sessionUser);
  return (
    <nav className="navigation">
      <div className="logo">Logo</div>
      <ul className="nav-links">
        <li>
          {isAuthenticated && (
          <NavLink to="/content" exact activeClassName="active">
            Home
          </NavLink>
          )}
        </li>
        {/* Add additional nav items here */}
      </ul>
      <ul className="nav-buttons">
      {!isAuthenticated && (
          <>
            <li>
              <NavLink to="/login" activeClassName="active">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup" activeClassName="active">
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
