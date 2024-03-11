import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkLogout } from '../../redux/session';
import './Navigation.css';

function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const isAuthenticated = Boolean(sessionUser);

  const handleLogout = () => {
    dispatch(thunkLogout());
    navigate('/');
  };

  return (
    <nav className='navigation'>
      <a href='/content' className='logo-link'>
        <img className='logo' src='/indieroll-01.png' alt='IndieRoll Logo' />
      </a>
      <ul className='nav-links'>
        {isAuthenticated && (
          <>
            <div className='content-nav'>
              <li>
                <NavLink to='/content' activeClassName='active'>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to='/watchlist' activeClassName='active'>
                  Watchlist
                </NavLink>
              </li>
              <li>
                <NavLink to='/profile' activeClassName='active'>
                  Profile
                </NavLink>
              </li>
              <li>
                <button onClick={handleLogout} className='logout-button'>
                  Logout
                </button>
              </li>
              <li>
                <NavLink to='/About' activeClassName='active'>
                  About
                </NavLink>
              </li>
            </div>
          </>
        )}
        {!isAuthenticated && (
          <>
            <li>
              <NavLink className='log-in' to='/login' activeClassName='active'>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                className='sign-up'
                to='/signup'
                activeClassName='active'
              >
                Sign Up
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
