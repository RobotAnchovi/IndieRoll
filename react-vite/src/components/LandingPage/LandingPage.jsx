import { useEffect, useState } from "react";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="heading-box">
        <h1 className="landing-header">Header text goes here</h1>
        <h2>Subheader text goes here</h2>
      </div>
      <footer className="landing-footer">
        Ready to watch? Click here to create your membership
      </footer>
    </div>
  );
};

export default LandingPage;
