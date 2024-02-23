// import { useEffect, useState } from "react";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="heading-box">
        <h1 className="landing-header">Where every stream counts</h1>
        <h2>Join the revolution of creators taking back their power</h2>
      </div>

      <footer className="landing-footer ">
        Join IndieRoll Today: For the Love of Indie
        <button className="get-started">Get Started</button>
      </footer>
    </div>
  );
};

export default LandingPage;
