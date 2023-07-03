import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h2 className="large">Welcome to the Edmonton Chess Club</h2>
          <p className="lead"></p>
          <div className="buttons">
            <Link to="/signup" className="btn">
              First Time
            </Link>
            <Link to="/login" className="btn">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
