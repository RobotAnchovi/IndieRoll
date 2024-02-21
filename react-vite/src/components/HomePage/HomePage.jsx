import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import MovieSection from './MovieSection'; // Import the MovieSection component
import FeaturedMovie from './FeaturedMovie'; // Import the FeaturedMovie component
import './Homepage.css';

function Homepage() {
  const [content, setContent] = useState({
    featured: null,
    fatasy: [],
    action: [],
    comedy: [],
  });

  const isAuthenticated = useSelector(state => state.session.user);

  useEffect(() => {
    const fetchContent = async () => {
      const response = await fetch('/api/content');
      if (response.ok) {
        const data = await response.json();

        // Here you would sort the data into the categories you need
        // For simplicity, I'm just assigning them directly

        setContent({
          ...content,
          featured: data[0],
          fatasy: data.filter(movie => movie.genre === 'Fantasy'),
          action: data.filter(movie => movie.genre === 'Action'),
          comedy: data.filter(movie => movie.genre === 'Comedy'),
        });
      } else {
        // Error handling goes here
      }
    };

    if (isAuthenticated) {
      fetchContent();
    }
  }, [isAuthenticated]);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="homepage">
      {content.featured && <FeaturedMovie movie={content.featured} />}
      <MovieSection title="Fantasy" movies={content.fatasy} />
      <MovieSection title="Action" movies={content.action} />
      <MovieSection title="Comedy" movies={content.comedy} />
    </div>
  );
}

export default Homepage;
