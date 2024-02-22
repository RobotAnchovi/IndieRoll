import { useEffect, useState } from 'react';
import { useSelector, } from 'react-redux';
import { Navigate } from 'react-router-dom';
import './Homepage.css';


function Homepage() {
  const [ content, setContent ] = useState({
    recentlyAdded: [],
    topRated: [],
    action: [],
    comedy: [],
    horror: [],
  });

  const isAuthenticated = useSelector(state => state.session.user);

  useEffect(() => {
    const fetchContent = async () => {
      const response = await fetch('/api/content');
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      } else {
        // Error handling goes here :^)
      }
    };

    if (isAuthenticated) {
      fetchContent();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/LandingPage" replace />;
  }

  return (
    <div className="homepage">
    </div>
  );
}

export default Homepage;
