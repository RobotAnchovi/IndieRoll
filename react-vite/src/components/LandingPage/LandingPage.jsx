// import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate('/signup');
  };
  return (
    <div className='landing-page'>
      <div className='heading-box'>
        <h1 className='landing-header'>Where every stream counts</h1>
        <h2>Join the revolution of creators taking back their power</h2>
      </div>
      <div className='all-features'>
        <div className='feature'>
          <div className='feature-info'>
            <h2>Direct Profit to Creators</h2>
            <p>
              At IndieRoll, we believe in the true value of creativity.
              That&apos;s why we ensure 100% of the profits go directly to our
              creators. Your work, your earnings. Enjoy the freedom of a
              platform where every watch translates to direct income, supporting
              your passion and hard work without intermediaries.
            </p>
          </div>

          <img className='feature-image' src='/feature-2.png' />
        </div>
        <div className='feature'>
          <div className='feature-info'>
            <h2>Viewer-Driven Revenue Sharing</h2>
            <p>
              Your views have more power here. With a simple $5 monthly
              subscription, watchers become key players in supporting indie
              creators. Revenue is divided based on watch time, ensuring that
              your favorite creators are fairly rewarded for captivating your
              attention. It&apos;s transparent, fair, and directly proportional
              to the love each creation receives.
            </p>
          </div>

          <img className='feature-image' src='/feature-1.png' />
        </div>
        <div className='feature'>
          <div className='feature-info'>
            <h2>Unlimited Access to Unique Content</h2>
            <p>
              Dive into a world where uniqueness thrives. IndieRoll offers an
              unparalleled selection of premium indie movies, documentaries, and
              series, curated from the most talented independent creators
              worldwide. With new titles added regularly, your curiosity and
              love for storytelling are always rewarded.
            </p>
          </div>

          <img className='feature-image' src='/feature-4.png' />
        </div>
      </div>
      <footer className='landing-footer '>
        Join IndieRoll Today: For the Love of Indie
        <button className='get-started' onClick={handleGetStarted}>
          Get Started
        </button>
      </footer>
    </div>
  );
};

export default LandingPage;
